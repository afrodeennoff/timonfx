
import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, GLASS_STYLES, MOTION_RULES } from '../constants';
import { GhostText } from './GhostText';

const JournalHeader: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-3 py-2 md:px-4 md:py-3 border-r border-white/5 last:border-0">
    <span className="mono text-[8px] md:text-[9px] text-zinc-600 font-black tracking-[0.2em] uppercase italic">{label}</span>
  </div>
);

export const LodgingPage: React.FC = () => {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={VARIANTS.reveal}
      className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full"
    >
      <div className="mb-8 md:mb-10 space-y-3 md:space-y-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          <span className="mono text-[9px] md:text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase italic">EXECUTION_LOGS_v1.0</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
          THE RECORD BEHIND <br />
          <GhostText text="THE SESSION." className="text-transparent transition-colors cursor-default stroke-text" />
        </h2>
      </div>

      <div className={`flex-1 flex flex-col ${GLASS_STYLES.card} overflow-hidden relative group/journal`}>
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Institutional Table Headers */}
        <div className="grid grid-cols-2 md:grid-cols-5 border-b border-white/10 bg-white/[0.02] relative z-10">
          <JournalHeader label="TIME // UTC" />
          <JournalHeader label="ASSET // NODE" />
          <JournalHeader label="ACTION" />
          <div className="hidden md:block">
            <JournalHeader label="RESULT" />
          </div>
          <div className="hidden md:block">
            <JournalHeader label="P&L // NET" />
          </div>
        </div>

        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center space-y-6 md:space-y-8 relative z-10">
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25c.938-.332 1.948-.512 3-.512 2.608 0 4.998.998 6.781 2.625.194.177.484.177.678 0 1.783-1.627 4.173-2.625 6.781-2.625 1.052 0 2.062.18 3 .512V4.262c-.938-.332-1.948-.512-3-.512a8.967 8.967 0 00-6 2.292m0 14.25v-14.25" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-black border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                </div>
              </div>
            </div>
            
            <p className="mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed max-w-xs mx-auto font-bold italic">
              JOURNAL_LEDGER: <span className="text-zinc-700">EMPTY</span>
              <br />
              <span className="opacity-60">Awaiting data expansion from execution terminal.</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:gap-6 pt-6 md:pt-10 border-t border-white/5 w-full max-w-sm">
             <div className="flex items-center gap-3 md:gap-4 opacity-30">
                <span className="mono text-[8px] md:text-[9px] text-zinc-700 uppercase tracking-[0.4em] font-black">
                  SCANNING_FOR_TRADES...
                </span>
             </div>
             
             <div className="flex gap-2 opacity-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
             </div>
          </div>
        </div>
      </div>
      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); } `}</style>
    </motion.div>
  );
};