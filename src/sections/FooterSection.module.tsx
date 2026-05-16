import styles from './FooterSection.module.css';
import { Zap, MapPin, Mail} from 'lucide-react';

const footerLinks = {
  Producto:  ['Características', 'Precios', 'API', 'Integraciones'],
  Empresa:   ['Nosotros', 'Blog', 'Carreras', 'Prensa'],
  Recursos:  ['Documentación', 'Soporte', 'Comunidad', 'Partners'],
  Legal:     ['Privacidad', 'Términos', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className={styles.footer} id='contact'>

      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>

          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <Zap size={28} className={styles.footerLogoIcon} />
              <span className={styles.footerLogoName}>FRIMEET</span>
            </div>
            <p className={styles.footerTagline}>
              Motor de integración social y económica. Transformamos cómo descubres y disfrutas tu ciudad.
            </p>
            <div className={styles.footerContact}>
              <span className={styles.footerContactItem}><MapPin size={14} /> México • Latinoamérica</span>
              <span className={styles.footerContactItem}><Mail size={14} /> finkoglobal@gmail.com</span>
            </div>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className={styles.footerCol}>
              <span className={styles.footerColTitle}>{section}</span>
              <div className={styles.footerLinks}>
                {links.map(link => (
                  <a key={link} href="#" className={styles.footerLink}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>© 2026 Fynko. Todos los derechos reservados.</span>
          <div className={styles.footerSocials}>
            <button className={styles.socialBtn} aria-label="X / Twitter"></button>
            <button className={styles.socialBtn} aria-label="Instagram"></button>
            <button className={styles.socialBtn} aria-label="GitHub"></button>
          </div>
        </div>
      </div>
    </footer>
  )
}