import { useRef } from 'react'
import styles from './AboutSection.module.css'
import { Reveal } from '../../components/Reveal'

/* ---- Data ---- */
import { cardSteps, stepsData } from './data/cardSteps'

/* ---- Hooks ---- */
import { useScrollIndex } from './hooks/useScrollIndex'
import { useVideoPlayer } from './hooks/useVideoPlayer'

/* ---- Components ---- */
import CardStack from './components/CardStack'
import MobileFeatureCarousel from './components/MobileFeatureCarousel'
import VideoStage from './components/VideoStage'

/* ================================================================
   AboutSection
   ════════════
   Thin orchestrator that composes hooks and renders the UI.
   Scroll position drives card transitions and a single continuous
   video that pauses at frame-precise timestamps.
   ================================================================ */
const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  /* ---- 1. Scroll → index + phase + local progress ---- */
  const { scrollIndex, activeIndex, phase, direction, exitingIndex } = useScrollIndex(
    sectionRef,
    cardSteps.length,
  )

  /* ---- 2. Video playback (native play forward, seek backward) ---- */
  const { videoRef } = useVideoPlayer(activeIndex, sectionRef)

  /* ================================================================
     JSX
     ================================================================ */
  return (
    <section className={styles.section} id="about">
      {/* Scroll-pin area: tall spacer that drives the scroll math */}
      <div className={styles.scrollPinArea} ref={sectionRef}>
        {/* Sticky viewport – pinned to screen while scrolling */}
        <div className={styles.stickyViewport}>
          <div className={styles.stickyInner}>
            <div className={styles.twoColumns}>
              {/* ---- Left column: title + cards ---- */}
              <div className={styles.leftCol}>
                <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
                  <h2 className={styles.title}>Tu ciudad, redescubierta</h2>
                  <p className={styles.subtitle}>
                    Tecnología de punta para transformar cómo descubres y
                    disfrutas tu entorno local.
                  </p>
                </Reveal>

                {/* Cards: driven by scroll position */}
                <CardStack
                  cardSteps={cardSteps}
                  scrollIndex={scrollIndex}
                  activeIndex={activeIndex}
                  phase={phase}
                  direction={direction}
                  exitingIndex={exitingIndex}
                />
                <MobileFeatureCarousel cardSteps={cardSteps} />
              </div>

              {/* ---- Right column: video stage ---- */}
              <div className={styles.rightCol}>
                <VideoStage videoRef={videoRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          Below scroll-pinned area (only visible after cards finish)
          ============================================================ */}
      <div className={styles.belowStickyContent}>

        <div className={styles.stepsSection}>
          <Reveal animation="fadeUp" delay={0} duration={800} className={styles.stepsHeader}>
            <h3 className={styles.stepsTitle}>Tan facil como</h3>
            <h3 className={styles.stepsTitle}>1, 2, 3... ¡Listo!</h3>
          </Reveal>

          <div className={styles.timelineContainer}>
            {stepsData.map((step, index) => (
              <Reveal key={index} animation="fadeLeft" delay={index * 150} duration={800} className={styles.step}>
                <div className={styles.stepCircle}>{step.number}</div>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <h4 className={styles.stepName}>{step.name}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
