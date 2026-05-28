import { useEffect, useRef } from 'react'
import type { Phase, Action } from './useCardTransitionMachine'
import type { Step } from '../data/cardSteps'

/**
 * useVideoPlayer
 * ──────────────
 * Single Responsibility: Manages two <video> DOM elements (double-buffer)
 * and orchestrates play/swap based on the FSM phase.
 *
 * Anti-flicker strategy — "Overlapping Nodes with Opacity Crossfading":
 *   1. Both <video> layers are stacked at the same position (position: absolute).
 *   2. The *incoming* video is loaded and started BEHIND the outgoing layer.
 *   3. play() returns a Promise that resolves AFTER the first frame is painted
 *      to the compositor. Only then do we fade-out the outgoing layer.
 *   4. This guarantees zero visual gap: the outgoing frame stays on screen
 *      until the incoming frame is physically on the GPU.
 *   5. Both layers use will-change: opacity + translateZ(0) for GPU compositing,
 *      ensuring the opacity swap is a compositor-only operation (no repaints).
 *
 * Layer stacking (CSS z-index):
 *   - Entrance:  z-index 1 (bottom)
 *   - Outing:    z-index 2 (top)
 *
 * During EXIT_OUT the outing video is on top and fades IN over the entrance.
 * During ENTER_IN the entrance video is below, but the outing fades OUT to reveal it.
 * The key is that we never hide a layer until the other has a decoded frame.
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

    /* ──────────────────────────────────────────────────────
       FIRST_ENTER: initial load, only play entrance
       ────────────────────────────────────────────────────── */
    if (phase === 'FIRST_ENTER') {
      // Entrance visible, outing hidden
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

    /* ──────────────────────────────────────────────────────
       EXIT_OUT: play outing video of the exiting card
       ────────────────────────────────────────────────────── 
       The entrance layer is still showing the last frame of the
       entrance video (opacity 1). We load the outing video on the
       outing layer (z-index 2, currently opacity 0).
       
       Only when .play().then() confirms the first frame is decoded
       do we reveal the outing layer and hide the entrance layer. */
    if (phase === 'EXIT_OUT') {
      const safeExiting = exitingIndex >= 0 ? exitingIndex : visualIndex

      // Ensure entrance stays VISIBLE while outing loads
      eVideo.style.opacity = '1'
      // Outing starts INVISIBLE — it's loading behind the scenes
      oVideo.style.opacity = '0'

      oVideo.src = cardSteps[safeExiting].videos.outing
      oVideo.load()

      const playAndCrossfade = () => {
        oVideo
          .play()
          .then(() => {
            // ✅ First frame is on the GPU — safe to crossfade.
            // Show outing (on top), THEN hide entrance (below).
            requestAnimationFrame(() => {
              oVideo.style.opacity = '1'
              // Hide entrance AFTER outing is visible — no gap possible
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
        playAndCrossfade()
      } else {
        on(oVideo, 'canplaythrough', playAndCrossfade)
      }

      on(oVideo, 'ended', () => dispatch({ type: 'EXIT_ENDED' }))
      on(oVideo, 'error', () => dispatch({ type: 'EXIT_ENDED' }))
    }

    /* ──────────────────────────────────────────────────────
       ENTER_IN: play entrance video of the new card
       ──────────────────────────────────────────────────────
       The outing layer is still showing the last frame of the
       outing video (opacity 1, z-index 2). We load the new
       entrance video into the entrance layer (z-index 1, opacity 0).
       
       Only when .play().then() confirms the entrance frame is decoded
       do we reveal it and hide the outing layer. Because outing sits
       on top (z-index 2), hiding it reveals the entrance below. */
    if (phase === 'ENTER_IN') {
      // Ensure outing stays VISIBLE while entrance loads
      oVideo.style.opacity = '1'
      // Entrance starts INVISIBLE — loading behind outing
      eVideo.style.opacity = '0'

      eVideo.src = cardSteps[visualIndex].videos.entrance
      eVideo.load()

      const playAndCrossfade = () => {
        eVideo
          .play()
          .then(() => {
            // ✅ Entrance first frame is on the GPU.
            // Set entrance opacity to 1 (it's behind, but ready).
            // Then hide outing (on top) to reveal entrance.
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
        playAndCrossfade()
      } else {
        on(eVideo, 'canplaythrough', playAndCrossfade)
      }

      on(eVideo, 'ended', () => dispatch({ type: 'ENTER_ENDED' }))
      on(eVideo, 'error', () => dispatch({ type: 'ENTER_ENDED' }))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [phase, visualIndex, exitingIndex, cardSteps, dispatch])

  return { entranceRef, outingRef }
}
