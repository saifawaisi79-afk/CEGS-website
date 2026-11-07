import { FileText, FileCheck, Gift, BarChart2, Database, ShieldCheck, Lock, DollarSign } from 'lucide-react';
import styles from './PayrollManagement.module.css';

const PayrollManagement = () => {

  const servicesList = [
    {
      icon: <FileText size={24} />,
      title: "End-to-End Payroll Processing",
      desc: "Comprehensive payroll management from salary calculation to final disbursement.",
      bullets: [
        "Accurate Salary Computations",
        "Timely Payments",
        "Complete Confidentiality"
      ]
    },
    {
      icon: <FileCheck size={24} />,
      title: "Statutory Compliance & Tax Filing",
      desc: "Ensuring adherence to all legal requirements and seamless tax management.",
      bullets: [
        "Regulatory Compliance",
        "Minimal Legal Risks",
        "Transparent Reporting"
      ]
    },
    {
      icon: <Gift size={24} />,
      title: "Employee Benefits Administration",
      desc: "Streamlined management of employee benefits, incentives, and compensation structures.",
      bullets: [
        "Comprehensive Tracking",
        "Customized Packages",
        "Employee Satisfaction"
      ]
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Payroll Audit & Reporting",
      desc: "Detailed auditing and comprehensive reporting for financial transparency.",
      bullets: [
        "Financial Oversight",
        "Error Detection",
        "Strategic Insights"
      ]
    }
  ];

  const featuresList = [
    {
      icon: <Database size={24} />,
      title: "Technology-Driven",
      desc: "Advanced systems ensuring accuracy and efficiency"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Full Compliance",
      desc: "Stay updated with latest regulatory requirements"
    },
    {
      icon: <Lock size={24} />,
      title: "Data Security",
      desc: "Enterprise-grade security for sensitive information"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Cost-Effective",
      desc: "Optimized operations reducing processing costs"
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div>
              <div className={styles.kickerBadge}>
                <span className={styles.kickerDot}></span> SERVICE
              </div>
              <h1 className={styles.heroTitle}>Payroll <span className={styles.highlight}>Management</span></h1>
              <p className={styles.heroSubtitle}>
                Streamline your payroll operations with our comprehensive, accurate, and compliant solutions.
              </p>
              <div className={styles.tagsContainer}>
                <span className={styles.heroTag}>Salary Processing</span>
                <span className={styles.heroTag}>Tax Compliance</span>
                <span className={styles.heroTag}>Benefits Admin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionKicker}>WHAT WE OFFER</span>
            <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Services</span></h2>
          </div>

          <div className={styles.servicesGrid}>
            {servicesList.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDesc}>{service.desc}</p>
                <ul className={styles.featuresList}>
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className={styles.featureItem}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Why <span className={styles.highlight}>Choose Us</span></h2>
          </div>

          <div className={styles.featuresGrid}>
            {featuresList.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureCardIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                <p className={styles.featureCardDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PayrollManagement;
