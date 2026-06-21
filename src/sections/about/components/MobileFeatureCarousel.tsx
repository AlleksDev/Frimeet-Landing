import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Step } from '../data/cardSteps'
import FeatureCard from './FeatureCard'
import styles from '../AboutSection.module.css'

interface MobileFeatureCarouselProps {
  cardSteps: Step[]
}

const MobileFeatureCarousel = ({ cardSteps }: MobileFeatureCarouselProps) => {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(cardSteps.length - 1, index))
    const rail = railRef.current
    const card = rail?.children[nextIndex] as HTMLElement | undefined

    card?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
    setActiveIndex(nextIndex)
  }

  const handleScroll = () => {
    const rail = railRef.current
    if (!rail) return

    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    Array.from(rail.children).forEach((child, index) => {
      const card = child as HTMLElement
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - railCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  return (
    <div className={styles.mobileFeatures}>
      <div className={styles.mobileFeaturesMeta}>
        <span className={styles.mobileFeaturesEyebrow}>6 funciones conectadas</span>
        <span className={styles.mobileSwipeHint}>Desliza para explorar</span>
      </div>

      <div
        ref={railRef}
        className={styles.mobileCardRail}
        onScroll={handleScroll}
        aria-label="Funciones de Frimeet"
      >
        {cardSteps.map((step, index) => (
          <article
            key={step.title}
            className={styles.mobileCardSlide}
            aria-label={`${index + 1} de ${cardSteps.length}: ${step.title}`}
          >
            <span className={styles.mobileCardNumber}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <FeatureCard step={step} />
          </article>
        ))}
      </div>

      <div className={styles.mobileCarouselControls}>
        <button
          className={styles.mobileCarouselButton}
          type="button"
          onClick={() => goToCard(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Ver función anterior"
        >
          <ArrowLeft size={18} />
        </button>

        <div className={styles.mobileProgress}>
          {cardSteps.map((step, index) => (
            <button
              key={step.title}
              className={`${styles.mobileProgressDot} ${
                index === activeIndex ? styles.mobileProgressDotActive : ''
              }`}
              type="button"
              aria-label={`Ir a ${step.title}`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>

        <span className={styles.mobileCarouselCount}>
          {activeIndex + 1} / {cardSteps.length}
        </span>

        <button
          className={styles.mobileCarouselButton}
          type="button"
          onClick={() => goToCard(activeIndex + 1)}
          disabled={activeIndex === cardSteps.length - 1}
          aria-label="Ver siguiente función"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default MobileFeatureCarousel
