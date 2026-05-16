import styles from './HeroSection.module.css'
import foto1 from '../assets/images/foto1.png'
import foto2 from '../assets/images/foto2.png'

const HeroSection = () => {
  return (
    <section className={styles.hero} id='hero'>      
      
      <div className={styles.container}>
        <div className={styles.imageLeft}>
          <img src={foto1} alt="Foto 1" />
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.headline}>
            <span className={styles.headlineWhite}>Plans that</span>
            <span className={styles.headlinePink}>actually</span>
            <span className={styles.headlineOrange}>happen.</span>
          </h1>

          <p className={styles.subtext}>
            Planea, comparte y disfruta tu ciudad con amigos. Descubre lugares, crea planes personalizados y vive experiencias únicas con Frimeet.
          </p>

          <div className={styles.ctas}>
            <a href="#" className={styles.btnPrimary}>Comienza ya</a>
            <a href="#" className={styles.btnSecondary}>Ver demo</a>
          </div>
        </div>
        
      </div>
      <div className={styles.imagesRight}>
        <img src={foto2} alt="Foto 2" />
      </div>
    </section>
  )
}

export default HeroSection
