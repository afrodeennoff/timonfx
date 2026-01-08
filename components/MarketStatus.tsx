
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GLASS_STYLES, ANIM_SYSTEM } from '../constants';

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

    let statusText = 'MARKET CLOSED';
    let statusColor = 'text-zinc-600';
    let dotColor = 'bg-zinc-800';

    if (activeSessions.length > 0) {
      statusText = `${sessionLabel} SESSION ACTIVE`;
      statusColor = 'text-green-500';
      dotColor = 'bg-green-500';
      
      if (isOverlap) {
        statusText = `${sessionLabel} OVERLAP — CAUTION`;
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
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: ANIM_SYSTEM.revealDuration, ease: ANIM_SYSTEM.ease }}
      className={`fixed bottom-6 left-6 z-[150] pointer-events-none p-4 ${GLASS_STYLES.card} !rounded-[1.25rem] !shadow-[0_16px_32px_rgba(0,0,0,0.4)]`}
    >
      <div className="flex flex-col gap-1.5 items-start">
        <div className="flex items-center gap-2">
          <span className="mono text-[8px] text-zinc-600 uppercase tracking-[0.2em] font-black">UTC</span>
          <span className="mono text-[10px] text-zinc-400 tracking-[0.2em] font-bold tabular-nums">
            {data.utcTimeString}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full ${data.dotColor} opacity-60 shadow-[0_0_6px_rgba(255,255,255,0.02)]`} />
          <span className={`mono text-[9px] font-black tracking-[0.1em] uppercase ${data.statusColor}`}>
            {data.statusText}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
