import { useCallback, useEffect, useRef } from 'react'

/* ================================================================
   Constants
   ================================================================ */

const VIDEO_FPS = 30

const PAUSE_POINTS_FORWARD: number[] = [
  30 / VIDEO_FPS,   // 1.000s
  62 / VIDEO_FPS,   // 2.066s
  96 / VIDEO_FPS,   // 3.200s
  140 / VIDEO_FPS,  // 4.533s
  170 / VIDEO_FPS,  // 5.467s
  194 / VIDEO_FPS,  // 6.467s
  210 / VIDEO_FPS,  // 7.000s (pivot / un-sticky)
]

const PAUSE_POINTS_MIRROR: number[] = [
  226 / VIDEO_FPS,  // 7.533s (mirror of 194)
  250 / VIDEO_FPS,  // 8.533s (mirror of 164)
  280 / VIDEO_FPS,  // 9.467s (mirror of 136)
  324 / VIDEO_FPS,  // 10.800s (mirror of 96)
  358 / VIDEO_FPS,  // 11.933s (mirror of 62)
  390 / VIDEO_FPS,  // 13.000s (mirror of 30)
  420 / VIDEO_FPS,  // 14.000s (video end)
]

const PIVOT_TIME = PAUSE_POINTS_FORWARD[PAUSE_POINTS_FORWARD.length - 1]
const MIRROR_END_TIME = PAUSE_POINTS_MIRROR[PAUSE_POINTS_MIRROR.length - 1]
const VIDEO_DURATION = MIRROR_END_TIME

const CARD_POINT_COUNT = PAUSE_POINTS_FORWARD.length - 1
const TIME_EPSILON = 0.04

type EntryMode = 'forward' | 'mirror'
type ScrollDirection = 'down' | 'up'

/* ================================================================
   Hook
   ================================================================ */

export function useVideoPlayer(
  scrollIndex: number,
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const monitorRafRef = useRef(0)
  const seekRafRef = useRef(0)
  const prevTargetRef = useRef<number | null>(null)
  const entryModeRef = useRef<EntryMode | null>(null)
  const scrollDirectionRef = useRef<ScrollDirection | null>(null)
  const isEnteredRef = useRef(false)
  const lastScrollYRef = useRef(0)

  const scrollIndexRef = useRef(scrollIndex)

  useEffect(() => {
    scrollIndexRef.current = scrollIndex
  }, [scrollIndex])

  const cancelMonitor = useCallback(() => {
    cancelAnimationFrame(monitorRafRef.current)
    monitorRafRef.current = 0
  }, [])

  const cancelSeek = useCallback(() => {
    cancelAnimationFrame(seekRafRef.current)
    seekRafRef.current = 0
  }, [])

  const cancelAll = useCallback(() => {
    cancelMonitor()
    cancelSeek()
  }, [cancelMonitor, cancelSeek])

  const clampCardIndex = useCallback((pointIndex: number) => {
    return Math.max(0, Math.min(CARD_POINT_COUNT - 1, pointIndex))
  }, [])

  const getTargetTime = useCallback(
    (pointIndex: number, mode: EntryMode) => {
      const idx = clampCardIndex(pointIndex)

      if (mode === 'forward') {
        return PAUSE_POINTS_FORWARD[idx]
      }

      // When entering from below, scrollIndex moves 5 -> 0 as the user
      // scrolls upward through the cards. The mirror video must still move
      // forward in time, so the card index maps in reverse.
      const mirrorIndex = CARD_POINT_COUNT - 1 - idx
      return PAUSE_POINTS_MIRROR[mirrorIndex]
    },
    [clampCardIndex],
  )

  const getTrackPoints = useCallback((mode: EntryMode) => {
    return mode === 'forward' ? PAUSE_POINTS_FORWARD : PAUSE_POINTS_MIRROR
  }, [])

  const getNextTrackTime = useCallback(
    (currentTime: number, pointIndex: number, mode: EntryMode) => {
      const target = getTargetTime(pointIndex, mode)
      if (target > currentTime + TIME_EPSILON) return target

      const nextPoint = getTrackPoints(mode).find((point) => point > currentTime + TIME_EPSILON)
      return nextPoint ?? currentTime
    },
    [getTargetTime, getTrackPoints],
  )

  const seekForward = useCallback(
    (target: number) => {
      const video = videoRef.current
      if (!video) return

      const distance = target - video.currentTime
      video.playbackRate = Math.max(1, Math.min(3, distance))

      video.play().catch(() => {
        video.currentTime = target
      })

      const monitor = () => {
        const v = videoRef.current
        if (!v) return

        if (v.currentTime >= target - TIME_EPSILON) {
          v.pause()
          v.currentTime = target
          v.playbackRate = 1
          return
        }

        monitorRafRef.current = requestAnimationFrame(monitor)
      }

      monitorRafRef.current = requestAnimationFrame(monitor)
    },
    [],
  )

  const goToTime = useCallback(
    (target: number) => {
      const video = videoRef.current
      if (!video) return

      if (target === prevTargetRef.current) return
      prevTargetRef.current = target

      cancelAll()

      if (video.currentTime < target - TIME_EPSILON) {
        seekForward(target)
        return
      }

      if (video.currentTime > target + TIME_EPSILON) {
        video.pause()
        video.playbackRate = 1
        return
      }

      video.pause()
      video.currentTime = target
      video.playbackRate = 1
    },
    [cancelAll, seekForward],
  )

  const goToPoint = useCallback(
    (pointIndex: number, preferNextPoint = false) => {
      const mode = entryModeRef.current
      const video = videoRef.current

      if (!video) return
      if (!mode) return

      const target = preferNextPoint
        ? getNextTrackTime(video.currentTime, pointIndex, mode)
        : getTargetTime(pointIndex, mode)

      const safeTarget = target > video.currentTime + TIME_EPSILON
        ? target
        : getNextTrackTime(video.currentTime, pointIndex, mode)

      goToTime(safeTarget)
    },
    [getNextTrackTime, getTargetTime, goToTime],
  )

  const switchTrack = useCallback(
    (nextMode: EntryMode) => {
      const video = videoRef.current
      if (!video || entryModeRef.current === nextMode) return

      cancelAll()
      video.pause()
      video.playbackRate = 1
      video.currentTime = Math.max(0, Math.min(VIDEO_DURATION, VIDEO_DURATION - video.currentTime))

      entryModeRef.current = nextMode
      prevTargetRef.current = null
      goToPoint(scrollIndexRef.current, true)
    },
    [cancelAll, goToPoint],
  )

  const resetPlaybackState = useCallback(() => {
    const video = videoRef.current

    isEnteredRef.current = false
    entryModeRef.current = null
    scrollDirectionRef.current = null
    prevTargetRef.current = null
    cancelAll()

    if (video) {
      video.pause()
      video.playbackRate = 1
    }
  }, [cancelAll])

  useEffect(() => {
    if (!isEnteredRef.current) return
    goToPoint(scrollIndex)
  }, [scrollIndex, goToPoint])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      if (Math.abs(delta) < 1 || !isEnteredRef.current) return

      const nextDirection: ScrollDirection = delta > 0 ? 'down' : 'up'
      if (nextDirection === scrollDirectionRef.current) return

      scrollDirectionRef.current = nextDirection
      switchTrack(nextDirection === 'down' ? 'forward' : 'mirror')
    }

    window.addEventListener('scroll', handleScrollDirection, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollDirection)
    }
  }, [switchTrack])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rect = entry.boundingClientRect

          if (entry.isIntersecting) {
            if (isEnteredRef.current) continue

            cancelAll()
            prevTargetRef.current = null
            isEnteredRef.current = true

            if (rect.top >= 0) {
              entryModeRef.current = 'forward'
              scrollDirectionRef.current = 'down'
              video.pause()
              video.playbackRate = 1
              video.currentTime = 0
            } else {
              entryModeRef.current = 'mirror'
              scrollDirectionRef.current = 'up'
              video.pause()
              video.playbackRate = 1
              video.currentTime = PIVOT_TIME
            }

            lastScrollYRef.current = window.scrollY
            goToPoint(scrollIndexRef.current)
            continue
          }

          if (!isEnteredRef.current) continue

          const mode = entryModeRef.current
          const exitedDown = rect.bottom <= 0
          const exitedUp = rect.top >= window.innerHeight

          cancelAll()
          prevTargetRef.current = null

          if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.playbackRate = 1

            if (mode === 'forward' && exitedDown) {
              videoRef.current.currentTime = PIVOT_TIME
            } else if (mode === 'mirror' && exitedUp) {
              videoRef.current.currentTime = MIRROR_END_TIME
            }
          }

          resetPlaybackState()
        }
      },
      { threshold: 0 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      resetPlaybackState()
    }
  }, [cancelAll, goToPoint, resetPlaybackState, sectionRef])

  return { videoRef }
}
