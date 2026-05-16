import styles from './HeroSection.module.css'
import foto1 from '../assets/images/foto1.png'
import foto2 from '../assets/images/foto2.png'
import { Reveal } from '../components/Reveal'

const HeroSection = () => {
  return (
    <section className={styles.hero} id='hero'>      
      
      <div className={styles.container}>
        <Reveal animation="fadeRight" delay={200} duration={1000} className={styles.imageLeft}>
          <img src={foto1} alt="Foto 1" />
        </Reveal>
        
        <div className={styles.content}>
          <Reveal animation="fadeUp" delay={0} duration={800}>
            <h1 className={styles.headline}>
              <span className={styles.headlineWhite}>Plans that</span>
              <span className={styles.headlinePink}>actually</span>
              <span className={styles.headlineOrange}>happen.</span>
            </h1>
          </Reveal>

          <Reveal animation="fadeUp" delay={200} duration={800}>
            <p className={styles.subtext}>
              Planea, comparte y disfruta tu ciudad con amigos. Descubre lugares, crea planes personalizados y vive experiencias únicas con Frimeet.
            </p>
          </Reveal>

          <Reveal animation="fadeUp" delay={400} duration={800} className={styles.ctas}>
            <a href="#" className={styles.btnPrimary}>Comienza ya</a>
            <a href="#" className={styles.btnSecondary}>Ver demo</a>
          </Reveal>
        </div>
        <Reveal animation="fadeLeft" delay={600} duration={1000} className={styles.imagesRightInside}>
          <img src={foto2} alt="Foto 2" />
        </Reveal>
      </div>
      <Reveal animation="fadeLeft" delay={400} duration={1000} className={styles.imagesRight}>
        <img src={foto2} alt="Foto 2" />
      </Reveal>
    </section>
  )
}

export default HeroSection
