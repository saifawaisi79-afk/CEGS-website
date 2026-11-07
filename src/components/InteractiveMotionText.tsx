import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './InteractiveMotionText.module.css';

interface MagneticHeadingProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How far it moves (default 18px)
  tiltStrength?: number; // Max tilt in deg (default 6deg)
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

/**
 * MagneticHeading:
 * - Follows the mouse cursor gently with spring physics.
 * - Tilts slightly toward the cursor.
 * - On touch devices, triggers a smooth pulse/wave on tap without requiring hover.
 * - Respects prefers-reduced-motion.
 */
export const MagneticHeading: React.FC<MagneticHeadingProps> = ({
  children,
  className = '',
  strength = 16,
  tiltStrength = 5,
  as: Component = 'h2'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Smooth springs for magnetic cursor following and subtle tilt
  const springConfig = { damping: 18, stiffness: 180, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Normalize to -1 .. 1
    const normX = Math.max(-1, Math.min(1, distanceX / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, distanceY / (rect.height / 2)));

    x.set(normX * strength);
    y.set(normY * strength);
    rotateY.set(normX * tiltStrength);
    rotateX.set(-normY * tiltStrength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleTouchStart = () => {
    setIsTapped(true);
    x.set(0);
    y.set(-6);
    setTimeout(() => {
      y.set(0);
      setIsTapped(false);
    }, 450);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.magneticWrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      data-hovered={isHovered || isTapped}
    >
      {React.createElement(
        Component,
        { className: styles.magneticContent },
        children
      )}
    </motion.div>
  );
};

interface WaveLetterTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
}

/**
 * WaveLetterText:
 * - Individual letters animate in subtle wave / staggered float on hover or mobile tap.
 * - Accented with subtle gold highlight (#bd9f67).
 * - Smoothly slides upward on hover with premium cubic-bezier easing.
 */
export const WaveLetterText: React.FC<WaveLetterTextProps> = ({
  text,
  highlightWords = [],
  className = '',
  as: Component = 'span'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const handleTouch = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 800);
  };

  const active = isHovered || isTapped;

  // Split text into words, then letters
  const words = text.split(' ');

  let globalCharIndex = 0;

  return React.createElement(
    Component,
    {
      className: `${styles.waveContainer} ${className}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onTouchStart: handleTouch,
      tabIndex: 0,
      'aria-label': text
    },
    words.map((word, wordIdx) => {
      const isHighlighted = highlightWords.some(
        hw => hw.toLowerCase() === word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
      );

      return (
        <span key={wordIdx} className={styles.wordWrapper}>
          {word.split('').map((char, charIdx) => {
            const index = globalCharIndex++;
            return (
              <span
                key={charIdx}
                className={`${styles.char} ${isHighlighted ? styles.highlightChar : ''}`}
                style={{
                  transitionDelay: `${(index % 12) * 22}ms`
                }}
                data-active={active}
              >
                {char}
              </span>
            );
          })}
          {wordIdx < words.length - 1 && <span className={styles.space}>&nbsp;</span>}
        </span>
      );
    })
  );
};
