import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './AboutSection.module.css'
import {
  Sparkles,
  Route,
  Store,
  ShieldCheck,
  Radio,
  Coins,
  ArrowRight,
  Globe,
  Cpu,
  Brain,
  MapPin,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'

/* ================================================================
   Card steps – sequence definition
   ================================================================ */
type SingleStep = {
  layout: 'single'
  tag?: string
  icon: React.ReactNode
  title: string
  description: string
  gradient?: boolean
  cta?: string
}

type DualStep = {
  layout: 'dual'
  cards: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
}

type Step = SingleStep | DualStep

const cardSteps: Step[] = [
  {
    layout: 'single',
    tag: 'Inteligencia Artificial',
    icon: <Sparkles size={22} />,
    title: 'Recomendaciones con IA',
    description:
      'Olvídate de buscar por categorías aburridas. Pídele a nuestra IA en lenguaje natural: "Lugar relajado para hablar de negocios por menos de 500 pesos" y el algoritmo lo traducirá en tu itinerario ideal.',
  },
  {
    layout: 'single',
    tag: 'Algoritmos Genéticos',
    icon: <Route size={22} />,
    title: 'Rutas optimizadas',
    description:
      'Resolvemos el debate del grupo. Nuestro Algoritmo Genético cruza el presupuesto, las preferencias de la tribu y las distancias (fórmula Haversine) para trazar la ruta de paradas perfecta.',
  },
  {
    layout: 'single',
    icon: <Store size={20} />,
    title: 'Comercios "Invisibles"',
    description:
      'Rescatamos a la economía de barrio. Formalizamos en el mapa digital a ese 55% de comercios locales que las grandes plataformas ignoran.',
  },
  {
    layout: 'single',
    icon: <ShieldCheck size={20} />,
    title: 'Sistema antifraude',
    description:
      'Cero lugares falsos. Validación cruzada, cruce geoespacial GPS y escaneo documental OCR para asegurar que cada pin exista en la vida real.',
  },
  {
    layout: 'single',
    tag: 'Datos en vivo',
    icon: <Radio size={22} />,
    title: 'Radar de Aforo en Tiempo Real',
    description:
      '¿Odias llegar y no encontrar mesa? El ecosistema te muestra un semáforo de afluencia antes de salir de casa, optimizando tu tiempo y evitando las multitudes.',
  },
  {
    layout: 'single',
    icon: <Coins size={22} />,
    title: 'Economía Interna (Fricoins)',
    description:
      'Gana Fricoins explorando, validando y recomendando lugares. Canjéalos por descuentos exclusivos en comercios locales y meses de Premium.',
    gradient: true,
    cta: 'Empieza a ganar',
  },
]

/* ================================================================
   Video sources per card – replace paths with actual .webm files
   ================================================================ */
const cardVideos: string[] = [
  '/videos/about-card-1.webm', // Recomendaciones con IA
  '/videos/about-card-2.webm', // Rutas optimizadas
  '/videos/about-card-3.webm', // Comercios + Antifraude (dual)
  '/videos/about-card-4.webm', // Radar de Aforo
  '/videos/about-card-5.webm', // Fricoins
]

/* ================================================================
   Tech reach badges
   ================================================================ */
const techBadges = [
  { icon: <Globe size={16} />, label: '3 ciudades piloto' },
  { icon: <Cpu size={16} />, label: 'Algoritmos genéticos' },
  { icon: <Brain size={16} />, label: 'IA conversacional' },
  { icon: <MapPin size={16} />, label: '+500 comercios mapeados' },
]

/* ================================================================
   Steps data (preserved from original)
   ================================================================ */
const steps = [
  { number: '1', label: 'Explora', name: 'Descubre lugares', desc: 'Encuentra sitios únicos y negocios invisibles cerca de ti.' },
  { number: '2', label: 'Evalúa', name: 'Revisa información', desc: 'Lee validaciones reales y datos generados por la comunidad.' },
  { number: '3', label: 'Optimiza', name: 'Crea tu ruta', desc: 'Genera itinerarios inteligentes con IA y algoritmos genéticos.' },
  { number: '4', label: 'Disfruta', name: 'Vive la experiencia', desc: 'Explora tu ciudad como nunca antes, con datos reales.' },
]

/* ================================================================
   Component
   ================================================================ */
const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const totalCards = cardSteps.length
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  /* ---- Scroll-linked card index calculation ---- */
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = -rect.top
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight

    if (sectionHeight <= 0) return

    // Calculate scroll progress within the section (0 to 1)
    const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight))

    // Map progress to card index
    const cardIndex = Math.min(
      totalCards - 1,
      Math.floor(progress * totalCards)
    )

    setActiveCard(cardIndex)
  }, [totalCards])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial calc
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* ---- Play/pause videos on card change ---- */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeCard) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeCard])

  /* ---- Render a single card ---- */
  const renderCard = (step: Step) => {
    if (step.layout === 'single') {
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

    return (
      <div className={styles.dualRow}>
        {step.cards.map((c, ci) => (
          <div key={ci} className={styles.cardSmall}>
            <div className={styles.iconWrap}>{c.icon}</div>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardDesc}>{c.description}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className={styles.section} id="about">
      {/* Scroll-pin area: tall spacer that drives the card scroll */}
      <div className={styles.scrollPinArea} ref={sectionRef}>
        {/* Sticky viewport – pinned to screen */}
        <div className={styles.stickyViewport}>
          <div className={styles.stickyInner}>
            {/* ============================================
                Two-column layout: Left (text+cards) | Right (video)
                ============================================ */}
            <div className={styles.twoColumns}>
              {/* ---- Left column ---- */}
              <div className={styles.leftCol}>
                {/* Header: title + subtitle (static) */}
                <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
                  <h2 className={styles.title}>Tu ciudad, redescubierta</h2>
                  <p className={styles.subtitle}>
                    Tecnología de punta para transformar cómo descubres y disfrutas tu
                    entorno local.
                  </p>
                </Reveal>

                {/* Cards area (scroll-driven, one at a time) */}
                <div className={styles.cardContainer}>
                  {cardSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`${styles.cardSlide} ${
                        i === activeCard ? styles.cardSlideActive : ''
                      } ${
                        i < activeCard ? styles.cardSlideExit : ''
                      }`}
                    >
                      {renderCard(step)}
                    </div>
                  ))}

                  {/* Card progress indicator */}
                  <div className={styles.cardIndicators}>
                    {cardSteps.map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.indicator} ${
                          i === activeCard ? styles.indicatorActive : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ---- Right column: Video (static, content swaps) ---- */}
              <div className={styles.rightCol}>
                <div className={styles.videoWrapper}>
                  {cardVideos.map((src, i) => (
                    <video
                      key={i}
                      ref={(el) => { videoRefs.current[i] = el }}
                      className={`${styles.videoPlayer} ${
                        i === activeCard ? styles.videoActive : ''
                      }`}
                      src={src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ))}
                  {/* Fallback when video not loaded */}
                  <div className={styles.videoPlaceholder}>
                    <span className={styles.videoPlaceholderIcon}>▶</span>
                    <span className={styles.videoPlaceholderText}>Video demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          Below the scroll-pinned area: Tech Reach + Steps
          (outside scrollPinArea so it only appears after cards finish)
          ============================================================ */}
      <div className={styles.belowStickyContent}>
        {/* Alcance Tecnológico y Geográfico */}
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

        {/* Steps: "Tan fácil como 1, 2, 3... ¡Listo!" */}
        <div className={styles.stepsSection}>
          <Reveal animation="fadeUp" delay={0} duration={800} className={styles.stepsHeader}>
            <h3 className={styles.stepsTitle}>Tan facil como</h3>
            <h3 className={styles.stepsTitle}>1, 2, 3... ¡Listo!</h3>
          </Reveal>

          <div className={styles.timelineContainer}>
            {steps.map((step, index) => (
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
