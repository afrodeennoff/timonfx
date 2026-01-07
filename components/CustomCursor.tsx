
import React, { useEffect, useState, memo, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Performance optimized spring for smooth tracking without lag
  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotation interpolation
  const rotation = useMotionValue(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 1. Efficient Position Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Interpolate rotation based on movement direction
      // Only calculate if moving to avoid jitter
      if (!isHovering) {
        const dx = e.clientX - lastX.current;
        const dy = e.clientY - lastY.current;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI);
          rotation.set(targetRotation);
        }
      }

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    // 2. Efficient Hover Detection (Event Delegation)
    // Checks only when crossing element boundaries, not every pixel
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, select, textarea, [role="button"]') || 
          target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Small delay check or immediate reset logic could go here
      // But for hover state, relying on the 'over' event of the new target is often enough
      // To be safe, we check if the new relatedTarget is NOT interactive
      const related = e.relatedTarget as HTMLElement;
      if (!related || !(related.matches('button, a, input, select, textarea, [role="button"]') || 
          related.closest('button, a, [role="button"]'))) {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveDoc = () => setIsVisible(false);
    const handleMouseEnterDoc = () => setIsVisible(true);

    // Passive listeners for scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mouseenter', handleMouseEnterDoc);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isVisible, isHovering, mouseX, mouseY, rotation]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer reactive ring */}
      <motion.div
        className="absolute flex items-center justify-center will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 0 : rotation.get(),
            opacity: isHovering ? 1 : 0.4,
          }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-10 h-10 flex items-center justify-center"
        >
          {/* ORK Themed Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-purple" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-purple" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-purple" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-purple" />
          
          {isHovering && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute inset-0 border border-brand-purple rounded-full"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Inner precise core */}
      <motion.div
        className="absolute flex items-center justify-center will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          animate={{
            scale: isHovering ? 0.5 : 1,
            backgroundColor: isHovering ? '#8b5cf6' : '#ffffff'
          }}
          transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-1.5 h-1.5 rounded-full"
        />
      </motion.div>
    </div>
  );
});
