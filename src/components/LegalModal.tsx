import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './LegalModal.module.css';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !type) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms of Service'}
            {type === 'cookies' && 'Cookie Policy'}
          </h3>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {type === 'privacy' && (
            <>
              <h4>1. Information We Collect</h4>
              <p>
                Career Expert Global Solution (CEGS) collects personal details (such as your full name, email address, phone number, work experience, resume attachments, and corporate hiring specifications) submitted through our contact and candidate placement intake forms.
              </p>
              <h4>2. How We Use Your Data</h4>
              <p>
                Your information is used strictly to match job candidates with prospective corporate employers, coordinate interview screenings, deliver staffing and payroll management services, and reply to client inquiries.
              </p>
              <h4>3. Data Confidentiality & Sharing</h4>
              <p>
                We respect your privacy. CEGS never sells, rents, or monetizes candidate or client personal information to third-party marketers. Data is shared exclusively with verified hiring partners with whom you are being submitted for consideration.
              </p>
              <h4>4. Data Security</h4>
              <p>
                We employ industry-standard transport encryption (HTTPS/TLS) and strict access controls to safeguard your personal data from unauthorized access or disclosure.
              </p>
              <h4>5. Contact Us Regarding Your Rights</h4>
              <p>
                If you wish to review, update, or request the deletion of your personal data from our talent pool, please reach out directly to us at <strong>info@careerexpertglobalsolution.com</strong>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4>1. Acceptance of Terms</h4>
              <p>
                By accessing and using this website, you agree to comply with and be bound by these Terms of Service provided by Career Expert Global Solution (CEGS).
              </p>
              <h4>2. Staffing & Placement Services</h4>
              <p>
                CEGS acts as a premier workforce solutions provider connecting qualified candidates with reputable companies. While we make every endeavor to facilitate fruitful employment, final hiring and retention decisions rest solely between the client company and the candidate.
              </p>
              <h4>3. User Obligations</h4>
              <p>
                You agree to provide true, accurate, and up-to-date information when completing our contact, hiring, or job application forms. Misrepresentation of educational credentials, identity, or professional experience will result in immediate disqualification.
              </p>
              <h4>4. Intellectual Property</h4>
              <p>
                All website text, visual assets, brand marks, and software layouts are the proprietary intellectual property of Career Expert Global Solution and protected under applicable trademark and copyright laws.
              </p>
              <h4>5. Governing Law</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of the courts located in Bengaluru, Karnataka.
              </p>
            </>
          )}

          {type === 'cookies' && (
            <>
              <h4>1. What Are Cookies</h4>
              <p>
                Cookies are small text files stored on your browser to facilitate seamless site functionality and improve your user experience.
              </p>
              <h4>2. How We Use Cookies</h4>
              <p>
                CEGS uses essential session tokens and performance telemetry solely to ensure fast page loads, retain navigation state across pages, and analyze anonymous site traffic patterns.
              </p>
              <h4>3. No Third-Party Tracking</h4>
              <p>
                We do not employ intrusive cross-site tracking cookies or advertising pixels that monitor your activity outside of our platform.
              </p>
              <h4>4. Managing Cookies</h4>
              <p>
                You can configure your browser preferences to alert you when cookies are placed or decline cookies entirely. Most sections of our site will continue to function normally.
              </p>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" onClick={onClose} className={styles.doneBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
