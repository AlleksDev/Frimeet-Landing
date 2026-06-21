import { Check, Copy, Download, ExternalLink, MapPin, Share2, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import logo from '../assets/icons/fynko.svg'
import styles from './ShareFallbackPage.module.css'

const SUPPORTED_TYPES = ['profile', 'place', 'group', 'event', 'club', 'route', 'post'] as const
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps'

type ShareType = typeof SUPPORTED_TYPES[number]

export interface ShareTarget {
  type: ShareType
  id: string
}

const typeCopy: Record<ShareType, { label: string; title: string; description: string }> = {
  profile: {
    label: 'Perfil',
    title: 'Abre este perfil en Frimeet',
    description: 'Para ver este perfil y conectar con su comunidad necesitas la app de Frimeet.',
  },
  place: {
    label: 'Lugar',
    title: 'Abre este lugar en Frimeet',
    description: 'Explora fotos, reseñas, horarios y actividad social de este lugar desde la app.',
  },
  group: {
    label: 'Grupo',
    title: 'Abre este grupo en Frimeet',
    description: 'Únete a la conversación y revisa los miembros desde la app de Frimeet.',
  },
  event: {
    label: 'Evento',
    title: 'Abre este evento en Frimeet',
    description: 'Revisa detalles, lugar, fecha y asistentes desde la app de Frimeet.',
  },
  club: {
    label: 'Club',
    title: 'Abre este club en Frimeet',
    description: 'Descubre el club, sus reuniones, miembros y eventos desde la app.',
  },
  route: {
    label: 'Ruta',
    title: 'Abre esta ruta en Frimeet',
    description: 'Consulta paradas, tiempos y plan de salida desde la app de Frimeet.',
  },
  post: {
    label: 'Publicación',
    title: 'Abre esta publicación en Frimeet',
    description: 'Mira la publicación, sus fotos y comentarios desde la app de Frimeet.',
  },
}

export function parseShareTarget(pathname: string): ShareTarget | null {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length < 3 || parts[0] !== 's') {
    return null
  }

  const [, rawType, ...idParts] = parts
  if (!SUPPORTED_TYPES.includes(rawType as ShareType)) {
    return null
  }

  const id = decodeURIComponent(idParts.join('/')).trim()
  if (!id) {
    return null
  }

  return {
    type: rawType as ShareType,
    id,
  }
}

interface ShareFallbackPageProps {
  target: ShareTarget
}

export default function ShareFallbackPage({ target }: ShareFallbackPageProps) {
  const [copied, setCopied] = useState(false)
  const copy = typeCopy[target.type]
  const deepLink = useMemo(
    () => `frimeet://open/${target.type}/${encodeURIComponent(target.id)}`,
    [target.id, target.type],
  )
  const shareURL = typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    if (!navigator.clipboard || !shareURL) {
      return
    }

    await navigator.clipboard.writeText(shareURL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.content}>
          <a className={styles.brand} href="/" aria-label="Ir al inicio de Frimeet">
            <img className={styles.logo} src={logo} alt="" aria-hidden="true" />
            <span className={styles.brandName}>Frimeet</span>
          </a>

          <span className={styles.badge}>{copy.label} compartido</span>

          <div>
            <h1 className={styles.title}>
              {copy.title}
              <span className={styles.accent}>desde la app</span>
            </h1>
            <p className={styles.description}>{copy.description}</p>
          </div>

          <div className={styles.actions}>
            <a className={styles.primaryAction} href={deepLink}>
              <ExternalLink size={20} />
              Abrir en Frimeet
            </a>
            <a className={styles.secondaryAction} href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
              <Download size={20} />
              Descargar en Google Play
            </a>
            <button className={styles.ghostAction} type="button" onClick={copyLink}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Link copiado' : 'Copiar link'}
            </button>
          </div>

          <p className={styles.finePrint}>
            Si el botón de abrir no responde, instala Frimeet y vuelve a tocar este enlace. La beta estará disponible primero en Android.
          </p>
        </div>

        <aside className={styles.preview} aria-label="Vista previa del enlace compartido">
          <div className={styles.phone}>
            <div className={styles.phoneTop}>
              <span>Frimeet</span>
              <span className={styles.phoneIsland} />
              <Share2 size={18} />
            </div>

            <div className={styles.phoneBody}>
              <div className={styles.iconBubble}>
                {target.type === 'place' ? <MapPin size={34} /> : <Sparkles size={34} />}
              </div>
              <span className={styles.typeLabel}>{copy.label}</span>
              <h2 className={styles.phoneTitle}>Contenido listo para abrir</h2>
              <div className={styles.targetBox}>
                <p className={styles.targetLabel}>Identificador</p>
                <p className={styles.targetValue}>{target.id}</p>
              </div>
            </div>

            <p className={styles.phoneFooter}>
              Frimeet conecta perfiles, lugares, grupos, eventos, rutas y publicaciones en una sola experiencia social.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}