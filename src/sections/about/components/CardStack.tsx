import type { Step } from '../data/cardSteps'
import type { Phase, ScrollDirection } from '../hooks/useScrollIndex'
import FeatureCard from './FeatureCard'
import styles from '../AboutSection.module.css'

/**
 * CardStack (Snap-Based with Overlap)
 * ────────────────────────────────────
 * Renders the stack of feature cards with CSS animation classes
 * driven by discrete phases (entering/active/exiting) — NOT
 * continuous inline styles.
 *
 * OVERLAP: When a card is in the "exiting" phase, the NEXT card
 * simultaneously enters — preventing any blank space between
 * card transitions.
 *
 * Phase mapping:
 *   - 'entering': card uses cardSlideEntering class (animates in)
 *   - 'active':   card uses cardSlideActive class (fully visible)
 *   - 'exiting':  card uses cardSlideExiting class (animates out)
 *                 AND the next card uses cardSlideEntering
 *   - Past cards:  cardSlidePast (hidden above)
 *   - Future cards: default cardSlide (hidden below)
 */
interface CardStackProps {
  cardSteps: Step[]
  scrollIndex: number
  activeIndex: number
  phase: Phase
  direction: ScrollDirection
  /** Index of the card currently exiting, -1 if none */
  exitingIndex: number
}

const CardStack = ({
  cardSteps,
  scrollIndex,
  activeIndex,
  phase,
  direction,
  exitingIndex,
}: CardStackProps) => {
  const getCardClass = (index: number): string => {
    if (phase === 'exiting' && exitingIndex >= 0) {
      if (direction === 'down') {
        // The current card exits while the next one enters.
        if (index === exitingIndex) {
          return styles.cardSlideExiting
        }

        if (index === exitingIndex + 1) {
          return styles.cardSlideEntering
        }
      }

      // Reverse transition: the next card leaves and the previous one returns.
      if (index === exitingIndex) {
        return styles.cardSlideEnteringReverse
      }

      if (index === exitingIndex + 1) {
        return styles.cardSlideExitingReverse
      }
    }

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
              i === activeIndex ? styles.indicatorActive : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CardStack
