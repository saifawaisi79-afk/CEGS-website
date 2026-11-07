# CEGS - Career Expert Global Solution Web Application

Official production-grade web application for **Career Expert Global Solution (CEGS)** — providing premium IT Staffing, BPO/KPO Placement, HR Consulting, Payroll Management, and Corporate Training bootcamps.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript (Strict)
- **Bundler & Tooling**: Vite 8 with Rolldown chunk optimization
- **Routing**: React Router v7 (with deep linking, 404 handling, and automatic scroll-to-top)
- **Styling**: CSS Modules + Global design system tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet (CartoDB Dark Matter tiles)
- **Forms & Validation**: Zod + EmailJS Browser SDK
- **Linter**: Oxlint (High-performance Rust-based linter)

---

## 🛠️ Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:5173)
npm run dev

# 3. Type check & Lint
npm run lint
npx tsc --noEmit

# 4. Create production build (generates optimized dist/ directory)
npm run build

# 5. Preview production build locally (http://localhost:4173)
npm run preview
```

---

## 🌐 Hostinger Deployment Guide

This project is a high-performance **Single Page Application (SPA)** optimized specifically for Hostinger hosting environments (Hostinger Web Hosting, Cloud Hosting, or VPS).

### Option A: Hostinger File Manager / FTP Upload (Recommended & Fastest)

1. Run the production build command locally:
   ```bash
   npm run build
   ```
2. Open your Hostinger account at [hpanel.hostinger.com](https://hpanel.hostinger.com).
3. Navigate to **Websites** → Select your domain → Click **File Manager**.
4. Open the `public_html` directory of your website.
5. Upload all files and folders from inside the **`dist/`** directory directly into `public_html/`.
   - Ensure the `.htaccess` file is uploaded into `public_html/` (enable "Show Hidden Files" in Hostinger File Manager if needed).
   - The `.htaccess` file handles SPA routing (redirecting subpages like `/about`, `/contact`, `/services` to `index.html`) so refreshing or direct navigation never triggers a 404 error.
   - It also enables Gzip compression and long-term browser caching for static assets.

### Option B: Hostinger Git Deployment (Automated)

1. In Hostinger hPanel, go to **Advanced** → **Git**.
2. Connect repository: `https://github.com/saifawaisi79-afk/CEGS-website.git`
3. Branch: `main`
4. In the deployment settings, configure build command:
   ```bash
   npm install && npm run build
   ```
5. Set the public directory / root to `dist`.

---

## ✉️ EmailJS Configuration (Contact & Candidate Forms)

The contact forms, candidate intake modals, and corporate staffing request forms submit directly through EmailJS without requiring an external backend server.

To customize or manage your email delivery:
1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com).
2. Create or verify your Service ID and Template IDs.
3. Configure the following environment variables (or update `src/lib/emailjs.ts`):
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_CONTACT_TEMPLATE`
   - `VITE_EMAILJS_CLIENT_TEMPLATE`
   - `VITE_EMAILJS_CANDIDATE_TEMPLATE`
4. Destination email is set to `info@careerexpertglobalsolution.com`.

---

## 📁 Key Directories

```
cegs-app/
├── public/                 # Static assets (images, client logos, .htaccess)
│   ├── .htaccess          # Hostinger Apache / LiteSpeed rewrite & cache rules
│   ├── _redirects         # Netlify/Cloudflare routing fallback
│   ├── images/            # High-resolution optimized pictures & textures
│   └── logos/clients/     # Verified client & partner SVG/PNG logos
├── src/
│   ├── components/        # Reusable UI components (Header, Footer, Modals, etc.)
│   ├── data/              # Typed datasets (services, prestigious clients)
│   ├── lib/               # Utility libraries (EmailJS configuration)
│   ├── pages/             # Route pages (Home, AboutUs, Services, Careers, Contact, 404)
│   │   └── services/      # Individual service detail pages
│   ├── App.tsx            # Main router configuration & layout wrappers
│   └── main.tsx           # React entry point
└── dist/                  # Production-ready output to upload to Hostinger public_html
```

---

## 🔒 Security & Performance Features

- **XSS & Injection Protection**: HTML sanitization and strict Zod schema validation across all form inputs.
- **Security Headers**: `.htaccess` injects `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, and `Referrer-Policy`.
- **Chunk Splitting**: Vendor dependencies (`framer-motion`, `leaflet`, `lucide-react`, React runtime) are chunked separately for fast parallel download and caching.
- **Local Asset Hosting**: All graphics and textures are hosted locally in `public/` to avoid third-party rate-limiting.
- **Responsive Navigation**: Full desktop navbar + mobile drawer supporting phones and tablets down to 320px screen widths.
