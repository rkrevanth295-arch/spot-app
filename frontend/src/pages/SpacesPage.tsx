import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const spaces = [
  { name: 'Sunset Chasers', tagline: 'Best city viewpoints', members: 28 },
  { name: 'Street Food Crew', tagline: 'Eat, explore, repeat', members: 14 },
  { name: 'Study & Chill', tagline: 'Cafe corners and quiet nooks', members: 9 },
];

export default function SpacesPage() {
  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24">
      <div className="px-5 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Spaces</h1>
            <p className="text-sm text-[#8A8F98] mt-1">Join curated communities and local hangouts</p>
          </div>
          <div className="bg-[#151A1F]/80 rounded-3xl p-3">
            <Users className="w-6 h-6 text-[#FF6B4A]" />
          </div>
        </div>

        <div className="mt-7 space-y-4">
          {spaces.map((space) => (
            <div key={space.name} className="rounded-3xl bg-[#151A1F]/90 border border-[rgba(255,255,255,0.08)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#F5F5F0]">{space.name}</h2>
                  <p className="text-sm text-[#8A8F98] mt-1">{space.tagline}</p>
                </div>
                <span className="text-xs text-[#8A8F98]">{space.members} members</span>
              </div>
              <div className="mt-4 rounded-2xl bg-[#0B0E11]/90 p-3 flex items-center gap-3 text-sm text-[#8A8F98] border border-[rgba(255,255,255,0.06)]">
                <Sparkles className="w-4 h-4 text-[#FF6B4A]" /> Active now near <span className="text-white">Hyderabad</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
