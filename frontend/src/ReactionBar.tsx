import React from 'react';
import { REACTIONS } from './lib/constants';
import { motion } from 'framer-motion';

interface Props {
  reactions?: { emoji: string }[];
  userReactions?: string[];
  onReact: (emojiId: string) => void;
}

export default function ReactionBar({ reactions = [], userReactions = [], onReact }: Props) {
  const counts: { [key: string]: number } = {};
  reactions.forEach((r) => {
    counts[r.emoji] = (counts[r.emoji] || 0) + 1;
  });

  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map((r: { id: string; emoji: string }) => {
        const count = counts[r.id] || 0;
        const active = userReactions.includes(r.id);
        return (
          <motion.button
            key={r.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReact(r.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
              active
                ? 'bg-[#FF6B4A]/20 border border-[#FF6B4A]/40 text-[#F5F5F0]'
                : 'bg-[#151A1F]/60 border border-transparent text-[#8A8F98] hover:bg-[#151A1F]'
            }`}
          >
            <span className="text-base">{r.emoji}</span>
            {count > 0 && <span className="font-semibold text-xs">{count}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}