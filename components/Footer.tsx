import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_NAME, SOCIAL_LINKS } from '../constants';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const FooterLink: React.FC<{ id: string; label: string }> = ({ id, label }) => (
  <button 
    onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
    className="mono text-left text-[11px] text-zinc-500 hover:text-white uppercase tracking-[0.2em] font-medium transition-all duration-300 focus:outline-none"
  >
    {label}
  </button>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-24 px-6 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          
          {/* Brand Block */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">{BRAND_NAME}</span>
            </div>
            <p className="mono text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed max-w-xs font-medium italic">
              Focused on the process, not the noise. Trading is a journey of clarity, discipline, and consistent execution.
            </p>
          </div>

          {/* Navigation Block */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <FooterLink id="hero" label="Home" />
              <FooterLink id="about" label="About" />
              <FooterLink id="edge" label="Education" />
              <FooterLink id="coupon" label="Prop Firms" />
            </div>
            <div className="flex flex-col gap-4">
              <FooterLink id="join" label="Pricing" />
              <FooterLink id="testimonial" label="Testimonials" />
              <FooterLink id="faq" label="FAQ" />
              <FooterLink id="join" label="Join" />
            </div>
          </div>

          {/* Community / Contact Block */}
          <div className="md:col-span-3 flex flex-col md:items-end gap-8">
            <div className="flex flex-col md:items-end gap-2">
              <span className="mono text-[10px] text-zinc-700 uppercase tracking-[0.6em] font-black">Connect</span>
              <div className="flex gap-6 mt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-white transition-opacity duration-300 opacity-60 hover:opacity-100"
                    aria-label={link.name}
                  >
                    {React.cloneElement(link.icon, { className: 'w-4 h-4' })}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <span className="mono text-[10px] text-zinc-700 uppercase tracking-widest font-black">Inquiries</span>
              <a href="mailto:desk@timontrading.com" className="mono text-[11px] text-zinc-400 hover:text-brand-purple transition-colors uppercase tracking-widest">
                desk@timontrading.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal / Meta Block */}
        <div className="mt-24 space-y-8">
          <div className="max-w-4xl">
            <p className="mono text-[10px] text-zinc-600 uppercase tracking-widest leading-loose font-medium italic">
              Risk Disclosure: Trading futures and options involves substantial risk and is not for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing ones’ financial security or life style. Only risk capital should be used for trading and only those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of future results.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
            <div className="flex items-center gap-4">
              <span className="mono text-[10px] text-zinc-700 uppercase tracking-widest font-black">
                © {currentYear} {BRAND_NAME}
              </span>
            </div>
            
            <div className="flex items-center gap-6 opacity-30">
               <span className="mono text-[9px] text-zinc-700 uppercase tracking-[0.4em] font-black">
                 Private Access
               </span>
               <div className="flex gap-1.5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-zinc-800 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};