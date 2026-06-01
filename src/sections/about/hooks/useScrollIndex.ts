import { useEffect, useCallback, useState, useRef } from 'react'

/**
 * useScrollIndex (Snap-Based with Overlap)
 * ─────────────────────────────────────────
 * Maps scroll position → active card index + a phase indicator.
 *
 * Each card occupies a scroll zone of ~150vh (governed by the CSS
 * height of scrollPinArea). Within that zone the card goes through
 * 3 phases:
 *   - "entering"  (first 15%):  card animates IN
 *   - "active"    (15% – 70%):  card is fully visible
 *   - "exiting"   (70% – 100%): card animates OUT
 *
 * OVERLAP: During the "exiting" phase, the NEXT card is simultaneously
 * in its "entering" phase. This prevents any blank space between cards.
 *
 * Returns:
 *   - scrollIndex:   integer in [0, totalCards-1]
 *   - phase:         'entering' | 'active' | 'exiting'
 *   - localProgress: raw float [0, 1] for the current card's scroll zone
 *   - exitingIndex:  index of the card currently exiting (-1 if none)
 *
 * Performance: state updates are gated — only fires a React re-render
 * when scrollIndex, phase, or exitingIndex change.
 */
export type Phase = 'entering' | 'active' | 'exiting'

export interface ScrollData {
  scrollIndex: number
  phase: Phase
  localProgress: number
  /** Index of the card that is currently exiting, or -1 if none */
  exitingIndex: number
}

export function useScrollIndex(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  totalCards: number,
): ScrollData {
  const [data, setData] = useState<ScrollData>({
    scrollIndex: 0,
    phase: 'entering',
    localProgress: 0,
    exitingIndex: -1,
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
      let exitingIndex = -1

      if (localProgress < 0.15) {
        phase = 'entering'
      } else if (localProgress < 0.70) {
        phase = 'active'
      } else {
        // During the exiting phase, the current card exits while
        // the NEXT card enters simultaneously → no blank space
        phase = 'exiting'
        // The current card is exiting, which means the next card
        // should be entering. We signal this via exitingIndex.
        if (newIndex < totalCards - 1) {
          exitingIndex = newIndex
        }
      }

      // Only trigger a React re-render when something visual changes
      setData((prev) => {
        if (
          prev.scrollIndex === newIndex &&
          prev.phase === phase &&
          prev.exitingIndex === exitingIndex
        ) {
          return prev
        }
        return { scrollIndex: newIndex, phase, localProgress, exitingIndex }
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
