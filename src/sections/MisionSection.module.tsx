import styles from './MisionSection.module.css';
import { CheckCircle, Heart } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import localBusiness from '../assets/images/sections/local_business.png';
import { Link2 } from 'lucide-react'

const MissionSection = () => {
  return (
    <section className={styles.missionSection} id='mission'>
      <div className={styles.missionContainer}>
        <Reveal animation="fadeRight" delay={0} duration={800} className={styles.missionLeft}>
          <h2 className={styles.missionTitle}>
            Formalizamos la<br />
            <span className={styles.missionTitleGradient}>economía invisible</span>
          </h2>
          <p className={styles.missionBody}>
            El 64.3%<sup>1</sup> de las unidades económicas en México operan en la informalidad. Al no existir en los mapas tradicionales, pierden visibilidad digital. 
            Frimeet usa el poder del crowdsourcing para digitalizar esta economía oculta en Chiapas, dándoles visibilidad... y a ti acceso a experiencias auténticas.
          </p>

          <div className={styles.checkList}>
            {[
              'Comercios validados físicamente mediante geolocalización (PostGIS)',
              'Rutas inteligentes adaptables al presupuesto de tu gente.',
              'Recompensas en Fricoins por digitalizar micronegocios locales.',
            ].map((item) => (
              <div key={item} className={styles.checkItem}>
                <span>{item}</span>
                <CheckCircle size={15} className={styles.icPink} />
              </div>
            ))}
          </div>
          
          {/* Sección de la fuente mejorada */}
          <a href="https://www.inegi.org.mx/programas/ce/2024/#documentacion" target="_blank" rel="noopener noreferrer" className={styles.cardSource}>
            <Link2 size={24} />
            <span>Fuente: Censos Económicos 2024, INEGI <sup>1</sup></span>
          </a>
        </Reveal>

        <div className={styles.missionRight}>
          <Reveal animation="fadeUp" delay={200} duration={800} className={styles.bigCard}>
            <img src={localBusiness} alt="Comercio local" className={styles.bigCardBg} />
            <div className={styles.bigCardContent}>
              <div className={styles.bigCardTop}>
                <div className={styles.bigCardIcon}>
                  <Heart size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <div className={styles.bigCardLabel}>Sincronización en tiempo real</div>
                  <div className={styles.bigCardNum}>100%</div>
                </div>
              </div>
              <p className={styles.bigCardDesc}>
                Lugares respaldados por bases de datos de OpenStreetMap y verificaciones de usuarios locales.
              </p>
            </div>
          </Reveal>

          <Reveal animation="fadeLeft" delay={400} duration={800} className={styles.smallCard}>
            <div className={styles.smallCardIcon}>
              <Heart size={22} strokeWidth={2.5} className={styles.icPink} />
            </div>
            <div>
              <div className={styles.smallCardLabel}>Gamificación Activa</div>
              <div className={styles.smallCardNum}>Gana Fricoins</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default MissionSection
