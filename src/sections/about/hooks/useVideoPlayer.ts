import { useEffect, useRef } from 'react'
import type { Phase, Action } from './useCardTransitionMachine'
import type { Step } from '../data/cardSteps'

/**
 * useVideoPlayer
 * ──────────────
 * Single Responsibility: Manages two \<video\> DOM elements (double-buffer)
 * and orchestrates play/swap based on the FSM phase.
 *
 * Anti-flicker strategy:
 *   1. Never hide a layer until the other has a decoded frame on the GPU.
 *   2. play() returns a Promise that resolves AFTER the first frame is painted.
 *   3. Opacity swaps happen in a single rAF paint frame.
 *   4. Both layers use will-change:opacity + translateZ(0) for GPU compositing.
 */
export function useVideoPlayer(
  phase: Phase,
  visualIndex: number,
  exitingIndex: number,
  cardSteps: Step[],
  dispatch: React.Dispatch<Action>,
) {
  const entranceRef = useRef<HTMLVideoElement>(null)
  const outingRef = useRef<HTMLVideoElement>(null)

  // Guard against stale closures — track the latest phase in a ref
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    const eVideo = entranceRef.current
    const oVideo = outingRef.current
    if (!eVideo || !oVideo) return

    const cleanups: (() => void)[] = []
    const on = (
      el: HTMLVideoElement,
      event: string,
      handler: () => void,
    ) => {
      el.addEventListener(event, handler, { once: true })
      cleanups.push(() => el.removeEventListener(event, handler))
    }

    /* ---- FIRST_ENTER: initial load, only play entrance ---- */
    if (phase === 'FIRST_ENTER') {
      eVideo.style.opacity = '1'
      oVideo.style.opacity = '0'

      eVideo.src = cardSteps[visualIndex].videos.entrance
      eVideo.load()

      const play = () => {
        eVideo.play().catch(() => {})
      }

      if (eVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        play()
      } else {
        on(eVideo, 'canplaythrough', play)
      }

      on(eVideo, 'ended', () => dispatch({ type: 'FIRST_ENTER_ENDED' }))
      on(eVideo, 'error', () => dispatch({ type: 'FIRST_ENTER_ENDED' }))
    }

    /* ---- EXIT_OUT: play outing video of the exiting card ---- */
    if (phase === 'EXIT_OUT') {
      const safeExiting = exitingIndex >= 0 ? exitingIndex : visualIndex

      // Load the outing video into the outing layer
      oVideo.src = cardSteps[safeExiting].videos.outing
      oVideo.load()

      const playAndSwap = () => {
        // play() resolves after the browser has decoded the first frame
        oVideo
          .play()
          .then(() => {
            // GPU has the frame → safe to show outing, keep entrance as safety net
            // until outing is fully visible
            requestAnimationFrame(() => {
              oVideo.style.opacity = '1'
              eVideo.style.opacity = '0'
            })
          })
          .catch(() => {
            // Fallback: force swap even on play error
            requestAnimationFrame(() => {
              oVideo.style.opacity = '1'
              eVideo.style.opacity = '0'
            })
          })
      }

      if (oVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        playAndSwap()
      } else {
        on(oVideo, 'canplaythrough', playAndSwap)
      }

      on(oVideo, 'ended', () => dispatch({ type: 'EXIT_ENDED' }))
      on(oVideo, 'error', () => dispatch({ type: 'EXIT_ENDED' }))
    }

    /* ---- ENTER_IN: play entrance video of the new card ---- */
    if (phase === 'ENTER_IN') {
      // Pre-load entrance video into entrance layer while outing is still visible
      eVideo.src = cardSteps[visualIndex].videos.entrance
      eVideo.load()

      const playAndSwap = () => {
        eVideo
          .play()
          .then(() => {
            // GPU has the first frame → atomic swap
            requestAnimationFrame(() => {
              eVideo.style.opacity = '1'
              oVideo.style.opacity = '0'
            })
          })
          .catch(() => {
            requestAnimationFrame(() => {
              eVideo.style.opacity = '1'
              oVideo.style.opacity = '0'
            })
          })
      }

      if (eVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        playAndSwap()
      } else {
        on(eVideo, 'canplaythrough', playAndSwap)
      }

      on(eVideo, 'ended', () => dispatch({ type: 'ENTER_ENDED' }))
      on(eVideo, 'error', () => dispatch({ type: 'ENTER_ENDED' }))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [phase, visualIndex, exitingIndex, cardSteps, dispatch])

  return { entranceRef, outingRef }
}
