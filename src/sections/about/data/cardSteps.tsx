import {
  Sparkles,
  Route,
  Store,
  ShieldCheck,
  Radio,
  Coins,
  Globe,
  Cpu,
  Brain,
  MapPin,
} from 'lucide-react'

/* ================================================================
   Types
   ================================================================ */
export type Step = {
  tag?: string
  icon: React.ReactNode
  title: string
  description: string
  gradient?: boolean
  cta?: string
}

/* ================================================================
   Card data
   ================================================================ */
export const cardSteps: Step[] = [
  {
    tag: 'Inteligencia Artificial',
    icon: <Sparkles size={22} />,
    title: 'Recomendaciones con IA',
    description: 'Olvídate de buscar por categorías aburridas. Nuestro microservicio de Inteligencia Artificial procesa lenguaje natural (ej. "Lugar relajado para hablar de negocios por menos de 500 pesos en Tuxtla") y lo traduce en queries geoespaciales complejas para armar el itinerario ideal de tu Tribu'
  },
  {
    tag: 'Algoritmos Genéticos',
    icon: <Route size={22} />,
    title: 'Rutas optimizadas',
    description: 'Resolvemos el problema matemático de salir en grupo. Nuestro Algoritmo Genético cruza el presupuesto máximo, las preferencias de la Tribu y calcula distancias exactas utilizando la fórmula Haversine en *PostGIS* para trazar la ruta perfecta sin estrés logístico.'
      },
  {
    icon: <Store size={20} />,
    title: 'Comercios "Invisibles"',
    description: 'Rescatamos la economía de barrio. Sabiendo que 6 de cada 10 establecimientos operan en la informalidad, nuestro motor de crowdsourcing premia a los usuarios por mapear digitalmente estos micronegocios en Chiapas, conectándolos con las Tribus y dándoles visibilidad real.'
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Sistema antifraude',
    description: 'Cero lugares falsos en nuestro ecosistema. Implementamos un pipeline estricto: cruce de precisión GPS y un microservicio de *Visión Computacional* que analiza las fotografías enviadas por los Exploradores para verificar la existencia real del negocio antes de aprobarlo.'
  },
  {
    tag: 'Datos en vivo',
    icon: <Radio size={22} />,
    title: 'Radar de Aforo en Tiempo Real',
    description: '¿Odias llegar y que el lugar esté lleno? Nuestro backend transaccional (Go) mantiene un control estricto de los asistentes. El mapa refleja un semáforo de afluencia en tiempo real, permitiendo a tu grupo tomar decisiones logísticas inteligentes antes de salir de casa.'
  },
  {
    icon: <Coins size={22} />,
    title: 'Economía Interna (Fricoins)',
    description: 'Tu esfuerzo tiene valor. Gana *Fricoins* y aumenta tu Trust Score al descubrir y validar negocios en fase de descubrimiento. Una economía digital nativa diseñada para recompensar a los usuarios que mantienen limpia y actualizada la base de datos de nuestra ciudad.',
    gradient: true,
  },
]

/* ================================================================
   Tech reach badges
   ================================================================ */
export const techBadges = [
  { icon: <Globe size={16} />, label: '3 ciudades piloto' },
  { icon: <Cpu size={16} />, label: 'Algoritmos genéticos' },
  { icon: <Brain size={16} />, label: 'IA conversacional' },
  { icon: <MapPin size={16} />, label: '+500 comercios mapeados' },
]

/* ================================================================
   Steps data
   ================================================================ */
export const stepsData = [
  { number: '1', label: 'Explora', 
    name: 'Mapea tu ciudad', 
    desc: 'Descubre "joyas ocultas" usando nuestro radar geoespacial y saca a la luz la economía local. Adiós a las franquicias de siempre.' 
  },
  { number: '2', label: 'Evalúa', 
    name: 'Valida y gana Fricoins', 
    desc: 'Conviértete en el sensor de la ciudad. Confirma físicamente la existencia de nuevos lugares y recibe recompensas por mantener el ecosistema libre de fraudes.' 
  },
  { number: '3', label: 'Optimiza', 
    name: 'Arma la ruta perfecta', 
    desc: 'Deja de pelear en el chat. Nuestro Algoritmo Genético cruza distancias, presupuestos y los gustos de tu Tribu para trazar el itinerario matemático ideal.' 
  },
  { number: '4', label: 'Disfruta', 
    name: 'Vive sin fricción', 
    desc: 'Conéctate con tu Club, revisa el aforo del lugar en tiempo real (gracias a nuestro backend transaccional) y sal a disfrutar sin estrés logístico.' },
]
