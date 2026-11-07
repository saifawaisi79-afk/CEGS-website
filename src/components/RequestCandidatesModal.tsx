import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../lib/emailjs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Building2, Briefcase, Phone, Mail, User, MapPin, 
  CheckCircle, Upload, ArrowRight, ShieldCheck, GraduationCap, 
  Clock, Sparkles 
} from 'lucide-react';
import styles from './RequestCandidatesModal.module.css';

interface RequestCandidatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestCandidatesModal: React.FC<RequestCandidatesModalProps> = ({ isOpen, onClose }) => {
  // Tab: 'client' or 'candidate'
  const [activeTab, setActiveTab] = useState<'client' | 'candidate'>('client');

  // Client Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [service, setService] = useState('BPO / Customer Support Staffing');
  const [headcount, setHeadcount] = useState('5 - 19');
  const [workMode, setWorkMode] = useState('On-site');
  const [clientNotes, setClientNotes] = useState('');
  const [clientFile, setClientFile] = useState<File | null>(null);

  // Candidate Placement Form State
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candCity, setCandCity] = useState('');
  const [candEducation, setCandEducation] = useState('Graduate (Any Degree)');
  const [candExperience, setCandExperience] = useState('Fresher / Student');
  const [candRole, setCandRole] = useState('BPO / Voice & Non-Voice Process');
  const [candNotice, setCandNotice] = useState('Immediate Joiner');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (activeTab === 'client') {
      if (!clientName.trim()) errs.clientName = 'Full name is required';
      if (!companyName.trim()) errs.companyName = 'Company name is required';
      if (!clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
        errs.clientEmail = 'Valid corporate email required';
      }
      if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
        errs.clientPhone = 'Valid phone number required';
      }
    } else {
      if (!candName.trim()) errs.candName = 'Full name is required';
      if (!candEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candEmail)) {
        errs.candEmail = 'Valid email address required';
      }
      if (!candPhone.trim() || candPhone.replace(/\D/g, '').length < 8) {
        errs.candPhone = 'Valid phone/WhatsApp number required';
      }
      if (!candCity.trim()) errs.candCity = 'City / Location is required';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      if (activeTab === 'client') {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CLIENT_TEMPLATE,
          {
            form_type:    'Client Hiring Request',
            from_name:    clientName,
            company:      companyName,
            designation:  designation,
            from_email:   clientEmail,
            phone:        clientPhone,
            service:      service,
            headcount:    headcount,
            work_mode:    workMode,
            notes:        clientNotes,
            to_email:     'info@careerexpertglobalsolution.com',
          },
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      } else {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CANDIDATE_TEMPLATE,
          {
            form_type:    'Candidate Job Application',
            from_name:    candName,
            from_email:   candEmail,
            phone:        candPhone,
            city:         candCity,
            education:    candEducation,
            experience:   candExperience,
            role:         candRole,
            notice:       candNotice,
            to_email:     'info@careerexpertglobalsolution.com',
          },
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrors({ submit: 'Failed to send. Please try again or contact info@careerexpertglobalsolution.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className={styles.successState}>
                <div className={styles.successIconWrapper}>
                  <CheckCircle size={56} className={styles.goldIcon} />
                </div>

                {activeTab === 'client' ? (
                  <>
                    <h3 className={styles.successTitle}>Hiring Request Received!</h3>
                    <p className={styles.successDesc}>
                      Thank you, <strong>{clientName}</strong> from <strong>{companyName}</strong>. 
                      Our corporate recruitment specialist has received your hiring criteria and will reach out within <strong>2 business hours</strong> with vetted candidate profiles.
                    </p>
                    <div className={styles.successBadges}>
                      <div className={styles.successBadgeItem}>
                        <ShieldCheck size={15} /> Verified Talent Pipeline
                      </div>
                      <div className={styles.successBadgeItem}>
                        <Clock size={15} /> 24-48h Shortlisting
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className={styles.successTitle}>Application Submitted!</h3>
                    <p className={styles.successDesc}>
                      Thank you, <strong>{candName}</strong>. Your profile has been added to our active placement pool. 
                      Our recruitment team will review your qualifications and contact you on WhatsApp/Phone for relevant job openings at top MNCs & BPOs.
                    </p>
                    <div className={styles.successBadges}>
                      <div className={styles.successBadgeItem}>
                        <Sparkles size={15} /> 100% Free Placement
                      </div>
                      <div className={styles.successBadgeItem}>
                        <Building2 size={15} /> Top MNC & BPO Ties
                      </div>
                    </div>
                  </>
                )}

                <button className={styles.doneBtn} onClick={handleReset}>
                  Close & Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <div className={styles.kickerBadge}>
                    <Sparkles size={13} className={styles.goldIcon} />
                    <span>CLIENT & CANDIDATE PORTAL</span>
                  </div>

                  <h2 className={styles.title}>
                    {activeTab === 'client' ? (
                      <>Hire Talent <span className={styles.goldText}>& Staffing</span></>
                    ) : (
                      <>Get Placed <span className={styles.goldText}>at Top MNCs</span></>
                    )}
                  </h2>

                  <p className={styles.subtitle}>
                    {activeTab === 'client'
                      ? 'Looking to hire pre-screened talent for your company? Fill your requirements below.'
                      : 'Students & Job Seekers: Register your details below to get placed in leading companies.'}
                  </p>

                  {/* Clean 2-Way Tab Switch */}
                  <div className={styles.tabSwitch}>
                    <button
                      type="button"
                      className={`${styles.tabBtn} ${activeTab === 'client' ? styles.tabBtnActive : ''}`}
                      onClick={() => { setActiveTab('client'); setErrors({}); }}
                    >
                      <Briefcase size={16} /> I'm a Client (Hire Talent)
                    </button>
                    <button
                      type="button"
                      className={`${styles.tabBtn} ${activeTab === 'candidate' ? styles.tabBtnActive : ''}`}
                      onClick={() => { setActiveTab('candidate'); setErrors({}); }}
                    >
                      <GraduationCap size={17} /> I'm a Candidate (Get Placed)
                    </button>
                  </div>

                  {/* Active Form Indicator Highlight */}
                  <div className={styles.activeRoleBanner}>
                    {activeTab === 'client' ? (
                      <>
                        <Briefcase size={15} className={styles.activeRoleTag} />
                        <span>Active Form: <strong className={styles.activeRoleTag}>Employer & Client Hiring Form</strong></span>
                      </>
                    ) : (
                      <>
                        <GraduationCap size={16} className={styles.activeRoleTag} />
                        <span>Active Form: <strong className={styles.activeRoleTag}>Student & Candidate Placement Form</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* CLIENT FORM */}
                {activeTab === 'client' && (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Contact Person Name <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <User size={16} className={styles.fieldIcon} />
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Kumar"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className={`${styles.input} ${errors.clientName ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.clientName && <span className={styles.errorText}>{errors.clientName}</span>}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Company Name <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Building2 size={16} className={styles.fieldIcon} />
                          <input
                            type="text"
                            placeholder="e.g. Infosys / Acme Tech"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.companyName && <span className={styles.errorText}>{errors.companyName}</span>}
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Designation / Role</label>
                        <div className={styles.inputWrapper}>
                          <Briefcase size={16} className={styles.fieldIcon} />
                          <input
                            type="text"
                            placeholder="e.g. HR Manager / Talent Head"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Corporate Email <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Mail size={16} className={styles.fieldIcon} />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className={`${styles.input} ${errors.clientEmail ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.clientEmail && <span className={styles.errorText}>{errors.clientEmail}</span>}
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Phone / WhatsApp <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Phone size={16} className={styles.fieldIcon} />
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className={`${styles.input} ${errors.clientPhone ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.clientPhone && <span className={styles.errorText}>{errors.clientPhone}</span>}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Service / Roles Needed</label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={styles.select}
                        >
                          <option value="BPO / Customer Support Staffing">BPO / Voice & Non-Voice Support</option>
                          <option value="IT Staffing & Developers">IT & Software Developers</option>
                          <option value="Telesales & Inside Sales">Telesales & Inside Sales Staffing</option>
                          <option value="General Staffing Solutions">Permanent / Contract Staffing</option>
                          <option value="Payroll & HR Consulting">Payroll & HR Management</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Hiring Count</label>
                        <div className={styles.pillGroup}>
                          {['1 - 4', '5 - 19', '20 - 49', '50+ Bulk'].map((vol) => (
                            <button
                              type="button"
                              key={vol}
                              className={`${styles.pillBtn} ${headcount === vol ? styles.pillBtnActive : ''}`}
                              onClick={() => setHeadcount(vol)}
                            >
                              {vol}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Work Mode</label>
                        <div className={styles.pillGroup}>
                          {['On-site', 'Hybrid', 'Remote'].map((mode) => (
                            <button
                              type="button"
                              key={mode}
                              className={`${styles.pillBtn} ${workMode === mode ? styles.pillBtnActive : ''}`}
                              onClick={() => setWorkMode(mode)}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Brief Requirements / Specific Skills</label>
                      <textarea
                        rows={2}
                        placeholder="Mention required skills, qualifications, salary budget, or preferred joining date..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className={styles.textarea}
                      />
                    </div>

                    <div className={styles.uploadRow}>
                      <label className={styles.uploadBtn}>
                        <Upload size={16} />
                        <span>{clientFile ? clientFile.name : "Attach Job Description (Optional, PDF/DOC)"}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setClientFile(e.target.files?.[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {clientFile && (
                        <button
                          type="button"
                          className={styles.removeFileBtn}
                          onClick={() => setClientFile(null)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Hiring Request</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* CANDIDATE PLACEMENT FORM */}
                {activeTab === 'candidate' && (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Candidate Full Name <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <User size={16} className={styles.fieldIcon} />
                          <input
                            type="text"
                            placeholder="e.g. Mohammed Faqruddin"
                            value={candName}
                            onChange={(e) => setCandName(e.target.value)}
                            className={`${styles.input} ${errors.candName ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.candName && <span className={styles.errorText}>{errors.candName}</span>}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Email Address <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Mail size={16} className={styles.fieldIcon} />
                          <input
                            type="email"
                            placeholder="your.email@gmail.com"
                            value={candEmail}
                            onChange={(e) => setCandEmail(e.target.value)}
                            className={`${styles.input} ${errors.candEmail ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.candEmail && <span className={styles.errorText}>{errors.candEmail}</span>}
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Phone / WhatsApp Number <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Phone size={16} className={styles.fieldIcon} />
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={candPhone}
                            onChange={(e) => setCandPhone(e.target.value)}
                            className={`${styles.input} ${errors.candPhone ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.candPhone && <span className={styles.errorText}>{errors.candPhone}</span>}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Current City / Location <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <MapPin size={16} className={styles.fieldIcon} />
                          <input
                            type="text"
                            placeholder="e.g. Bangalore, Hyderabad, Pune"
                            value={candCity}
                            onChange={(e) => setCandCity(e.target.value)}
                            className={`${styles.input} ${errors.candCity ? styles.inputError : ''}`}
                          />
                        </div>
                        {errors.candCity && <span className={styles.errorText}>{errors.candCity}</span>}
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Highest Qualification</label>
                        <select
                          value={candEducation}
                          onChange={(e) => setCandEducation(e.target.value)}
                          className={styles.select}
                        >
                          <option value="Graduate (Any Degree)">Graduate (Any Degree - B.Com/BBA/BA/B.Sc)</option>
                          <option value="B.Tech / BE / BCA / MCA">B.Tech / B.E. / BCA / MCA</option>
                          <option value="Post Graduate / MBA">Post Graduate / MBA</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Undergraduate / 12th Pass">Undergraduate / 12th Pass</option>
                        </select>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Target Job Domain</label>
                        <select
                          value={candRole}
                          onChange={(e) => setCandRole(e.target.value)}
                          className={styles.select}
                        >
                          <option value="BPO / Voice & Non-Voice Process">BPO / Customer Support (Voice/Chat)</option>
                          <option value="Telesales & Inside Sales">Telesales & Inside Sales</option>
                          <option value="IT & Web Development">IT & Web Development / Software</option>
                          <option value="HR & Recruitment">HR & Talent Acquisition</option>
                          <option value="Accounts & Finance">Accounts, Payroll & Finance</option>
                          <option value="Any Suitable Role">Open to Any Suitable Role</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.gridRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Experience Level</label>
                        <div className={styles.pillGroup}>
                          {['Fresher / Student', '1 - 2 Years', '3+ Years'].map((exp) => (
                            <button
                              type="button"
                              key={exp}
                              className={`${styles.pillBtn} ${candExperience === exp ? styles.pillBtnActive : ''}`}
                              onClick={() => setCandExperience(exp)}
                            >
                              {exp}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Availability to Join</label>
                        <div className={styles.pillGroup}>
                          {['Immediate', '15 Days', '30 Days'].map((join) => (
                            <button
                              type="button"
                              key={join}
                              className={`${styles.pillBtn} ${candNotice === join ? styles.pillBtnActive : ''}`}
                              onClick={() => setCandNotice(join)}
                            >
                              {join}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className={styles.uploadRow}>
                      <label className={styles.uploadBtn}>
                        <Upload size={16} />
                        <span>{resumeFile ? resumeFile.name : "Upload Resume / CV (PDF, DOC, DOCX - Optional)"}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {resumeFile && (
                        <button
                          type="button"
                          className={styles.removeFileBtn}
                          onClick={() => setResumeFile(null)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Profile for Placement</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p className={styles.freePlacementNotice}>
                      * 100% Free Placement Service: CEGS never charges candidates any registration or interview fee.
                    </p>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequestCandidatesModal;
