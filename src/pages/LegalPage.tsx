import { useEffect, type ComponentType } from 'react'
import {
  ArrowLeft,
  Bot,
  CalendarDays,
  Cookie,
  ExternalLink,
  FileText,
  Mail,
  ScrollText,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import Navbar from '../components/Navbar.module'
import Footer from '../sections/FooterSection.module'
import styles from './LegalPage.module.css'
import { childSafetyEmail, privacyEmail, type LegalIcon, type LegalPageData } from './legalContent'

type IconComponent = ComponentType<{ size?: number; strokeWidth?: number }>

const iconMap: Record<LegalIcon, IconComponent> = {
  shield: ShieldCheck,
  file: FileText,
  trash: Trash2,
  bot: Bot,
  cookie: Cookie,
  terms: ScrollText,
  childSafety: ShieldCheck,
}

type LegalPageProps = {
  page: LegalPageData
}

const getPrimaryAction = (path: string) => {
  if (path === '/eliminacion-de-cuenta') {
    return {
      label: 'Solicitar eliminacion',
      href: `mailto:${privacyEmail}?subject=Eliminar%20cuenta%20Frimeet`,
    }
  }

  if (path === '/reportar-ia') {
    return {
      label: 'Enviar reporte IA',
      href: `mailto:${privacyEmail}?subject=Reporte%20IA%20Frimeet`,
    }
  }

  if (path === '/seguridad-infantil') {
    return {
      label: 'Contactar seguridad infantil',
      href: `mailto:${childSafetyEmail}?subject=Seguridad%20infantil%20Frimeet`,
    }
  }

  if (path === '/privacidad' || path === '/privacidad/integral') {
    return {
      label: 'Ejercer derechos ARCO',
      href: `mailto:${privacyEmail}?subject=Solicitud%20ARCO%20Frimeet`,
    }
  }

  return {
    label: 'Contactar soporte',
    href: `mailto:${privacyEmail}?subject=Soporte%20Frimeet`,
  }
}

const isHttpUrl = (href: string) => href.startsWith('http')

export default function LegalPage({ page }: LegalPageProps) {
  const PageIcon = iconMap[page.icon]
  const primaryAction = getPrimaryAction(page.path)

  useEffect(() => {
    document.title = `${page.title} | Frimeet`
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page.title])

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero} id="legal-hero">
          <div className={styles.heroInner}>
            <a className={styles.backLink} href="/">
              <ArrowLeft size={18} />
              Volver a Frimeet
            </a>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>{page.eyebrow}</span>
                <h1>{page.title}</h1>
                <p>{page.summary}</p>
                <div className={styles.metaRow} aria-label="Informacion del documento">
                  <span>
                    <CalendarDays size={17} />
                    Actualizado: {page.updatedAt}
                  </span>
                  <span>{page.badge}</span>
                </div>
              </div>

              <div className={styles.heroMark} aria-hidden="true">
                <PageIcon size={58} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection} id="legal-content">
          <div className={styles.contentInner}>
            <aside className={styles.sidePanel} aria-label="Datos rapidos del documento">
              <span className={styles.sideLabel}>Documento legal</span>
              <a
                className={styles.publicUrl}
                href={page.canonicalUrl}
                target="_blank"
                rel="noreferrer"
              >
                {page.canonicalUrl}
                <ExternalLink size={15} />
              </a>

              <div className={styles.sideDivider} />

              <a className={styles.primaryAction} href={primaryAction.href}>
                <Mail size={18} />
                {primaryAction.label}
              </a>

              <nav className={styles.relatedNav} aria-label="Documentos relacionados">
                {page.related.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target={isHttpUrl(link.href) ? '_blank' : undefined}
                    rel={isHttpUrl(link.href) ? 'noreferrer' : undefined}
                  >
                    {link.label}
                    {isHttpUrl(link.href) && <ExternalLink size={14} />}
                  </a>
                ))}
              </nav>
            </aside>

            <article className={styles.document}>
              {page.blocks.map((block) => (
                <section className={styles.block} key={block.heading}>
                  <h2>{block.heading}</h2>
                  {block.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {block.bullets && (
                    <ul>
                      {block.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {block.note && <p className={styles.note}>{block.note}</p>}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
