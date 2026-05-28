import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './ProblemSection.module.css'
import {
  LayoutGrid,
  TrendingDown,
  MapPinOff,
  ChevronLeft,
  ChevronRight,
  Link2,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'

/* ---- Card data ---- */
const cards = [
  {
    icon: <LayoutGrid size={24} />,
    title: 'El FOBO y la parálisis social',
    percent: 60,
    description:
      'de los jóvenes adultos sufre de FOBO (Fear Of Better Options), un fenómeno psicológico donde la sobreabundancia de opciones retrasa la decisión, causando que 3 de cada 10 planes grupales se cancelen.',
    source: 'CivicScience y YouGov',
  },
  {
    icon: <TrendingDown size={24} />,
    title: 'Cancelación de planes sociales',
    percent: 57,
    description:
      'de los jóvenes en México cancelan sus planes por falta de opciones accesibles, falta de información sobre lugares cercanos y dificultad para coordinar grupos.',
    source: 'INEGI y Deloitte',
  },
  {
    icon: <MapPinOff size={24} />,
    title: 'La economía local invisible',
    percent: 80,
    description:
      'de las personas no conoce los comercios y experiencias que existen a menos de 2 km de su hogar, dejando miles de micronegocios sin visibilidad digital.',
    source: 'INADEM y Google',
  },
]

/* ========================================
   3D Donut – SVG arc helpers
   ======================================== */
const CX = 150
const CY = 150

// 1. Definimos radios separados para cada color para hacer el rosa más ancho
const OUTER_R_PINK = 125
const INNER_R_PINK = 55
const OUTER_R_ORANGE = 105
const INNER_R_ORANGE = 55

// 2. Aumentamos las capas y reducimos el espaciado para un 3D sólido
const DEPTH_LAYERS = 10
const LAYER_SPACING = 4

/** Base RGB colors for the two segments */
const PINK = { r: 255, g: 45, b: 135 }  // #FF2D87
const ORANGE = { r: 255, g: 140, b: 0 }  // #FF8C00

/** Convert degrees (0 = top) to cartesian on a circle */
function toXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** 3. Modificamos arcPath para recibir innerR y outerR dinámicamente */
function arcPath(startDeg: number, endDeg: number, innerR: number, outerR: number): string {
  const span = endDeg - startDeg
  if (span <= 0.1) return ''

  const oS = toXY(CX, CY, outerR, startDeg)
  const oE = toXY(CX, CY, outerR, endDeg)
  const iS = toXY(CX, CY, innerR, startDeg)
  const iE = toXY(CX, CY, innerR, endDeg)
  const lg = span > 180 ? 1 : 0

  return [
    `M${oS.x},${oS.y}`,
    `A${outerR},${outerR} 0 ${lg} 1 ${oE.x},${oE.y}`,
    `L${iE.x},${iE.y}`,
    `A${innerR},${innerR} 0 ${lg} 0 ${iS.x},${iS.y}`,
    'Z',
  ].join(' ')
}

/** Darken an RGB colour by a factor (0‑1) */
function shade(c: { r: number; g: number; b: number }, f: number) {
  return `rgb(${Math.round(c.r * f)},${Math.round(c.g * f)},${Math.round(c.b * f)})`
}

/* ======================================== */

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const chartRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animPercent, setAnimPercent] = useState(0)
  const animRef = useRef(0)

  /* ---- Mobile detection ---- */
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  /* ---- Dynamic 3D parameters ---- */
  const depthLayers = isMobile ? 12 : DEPTH_LAYERS
  const layerSpacing = isMobile ? 4 : LAYER_SPACING
  const sideStrokeWidth = isMobile ? '3' : '1'

  const activeCard = cards[activeIndex]

  /* ---- Navigate carousel ---- */
  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % cards.length) + cards.length) % cards.length)
  }, [])

  /* ---- Intersection Observer ---- */
  useEffect(() => {
    const el = chartRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* ---- Animate counter & donut ---- */
  useEffect(() => {
    if (!isVisible) return

    const target = activeCard.percent
    const from = animRef.current
    let frame: number
    const t0 = performance.now()
    const dur = 1100

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const val = from + (target - from) * ease
      animRef.current = val
      setAnimPercent(val)
      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, activeIndex])

  /* ---- 4. Compute SVG arcs pasando los nuevos radios ---- */
  const pinkEnd = (animPercent / 100) * 360
  const pinkD = arcPath(0, pinkEnd, INNER_R_PINK, OUTER_R_PINK)
  const orangeD = arcPath(pinkEnd, 360, INNER_R_ORANGE, OUTER_R_ORANGE)

  return (
    <section className={styles.section} id="problem">
      <div className={styles.container}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>
            ¿Por qué salir se ha vuelto tan complicado?
          </h2>
          <p className={styles.subtitle}>
            No es falta de lugares, es un colapso en la toma de decisiones y una
            economía local oculta.
          </p>
        </Reveal>

        {/* ---- Content ---- */}
        <div className={styles.content}>
          {/* ======== 3-D Donut Chart ======== */}
          {/* ======== 3-D Donut Chart ======== */}
          <Reveal animation="fadeRight" delay={200} duration={800} className={styles.chartArea}>
            <div className={styles.donut3dContainer}>
              
              {/* Definición de los degradados para la iluminación superior */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient id="pinkLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF7EB3" /> {/* Luz alta */}
                    <stop offset="100%" stopColor="#FF2D87" /> {/* Color base */}
                  </linearGradient>
                  <linearGradient id="orangeLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB347" /> {/* Luz alta */}
                    <stop offset="100%" stopColor="#FF8C00" /> {/* Color base */}
                  </linearGradient>
                </defs>
              </svg>

              <div ref={chartRef} className={styles.donut3d}>
                {Array.from({ length: depthLayers }, (_, i) => {
                  const z = -i * layerSpacing
                  
                  // Identificamos si es la tapa superior
                  const isTop = i === 0
                  
                  // Tonos mucho más suaves: en lugar de bajar a 0.35, bajamos de 0.85 a 0.70
                  // El salto brusco de 1 (top) a 0.85 (sides) crea la "esquina dura"
                  const f = isTop ? 1 : 0.85 - (i / depthLayers) * 0.15
                  
                  // Colores: La capa superior usa el degradado, las demás usan el color sólido suavizado
                  const pinkFill = isTop ? "url(#pinkLight)" : shade(PINK, f)
                  const orangeFill = isTop ? "url(#orangeLight)" : shade(ORANGE, f)

                  return (
                    <svg
                      key={i}
                      viewBox="0 0 300 300"
                      className={styles.donutLayer}
                      style={{ transform: `translateZ(${z}px)` }}
                    >
                      {pinkD && (
                        <path 
                          d={pinkD} 
                          fill={pinkFill} 
                          // El stroke elimina el borde suave (anti-aliasing) entre capas
                          stroke={isTop ? "none" : pinkFill} 
                          strokeWidth={isTop ? "0" : sideStrokeWidth} 
                          strokeLinejoin="round"
                        />
                      )}
                      {orangeD && (
                        <path 
                          d={orangeD} 
                          fill={orangeFill} 
                          stroke={isTop ? "none" : orangeFill} 
                          strokeWidth={isTop ? "0" : sideStrokeWidth} 
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                  )
                })}

                {/* Center label */}
                <div className={styles.chartCenter}>
                  <span className={styles.chartPercent}>
                    {Math.round(animPercent)}%
                  </span>
                </div>
              </div>

              {/* Ground shadow - También suavicé un poco la sombra proyectada si lo deseas */}
              <div className={styles.donutShadow} style={{ opacity: 0.6 }} />
            </div>
          </Reveal>

          {/* ======== Carousel Card ======== */}
          <Reveal animation="fadeLeft" delay={300} duration={800} className={styles.carouselArea}>
            {/* Decorative blob */}
            <div className={styles.decorBlob} />

            <div className={styles.carouselContainer}>
              {/* Prev */}
              <button
                className={styles.navBtn}
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Anterior"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Card */}
              <div className={styles.card} key={activeIndex}>
                <div className={styles.cardIconWrapper}>{activeCard.icon}</div>
                <h3 className={styles.cardTitle}>{activeCard.title}</h3>
                <span className={styles.cardPercent}>
                  {Math.round(animPercent)}%
                </span>
                <p className={styles.cardDescription}>{activeCard.description}</p>
                <div className={styles.cardSource}>
                  <Link2 size={24} />
                  <span>Fuente: {activeCard.source}</span>
                </div>
              </div>

              {/* Next */}
              <button
                className={styles.navBtn}
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Siguiente"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Indicator dots */}
            <div className={styles.indicators}>
              {cards.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Card ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection