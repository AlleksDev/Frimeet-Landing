import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import fynkoLogo from '../assets/icons/fynko.svg'

// IDs de secciones con fondo oscuro donde el navbar debe usar texto claro
const DARK_BG_SECTIONS = new Set(['hero', 'contact'])

// Mapeo de IDs de sección a grupo de navbar
const SECTION_GROUP_MAP: Record<string, string> = {
  hero: 'hero',
  problem: 'problem',
  'target-users': 'problem', // target-users pertenece al grupo problema
  mission: 'propósito',
  vision: 'propósito',
  about: 'about',
  scope: 'scope',
  pricing: 'pricing',
  contact: 'contact',
}

const Navbar = () => {
  const [active, setActive] = useState('hero')
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const lastActiveRef = useRef('hero')
  const lastIsDarkRef = useRef(false)

  const updateNavbar = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id], footer[id]')
    if (sections.length === 0) return

    // Punto de referencia: justo debajo del navbar (~80px desde el top)
    const checkPoint = 80

    let currentSection: HTMLElement | null = null

    // Encontrar la sección que contiene el punto de referencia.
    // Iteramos en orden del DOM: la última sección cuyo top <= checkPoint gana.
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= checkPoint) {
        currentSection = section
      }
    })

    // Fallback: si ninguna sección está por encima del checkpoint, usar la primera
    if (!currentSection) {
      currentSection = sections[0]
    }

    const sectionId = currentSection.id
    const group = SECTION_GROUP_MAP[sectionId] ?? sectionId
    const sectionIsDark = !DARK_BG_SECTIONS.has(sectionId)

    // Solo actualizar estado si cambió (evita re-renders innecesarios)
    if (group !== lastActiveRef.current) {
      lastActiveRef.current = group
      setActive(group)
    }

    if (sectionIsDark !== lastIsDarkRef.current) {
      lastIsDarkRef.current = sectionIsDark
      setIsDark(sectionIsDark)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateNavbar)
    }

    // Ejecutar inmediatamente para estado inicial
    updateNavbar()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateNavbar])

  // Close menu on link click
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`${styles.navbar} ${isDark ? styles.navDark : ''}`}>
        <a href="#hero" className={styles.logo}>
          <img src={fynkoLogo} alt="Fynko Logo" />
          <span className={styles.logoText}>Frimeet</span>
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''} ${isDark ? styles.hamburgerDark : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <li><a href="#problem"      className={active === 'problem' ? styles.active : ''} onClick={handleLinkClick}>Problema</a></li>
          <li><a href="#mission"      className={active === 'propósito' ? styles.active : ''} onClick={handleLinkClick}>Propósito</a></li>
          <li><a href="#about"        className={active === 'about' ? styles.active : ''} onClick={handleLinkClick}>Funciones</a></li>
          <li><a href="#scope"        className={active === 'scope' ? styles.active : ''} onClick={handleLinkClick}>Alcance</a></li>
          <li><a href="#pricing"      className={active === 'pricing' ? styles.active : ''} onClick={handleLinkClick}>Precios</a></li>
          <li><a href="#contact"      className={active === 'contact' ? styles.active : ''} onClick={handleLinkClick}>Contacto</a></li>
        </ul>
      </nav>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </>
  )
}

export default Navbar
