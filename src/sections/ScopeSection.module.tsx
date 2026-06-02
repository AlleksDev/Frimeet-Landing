import { useState } from 'react';
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
  Coins,
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
    description: 'Despliegue inicial de nuestra API en Go en la zona Tuxtla Gutierrez para poblar la base de datos (PostGIS), validar el modelo de crowdsourcing y asegurar una alta densidad de lugares verificados antes de escalar.',
    features: [
      { icon: <MapPin size={14} />, text: 'Tuxtla Gutiérrez & Suchiapa' },
      { icon: <Brain size={14} />, text: 'Motor de recomendación IA' },
      { icon: <Database size={14} />, text: 'Entrenamiento de datos' },
      { icon: <Coins size={14} />, text: 'Economía Beta' },
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
    description: 'Escalado horizontal en la nube (Cloud) e integración total del Algoritmo Genético para procesar rutas complejas de múltiples paradas. Expansión a ciudades clave para poner a prueba la concurrencia del sistema.',
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
    description: 'Apertura del panel administrativo (B2B) para establecimientos consolidados. Activación de pasarelas de pago, suscripciones de negocios y despliegue del microservicio de IA conversacional para todo el país.',
    features: [
      { icon: <Globe size={14} />, text: 'Cobertura nacional' },
      { icon: <Zap size={14} />, text: 'Pagos transaccionales' },
      { icon: <Rocket size={14} />, text: 'Marketplace completo' },
      { icon: <Cpu size={14} />, text: 'IA conversacional avanzada' },
    ],
  },
];

const ScopeSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.scopeSection} id="scope">
      <div className={styles.scopeInner}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800}>
          <div className={styles.scopeHeader}>
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

        {/* ---- Grid Layout ---- */}
        <Reveal animation="fadeUp" delay={200} duration={900}>
          <div className={styles.gridWrapper}>
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`${styles.card} ${
                  hoveredIndex === index ? styles.cardHovered : ''
                } ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? styles.cardShrunken
                    : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
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
                    {hoveredIndex === index && (
                      <span
                        className={`${styles.cardStatus} ${
                          phase.isActive
                            ? styles.cardStatusActive
                            : styles.cardStatusPending
                        }`}
                      >
                        {phase.status}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{phase.title}</h3>
                    {hoveredIndex === index && (
                      <>
                        <p className={styles.cardSubtitle}>{phase.subtitle}</p>
                        <p className={styles.cardDesc}>{phase.description}</p>
                      </>
                    )}
                  </div>

                  {hoveredIndex === index && (
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ScopeSection;
