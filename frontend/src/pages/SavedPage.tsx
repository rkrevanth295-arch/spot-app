import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Loader2, MapPin } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
}

export default function SavedPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadSaved() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/spots/saved/mine');
        setSpots(res.data);
      } catch {}
      setLoading(false);
    }
    loadSaved();
  }, [user]);

  async function removeSave(spotId: string) {
    try {
      await api.delete(`/spots/${spotId}/save`);
      setSpots(prev => prev.filter(s => s.id !== spotId));
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] pb-24">
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-[#F5F5F0]">Saved Spots</h1>
        <p className="text-sm text-[#8A8F98] mb-5">Your personal collection</p>
      </div>

      <div className="px-5">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-[#FF6B4A]" />
          </div>
        ) : spots.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-12 h-12 text-[#8A8F98]/30 mx-auto mb-3" />
            <p className="text-[#8A8F98]">No saved spots yet</p>
            <p className="text-sm text-[#8A8F98]/60 mt-1">Explore and save spots you love</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spots.map((spot) => (
              <motion.div
                key={spot.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/spot/${spot.id}`)}
                className="bg-[#151A1F] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] cursor-pointer"
              >
                <div className="h-40 bg-[#111D22] flex items-center justify-center text-4xl">
                  {spot.image_url ? (
                    <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" />
                  ) : '📍'}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-[#F5F5F0] text-sm">{spot.name}</h3>
                  <p className="text-[#8A8F98] text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Hyderabad
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSave(spot.id); }}
                    className="mt-2 text-xs text-[#FF6B4A] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}