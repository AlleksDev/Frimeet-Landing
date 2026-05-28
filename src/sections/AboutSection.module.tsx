import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './AboutSection.module.css'
import { Map, Target, MessageCircle, Users, BarChart3, CheckCircle } from 'lucide-react'
import { Reveal } from '../components/Reveal'

/* ---- Feature cards data ---- */
const features = [
  {
    icon: <Map size={24} strokeWidth={2.5} />,
    title: 'Rutas optimizadas',
    description:
      'Resolvemos el debate del grupo. Nuestro Algoritmo Genético cruza el presupuesto, las preferencias de la tribu y las distancias (fórmula Haversine) para trazar la ruta de paradas perfecta.',
    video: 'video-card-1.mp4',
  },
  {
    icon: <Target size={24} strokeWidth={2.5} />,
    title: 'Comercios Invisibles',
    description:
      'Rescatamos a la economía de barrio. Formalizamos en el mapa digital a ese 55% de comercios locales emergentes o informales que las grandes plataformas ignoran.',
    video: 'video-card-2.mp4',
  },
  {
    icon: <MessageCircle size={24} strokeWidth={2.5} />,
    title: 'IA Conversacional',
    description:
      'Olvídate de buscar por categorías aburridas. Pídele a nuestra IA en lenguaje natural: "Lugar relajado para hablar de negocios por menos de 500 pesos" y el algoritmo lo traducirá en tu itinerario ideal.',
    video: 'video-card-3.mp4',
  },
  {
    icon: <BarChart3 size={24} strokeWidth={2.5} />,
    title: 'Radar de aforo en tiempo real',
    description:
      '¿Odias llegar y no encontrar mesa? El ecosistema te muestra un semáforo de afluencia antes de salir de casa, optimizando tu tiempo y evitando las multitudes.',
    video: 'video-card-5.mp4',
  },
  {
    icon: <CheckCircle size={24} strokeWidth={2.5} />,
    title: 'Sistema antifraude',
    description:
      'Cero lugares falsos. Implementamos validación cruzada, cruce geoespacial GPS estricto y escaneo documental OCR para asegurar que cada pin en el mapa exista en la vida real.',
    video: 'video-card-6.mp4',
  },
  {
    icon: <Users size={24} strokeWidth={2.5} />,
    title: 'Comunidad activa',
    description:
      'Gana recompensas por explorar. Nuestro sistema gamificado otorga Fricoins a los usuarios que validan la existencia de nuevos comercios, canjeables por meses de Premium y beneficios exclusivos.',
    video: 'video-card-4.mp4',
  },
]

/* ---- Steps data (preserved) ---- */
const steps = [
  {
    number: '1',
    label: 'Explora',
    name: 'Descubre lugares',
    desc: 'Encuentra sitios únicos y negocios invisibles cerca de ti.',
  },
  {
    number: '2',
    label: 'Evalúa',
    name: 'Revisa información',
    desc: 'Lee validaciones reales y datos generados por la comunidad.',
  },
  {
    number: '3',
    label: 'Optimiza',
    name: 'Crea tu ruta',
    desc: 'Genera itinerarios inteligentes con IA y algoritmos genéticos.',
  },
  {
    number: '4',
    label: 'Disfruta',
    name: 'Vive la experiencia',
    desc: 'Explora tu ciudad como nunca antes, con datos reales.',
  },
]

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  /* ---- Callback ref setter ---- */
  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el
    },
    []
  )

  /* ---- Intersection Observer: detect active card ---- */
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index)
          }
        },
        {
          threshold: 0.5,
          rootMargin: '-20% 0px -20% 0px',
        }
      )

      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* ---- Change video when activeIndex changes ---- */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const newSrc = features[activeIndex].video
    if (video.getAttribute('src') !== newSrc) {
      video.src = newSrc
      video.load()
      video.play().catch(() => {
        /* autoplay policy – silent */
      })
    }
  }, [activeIndex])

  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutContainer}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>Tu ciudad, redescubierta</h2>
          <p className={styles.subtitle}>
            Tecnología de punta para transformar cómo descubres y disfrutas tu
            entorno local.
          </p>
        </Reveal>

        {/* ---- Scroll-linked: cards + sticky video ---- */}
        <div className={styles.scrollContent}>
          {/* Left – scrollable cards */}
          <div className={styles.cardsColumn}>
            {features.map((feature, index) => (
              <div
                key={index}
                ref={setCardRef(index)}
                className={`${styles.featureCard} ${
                  activeIndex === index ? styles.featureCardActive : ''
                }`}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureBody}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right – sticky video mockup */}
          <div className={styles.stickyColumn}>
            <div className={styles.stickyWrapper}>
              <div className={styles.phoneMockup}>
                <div className={styles.phoneNotch} />
                <video
                  ref={videoRef}
                  className={styles.phoneVideo}
                  src={features[0].video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Active feature label under phone */}
              <div className={styles.videoLabel}>
                <span className={styles.videoLabelDot} />
                <span className={styles.videoLabelText}>
                  {features[activeIndex].title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Steps "Tan fácil como 1, 2, 3… ¡Listo!" ---- */}
        <div className={styles.stepsSection}>
          <Reveal
            animation="fadeUp"
            delay={0}
            duration={800}
            className={styles.stepsHeader}
          >
            <h3 className={styles.stepsTitle}>Tan facil como</h3>
            <h3 className={styles.stepsTitle}>1, 2, 3... ¡Listo!</h3>
          </Reveal>

          <div className={styles.timelineContainer}>
            {steps.map((step, index) => (
              <Reveal
                key={index}
                animation="fadeLeft"
                delay={index * 150}
                duration={800}
                className={styles.step}
              >
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
