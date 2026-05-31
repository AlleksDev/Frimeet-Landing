import { useEffect } from 'react'
import type { Step } from '../data/cardSteps'

/**
 * useVideoPreloader
 * ─────────────────
 * Proactively warms the browser's media cache by preloading
 * entrance and outing videos for the adjacent cards (±1).
 *
 * Creates detached <video> elements with preload="auto".
 * Cleanup releases all element references when the index changes.
 */
export function useVideoPreloader(
  scrollIndex: number,
  cardSteps: Step[],
) {
  const totalCards = cardSteps.length

  useEffect(() => {
    const toPreload: string[] = []

    // Next card's videos (forward scroll)
    if (scrollIndex + 1 < totalCards) {
      toPreload.push(cardSteps[scrollIndex + 1].videos.entrance)
      toPreload.push(cardSteps[scrollIndex + 1].videos.outing)
    }

    // Previous card's videos (backward scroll)
    if (scrollIndex - 1 >= 0) {
      toPreload.push(cardSteps[scrollIndex - 1].videos.entrance)
      toPreload.push(cardSteps[scrollIndex - 1].videos.outing)
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
  }, [scrollIndex, cardSteps, totalCards])
}
