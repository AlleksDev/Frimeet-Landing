import type { Step } from '../data/cardSteps'
import type { Phase } from '../hooks/useCardTransitionMachine'
import FeatureCard from './FeatureCard'
import styles from '../AboutSection.module.css'

/**
 * CardStack
 * ─────────
 * Renders the stack of feature cards with animation classes
 * driven by the transition state machine.
 *
 * Animation class mapping:
 *   - FIRST_ENTER / ENTER_IN → entering card gets `.cardSlideEntering`
 *   - IDLE                   → active card gets `.cardSlideActive`
 *   - EXIT_OUT               → exiting card gets `.cardSlideExiting`
 *   - All others             → hidden (opacity 0, no pointer events)
 */
interface CardStackProps {
  cardSteps: Step[]
  visualIndex: number
  exitingIndex: number
  phase: Phase
}

const CardStack = ({ cardSteps, visualIndex, exitingIndex, phase }: CardStackProps) => {
  const getCardClass = (index: number): string => {
    const classes = [styles.cardSlide]

    // The card that is currently entering
    if (index === visualIndex) {
      if (phase === 'FIRST_ENTER' || phase === 'ENTER_IN') {
        classes.push(styles.cardSlideEntering)
      } else if (phase === 'IDLE') {
        classes.push(styles.cardSlideActive)
      } else if (phase === 'EXIT_OUT' || phase === 'SWAPPING') {
        // During exit, the visual index card is the one exiting
        classes.push(styles.cardSlideExiting)
      }
    }

    // The card that is exiting (only during EXIT_OUT / SWAPPING)
    if (
      index === exitingIndex &&
      exitingIndex !== visualIndex &&
      (phase === 'EXIT_OUT' || phase === 'SWAPPING')
    ) {
      classes.push(styles.cardSlideExiting)
    }

    // Cards that have already scrolled past
    if (
      index < visualIndex &&
      index !== exitingIndex &&
      phase !== 'EXIT_OUT' &&
      phase !== 'SWAPPING'
    ) {
      classes.push(styles.cardSlidePast)
    }

    return classes.join(' ')
  }

  return (
    <div className={styles.cardContainer}>
      {cardSteps.map((step, i) => (
        <div key={i} className={getCardClass(i)}>
          <FeatureCard step={step} />
        </div>
      ))}

      {/* Progress indicators */}
      <div className={styles.cardIndicators}>
        {cardSteps.map((_, i) => (
          <span
            key={i}
            className={`${styles.indicator} ${
              i === visualIndex ? styles.indicatorActive : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CardStack
