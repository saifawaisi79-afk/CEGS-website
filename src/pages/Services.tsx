import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Users, Monitor, BookOpen, Calculator, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Services.module.css';
import { Link } from 'react-router-dom';

const FloatingIcon = ({ children, xOffset, yOffset, delay, duration }: any) => {
  return (
    <motion.div
      className={styles.floatingIcon}
      initial={{ x: xOffset, y: yOffset, opacity: 0 }}
      animate={{ 
        y: [yOffset - 15, yOffset + 15, yOffset - 15],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  useEffect(() => {
    document.title = "Our Services | CEGS - HR, Staffing & IT Solutions";
  }, []);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const servicesData = [
    {
      icon: <Users size={32} />,
      title: "Staffing Solutions",
      desc: "Tailored IT & Non-IT staffing services, providing temporary, contract, and permanent placements to meet your workforce needs.",
      features: ["IT & Non-IT Talent", "Contract & Permanent Roles", "Quick Turnaround Time"]
    },
    {
      icon: <Briefcase size={32} />,
      title: "HR Consulting",
      desc: "Strategic human resource consulting to align your talent acquisition strategy with business goals and optimize organizational structure.",
      features: ["Process Optimization", "Performance Management", "Organizational Design"]
    },
    {
      icon: <Calculator size={32} />,
      title: "Payroll Management",
      desc: "Comprehensive and streamlined payroll solutions ensuring compliance, accuracy, and timely disbursements for your entire workforce.",
      features: ["Automated Processing", "Statutory Compliance", "Tax Management"]
    },
    {
      icon: <BookOpen size={32} />,
      title: "Training & Development",
      desc: "Customized corporate training programs to upskill your employees, enhancing productivity, and keeping them competitive in the market.",
      features: ["Skill Enhancement", "Leadership Training", "Onboarding Programs"]
    },
    {
      icon: <Monitor size={32} />,
      title: "Advanced Digital Solutions",
      desc: "Leveraging cutting-edge technologies and HRMS platforms to digitize your recruitment and employee management workflows.",
      features: ["HRMS Integration", "Digital Onboarding", "Analytics & Reporting"]
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Compliance & Risk",
      desc: "Ensuring your business adheres to local and global labor laws, mitigating risks associated with talent management and hiring.",
      features: ["Audit Readiness", "Policy Development", "Risk Mitigation"]
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
        <motion.div className={styles.heroBackground} style={{ y: parallaxY1 }}>
          <FloatingIcon xOffset="-35vw" yOffset="-10vh" delay={0} duration={4.5}><Briefcase size={40} /></FloatingIcon>
          <FloatingIcon xOffset="35vw" yOffset="-5vh" delay={1} duration={5.5}><Users size={40} /></FloatingIcon>
          <FloatingIcon xOffset="-30vw" yOffset="25vh" delay={2} duration={5}><Monitor size={40} /></FloatingIcon>
          <FloatingIcon xOffset="30vw" yOffset="20vh" delay={0.5} duration={4}><Calculator size={40} /></FloatingIcon>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.kickerBadge}>
              <span className={styles.kickerDot}></span> WHAT WE DO
            </div>
            <h1 className={styles.heroTitle}>Our <span className={styles.highlight}>Services</span></h1>
            <p className={styles.heroSubtitle}>
              Empowering businesses with top-tier talent, streamlined processes, and advanced HR solutions to scale efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.serviceIconWrapper}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <ul className={styles.featuresList}>
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className={styles.featureItem}>
                      <CheckCircle2 size={16} className={styles.featureIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Ready to Scale Your Workforce?</h2>
            <p className={styles.ctaDesc}>
              Partner with CEGS to experience seamless staffing, enhanced HR operations, and digital transformation for your business.
            </p>
            <Link to="/contact" className={styles.ctaButton}>
              Let's Connect <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
