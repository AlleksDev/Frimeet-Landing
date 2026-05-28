import { useEffect, useRef, useState } from 'react'
import styles from './AboutSection.module.css'
import {
  Sparkles,
  Route,
  Store,
  ShieldCheck,
  Radio,
  Coins,
  ChevronLeft,
  MapPin,
  Clock,
  Globe,
  Cpu,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'

/* ================================================================
   Phone screen – itinerary data
   ================================================================ */
const itinerary = [
  { num: 1, name: 'Café La Estación', type: 'Cafetería', time: '10:00 AM', color: '#FF2D87' },
  { num: 2, name: 'Parque Fundidora', type: 'Parque', time: '11:30 AM', color: '#FF8C00' },
  { num: 3, name: 'Tacos Don Mario', type: 'Comida', time: '1:00 PM', color: '#B8F02D' },
  { num: 4, name: 'Galería MARCO', type: 'Museo', time: '3:00 PM', color: '#FF5900' },
]

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
    layout: 'dual',
    cards: [
      {
        icon: <Store size={20} />,
        title: 'Comercios "Invisibles"',
        description:
          'Rescatamos a la economía de barrio. Formalizamos en el mapa digital a ese 55% de comercios locales que las grandes plataformas ignoran.',
      },
      {
        icon: <ShieldCheck size={20} />,
        title: 'Sistema antifraude',
        description:
          'Cero lugares falsos. Validación cruzada, cruce geoespacial GPS y escaneo documental OCR para asegurar que cada pin exista en la vida real.',
      },
    ],
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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set())

  /* ---- IntersectionObserver for scroll-linked cards ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev)
          entries.forEach((e) => {
            const idx = Number(e.target.getAttribute('data-step'))
            if (e.isIntersecting) next.add(idx)
            else next.delete(idx)
          })
          return next
        })
      },
      { threshold: 0.35, rootMargin: '-8% 0px -8% 0px' }
    )

    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[i] = el
  }

  return (
    <section className={styles.section} id="about">
      <div className={styles.sectionInner}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>Tu ciudad, redescubierta</h2>
          <p className={styles.subtitle}>
            Tecnología de punta para transformar cómo descubres y disfrutas tu
            entorno local.
          </p>
        </Reveal>

        {/* ============================================================
            Scrollytelling: cards track + sticky phone
            ============================================================ */}
        <div className={styles.scrolly}>
          {/* ---- Left: card steps ---- */}
          <div className={styles.cardsTrack}>
            {cardSteps.map((step, i) => (
              <div
                key={i}
                ref={setRef(i)}
                data-step={i}
                className={styles.stepSlot}
              >
                {step.layout === 'single' ? (
                  <div
                    className={`
                      ${styles.card}
                      ${step.gradient ? styles.cardGradient : ''}
                      ${visibleSet.has(i) ? styles.cardVisible : ''}
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
                ) : (
                  <div
                    className={`${styles.dualRow} ${visibleSet.has(i) ? styles.dualRowVisible : ''}`}
                  >
                    {step.cards.map((c, ci) => (
                      <div key={ci} className={styles.cardSmall}>
                        <div className={styles.iconWrap}>{c.icon}</div>
                        <h3 className={styles.cardTitle}>{c.title}</h3>
                        <p className={styles.cardDesc}>{c.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ---- Right: sticky phone ---- */}
          <div className={styles.phoneCol}>
            <div className={styles.phoneSticky}>
              <div className={styles.phone}>
                {/* Notch */}
                <div className={styles.phoneNotch} />

                {/* ---- Screen content ---- */}
                <div className={styles.screen}>
                  {/* Status bar */}
                  <div className={styles.statusBar}>
                    <span>9:41</span>
                    <div className={styles.statusIcons}>
                      <span className={styles.signalDot} />
                      <span className={styles.signalDot} />
                      <span className={styles.signalDot} />
                    </div>
                  </div>

                  {/* App bar */}
                  <div className={styles.appBar}>
                    <ChevronLeft size={18} color="#333" />
                    <span className={styles.appBarTitle}>Mi plan</span>
                    <div style={{ width: 18 }} />
                  </div>

                  {/* Plan header */}
                  <div className={styles.planHeader}>
                    <h4 className={styles.planName}>Salida de sábado</h4>
                    <p className={styles.planMeta}>
                      Sáb, 15 jun · 4 paradas · 3.2 km
                    </p>
                  </div>

                  {/* Map area */}
                  <div className={styles.mapArea}>
                    {/* Simulated streets */}
                    <div className={styles.mapStreetH} style={{ top: '35%' }} />
                    <div className={styles.mapStreetH} style={{ top: '65%' }} />
                    <div className={styles.mapStreetV} style={{ left: '30%' }} />
                    <div className={styles.mapStreetV} style={{ left: '70%' }} />

                    {/* Route line (SVG) */}
                    <svg className={styles.routeLine} viewBox="0 0 200 120" preserveAspectRatio="none">
                      <polyline
                        points="40,20 100,45 60,75 140,95"
                        fill="none"
                        stroke="#FF2D87"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    {/* Pins */}
                    {[
                      { top: '14%', left: '18%' },
                      { top: '34%', left: '48%' },
                      { top: '58%', left: '28%' },
                      { top: '76%', left: '68%' },
                    ].map((pos, pi) => (
                      <span
                        key={pi}
                        className={styles.mapPin}
                        style={{
                          top: pos.top,
                          left: pos.left,
                          background: itinerary[pi].color,
                        }}
                      >
                        {pi + 1}
                      </span>
                    ))}
                  </div>

                  {/* Location list */}
                  <div className={styles.locList}>
                    {itinerary.map((loc) => (
                      <div key={loc.num} className={styles.locItem}>
                        <span
                          className={styles.locNum}
                          style={{ background: loc.color }}
                        >
                          {loc.num}
                        </span>
                        <div className={styles.locInfo}>
                          <span className={styles.locName}>{loc.name}</span>
                          <span className={styles.locMeta}>
                            {loc.type} · {loc.time}
                          </span>
                        </div>
                        <Clock size={12} color="#bbb" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            Alcance Tecnológico y Geográfico
            ============================================================ */}
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

        {/* ============================================================
            Steps: "Tan fácil como 1, 2, 3... ¡Listo!"
            ============================================================ */}
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
