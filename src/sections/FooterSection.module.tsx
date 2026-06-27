import styles from './FooterSection.module.css';
import { MapPin, Mail} from 'lucide-react';
import logo from '../assets/icons/fynko.svg';
import cityAerial from '../assets/images/sections/city_aerial.png';
import { Reveal } from '../components/Reveal';

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Producto: [
    { label: 'Características', href: '/#about' },
    { label: 'Precios', href: '/#pricing' },
    { label: 'Alcance', href: '/#scope' },
  ],
  Recursos: [
    { label: 'Soporte', href: 'mailto:support.frimeet@gmail.com?subject=Soporte%20Frimeet' },
    { label: 'Reportar IA', href: '/reportar-ia' },
    { label: 'Eliminar cuenta', href: '/eliminacion-de-cuenta' },
  ],
  Legal: [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Aviso integral', href: '/privacidad/integral' },
    { label: 'Términos', href: '/terminos' },
    { label: 'Cookies', href: '/cookies' },
  ],
  Empresa: [
    { label: 'Nosotros', href: '/#mission' },
    { label: 'Contacto', href: '/#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className={styles.footer} id='contact'>
      <div className={styles.footerBgWrap}>
        <img src={cityAerial} alt="" className={styles.footerBgImg} aria-hidden="true" />
      </div>

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
              <span className={styles.footerContactItem}><Mail size={14} /> support.frimeet@gmail.com</span>
            </div>
          </Reveal>
          {Object.entries(footerLinks).map(([section, links], index) => (
            <Reveal animation="fadeUp" delay={(index + 1) * 100} duration={800} key={section} className={styles.footerCol}>
              <span className={styles.footerColTitle}>{section}</span>
              <div className={styles.footerLinks}>
                {links.map(link => (
                  <a key={link.label} href={link.href} className={styles.footerLink}>{link.label}</a>
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
