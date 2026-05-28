import { forwardRef } from 'react'
import styles from '../AboutSection.module.css'

/**
 * VideoStage
 * ──────────
 * Renders the two stacked \<video\> elements used for double-buffered
 * entrance/outing transitions. Opacity is controlled imperatively by
 * the useVideoPlayer hook via refs — no React re-renders involved.
 *
 * Layer stacking:
 *   - Entrance layer: z-index 1 (bottom)
 *   - Outing layer:   z-index 2 (top)
 */
interface VideoStageProps {
  entranceRef: React.RefObject<HTMLVideoElement | null>
  outingRef: React.RefObject<HTMLVideoElement | null>
}

const VideoStage = forwardRef<HTMLDivElement, VideoStageProps>(
  ({ entranceRef, outingRef }, _ref) => {
    return (
      <div className={styles.videoStage}>
        {/* Entrance layer (z-index: 1) — opacity controlled by JS */}
        <video
          ref={entranceRef}
          className={`${styles.videoLayer} ${styles.videoEntrance}`}
          muted
          playsInline
          preload="auto"
        />

        {/* Outing layer (z-index: 2, always on top) — opacity controlled by JS */}
        <video
          ref={outingRef}
          className={`${styles.videoLayer} ${styles.videoOuting}`}
          muted
          playsInline
          preload="auto"
        />
      </div>
    )
  },
)

VideoStage.displayName = 'VideoStage'

export default VideoStage
