import { useState } from 'react'
import styles from './PricingSection.module.css'
import { User, Store, Sparkles, Check, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'

/* ---- Roles ---- */
const roles = [
  { icon: <User size={22} />, label: 'Explorador' },
  { icon: <Store size={22} />, label: 'Negocio' },
  { icon: <Sparkles size={22} />, label: 'Creador' },
]

/* ---- Plans ---- */
const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Perfecto para empezar a explorar tu ciudad.',
    features: [
      'Explorar mapa básico',
      'Ver comercios cercanos',
      '3 rutas al mes',
      'Perfil básico',
    ],
    cta: 'Comenzar gratis',
    variant: 'white' as const,
  },
  {
    name: 'Pro',
    price: '$39',
    period: '/mes',
    description: 'Para exploradores serios que quieren más.',
    features: [
      'Rutas ilimitadas',
      'IA conversacional',
      'Filtros avanzados',
      'Rutas colaborativas',
      'Sin anuncios',
      'Soporte prioritario',
    ],
    cta: 'Obtener Pro',
    variant: 'featured' as const,
    badge: 'Popular',
  },
  {
    name: 'Business',
    price: '$867',
    period: '/mes',
    description: 'Para negocios que quieren crecer.',
    features: [
      'Panel de analíticas',
      'Tendencias de búsqueda',
      'Visibilidad premium',
      'Verificación de negocio',
      'API de datos',
      'Soporte dedicado',
      'Reportes mensuales',
    ],
    cta: 'Contactar ventas',
    variant: 'white' as const,
  },
]

const PricingSection = () => {
  const [activeRole, setActiveRole] = useState(0)

  return (
    <>
      {/* ---- Pricing Plans ---- */}
      <section className={styles.pricingSection} id="pricing">
        <div className={styles.pricingContainer}>
          {/* Header */}
          <Reveal animation="fadeUp" delay={0} duration={800} className={styles.pricingHeader}>
            <h2 className={styles.pricingTitle}>
              Encuentra tu<br />
              <span className={styles.pricingTitleGrad}>rol en Frimeet</span>
            </h2>
            <p className={styles.pricingSub}>
              Frimeet no sirve solamente para encontrar nuevos lugares, también
              puedes registrarte como negocio
            </p>
          </Reveal>

          {/* Role Selector */}
          <Reveal animation="fadeUp" delay={100} duration={800} className={styles.roleSelector}>
            {roles.map((role, index) => (
              <button
                key={index}
                className={`${styles.roleTab} ${activeRole === index ? styles.roleTabActive : ''}`}
                onClick={() => setActiveRole(index)}
                type="button"
              >
                <span className={styles.roleTabIcon}>{role.icon}</span>
                <span className={styles.roleTabLabel}>{role.label}</span>
              </button>
            ))}
          </Reveal>

          {/* Pricing Cards */}
          <div className={styles.pricingGrid}>
            {plans.map((plan, index) => (
              <Reveal
                key={index}
                animation="fadeUp"
                delay={200 + index * 150}
                duration={800}
                className={`${styles.planCard} ${
                  plan.variant === 'featured'
                    ? styles.planCardFeatured
                    : styles.planCardWhite
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className={styles.planBadge}>{plan.badge}</span>
                )}

                {/* Plan Name */}
                <p
                  className={`${styles.planName} ${
                    plan.variant === 'featured'
                      ? styles.planNameFeatured
                      : ''
                  }`}
                >
                  {plan.name}
                </p>

                {/* Price */}
                <div className={styles.planPriceRow}>
                  <span
                    className={`${styles.planPrice} ${
                      plan.variant === 'featured'
                        ? styles.planPriceFeatured
                        : ''
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`${styles.planPeriod} ${
                        plan.variant === 'featured'
                          ? styles.planPeriodFeatured
                          : ''
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`${styles.planDesc} ${
                    plan.variant === 'featured'
                      ? styles.planDescFeatured
                      : ''
                  }`}
                >
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className={`${styles.planFeatureItem} ${
                        plan.variant === 'featured'
                          ? styles.planFeatureItemFeatured
                          : ''
                      }`}
                    >
                      <Check
                        size={16}
                        strokeWidth={3}
                        className={
                          plan.variant === 'featured'
                            ? styles.checkFeatured
                            : styles.checkWhite
                        }
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={
                    plan.variant === 'featured'
                      ? styles.btnFeatured
                      : styles.btnOutline
                  }
                  type="button"
                >
                  {plan.cta}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <Reveal
            animation="fadeUp"
            className={styles.ctaInnerContainer}
            delay={0}
            duration={800}
          >
            <h2 className={styles.ctaTitle}>
              ¿Listo para redescubrir<br />tu ciudad?
            </h2>
            <p className={styles.ctaSub}>
              Descarga Frimeet y comienza a crear planes perfectos con tu
              comunidad. Tu próxima aventura está a un tap de distancia.
            </p>
          </Reveal>

          <Reveal
            animation="fadeUp"
            delay={200}
            duration={800}
            className={styles.ctaButtons}
          >
            <button className={styles.btnPrimary} type="button">
              Descarga gratis <ArrowUpRight />
            </button>
            <button className={styles.btnSecondary} type="button">
              Saber más
            </button>
          </Reveal>

          <Reveal
            animation="fadeUp"
            delay={400}
            duration={800}
            className={styles.ctaStats}
          >
            {[
              ['50K+', 'Usuarios activos'],
              ['4.9', 'Rating en store'],
              ['100+', 'Ciudades'],
            ].map(([n, l]) => (
              <div key={l} className={styles.statItem}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default PricingSection
