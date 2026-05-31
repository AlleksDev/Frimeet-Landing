import styles from './VisionSection.module.css';
import { MapPin, Star, Heart } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import friendsCafe from '../assets/images/sections/friends_selfie.jpg';

const VisionSection = () => {
  const visionItems = [
    { icon: <MapPin size={19} />, text: 'Descubre joyas ocultas en tu barrio' },
    { icon: <Star size={19} />,   text: 'Conecta con comunidades que comparten tus intereses' },
    { icon: <Heart size={19} />,  text: 'Apoya directamente a micronegocios locales' },
  ];

  return (
    <section className={styles.visionSection} id='vision'>
      <div className={styles.visionContainer}>

        <div className={styles.visionLeft}>
          <div className={styles.dotsWrapper}>
            <span className={`${styles.dot} ${styles.dotOrangeTL}`} />
            <span className={`${styles.dot} ${styles.dotGreenBL}`} />
            <span className={`${styles.dot} ${styles.dotGreenMid}`} />
            <span className={`${styles.dot} ${styles.dotOrangeBR}`} />
          </div>
          <Reveal animation="fadeRight" delay={0} duration={800} className={styles.imageCard}>
            <img src={friendsCafe} alt="Amigos disfrutando en un café" className={styles.imageCardPhoto} />
            <div className={styles.imageCardOverlay}>
              <Heart size={16} />
              <span>La ciudad es tuya</span>
            </div>
          </Reveal>
        </div>

        <Reveal animation="fadeLeft" delay={200} duration={800} className={styles.visionRight}>

          <h2 className={styles.visionTitle}>
            Más que una app,<br />
            <span className={styles.visionTitleGrad}>una comunidad</span>
          </h2>

          <p className={styles.visionBody}>
            Frimeet nace de la idea de que las mejores experiencias se viven en comunidad.
            Conectamos personas con lugares auténticos, formalizamos la economía invisible
            y creamos lazos que trascienden lo digital.
          </p>

          <div className={styles.visionList}>
            {visionItems.map((item, i) => (
              <div key={i} className={styles.visionItem}>
                <span className={styles.visionItemIcon}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default VisionSection;
