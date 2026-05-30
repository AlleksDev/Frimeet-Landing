import { useState, type ReactNode } from 'react';
import styles from './TargetUserSection.module.css';
import { Reveal } from '../components/Reveal';
import {
  Users,
  Store,
  BarChart3,
  AlertTriangle,
  Sparkles,
  Route,
  Shield,
  Coins,
  Activity,
  TrendingUp,
  Clock,
} from 'lucide-react';

/* ---- Card type ---- */
interface BentoCard {
  id: string;
  size: 'large' | 'tall' | 'normal';
  tag: string;
  title: string;
  desc: string;
  icon: ReactNode;
  pain?: { label: string; text: string };
  aha?: { label: string; text: string };
  stat?: { number: string; label: string };
  showAforo?: boolean;
}

/* ---- Data for Explorer (B2C) view ---- */
const explorerCards: BentoCard[] = [
  {
    id: 'catalyst',
    size: 'large' as const,
    tag: 'Perfil A — El Catalizador Social',
    title: 'El organizador que tu grupo necesita',
    desc: 'Jóvenes de 18–30 años que sufren la "Fatiga de Decisión". Organizar una salida grupal en WhatsApp con presupuestos dispares, preferencias variadas e indecisión colectiva es un infierno.',
    icon: <Route size={22} />,
    pain: {
      label: 'El dolor',
      text: '8 personas en un grupo de WhatsApp. Uno no tiene dinero, otro está lejos, a otro no le gusta la música. El plan se cancela o terminan en el mismo lugar de siempre.',
    },
    aha: {
      label: 'El "Aha Moment"',
      text: 'El Algoritmo Genético devuelve una ruta matemáticamente óptima. Se acabó el debate: presupuesto, tiempo y vibra — todo resuelto en un tap.',
    },
    stat: { number: '73%', label: 'de planes grupales se cancelan por indecisión' },
  },
  {
    id: 'validator',
    size: 'tall' as const,
    tag: 'Perfil B — El Validador Activo',
    title: 'El explorador que mantiene los datos vivos',
    desc: 'Usuarios hiperconectados (18–35 años) motivados por el descubrimiento local y el estatus social digital.',
    icon: <Shield size={22} />,
    pain: {
      label: 'El dolor',
      text: 'Llegar a un lugar que Google Maps dice "Abierto" y encontrarlo cerrado. O con una fila de 2 horas. Frustración pura.',
    },
    aha: {
      label: 'El "Aha Moment"',
      text: 'Actualizan el aforo de un bar a "Lleno", ganan Fricoins y ven su Trust Score subir a "Leyenda Local".',
    },
  },
  {
    id: 'gamification',
    size: 'normal' as const,
    tag: 'Economía de Gamificación',
    title: 'Fricoins y Trust Score',
    desc: 'Cada validación en campo suma Fricoins y aumenta tu reputación. Los mejores validadores obtienen beneficios exclusivos y reconocimiento en la comunidad.',
    icon: <Coins size={22} />,
  },
  {
    id: 'crowdsource',
    size: 'normal' as const,
    tag: 'Crowdsourcing fiable',
    title: 'Datos en tiempo real, por la comunidad',
    desc: 'Los usuarios se convierten en auditores de la red. Reportan cierres, aforos y suben reseñas para mantener una base de datos descentralizada, viva y precisa.',
    icon: <Activity size={22} />,
  },
];

/* ---- Data for Business (B2B) view ---- */
const businessCards: BentoCard[] = [
  {
    id: 'emerging',
    size: 'large' as const,
    tag: 'Perfil C — El Emprendimiento Emergente',
    title: 'El negocio oculto que merece ser descubierto',
    desc: 'Propietarios de cafeterías de especialidad, bares alternativos y centros de entretenimiento urbano fuera de las zonas comerciales principales.',
    icon: <Store size={22} />,
    pain: {
      label: 'El dolor',
      text: 'Tienen un producto excelente pero no los $10,000 MXN/mes que gasta la franquicia de enfrente en Facebook Ads. El juego está amañado.',
    },
    aha: {
      label: 'El "Aha Moment"',
      text: 'Revisan su Dashboard y ven que el Algoritmo los incluyó en 15 rutas este fin de semana porque hacen "match" con universitarios de la zona.',
    },
    stat: { number: '55%', label: 'del comercio local sin presencia digital' },
  },
  {
    id: 'consolidated',
    size: 'tall' as const,
    tag: 'Perfil D — El Establecimiento Consolidado',
    title: 'El hub social que necesita control',
    desc: 'Gerentes de bares, restaurantes de moda o centros nocturnos con alto volumen de transacciones diarias.',
    icon: <BarChart3 size={22} />,
    pain: {
      label: 'El dolor',
      text: 'Viernes 10 PM: el lugar a reventar genera quejas por mal servicio. Viernes 6 PM: el lugar vacío quema dinero en costos fijos.',
    },
    aha: {
      label: 'El "Aha Moment"',
      text: 'Cambian estado a "Aforo Bajo" + 20% descuento con Fricoins. En 30 minutos, las tribus cercanas llenan el lugar antes de hora pico.',
    },
    showAforo: true,
  },
  {
    id: 'algorithmic',
    size: 'normal' as const,
    tag: 'Inclusión Algorítmica',
    title: 'Tráfico de alta intención',
    desc: 'No vendemos impresiones. El Algoritmo Genético evalúa negocios como nodos viables para rutas de grupos cuyos intereses y presupuestos coincidan.',
    icon: <TrendingUp size={22} />,
  },
  {
    id: 'analytics',
    size: 'normal' as const,
    tag: 'Business Intelligence',
    title: 'Analítica de intención real',
    desc: 'Acceso a métricas precisas: cuántos grupos guardan tu negocio, análisis de horarios de mayor planificación y métricas de retención.',
    icon: <Clock size={22} />,
  },
];

const TargetUserSection = () => {
  const [activeView, setActiveView] = useState<'explorer' | 'business'>('explorer');
  const isExplorer = activeView === 'explorer';
  const cards = isExplorer ? explorerCards : businessCards;

  return (
    <section className={styles.section} id="target-users">
      {/* Ambient glow */}
      <div
        className={`${styles.ambientGlow} ${
          isExplorer ? styles.glowExplorer : styles.glowBusiness
        }`}
      />

      <div className={styles.container}>
        {/* ---- Header ---- */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>
            ¿Quién usa{' '}
            <span
              className={`${styles.titleGrad} ${
                !isExplorer ? styles.titleGradBusiness : ''
              }`}
            >
              Frimeet?
            </span>
          </h2>
          <p className={styles.subtitle}>
            {isExplorer
              ? 'Un ecosistema de dos caras impulsado por algoritmos evolutivos. Conoce a los exploradores que generan la demanda.'
              : 'Los puntos de encuentro que proveen la oferta. No vendemos publicidad — dirigimos tráfico de alta intención de consumo.'}
          </p>
        </Reveal>

        {/* ---- Switch ---- */}
        <div className={styles.switchContainer}>
          <button
            className={`${styles.switchOption} ${
              isExplorer ? styles.switchOptionActive : ''
            }`}
            onClick={() => setActiveView('explorer')}
            type="button"
          >
            <span className={styles.switchIcon}>
              <Users size={16} />
            </span>
            Soy Explorador
          </button>
          <button
            className={`${styles.switchOption} ${
              !isExplorer ? styles.switchOptionActiveBusiness : ''
            }`}
            onClick={() => setActiveView('business')}
            type="button"
          >
            <span className={styles.switchIcon}>
              <Store size={16} />
            </span>
            Tengo un Negocio
          </button>
        </div>

        {/* ---- Bento Grid ---- */}
        <div className={styles.bentoGrid} key={activeView}>
          {cards.map((card, index) => (
            <Reveal
              key={card.id}
              animation="fadeUp"
              delay={100 + index * 100}
              duration={700}
              className={`${styles.bentoCard} ${
                !isExplorer ? styles.bentoCardBusiness : ''
              } ${card.size === 'large' ? styles.bentoLarge : ''} ${
                card.size === 'tall' ? styles.bentoTall : ''
              }`}
            >
              {/* Icon */}
              <div
                className={`${styles.cardIcon} ${
                  isExplorer ? styles.cardIconExplorer : styles.cardIconBusiness
                }`}
              >
                {card.icon}
              </div>

              {/* Tag */}
              <span
                className={`${styles.cardTag} ${
                  !isExplorer ? styles.cardTagBusiness : ''
                }`}
              >
                {card.tag}
              </span>

              {/* Title */}
              <h3 className={styles.cardTitle}>{card.title}</h3>

              {/* Description */}
              <p className={styles.cardDesc}>{card.desc}</p>

              {/* Stat (optional) */}
              {'stat' in card && card.stat && (
                <div className={styles.statHighlight}>
                  <span
                    className={`${styles.statNumber} ${
                      !isExplorer ? styles.statNumberBusiness : ''
                    }`}
                  >
                    {card.stat.number}
                  </span>
                  <span className={styles.statLabel}>{card.stat.label}</span>
                </div>
              )}

              {/* Pain Point (optional) */}
              {'pain' in card && card.pain && (
                <div
                  className={`${styles.painPoint} ${
                    !isExplorer ? styles.painPointBusiness : ''
                  }`}
                >
                  <AlertTriangle
                    size={16}
                    className={`${styles.painIcon} ${
                      !isExplorer ? styles.painIconBusiness : ''
                    }`}
                  />
                  <div>
                    <p
                      className={`${styles.painLabel} ${
                        !isExplorer ? styles.painLabelBusiness : ''
                      }`}
                    >
                      {card.pain.label}
                    </p>
                    <p className={styles.painText}>{card.pain.text}</p>
                  </div>
                </div>
              )}

              {/* Aforo indicator (business card D) */}
              {'showAforo' in card && card.showAforo && (
                <>
                  <div className={styles.aforoIndicator}>
                    <span className={`${styles.aforoDot} ${styles.aforoGreen}`} />
                    <span className={styles.aforoLabel}>Aforo actual</span>
                    <span className={styles.aforoStatus}>Disponible</span>
                  </div>
                  <div className={styles.aforoIndicator}>
                    <span className={`${styles.aforoDot} ${styles.aforoRed}`} />
                    <span className={styles.aforoLabel}>Hora pico</span>
                    <span className={`${styles.aforoStatus} ${styles.aforoStatusFull}`}>
                      Lleno
                    </span>
                  </div>
                </>
              )}

              {/* Aha Moment (optional) */}
              {'aha' in card && card.aha && (
                <div
                  className={`${styles.ahaBox} ${
                    !isExplorer ? styles.ahaBoxBusiness : ''
                  }`}
                >
                  <Sparkles
                    size={16}
                    className={`${styles.ahaIcon} ${
                      !isExplorer ? styles.ahaIconBusiness : ''
                    }`}
                  />
                  <div>
                    <p
                      className={`${styles.ahaLabel} ${
                        !isExplorer ? styles.ahaLabelBusiness : ''
                      }`}
                    >
                      {card.aha.label}
                    </p>
                    <p className={styles.ahaText}>{card.aha.text}</p>
                  </div>
                </div>
              )}

              {/* Mock bar chart visual (for non-special cards) */}
              {!('pain' in card) && !('showAforo' in card) && (
                <div
                  className={`${styles.mockupElement} ${
                    !isExplorer ? styles.mockupBarBusiness : ''
                  }`}
                >
                  <div className={styles.mockupBar} />
                  <div className={styles.mockupBar} />
                  <div className={styles.mockupBar} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUserSection;
