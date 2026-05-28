import { useEffect, useCallback, useState, useRef } from 'react'

/**
 * useScrollIndex
 * ──────────────
 * Single Responsibility: Maps scroll position → active card index.
 *
 * Listens to passive scroll events on the window. Given a ref to the
 * scroll-pin area, computes how far the user has scrolled through it
 * and returns an integer index in [0, totalCards-1].
 */
export function useScrollIndex(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  totalCards: number,
) {
  const [scrollIndex, setScrollIndex] = useState(0)
  const rafId = useRef(0)

  const handleScroll = useCallback(() => {
    // Throttle to one recalc per animation frame
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = -rect.top
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight

      if (sectionHeight <= 0) return

      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight))
      const newIndex = Math.min(
        totalCards - 1,
        Math.floor(progress * totalCards),
      )

      setScrollIndex(newIndex)
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

  return scrollIndex
}
