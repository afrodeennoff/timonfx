import React, { useEffect, useState, memo, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const requestRef = useRef<number>(0);
  
  // Use springs with performance-optimized physics for cursor following
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateValue = useMotionValue(0);
  const proximityScale = useMotionValue(1);
  const proximityOpacity = useMotionValue(0.4);

  useEffect(() => {
    // strict check for touch devices to completely disable cursor
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return;
    }
    setIsMounted(true);

    const updateRotation = (time: number) => {
      if (!isHovering) {
        // Reduced frequency calc for optimization
        rotateValue.set(Math.sin(time / 1500) * 5);
      } else {
        rotateValue.set(rotateValue.get() * 0.9);
      }
      requestRef.current = requestAnimationFrame(updateRotation);
    };
    requestRef.current = requestAnimationFrame(updateRotation);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Direct update of motion value is efficient
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = target.closest('button, a, input, [role="button"], .interactive-card');
      
      if (isInteractive) {
        if (!isHovering) {
            setIsHovering(true);
            proximityScale.set(1.25);
            proximityOpacity.set(0.8);
        }
      } else {
        if (isHovering) {
            setIsHovering(false);
            proximityScale.set(1);
            proximityOpacity.set(0.4);
        }
      }
    };

    const handleMouseDown = () => proximityScale.set(0.85);
    const handleMouseUp = () => proximityScale.set(isHovering ? 1.25 : 1);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovering, isVisible, mouseX, mouseY, proximityOpacity, proximityScale, rotateValue]);

  if (!isMounted) return null;
  // Double check render-time
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotateValue,
          scale: proximityScale,
          opacity: proximityOpacity
        }}
        className="absolute w-12 h-12 flex items-center justify-center will-change-transform"
      >
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand-purple" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-brand-purple" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-brand-purple" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand-purple" />
        <motion.div 
          animate={{
            scale: isHovering ? [1, 1.1, 1] : 1,
            opacity: isHovering ? [0.1, 0.3, 0.1] : 0
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 border border-brand-purple rounded-full"
        />
      </motion.div>
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        className="absolute flex items-center justify-center will-change-transform"
      >
        <motion.div 
          animate={{ scale: isHovering ? 0.6 : 1, backgroundColor: isHovering ? '#8b5cf6' : '#ffffff' }}
          transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]"
        />
      </motion.div>
    </div>
  );
});