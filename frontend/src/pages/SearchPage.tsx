import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import api from '../services/api';

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
}

const allCategories = [
  'Sunset Points', 'Late Night Runs', 'Cheap Thrills', 'Aesthetic AF',
  'Green Escape', 'Old City Secrets', 'Creative Corners', 'Bike Points',
  'Chill & Study', 'Underrated AF', 'Group Hangout', 'Monsoon Special',
  'Local Bazaar', 'Street Food Trail', 'Waterside', 'Adrenaline Zone',
  'Late Night Eats', 'Culture Fix', 'City Lights View', 'Pet-Friendly',
  'Gaming Zones', 'Weekend Getaway', 'Peace Out', 'Drink & Chill',
  'Movie Nights', 'Skate Spots', 'Instagram Bloom', 'Hidden Ruins', 'First Date Spots'
];

const categoryEmojis: { [key: string]: string } = {
  'Sunset Points': '🌅', 'Late Night Runs': '🌙', 'Cheap Thrills': '💰',
  'Aesthetic AF': '📸', 'Green Escape': '🌳', 'Old City Secrets': '🏛️',
  'Creative Corners': '🎨', 'Bike Points': '🏍️', 'Chill & Study': '☕',
  'Underrated AF': '🔥', 'Group Hangout': '🎉', 'Monsoon Special': '🌧️',
  'Local Bazaar': '🛍️', 'Street Food Trail': '🍜', 'Waterside': '🌊',
  'Adrenaline Zone': '⚡', 'Late Night Eats': '🍽️', 'Culture Fix': '🎭',
  'City Lights View': '🌃', 'Pet-Friendly': '🐾', 'Gaming Zones': '🎮',
  'Weekend Getaway': '🏕️', 'Peace Out': '🧘', 'Drink & Chill': '🍸',
  'Movie Nights': '🎬', 'Skate Spots': '🛹', 'Instagram Bloom': '🌸',
  'Hidden Ruins': '🗿', 'First Date Spots': '💕',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpots();
  }, [selectedCategory]);

  async function fetchSpots() {
    setLoading(true);
    try {
      const url = selectedCategory === 'All' 
        ? '/spots/?limit=50' 
        : `/spots/?category=${encodeURIComponent(selectedCategory)}`;
      const res = await api.get(url);
      setSpots(res.data);
    } catch {}
    setLoading(false);
  }

  async function handleSearch() {
    if (!query.trim()) { fetchSpots(); return; }
    setLoading(true);
    try {
      const res = await api.get(`/spots/search/?q=${encodeURIComponent(query)}`);
      setSpots(res.data);
    } catch {}
    setLoading(false);
  }

  const filteredSpots = query.trim() 
    ? spots.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.description?.toLowerCase().includes(query.toLowerCase()))
    : spots;

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24">
      <div className="px-5 pt-8">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[#151A1F]/80 border border-[rgba(255,255,255,0.08)] rounded-3xl px-4 py-3">
          <Search className="w-5 h-5 text-[#8A8F98]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search spots, vibes, and locales"
            className="w-full bg-transparent text-sm text-[#F5F5F0] placeholder-[#8A8F98] outline-none"
          />
          {query && (
            <button onClick={() => { setQuery(''); fetchSpots(); }} className="text-[#8A8F98] text-sm">Clear</button>
          )}
        </div>

        {/* BROWSE CATEGORIES HEADER */}
        <h2 className="text-lg font-semibold text-[#F5F5F0] mt-6 mb-3">Browse Categories</h2>

        {/* ALL CATEGORIES */}
        <div>
          <button
            onClick={() => { setSelectedCategory('All'); setQuery(''); }}
            className={`rounded-full px-4 py-2 text-sm mr-2 mb-2 ${selectedCategory === 'All' ? 'bg-[#FF6B4A] text-white' : 'bg-[#151A1F]/80 border border-[rgba(255,255,255,0.08)] text-[#F5F5F0]'}`}
          >
            All
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setQuery(''); }}
              className={`rounded-full px-4 py-2 text-sm mr-2 mb-2 transition-all ${selectedCategory === cat ? 'bg-[#FF6B4A] text-white' : 'bg-[#151A1F]/80 border border-[rgba(255,255,255,0.08)] text-[#F5F5F0]'}`}
            >
              {categoryEmojis[cat] || '📍'} {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {selectedCategory === 'All' ? 'All Spots' : selectedCategory}
            </h1>
            <span className="text-sm text-[#8A8F98]">{filteredSpots.length} spots</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#8A8F98]">Loading...</div>
          ) : filteredSpots.length === 0 ? (
            <div className="text-center py-12 text-[#8A8F98]">
              Nothing here yet — be the first to drop a pin 📍
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSpots.map(spot => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-[#151A1F]/90 border border-[rgba(255,255,255,0.08)] p-4 flex items-center gap-4"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-[#FF6B4A]/15 to-[#F5A623]/15 rounded-2xl flex items-center justify-center text-2xl">
                    {categoryEmojis[spot.category] || '📍'}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-[#F5F5F0]">{spot.name}</h2>
                    <p className="text-xs text-[#8A8F98] mt-0.5">{spot.category}</p>
                    {spot.description && <p className="text-xs text-[#8A8F98] mt-1 line-clamp-1">{spot.description}</p>}
                  </div>
                  <span className="text-[#8A8F98] text-xs flex items-center gap-1 shrink-0">
                    <MapPin className="w-3 h-3" /> Hyd
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}