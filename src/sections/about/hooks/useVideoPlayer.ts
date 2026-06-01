import { useEffect, useRef } from 'react'

/**
 * useVideoPlayer (Scroll-Scrubbed, Lerp-Interpolated)
 * ────────────────────────────────────────────────────
 * Controls a single continuous video via direct currentTime manipulation
 * (NO play/pause). Uses a rAF lerp loop for buttery-smooth scrubbing
 * synchronized with scroll position.
 *
 * Architecture (100% imperative — zero React state, zero re-renders):
 *   1. Scroll handler → computes target video time from scroll progress
 *   2. rAF lerp loop  → smoothly interpolates video.currentTime → target
 *   3. IntersectionObserver → detects entry direction & manages lifecycle
 *
 * Pause points (30 FPS):
 *   Card 0 → frame 28  (~0.933s)
 *   Card 1 → frame 60  ( 2.000s)
 *   Card 2 → frame 96  ( 3.200s)
 *   Card 3 → frame 136 (~4.533s)
 *   Card 4 → frame 164 (~5.467s)
 *   Card 5 → frame 194 (~6.467s)
 *
 * Piecewise mapping (per card scroll zone):
 *   - Entering (0%–15%):  lerp from prev pause → current pause
 *   - Active  (15%–70%):  hold at current pause point
 *   - Exiting (70%–100%): lerp from current pause → next pause
 *
 * Entry behavior (cyclic — resets on every exit/re-entry):
 *   - From top  (scroll ↓): currentTime = 0, auto-lerps → pause point 0
 *   - From bottom (scroll ↑): currentTime = end, auto-lerps → last pause point
 */

/* ================================================================
   Constants
   ================================================================ */

/** Pause-point timestamps in seconds (frame / 30 FPS) */
const PAUSE_POINTS: number[] = [
  28 / 30,   // ~0.933s
  60 / 30,   //  2.000s
  96 / 30,   //  3.200s
  136 / 30,  // ~4.533s
  164 / 30,  // ~5.467s
  194 / 30,  // ~6.467s
]

const TOTAL_CARDS = PAUSE_POINTS.length

/** Smoothing factor per frame (higher = snappier, lower = smoother) */
const LERP_SPEED = 0.12

/** Below this threshold (≈1 frame at 30fps) snap to target */
const SNAP_THRESHOLD = 0.033

/* ================================================================
   Pure helpers
   ================================================================ */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Maps raw scroll progress [0, 1] → target video time (seconds).
 *
 * Piecewise interpolation with "hold" zones at each pause point:
 *   - 0%–15%  of each card's zone: interpolate from prev → current pause
 *   - 15%–70%: hold at current pause point (user reads the card)
 *   - 70%–100%: interpolate from current → next pause
 *
 * Boundary behavior:
 *   - progress ≤ 0: returns first pause point (entry target)
 *   - progress ≥ 1: returns last pause point (exit/reverse target)
 *   - Last card's exit zone holds (no interpolation past final pause)
 */
function getTargetTime(progress: number): number {
  if (progress <= 0) return PAUSE_POINTS[0]
  if (progress >= 1) return PAUSE_POINTS[TOTAL_CARDS - 1]

  const raw = progress * TOTAL_CARDS
  const index = Math.min(TOTAL_CARDS - 1, Math.floor(raw))
  const local = Math.min(1, raw - index)

  const prevTime = index > 0 ? PAUSE_POINTS[index - 1] : 0
  const currTime = PAUSE_POINTS[index]
  // Last card holds at final pause — no interpolation beyond it
  const nextTime =
    index < TOTAL_CARDS - 1 ? PAUSE_POINTS[index + 1] : currTime

  if (local < 0.15) {
    // Entering: smooth transition from previous pause → current
    return lerp(prevTime, currTime, local / 0.15)
  }
  if (local < 0.70) {
    // Active: video holds while user reads the card
    return currTime
  }
  // Exiting: smooth transition from current pause → next
  return lerp(currTime, nextTime, (local - 0.70) / 0.30)
}

/* ================================================================
   Hook
   ================================================================ */

export function useVideoPlayer(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    /* ── Mutable state (refs-in-closure, zero React overhead) ── */
    let targetTime = 0
    let isActive = false
    let isSettling = false // true during entry animation, blocks scroll
    let rafId = 0
    let scrollRafId = 0

    /* ── Compute target from current scroll position ── */
    const computeTarget = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = -rect.top
      const sectionHeight = section.offsetHeight - window.innerHeight
      if (sectionHeight <= 0) return

      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight))
      targetTime = getTargetTime(progress)
    }

    /* ── Scroll handler: updates target imperatively ── */
    const onScroll = () => {
      cancelAnimationFrame(scrollRafId)
      scrollRafId = requestAnimationFrame(() => {
        if (!isActive || isSettling) return
        computeTarget()
      })
    }

    /* ── rAF lerp loop: smoothly interpolates currentTime → target ── */
    const tick = () => {
      if (!isActive) return

      const dur = video.duration
      if (!dur || isNaN(dur)) {
        // Video metadata not loaded yet — retry next frame
        rafId = requestAnimationFrame(tick)
        return
      }

      const current = video.currentTime
      const diff = targetTime - current
      const absDiff = Math.abs(diff)

      if (absDiff > SNAP_THRESHOLD) {
        // Smooth interpolation — the core of jank-free scrubbing
        video.currentTime = current + diff * LERP_SPEED
      } else if (absDiff > 0.001) {
        // Close enough — snap to exact target
        video.currentTime = targetTime

        if (isSettling) {
          // Entry animation reached its target — hand off to scroll
          isSettling = false
          computeTarget()
        }
      } else {
        // Already at target
        if (isSettling) {
          isSettling = false
          computeTarget()
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    /* ── IntersectionObserver: entry direction + lifecycle ── */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            /* ---- Determine entry direction ---- */
            const rect = entry.boundingClientRect
            const dur = video.duration
            const hasDuration = dur && !isNaN(dur) && dur > 0

            if (rect.top >= 0) {
              // ▼ Entry from TOP (user scrolling down)
              // Video starts at 0, lerps to first pause point
              video.currentTime = 0
              targetTime = PAUSE_POINTS[0]
            } else if (hasDuration) {
              // ▲ Entry from BOTTOM (user scrolling up)
              // Video starts at end, lerps back to last pause point
              video.currentTime = dur - 0.001
              targetTime = PAUSE_POINTS[TOTAL_CARDS - 1]
            } else {
              // Bottom entry but metadata not ready — safe fallback
              video.currentTime = 0
              targetTime = PAUSE_POINTS[TOTAL_CARDS - 1]
            }

            // Block scroll handler until entry animation settles
            isSettling = true
            isActive = true
            rafId = requestAnimationFrame(tick)
          } else {
            // ── Section left viewport — full reset for cyclic re-entry ──
            isActive = false
            isSettling = false
            cancelAnimationFrame(rafId)
          }
        }
      },
      { threshold: 0 },
    )

    observer.observe(section)
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Cleanup ── */
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(scrollRafId)
    }
  }, [sectionRef])

  return { videoRef }
}
