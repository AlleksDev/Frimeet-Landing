import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import fynkoLogo from '../assets/icons/fynko.svg'

const Navbar = () => {
  const [active, setActive] = useState('hero')
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            const bg = window.getComputedStyle(entry.target).backgroundColor
            const rgb = bg.match(/\d+/g)?.map(Number)
            if (rgb) {
              const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3
              setIsDark(brightness > 180)
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((sec) => observer.observe(sec))
  }, [])

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
        <div className={styles.logo}>
          <img src={fynkoLogo} alt="Fynko Logo" />
          <span className={styles.logoText}>Frimeet</span>
        </div>

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
          <li><a href="#hero"     className={active === 'hero' ? styles.active : ''} onClick={handleLinkClick}>Home</a></li>
          <li><a href="#about"    className={active === 'about' ? styles.active : ''} onClick={handleLinkClick}>About</a></li>
          <li><a href="#mission"  className={active === 'mission' ? styles.active : ''} onClick={handleLinkClick}>Misión</a></li>
          <li><a href="#vision"   className={active === 'vision' ? styles.active : ''} onClick={handleLinkClick}>Visión</a></li>
          <li><a href="#business" className={active === 'business' ? styles.active : ''} onClick={handleLinkClick}>Roles</a></li>
          <li><a href="#contact"  className={active === 'contact' ? styles.active : ''} onClick={handleLinkClick}>Contacto</a></li>
        </ul>
      </nav>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </>
  )
}

export default Navbar
