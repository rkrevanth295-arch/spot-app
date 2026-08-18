import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin } from 'lucide-react';
import api from '../services/api';

interface Spot {
  id: string;
  name: string;
  place?: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  distance?: number;
}

const categoryColors: Record<string, string> = {
  'Sunset Points': 'bg-[#FF6B4A]', 'Late Night Runs': 'bg-[#5D6D7E]',
  'Cheap Thrills': 'bg-[#F5A623]', 'Aesthetic AF': 'bg-[#9B6BFF]',
  'Green Escape': 'bg-[#27AE60]', 'Street Food Trail': 'bg-[#FF6B9B]',
  'Chill & Study': 'bg-[#4AE0C4]', 'First Date Spots': 'bg-[#E91E63]',
};

interface SpotCardProps {
  spot: Spot;
  isSaved?: boolean;
  onSave?: () => void;
  onTap?: () => void;
  compact?: boolean;
}

export default function SpotCard({ spot, isSaved = false, onSave, onTap, compact = false }: SpotCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => { setSaved(isSaved); }, [isSaved]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (saved) await api.delete(`/spots/${spot.id}/save`);
      else await api.post(`/spots/${spot.id}/save`);
      setSaved(!saved);
      onSave?.();
    } catch {}
  };

  const bgColor = categoryColors[spot.category] || 'bg-[#FF6B4A]';

  if (compact) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onTap}
        className="glass-sm rounded-xl overflow-hidden flex gap-2.5 cursor-pointer hover:border-[#FF6B4A]/30 transition-colors"
      >
        <div className="w-[72px] h-[72px] flex-shrink-0 bg-surface overflow-hidden">
          {spot.image_url && !imageError ? (
            <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" onError={() => setImageError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B4A]/20 to-[#F5A623]/10 text-2xl">📍</div>
          )}
        </div>
        <div className="flex-1 py-2 pr-2 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">{spot.name}</h3>
          <span className={`inline-block mt-0.5 px-1.5 py-0.5 ${bgColor} text-white text-[9px] rounded-full font-medium`}>{spot.category}</span>
          {spot.distance != null && (
            <p className="text-[#FF6B4A] text-[10px] font-medium mt-1">{spot.distance.toFixed(1)} km</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className="bg-card rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer group shadow-card"
    >
      <div className="relative h-36 bg-surface overflow-hidden">
        {spot.image_url && !imageError ? (
          <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImageError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-background">
            <span className="text-3xl opacity-30">📍</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-2 left-2 ${bgColor} text-white text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide`}>
          {spot.category}
        </span>
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            saved ? 'bg-primary text-white' : 'bg-black/40 backdrop-blur-sm text-white'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm leading-tight">{spot.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-muted text-[11px]">
          <MapPin className="w-3 h-3" />
          <span>{spot.place || 'Hyderabad'}</span>
        </div>
        {spot.description && (
          <p className="text-muted text-xs mt-1.5 line-clamp-2 leading-relaxed">{spot.description}</p>
        )}
      </div>
    </motion.div>
  );
}
