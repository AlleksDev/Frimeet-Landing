import { useEffect } from 'react'
import type { Phase } from './useCardTransitionMachine'
import type { Step } from '../data/cardSteps'

/**
 * useVideoPreloader
 * ─────────────────
 * Single Responsibility: Proactively warm the browser's media cache
 * during IDLE phase so the next transition starts instantly.
 *
 * Creates detached \<video\> elements with preload="auto" for:
 *   - Current card's outing video (most likely next action)
 *   - Next card's entrance video (forward scroll)
 *   - Previous card's entrance video (backward scroll)
 *
 * Cleanup releases all element references when phase changes or
 * the component unmounts.
 */
export function useVideoPreloader(
  phase: Phase,
  visualIndex: number,
  cardSteps: Step[],
) {
  const totalCards = cardSteps.length

  useEffect(() => {
    if (phase !== 'IDLE') return

    const toPreload: string[] = [
      // Current card's outing — next scroll will trigger it
      cardSteps[visualIndex].videos.outing,
    ]

    // Next card's entrance (forward scroll)
    if (visualIndex + 1 < totalCards) {
      toPreload.push(cardSteps[visualIndex + 1].videos.entrance)
    }

    // Previous card's entrance (backward scroll)
    if (visualIndex - 1 >= 0) {
      toPreload.push(cardSteps[visualIndex - 1].videos.entrance)
    }

    // Create detached <video> elements to warm browser cache
    const preloadEls = toPreload.map((url) => {
      const v = document.createElement('video')
      v.preload = 'auto'
      v.src = url
      v.muted = true
      return v
    })

    // Cleanup: release references so the browser can GC
    return () => {
      preloadEls.forEach((v) => {
        v.removeAttribute('src')
        v.load() // abort any in-flight network requests
      })
    }
  }, [phase, visualIndex, cardSteps, totalCards])
}
