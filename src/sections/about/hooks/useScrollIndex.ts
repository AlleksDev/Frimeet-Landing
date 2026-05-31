import { useEffect, useCallback, useState, useRef } from 'react'

/**
 * useScrollIndex (Snap-Based)
 * ───────────────────────────
 * Maps scroll position → active card index + a phase indicator.
 *
 * Each card occupies a scroll zone of 100vh.
 * Within that zone the card goes through 3 phases:
 *   - "entering"  (first 15%):  card animates IN, entrance video plays
 *   - "active"    (15% – 70%):  card is fully visible, video is playing
 *   - "exiting"   (70% – 100%): card animates OUT, outing video plays
 *
 * Returns:
 *   - scrollIndex:   integer in [0, totalCards-1]
 *   - phase:         'entering' | 'active' | 'exiting'
 *   - localProgress: raw float [0, 1] for the current card's scroll zone
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

      setData((prev) => {
        if (
          prev.scrollIndex === newIndex &&
          prev.phase === phase &&
          Math.abs(prev.localProgress - localProgress) < 0.001
        ) {
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
