import type { Step } from '../data/cardSteps'
import type { Phase } from '../hooks/useScrollIndex'
import FeatureCard from './FeatureCard'
import styles from '../AboutSection.module.css'

/**
 * CardStack (Snap-Based)
 * ──────────────────────
 * Renders the stack of feature cards with CSS animation classes
 * driven by discrete phases (entering/active/exiting) — NOT
 * continuous inline styles. This guarantees cards always snap
 * fully in/out and are never partially visible.
 *
 * Phase mapping:
 *   - 'entering': card uses cardSlideEntering class (animates in)
 *   - 'active':   card uses cardSlideActive class (fully visible)
 *   - 'exiting':  card uses cardSlideExiting class (animates out)
 *   - Past cards:  cardSlidePast (hidden above)
 *   - Future cards: default cardSlide (hidden below)
 */
interface CardStackProps {
  cardSteps: Step[]
  scrollIndex: number
  phase: Phase
}

const CardStack = ({ cardSteps, scrollIndex, phase }: CardStackProps) => {
  const getCardClass = (index: number): string => {
    if (index === scrollIndex) {
      switch (phase) {
        case 'entering':
          return styles.cardSlideEntering
        case 'active':
          return styles.cardSlideActive
        case 'exiting':
          return styles.cardSlideExiting
      }
    }

    if (index < scrollIndex) {
      return styles.cardSlidePast
    }

    // Future cards: use default cardSlide (hidden below)
    return ''
  }

  return (
    <div className={styles.cardContainer}>
      {cardSteps.map((step, i) => (
        <div
          key={i}
          className={`${styles.cardSlide} ${getCardClass(i)}`}
        >
          <FeatureCard step={step} />
        </div>
      ))}

      {/* Progress indicators */}
      <div className={styles.cardIndicators}>
        {cardSteps.map((_, i) => (
          <span
            key={i}
            className={`${styles.indicator} ${
              i === scrollIndex ? styles.indicatorActive : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CardStack
