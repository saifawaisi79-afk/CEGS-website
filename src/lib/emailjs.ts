// ============================================================
// EmailJS Configuration
// ------------------------------------------------------------
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail / Outlook / SMTP)
//    → Set VITE_EMAILJS_SERVICE_ID or update fallback below
// 3. Create Email Templates (one per form or unified):
//    → contact_template   (Contact page form)
//    → client_template    (Client / Hire Talent form)
//    → candidate_template (Candidate / Job Application form)
// 4. Go to Account → API Keys → copy Public Key
//    → Set VITE_EMAILJS_PUBLIC_KEY or update fallback below
// ============================================================

export const EMAILJS_CONFIG = {
  PUBLIC_KEY:        import.meta.env.VITE_EMAILJS_PUBLIC_KEY        || 'LuyRaTbsZIi7suB2n',
  SERVICE_ID:        import.meta.env.VITE_EMAILJS_SERVICE_ID        || 'service_1y548am',
  CONTACT_TEMPLATE:  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE  || 'template_fhy3a1c',
  CLIENT_TEMPLATE:   import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE   || 'template_fhy3a1c',
  CANDIDATE_TEMPLATE:import.meta.env.VITE_EMAILJS_CANDIDATE_TEMPLATE|| 'template_fhy3a1c',
};

// Destination email
export const CEGS_EMAIL = 'info@careerexpertglobalsolution.com';
