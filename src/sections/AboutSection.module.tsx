import styles from './AboutSection.module.css'
import { Map, Target, MessageCircle, Users, BarChart3, CheckCircle } from 'lucide-react'
import { Reveal } from '../components/Reveal'


const AboutSection = () => {
  const features = [
  {
    icon: <Map size={26} strokeWidth={2.5} />,
    title: 'Rutas optimizadas',
    description: 'Algoritmos genéticos calculan itinerarios perfectos evaluando distancia, presupuesto y variedad.'
  },
  {
    icon: <Target size={26} strokeWidth={2.5} />,
    title: 'Comercios Invisibles',
    description: 'Descubre negocios locales que no aparecen en mapas oficiales, validados por la comunidad.'
  },
  {
    icon: <MessageCircle size={26} strokeWidth={2.5} />,
    title: 'IA Conversacional',
    description: 'Busca por intención natural: "lugar tranquilo para platicar con amigos bajo 500 pesos".'
  },
  {
    icon: <Users size={26} strokeWidth={2.5} />,
    title: 'Comunidad activa',
    description: 'Exploradores, validadores y consumidores colaboran para mapear la economía local.'
  },
  {
    icon: <BarChart3 size={26} strokeWidth={2.5} />,
    title: 'Analíticas para Negocios',
    description: 'Panel de tendencias de búsqueda para comercios locales que quieren crecer.'
  },
  {
    icon: <CheckCircle size={26} strokeWidth={2.5} />,
    title: 'Validación Real',
    description: 'Sistema de geolocalización y clustering para detectar y filtrar lugares falsos.'
  }
]


  const steps = [
    {
      number: '1',
      label: 'Explora',
      name: 'Descubre lugares',
      desc: 'Encuentra sitios únicos y negocios invisibles cerca de ti.'
    },
    {
      number: '2',
      label: 'Evalúa',
      name: 'Revisa información',
      desc: 'Lee validaciones reales y datos generados por la comunidad.'
    },
    {
      number: '3',
      label: 'Optimiza',
      name: 'Crea tu ruta',
      desc: 'Genera itinerarios inteligentes con IA y algoritmos genéticos.'
    },
    {
      number: '4',
      label: 'Disfruta',
      name: 'Vive la experiencia',
      desc: 'Explora tu ciudad como nunca antes, con datos reales.'
    }
  ]

  return (
    <section className={styles.about} id='about'>
      <div className={styles.aboutContainer}>
        <Reveal animation="fadeUp" delay={0} duration={800} className={styles.header}>
          <h2 className={styles.title}>Tu ciudad, redescubierta</h2>
          <p className={styles.subtitle}>
            Tecnología de punta para transformar cómo descubres y disfrutas tu entorno local.
          </p>
        </Reveal>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Reveal key={index} animation="fadeUp" delay={index * 100} duration={800} className={styles.card}>
              <div className={styles.decorativeCircle}></div>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </Reveal>
          ))}
        </div>
        <div className={styles.stepsSection}>
          <Reveal animation="fadeUp" delay={0} duration={800} className={styles.stepsHeader}>
            <h3 className={styles.stepsTitle}>Tan facil como</h3>
            <h3 className={styles.stepsTitle}>1, 2, 3... ¡Listo!</h3>
          </Reveal>

          <div className={styles.timelineContainer}>
            {steps.map((step, index) => (
              <Reveal key={index} animation="fadeLeft" delay={index * 150} duration={800} className={styles.step}>
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
