import { ArrowRight } from 'lucide-react'
import type { Step } from '../data/cardSteps'
import styles from '../AboutSection.module.css'

/**
 * FeatureCard
 * ───────────
 * Pure presentational component. Renders a single feature card
 * with optional gradient styling and CTA button.
 */
interface FeatureCardProps {
  step: Step
}

const FeatureCard = ({ step }: FeatureCardProps) => {
  return (
    <div
      className={`
        ${styles.card}
        ${step.gradient ? styles.cardGradient : ''}
      `}
    >
      {step.tag && (
        <span className={step.gradient ? styles.tagGrad : styles.tag}>
          {step.tag}
        </span>
      )}
      <div className={step.gradient ? styles.iconWrapGrad : styles.iconWrap}>
        {step.icon}
      </div>
      <h3 className={step.gradient ? styles.cardTitleGrad : styles.cardTitle}>
        {step.title}
      </h3>
      <p className={step.gradient ? styles.cardDescGrad : styles.cardDesc}>
        {step.description}
      </p>
      {step.cta && (
        <button className={styles.ctaBtn} type="button">
          {step.cta} <ArrowRight size={16} />
        </button>
      )}
    </div>
  )
}

export default FeatureCard
