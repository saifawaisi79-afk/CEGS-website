import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { clientRow1, clientRow2, type ClientLogo } from '../data/clients';
import styles from './PrestigiousClients.module.css';

const LogoItem = ({ client }: { client: ClientLogo }) => {
  const isPlaceholder = !client.verified;
  
  return (
    <div 
      className={styles.logoCard}
      title={client.name}
    >
      <img
        src={client.logo}
        alt={`${client.name} logo`}
        className={styles.logoImg}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

const PrestigiousClients = () => {
  // Seamless loop requires duplicating the track elements
  const row1Duplicated = [...clientRow1, ...clientRow1];
  const row2Duplicated = [...clientRow2, ...clientRow2];

  return (
    <section className={styles.section} id="clients">
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>
            <Award className={styles.badgeIcon} size={15} />
            <span>TRUSTED RECRUITMENT PARTNER</span>
          </div>
          
          <h2 className={styles.heading}>
            Our Prestigious <span className={styles.highlight}>Clients</span>
          </h2>
          
          <p className={styles.subheading}>
            Empowering hiring excellence for India's leading multinational corporations, 
            pioneering BPO giants, and innovative growth companies.
          </p>
        </motion.div>
      </div>

      <div className={styles.carouselWrapper}>
        {/* Row 1 - Scrolling Right to Left */}
        <div className={`${styles.trackRow} ${styles.trackRow1}`}>
          <div className={styles.track}>
            {row1Duplicated.map((client, idx) => (
              <LogoItem key={`row1-${client.id}-${idx}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Right to Left */}
        <div className={`${styles.trackRow} ${styles.trackRow2}`}>
          <div className={styles.track}>
            {row2Duplicated.map((client, idx) => (
              <LogoItem key={`row2-${client.id}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrestigiousClients;
