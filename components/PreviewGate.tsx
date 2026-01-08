
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';

interface PreviewGateProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalLine: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.32, ease: ANIM_SYSTEM.ease }}
    className="flex justify-between items-center py-2 border-b border-white/5"
  >
    <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black">{label}</span>
    <span className="mono text-[8px] text-brand-purple font-black tracking-widest">{value}</span>
  </motion.div>
);

export const PreviewGate: React.FC<PreviewGateProps> = ({ isOpen, onClose }) => {
  const [initSequence, setInitSequence] = useState(0);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMsg, setStatusMsg] = useState('AWAITING_INPUT');

  useEffect(() => {
    if (isOpen) {
      const timers = [
        setTimeout(() => setInitSequence(1), 300),
        setTimeout(() => setInitSequence(2), 600),
        setTimeout(() => setInitSequence(3), 900),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    } else {
      setInitSequence(0);
      setAuthCode('');
      setIsVerifying(false);
      setStatusMsg('AWAITING_INPUT');
    }
  }, [isOpen]);

  const handleInitialize = () => {
    if (!authCode) {
      setStatusMsg('ERROR: EMPTY_CODE');
      return;
    }
    setIsVerifying(true);
    setStatusMsg('VERIFYING_CREDENTIALS...');
    
    setTimeout(() => {
      setIsVerifying(false);
      setStatusMsg('ERROR: INVALID_CLEARANCE');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[300]"
          />
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.32, ease: ANIM_SYSTEM.ease }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[301] p-[1px] bg-gradient-to-br from-white/20 to-transparent shadow-2xl overflow-hidden rounded-[2.5rem]"
          >
             <div className={`p-10 md:p-14 relative overflow-hidden rounded-[2.5rem] ${GLASS_STYLES.card}`}>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                   {/* Left Side: System Status */}
                   <div className="w-full md:w-1/2 space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-brand-purple rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                           <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Terminal_Online</span>
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                          ORK <br />
                          <span className="text-zinc-700">LODGING</span>
                        </h2>
                      </div>

                      <div className="space-y-1 pt-4">
                         <TerminalLine label="Identity Check" value={initSequence >= 1 ? "PENDING..." : "WAITING"} delay={0.1} />
                         <TerminalLine label="Encryption" value={initSequence >= 2 ? "AES_256_ACTIVE" : "DISABLED"} delay={0.2} />
                         <TerminalLine label="Node Sync" value={initSequence >= 3 ? "STABLE" : "INITIATING"} delay={0.3} />
                         <TerminalLine label="Status" value={statusMsg} delay={0.4} />
                      </div>

                      <p className="mono text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed font-bold border-l border-brand-purple/30 pl-4">
                        THIS SECURE PORTAL IS RESERVED FOR REGISTERED OPERATORS ONLY. UNAUTHORIZED ATTEMPTS ARE LOGGED.
                      </p>
                   </div>

                   {/* Right Side: Action Portal */}
                   <div className="w-full md:w-1/2 space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                           <span className="mono text-[9px] text-zinc-600 font-black tracking-widest uppercase">Required Clearance</span>
                           <motion.input 
                             placeholder="AUTH_CODE_KEY..." 
                             value={authCode}
                             onChange={(e) => setAuthCode(e.target.value)}
                             whileFocus={VARIANTS.inputFocus}
                             className="w-full bg-zinc-950 border border-white/10 p-5 mono text-[11px] text-white uppercase tracking-[0.3em] focus:outline-none focus:border-brand-purple font-black placeholder:text-zinc-800 transition-colors rounded-2xl"
                           />
                        </div>
                        
                        <motion.button 
                           whileHover={VARIANTS.buttonHover}
                           whileTap={VARIANTS.buttonTap}
                           disabled={isVerifying}
                           onClick={handleInitialize}
                           className={`group relative w-full py-5 rounded-full mono text-[11px] font-black text-white uppercase tracking-[0.4em] transition-all duration-500 ${isVerifying ? 'opacity-50 cursor-wait' : `${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}`}
                        >
                           <span className="relative z-10">
                             {isVerifying ? 'SYNCING...' : 'INITIALIZE ACCESS'}
                           </span>
                        </motion.button>
                      </div>

                      <button 
                        onClick={onClose}
                        className={`w-full py-4 rounded-full mono text-[9px] text-zinc-600 hover:text-white uppercase tracking-[0.6em] transition-all font-black ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}
                      >
                        Abort Connection
                      </button>
                   </div>
                </div>

                <div className="absolute -bottom-8 -right-8 opacity-5">
                   <svg width="200" height="200" viewBox="0 0 100 100" className="rotate-45">
                      <rect x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.1" />
                   </svg>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
