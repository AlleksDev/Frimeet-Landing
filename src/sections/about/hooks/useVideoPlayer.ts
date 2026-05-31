import { useEffect, useRef } from 'react'
import type { Step } from '../data/cardSteps'
import type { Phase } from './useScrollIndex'

/**
 * useVideoPlayer (Play-Based)
 * ───────────────────────────
 * Manages two <video> DOM elements (double-buffer) and plays them
 * based on scroll phases — producing smooth video playback that
 * advances as the user scrolls through the section.
 *
 * Strategy:
 *   - phase 'entering' / 'active': Play entrance video, show it
 *   - phase 'exiting': Play outing video, crossfade to it
 *   - Videos actually play (not scrubbed) for smooth motion
 *   - When scrollIndex changes, load new videos for the new card
 *   - Playback rate is controlled to keep videos in sync with scroll speed
 */
export function useVideoPlayer(
  scrollIndex: number,
  phase: Phase,
  localProgress: number,
  cardSteps: Step[],
) {
  const entranceRef = useRef<HTMLVideoElement>(null)
  const outingRef = useRef<HTMLVideoElement>(null)

  // Track which card index is currently loaded to avoid redundant .load() calls
  const loadedIndexRef = useRef(-1)

  // Track the last phase to detect transitions
  const lastPhaseRef = useRef<Phase>('entering')
  const lastIndexRef = useRef(-1)

  /* ────────────────────────────────────────────────────
     Load videos when the active card changes
     ──────────────────────────────────────────────────── */
  useEffect(() => {
    const eVideo = entranceRef.current
    const oVideo = outingRef.current
    if (!eVideo || !oVideo) return
    if (scrollIndex === loadedIndexRef.current) return

    loadedIndexRef.current = scrollIndex

    const step = cardSteps[scrollIndex]

    // Load entrance video
    eVideo.src = step.videos.entrance
    eVideo.preload = 'auto'
    eVideo.load()
    eVideo.currentTime = 0

    // Load outing video
    oVideo.src = step.videos.outing
    oVideo.preload = 'auto'
    oVideo.load()
    oVideo.currentTime = 0

    // Show entrance, hide outing by default for new cards
    eVideo.style.opacity = '1'
    oVideo.style.opacity = '0'

    // Try to play the entrance video immediately
    eVideo.play().catch(() => {
      // Autoplay may be blocked, that's ok — will retry on phase change
    })

  }, [scrollIndex, cardSteps])

  /* ────────────────────────────────────────────────────
     Control playback based on phase transitions
     ──────────────────────────────────────────────────── */
  useEffect(() => {
    const eVideo = entranceRef.current
    const oVideo = outingRef.current
    if (!eVideo || !oVideo) return

    const phaseChanged = lastPhaseRef.current !== phase
    const indexChanged = lastIndexRef.current !== scrollIndex

    lastPhaseRef.current = phase
    lastIndexRef.current = scrollIndex

    if (phase === 'entering' || phase === 'active') {
      // Show entrance video, hide outing
      eVideo.style.opacity = '1'
      oVideo.style.opacity = '0'

      // Play entrance video if not already playing
      if (eVideo.paused) {
        eVideo.play().catch(() => {})
      }
      // Pause outing video
      oVideo.pause()

    } else if (phase === 'exiting') {
      // Crossfade: show outing, hide entrance
      eVideo.style.opacity = '0'
      oVideo.style.opacity = '1'

      // When entering exiting phase, start outing video from beginning
      if (phaseChanged || indexChanged) {
        oVideo.currentTime = 0
      }
      // Play outing video
      if (oVideo.paused) {
        oVideo.play().catch(() => {})
      }
      // Pause entrance
      eVideo.pause()
    }
  }, [phase, scrollIndex])

  /* ────────────────────────────────────────────────────
     Adjust playback rate based on scroll speed
     This makes videos feel responsive to scroll velocity
     ──────────────────────────────────────────────────── */
  useEffect(() => {
    const eVideo = entranceRef.current
    const oVideo = outingRef.current
    if (!eVideo || !oVideo) return

    // Use a moderate constant playback rate
    // Videos play at normal speed; scroll just controls which video is shown
    const rate = 1.0
    try {
      if (eVideo.playbackRate !== rate) eVideo.playbackRate = rate
      if (oVideo.playbackRate !== rate) oVideo.playbackRate = rate
    } catch {
      // Some browsers throw on playback rate changes
    }
  }, [localProgress])

  return { entranceRef, outingRef }
}
