import { Link } from 'react-router-dom';
import { TextRepel } from './TextRepel';
import FooterCTA from './FooterCTA';
import styles from './Footer.module.css';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
    <polygon points="10 15 15 12 10 9 10 15"></polygon>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footerWrapper}>
      
      {/* Animated Call To Action / Email Section */}
      <FooterCTA />

      {/* Huge Animated Background Text */}
      <div className={styles.bigTextContainer}>
        <TextRepel
          text="CEGS"
          className={styles.bigText}
          letterClassName={styles.bigTextLetter}
          radius={300}
          strength={70}
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>

          {/* Main Footer Content */}
          <div className={styles.mainGrid}>

            {/* Brand Info */}
            <div className={styles.brandColumn}>
              <div className={styles.logo}>
                <img src="/cegs-logo.jpg" alt="CEGS - Career Expert Global Solution" className={styles.logoImg} />
              </div>
              <p className={styles.brandDesc}>
                Delivering top-tier recruitment and workforce solutions across multiple industries. We connect great companies with exceptional talent.
              </p>
              <div className={styles.socialLinks}>
                <a 
                  href="https://www.linkedin.com/company/103281318/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="LinkedIn"
                  title="Follow us on LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a 
                  href="https://www.instagram.com/career_expert.global_solutions?psln=azR6bmFwNzI0dGNr&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <InstagramIcon />
                </a>
                <a 
                  href="https://www.youtube.com/@CareerExpertGlobalSolution" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="YouTube"
                  title="Subscribe on YouTube"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={styles.linkColumnTitle}>Company</h3>
              <ul className={styles.linksList}>
                <li className={styles.linkItem}><Link to="/about" onClick={scrollToTop}>About Us</Link></li>
                <li className={styles.linkItem}><Link to="/services" onClick={scrollToTop}>Our Services</Link></li>
                <li className={styles.linkItem}><Link to="/request-candidates" onClick={scrollToTop}>Hire & Get Placed</Link></li>
                <li className={styles.linkItem}><Link to="/careers" onClick={scrollToTop}>Careers & Jobs</Link></li>
                <li className={styles.linkItem}><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
              </ul>
            </div>

            {/* Resources / Services */}
            <div>
              <h3 className={styles.linkColumnTitle}>Services</h3>
              <ul className={styles.linksList}>
                <li className={styles.linkItem}><Link to="/services/bpo-kpo-services" onClick={scrollToTop}>BPO / KPO Staffing</Link></li>
                <li className={styles.linkItem}><Link to="/services/staffing-solutions" onClick={scrollToTop}>Staffing Solutions</Link></li>
                <li className={styles.linkItem}><Link to="/services/web-development" onClick={scrollToTop}>Web Development</Link></li>
                <li className={styles.linkItem}><Link to="/services/payroll-management" onClick={scrollToTop}>Payroll Management</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.copyright}>
              &copy; {currentYear} Career Expert Global Solution. All rights reserved.
            </div>
            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
