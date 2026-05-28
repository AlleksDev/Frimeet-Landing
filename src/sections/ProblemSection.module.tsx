import { useEffect, useRef, useState } from 'react'
import styles from './ProblemSection.module.css'
import { TrendingDown, Users, MapPinOff } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const stats = [
  {
    icon: <TrendingDown size={22} />,
    title: '57% cancelan planes',
    description:
      'La mayoría de jóvenes desisten de salir por no encontrar opciones que se ajusten a su presupuesto.',
  },
  {
    icon: <Users size={22} />,
    title: '3 de 5 buscan opciones',
    description:
      'Los grupos de amigos pasan más tiempo decidiendo a dónde ir que disfrutando.',
  },
  {
    icon: <MapPinOff size={22} />,
    title: '80% no conoce su zona',
    description:
      'La mayoría de las personas ignora los comercios y experiencias que existen a menos de 2 km.',
  },
]

const RADIUS = 100
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const PERCENT = 60
const OFFSET = CIRCUMFERENCE - (PERCENT / 100) * CIRCUMFERENCE

const ProblemSection = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)

  /* ---- Intersection Observer para activar la animación ---- */
  useEffect(() => {
    const el = chartRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ---- Counter animado ---- */
  useEffect(() => {
    if (!isVisible) return
    let frame: number
    const start = performance.now()
    const duration = 1600

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * PERCENT))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible])

  return (
    <section className={styles.section} id="problem">
      <div className={styles.container}>
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>
            ¿Por qué salir se ha vuelto{' '}
            <span className={styles.titleAccent}>tan complicado?</span>
          </h2>
          <p className={styles.subtitle}>
            57% de los jóvenes en México cancelan sus planes por falta de opciones
            accesibles y falta de información sobre lugares cercanos.
          </p>
        </Reveal>

        <div className={styles.content}>
          {/* ---- Donut Chart ---- */}
          <Reveal animation="fadeRight" delay={200} duration={800} className={styles.chartWrapper}>
            <div ref={chartRef} className={styles.chart}>
              <svg
                viewBox="0 0 260 260"
                className={styles.donutSvg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5900" />
                    <stop offset="100%" stopColor="#FF2D87" />
                  </linearGradient>
                </defs>

                {/* Fondo del ring */}
                <circle
                  cx="130"
                  cy="130"
                  r={RADIUS}
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="28"
                />

                {/* Ring principal animado */}
                <circle
                  cx="130"
                  cy="130"
                  r={RADIUS}
                  fill="none"
                  stroke="url(#donutGradient)"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={isVisible ? OFFSET : CIRCUMFERENCE}
                  className={styles.donutForeground}
                  transform="rotate(-90 130 130)"
                />
              </svg>

              {/* Texto central */}
              <div className={styles.chartCenter}>
                <span className={styles.chartPercent}>{count}%</span>
                <span className={styles.chartLabel}>cancelan planes</span>
              </div>
            </div>
          </Reveal>

          {/* ---- Tarjetas informativas ---- */}
          <div className={styles.cardsColumn}>
            {stats.map((stat, index) => (
              <Reveal
                key={index}
                animation="fadeLeft"
                delay={300 + index * 150}
                duration={800}
                className={styles.card}
              >
                <div className={styles.cardIcon}>{stat.icon}</div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{stat.title}</h3>
                  <p className={styles.cardDescription}>{stat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
