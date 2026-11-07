import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { z } from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Contact.module.css';
import { EMAILJS_CONFIG } from '../lib/emailjs';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
    <polygon points="10 15 15 12 10 9 10 15"></polygon>
  </svg>
);


// Info Cards Data
const infoCards = [
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    desc: "Ready to help you anytime",
    href: "tel:+918861288641",
    label: "+91 88612 88641"
  },
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    desc: "Send us a detailed message",
    href: "mailto:info@careerexpertglobalsolution.com",
    label: "info@careerexpertglobalsolution.com"
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Us",
    desc: "Come see us in person",
    href: "https://maps.app.goo.gl/JL8ebW9oDwxzCZ8p6",
    label: "1/3 Masjid St, Neelasandra, Bengaluru 560047"
  }
];

// Office coordinates from Google Maps
const OFFICE_LAT = 12.9545582;
const OFFICE_LNG = 77.6114838;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

// Zod Schema
const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().regex(/^[\d\s+\-()]{7,15}$/, "Please enter a valid phone number (7-15 digits, +, -, spaces, brackets allowed)"),
  referredBy: z.string().trim().min(2, "Please tell us who referred you"),
  message: z.string().trim().max(300, "Message cannot exceed 300 characters"),
  agree: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" })
  }),
  attachment: z.any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF, DOC, DOCX, JPG, and PNG files are allowed"
    )
});

const Contact = () => {
  const [searchParams] = useSearchParams();
  const jobParam = searchParams.get('job');

  useEffect(() => {
    document.title = "Contact Us | CEGS";
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referredBy: jobParam ? 'Careers Portal Application' : '',
    message: jobParam ? `Applying for role: ${jobParam}` : '',
    agree: false
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize Leaflet Map with CartoDB Dark Matter tiles (100% Free, reliable raster tiles)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [OFFICE_LAT, OFFICE_LNG],
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    // CartoDB Dark Matter tiles — high contrast dark mode with crisp street names
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    // Custom pulsing gold radar beacon
    const goldIcon = L.divIcon({
      className: 'cegs-custom-marker-wrapper',
      html: `
        <div style="position:relative;width:56px;height:56px;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);">
          <span style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(212,175,55,0.35);animation:cegsPulse 2.2s infinite ease-out;"></span>
          <span style="position:absolute;width:66%;height:66%;border-radius:50%;background:rgba(212,175,55,0.55);animation:cegsPulse 2.2s infinite ease-out 0.6s;"></span>
          <div style="position:relative;z-index:3;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#fbe795 0%,#d4af37 55%,#8e7019 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(212,175,55,0.9),0 6px 14px rgba(0,0,0,0.8);border:2px solid #ffffff;">
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='#0b0b0d' stroke='#0b0b0d' stroke-width='0.5'>
              <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/>
              <circle cx='12' cy='10' r='3' fill='#d4af37'/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    const marker = L.marker([OFFICE_LAT, OFFICE_LNG], { icon: goldIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family:var(--font-heading,sans-serif);color:#fff;background:rgba(18,18,20,0.95);padding:10px 14px;border-radius:10px;border:1px solid rgba(212,175,55,0.45);text-align:center;box-shadow:0 8px 24px rgba(0,0,0,0.7);min-width:180px;">
        <div style="color:#d4af37;font-weight:700;font-size:13px;letter-spacing:0.5px;margin-bottom:3px;">Career Expert Global Solution</div>
        <div style="color:rgba(255,255,255,0.75);font-size:11px;line-height:1.4;">1/3 Masjid St, Neelasandra<br/>Bengaluru 560047</div>
      </div>
    `, {
      className: 'cegs-leaflet-popup',
      closeButton: false,
      offset: [0, -22]
    }).openPopup();

    // Attribution
    L.control.attribution({ position: 'bottomright', prefix: '© OpenStreetMap · CARTO' }).addTo(map);

    mapInstanceRef.current = map;

    // Critical: Force Leaflet to recalculate container size so tiles immediately download & render
    const t1 = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const t2 = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    const onResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', onResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Validate form using Zod
  const validateForm = () => {
    const result = contactSchema.safeParse({
      ...formData,
      attachment: file
    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  // Check if button should be disabled (basic check)
  const isFormFilled = formData.fullName && formData.email && formData.phone && formData.referredBy && formData.agree;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    // Enforce 300 char limit on message
    if (name === 'message' && typeof val === 'string' && val.length > 300) return;

    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (errors.attachment) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.attachment;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setServerError('');
    
    if (!validateForm()) {
      // Small timeout to allow render, then focus first error
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstErrorEl?.focus();
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE,
        {
          from_name:    formData.fullName,
          from_email:   formData.email,
          phone:        formData.phone,
          referred_by:  formData.referredBy,
          message:      formData.message,
          to_email:     'info@careerexpertglobalsolution.com',
          form_type:    'Contact Form',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        referredBy: '',
        message: '',
        agree: false
      });
      setFile(null);
      if (formRef.current) formRef.current.reset();

    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitStatus('error');
      setServerError('Failed to send your message. Please try again or email us directly at info@careerexpertglobalsolution.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.kickerBadge}>
            <span className={styles.kickerDot}></span> CONTACT
          </div>
          <h1 className={styles.heroTitle}>Get In <span className={styles.highlight}>Touch</span></h1>
          <p className={styles.heroSubtitle}>
            We're here to help — whether you have a question or concern, use the form below and we'll be in touch promptly.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            
            {/* Left Column: Info Cards */}
            <div className={styles.infoColumn}>
              {infoCards.map((card, idx) => (
                <a key={idx} href={card.href} className={styles.infoCard} target={card.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                  <div className={styles.infoIconWrapper} aria-hidden="true">
                    {card.icon}
                  </div>
                  <div className={styles.infoContent}>
                    <h3 className={styles.infoTitle}>{card.title}</h3>
                    <p className={styles.infoDesc}>{card.desc}</p>
                    <p className={styles.infoDesc} style={{ marginTop: '4px', color: 'rgba(255,255,255,0.9)' }}>
                      {card.label}
                    </p>
                  </div>
                </a>
              ))}

              <div className={styles.infoCard} style={{ cursor: 'default', pointerEvents: 'none' }}>
                <div className={styles.infoIconWrapper} aria-hidden="true">
                  <Clock size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3 className={`${styles.infoTitle} ${styles.highlightTitle}`}>Quick Response</h3>
                  <p className={styles.infoDesc}>
                    We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>

              {/* Social Media Connect Card */}
              <div className={styles.socialCard}>
                <h3 className={styles.socialTitle}>Connect Online</h3>
                <p className={styles.socialDesc}>
                  Follow us on our official channels for the latest recruitment updates, job openings, and announcements.
                </p>
                <div className={styles.socialList}>
                  <a 
                    href="https://www.linkedin.com/company/103281318/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialLinkItem}
                  >
                    <span className={styles.socialItemIcon}><LinkedinIcon /></span>
                    <span>LinkedIn &bull; Career Expert Global Solution</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/career_expert.global_solutions?psln=azR6bmFwNzI0dGNr&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialLinkItem}
                  >
                    <span className={styles.socialItemIcon}><InstagramIcon /></span>
                    <span>Instagram &bull; @career_expert.global_solutions</span>
                  </a>
                  <a 
                    href="https://www.youtube.com/@CareerExpertGlobalSolution" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialLinkItem}
                  >
                    <span className={styles.socialItemIcon}><YoutubeIcon /></span>
                    <span>YouTube &bull; @CareerExpertGlobalSolution</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={styles.formCard}>
              
              {submitStatus === 'success' && (
                <div className={`${styles.alert} ${styles.alertSuccess}`} role="alert" aria-live="polite">
                  Thank you! We've received your message and will get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="polite">
                  {serverError || "Failed to submit the form. Please check your inputs and try again."}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  
                  {/* Full Name */}
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      placeholder="Enter your full name..."
                      className={styles.input}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && <span id="fullName-error" className={styles.errorText}>{errors.fullName}</span>}
                  </div>

                  {/* Email */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      placeholder="Enter your email..."
                      className={styles.input}
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <span id="email-error" className={styles.errorText}>{errors.email}</span>}
                  </div>

                  {/* Phone Number */}
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number <span className={styles.required}>*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      placeholder="+91 88612 88641"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && <span id="phone-error" className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  {/* Referred By */}
                  <div className={styles.formGroup}>
                    <label htmlFor="referredBy" className={styles.label}>
                      Referred By <span className={styles.required}>*</span>
                    </label>
                    <input 
                      type="text" 
                      id="referredBy" 
                      name="referredBy"
                      placeholder="Who referred you..."
                      className={styles.input}
                      value={formData.referredBy}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.referredBy}
                      aria-describedby={errors.referredBy ? "referredBy-error" : undefined}
                    />
                    {errors.referredBy && <span id="referredBy-error" className={styles.errorText}>{errors.referredBy}</span>}
                  </div>

                  {/* Message */}
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="message" className={styles.label}>
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      placeholder="Enter your message here..."
                      className={styles.textarea}
                      value={formData.message}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        {errors.message && <span id="message-error" className={styles.errorText}>{errors.message}</span>}
                      </div>
                      <span className={styles.charCount}>{formData.message.length}/300</span>
                    </div>
                  </div>

                </div>

                {/* Attachment */}
                <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
                  <label className={styles.label}>Attachment</label>
                  <div className={styles.fileUploadWrapper}>
                    <label htmlFor="attachment" className={styles.fileLabel}>
                      Choose File
                    </label>
                    <input 
                      type="file" 
                      id="attachment" 
                      name="attachment"
                      className={styles.fileInput}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      aria-invalid={!!errors.attachment}
                      aria-describedby={errors.attachment ? "attachment-error" : undefined}
                    />
                    <span className={styles.fileName}>
                      {file ? file.name : "No file chosen"}
                    </span>
                  </div>
                  {errors.attachment && <span id="attachment-error" className={styles.errorText} style={{ marginTop: '-20px', marginBottom: '20px', display: 'block' }}>{errors.attachment}</span>}
                </div>

                {/* Checkbox */}
                <div className={styles.checkboxWrapper}>
                  <input 
                    type="checkbox" 
                    id="agree" 
                    name="agree"
                    className={styles.checkbox}
                    checked={formData.agree}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.agree}
                    aria-describedby={errors.agree ? "agree-error" : undefined}
                  />
                  <div className={styles.formGroup}>
                    <label htmlFor="agree" className={styles.checkboxLabel}>
                      I hereby agree to our <Link to="/privacy-policy" className={styles.privacyLink}>Privacy Policy terms</Link>. 
                      <span style={{ display: 'block', fontSize: '12px', marginTop: '4px', opacity: 0.6 }}>
                        (Data is only used to respond to your inquiry)
                      </span>
                    </label>
                    {errors.agree && <span id="agree-error" className={styles.errorText}>{errors.agree}</span>}
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={!isFormFilled || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Form"}
                  {!isSubmitting && <Send size={18} />}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapHeader}>
            <div className={styles.kickerBadge}>
              <span className={styles.kickerDot}></span> OUR OFFICE
            </div>
            <h2 className={styles.mapTitle}>
              Find Us <span className={styles.highlight}>Here</span>
            </h2>
            <p className={styles.mapSubtitle}>
              Visit our office in the heart of Bengaluru &mdash; we&apos;d love to meet you in person.
            </p>
          </div>
          <div className={styles.mapCard}>
            <div className={styles.mapContainer} id="cegs-map" ref={mapContainerRef}></div>
            <div className={styles.mapOverlay}>
              <div className={styles.mapOverlayInner}>
                <MapPin size={20} className={styles.mapOverlayIcon} />
                <div>
                  <h4 className={styles.mapOverlayTitle}>Career Expert Global Solution</h4>
                  <p className={styles.mapOverlayAddr}>1/3 Masjid St, Neelasandra, Bengaluru 560047</p>
                </div>
                <a 
                  href="https://maps.app.goo.gl/JL8ebW9oDwxzCZ8p6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.mapDirectionsBtn}
                >
                  <Navigation size={16} />
                  Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
