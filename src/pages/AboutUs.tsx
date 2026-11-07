import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Target, Shield, Users, Briefcase, Globe, Heart, Zap, Clock } from 'lucide-react';
import { MagneticHeading, WaveLetterText } from '../components/InteractiveMotionText';
import styles from './AboutUs.module.css';

// Animated Typography component for staggered letter reveal
const AnimatedText = ({ text, className }: { text: string, className: string }) => {
  const words = text.split(" ");
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: [0.2, 0.65, 0.3, 0.9] } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

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

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
          <FloatingIcon xOffset="-40vw" yOffset="-10vh" delay={0} duration={4}><Users size={32} /></FloatingIcon>
          <FloatingIcon xOffset="40vw" yOffset="-5vh" delay={1} duration={5}><Briefcase size={32} /></FloatingIcon>
          <FloatingIcon xOffset="-35vw" yOffset="15vh" delay={2} duration={6}><Globe size={32} /></FloatingIcon>
          <FloatingIcon xOffset="35vw" yOffset="20vh" delay={1.5} duration={4.5}><Shield size={32} /></FloatingIcon>
          <FloatingIcon xOffset="-20vw" yOffset="30vh" delay={0.5} duration={5}><Zap size={32} /></FloatingIcon>
          <FloatingIcon xOffset="25vw" yOffset="35vh" delay={2.5} duration={5.5}><Heart size={32} /></FloatingIcon>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.kickerBadge}>
              <span className={styles.kickerDot}></span> ABOUT CEGS
            </div>
            <MagneticHeading as="h1" className={styles.heroTitle} strength={20} tiltStrength={6}>
              <WaveLetterText text="Get to Know Us" highlightWords={["Know", "Us"]} />
            </MagneticHeading>
            <p className={styles.heroSubtitle}>
              We are a passionate team dedicated to providing exceptional HR consulting, payroll management, IT staffing, and more.
            </p>
          </motion.div>

          <motion.div 
            className={styles.heroStats}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>12+</h3>
              <p className={styles.statLabel}>YEARS EXPERIENCE</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>200+</h3>
              <p className={styles.statLabel}>CLIENTS SERVED</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>2.5L+</h3>
              <p className={styles.statLabel}>PLACEMENTS</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Our Company */}
      <section className={styles.aboutCompanySection}>
        <motion.div 
          className={styles.container}
          style={{ y: parallaxY2 }}
        >
          <motion.div 
            className={styles.aboutHeader}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className={styles.bracketKicker}>[ OUR STORY ]</span>
            <MagneticHeading as="h2" className={styles.sectionTitle} strength={15}>
              <WaveLetterText text="About Our Company" highlightWords={["Company"]} />
            </MagneticHeading>
          </motion.div>
          
          <motion.div 
            className={styles.aboutContentBox}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ boxShadow: "0 0 30px var(--gold-tint)", borderColor: "var(--gold-border)" }}
          >
            <p className={styles.textBody}>
              Career Experts Global Solutions is renowned for our consultative recruitment approach that has garnered accolades and expanded our client base.
            </p>
            <p className={styles.textBody}>
              We specialize in optimizing recruitment processes for our clients, delivering measurable improvements in Quality-of-Hire, Time-to-Fill, and Cost-per-Hire.
            </p>
            <p className={styles.textBody}>
              Our tailored hiring solutions empower clients to achieve greater efficiency and business performance. Through collaborative partnerships and flawless execution, we align our efforts with their strategic talent acquisition goals.
            </p>
            <p className={styles.textBody}>
              Driven by passion, integrity, and a strong work ethic, we are a preferred hiring partner. Our commitment to delivering exceptional value to both clients and candidates sets us apart.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Directors */}
      <section className={styles.directorsSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionKicker}>LEADERSHIP</span>
            <MagneticHeading as="h2" className={styles.sectionTitle} strength={15}>
              <WaveLetterText text="Our Directors" highlightWords={["Directors"]} />
            </MagneticHeading>
          </motion.div>

          {/* Mohammed Usman Zabi */}
          <motion.div 
            className={styles.directorCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={styles.directorImageWrapper}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/WhatsApp Image 2026-09-15 at 12.58.43 PM.jpeg" alt="Mohammed Usman Zabi" className={styles.directorImage} />
            </motion.div>
            <div className={styles.directorInfo}>
              <h3 className={styles.directorName}>Mohammed Usman Zabi</h3>
              <p className={styles.directorRole}>Founder & Director</p>
              <div className={styles.directorQuote}>"Connecting talent with opportunity, building futures together."</div>
              <p className={styles.textBodySmall}>
                With over 12 years of experience in global recruitment and talent acquisition, Usman has consistently pioneered innovative approaches to connecting top-tier talent with the right opportunities across diverse industries.
              </p>
              <p className={styles.textBodySmall}>
                In addition to his expertise in recruitment, Usman is a seasoned business consultant and corporate strategist, helping startups and established enterprises align their talent strategy with business growth objectives.
              </p>
              <p className={styles.textBodySmall}>
                Currently, Usman is managing operations across 8 different companies, offering guidance in strategic hiring, operational optimization, and business expansion.
              </p>
              <div className={styles.tagsContainer}>
                <span className={styles.tag}>Leadership</span>
                <span className={styles.tag}>Vision</span>
                <span className={styles.tag}>Innovation</span>
              </div>
            </div>
          </motion.div>

          {/* Sheeba Begum */}
          <motion.div 
            className={`${styles.directorCard} ${styles.reverseCard}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.directorInfo}>
              <h3 className={styles.directorName}>Sheeba Begum</h3>
              <p className={styles.directorRole}>Chief Executive Officer, Operations</p>
              <div className={styles.directorQuote}>"Translating vision into action, bridging strategy with execution."</div>
              <p className={styles.textBodySmall}>
                As the CEO of Operations, Sheeba brings exceptional leadership and operational expertise to the forefront of our organization. With a strong background in process optimization, team leadership, and strategic planning.
              </p>
              <p className={styles.textBodySmall}>
                Sheeba is known for her ability to translate vision into action, overseeing day-to-day operations with a sharp focus on efficiency, quality, and scalability.
              </p>
              <div className={styles.tagsContainer}>
                <span className={styles.tag}>Operations</span>
                <span className={styles.tag}>Strategy</span>
                <span className={styles.tag}>Excellence</span>
              </div>
            </div>
            <motion.div 
              className={styles.directorImageWrapper}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/sheeba_begum.png" alt="Sheeba Begum" className={styles.directorImage} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className={styles.differentSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionKicker}>OUR APPROACH</span>
            <MagneticHeading as="h2" className={styles.sectionTitle} strength={15}>
              <WaveLetterText text="What Makes Us Different" highlightWords={["Different"]} />
            </MagneticHeading>
          </motion.div>

          <div className={styles.differentGrid}>
            {[
              { icon: <Clock size={24} />, title: "Prompt Assistance", desc: "We ensure your success and satisfaction at every stage by offering dependable and prompt assistance." },
              { icon: <Star size={24} />, title: "Premium Development", desc: "Providing solutions that are of the highest caliber and use cutting-edge technologies." },
              { icon: <Target size={24} />, title: "Competitive Price", desc: "We provide premium services at prices that maximize your return on investment." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className={styles.diffCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", borderColor: "var(--gold-border)" }}
              >
                <div className={styles.diffIconWrapper}>{item.icon}</div>
                <h4 className={styles.diffTitle}>
                  <WaveLetterText text={item.title} />
                </h4>
                <p className={styles.diffDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className={styles.leadershipTeamSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionKicker}>OUR TEAM</span>
            <MagneticHeading as="h2" className={styles.sectionTitle} strength={15}>
              <WaveLetterText text="Leadership Team" highlightWords={["Team"]} />
            </MagneticHeading>
          </motion.div>

          <div className={styles.teamList}>
            {[
              { img: "raiyan_ahmed.png", name: "Mohammed Raiyan Ahmed", role: "Delivery & Business Strategy Expert Director", desc: "Spearheading strategic business development initiatives while efficiently managing end-to-end billing processes and overseeing key financial operations to support organizational growth.", tags: ["Business Dev", "Finance"] },
              { img: "nusrath_hussain.png", name: "Nusrath Hussain", role: "Talent Acquisition Director", desc: "HR Manager overseeing end-to-end recruitment operations, aligning talent acquisition strategies with business objectives. Responsible for optimizing hiring processes, ensuring efficiency, quality, and client satisfaction.", tags: ["Recruitment", "Talent"] },
              { img: "heena_begum.png", name: "Heena Begum", role: "Finance & Payroll Director", desc: "HR Generalist with a dual focus on people operations and billing oversight, playing a key role in both workforce management and financial coordination. Ensuring smooth HR functions and accurate billing processes.", tags: ["HR Ops", "Payroll"] }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                className={styles.teamMemberRow}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.01, backgroundColor: "var(--surface)" }}
              >
                <motion.div 
                  className={styles.teamAvatar}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <img src={`/images/${member.img}`} alt={member.name} />
                </motion.div>
                <div className={styles.teamDetails}>
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamDesc}>{member.desc}</p>
                  <div className={styles.tagsContainer}>
                    {member.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.coreValuesSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionKicker}>OUR BELIEFS</span>
            <MagneticHeading as="h2" className={styles.sectionTitle} strength={15}>
              <WaveLetterText text="Core Values" highlightWords={["Values"]} />
            </MagneticHeading>
          </motion.div>

          <div className={styles.valuesGrid}>
            {[
              { icon: <Star size={20} />, title: "Excellence", desc: "We strive for excellence in everything we do, delivering exceptional results." },
              { icon: <Shield size={20} />, title: "Integrity", desc: "Honesty and transparency are the foundation of our business relationships." },
              { icon: <Zap size={20} />, title: "Innovation", desc: "We continuously seek new ways to improve and adapt to industry changes." },
              { icon: <Users size={20} />, title: "Commitment", desc: "We are dedicated to the success of our clients, candidates, and team." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                className={styles.valueCard}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 10px 30px var(--gold-glow)", borderColor: "var(--gold-border)" }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>
                  <WaveLetterText text={value.title} />
                </h4>
                <p className={styles.valueDesc}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default AboutUs;
