import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    number: "01",
    title: "Expertise Across Industries",
    description: "We understand the unique demands of BPO roles and deliver candidates with the right skills and adaptability. Our candidates are not only technically proficient but also possess the right attitude and cultural fit for your business."
  },
  {
    number: "02",
    title: "Fast & Scalable Hiring",
    description: "Whether you need one hire or hundreds, we ensure fast turnarounds without compromising quality. Our efficient process helps you scale quickly with pre-screened, high-quality candidates ready to join your team."
  },
  {
    number: "03",
    title: "End-to-End Recruitment Support",
    description: "From sourcing to onboarding, we manage the entire recruitment process. You can focus on growing your business while we handle the details of hiring the best talent for your needs."
  },
  {
    number: "04",
    title: "Quality Talent Network",
    description: "Access our deep talent pool of job-ready professionals across voice, non-voice, tech support, and more. We connect you with the right talent to meet your unique business requirements."
  },
  {
    number: "05",
    title: "Proven Success Record",
    description: "Trusted by top BPOs, we have a proven track record of delivering reliable talent. We consistently reduce hiring challenges and help businesses scale efficiently by providing top-tier candidates."
  }
];

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to a background position for the globe
  // 0% to 200% will make it rotate nicely as we scroll
  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <section ref={containerRef} className={styles.scrollSection}>
      <div className={styles.container}>
        
        {/* Left Column: Heading + Cards */}
        <div className={styles.scrollLeftColumn}>
          <motion.div 
            className={styles.headerInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.badge}>CHOOSE CEGS</div>
            <h2 className={styles.heading}>
              Why Choose <span className={styles.highlight}>CEGS?</span>
            </h2>
            <div className={styles.divider}></div>
          </motion.div>

          <div className={styles.cardsList}>
            {reasons.map((reason) => (
              <motion.div 
                key={reason.number} 
                className={styles.card}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={styles.cardNumber}>{reason.number}</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{reason.title}</h3>
                  <p className={styles.cardDesc}>{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Earth */}
        <div className={styles.stickyRightColumn}>
          <div className={styles.earthWrapper}>
            <motion.div 
              className={styles.earthGlobe}
              style={{ backgroundPositionX }}
            ></motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
