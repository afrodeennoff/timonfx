
import React, { useEffect, useState, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High stiffness for instant tracking, low damping for crisp stops
  const springConfig = { damping: 35, stiffness: 800, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      // More robust check for clickable elements
      const isClickable = target.matches('button, a, input, select, textarea, [role="button"]') || 
                          target.closest('button, a, [role="button"]') !== null;
      
      if (isHovering !== isClickable) setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isHovering, mouseX, mouseY]);

  // Hide on touch devices via CSS media query check or if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
      {/* Crosshairs - Extremely subtle */}
      <motion.div 
        style={{ y: smoothY }}
        className="absolute left-0 right-0 h-[1px] bg-brand-purple/10 will-change-transform"
      />
      <motion.div 
        style={{ x: smoothX }}
        className="absolute top-0 bottom-0 w-[1px] bg-brand-purple/10 will-change-transform"
      />

      {/* Primary Reticle */}
      <motion.div
        className="absolute flex items-center justify-center will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Dynamic Brackets */}
        <motion.div
          animate={{
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            opacity: isHovering ? 1 : 0.3,
            rotate: isHovering ? 90 : 0
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-brand-purple" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-brand-purple" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-brand-purple" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-brand-purple" />
        </motion.div>

        {/* Hover Data Tag */}
        <motion.div 
           animate={{ opacity: isHovering ? 1 : 0, x: isHovering ? 30 : 20 }}
           transition={{ duration: 0.2 }}
           className="absolute left-0 top-0"
        >
            <div className="bg-brand-purple/10 backdrop-blur-md border border-brand-purple/30 px-2 py-1 ml-2">
                <span className="mono text-[8px] font-black text-brand-purple tracking-[0.2em] whitespace-nowrap">
                TARGET_LOCKED
                </span>
            </div>
        </motion.div>
      </motion.div>

      {/* Core Dot */}
      <motion.div
        className="absolute flex items-center justify-center will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className={`w-1 h-1 rounded-full transition-all duration-200 ${isHovering ? 'bg-brand-purple shadow-[0_0_10px_#7c3aed] scale-150' : 'bg-white'}`}
        />
      </motion.div>
    </div>
  );
});
