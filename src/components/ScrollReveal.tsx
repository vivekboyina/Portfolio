import React, { ReactNode } from 'react';
import { motion, useReducedMotion, Transition } from 'motion/react';

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  id?: string;
  margin?: string;
}

/**
 * ScrollReveal: A cinematic scroll-triggered animation wrapper using Framer Motion.
 * Fades and smoothly slides content up as it enters the viewport.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  yOffset = 45,
  amount = 0.12,
  once = true,
  id,
  margin = '0px 0px -80px 0px',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const transition: Transition = {
    duration: shouldReduceMotion ? 0.35 : duration,
    delay,
    ease: [0.16, 1, 0.3, 1], // Cinematic ease-out expo deceleration curve
  };

  return (
    <motion.div
      id={id}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: yOffset }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{
        once,
        amount,
        margin,
      }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
