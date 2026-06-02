import styles from './VisionSection.module.css';
import { MapPin, Star, Heart } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import friendsCafe from '../assets/images/sections/friends_selfie.jpg';

const VisionSection = () => {
  const visionItems = [
    { icon: <MapPin size={19} />, text: ' Módulo de Eventos: Control de aforo en tiempo real para evitar lugares saturados' },
    { icon: <Heart size={19} />,   text: 'Clubes Digitales: Espacios para delegar decisiones y planear salidas sin estrés.' },
    { icon: <Star size={19} />,  text: 'Economía Virtual: Gana y gasta Fricoins ayudando a la comunidad de tu ciudad.' },
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
            El Ecosistema<br />
            <span className={styles.visionTitleGrad}>Logístico-Social</span>
          </h2>

          <p className={styles.visionBody}>
            Frimeet no es solo un directorio, es el punto de encuentro entre la logística de grupos y el descubrimiento urbano. 
            Conectamos Tribus con lugares auténticos, eliminamos la fricción de organizar salidas (FOBO) 
            y premiamos económicamente a los "Exploradores" que mantienen vivo y actualizado el mapa de la ciudad.
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
