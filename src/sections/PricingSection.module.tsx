import styles from "./PricingSection.module.css";
import { Check, ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import video from "../assets/videos/entrance_bottom.webm"

const GOOGLE_PLAY_URL = "https://play.google.com/store";
const LEARN_MORE_URL = "https://frimeet.app";

/* ---- Plans ---- */
const plans = [
  {
    name: "Explorador",
    price: "$0",
    period: "",
    description: "Ideal para empezar a explorar tu ciudad y armar planes base con tu grupo. ",
    features: [
      "5 consultas IA al mes",
      "Rutas básicas (hasta 3 paradas)",
      "Radar de Aforo",
      "Bóveda ilimitada",
      "Banners y recomendaciones patrocinadas",
    ],
    cta: "Comenzar gratis",
    variant: "white" as const,
  },
  {
    name: "Tribu",
    price: "$39",
    period: "/mes",
    description: "La experiencia definitiva sin límites. El control total de tus salidas y personalización.",
    features: [
      "IA y rutas sin límites",
      "Modo Algoritmo Puro (sin anuncios)",
      "Alertas Sniper de Aforo",
      "Ícono personalizado y Insignia VIP",
    ],
    cta: "Obtener Tribu",
    variant: "featured" as const,
    badge: "Popular",
  },
  {
    name: "Frimeet Local",
    price: "$89",
    period: "/mes",
    description: "Para negocios que quieren crecer con la comunidad.",
    features: [
      "Slot +1 Patrocinado",
      "Banner en el Home",
      "Promos Flash a Seguidores",
      "Panel de Analíticas",
    ],
    cta: "Contactar ventas",
    variant: "white" as const,
  },
];

const PricingSection = () => {

  return (
    <>
      {/* ---- Pricing Plans ---- */}
      <section className={styles.pricingSection} id="pricing">
        <div className={styles.pricingContainer}>
          {/* Header */}
          <Reveal
            animation="fadeUp"
            delay={0}
            duration={800}
            className={styles.pricingHeader}
          >
            <h2 className={styles.pricingTitle}>
              Encuentra tu
              <br />
              <span className={styles.pricingTitleGrad}>rol en Frimeet</span>
            </h2>
            <p className={styles.pricingSub}>
              Frimeet no sirve solamente para encontrar nuevos lugares, también
              puedes registrarte como negocio
            </p>
          </Reveal>

          {/* Pricing Cards */}
          <div className={styles.pricingGrid}>
            {plans.map((plan, index) => (
              <Reveal
                key={index}
                animation="fadeUp"
                delay={200 + index * 150}
                duration={800}
                className={`${styles.planCard} ${
                  plan.variant === "featured"
                    ? styles.planCardFeatured
                    : styles.planCardWhite
                }`}
              >
                <div className={styles.planHeader}>
                  {/* Badge */}
                  {plan.badge && (
                    <span className={styles.planBadge}>{plan.badge}</span>
                  )}

                  {/* Plan Name */}
                  <p
                    className={`${styles.planName} ${
                      plan.variant === "featured" ? styles.planNameFeatured : ""
                    }`}
                  >
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className={styles.planPriceRow}>
                    <span
                      className={`${styles.planPrice} ${
                        plan.variant === "featured"
                          ? styles.planPriceFeatured
                          : ""
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`${styles.planPeriod} ${
                          plan.variant === "featured"
                            ? styles.planPeriodFeatured
                            : ""
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className={`${styles.planDesc} ${
                      plan.variant === "featured" ? styles.planDescFeatured : ""
                    }`}
                  >
                    {plan.description}
                  </p>
                  {/* CTA Button */}
                  <button
                    className={
                      plan.variant === "featured"
                        ? styles.btnFeatured
                        : styles.btnOutline
                    }
                    type="button"
                  >
                    {plan.cta}
                  </button>
                </div>

                {/* Features List */}
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className={`${styles.planFeatureItem} ${
                        plan.variant === "featured"
                          ? styles.planFeatureItemFeatured
                          : ""
                      }`}
                    >
                      <Check
                        size={16}
                        strokeWidth={3}
                        className={
                          plan.variant === "featured"
                            ? styles.checkFeatured
                            : styles.checkWhite
                        }
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <Reveal
            animation="fadeUp"
            className={styles.ctaInnerContainer}
            delay={0}
            duration={800}
          >
            <h2 className={styles.ctaTitle}>
              ¿Listo para redescubrir
              <br />
              tu ciudad?
            </h2>
            <p className={styles.ctaSub}>
              Descarga Frimeet y comienza a crear planes perfectos con tu
              comunidad. Tu próxima aventura está a un tap de distancia.
            </p>
          </Reveal>

          <Reveal
            animation="fadeUp"
            delay={200}
            duration={800}
            className={styles.ctaButtons}
          >
            <a
              className={styles.googlePlayButton}
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Descargar Frimeet gratis en Google Play"
            >
              <svg
                className={styles.googlePlayIcon}
                viewBox="0 0 32 36"
                aria-hidden="true"
              >
                <path fill="#00F076" d="M2.2 1.1C1.5.7.8.7.4 1.2c-.3.3-.4.8-.4 1.4v30.8c0 .6.1 1.1.4 1.4.4.5 1.1.5 1.8.1l16-16.9L2.2 1.1Z" />
                <path fill="#00D4FF" d="m2.2 1.1 20.2 11.4-4.2 4.5L2.2 1.1Z" />
                <path fill="#FFD400" d="m18.2 18 4.2 4.5L2.2 34.9 18.2 18Z" />
                <path fill="#FF3D3D" d="m22.4 12.5 7.3 4.1c1.4.8 1.4 2 0 2.8l-7.3 4.1-4.2-4.5 4.2-4.5Z" />
              </svg>
              <span className={styles.googlePlayText}>
                <span className={styles.googlePlaySmall}>Descarga gratis en</span>
                <span className={styles.googlePlayLarge}>Google Play</span>
              </span>
            </a>
            <a
              className={styles.btnSecondary}
              href={LEARN_MORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Saber más <ArrowUpRight size={17} />
            </a>
          </Reveal>

          {/* Map video – autoplays and freezes on last frame */}
          <video
            className={styles.ctaVideo}
            src={video}
            autoPlay
            muted
            playsInline
          />
        </div>
      </section>
    </>
  );
};

export default PricingSection;
