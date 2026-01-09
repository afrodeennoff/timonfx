
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
// Fixed: Using MOTION_RULES instead of non-existent ANIM_SYSTEM
import { GLASS_STYLES, MOTION_RULES } from '../constants';

interface Session {
  id: string;
  start: number; 
  end: number;   
  color: string;
}

const SESSIONS: Session[] = [
  { id: 'ASIA', start: 0, end: 6, color: 'text-blue-400' },
  { id: 'LDN', start: 7, end: 15.5, color: 'text-indigo-400' },
  { id: 'NY', start: 13.5, end: 20, color: 'text-brand-purple' }
];

export const MarketStatus: React.FC = React.memo(() => {
  const [time, setTime] = useState<Date | null>(null);
  
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    if (!time) return null;

    const h = time.getUTCHours();
    const m = time.getUTCMinutes();
    const s = time.getUTCSeconds();
    const currentDec = h + m / 60 + s / 3600;

    const activeSessions = SESSIONS.filter(session => {
        return currentDec >= session.start && currentDec < session.end;
    });

    const isOverlap = activeSessions.length > 1;
    const sessionLabel = activeSessions.length > 0 
        ? activeSessions.map(s => s.id).join(' / ') 
        : 'OFF-HOURS';

    let statusText = 'CLOSED';
    let statusColor = 'text-zinc-600';
    let dotColor = 'bg-zinc-800';

    if (activeSessions.length > 0) {
      statusText = `${sessionLabel}`;
      statusColor = 'text-green-500';
      dotColor = 'bg-green-500';
      
      if (isOverlap) {
        statusText = `OVERLAP`;
        statusColor = 'text-amber-500';
        dotColor = 'bg-amber-500';
      }
    }

    const utcTimeString = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' });

    return {
      statusText,
      statusColor,
      dotColor,
      utcTimeString
    };
  }, [time]);

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Fixed: Using MOTION_RULES instead of non-existent ANIM_SYSTEM
      transition={{ duration: MOTION_RULES.revealDuration, ease: MOTION_RULES.ease }}
      className={`fixed bottom-2 left-2 md:bottom-3 md:left-3 z-[150] pointer-events-none p-2 md:p-2.5 ${GLASS_STYLES.card} !rounded-[1.25rem] shadow-2xl backdrop-blur-xl`}
    >
      <div className="flex flex-row md:flex-col gap-1 items-center md:items-start">
        <div className="flex items-center gap-2 border-r md:border-r-0 border-white/10 pr-2 md:pr-0">
          <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black">UTC</span>
          <span className="mono text-[9px] md:text-[10px] text-zinc-400 tracking-widest font-bold tabular-nums">
            {data.utcTimeString}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full ${data.dotColor} shadow-[0_0_6px_rgba(255,255,255,0.02)]`} />
          <span className={`mono text-[8px] md:text-[9px] font-black tracking-widest uppercase ${data.statusColor}`}>
            {data.statusText}
          </span>
        </div>
      </div>
    </motion.div>
  );
});