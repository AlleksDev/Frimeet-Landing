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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface InfoItem {
  icon: typeof MapPin;
  label: string;
  value: string;
}

interface CarouselSlide {
  key: string;
  icon: typeof Globe;
  label: string;
  type: 'rows' | 'chips' | 'bullets' | 'motivations';
  data: InfoItem[] | string[];
}

interface UserProfile {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  avatarIcon: typeof Target;
  demographics: InfoItem[];
  slides: CarouselSlide[];
}

/* ───────────────────────────────────────────
   B2C Profiles
   ─────────────────────────────────────────── */
const explorerProfiles: UserProfile[] = [
  {
    id: 'catalizer',
    name: 'El Catalizador Social',
    tagline: 'Perfil A · B2C',
    headline: 'El organizador del grupo de amigos que siempre toma la iniciativa para planear la siguiente salida.',
    avatarIcon: Target,
    demographics: [
      { icon: Calendar, label: 'Edad', value: '18 – 30 años' },
      { icon: Globe, label: 'Nacionalidad', value: 'México · Zonas urbanas' },
      { icon: MapPin, label: 'Ubicación', value: 'GDL, CDMX, MTY, Puebla, QRO' },
      { icon: Users, label: 'Género', value: 'Todos los géneros' },
    ],
    slides: [
      {
        key: 'occupation',
        icon: Briefcase,
        label: 'Ocupación y Estilo de Vida',
        type: 'rows',
        data: [
          { icon: Briefcase, label: 'Ocupación', value: 'Estudiante universitario / Profesional junior' },
          { icon: Wallet, label: 'Ingreso', value: '$3,000 – $12,000 MXN/mes' },
          { icon: Coffee, label: 'Estilo de vida', value: 'Socialmente activo, organiza salidas 2–3 veces por semana' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Gustos e Intereses',
        type: 'chips',
        data: [
          'Restaurantes trendy',
          'Bares con concepto',
          'Eventos culturales',
          'Actividades al aire libre',
          'Noches de juegos',
          'Comida callejera',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'WhatsApp como canal principal de coordinación',
          'Instagram activo — consume contenido lifestyle',
          '3+ horas diarias en smartphone',
          'Busca apps que simplifiquen su vida social',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        data: [
          'Evitar la fatiga de decisión grupal',
          'Optimizar tiempo y presupuesto de salidas',
          'Descubrir opciones nuevas para su grupo',
          'Dejar de ser el único que organiza todo',
        ],
      },
    ],
  },
  {
    id: 'validator',
    name: 'El Explorador Validador',
    tagline: 'Perfil B · B2C',
    headline: 'El foodie hiperconectado que descubre lugares antes que nadie y comparte sus hallazgos con todos.',
    avatarIcon: Search,
    demographics: [
      { icon: Calendar, label: 'Edad', value: '18 – 35 años' },
      { icon: Globe, label: 'Nacionalidad', value: 'México · Zonas metropolitanas' },
      { icon: MapPin, label: 'Ubicación', value: 'Barrios emergentes, alta densidad comercial' },
      { icon: Users, label: 'Género', value: 'Todos los géneros' },
    ],
    slides: [
      {
        key: 'occupation',
        icon: Briefcase,
        label: 'Ocupación y Estilo de Vida',
        type: 'rows',
        data: [
          { icon: Briefcase, label: 'Ocupación', value: 'Freelancer, creativo, profesional joven' },
          { icon: Wallet, label: 'Ingreso', value: '$8,000 – $18,000 MXN/mes' },
          { icon: Coffee, label: 'Estilo de vida', value: 'Foodie urbano, salidas frecuentes a lugares nuevos' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Gustos e Intereses',
        type: 'chips',
        data: [
          'Cafés de especialidad',
          'Gastronomía local',
          'Arte urbano',
          'Música en vivo',
          'Mercados locales',
          'Cócteles artesanales',
          'Fotografía',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Hiperconectado — comparte reseñas y fotos constantemente',
          'Power user: prueba apps nuevas en fase temprana',
          'Valora la gamificación y las recompensas digitales',
          'Genera contenido UGC de alta calidad',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        data: [
          'Descubrir "joyas ocultas" antes que los demás',
          'Obtener reconocimiento social por sus hallazgos',
          'Recibir recompensas por contribuir a la comunidad',
          'Tener datos precisos y en tiempo real',
        ],
      },
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
    tagline: 'Perfil C · B2B',
    headline: 'Locales independientes con propuestas creativas de alta calidad que aún no tienen la visibilidad que merecen.',
    avatarIcon: Sprout,
    demographics: [
      { icon: Store, label: 'Tipo', value: 'Cafetería de especialidad, bar alternativo, food truck' },
      { icon: Users, label: 'Tamaño', value: '1 – 10 empleados' },
      { icon: MapPin, label: 'Ubicación', value: 'Fuera de avenidas principales, barrios emergentes' },
      { icon: Calendar, label: 'Antigüedad', value: '1 – 5 años en operación' },
    ],
    slides: [
      {
        key: 'occupation',
        icon: Briefcase,
        label: 'Operación y Capacidad',
        type: 'rows',
        data: [
          { icon: UserCheck, label: 'Capacidad', value: '20 – 60 personas' },
          { icon: Wallet, label: 'Mkt Budget', value: '$500 – $3,000 MXN/mes' },
          { icon: Briefcase, label: 'Operación', value: 'Dueño operador / equipo pequeño multifuncional' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Enfoque del Negocio',
        type: 'chips',
        data: [
          'Productos artesanales',
          'Propuesta de nicho',
          'Comunidad local',
          'Sostenibilidad',
          'Experiencias auténticas',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Redes sociales básicas (Instagram y Facebook)',
          'Sin sitio web propio ni app',
          'Marketing orgánico — depende del boca a boca',
          'Poco tiempo para gestionar presencia digital',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        data: [
          'Ganar visibilidad orgánica sin competir con franquicias',
          'Atraer clientes calificados de su zona inmediata',
          'Digitalizar su presencia sin costo alto',
          'Fidelizar a su comunidad local',
        ],
      },
    ],
  },
  {
    id: 'consolidated',
    name: 'Establecimiento Consolidado',
    tagline: 'Perfil D · B2B',
    headline: 'Negocios con flujo constante que buscan optimizar su capacidad y entender mejor a sus clientes.',
    avatarIcon: Building2,
    demographics: [
      { icon: Store, label: 'Tipo', value: 'Restaurante, bar popular, centro nocturno' },
      { icon: Users, label: 'Tamaño', value: '10 – 50 empleados' },
      { icon: MapPin, label: 'Ubicación', value: 'Zonas comerciales, corredores gastronómicos' },
      { icon: Calendar, label: 'Antigüedad', value: '5+ años en operación' },
    ],
    slides: [
      {
        key: 'occupation',
        icon: Briefcase,
        label: 'Operación y Capacidad',
        type: 'rows',
        data: [
          { icon: UserCheck, label: 'Capacidad', value: '80 – 300+ personas' },
          { icon: Wallet, label: 'Mkt Budget', value: '$5,000 – $25,000 MXN/mes' },
          { icon: Briefcase, label: 'Operación', value: 'Gerente de operaciones / equipo de marketing dedicado' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Enfoque del Negocio',
        type: 'chips',
        data: [
          'Eventos temáticos',
          'Promociones dinámicas',
          'Retención de clientes',
          'Experiencia de marca',
          'Grupos y reservaciones',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Google Business activo, redes sociales profesionales',
          'Posiblemente con sitio web propio o app de delivery',
          'Invierte en publicidad digital (Meta Ads, Google Ads)',
          'Maneja herramientas de POS y reservaciones',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        data: [
          'Optimizar flujo de clientes en horas de baja afluencia',
          'Obtener analíticas reales sobre intención de visita',
          'Reducir costos operativos en horas muertas',
          'Conocer el comportamiento de grupos que los visitan',
        ],
      },
    ],
  },
];

/* ───────────────────────────────────────────
   Slide Carousel Sub-component
   ─────────────────────────────────────────── */
interface SlideCarouselProps {
  slides: CarouselSlide[];
  accent: 'pink' | 'orange';
}

const SlideCarousel = ({ slides, accent }: SlideCarouselProps) => {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];
  const total = slides.length;

  const go = (dir: -1 | 1) => {
    setIdx((prev) => ((prev + dir) % total + total) % total);
  };

  const SlideIcon = slide.icon;
  const isMot = slide.type === 'motivations';

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer}>
        {/* Left Nav Button */}
        <button
          className={`${styles.navBtn} ${styles.navBtnLeft} ${accent === 'pink' ? styles.navBtnPink : styles.navBtnOrange}`}
          onClick={() => go(-1)}
          aria-label="Anterior"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Slide Content */}
        <div
          className={`${styles.slideBody} ${isMot ? (accent === 'pink' ? styles.slideMotPink : styles.slideMotOrange) : styles.slideBodyWhite}`}
          key={slide.key}
        >

          {/* Icon Block */}
          <div className={`${styles.slideIconBlock} ${isMot ? styles.slideIconBlockTranslucent : (accent === 'pink' ? styles.slideIconBlockPink : styles.slideIconBlockOrange)}`}>
            <SlideIcon size={22} />
          </div>

          {/* Title */}
          <h4 className={`${styles.slideTitle} ${isMot ? styles.slideTitleLight : ''}`}>{slide.label}</h4>

          {/* Content */}
          <div className={styles.slideContent}>
            {slide.type === 'rows' && (
              <div className={styles.slideRows}>
                {(slide.data as InfoItem[]).map((item, i) => (
                  <div key={i} className={styles.slideRow}>
                    <item.icon
                      size={18}
                      className={`${styles.slideRowIcon} ${accent === 'pink' ? styles.slideRowIconPink : styles.slideRowIconOrange}`}
                    />
                    <div className={styles.slideRowText}>
                      <span className={`${styles.slideRowLabel} ${isMot ? styles.slideRowLabelLight : ''}`}>{item.label}:</span>
                      <span className={`${styles.slideRowValue} ${isMot ? styles.slideRowValueLight : ''}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.type === 'chips' && (
              <div className={styles.slideChips}>
                {(slide.data as string[]).map((chip, i) => (
                  <span
                    key={i}
                    className={`${styles.chip} ${accent === 'pink' ? styles.chipPink : styles.chipOrange}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {slide.type === 'bullets' && (
              <ul className={styles.slideBullets}>
                {(slide.data as string[]).map((b, i) => (
                  <li key={i} className={styles.slideBullet}>
                    <span className={`${styles.bDot} ${accent === 'pink' ? styles.bDotPink : styles.bDotOrange}`} />
                    <span className={styles.slideBulletText}>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {slide.type === 'motivations' && (
              <div className={styles.slideMotivationsContainer}>
                <ul className={styles.slideBullets}>
                  {(slide.data as string[]).map((m, i) => (
                    <li key={i} className={styles.slideBulletLight}>
                      <ArrowRight size={14} className={styles.arrowLight} />
                      <span className={styles.slideBulletTextLight}>{m}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button for motivations card */}
                <div className={styles.slideCtaWrapper}>
                  {accent === 'pink' ? (
                    <a href="#hero" className={styles.slideCtaBtnPink}>
                      Empieza a ganar <ArrowRight size={16} />
                    </a>
                  ) : (
                    <a href="#business" className={styles.slideCtaBtnOrange}>
                      Empieza a crecer <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Nav Button */}
        <button
          className={`${styles.navBtn} ${styles.navBtnRight} ${accent === 'pink' ? styles.navBtnPink : styles.navBtnOrange}`}
          onClick={() => go(1)}
          aria-label="Siguiente"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${idx === i ? (accent === 'pink' ? styles.dotActivePink : styles.dotActiveOrange) : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────
   Main Section Component
   ─────────────────────────────────────────── */
const TargetUserSection = () => {
  const [activeView, setActiveView] = useState<'explorer' | 'business'>('explorer');
  const isExplorer = activeView === 'explorer';
  const profiles = isExplorer ? explorerProfiles : businessProfiles;
  const accent: 'pink' | 'orange' = isExplorer ? 'pink' : 'orange';

  return (
    <section className={styles.section} id="target-users">
      <div className={styles.container}>
        {/* Header */}
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <span className={`${styles.badge} ${isExplorer ? styles.badgePink : styles.badgeOrange}`}>
            {isExplorer ? 'Mercado Meta B2C' : 'Mercado Meta B2B'}
          </span>
          <h2 className={styles.title}>
            ¿Quién usa{' '}
            <span className={`${styles.titleGrad} ${!isExplorer ? styles.titleGradBiz : ''}`}>Frimeet?</span>
          </h2>
          <p className={styles.subtitle}>
            {isExplorer
              ? 'Jóvenes residentes urbanos de México que buscan socializar de forma inteligente. Conoce a nuestros usuarios.'
              : 'Establecimientos de hospitalidad y entretenimiento que buscan conectar con clientes calificados.'}
          </p>
        </Reveal>

        {/* Switch */}
        <div className={styles.switchWrap}>
          <button
            className={`${styles.switchBtn} ${isExplorer ? styles.switchActive : ''}`}
            onClick={() => setActiveView('explorer')}
            type="button"
          >
            <Users size={16} /> Exploradores
          </button>
          <button
            className={`${styles.switchBtn} ${!isExplorer ? styles.switchActiveBiz : ''}`}
            onClick={() => setActiveView('business')}
            type="button"
          >
            <Store size={16} /> Negocios
          </button>
        </div>

        {/* Cards */}
        <div className={styles.profilesRow} key={activeView}>
          {profiles.map((profile, pIdx) => (
            <Reveal
              key={profile.id}
              animation="fadeUp"
              delay={120 + pIdx * 180}
              duration={700}
              className={`${styles.card} ${accent === 'pink' ? styles.cardPink : styles.cardOrange}`}
            >

              {/* Card layout: left info + right carousel */}
              <div className={styles.cardInner}>
                {/* LEFT — fixed info */}
                <div className={styles.cardLeft}>
                  {/* Avatar + header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.headerText}>
                      <span className={`${styles.tagline} ${accent === 'pink' ? styles.taglinePink : styles.taglineOrange}`}>
                        {profile.tagline}
                      </span>
                      <h3 className={styles.profileName}>{profile.name}</h3>
                    </div>
                  </div>

                  <p className={styles.headline}>{profile.headline}</p>

                  {/* Demographics */}
                  <div className={styles.demoGrid}>
                    {profile.demographics.map((d, i) => (
                      <div key={i} className={`${styles.demoItem} ${accent === 'pink' ? styles.demoItemPink : styles.demoItemOrange}`}>
                        <CheckCircle size={15} className={styles.demoIcon} />
                        <span className={styles.demoValue}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — carousel */}
                <div className={styles.cardRight}>
                  <SlideCarousel slides={profile.slides} accent={accent} />
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
