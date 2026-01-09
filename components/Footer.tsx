
import React from 'react';
import { BRAND_NAME, SOCIAL_LINKS, GLASS_STYLES } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-20 px-6 bg-brand-black border-t border-white/5 overflow-hidden">
      {/* Subtle Light Source */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Top: Branding & Sunday Intel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/5">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none">{BRAND_NAME}</span>
                <span className="text-brand-purple font-black italic text-4xl leading-none">.</span>
              </div>
              <div className="space-y-4">
                <p className="mono text-[11px] text-white uppercase tracking-[0.3em] font-black italic border-l-2 border-brand-purple pl-4">
                  Trading is business. Treat it like one.
                </p>
                <p className="mono text-[11px] text-zinc-500 uppercase tracking-widest leading-loose max-w-md font-bold italic">
                  Professional-grade execution for those who value discipline over hype. We provide the logic; you provide the patience.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-500 hover:text-brand-purple hover:border-brand-purple/50 transition-all duration-300 group/social"
                  aria-label={link.name}
                >
                  {React.cloneElement(link.icon as React.ReactElement<any>, { className: 'w-4 h-4 transition-transform group-hover/social:scale-110' })}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className={`p-8 md:p-10 ${GLASS_STYLES.card} relative overflow-hidden group/intel`}>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover/intel:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <span className="mono text-[9px] text-brand-purple font-black tracking-[0.5em] uppercase">Weekly Intel Drop</span>
                  <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Get the Sunday Outlook.</h4>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="TRADER_EMAIL@DESK.COM" 
                    className="flex-1 bg-white/[0.02] border border-white/10 px-6 py-4 mono text-[10px] text-white uppercase tracking-[0.2em] focus:outline-none focus:border-brand-purple transition-colors rounded-2xl"
                  />
                  <button className={`${GLASS_STYLES.accentButton} ${GLASS_STYLES.accentButtonHover} px-10 py-4`}>
                    <span className="mono text-[10px] font-black uppercase tracking-[0.4em]">Subscribe</span>
                  </button>
                </div>
                <p className="mono text-[9px] text-zinc-700 uppercase tracking-widest font-black italic">
                  * No noise. Only high-signal market logic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Risk Rules & Legal */}
        <div className="pt-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_10px_rgba(255,30,30,0.4)]" />
                <span className="mono text-[10px] text-brand-red font-black uppercase tracking-[0.4em]">Critical Risk Warning</span>
              </div>
              <p className="mono text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed font-bold italic max-w-4xl border-l border-white/10 pl-8">
                Trading futures, options, and forex involves substantial risk of loss and is not suitable for every investor. The valuation of financial instruments may fluctuate, and as a result, clients may lose more than their original investment. The highly leveraged nature of trading means that small market movements will have a great impact on your trading account and this can work against you, leading to large losses or can work for you, leading to large gains.
                <br /><br />
                Performance results are typically presented as hypothetical and do not reflect actual trading. Past performance is not necessarily indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col md:items-end gap-6 h-full justify-between">
              <div className="flex flex-wrap md:justify-end gap-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mono text-[8px] text-zinc-600 uppercase tracking-widest font-black italic">Terms_of_Trading</span>
                <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mono text-[8px] text-zinc-600 uppercase tracking-widest font-black italic">Privacy_Rules</span>
              </div>
              <div className="text-left md:text-right space-y-2">
                <span className="mono text-[10px] text-zinc-700 uppercase tracking-[0.4em] font-black block">
                  TIMON TRADING GROUP LLC.
                </span>
                <span className="mono text-[10px] text-zinc-800 uppercase tracking-[0.2em] font-black">
                  © {currentYear} ALL RIGHTS RESERVED.
                </span>
              </div>
            </div>
          </div>

          {/* Precision Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 opacity-30">
             <div className="flex gap-10">
               <div className="flex items-center gap-2">
                 <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black">Secure</span>
                 <div className="w-1 h-1 rounded-full bg-zinc-600" />
               </div>
               <div className="flex items-center gap-2">
                 <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black">Verified</span>
                 <div className="w-1 h-1 rounded-full bg-zinc-600" />
               </div>
               <div className="flex items-center gap-2">
                 <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black">Latency: 0.2ms</span>
                 <div className="w-1 h-1 rounded-full bg-zinc-600" />
               </div>
             </div>
             <div className="mono text-[8px] text-zinc-800 uppercase tracking-[0.5em] font-black">
                EXECUTION_PRECISION_ACTIVE
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
