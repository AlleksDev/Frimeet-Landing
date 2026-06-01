import { useEffect, useRef, useCallback } from 'react'

/**
 * useVideoPlayer (Hybrid: Native Play + Smooth Reverse Seek)
 * ──────────────────────────────────────────────────────────
 * Controls a single continuous video using the browser's native
 * media pipeline for smooth forward playback, and frame-by-frame
 * rAF stepping for smooth backward navigation.
 *
 * Strategy:
 *   ▶ FORWARD (scroll ↓): video.play() + rAF monitor for precise pause
 *   ◀ BACKWARD (scroll ↑): rAF-driven reverse stepping for smooth rewind
 *
 * Pause points (30 FPS):
 *   Card 0 → frame 28  (~0.933s)
 *   Card 1 → frame 60  ( 2.000s)
 *   Card 2 → frame 96  ( 3.200s)
 *   Card 3 → frame 136 (~4.533s)
 *   Card 4 → frame 164 (~5.467s)
 *   Card 5 → frame 194 (~6.467s)
 *
 * Entry behavior (cyclic — resets on every exit/re-entry):
 *   ▼ From top:    currentTime=0, plays forward to PAUSE_POINTS[scrollIndex]
 *   ▲ From bottom: plays in REVERSE from end to PAUSE_POINTS[scrollIndex]
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

/** Tolerance for time comparisons (~1 frame at 30fps) */
const TIME_EPSILON = 0.04

/** Speed for reverse playback: seconds to rewind per real second */
const REVERSE_SPEED = 3.0

/* ================================================================
   Hook
   ================================================================ */

export function useVideoPlayer(
  scrollIndex: number,
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  const videoRef = useRef<HTMLVideoElement>(null)

  /** rAF id for the forward-playback monitor loop */
  const monitorRafRef = useRef(0)

  /** rAF id for the reverse-playback loop */
  const reverseRafRef = useRef(0)

  /** Which pause-point index the video was last sent to */
  const prevTargetRef = useRef(-1)

  /** Whether the section is currently in the viewport */
  const isEnteredRef = useRef(false)

  /** Mirror of scrollIndex for reading inside observer callbacks */
  const scrollIndexRef = useRef(scrollIndex)
  scrollIndexRef.current = scrollIndex

  /** Track last rAF timestamp for smooth reverse delta calculations */
  const lastFrameTimeRef = useRef(0)

  /* ── Cancel any in-flight rAF playback monitor ── */
  const cancelMonitor = useCallback(() => {
    cancelAnimationFrame(monitorRafRef.current)
    monitorRafRef.current = 0
  }, [])

  /* ── Cancel any in-flight reverse playback loop ── */
  const cancelReverse = useCallback(() => {
    cancelAnimationFrame(reverseRafRef.current)
    reverseRafRef.current = 0
    lastFrameTimeRef.current = 0
  }, [])

  /* ── Cancel all playback loops ── */
  const cancelAll = useCallback(() => {
    cancelMonitor()
    cancelReverse()
  }, [cancelMonitor, cancelReverse])

  /* ────────────────────────────────────────────────────
     Smooth reverse playback via rAF frame stepping.
     Steps currentTime backward at REVERSE_SPEED until
     reaching the target timestamp.
     ──────────────────────────────────────────────────── */
  const playReverse = useCallback(
    (target: number) => {
      const video = videoRef.current
      if (!video) return

      video.pause()
      cancelAll()

      const step = (timestamp: number) => {
        const v = videoRef.current
        if (!v) return

        // Initialize on first frame
        if (lastFrameTimeRef.current === 0) {
          lastFrameTimeRef.current = timestamp
          reverseRafRef.current = requestAnimationFrame(step)
          return
        }

        const deltaMs = timestamp - lastFrameTimeRef.current
        lastFrameTimeRef.current = timestamp

        // Calculate how much time to rewind (capped to avoid jumps)
        const deltaSec = Math.min(deltaMs / 1000, 0.05) * REVERSE_SPEED

        const newTime = v.currentTime - deltaSec

        if (newTime <= target + TIME_EPSILON) {
          // Reached target — snap and stop
          v.currentTime = target
          lastFrameTimeRef.current = 0
          return
        }

        v.currentTime = newTime
        reverseRafRef.current = requestAnimationFrame(step)
      }

      reverseRafRef.current = requestAnimationFrame(step)
    },
    [cancelAll],
  )

  /* ────────────────────────────────────────────────────
     Navigate to a pause point.
       ▶ Forward  → native play() for smooth decoded frames
       ◀ Backward → smooth rAF-driven reverse stepping
     ──────────────────────────────────────────────────── */
  const goToPoint = useCallback(
    (pointIndex: number) => {
      const video = videoRef.current
      if (!video) return

      const idx = Math.max(0, Math.min(TOTAL_CARDS - 1, pointIndex))

      // Skip if already targeting this point
      if (idx === prevTargetRef.current) return
      prevTargetRef.current = idx

      const target = PAUSE_POINTS[idx]
      const current = video.currentTime

      // Cancel any previous playback loops
      cancelAll()

      if (current < target - TIME_EPSILON) {
        /* ▶ FORWARD: use native play() for smooth video decoding.
           Scale playbackRate for large jumps (max 3×) so the video
           catches up without feeling sluggish. */
        const distance = target - current
        video.playbackRate = Math.max(1, Math.min(3, distance / 1.0))

        video.play().catch(() => {
          // Autoplay blocked — fall back to direct seek
          video.currentTime = target
        })

        // rAF monitor: checks every frame (~60fps) for precise pausing
        const monitor = () => {
          const v = videoRef.current
          if (!v) return
          if (v.currentTime >= target - TIME_EPSILON) {
            v.pause()
            v.currentTime = target // Snap to exact frame
            v.playbackRate = 1
            return
          }
          monitorRafRef.current = requestAnimationFrame(monitor)
        }
        monitorRafRef.current = requestAnimationFrame(monitor)
      } else if (current > target + TIME_EPSILON) {
        /* ◀ BACKWARD: smooth reverse playback via rAF stepping.
           Creates a fluid rewind effect instead of a jarring jump. */
        playReverse(target)
      } else {
        /* ≈ Already at target — just ensure paused */
        video.pause()
        video.currentTime = target
      }
    },
    [cancelAll, playReverse],
  )

  /* ────────────────────────────────────────────────────
     React to scrollIndex changes
     (only fires when index actually changes — phase
     changes are handled by useScrollIndex separately)
     ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isEnteredRef.current) return
    goToPoint(scrollIndex)
  }, [scrollIndex, goToPoint])

  /* ────────────────────────────────────────────────────
     IntersectionObserver: entry direction + lifecycle
     Detects whether the user enters from top or bottom
     and initializes the video accordingly. Cyclic: full
     reset on exit so re-entry always works.
     ──────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const currentIdx = scrollIndexRef.current

            if (rect.top >= 0) {
              /* ▼ Entry from TOP (user scrolling down)
                 Start at 0, play forward to the current card's pause point. */
              video.currentTime = 0
              prevTargetRef.current = -1
              isEnteredRef.current = true
              goToPoint(currentIdx)
            } else {
              /* ▲ Entry from BOTTOM (user scrolling up)
                 Start at end of video and play in REVERSE to the current
                 card's pause point for a smooth rewind effect. */
              const targetIdx = Math.min(currentIdx, TOTAL_CARDS - 1)
              const lastPausePoint = PAUSE_POINTS[TOTAL_CARDS - 1]
              
              // Set video to the last pause point (end of content)
              video.currentTime = lastPausePoint
              prevTargetRef.current = -1
              isEnteredRef.current = true
              
              // Play in reverse to the target pause point
              if (targetIdx < TOTAL_CARDS - 1) {
                const target = PAUSE_POINTS[targetIdx]
                playReverse(target)
                prevTargetRef.current = targetIdx
              } else {
                // Already at the last card, just pause
                prevTargetRef.current = targetIdx
              }
            }
          } else {
            /* ── Section left viewport: full reset for cyclic re-entry ── */
            isEnteredRef.current = false
            prevTargetRef.current = -1
            cancelAll()
            if (videoRef.current) {
              videoRef.current.pause()
              videoRef.current.playbackRate = 1
            }
          }
        }
      },
      { threshold: 0 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      cancelAll()
    }
  }, [sectionRef, goToPoint, cancelAll, playReverse])

  return { videoRef }
}
