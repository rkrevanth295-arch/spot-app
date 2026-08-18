import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Share2, Navigation, MapPin, X, CheckCircle, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
}

const categoryIcons: { [key: string]: string } = {
  'Sunset Points': '🌅', 'Late Night Runs': '🌙', 'Cheap Thrills': '☕',
  'Aesthetic AF': '📸', 'Green Escape': '🌳', 'Old City Secrets': '🏛️',
  'Creative Corners': '🎨', 'Bike Points': '🏍️', 'Chill & Study': '🎧',
  'Underrated AF': '🔥', 'Group Hangout': '🎉', 'Street Food Trail': '🍜',
  'Waterside': '🌊', 'Adrenaline Zone': '🎢', 'Late Night Eats': '🕯️',
  'Culture Fix': '🎭', 'City Lights View': '🌃', 'Peace Out': '🧘',
  'Drink & Chill': '🍺', 'First Date Spots': '💕', 'Hidden Ruins': '🗿',
};

export default function SpotDetail({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const [isSaved, setIsSaved] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const { user } = useAuth();
  const icon = categoryIcons[spot.category] || '📍';

  useEffect(() => {
    async function fetchSaved() {
      if (!user) return;
      try {
        const res = await api.get('/spots/saved/mine');
        setIsSaved(res.data.some((s: Spot) => s.id === spot.id));
      } catch {}
    }
    fetchSaved();
  }, [spot.id, user]);

  async function handleSave() {
    if (!user) return;
    try {
      if (isSaved) {
        await api.delete(`/spots/${spot.id}/save`);
      } else {
        await api.post(`/spots/${spot.id}/save`);
      }
      setIsSaved(!isSaved);
    } catch {}
  }

  function handleDirections() {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`, '_blank');
  }

  function handleShare() {
    navigator.clipboard.writeText(`${window.location.origin}/spot/${spot.id}`);
    alert('Link copied! 📋');
  }

  async function handleCheckIn() {
    if (!user) return;
    setCheckingIn(true);
    if (!navigator.geolocation) {
      alert('GPS not available');
      setCheckingIn(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const dist = getDistance(pos.coords.latitude, pos.coords.longitude, spot.latitude, spot.longitude);
        if (dist <= 100) {
          alert('✅ Checked in! +30 pts!');
        } else {
          alert(`Too far! ${Math.round(dist)}m away. Get within 100m.`);
        }
        setCheckingIn(false);
      },
      () => { alert('Location denied'); setCheckingIn(false); }
    );
  }

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-[10000] bg-[#0B0E11] overflow-y-auto"
    >
      <div className="relative">
        {spot.image_url ? (
          <img src={spot.image_url} alt={spot.name} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 bg-[#151A1F] flex items-center justify-center text-6xl">{icon}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11] via-transparent to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-black/50 backdrop-blur text-white">
            {icon} {spot.category}
          </span>
        </div>
      </div>

      <div className="px-5 pb-32 -mt-6 relative">
        <h1 className="text-2xl font-bold text-[#F5F5F0]">{spot.name}</h1>
        <p className="text-[#8A8F98] flex items-center gap-1.5 mt-2"><MapPin className="w-4 h-4" /> Hyderabad</p>
        {spot.description && <p className="text-sm text-[#8A8F98] mt-4 leading-relaxed">{spot.description}</p>}

        <div className="flex gap-3 mt-6">
          <button onClick={handleSave}
            className={`flex-1 h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2 ${isSaved ? 'bg-[#FF6B4A] text-white' : 'bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.1)]'}`}>
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} /> {isSaved ? 'Saved' : 'Save'}
          </button>
          <button onClick={handleShare} className="flex-1 h-12 rounded-xl font-medium text-sm bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.1)] flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={handleDirections} className="flex-1 h-12 rounded-xl font-medium text-sm bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.1)] flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" /> Go
          </button>
        </div>

        <button onClick={handleCheckIn} disabled={checkingIn}
          className="w-full mt-3 h-12 rounded-xl bg-gradient-to-r from-[#FF6B4A] to-[#F5A623] text-white font-semibold flex items-center justify-center gap-2">
          {checkingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          {checkingIn ? 'Verifying...' : 'Check In (+30 pts)'}
        </button>
      </div>
    </motion.div>
  );
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
