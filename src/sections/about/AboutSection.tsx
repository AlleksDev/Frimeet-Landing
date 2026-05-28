import { useRef } from 'react'
import styles from './AboutSection.module.css'
import { Reveal } from '../../components/Reveal'

/* ---- Data ---- */
import { cardSteps, techBadges, stepsData } from './data/cardSteps'

/* ---- Hooks ---- */
import { useScrollIndex } from './hooks/useScrollIndex'
import { useCardTransitionMachine } from './hooks/useCardTransitionMachine'
import { useVideoPlayer } from './hooks/useVideoPlayer'
import { useVideoPreloader } from './hooks/useVideoPreloader'

/* ---- Components ---- */
import CardStack from './components/CardStack'
import VideoStage from './components/VideoStage'

/* ================================================================
   AboutSection
   ════════════
   Thin orchestrator that composes hooks and renders the UI.
   No business logic lives here — it's all delegated to hooks.
   ================================================================ */
const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  /* ---- 1. Scroll → index ---- */
  const scrollIndex = useScrollIndex(sectionRef, cardSteps.length)

  /* ---- 2. FSM: index → transition state ---- */
  const { visualIndex, phase, exitingIndex, dispatch } =
    useCardTransitionMachine(scrollIndex)

  /* ---- 3. Video playback (driven by FSM) ---- */
  const { entranceRef, outingRef } = useVideoPlayer(
    phase,
    visualIndex,
    exitingIndex,
    cardSteps,
    dispatch,
  )

  /* ---- 4. Preload adjacent videos during IDLE ---- */
  useVideoPreloader(phase, visualIndex, cardSteps)

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

                {/* Cards: one at a time, driven by the state machine */}
                <CardStack
                  cardSteps={cardSteps}
                  visualIndex={visualIndex}
                  exitingIndex={exitingIndex}
                  phase={phase}
                />
              </div>

              {/* ---- Right column: video stage ---- */}
              <div className={styles.rightCol}>
                <VideoStage
                  entranceRef={entranceRef}
                  outingRef={outingRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          Below scroll-pinned area (only visible after cards finish)
          ============================================================ */}
      <div className={styles.belowStickyContent}>
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.techReach}>
          <h3 className={styles.techTitle}>Alcance Tecnológico y Geográfico</h3>
          <div className={styles.techBadges}>
            {techBadges.map((b, i) => (
              <div key={i} className={styles.techBadge}>
                <span className={styles.techBadgeIcon}>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

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
