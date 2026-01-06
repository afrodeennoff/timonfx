
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { AIMessage } from '../types';

export const AIStrategyArchitect: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    { 
      role: 'model',
      text: 'MARKET CHAT ACTIVE. INSIGHTS READY. ENTER YOUR QUESTIONS FOR ANALYSIS.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageText = input;
    const userMessage: AIMessage = {
      role: 'user',
      text: userMessageText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are the ORK Insights Chat, a senior trading analyst. You specialize in execution windows, price action, and liquidity mapping. Your tone is calm, professional, and market-focused. Use terms like "price action", "liquidity", "market structure", and "risk-to-reward". Avoid robotic or overly technical jargon. Keep responses concise and focused on execution.',
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result: GenerateContentResponse = await chat.sendMessage({ message: userMessageText });
      const modelText = result.text || 'ERROR: UNABLE TO DECODE RESPONSE.';
      
      setMessages(prev => [...prev, {
        role: modelText.includes('ERROR') ? 'model' : 'model',
        text: modelText,
        timestamp: Date.now(),
      }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'CONNECTION ERROR: PLEASE RE-TRY.',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200]"
            aria-hidden="true"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#020202] border-l border-white/20 z-[201] flex flex-col shadow-2xl shadow-brand-purple/20"
            role="dialog"
            aria-label="Market Insights Chat"
          >
             <div className="p-8 border-b border-white/10 flex justify-between items-center bg-zinc-950/80">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-brand-purple animate-pulse shadow-[0_0_15px_rgba(139,92,246,1)]" />
                  <span className="mono text-xs text-white font-black tracking-[0.4em] uppercase">TRADER CHAT</span>
                </div>
                <button 
                  onClick={onClose}
                  className="mono text-[10px] text-zinc-500 hover:text-white transition-colors font-black border border-white/10 px-4 py-2 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-purple"
                  aria-label="Close Chat"
                >
                  [ DISCONNECT ]
                </button>
             </div>

             <div 
               ref={scrollRef}
               className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide"
               role="log"
               aria-live="polite"
             >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[90%] p-6 mono text-[11px] md:text-xs leading-relaxed tracking-widest relative overflow-hidden ${
                      msg.role === 'user' 
                        ? 'bg-brand-purple text-white font-black border border-white/30' 
                        : 'bg-zinc-900/30 text-zinc-100 font-bold border border-white/10'
                    }`}>
                      <div className="mb-4 flex justify-between gap-8 opacity-40 text-[8px] font-black uppercase">
                        <span>{msg.role === 'user' ? 'TRADER' : 'ANALYST'}</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="relative z-10 whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      {msg.role === 'model' && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-purple/5 rotate-45 translate-x-8 -translate-y-8" />
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 p-4 border border-brand-purple/20 bg-brand-purple/5"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-purple animate-ping rounded-full" />
                    <span className="mono text-[9px] text-brand-purple font-black tracking-[0.5em] uppercase">Analyzing...</span>
                  </motion.div>
                )}
             </div>

             <div className="p-8 border-t border-white/10 bg-zinc-950/50 backdrop-blur-xl">
                <div className="flex gap-4">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="ENTER QUESTIONS..." 
                    className="flex-1 bg-zinc-950 border border-white/20 p-6 mono text-[11px] text-white uppercase tracking-widest focus:outline-none focus:border-brand-purple font-black placeholder:text-zinc-800 transition-colors caret-brand-purple"
                    aria-label="Message Input"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="px-10 bg-brand-purple hover:bg-white text-white hover:text-black transition-all mono text-[11px] font-black uppercase tracking-widest disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    ASK
                  </button>
                </div>
                <div className="mt-4 flex justify-between px-2">
                   <span className="mono text-[8px] text-zinc-600 font-black tracking-widest uppercase">Private Chat</span>
                   <span className="mono text-[8px] text-zinc-600 font-black tracking-widest uppercase">Status: OK</span>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
