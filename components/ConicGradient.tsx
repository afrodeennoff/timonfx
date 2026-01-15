

import React from 'react';
import { motion } from 'framer-motion';
import { MOTION_RULES, MOTION_KILL_SWITCH } from '../constants';

interface ConicGradientProps {
  className?: string;
  opacity?: number;
  size?: string;
  blur?: string;
}

/**
 * CONIC GRADIENT COMPONENT
 * Refined into a static, soft light source to comply with "No constant motion" rules.
 */
export const ConicGradient: React.FC<ConicGradientProps> = ({ 
  className = "", 
  opacity = 0.1, 
  size = "100%",
  blur = "100px"
}) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        transition={MOTION_KILL_SWITCH ? { duration: 0 } : { 
          duration: MOTION_RULES.revealDuration * 2, 
          ease: MOTION_RULES.ease 
        }}
        style={{
          width: size,
          height: size,
          filter: `blur(${blur})`,
          // Static soft light logic
          background: `conic-gradient(
            from 45deg at 50% 50%,
            transparent 0deg,
            rgba(139, 92, 246, 0.3) 120deg,
            transparent 240deg,
            rgba(139, 92, 246, 0.3) 300deg,
            transparent 360deg
          )`,
          transform: 'translateZ(0)'
        }}
        className="will-change-transform"
      />
    </div>
  );
};