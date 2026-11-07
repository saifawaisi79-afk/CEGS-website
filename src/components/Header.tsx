import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RequestCandidatesModal from './RequestCandidatesModal';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link to="/" className={styles.logo}>
              <img src="/cegs-logo.jpg" alt="CEGS - Career Expert Global Solution" className={styles.logoImg} />
            </Link>
          </div>
          
          <nav className={styles.nav}>
            <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}>Home</Link>
            <Link to="/about" className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}>About Us</Link>
            <div className={styles.dropdownContainer}>
              <Link to="/services" className={`${styles.navLink} ${location.pathname.startsWith('/services') ? styles.active : ''}`}>
                Services
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}><path d="m6 9 6 6 6-6"/></svg>
              </Link>
              <div className={styles.dropdownMenu}>
                <Link to="/services/hr-consulting" className={styles.dropdownItem}><span className={styles.dot}></span> HR Consulting</Link>
                <Link to="/services/payroll-management" className={styles.dropdownItem}><span className={styles.dot}></span> Payroll Management</Link>
                <Link to="/services/staffing-solutions" className={styles.dropdownItem}><span className={styles.dot}></span> Staffing Solutions</Link>
                <Link to="/services/web-development" className={styles.dropdownItem}><span className={styles.dot}></span> Web Development Services</Link>
                <Link to="/services/bpo-kpo-services" className={styles.dropdownItem}><span className={styles.dot}></span> BPO/KPO & Inside Sales Staffing</Link>
                <Link to="/services/training-courses" className={styles.dropdownItem}><span className={styles.dot}></span> Training Courses</Link>
              </div>
            </div>
            <Link to="/careers" className={`${styles.navLink} ${location.pathname === '/careers' ? styles.active : ''}`}>Careers & Jobs</Link>
            <a href="#" className={styles.navLink}>Blog & Insights</a>
            <Link to="/contact" className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
          </nav>
          
          <div className={styles.right}>
            <button 
              type="button" 
              onClick={() => setIsModalOpen(true)} 
              className={styles.ctaButton}
              title="Hire Talent (For Clients) or Get Placed (For Candidates)"
            >
              Hire & Get Placed
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Request Candidates & Client/Vendor Intake Modal */}
      <RequestCandidatesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
