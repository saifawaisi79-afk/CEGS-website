import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import RequestCandidatesModal from './RequestCandidatesModal';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsMobileMenuOpen(false);
      setIsMobileServicesOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('insights');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#insights');
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link to="/" className={styles.logo} aria-label="CEGS Home">
              <img src="/cegs-logo.jpg" alt="CEGS - Career Expert Global Solution" className={styles.logoImg} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className={styles.nav} aria-label="Main Navigation">
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
            <a href="#insights" onClick={handleInsightsClick} className={styles.navLink}>Blog & Insights</a>
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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ''}`} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className={styles.mobileDrawerHeader}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileLogo}>
            <img src="/cegs-logo.jpg" alt="CEGS Logo" className={styles.logoImg} />
            <span className={styles.mobileBrandName}>CEGS</span>
          </Link>
          <button
            type="button"
            className={styles.mobileCloseBtn}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.mobileNavLinks}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${location.pathname === '/' ? styles.mobileActive : ''}`}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${location.pathname === '/about' ? styles.mobileActive : ''}`}>
            About Us
          </Link>
          
          {/* Services Collapsible Accordion */}
          <div className={styles.mobileServicesGroup}>
            <div className={styles.mobileServicesHeader}>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${location.pathname === '/services' ? styles.mobileActive : ''}`} style={{ flex: 1 }}>
                Our Services
              </Link>
              <button 
                type="button" 
                className={styles.mobileAccordionToggle}
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                aria-label="Toggle services list"
              >
                <ChevronDown size={18} className={`${styles.mobileChevron} ${isMobileServicesOpen ? styles.mobileChevronRotated : ''}`} />
              </button>
            </div>

            {isMobileServicesOpen && (
              <div className={styles.mobileSubmenu}>
                <Link to="/services/hr-consulting" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> HR Consulting
                </Link>
                <Link to="/services/payroll-management" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> Payroll Management
                </Link>
                <Link to="/services/staffing-solutions" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> Staffing Solutions
                </Link>
                <Link to="/services/web-development" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> Web Development
                </Link>
                <Link to="/services/bpo-kpo-services" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> BPO / KPO Staffing
                </Link>
                <Link to="/services/training-courses" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSubItem}>
                  <span className={styles.dot}></span> Training Courses
                </Link>
              </div>
            )}
          </div>

          <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${location.pathname === '/careers' ? styles.mobileActive : ''}`}>
            Careers & Jobs
          </Link>
          <a href="#insights" onClick={handleInsightsClick} className={styles.mobileNavLink}>
            Blog & Insights
          </a>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${location.pathname === '/contact' ? styles.mobileActive : ''}`}>
            Contact Us
          </Link>
        </nav>

        <div className={styles.mobileDrawerFooter}>
          <button 
            type="button" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }} 
            className={styles.mobileCtaBtn}
          >
            Hire & Get Placed
          </button>

          <div className={styles.mobileContactDetails}>
            <a href="tel:+918861288641" className={styles.mobileContactItem}>
              <Phone size={14} className={styles.goldIcon} /> +91 88612 88641
            </a>
            <a href="mailto:info@careerexpertglobalsolution.com" className={styles.mobileContactItem}>
              <Mail size={14} className={styles.goldIcon} /> info@careerexpertglobalsolution.com
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Request Candidates & Client/Vendor Intake Modal */}
      <RequestCandidatesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
