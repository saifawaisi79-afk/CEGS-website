import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import styles from './Insights.module.css';

const statsData = [
  { id: 1, value: 200, suffix: "+", label: "CLIENTS", decimals: 0 },
  { id: 2, value: 2.5, suffix: "L+", label: "TALENT PLACEMENTS", decimals: 1 },
  { id: 3, value: 4.9, suffix: "", label: "GOOGLE RATING", decimals: 1 },
  { id: 4, value: 50, suffix: "+", label: "STAFFING EXPERTS", decimals: 0 },
  { id: 5, value: 100, suffix: "+", label: "TRAINING PROGRAMS", decimals: 0 },
];

const AnimatedCounter = ({ value, suffix, decimals }: { value: number, suffix: string, decimals: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals) + suffix;
    }
    return Math.floor(latest) + suffix;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const StatCard = ({ stat, index }: { stat: typeof statsData[0], index: number }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <motion.div 
        className={styles.topGlow} 
        initial={{ opacity: 0, width: "0%" }}
        whileInView={{ opacity: 0.8, width: "60%" }}
        transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
      />
      <h3 className={styles.number}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
      </h3>
      <p className={styles.label}>{stat.label}</p>
    </motion.div>
  );
};

const Insights = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {statsData.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;

