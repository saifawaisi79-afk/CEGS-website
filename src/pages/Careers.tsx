import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, MapPin, Clock, ArrowRight,
  TrendingUp, Users, DollarSign, FileText, Phone, Award
} from 'lucide-react';
import styles from './Careers.module.css';

// Job data
const jobsData = [
  { id: 1, title: "Customer Support Executive", category: "Customer Service", location: "Bangalore, India", type: "Full-Time", desc: "Handle inbound calls and resolve customer queries efficiently." },
  { id: 2, title: "Customer Support Executive", category: "Customer Service", location: "Thane, India", type: "Full-Time", desc: "Handle inbound calls and resolve customer queries efficiently." },
  { id: 3, title: "Customer Support Executive", category: "Customer Service", location: "Noida, India", type: "Full-Time", desc: "Handle inbound calls and resolve customer queries efficiently." },
  { id: 4, title: "Telesales Executive", category: "Sales", location: "Bangalore, India", type: "Full-Time", desc: "Drive sales through outbound calling and build customer relationships." },
  { id: 5, title: "Telesales Executive", category: "Sales", location: "Thane, India", type: "Full-Time", desc: "Drive sales through outbound calling and build customer relationships." },
  { id: 6, title: "Customer Sales Representative", category: "Sales", location: "Bangalore, India", type: "Full-Time", desc: "Assist customers with sales inquiries and product information." },
  { id: 7, title: "Technical Support Specialist", category: "Technical", location: "Hyderabad, India", type: "Full-Time", desc: "Provide technical assistance for internet and software issues." },
  { id: 8, title: "HR Recruiter – BPO Hiring", category: "Human Resources", location: "Remote", type: "Part-Time", desc: "Manage end-to-end recruitment for voice and non-voice roles." },
  { id: 9, title: "Voice Process Associate", category: "Customer Service", location: "Mumbai, India", type: "Full-Time", desc: "Handle outbound/inbound voice calls and customer queries." },
  { id: 10, title: "Non-Voice Process Executive", category: "Customer Service", location: "Pune, India", type: "Full-Time", desc: "Manage chat and email support with timely resolutions." },
  { id: 11, title: "Operations Team Leader", category: "Customer Service", location: "Bangalore, India", type: "Full-Time", desc: "Lead a team of executives and ensure SLA adherence." },
  { id: 12, title: "Inside Sales Team Leader", category: "Sales", location: "Remote", type: "Full-Time", desc: "Lead a team of executives and ensure SLA adherence." }
];

const benefitsList = [
  { icon: <TrendingUp size={28} />, title: "Growth Opportunities", desc: "Clear career path with regular promotions and skill development" },
  { icon: <Users size={28} />, title: "Amazing Team", desc: "Diverse and supportive team that values collaboration and innovation" },
  { icon: <DollarSign size={28} />, title: "Competitive Benefits", desc: "Competitive salary, health insurance, flexible hours, and great perks" }
];

const processList = [
  { step: "01", icon: <FileText size={24} />, title: "Apply Online", desc: "Submit your application through our careers page" },
  { step: "02", icon: <Search size={24} />, title: "Initial Screening", desc: "Our recruiters review applications and schedule calls" },
  { step: "03", icon: <Phone size={24} />, title: "Interview Process", desc: "Technical and cultural fit interviews with the team" },
  { step: "04", icon: <Award size={24} />, title: "Job Offer", desc: "Successful candidates receive offers to join our team" }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    document.title = "Careers | CEGS";
  }, []);

  // Derive unique categories and locations from data
  const categories = useMemo(() => ['All Categories', ...Array.from(new Set(jobsData.map(j => j.category)))], []);
  const locations = useMemo(() => ['All Locations', ...Array.from(new Set(jobsData.map(j => j.location)))], []);

  // Filter jobs based on criteria
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'All Categories' || job.category === categoryFilter;
      const matchLocation = locationFilter === 'All Locations' || job.location === locationFilter;
      return matchSearch && matchCategory && matchLocation;
    });
  }, [searchTerm, categoryFilter, locationFilter]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All Categories');
    setLocationFilter('All Locations');
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const pathItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.kickerBadge}>
              <span className={styles.kickerDot}></span> CAREERS
            </div>
            <h1 className={styles.heroTitle}>Join Our <span className={styles.highlight}>Team</span></h1>
            <p className={styles.heroSubtitle}>
              Discover exciting career opportunities and grow with us
            </p>
            <div className={styles.heroPills}>
              {[
                { num: 1, text: "Find a role" },
                { num: 2, text: "Apply online" },
                { num: 3, text: "Interview" },
                { num: 4, text: "Get hired!" }
              ].map((pill, i) => (
                <motion.div 
                  key={i} 
                  className={styles.heroPill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                >
                  <span className={styles.pillNumber}>{pill.num}</span> {pill.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.filterCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.filterGroup}>
              <label htmlFor="job-search" className={styles.filterLabel}>Search Jobs</label>
              <div className={styles.filterInputWrapper}>
                <Search size={18} className={styles.filterIcon} />
                <input 
                  id="job-search"
                  type="text" 
                  className={styles.filterInput} 
                  placeholder="Search position or keyword" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="job-category" className={styles.filterLabel}>Category</label>
              <div className={styles.filterInputWrapper}>
                <select 
                  id="job-category"
                  className={styles.filterSelect}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown size={18} className={styles.selectArrow} />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="job-location" className={styles.filterLabel}>Location</label>
              <div className={styles.filterInputWrapper}>
                <select 
                  id="job-location"
                  className={styles.filterSelect}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <ChevronDown size={18} className={styles.selectArrow} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <section className={styles.jobsSection}>
        <div className={styles.container}>
          <div className={styles.jobsHeader}>
            <h2 className={styles.jobsTitle}>Current <span className={styles.highlight}>Openings</span></h2>
            <div className={styles.jobsCount} aria-live="polite">
              {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className={styles.jobsGrid}>
            <AnimatePresence mode="popLayout">
              {visibleJobs.length > 0 ? (
                visibleJobs.map(job => (
                  <motion.div 
                    key={job.id} 
                    className={styles.jobCard}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.jobHeaderTop}>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      <span className={styles.jobCategoryBadge}>{job.category}</span>
                    </div>
                    
                    <div className={styles.jobMeta}>
                      <span className={styles.jobMetaItem}>
                        <MapPin size={16} className={styles.jobMetaIcon} />
                        {job.location}
                      </span>
                      <span className={styles.jobMetaItem}>
                        <Clock size={16} className={styles.jobMetaIcon} />
                        {job.type}
                      </span>
                    </div>

                    <p className={styles.jobDesc}>{job.desc}</p>
                    
                    {/* TODO: Update with real application form route if one exists later */}
                    <Link to={`/contact?job=${encodeURIComponent(job.title)}`} className={styles.applyLink}>
                      Apply Now <ArrowRight size={16} className={styles.applyArrow} />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className={styles.emptyState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className={styles.emptyStateText}>No positions match your search.</p>
                  <button onClick={clearFilters} className={styles.clearButton}>Clear filters</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {filteredJobs.length > visibleCount && (
            <div className={styles.loadMoreContainer}>
              <button onClick={handleLoadMore} className={styles.clearButton}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Our Team */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionKicker}>BENEFITS</span>
            <h2 className={styles.sectionTitle}>Why Join <span className={styles.highlight}>Our Team?</span></h2>
          </motion.div>

          <motion.div 
            className={styles.benefitsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefitsList.map((benefit, index) => (
              <motion.div key={index} className={styles.benefitCard} variants={itemVariants}>
                <div className={styles.benefitIcon} aria-hidden="true">
                  {benefit.icon}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className={styles.pathSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionKicker}>PROCESS</span>
            <h2 className={styles.sectionTitle}>Application <span className={styles.highlight}>Process</span></h2>
          </motion.div>

          <motion.ol 
            className={styles.pathGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            <div className={styles.connectorLine} aria-hidden="true"></div>
            {processList.map((path, index) => (
              <motion.li key={index} className={styles.pathStep} variants={pathItemVariants}>
                <div className={styles.stepNumber} aria-hidden="true">{path.step}</div>
                <div className={styles.stepIcon} aria-hidden="true">{path.icon}</div>
                <h3 className={styles.stepTitle}>{path.title}</h3>
                <p className={styles.stepDesc}>{path.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.ctaCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Don't see the <span className={styles.highlight}>perfect role?</span></h2>
            <p className={styles.ctaText}>
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            {/* TODO: Update with real resume submission link if one exists later */}
            <Link to="/contact" className={styles.ctaButton}>
              Submit Your Resume &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
