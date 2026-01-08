
import React, { useState, useEffect } from 'react';

interface GhostTextProps {
  text: string;
  className?: string;
  glowColor?: string;
  speed?: number;
}

export const GhostText: React.FC<GhostTextProps> = ({ 
  text, 
  className = "", 
  glowColor = "rgba(139, 92, 246, 0.15)",
  speed = 90
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span 
      className={className} 
      style={{ 
        textShadow: `0 0 15px ${glowColor}`,
        display: 'inline-block'
      }}
    >
      {text.slice(0, index)}
      {index < text.length && (
        <span className="opacity-70 inline-block ml-0.5">|</span>
      )}
    </span>
  );
};
