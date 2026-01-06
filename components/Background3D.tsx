import React from 'react';

export const Background3D: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
      {/* Base Noise Layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Atmospheric Glows - Reduced blur for performance */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-white/5 rounded-full blur-[60px] pointer-events-none transform-gpu" />
    </div>
  );
});