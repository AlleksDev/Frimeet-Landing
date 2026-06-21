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
        className={`${styles.videoLayer} ${styles.videoVisible} ${styles.desktopVideo}`}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
      />
      <div className={styles.mobileVideoPreview} aria-hidden="true">
        <div className={styles.mobileVideoGlow} />
        <video
          className={styles.mobileVideo}
          src={videoSrc}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
        />
        <span className={styles.mobileVideoBadge}>
          <span className={styles.mobileVideoLiveDot} />
          Frimeet en acción
        </span>
      </div>
    </div>
  )
}

export default VideoStage
