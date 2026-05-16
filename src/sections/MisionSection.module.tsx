import styles from './MisionSection.module.css';
import { CheckCircle, Heart } from 'lucide-react'

const MissionSection = () => {
  return (
    <section className={styles.missionSection} id='mission'>
      <div className={styles.missionContainer}>
        <div className={styles.missionLeft}>
          <span className={styles.badge}>Nuestra misión</span>
          <h2 className={styles.missionTitle}>
            Formalizamos la<br />
            <span className={styles.missionTitleGradient}>economía invisible</span>
          </h2>
          <p className={styles.missionBody}>
            Más del 55% del comercio local en ciudades medianas no tiene presencia digital.
            Frimeet les da visibilidad, y a ti acceso a experiencias auténticas que ninguna
            plataforma convencional puede ofrecerte.
          </p>

          <div className={styles.checkList}>
            {[
              'Comercios validados por geolocalización comunitaria',
              'Rutas que se adaptan a tu presupuesto y estado de ánimo',
              'Impacto económico directo en micronegocios locales',
            ].map((item) => (
              <div key={item} className={styles.checkItem}>
                {item}
                <CheckCircle size={15} className={styles.icPink} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.missionRight}>
          <div className={styles.bigCard}>
            <div className={styles.bigCardTop}>
              <div className={styles.bigCardIcon}>
                <Heart size={26} strokeWidth={2.5} className={styles.icPink} />
              </div>
              <div>
                <div className={styles.bigCardLabel}>Conexiones reales</div>
                <div className={styles.bigCardNum}>+15,000</div>
              </div>
            </div>
            <p className={styles.bigCardDesc}>
              Personas han encontrado su próximo lugar favorito gracias a
              recomendaciones de la comunidad.
            </p>
          </div>

          <div className={styles.smallCard}>
            <div className={styles.smallCardIcon}>
              <Heart size={22} strokeWidth={2.5} className={styles.icPink} />
            </div>
            <div>
              <div className={styles.smallCardLabel}>Comercios descubiertos</div>
              <div className={styles.smallCardNum}>+15,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionSection
