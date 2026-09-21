import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import api from '../services/api';

function TypewriterText({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(reduceMotion ? text.length : 0);

  useEffect(() => {
    setVisible(reduceMotion ? text.length : 0);
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setVisible((current) => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 2;
      });
    }, 16);
    return () => window.clearInterval(timer);
  }, [text, reduceMotion]);

  return <>{text.slice(0, visible)}</>;
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hey! Ask me about hidden spots in Hyderabad 🌟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const cleanText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\//g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim().slice(0, 400);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/ai/chat', { message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', text: cleanText(res.data.reply) }]);
    } catch (err: any) {
      const status = err?.response?.status;
      const text = status === 401
        ? 'Log in to chat with SPOT AI.'
        : 'Sorry, AI is taking a nap. Try again!';
      setMessages(prev => [...prev, { role: 'ai', text }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* AI button — perfectly aligned with Plan button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        aria-label="Open SPOT AI"
        className="fixed bottom-[4.75rem] right-3 z-[800] w-11 h-11 rounded-full bg-[#151A1F]/90 backdrop-blur-xl border border-white/[0.08] flex items-center justify-center shadow-card"
      >
        <MessageCircle className="w-4 h-4 text-[#FF6B4A]" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0.18 } : { type: 'spring', stiffness: 360, damping: 25, bounce: 0.14 }}
            className="fixed top-28 right-4 z-[2000] w-[calc(100%-2rem)] max-w-sm bg-[#151A1F] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-2xl overflow-hidden"
          >
            <div className="bg-[#0B0E11] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <span className="font-semibold text-sm">SPOT AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4 text-[#8A8F98]" />
              </button>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={`${msg.role}-${i}-${msg.text}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#FF6B4A] text-white rounded-br-md'
                      : 'bg-[#0B0E11] text-[#F5F5F0] rounded-bl-md'
                  }`}>
                    {msg.role === 'ai' ? <TypewriterText text={msg.text} /> : msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#0B0E11] px-3 py-2 rounded-2xl text-sm text-[#8A8F98]">
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 flex gap-2 border-t border-[rgba(255,255,255,0.06)]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about spots..."
                maxLength={400}
                className="flex-1 bg-[#0B0E11] px-3 py-2 rounded-xl text-sm text-[#F5F5F0] outline-none"
              />
              <motion.button whileTap={reduceMotion ? undefined : { scale: 0.97 }} onClick={sendMessage} className="w-10 h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
