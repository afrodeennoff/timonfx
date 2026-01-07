import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface MarketEvent {
  name: string;
  time: number; // decimal UTC hour
}

interface Session {
  id: string;
  start: number; // UTC decimal
  end: number;   // UTC decimal
  color: string;
}

const EVENTS: MarketEvent[] = [
  { name: 'ASIA OPEN', time: 0 },
  { name: 'FRANKFURT', time: 6 },
  { name: 'LDN OPEN', time: 7 },
  { name: 'NY PRE-MKT', time: 12 },
  { name: 'NY OPEN', time: 13.5 },
  { name: 'LDN CLOSE', time: 15.5 },
  { name: 'NY CLOSE', time: 20 },
];

const SESSIONS: Session[] = [
  { id: 'ASIA', start: 0, end: 6, color: 'bg-blue-500' },
  { id: 'LDN', start: 7, end: 15.5, color: 'bg-indigo-500' },
  { id: 'NY', start: 13.5, end: 20, color: 'bg-brand-purple' }
];

export const MarketStatus: React.FC = React.memo(() => {
  const [time, setTime] = useState<Date | null>(null);
  
  useEffect(() => {
    // Start interval only on mount to prevent hydration mismatch
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

    let statusColor = 'bg-zinc-700';
    if (isOverlap) statusColor = 'bg-brand-red';
    else if (activeSessions.length > 0) statusColor = activeSessions[0].color;

    let next = EVENTS.find(e => e.time > currentDec);
    if (!next) next = EVENTS[0];

    let diff = next.time - currentDec;
    if (diff < 0) diff += 24;

    const diffH = Math.floor(diff);
    const diffM = Math.floor((diff - diffH) * 60);
    const diffS = Math.floor(((diff - diffH) * 60 - diffM) * 60);
    
    const countdown = `-${String(diffH).padStart(2, '0')}:${String(diffM).padStart(2, '0')}:${String(diffS).padStart(2, '0')}`;

    const nyTime = new Date(time);
    nyTime.setHours(time.getUTCHours() - 4);

    return {
      sessionLabel,
      statusColor,
      isOverlap,
      nextEventName: next.name,
      countdown,
      nyTimeString: nyTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      utcTimeString: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' })
    };
  }, [time]);

  if (!data) return null;

  return (
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] pointer-events-none font-mono">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto"
      >
        <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-brand-purple/50 transition-colors duration-500 rounded-sm">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-2 w-2">
                      {data.isOverlap && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${data.statusColor}`}></span>}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${data.statusColor}`}></span>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase min-w-[60px]">
                        {data.sessionLabel}
                    </span>
                </div>
                {data.isOverlap && (
                    <span className="text-[9px] text-brand-red font-black tracking-widest animate-pulse ml-4">
                        HIGH VOLATILITY
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/5">
                <div className="px-5 py-2 flex flex-col justify-center">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-black mb-0.5">UTC (Global)</span>
                    <span className="text-[10px] text-zinc-200 tracking-widest font-bold tabular-nums">{data.utcTimeString}</span>
                </div>
                <div className="px-5 py-2 flex flex-col justify-center">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-black mb-0.5">NY (UTC-4)</span>
                    <span className="text-[10px] text-brand-purple tracking-widest font-bold tabular-nums">{data.nyTimeString}</span>
                </div>
            </div>

            <div className="px-5 py-2.5 bg-black/40 flex justify-between items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-black mb-0.5">Next Event</span>
                    <span className="text-[10px] text-white uppercase tracking-[0.1em] font-black">{data.nextEventName}</span>
                </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-black mb-0.5">T-Minus</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold tabular-nums">{data.countdown}</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
});