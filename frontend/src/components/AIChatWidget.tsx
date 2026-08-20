import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import api from '../services/api';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hey! Ask me about hidden spots in Hyderabad 🌟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/ai/chat', { message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', text: cleanText(res.data.reply) }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, AI is taking a nap. Try again!' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* AI button LEFT of Plan — fine-tuned position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-16 right-36 z-[1000] bg-[#151A1F]/80 backdrop-blur-xl rounded-full px-4 py-2 border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5 text-sm text-[#F5F5F0]"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#FF6B4A]" /> AI
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#FF6B4A] text-white rounded-br-md'
                      : 'bg-[#0B0E11] text-[#F5F5F0] rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#0B0E11] px-3 py-2 rounded-2xl text-sm text-[#8A8F98]">
                    Thinking...
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
                className="flex-1 bg-[#0B0E11] px-3 py-2 rounded-xl text-sm text-[#F5F5F0] outline-none"
              />
              <button onClick={sendMessage} className="w-10 h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;