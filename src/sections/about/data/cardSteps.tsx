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
    description:
      'Olvídate de buscar por categorías aburridas. Pídele a nuestra IA en lenguaje natural: "Lugar relajado para hablar de negocios por menos de 500 pesos" y el algoritmo lo traducirá en tu itinerario ideal.',
  },
  {
    tag: 'Algoritmos Genéticos',
    icon: <Route size={22} />,
    title: 'Rutas optimizadas',
    description:
      'Resolvemos el debate del grupo. Nuestro Algoritmo Genético cruza el presupuesto, las preferencias de la tribu y las distancias (fórmula Haversine) para trazar la ruta de paradas perfecta.',
  },
  {
    icon: <Store size={20} />,
    title: 'Comercios "Invisibles"',
    description:
      'Rescatamos a la economía de barrio. Formalizamos en el mapa digital a ese 55% de comercios locales que las grandes plataformas ignoran.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Sistema antifraude',
    description:
      'Cero lugares falsos. Validación cruzada, cruce geoespacial GPS y escaneo documental OCR para asegurar que cada pin exista en la vida real.',
  },
  {
    tag: 'Datos en vivo',
    icon: <Radio size={22} />,
    title: 'Radar de Aforo en Tiempo Real',
    description:
      '¿Odias llegar y no encontrar mesa? El ecosistema te muestra un semáforo de afluencia antes de salir de casa, optimizando tu tiempo y evitando las multitudes.',
  },
  {
    icon: <Coins size={22} />,
    title: 'Economía Interna (Fricoins)',
    description:
      'Gana Fricoins explorando, validando y recomendando lugares. Canjéalos por descuentos exclusivos en comercios locales y meses de Premium.',
    gradient: true,
    cta: 'Empieza a ganar',
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
  { number: '1', label: 'Explora', name: 'Descubre lugares', desc: 'Encuentra sitios únicos y negocios invisibles cerca de ti.' },
  { number: '2', label: 'Evalúa', name: 'Revisa información', desc: 'Lee validaciones reales y datos generados por la comunidad.' },
  { number: '3', label: 'Optimiza', name: 'Crea tu ruta', desc: 'Genera itinerarios inteligentes con IA y algoritmos genéticos.' },
  { number: '4', label: 'Disfruta', name: 'Vive la experiencia', desc: 'Explora tu ciudad como nunca antes, con datos reales.' },
]
