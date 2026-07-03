import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
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
    description: 'de los adultos sufre de FOBO (Fear Of Better Options), un fenómeno psicológico donde la sobreabundancia de opciones retrasa o destruye la toma de decisiones. Esto ahoga los grupos de WhatsApp en debates interminables. Frimeet corta el ruido: conectamos a tu Tribu (Club) directamente con el lugar perfecto utilizando nuestro motor geoespacial',
    source: 'The Fear of Better Options is Real, CivicScience',
    link: 'https://civicscience.com/the-fear-of-better-options-is-real/',
  },
  {
    icon: <TrendingDown size={24} />,
    title: 'Cancelación de planes sociales',
    percent: 53,
    description: 'de las personas considera completamente aceptable cancelar planes sociales en el último minuto. ¿Por qué los planes se caen? Por la fricción. El estrés de coordinar horarios, calcular distancias y cuadrar presupuestos grupales agota a la Tribu antes de salir de casa. Al optimizar las rutas automáticamente, eliminamos la fricción y salvamos el plan.',
    source: 'Ever agree to plans and later wish you hadn’t?, YouGov',
    link: 'https://yougov.com/en-us/articles/43369-plans-later-wish-you-hadnt-cancel-poll',
  },
  {
    icon: <MapPinOff size={24} />,
    title: 'La economía local invisible',
    percent: 84,
    description: 'de las búsquedas locales son de "descubrimiento" (la gente busca categorías como "cafetería" o "tacos", no marcas específicas). Sin embargo, los usuarios desconfían de las reseñas falsas. Frimeet soluciona esto con sus "Exploradores", quienes validan los lugares físicamente a cambio de Fricoins, garantizando que el destino sea real y seguro.',
    source: 'Google My Business Insights Study , BrightLocal',
    link: 'https://www.brightlocal.com/research/google-my-business-insights-study/',
  },
]

/* ========================================
   Desktop SVG helpers (unchanged logic)
   ======================================== */
const CX = 150
const CY = 150
const OUTER_R_PINK = 125
const INNER_R_PINK = 55
const OUTER_R_ORANGE = 105
const INNER_R_ORANGE = 55
const DEPTH_LAYERS = 10
const LAYER_SPACING = 4
const PINK = { r: 255, g: 45, b: 135 }
const ORANGE = { r: 255, g: 140, b: 0 }

function toXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(
  startDeg: number,
  endDeg: number,
  innerR: number,
  outerR: number
): string {
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

function shade(c: { r: number; g: number; b: number }, f: number) {
  return `rgb(${Math.round(c.r * f)},${Math.round(c.g * f)},${Math.round(c.b * f)})`
}

/* ========================================
   Canvas 3D Donut — single element, fast on mobile
   ======================================== */
/* ========================================
   Canvas 3D Donut — single element, fast on mobile
   ======================================== */
function drawCanvasDonut(
  ctx: CanvasRenderingContext2D,
  size: number,
  percent: number
) {
  ctx.clearRect(0, 0, size, size)

  const scale = size / 300
  const cx = size / 2
  const cy = size / 2 - 15 * scale // Ajuste hacia arriba para centrar
  
  const outerRPink = OUTER_R_PINK * scale
  const outerROrange = OUTER_R_ORANGE * scale
  const innerR = INNER_R_PINK * scale
  
  const depth = 28 * scale
  const STEPS = 12 // Aumentamos un poco para mayor solidez

  const pinkFrac = Math.max(0, Math.min(percent, 100)) / 100
  const pinkAngle = pinkFrac * Math.PI * 2
  const startAngle = -Math.PI / 2

  // Dibujamos las capas de abajo hacia arriba (i=0 es la capa superior)
  for (let i = STEPS; i >= 0; i--) {
    const t = i / STEPS
    const yOff = t * depth
    const isTop = i === 0
    // Suavizado del gradiente lateral
    const f = isTop ? 1 : 0.65 + (1 - t) * 0.20 

    ctx.save()
    
    // 1. Desplazamos hacia abajo para crear la pared recta
    ctx.translate(cx, cy + yOff)
    // 2. Achicamos en Y para simular la rotación 3D (rotateX)
    ctx.scale(1, 0.65)
    // 3. Rotamos para la inclinación (rotateZ)
    ctx.rotate(-12 * Math.PI / 180)

    // --- Render Sección Rosa ---
    if (pinkAngle > 0.01) {
      if (isTop) {
        const gPink = ctx.createLinearGradient(-outerRPink, -outerRPink, outerRPink, outerRPink)
        gPink.addColorStop(0, '#FF7EB3')
        gPink.addColorStop(1, '#FF2D87')
        ctx.fillStyle = gPink
      } else {
        ctx.fillStyle = `rgb(${Math.round(255 * f)},${Math.round(45 * f)},${Math.round(135 * f)})`
      }
      ctx.beginPath()
      ctx.arc(0, 0, outerRPink, startAngle, startAngle + pinkAngle)
      ctx.arc(0, 0, innerR, startAngle + pinkAngle, startAngle, true)
      ctx.closePath()
      ctx.fill()
      
      // El borde (stroke) sella el efecto rayado entre capas
      if (!isTop) {
        ctx.strokeStyle = ctx.fillStyle
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    // --- Render Sección Naranja ---
    if (pinkAngle < Math.PI * 2 - 0.01) {
      if (isTop) {
        const gOrange = ctx.createLinearGradient(-outerROrange, -outerROrange, outerROrange, outerROrange)
        gOrange.addColorStop(0, '#FFB347')
        gOrange.addColorStop(1, '#FF8C00')
        ctx.fillStyle = gOrange
      } else {
        ctx.fillStyle = `rgb(${Math.round(255 * f)},${Math.round(140 * f)},0)`
      }
      ctx.beginPath()
      ctx.arc(0, 0, outerROrange, startAngle + pinkAngle, startAngle + Math.PI * 2)
      ctx.arc(0, 0, innerR, startAngle + Math.PI * 2, startAngle + pinkAngle, true)
      ctx.closePath()
      ctx.fill()
      
      if (!isTop) {
        ctx.strokeStyle = ctx.fillStyle
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }
    ctx.restore()
  }
}

/* ---- Canvas wrapper component ---- */
interface CanvasDonutProps {
  animPercent: number
  chartCenterClass: string
  chartPercentClass: string
}

const CanvasDonut = ({
  animPercent,
  chartCenterClass,
  chartPercentClass,
}: CanvasDonutProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Use devicePixelRatio capped at 2 — retina without overdoing it
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const LOGICAL_SIZE = 300

    if (canvas.width !== LOGICAL_SIZE * dpr) {
      canvas.width = LOGICAL_SIZE * dpr
      canvas.height = LOGICAL_SIZE * dpr
      canvas.style.width = `${LOGICAL_SIZE}px`
      canvas.style.height = `${LOGICAL_SIZE}px`
      ctx.scale(dpr, dpr)
    }

    drawCanvasDonut(ctx, LOGICAL_SIZE, animPercent)
  }, [animPercent])

  return (
    <div style={{ position: 'relative', width: 300, height: 300 }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {/* Reuse the same CSS classes as the SVG version */}
      <div className={chartCenterClass}>
        <span className={chartPercentClass}>
          {Math.round(animPercent)}%
        </span>
      </div>
    </div>
  )
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
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

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
  }, [isVisible, activeIndex, activeCard.percent])

  /* ---- Desktop: memoize SVG arc paths (only recalculate when animPercent changes) ---- */
  const { pinkD, orangeD } = useMemo(() => {
    const pinkEnd = (animPercent / 100) * 360
    return {
      pinkD: arcPath(0, pinkEnd, INNER_R_PINK, OUTER_R_PINK),
      orangeD: arcPath(pinkEnd, 360, INNER_R_ORANGE, OUTER_R_ORANGE),
    }
  }, [animPercent])

  /* ---- Desktop: memoize layer array (only depends on pinkD/orangeD) ---- */
  const desktopLayers = useMemo(
    () =>
      Array.from({ length: DEPTH_LAYERS }, (_, i) => {
        const z = -i * LAYER_SPACING
        const isTop = i === 0
        const f = isTop ? 1 : 0.85 - (i / DEPTH_LAYERS) * 0.15
        const pinkFill = isTop ? 'url(#pinkLight)' : shade(PINK, f)
        const orangeFill = isTop ? 'url(#orangeLight)' : shade(ORANGE, f)
        return { i, z, isTop, pinkFill, orangeFill }
      }),
    // Re-memoize only when the paths change (i.e. on each animation frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pinkD, orangeD]
  )

  return (
    <section className={styles.section} id="problem">
      <div className={styles.container}>
        {/* ---- Header ---- */}
        <Reveal
          animation="fadeUp"
          delay={0}
          duration={800}
          className={styles.header}
        >
          <h2 className={styles.title}>
            ¿Por qué salir se ha vuelto tan complicado?
          </h2>
          <p className={styles.subtitle}>
            No es falta de lugares, es un colapso en la toma de decisiones y
            una economía local oculta.
          </p>
        </Reveal>

        {/* ---- Content ---- */}
        <div className={styles.content}>
          {/* ======== Chart area ======== */}
          <Reveal
            animation="fadeRight"
            delay={200}
            duration={800}
            className={styles.chartArea}
          >
            <div className={styles.donut3dContainer}>
              {/* ---- MOBILE: single Canvas element ---- */}
              {isMobile ? (
                <div ref={chartRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <CanvasDonut
                    animPercent={animPercent}
                    chartCenterClass={styles.chartCenter}
                    chartPercentClass={styles.chartPercent}
                  />
                </div>
              ) : (
                /* ---- DESKTOP: original CSS 3D SVG stack ---- */
                <>
                  <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                      <linearGradient
                        id="pinkLight"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FF7EB3" />
                        <stop offset="100%" stopColor="#FF2D87" />
                      </linearGradient>
                      <linearGradient
                        id="orangeLight"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFB347" />
                        <stop offset="100%" stopColor="#FF8C00" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div
                    ref={chartRef}
                    className={styles.donut3d}
                    style={{ willChange: 'transform' }}
                  >
                    {desktopLayers.map(
                      ({ i, z, isTop, pinkFill, orangeFill }) => (
                        <svg
                          key={i}
                          viewBox="0 0 300 300"
                          className={styles.donutLayer}
                          style={{
                            transform: `translate3d(0,0,${z}px)`,
                            backfaceVisibility: 'hidden',
                            willChange: 'transform',
                          }}
                        >
                          {pinkD && (
                            <path
                              d={pinkD}
                              fill={pinkFill}
                              stroke={isTop ? 'none' : pinkFill}
                              strokeWidth={isTop ? '0' : '1'}
                              strokeLinejoin="round"
                            />
                          )}
                          {orangeD && (
                            <path
                              d={orangeD}
                              fill={orangeFill}
                              stroke={isTop ? 'none' : orangeFill}
                              strokeWidth={isTop ? '0' : '1'}
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      )
                    )}

                    {/* Center label */}
                    <div className={styles.chartCenter}>
                      <span className={styles.chartPercent}>
                        {Math.round(animPercent)}%
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className={styles.donutShadow} style={{ opacity: 0.6 }} />
            </div>
          </Reveal>

          {/* ======== Carousel Card ======== */}
          <Reveal
            animation="fadeLeft"
            delay={300}
            duration={800}
            className={styles.carouselArea}
          >
            <div className={styles.decorBlob} />

            <div className={styles.carouselContainer}>
              <button
                className={styles.navBtn}
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Anterior"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>

              <div className={styles.card} key={activeIndex}>
                <div className={styles.cardIconWrapper}>
                  {activeCard.icon}
                </div>
                <h3 className={styles.cardTitle}>{activeCard.title}</h3>
                <span className={styles.cardPercent}>
                  {Math.round(animPercent)}%
                </span>
                <p className={styles.cardDescription}>
                  {activeCard.description}
                </p>
                <a href={activeCard.link} target="_blank" rel="noopener noreferrer" className={styles.cardSource}>
                  <Link2 size={24} />
                  <span>Fuente: {activeCard.source}</span>
                </a>
              </div>

              <button
                className={styles.navBtn}
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Siguiente"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className={styles.indicators}>
              {cards.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${
                    activeIndex === i ? styles.dotActive : ''
                  }`}
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
