import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import fynkoLogo from '../assets/icons/fynko.svg'

const Navbar = () => {
  const [active, setActive] = useState('hero')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)

            // Detecta si el fondo es claro u oscuro
            const bg = window.getComputedStyle(entry.target).backgroundColor
            const rgb = bg.match(/\d+/g)?.map(Number)
            if (rgb) {
              const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3
              setIsDark(brightness > 180) // fondo claro → navbar negra
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((sec) => observer.observe(sec))
  }, [])

  return (
    <nav className={`${styles.navbar} ${isDark ? styles.navDark : ''}`}>
      <div className={styles.logo}>
        <img src={fynkoLogo} alt="Fynko Logo" />
        <span className={styles.logoText}>Fynko</span>
      </div>

      <ul className={styles.navLinks}>
        <li><a href="#hero"     className={active === 'hero' ? styles.active : ''}>Home</a></li>
        <li><a href="#about"    className={active === 'about' ? styles.active : ''}>About</a></li>
        <li><a href="#mission"  className={active === 'mission' ? styles.active : ''}>Misión</a></li>
        <li><a href="#vision"   className={active === 'vision' ? styles.active : ''}>Visión</a></li>
        <li><a href="#business" className={active === 'business' ? styles.active : ''}>Roles</a></li>
        <li><a href="#contact"  className={active === 'contact' ? styles.active : ''}>Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
