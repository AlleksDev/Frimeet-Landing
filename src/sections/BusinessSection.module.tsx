import styles from './BusinessSection.module.css'
import { User, Store, CheckCircle } from 'lucide-react'

const clienteFeatures = [
  'Rutas personalizadas',
  'Historial de planes',
  'Recomendaciones con IA'
]

const comercioFeatures = [
  'Panel de tendencias',
  'Visibilidad en mapas',
  'Conexión con clientes'
]

export default function BusinessSection() {
  return (
    <>
      <section className={styles.businessSection} id='business'>
        <div className={styles.businessContainer}>
          <div className={styles.businessHeader}>
            <h2 className={styles.businessTitle}>
              Encuentra tu<br />
              <span className={styles.businessTitleGrad}>rol en Frimeet</span>
            </h2>
            <p className={styles.businessSub}>
              Frimeet no sirve solamente para encontrar nuevos lugares, también puedes registrarte como negocio
            </p>
          </div>

          <div className={styles.rolesGrid}>
            <div className={`${styles.roleCard} ${styles.roleCardWhite}`}>
              <span className={`${styles.roleBlob} ${styles.blobWhite}`} />
              <div className={`${styles.roleIcon} ${styles.iconWhite}`}>
                <User size={20} />
              </div>
              <p className={`${styles.roleName} ${styles.nameWhite}`}>Cliente</p>
              <p className={`${styles.roleDesc} ${styles.descWhite}`}>
                Disfruta rutas optimizadas por IA, califica experiencias y descubre joyas ocultas para formalizarte.
              </p>
              <div className={styles.roleList}>
                {clienteFeatures.map(f => (
                  <div key={f} className={`${styles.roleItem} ${styles.itemWhite}`}>
                    <CheckCircle size={15} className={styles.icWhite} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.roleCard} ${styles.roleCardPink}`}>
              <span className={`${styles.roleBlob} ${styles.blobPink}`} />
              <div className={`${styles.roleIcon} ${styles.iconPink}`}>
                <Store size={20} />
              </div>
              <p className={`${styles.roleName} ${styles.namePink}`}>Comercio</p>
              <p className={`${styles.roleDesc} ${styles.descPink}`}>
                Accede a analíticas reales sobre lo que busca tu comunidad sin necesidad de formalizarte.
              </p>
              <div className={styles.roleList}>
                {comercioFeatures.map(f => (
                  <div key={f} className={`${styles.roleItem} ${styles.itemPink}`}>
                    <CheckCircle size={15} className={styles.icPink} /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            ¿Listo para redescubrir<br />tu ciudad?
          </h2>
          <p className={styles.ctaSub}>
            Descarga Frimeet y comienza a crear planes perfectos con tu comunidad.
            Tu próxima aventura está a un tap de distancia.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary}>Descarga gratis →</button>
            <button className={styles.btnSecondary}>Saber más</button>
          </div>

          <div className={styles.ctaStats}>
            {[['50K+','Usuarios activos'],['4.9','Rating en store'],['100+','Ciudades']].map(([n,l]) => (
              <div key={l} className={styles.statItem}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
