import styles from './HeroSection.module.css'
import foto1 from '../assets/images/foto1.svg'
import foto2 from '../assets/images/foto2.svg'

const HeroSection = () => {
  return (
    <section className={styles.hero} id='hero'>
      <div className={styles.bgGradient} />
      

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
            Lorem ipsum dolor sit amet. andal it es boneka ambalabu
            ige ergo sum tuntunt sahur tralalero.
          </p>

          <div className={styles.ctas}>
            <a href="#" className={styles.btnPrimary}>Comienza ya</a>
            <a href="#" className={styles.btnSecondary}>Ver demo</a>
          </div>
        </div>
        
        <div className={styles.imagesRight}>
          <img src={foto2} alt="Foto 2" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
