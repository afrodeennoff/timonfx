import React, { useState, useEffect, useRef } from 'react';

interface GhostTextProps {
  text: string;
  className?: string;
  glowColor?: string;
  speed?: number;
  loop?: boolean;
}

export const GhostText: React.FC<GhostTextProps> = ({ 
  text, 
  className = "", 
  glowColor = "rgba(139, 92, 246, 0.15)",
  speed = 90,
  loop = false
}) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (!isDeleting && index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && index > 0) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev - 1);
      }, speed / 2);
      return () => clearTimeout(timeout);
    } else if (loop) {
      if (!isDeleting && index === text.length) {
        const timeout = setTimeout(() => setIsDeleting(true), 2500);
        return () => clearTimeout(timeout);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }
  }, [index, text, speed, isVisible, isDeleting, loop]);

  return (
    <span 
      ref={containerRef}
      className={className} 
      style={{ 
        textShadow: `0 0 15px ${glowColor}`,
        display: 'inline-block',
        minWidth: '1ch'
      }}
    >
      {text.slice(0, index)}
      {isVisible && (
        <span className={`opacity-70 inline-block ml-0.5 ${index < text.length || loop ? 'animate-pulse' : ''}`}>|</span>
      )}
    </span>
  );
};