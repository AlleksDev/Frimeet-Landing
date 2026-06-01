import { useEffect, useCallback, useState, useRef } from 'react'

/**
 * useScrollIndex (Snap-Based)
 * ───────────────────────────
 * Maps scroll position → active card index + a phase indicator.
 *
 * Each card occupies a scroll zone of ~150vh (governed by the CSS
 * height of scrollPinArea). Within that zone the card goes through
 * 3 phases:
 *   - "entering"  (first 15%):  card animates IN
 *   - "active"    (15% – 70%):  card is fully visible
 *   - "exiting"   (70% – 100%): card animates OUT
 *
 * Returns:
 *   - scrollIndex:   integer in [0, totalCards-1]
 *   - phase:         'entering' | 'active' | 'exiting'
 *   - localProgress: raw float [0, 1] for the current card's scroll zone
 *
 * Performance: state updates are gated — only fires a React re-render
 * when scrollIndex or phase change, NOT on every pixel of scroll.
 */
export type Phase = 'entering' | 'active' | 'exiting'

export interface ScrollData {
  scrollIndex: number
  phase: Phase
  localProgress: number
}

export function useScrollIndex(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  totalCards: number,
): ScrollData {
  const [data, setData] = useState<ScrollData>({
    scrollIndex: 0,
    phase: 'entering',
    localProgress: 0,
  })
  const rafId = useRef(0)

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = -rect.top
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight

      if (sectionHeight <= 0) return

      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight))
      const raw = progress * totalCards
      const newIndex = Math.min(totalCards - 1, Math.floor(raw))
      const localProgress = Math.min(1, raw - newIndex)

      // Determine phase based on localProgress within the card's zone
      let phase: Phase
      if (localProgress < 0.15) {
        phase = 'entering'
      } else if (localProgress < 0.70) {
        phase = 'active'
      } else {
        phase = 'exiting'
      }

      // Only trigger a React re-render when index or phase change.
      // localProgress updates are absorbed silently to prevent lag.
      setData((prev) => {
        if (
          prev.scrollIndex === newIndex &&
          prev.phase === phase
        ) {
          // Still update localProgress in the ref-like state object
          // but only if it changed significantly, to avoid unnecessary renders
          return prev
        }
        return { scrollIndex: newIndex, phase, localProgress }
      })
    })
  }, [sectionRef, totalCards])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [handleScroll])

  return data
}
