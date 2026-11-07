import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import styles from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: "Annapornanu",
    initial: "A",
    text: "CEGS is one of the best consulting firms in Bangalore, you guide like a good friend, the experience with them was very good",
    rating: 5,
  },
  {
    id: 2,
    name: "Shabaz Sawar",
    initial: "S",
    text: "It was one of my best decision to listen to the Advise of they helped to get a best job n if u are looking for a job then this is the best place for u i would like to suggest every to visit Career Expert Global solutions they have the best staff with good experience",
    rating: 5,
  },
  {
    id: 3,
    name: "Ayesha",
    initial: "A",
    text: "I'm very thankful for Career Expert Global Solution, for the supportive nature by every staff member in the computer, and very thankful for HR for helping me from the date of interview till the date of joining and getting placed in flipcart, very much pleased by the friendly nature of cegs HRS.",
    rating: 5,
  },
  {
    id: 4,
    name: "Rahul M",
    initial: "R",
    text: "Excellent service from the team. They were very professional and helped me land a great opportunity that perfectly matched my skill set.",
    rating: 5,
  },
  {
    id: 5,
    name: "Priya Singh",
    initial: "P",
    text: "The transparency and dedication of the CEGS team are unmatched. Highly recommend for anyone looking to switch their career trajectory seamlessly.",
    rating: 5,
  },
  {
    id: 6,
    name: "Mohammed T",
    initial: "M",
    text: "Amazing guidance and extremely fast process. The CEGS team took care of all my concerns and helped me negotiate a brilliant package. 10/10 recommend!",
    rating: 5,
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={styles.cardWrapper}>
      <motion.div 
        className={styles.card}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div 
          className={styles.cardContentInner}
          style={{ transform: "translateZ(40px)" }}
        >
          <Quote className={styles.quoteIcon} />
          <div className={styles.stars}>
            {[...Array(review.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
              >
                <Star className={styles.starIcon} fill="currentColor" />
              </motion.div>
            ))}
          </div>
          <p className={styles.reviewText}>"{review.text}"</p>
          <div className={styles.author}>
            <div className={styles.avatar}>{review.initial}</div>
            <span className={styles.authorName}>{review.name}</span>
          </div>
        </motion.div>
        
        {/* Glow effect that follows mouse */}
        <motion.div 
          className={styles.mouseGlow}
          style={{
            x: useTransform(x, [-0.5, 0.5], ["-100%", "100%"]),
            y: useTransform(y, [-0.5, 0.5], ["-100%", "100%"]),
          }}
        />
      </motion.div>
    </div>
  );
};

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const googleReviewLink = "https://www.google.com/maps/place/Career+Expert+Global+solutions/@12.9535966,77.6092161,17z/data=!4m6!3m5!1s0x3bae17e58b1e86e9:0x2a03d439e0c0c791!8m2!3d12.9545582!4d77.6114838!16s%2Fg%2F11sgwr380r?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <Star className={styles.badgeIcon} size={14} fill="currentColor" />
            4.9 GOOGLE RATING &bull; CLIENT TESTIMONIALS
          </div>
          <h2 className={styles.heading}>
            What Our <span className={styles.highlight}>Candidates</span> Say
          </h2>
          <p className={styles.subheading}>
            Discover why thousands trust CEGS for their career transformation
          </p>
          
          <a href={googleReviewLink} target="_blank" rel="noopener noreferrer" className={styles.viewAllBtn}>
            View All Google Reviews
            <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className={styles.carouselContainer}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={scrollLeft}>
            <ChevronLeft size={24} />
          </button>
          
          <motion.div 
            className={styles.carousel}
            ref={scrollRef}
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {reviews.map((review, i) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, x: 100, rotateY: 20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                style={{ flexShrink: 0, perspective: 1000 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>

          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={scrollRight}>
            <ChevronRight size={24} />
          </button>
        </div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={styles.footerText}>Have you worked with CEGS? Share your experience!</p>
          <a href={googleReviewLink} target="_blank" rel="noopener noreferrer" className={styles.writeReviewBtn}>
            <Star size={16} fill="currentColor" />
            Write Your Review
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
      
      {/* Background ambient glow */}
      <div className={styles.ambientGlow}></div>
    </section>
  );
};

export default Reviews;
