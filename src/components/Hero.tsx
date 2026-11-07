import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { services } from '../data/services';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Spotlight Cursor logic
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  // Autoplay every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  const activeService = services[activeIndex];

  const handleServiceClick = (originalIndex: number) => {
    if (originalIndex === activeIndex) return;
    setDirection(originalIndex > activeIndex ? 1 : -1);
    setActiveIndex(originalIndex);
  };

  const bgVariants = {
    enter: {
      clipPath: 'inset(15% 15% 15% 15%)',
      scale: 1.05,
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: 2,
    },
    center: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 2,
    },
    exit: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 1,
    }
  };

  const containerVariants = {
    enter: (_direction: number) => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Thumbnails are the services EXCEPT the active one
  const orderedServices = [
    ...services.slice(activeIndex + 1),
    ...services.slice(0, activeIndex)
  ];

  return (
    <section className={styles.hero} onMouseMove={handleMouseMove}>
      <div className={styles.backgroundContainer}>
        <AnimatePresence initial={false}>
          <motion.div
            key={activeService.id}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${activeService.image})` }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1] // Smooth cinematic expansion ease
            }}
          />
        </AnimatePresence>
        <div className={styles.overlay} />
      </div>

      {/* Large Outlined Typography - FAINT BASE */}
      <div className={styles.largeTypographyContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={styles.largeTypography}
          >
            {activeService.title}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Large Outlined Typography - GOLD SPOTLIGHT */}
      <div className={styles.largeTypographyContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`${styles.largeTypography} ${styles.goldTypography}`}
            style={{ 
              WebkitMaskImage: maskImage,
              maskImage: maskImage
            }}
          >
            {activeService.title}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.content}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.textContent}
            >
              <motion.h1 variants={itemVariants as any} custom={direction} className={styles.title}>{activeService.title}</motion.h1>
              <motion.p variants={itemVariants as any} custom={direction} className={styles.description}>{activeService.shortDescription}</motion.p>
              
              <motion.div variants={itemVariants as any} custom={direction}>
                <Link
                  to={`/services/${activeService.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={styles.exploreButton}
                  style={{ textDecoration: 'none' }}
                >
                  <span>Explore Service</span>
                  <div className={styles.iconCircle}>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontal Carousel Thumbnails */}
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrackWrapper}>
            <div className={styles.carouselTrack}>
              <AnimatePresence initial={false} mode="popLayout">
                {orderedServices.map((service) => {
                  const originalIndex = services.findIndex(s => s.id === service.id);
                  
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      layoutId={`card-container-${service.id}`}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => handleServiceClick(originalIndex)}
                      className={styles.carouselCard}
                      transition={{ 
                        type: "spring", 
                        stiffness: 150, 
                        damping: 20,
                        mass: 1
                      }}
                    >
                      <motion.div 
                        layoutId={`image-${service.id}`}
                        className={styles.cardImageWrapper}
                      >
                        <img src={service.image} alt={service.title} className={styles.cardImage} />
                        <div className={styles.cardOverlay} />
                      </motion.div>
                      <div className={styles.cardContent}>
                        <span className={styles.cardTitle}>{service.title}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
