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
  ctaLabel?: string;
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
    headline: 'Este es el usuario que sufre el problema logístico de primera mano. Es tu "Admin" de los grupos.',
    avatarIcon: Target,
    demographics: [
      { icon: Calendar, label: 'Edad', value: '18 – 30 años' },
      { icon: Globe, label: 'Nacionalidad', value: 'México · Zonas urbanas' },
      { icon: MapPin, label: 'Ubicación', value: 'Tuxtla Gutiérrez, Chiapas' },
      { icon: Users, label: 'Género', value: 'Todos los géneros' },
    ],
    slides: [
      {
        key: 'occupation',
        icon: Briefcase,
        label: 'Ocupación y Estilo de Vida',
        type: 'rows',
        data: [
          { icon: Briefcase, label: 'OCUPACIÓN', value: 'Estudiante universitario / Profesional Junior (El "Admin" del grupo).' },
          { icon: Wallet, label: 'INGRESO', value: '$3,000 – $12,000 MXN/mes.' },
          { icon: Coffee, label: 'ESTILO DE VIDA', value: 'Socialmente activo, pero estresado. Organiza salidas 2–3 veces por semana y siempre termina siendo el que persigue a los demás para que confirmen y paguen.' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Gustos e Intereses',
        type: 'chips',
        data: [
          'Bares con concepto local',
          'Restaurantes de moda en Tuxtla o San Cris',
          'Eventos culturales y vida nocturna',
          'Comida callejera validada',
          'Busca opciones que se ajusten al presupuesto de estudiantes y que queden en un punto medio para todos.',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'La pesadilla de las apps: Salta entre WhatsApp, Instagram y mapas para intentar coordinar a 5 personas distintas.',
          'Busca automatización: Necesita que una app haga las matemáticas por él.',
          'La solución Frimeet: Centraliza a sus amigos en Clubes (Tribus) y crea Eventos donde la app calcula el aforo, la ruta y centraliza la decisión.',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        ctaLabel: 'Crea tu Tribu',
        data: [
          'Evitar la fatiga de decisión grupal (FOBO) usando las sugerencias de Frimeet.',
          'Optimizar el tiempo y presupuesto de su Tribu.',
          'Dejar de ser el "niñero" que organiza todo; delegar la logística al ecosistema de la app.',
        ],
      },
    ],
  },
  {
    id: 'validator',
    name: 'El Explorador Validador',
    tagline: 'Perfil B · B2C',
    headline: 'Este es el usuario que hace que la base de datos esté viva. Es la fuente de datos descentralizada.',
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
          { icon: Briefcase, label: 'OCUPACIÓN', value: 'Universitario, Freelancer, Creativo.' },
          { icon: Wallet, label: 'INGRESO', value: '$8,000 – $18,000 MXN/mes.' },
          { icon: Coffee, label: 'ESTILO DE VIDA', value: 'Foodie urbano y aventurero local. Le encanta meterse por los barrios emergentes para encontrar "esa cafetería que nadie conoce" o el mejor puesto de la ciudad.' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Gustos e Intereses',
        type: 'chips',
        data: [
          'Cafés de especialidad y Gastronomía chiapaneca',
          'Mercados locales y bazares',
          'Fotografía urbana y Arte',
          'Música en vivo',
          'Huyen de las franquicias internacionales. Quieren apoyar la economía local y presumir que ellos descubrieron el lugar primero.',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Generador de Contenido (UGC): Sabe tomar buenas fotos de fachadas y platillos.',
          'Detector de Fraudes: Odia las reseñas falsas de internet; prefiere datos reales.',
          'La solución Frimeet: Se convierte en el "sensor físico" de la app. Usa su GPS para estar a menos de 50 metros de un lugar en fase de Descubrimiento y envía pruebas visuales para que la IA y la comunidad lo aprueben.',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        ctaLabel: 'Empieza a ganar Fricoins',
        data: [
          'Validar las "joyas ocultas" de Chiapas para digitalizar la economía local.',
          'Subir la fase de un negocio para aumentar su Trust Score.',
          'Recibir Fricoins y reputación en el ranking por mantener el ecosistema limpio y seguro.',
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
    name: 'El Héroe Local (Emprendimiento Emergente)',
    tagline: 'Perfil C · B2B',
    headline: 'El 64% de la economía está aquí. Son las cafeterías de especialidad, los food trucks y los negocios de barrio que no tienen presupuesto para publicidad, pero tienen un producto increíble.',
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
          { icon: UserCheck, label: 'CAPACIDAD', value: '10 – 50 personas (Espacios íntimos).' },
          { icon: Wallet, label: 'PRESUPUESTO MKT', value: '$0 – $1,500 MXN/mes (Casi nulo).' },
          { icon: Briefcase, label: 'OPERACIÓN', value: 'Dueño-operador (Hace de todo, no tiene tiempo para gestionar redes sociales complejas).' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Enfoque del Negocio',
        type: 'chips',
        data: [
          'Experiencias auténticas y locales.',
          'Propuestas de nicho (Street food, bazares, cafés).',
          'Construcción de comunidad vecinal.',
          'Su superpoder: Ofrecer algo único que las grandes franquicias no pueden replicar.',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Sufren el algoritmo: Tienen un Instagram básico que no llega a nadie nuevo.',
          'Invisibles en el mapa: A menudo no están en Google Maps o su información está desactualizada.',
          'La solución Frimeet: Nuestros Exploradores los digitalizan, suben sus fotos y los validan a cambio de Fricoins, dándoles un Trust Score alto sin que el dueño mueva un dedo.',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        ctaLabel: 'Aparece en el mapa',
        data: [
          'Digitalización 100% gratuita impulsada por la comunidad.',
          'Ganar visibilidad orgánica frente a las Tribus que buscan planes cerca de su zona.',
          'Convertirse en el lugar favorito del barrio sin gastar en Ads.',
        ],
      },
    ],
  },
  {
    id: 'consolidated',
    name: 'El Hub Social (Establecimiento Consolidado)',
    tagline: 'Perfil D · B2B',
    headline: 'Son los bares populares, restaurantes y centros nocturnos. Ellos ya tienen clientes, su problema no es existir, su problema es la logística, las mesas vacías por cancelaciones y atraer grupos grandes.',
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
          { icon: UserCheck, label: 'CAPACIDAD', value: '80 – 300+ personas (Volumen alto).' },
          { icon: Wallet, label: 'PRESUPUESTO MKT', value: '$5,000 – $25,000+ MXN/mes.' },
          { icon: Briefcase, label: 'OPERACIÓN', value: 'Gerente de operaciones y staff dedicado.' },
        ] as InfoItem[],
      },
      {
        key: 'interests',
        icon: Heart,
        label: 'Enfoque del Negocio',
        type: 'chips',
        data: [
          'Gestión inteligente del aforo.',
          'Creación de Eventos temáticos y promociones.',
          'Maximizar el ticket promedio por mesa.',
          'Su reto: Llenar el local en horas muertas y evitar las temidas cancelaciones de grupos de último minuto.',
        ],
      },
      {
        key: 'digital',
        icon: Smartphone,
        label: 'Perfil Digital',
        type: 'bullets',
        data: [
          'Gastan en Ads con bajo ROI: Pagan publicidad en Meta/Google que trae "likes", pero no garantiza visitas físicas.',
          'Ciegos ante la logística: No saben cuántos grupos están planeando ir esta noche hasta que ya están en la puerta.',
          'La solución Frimeet: Les permitimos reclamar su perfil, gestionar su estado de Aforo en tiempo real y patrocinar Eventos directamente en el feed de los Clubes.',
        ],
      },
      {
        key: 'motivations',
        icon: Sparkles,
        label: 'Motivaciones',
        type: 'motivations',
        ctaLabel: 'Atrae más Tribus',
        data: [
          'Conectar directamente con Clubes (Grupos) que ya resolvieron su logística de salida.',
          'Optimizar el flujo de clientes y reportar su capacidad en tiempo real.',
          'Ser una "parada clave" en las rutas sugeridas por nuestro motor de recomendaciones.',
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
                      {slide.ctaLabel || 'Empieza a ganar'} <ArrowRight size={16} />
                    </a>
                  ) : (
                    <a href="#business" className={styles.slideCtaBtnOrange}>
                      {slide.ctaLabel || 'Empieza a crecer'} <ArrowRight size={16} />
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
