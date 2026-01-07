
import React, { useEffect, useRef } from 'react';

/**
 * Background3D: Refined 3D visualization.
 * Motion amplitude reduced for stability.
 */
export const Background3D: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const GRID_SIZE = 35;
    const SPACING = 60;
    const PERSPECTIVE = 600;
    const COLOR_PURPLE = '#8b5cf6';
    
    const pulses: Array<{x: number, y: number, progress: number, speed: number}> = [];
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Very subtle sensitivity
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const project = (x: number, y: number, z: number) => {
      const ry = mouseRef.current.x * 0.1; // Reduced from 0.12
      const rx = mouseRef.current.y * 0.06; // Reduced from 0.08

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const xRot = x * cosY - z * sinY;
      const zRot = x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const yRot = y * cosX - zRot * sinX;
      const zFinal = y * sinX + zRot * cosX;

      const depth = zFinal + 400;
      if (depth < 1) return null;

      const scale = PERSPECTIVE / depth;
      return {
        x: width / 2 + xRot * scale,
        y: height / 2 + yRot * scale,
        scale: Math.max(0, scale)
      };
    };

    const draw = (time: number) => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      const t = time * 0.0003; // Slower time evolution for "Heavy/Stable" feel

      for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
        // Vertical lines
        ctx.beginPath();
        let firstV = true;
        for (let j = -GRID_SIZE; j <= GRID_SIZE; j++) {
          const x = i * SPACING;
          const z = j * SPACING;
          // Reduced amplitude (24, 18, 12) for professional look
          const y = (
            Math.sin(x * 0.005 + t) * 24 +
            Math.cos(z * 0.004 - t * 0.8) * 18 +
            Math.sin((x + z) * 0.002 + t * 1.2) * 12
          );
          
          const p = project(x, y, z);
          if (!p) {
            firstV = true;
            continue;
          }
          
          const opacity = Math.max(0, Math.min(0.1, p.scale * 0.3));
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          
          if (firstV) {
            ctx.moveTo(p.x, p.y);
            firstV = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        let firstH = true;
        for (let j = -GRID_SIZE; j <= GRID_SIZE; j++) {
          const z = i * SPACING;
          const x = j * SPACING;
          const y = (
            Math.sin(x * 0.005 + t) * 24 +
            Math.cos(z * 0.004 - t * 0.8) * 18 +
            Math.sin((x + z) * 0.002 + t * 1.2) * 12
          );
          
          const p = project(x, y, z);
          if (!p) {
            firstH = true;
            continue;
          }

          const opacity = Math.max(0, Math.min(0.1, p.scale * 0.3));
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          
          if (firstH) {
            ctx.moveTo(p.x, p.y);
            firstH = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      if (Math.random() > 0.95) {
        pulses.push({
          x: (Math.random() - 0.5) * 2 * GRID_SIZE,
          y: (Math.random() - 0.5) * 2 * GRID_SIZE,
          progress: 0,
          speed: 0.003 + Math.random() * 0.007
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        
        const posX = p.x * SPACING;
        const posZ = (p.y + (p.progress * 20)) * SPACING;
        
        if (p.progress > 1) {
          pulses.splice(i, 1);
          continue;
        }

        const y = Math.sin(posX * 0.005 + t) * 24 + Math.cos(posZ * 0.004 - t * 0.8) * 18;
        const proj = project(posX, y, posZ);
        
        if (proj) {
          const pulseOpacity = Math.max(0, (1 - p.progress) * 0.4);
          const radius = Math.max(0.1, 1.0 * proj.scale);
          
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
          ctx.fill();

          const glowRadius = Math.max(0.1, 6 * proj.scale);
          const gradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, glowRadius);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${pulseOpacity * 0.3})`);
          gradient.addColorStop(1, `transparent`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu bg-brand-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ filter: 'contrast(1.05) brightness(1.05)' }}
      />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,2,0.5)_100%)]" />
      </div>
    </div>
  );
});
