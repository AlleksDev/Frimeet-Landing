import { useState } from 'react';
import styles from './TargetUserSection.module.css';
import { Reveal } from '../components/Reveal';
import {
  Users,
  Store,
  MapPin,
  Briefcase,
  Heart,
  Smartphone,
  Sparkles,
  Globe,
  Calendar,
  Wallet,
  Coffee,
  UserCheck,
  Target,
  Search,
  Sprout,
  Building2,
} from 'lucide-react';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface InfoItem {
  icon: typeof MapPin;
  label: string;
  value: string;
}

interface UserProfile {
  id: string;
  name: string;
  headline: string;
  avatarIcon: typeof Target;
  demographics: InfoItem[];
  occupation: InfoItem[];
  interests: string[];
  digitalBehavior: string[];
  motivations: string[];
}

/* ───────────────────────────────────────────
   B2C Profiles
   ─────────────────────────────────────────── */
const explorerProfiles: UserProfile[] = [
  {
    id: 'catalizer',
    name: 'El Catalizador Social',
    headline: 'El organizador del grupo de amigos que siempre toma la iniciativa para planear la siguiente salida.',
    avatarIcon: Target,
    demographics: [
      { icon: Calendar, label: 'Edad', value: '18 – 30 años' },
      { icon: Globe, label: 'Nacionalidad', value: 'México (zonas urbanas)' },
      { icon: MapPin, label: 'Ubicación', value: 'GDL, CDMX, MTY, Puebla, Querétaro' },
      { icon: Users, label: 'Género', value: 'Todos los géneros' },
    ],
    occupation: [
      { icon: Briefcase, label: 'Ocupación', value: 'Estudiante universitario / Profesional junior' },
      { icon: Wallet, label: 'Ingreso', value: '$3,000 – $12,000 MXN/mes' },
      { icon: Coffee, label: 'Estilo de vida', value: 'Socialmente activo, organiza salidas 2–3 veces/semana' },
    ],
    interests: [
      'Restaurantes trendy',
      'Bares con concepto',
      'Eventos culturales',
      'Actividades al aire libre',
      'Noches de juegos',
      'Comida callejera',
    ],
    digitalBehavior: [
      'WhatsApp como canal principal de coordinación',
      'Instagram activo — consume contenido lifestyle',
      '3+ horas diarias en smartphone',
      'Busca apps que simplifiquen su vida social',
    ],
    motivations: [
      'Evitar la fatiga de decisión grupal',
      'Optimizar tiempo y presupuesto de salidas',
      'Descubrir opciones nuevas para su grupo',
      'Dejar de ser el único que organiza todo',
    ],
  },
  {
    id: 'validator',
    name: 'El Explorador Validador',
    headline: 'El foodie hiperconectado que descubre lugares antes que nadie y comparte sus hallazgos.',
    avatarIcon: Search,
    demographics: [
      { icon: Calendar, label: 'Edad', value: '18 – 35 años' },
      { icon: Globe, label: 'Nacionalidad', value: 'México (zonas metropolitanas)' },
      { icon: MapPin, label: 'Ubicación', value: 'Barrios urbanos emergentes, alta densidad comercial' },
      { icon: Users, label: 'Género', value: 'Todos los géneros' },
    ],
    occupation: [
      { icon: Briefcase, label: 'Ocupación', value: 'Freelancer, creativo, profesional joven' },
      { icon: Wallet, label: 'Ingreso', value: '$8,000 – $18,000 MXN/mes' },
      { icon: Coffee, label: 'Estilo de vida', value: 'Foodie urbano, salidas frecuentes a lugares nuevos' },
    ],
    interests: [
      'Cafés de especialidad',
      'Gastronomía local',
      'Arte urbano',
      'Música en vivo',
      'Mercados locales',
      'Cócteles artesanales',
      'Fotografía',
    ],
    digitalBehavior: [
      'Hiperconectado — comparte reseñas y fotos constantemente',
      'Power user: prueba apps nuevas en fase temprana',
      'Valora la gamificación y las recompensas digitales',
      'Genera contenido UGC de alta calidad',
    ],
    motivations: [
      'Descubrir "joyas ocultas" antes que los demás',
      'Obtener reconocimiento social por sus hallazgos',
      'Recibir recompensas por contribuir a la comunidad',
      'Tener datos precisos y en tiempo real de los lugares',
    ],
  },
];

/* ───────────────────────────────────────────
   B2B Profiles
   ─────────────────────────────────────────── */
const businessProfiles: UserProfile[] = [
  {
    id: 'emerging',
    name: 'Emprendimiento Emergente',
    headline: 'Locales independientes con propuestas creativas de alta calidad que aún no tienen la visibilidad que merecen.',
    avatarIcon: Sprout,
    demographics: [
      { icon: Store, label: 'Tipo', value: 'Cafetería de especialidad, bar alternativo, food truck, centro cultural' },
      { icon: Users, label: 'Tamaño', value: '1 – 10 empleados' },
      { icon: MapPin, label: 'Ubicación', value: 'Fuera de avenidas principales, barrios emergentes' },
      { icon: Calendar, label: 'Antigüedad', value: '1 – 5 años en operación' },
    ],
    occupation: [
      { icon: UserCheck, label: 'Capacidad', value: '20 – 60 personas' },
      { icon: Wallet, label: 'Presupuesto marketing', value: '$500 – $3,000 MXN/mes' },
      { icon: Briefcase, label: 'Operación', value: 'Dueño operador / equipo pequeño multifuncional' },
    ],
    interests: [
      'Productos artesanales',
      'Propuesta de nicho',
      'Comunidad local',
      'Sostenibilidad',
      'Experiencias auténticas',
    ],
    digitalBehavior: [
      'Redes sociales básicas (Instagram y Facebook)',
      'Sin sitio web propio ni app',
      'Marketing orgánico — depende del boca a boca',
      'Poco tiempo disponible para gestionar presencia digital',
    ],
    motivations: [
      'Ganar visibilidad orgánica sin competir con franquicias',
      'Atraer clientes calificados de su zona inmediata',
      'Digitalizar su presencia sin costo alto',
      'Fidelizar a su comunidad local',
    ],
  },
  {
    id: 'consolidated',
    name: 'Establecimiento Consolidado',
    headline: 'Negocios con flujo constante que buscan optimizar su capacidad y entender mejor a sus clientes.',
    avatarIcon: Building2,
    demographics: [
      { icon: Store, label: 'Tipo', value: 'Restaurante, bar popular, centro nocturno, espacio de entretenimiento' },
      { icon: Users, label: 'Tamaño', value: '10 – 50 empleados' },
      { icon: MapPin, label: 'Ubicación', value: 'Zonas comerciales, corredores gastronómicos' },
      { icon: Calendar, label: 'Antigüedad', value: '5+ años en operación' },
    ],
    occupation: [
      { icon: UserCheck, label: 'Capacidad', value: '80 – 300+ personas' },
      { icon: Wallet, label: 'Presupuesto marketing', value: '$5,000 – $25,000 MXN/mes' },
      { icon: Briefcase, label: 'Operación', value: 'Gerente de operaciones / equipo de marketing dedicado' },
    ],
    interests: [
      'Eventos temáticos',
      'Promociones dinámicas',
      'Retención de clientes',
      'Experiencia de marca',
      'Grupos y reservaciones',
    ],
    digitalBehavior: [
      'Google Business activo, redes sociales profesionales',
      'Posiblemente con sitio web propio o app de delivery',
      'Invierte en publicidad digital (Meta Ads, Google Ads)',
      'Maneja herramientas de POS y reservaciones',
    ],
    motivations: [
      'Optimizar flujo de clientes en horas de baja afluencia',
      'Obtener analíticas reales sobre intención de visita',
      'Reducir costos operativos en horas muertas',
      'Conocer el comportamiento de grupos que los visitan',
    ],
  },
];

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
const TargetUserSection = () => {
  const [activeView, setActiveView] = useState<'explorer' | 'business'>('explorer');
  const isExplorer = activeView === 'explorer';
  const profiles = isExplorer ? explorerProfiles : businessProfiles;

  return (
    <section className={styles.section} id="target-users">
      <div
        className={`${styles.ambientGlow} ${
          isExplorer ? styles.glowExplorer : styles.glowBusiness
        }`}
      />

      <div className={styles.container}>
        {/* ── Header ── */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <span className={styles.sectionBadge}>
            {isExplorer ? 'Mercado Meta B2C' : 'Mercado Meta B2B'}
          </span>
          <h2 className={styles.title}>
            ¿Quién usa{' '}
            <span className={`${styles.titleGrad} ${!isExplorer ? styles.titleGradBusiness : ''}`}>
              Frimeet?
            </span>
          </h2>
          <p className={styles.subtitle}>
            {isExplorer
              ? 'Jóvenes residentes urbanos de México que buscan socializar de forma inteligente. Conoce a nuestros usuarios.'
              : 'Establecimientos de hospitalidad y entretenimiento que buscan conectar con clientes calificados. Conoce a nuestros socios.'}
          </p>
        </Reveal>

        {/* ── Switch ── */}
        <div className={styles.switchContainer}>
          <button
            className={`${styles.switchOption} ${isExplorer ? styles.switchOptionActive : ''}`}
            onClick={() => setActiveView('explorer')}
            type="button"
          >
            <span className={styles.switchIcon}><Users size={16} /></span>
            Exploradores
          </button>
          <button
            className={`${styles.switchOption} ${!isExplorer ? styles.switchOptionActiveBusiness : ''}`}
            onClick={() => setActiveView('business')}
            type="button"
          >
            <span className={styles.switchIcon}><Store size={16} /></span>
            Negocios
          </button>
        </div>

        {/* ── Profile Cards ── */}
        <div className={styles.profilesGrid} key={activeView}>
          {profiles.map((profile, index) => (
            <Reveal
              key={profile.id}
              animation="fadeUp"
              delay={100 + index * 150}
              duration={700}
              className={`${styles.profileCard} ${
                isExplorer ? styles.profileCardExplorer : styles.profileCardBusiness
              }`}
            >
              {/* ── Card Header ── */}
              <div className={styles.profileHeader}>
                <div className={`${styles.profileAvatar} ${isExplorer ? styles.avatarExplorer : styles.avatarBusiness}`}>
                  <profile.avatarIcon size={26} />
                </div>
                <div className={styles.profileHeaderText}>
                  <h3 className={styles.profileName}>{profile.name}</h3>
                  <p className={styles.profileHeadline}>{profile.headline}</p>
                </div>
              </div>

              {/* ── Bento-style inner grid ── */}
              <div className={styles.bentoInner}>

                {/* LEFT COLUMN: Demographics */}
                <div className={`${styles.bentoCell} ${styles.bentoDemographics}`}>
                  <div className={styles.cellHeader}>
                    <Globe size={15} className={`${styles.cellHeaderIcon} ${isExplorer ? styles.cellIconExplorer : styles.cellIconBusiness}`} />
                    <span className={styles.cellLabel}>Demografía</span>
                  </div>
                  <div className={styles.infoRows}>
                    {profile.demographics.map((item, i) => (
                      <div key={i} className={styles.infoRow}>
                        <item.icon size={14} className={`${styles.infoRowIcon} ${isExplorer ? styles.iconExplorer : styles.iconBusiness}`} />
                        <span className={styles.infoRowLabel}>{item.label}</span>
                        <span className={styles.infoRowValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: Occupation */}
                <div className={`${styles.bentoCell} ${styles.bentoOccupation}`}>
                  <div className={styles.cellHeader}>
                    <Briefcase size={15} className={`${styles.cellHeaderIcon} ${isExplorer ? styles.cellIconExplorer : styles.cellIconBusiness}`} />
                    <span className={styles.cellLabel}>
                      {isExplorer ? 'Ocupación y Estilo de Vida' : 'Operación y Capacidad'}
                    </span>
                  </div>
                  <div className={styles.infoRows}>
                    {profile.occupation.map((item, i) => (
                      <div key={i} className={styles.infoRow}>
                        <item.icon size={14} className={`${styles.infoRowIcon} ${isExplorer ? styles.iconExplorer : styles.iconBusiness}`} />
                        <span className={styles.infoRowLabel}>{item.label}</span>
                        <span className={styles.infoRowValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FULL-WIDTH: Interests */}
                <div className={`${styles.bentoCell} ${styles.bentoInterests}`}>
                  <div className={styles.cellHeader}>
                    <Heart size={15} className={`${styles.cellHeaderIcon} ${isExplorer ? styles.cellIconExplorer : styles.cellIconBusiness}`} />
                    <span className={styles.cellLabel}>
                      {isExplorer ? 'Gustos e Intereses' : 'Enfoque del Negocio'}
                    </span>
                  </div>
                  <div className={styles.chipsWrap}>
                    {profile.interests.map((interest, i) => (
                      <span
                        key={i}
                        className={`${styles.chip} ${isExplorer ? styles.chipExplorer : styles.chipBusiness}`}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOTTOM-LEFT: Digital Behavior */}
                <div className={`${styles.bentoCell} ${styles.bentoDigital}`}>
                  <div className={styles.cellHeader}>
                    <Smartphone size={15} className={`${styles.cellHeaderIcon} ${isExplorer ? styles.cellIconExplorer : styles.cellIconBusiness}`} />
                    <span className={styles.cellLabel}>Perfil Digital</span>
                  </div>
                  <ul className={styles.bulletList}>
                    {profile.digitalBehavior.map((b, i) => (
                      <li key={i} className={styles.bulletItem}>
                        <span className={`${styles.bulletDot} ${isExplorer ? styles.bulletDotExplorer : styles.bulletDotBusiness}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BOTTOM-RIGHT: Motivations */}
                <div className={`${styles.bentoCell} ${styles.bentoMotivations}`}>
                  <div className={styles.cellHeader}>
                    <Sparkles size={15} className={`${styles.cellHeaderIcon} ${isExplorer ? styles.cellIconExplorer : styles.cellIconBusiness}`} />
                    <span className={styles.cellLabel}>Motivaciones</span>
                  </div>
                  <ul className={styles.bulletList}>
                    {profile.motivations.map((m, i) => (
                      <li key={i} className={styles.bulletItem}>
                        <span className={`${styles.bulletDot} ${isExplorer ? styles.bulletDotExplorer : styles.bulletDotBusiness}`} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUserSection;
