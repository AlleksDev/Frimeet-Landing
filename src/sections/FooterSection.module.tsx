import styles from './FooterSection.module.css';
import { MapPin, Mail} from 'lucide-react';
import logo from '../assets/icons/fynko.svg';
import { Reveal } from '../components/Reveal';

const footerLinks = {
  Producto:  ['Características', 'Precios', 'API'],
  Recursos:  ['Documentación', 'Soporte', 'Comunidad'],
  Legal:     ['Privacidad', 'Términos', 'Cookies'],
  Empresa:   ['Nosotros', 'Blog'],
}

export default function Footer() {
  return (
    <footer className={styles.footer} id='contact'>

      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>

          <Reveal animation="fadeUp" delay={0} duration={800} className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img src={logo} alt="Frimeet Logo" className={styles.footerLogoIcon} />
              <span className={styles.footerLogoName}>Frimeet</span>
            </div>
            <p className={styles.footerTagline}>
              Motor de integración social y económica. Transformamos cómo descubres y disfrutas tu ciudad.
            </p>
            <div className={styles.footerContact}>
              <span className={styles.footerContactItem}><MapPin size={14} /> México • Latinoamérica</span>
              <span className={styles.footerContactItem}><Mail size={14} /> Frimeetglobal@gmail.com</span>
            </div>
          </Reveal>
          {Object.entries(footerLinks).map(([section, links], index) => (
            <Reveal animation="fadeUp" delay={(index + 1) * 100} duration={800} key={section} className={styles.footerCol}>
              <span className={styles.footerColTitle}>{section}</span>
              <div className={styles.footerLinks}>
                {links.map(link => (
                  <a key={link} href="#" className={styles.footerLink}>{link}</a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>© 2026 Frimeet. Todos los derechos reservados.</span>
    
        </div>
      </div>
    </footer>
  )
}