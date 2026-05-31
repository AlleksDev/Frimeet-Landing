import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './ScopeSection.module.css';
import {
  MapPin,
  Cpu,
  Cloud,
  Rocket,
  Globe,
  Zap,
  Brain,
  Shield,
  Database,
  Fingerprint,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';

/* ---- Stock photos from Unsplash (free, warm tones) ---- */
const PHASE_IMAGES = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
];

/* ---- Phase Data ---- */
const phases = [
  {
    id: 'phase1',
    label: 'Fase 1',
    status: 'En desarrollo',
    isActive: true,
    title: 'Lanzamiento Hiper-Local',
    subtitle: 'Tuxtla Gutiérrez & Suchiapa',
    description:
      'Despliegue estratégico en la zona metropolitana para entrenar la IA y asegurar la máxima densidad de datos antes de la expansión.',
    features: [
      { icon: <MapPin size={14} />, text: 'Tuxtla Gutiérrez & Suchiapa' },
      { icon: <Brain size={14} />, text: 'Motor de recomendación IA' },
      { icon: <Database size={14} />, text: 'Entrenamiento de datos' },
      { icon: <Shield size={14} />, text: 'Sin pasarela de pagos' },
    ],
  },
  {
    id: 'phase2',
    label: 'Fase 2',
    status: 'Próximamente',
    isActive: false,
    title: 'Expansión Regional',
    subtitle: 'Sureste mexicano',
    description:
      'Arquitectura Cloud escalable con algoritmo genético validado. Expansión a zonas metropolitanas clave.',
    features: [
      { icon: <Cloud size={14} />, text: 'Arquitectura Cloud' },
      { icon: <Cpu size={14} />, text: 'Algoritmo genético optimizado' },
      { icon: <Rocket size={14} />, text: 'Nuevas ciudades' },
      { icon: <Fingerprint size={14} />, text: 'Verificación de negocios' },
    ],
  },
  {
    id: 'phase3',
    label: 'Fase 3',
    status: 'Visión',
    isActive: false,
    title: 'Cobertura Nacional',
    subtitle: 'Todo México',
    description:
      'Escalamiento a nivel nacional con pasarelas de pago integradas y ecosistema completo.',
    features: [
      { icon: <Globe size={14} />, text: 'Cobertura nacional' },
      { icon: <Zap size={14} />, text: 'Pagos transaccionales' },
      { icon: <Rocket size={14} />, text: 'Marketplace completo' },
      { icon: <Cpu size={14} />, text: 'IA conversacional avanzada' },
    ],
  },
];

const ScopeSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Scroll to card ---- */
  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(`.${styles.card}`);
    if (cards[index]) {
      isProgrammaticScroll.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      track.scrollTo({ left: cards[index].offsetLeft - 20, behavior: 'smooth' });
      setActive(index);

      // Disable programmatic scroll lock after transition completes (600ms)
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  }, []);

  const prev = () => {
    const nextIndex = active === 0 ? phases.length - 1 : active - 1;
    scrollTo(nextIndex);
  };
  const next = () => {
    const nextIndex = active === phases.length - 1 ? 0 : active + 1;
    scrollTo(nextIndex);
  };

  /* ---- Sync scroll position → active dot ---- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      // If scroll was triggered programmatically (via buttons), ignore dot syncing
      if (isProgrammaticScroll.current) return;

      const cards = track.querySelectorAll<HTMLElement>(`.${styles.card}`);
      const trackRect = track.getBoundingClientRect();
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        // Since cards are snap-aligned to the start, compare card left with track left
        const dist = Math.abs(cardRect.left - trackRect.left);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    // Run once on load to ensure correct initial state
    onScroll();
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section className={styles.scopeSection} id="scope">
      <div className={styles.scopeInner}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800}>
          <div className={styles.scopeHeader}>
            <span className={styles.scopeBadge}>
              <span className={styles.badgeDot} />
              Fase Beta
            </span>
            <h2 className={styles.scopeTitle}>
              Alcance{' '}
              <span className={styles.scopeTitleGrad}>Tecnológico</span>
            </h2>
            <p className={styles.scopeSubtitle}>
              Arquitectura Cloud escalable a nivel nacional, con un lanzamiento
              estratégico para garantizar la calidad del algoritmo.
            </p>
          </div>
        </Reveal>

        {/* ---- Carousel ---- */}
        <Reveal animation="fadeUp" delay={200} duration={900}>
          <div className={styles.carouselWrapper}>
            {/* Arrows */}
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Siguiente"
            >
              <ChevronRight size={22} />
            </button>

            {/* Scroll track */}
            <div className={styles.track} ref={trackRef}>
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`${styles.card} ${
                    active === index ? styles.cardActive : ''
                  }`}
                  onClick={() => scrollTo(index)}
                >
                  {/* Background image */}
                  <img
                    src={PHASE_IMAGES[index]}
                    alt=""
                    className={styles.cardBg}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <span
                        className={`${styles.cardLabel} ${
                          phase.isActive
                            ? styles.cardLabelActive
                            : styles.cardLabelFuture
                        }`}
                      >
                        {phase.label}
                      </span>
                      <span
                        className={`${styles.cardStatus} ${
                          phase.isActive
                            ? styles.cardStatusActive
                            : styles.cardStatusPending
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <p className={styles.cardSubtitle}>{phase.subtitle}</p>
                      <h3 className={styles.cardTitle}>{phase.title}</h3>
                      <p className={styles.cardDesc}>{phase.description}</p>
                    </div>

                    <div className={styles.cardFeatures}>
                      {phase.features.map((feat, fi) => (
                        <span key={fi} className={styles.featurePill}>
                          <span className={styles.featurePillIcon}>
                            {feat.icon}
                          </span>
                          {feat.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className={styles.dots}>
              {phases.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${
                    active === i ? styles.dotActive : ''
                  }`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir a fase ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Technical Note ---- */}
        <Reveal animation="fadeUp" delay={400} duration={800}>
          <div className={styles.techNote}>
            <div className={styles.techNoteInner}>
              <div className={styles.techNoteIcon}>
                <Info size={18} />
              </div>
              <div className={styles.techNoteContent}>
                <span className={styles.techNoteLabel}>Nota Técnica</span>
                <p className={styles.techNoteText}>
                  Fase 1 delimitada al motor de recomendación inteligente, sin
                  pasarelas de pago transaccionales, para garantizar la calidad
                  del algoritmo genético antes de la expansión nacional.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ScopeSection;
