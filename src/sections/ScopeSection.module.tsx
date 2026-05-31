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
} from 'lucide-react';
import { Reveal } from '../components/Reveal';

/* ---- Phase Data ---- */
const phases = [
  {
    id: 'phase1',
    label: 'Fase 1',
    status: 'En desarrollo',
    isActive: true,
    title: 'Lanzamiento Hiper-Local',
    description:
      'Despliegue estratégico en la zona metropolitana de Tuxtla Gutiérrez y Suchiapa. Diseñado para entrenar la IA y asegurar la máxima densidad de datos antes de la expansión.',
    features: [
      { icon: <MapPin size={13} />, text: 'Tuxtla Gutiérrez & Suchiapa' },
      { icon: <Brain size={13} />, text: 'Motor de recomendación IA' },
      { icon: <Database size={13} />, text: 'Entrenamiento de datos' },
      { icon: <Shield size={13} />, text: 'Sin pasarela de pagos' },
    ],
  },
  {
    id: 'phase2',
    label: 'Fase 2',
    status: 'Próximamente',
    isActive: false,
    title: 'Expansión Regional',
    description:
      'Arquitectura Cloud escalable con algoritmo genético validado. Expansión a zonas metropolitanas clave del sureste mexicano.',
    features: [
      { icon: <Cloud size={13} />, text: 'Arquitectura Cloud' },
      { icon: <Cpu size={13} />, text: 'Algoritmo genético optimizado' },
      { icon: <Rocket size={13} />, text: 'Nuevas ciudades' },
      { icon: <Fingerprint size={13} />, text: 'Verificación de negocios' },
    ],
  },
  {
    id: 'phase3',
    label: 'Fase 3',
    status: 'Visión',
    isActive: false,
    title: 'Cobertura Nacional',
    description:
      'Escalamiento a nivel nacional con pasarelas de pago integradas y ecosistema completo para usuarios y comercios.',
    features: [
      { icon: <Globe size={13} />, text: 'Cobertura nacional' },
      { icon: <Zap size={13} />, text: 'Pagos transaccionales' },
      { icon: <Rocket size={13} />, text: 'Marketplace completo' },
      { icon: <Cpu size={13} />, text: 'IA conversacional avanzada' },
    ],
  },
];

const ScopeSection = () => {
  return (
    <section className={styles.scopeSection} id="scope">
      {/* Floating particles */}
      <div className={styles.particles}>
        <span className={`${styles.particle} ${styles.particle1}`} />
        <span className={`${styles.particle} ${styles.particle2}`} />
        <span className={`${styles.particle} ${styles.particle3}`} />
        <span className={`${styles.particle} ${styles.particle4}`} />
        <span className={`${styles.particle} ${styles.particle5}`} />
      </div>

      <div className={styles.scopeContainer}>
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

        {/* ---- Timeline ---- */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          <div className={styles.timelineLineGlow} />

          {phases.map((phase, index) => (
            <Reveal
              key={phase.id}
              animation="fadeUp"
              delay={150 + index * 200}
              duration={800}
            >
              <div className={styles.phaseRow}>
                {/* Marker */}
                <div className={styles.phaseMarker}>
                  <span
                    className={`${styles.phaseMarkerDot} ${
                      phase.isActive
                        ? styles.phaseMarkerDotActive
                        : styles.phaseMarkerDotFuture
                    }`}
                  />
                  {phase.isActive && (
                    <span className={styles.phaseMarkerRing} />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`${styles.phaseCard} ${
                    phase.isActive ? styles.phaseCardActive : ''
                  }`}
                >
                  <div className={styles.phaseCardHeader}>
                    <span
                      className={`${styles.phaseLabel} ${
                        phase.isActive
                          ? styles.phaseLabelActive
                          : styles.phaseLabelFuture
                      }`}
                    >
                      {phase.label}
                    </span>
                    <span
                      className={`${styles.phaseStatus} ${
                        phase.isActive
                          ? styles.statusActive
                          : styles.statusPending
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <h3 className={styles.phaseCardTitle}>{phase.title}</h3>
                  <p className={styles.phaseCardDesc}>{phase.description}</p>

                  <div className={styles.phaseFeatures}>
                    {phase.features.map((feat, fi) => (
                      <span
                        key={fi}
                        className={`${styles.featurePill} ${
                          phase.isActive
                            ? styles.featurePillActive
                            : styles.featurePillFuture
                        }`}
                      >
                        <span className={styles.featurePillIcon}>
                          {feat.icon}
                        </span>
                        {feat.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- Technical Note ---- */}
        <Reveal animation="fadeUp" delay={800} duration={800}>
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
