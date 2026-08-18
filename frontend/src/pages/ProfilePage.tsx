import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, MapPin, Star, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getLevel, getLevelProgress, BADGES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [totalPoints] = useState(120); // TODO: fetch from backend
  const [badges] = useState<string[]>(['first_spot']);
  const [checkInCount] = useState(3);
  const [spotCount] = useState(1);
  const [loading] = useState(false);

  const level = getLevel(totalPoints);
  const progress = getLevelProgress(totalPoints);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF6B4A]/30 border-t-[#FF6B4A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] pb-24">
      <div className="mx-4 mt-6 rounded-2xl bg-gradient-to-br from-[#FF6B4A]/20 to-[#F5A623]/20 border border-[rgba(255,255,255,0.08)] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B4A] to-[#F5A623] flex items-center justify-center text-2xl font-bold text-white">
            {user?.username?.[0]?.toUpperCase() || 'S'}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#F5F5F0]">{user?.username || 'Explorer'}</h1>
            <p className="text-sm text-[#8A8F98]">{user?.email}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl">{level.emoji}</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-[#F5F5F0]">{level.name}</span>
              <span className="text-xs text-[#8A8F98]">{totalPoints} pts</span>
            </div>
            <div className="h-2 bg-[#151A1F] rounded-full">
              <div className="h-2 bg-[#FF6B4A] rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 mt-5">
        {[
          { icon: MapPin, label: 'Spots Added', value: spotCount },
          { icon: Star, label: 'Check-ins', value: checkInCount },
          { icon: Trophy, label: 'Badges', value: badges.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#151A1F] rounded-xl p-4 border border-[rgba(255,255,255,0.06)] text-center">
            <stat.icon className="w-5 h-5 text-[#FF6B4A] mx-auto mb-1" />
            <p className="text-xl font-bold text-[#F5F5F0]">{stat.value}</p>
            <p className="text-[11px] text-[#8A8F98]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-[#F5F5F0] mb-3">Badges</h2>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((b: { id: string; emoji: string; name: string }) => {
            const unlocked = badges.includes(b.id);
            return (
              <motion.div
                key={b.id}
                className={`rounded-xl p-3 text-center border transition-all ${
                  unlocked
                    ? 'bg-[#151A1F] border-[#FF6B4A]/30'
                    : 'bg-[#151A1F]/30 border-[rgba(255,255,255,0.06)] opacity-40'
                }`}
              >
                <span className="text-2xl block">{b.emoji}</span>
                <p className="text-[10px] font-medium mt-1 text-[#8A8F98]">{b.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-6">
        <button onClick={logout} className="w-full h-12 rounded-xl bg-[#151A1F] text-[#FF6B4A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}