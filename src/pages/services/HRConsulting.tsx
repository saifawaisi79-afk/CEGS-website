import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, BookOpen, HeartHandshake, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import styles from './HRConsulting.module.css';

const HRConsulting = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const servicesList = [
    {
      icon: <Users size={28} />,
      title: "Talent Management",
      desc: "Strategic workforce planning and talent acquisition solutions tailored to your growth trajectory."
    },
    {
      icon: <BookOpen size={28} />,
      title: "Organizational Development",
      desc: "Structured approaches to improve organizational effectiveness and workplace culture."
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Employee Engagement",
      desc: "Programs to boost workplace satisfaction, retention, and overall employee experience."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Policy & Compliance",
      desc: "Expert guidance on HR regulations, labor laws, and industry best practices."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Performance Management",
      desc: "Systems to track, evaluate, and continually improve employee performance metrics."
    },
    {
      icon: <Award size={28} />,
      title: "Training & Development",
      desc: "Customized learning programs designed for professional growth and skill advancement."
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={styles.kickerBadge}>
                <span className={styles.kickerDot}></span> SERVICE
              </div>
              <h1 className={styles.heroTitle}>HR <span className={styles.highlight}>Consulting</span></h1>
              <p className={styles.heroSubtitle}>
                Transform your human resources strategy with our comprehensive consulting solutions that empower your workforce.
              </p>
              <div className={styles.tagsContainer}>
                <span className={styles.heroTag}>Talent Strategy</span>
                <span className={styles.heroTag}>Workforce Planning</span>
                <span className={styles.heroTag}>Culture Building</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionKicker}>WHAT WE OFFER</span>
            <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Services</span></h2>
          </motion.div>

          <div className={styles.servicesGrid}>
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDesc}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertiseSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Expertise</span></h2>
          </motion.div>

          <motion.div 
            className={styles.expertiseCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.expertiseText}>
              Backed by years of experience in human resources management, organizational
              development, and workplace culture transformation across diverse industries. We partner
              with organizations to build resilient, high-performing teams that drive sustainable
              business growth.
            </p>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default HRConsulting;
