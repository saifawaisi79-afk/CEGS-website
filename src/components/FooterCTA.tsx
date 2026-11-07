import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import styles from './FooterCTA.module.css';

const FooterCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.layoutContainer}>
        
        <div className={styles.leftCol}>
          <motion.h2 
            className={styles.finalHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Build. Grow. <span className={styles.goldText}>Excel.</span>
          </motion.h2>
          
          <motion.p 
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Your success powered by the right people and scalable talent solutions.
          </motion.p>
        </div>

        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <a 
            href="mailto:info@careerexpertglobalsolution.com" 
            className={styles.emailCard}
            style={{ textDecoration: 'none' }}
            title="Email us at info@careerexpertglobalsolution.com"
          >
            <div className={styles.emailIconWrapper}>
              <Mail className={styles.emailIcon} />
            </div>
            <div className={styles.emailContent}>
              <p className={styles.emailLabel}>Get in touch with us</p>
              <h4 className={styles.emailAddress}>info@careerexpertglobalsolution.com</h4>
            </div>
            <div className={styles.emailBtn}>
              <ArrowRight className={styles.emailBtnIcon} />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FooterCTA;
