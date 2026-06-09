import styles from '../AboutSection.module.css'
import videoSrc from '../../../assets/videos/video_complete_bucle.webm'

/**
 * VideoStage
 * ──────────
 * Renders a single <video> element whose playback is controlled
 * imperatively by the useVideoPlayer hook via ref.
 *
 * The video source is a single boomerang video that pauses at specific
 * timestamps synced to the scroll cards.
 */
interface VideoStageProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
}

const VideoStage = ({ videoRef }: VideoStageProps) => {
  return (
    <div className={styles.videoStage}>
      <video
        ref={videoRef}
        className={`${styles.videoLayer} ${styles.videoVisible}`}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}

export default VideoStage
