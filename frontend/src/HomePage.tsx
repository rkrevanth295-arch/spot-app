import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, MapPinIcon, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Map from './components/Map';
import SpotDetail from './components/SpotDetail';
import BottomNav from './components/BottomNav';
import api from './services/api';
import AIChatWidget from './components/AIChatWidget';

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
  distance?: number;
}

const vibeChips = [
  'Sunset Points', 'Late Night Runs', 'Cheap Thrills', 'Aesthetic AF',
  'Green Escape', 'Chill & Study', 'Street Food Trail', 'First Date Spots'
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

export default function HomePage() {
  const navigate = useNavigate();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Bottom sheet state
  const [sheetHeight, setSheetHeight] = useState(60); // default collapsed: just handle + header
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(60);

  useEffect(() => {
    fetchSpots();
  }, [selectedCategory]);

  async function fetchSpots() {
    try {
      const url = selectedCategory === 'All'
        ? '/spots/?limit=30'
        : `/spots/?category=${encodeURIComponent(selectedCategory)}`;
      const res = await api.get(url);
      setSpots(res.data);
    } catch {
      setSpots([]);
    }
  }

  const handleLocateMe = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(null);
          setTimeout(() => {
            setUserLocation(newLoc);
            setLocating(false);
          }, 150);
        },
        () => setLocating(false)
      );
    }
  };

  const handlePinTap = (spot: Spot) => setSelectedSpot(spot);
  const handleCloseDetail = () => setSelectedSpot(null);

  // Bottom sheet drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = sheetHeight;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startYRef.current;
    const maxHeight = window.innerHeight * 0.65;
    const minHeight = 60;
    const newHeight = startHeightRef.current - deltaY;
    setSheetHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const maxHeight = window.innerHeight * 0.65;
    if (sheetHeight > maxHeight * 0.4) {
      setSheetHeight(maxHeight);
    } else {
      setSheetHeight(60);
    }
  };

  const toggleSheet = () => {
    const maxHeight = window.innerHeight * 0.65;
    setSheetHeight(prev => (prev > 100 ? 60 : maxHeight));
  };

  const isExpanded = sheetHeight > 100;

  return (
    <div className="h-screen bg-[#0B0E11] text-[#F5F5F0] flex flex-col overflow-hidden">
      
      {/* FULL MAP */}
      <div className="absolute inset-0 z-0">
        <Map compact={false} selectedCategory={selectedCategory} searchQuery={searchQuery} onPinTap={handlePinTap} userLocation={userLocation} />
      </div>

      {/* SEARCH */}
      <div className="absolute top-0 left-0 right-0 z-[1000] px-4 pt-4 pointer-events-none">
        <div className="bg-[#151A1F]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl px-4 py-2.5 flex items-center gap-3 pointer-events-auto">
          <Search className="w-4 h-4 text-[#8A8F98]" />
          <input type="text" placeholder="Search spots, neighbourhoods..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[#F5F5F0] placeholder-[#8A8F98] text-sm w-full outline-none" />
        </div>
      </div>

      {/* LOGO + ACTIONS */}
      <div className="absolute top-16 left-0 right-0 z-[1000] px-4 pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="bg-[#151A1F]/80 backdrop-blur-xl rounded-full px-4 py-2 border border-[rgba(255,255,255,0.08)]">
            <span className="text-lg font-bold">
              <span className="text-[#F5F5F0]">SP</span>
              <span className="text-[#FF6B4A]">O</span>
              <span className="text-[#F5F5F0]">T</span>
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/ai-planner')}
              className="bg-[#151A1F]/80 backdrop-blur-xl rounded-full px-4 py-2 border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5 text-sm text-[#F5F5F0]">
              <Zap className="w-3.5 h-3.5 text-[#FF6B4A]" /> Plan
            </button>
            <button onClick={handleLocateMe} disabled={locating}
              className="bg-[#151A1F]/80 backdrop-blur-xl rounded-full w-10 h-10 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <MapPinIcon className={`w-4 h-4 text-[#FF6B4A] ${locating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* VIBE CHIPS */}
      <div className="absolute top-28 left-0 right-0 z-[1000] px-4 pointer-events-none">
        <div className="overflow-x-auto whitespace-nowrap flex gap-2 pb-1 pointer-events-auto">
          {vibeChips.map(chip => (
            <button key={chip} onClick={() => { setSelectedCategory(chip); setSearchQuery(''); }}
              className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                selectedCategory === chip ? 'bg-[#FF6B4A] text-white' : 'bg-[#151A1F]/80 border border-[rgba(255,255,255,0.08)] text-[#F5F5F0]'
              }`}>
              {categoryEmojis[chip] || '📍'} {chip}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM SHEET — anchored at bottom, only top moves */}
      <div className="absolute bottom-20 left-0 right-0 z-[500] pointer-events-none" style={{ height: '70vh' }}>
        <motion.div
          animate={{ height: sheetHeight }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute bottom-0 left-0 right-0 bg-[#151A1F]/95 backdrop-blur-xl rounded-t-3xl border-t border-[rgba(255,255,255,0.08)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
        >
          {/* Drag handle area — attaches custom drag handlers */}
          <div
            className="flex justify-center pt-2.5 pb-1.5 cursor-grab active:cursor-grabbing touch-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="w-10 h-1 bg-[#8A8F98]/40 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-5 pb-2 flex justify-between items-center">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" /> Spots near you
            </h2>
            <button onClick={toggleSheet} className="text-[#8A8F98] text-xs">
              {isExpanded ? '▼' : '▲'}
            </button>
          </div>

          {/* Spot list — visible only when expanded */}
          <div className="px-5 overflow-y-auto space-y-2.5" style={{ height: 'calc(100% - 55px)', paddingBottom: '20px' }}>
            {/* ALL CATEGORIES CARD */}
            <div className="bg-gradient-to-r from-[#FF6B4A]/20 to-[#F5A623]/20 border border-[#FF6B4A]/30 rounded-2xl p-3 mb-2">
              <button onClick={() => navigate('/search')} className="w-full text-left">
                <h3 className="text-sm font-semibold text-[#FF6B4A]">Browse All Categories</h3>
                <p className="text-xs text-[#8A8F98] mt-0.5">29 categories · 161 spots</p>
              </button>
            </div>

            {spots.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#8A8F98] text-sm">Nothing here yet — be the first to drop a pin 📍</p>
              </div>
            ) : (
              spots.map(spot => (
                <motion.div key={spot.id} onClick={() => handlePinTap(spot)}
                  className="bg-[#0B0E11] rounded-2xl overflow-hidden flex gap-3 cursor-pointer border border-[rgba(255,255,255,0.05)] hover:border-[#FF6B4A]/30 transition-all"
                  whileTap={{ scale: 0.98 }}>
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-[#FF6B4A]/15 to-[#F5A623]/15 flex items-center justify-center text-2xl">
                    {categoryEmojis[spot.category] || '📍'}
                  </div>
                  <div className="flex-1 py-2 pr-3">
                    <h3 className="font-semibold text-[#F5F5F0] text-xs">{spot.name}</h3>
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-[#FF6B4A]/15 text-[#FF6B4A] text-[9px] rounded-full">{spot.category}</span>
                    <p className="text-[#8A8F98] text-[11px] mt-1 line-clamp-1">{spot.description}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* SPOT DETAIL */}
      <AnimatePresence>
        {selectedSpot && <SpotDetail spot={selectedSpot} onClose={handleCloseDetail} />}
      </AnimatePresence>
<AIChatWidget />

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}