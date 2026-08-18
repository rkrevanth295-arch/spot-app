import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpotCard from './SpotCard';
import { Loader2 } from 'lucide-react';

const PEEK = 150;
const FULL_OFFSET = 90;

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
}

interface Props {
  spots: Spot[];
  loading: boolean;
  bookmarks: string[];
  onBookmark: (id: string) => void;
  onSpotClick: (spot: Spot) => void;
}

export default function DiscoverBottomSheet({ spots, loading, bookmarks, onBookmark, onSpotClick }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        if (info.offset.y < -60) setExpanded(true);
        else if (info.offset.y > 60) setExpanded(false);
      }}
      animate={{ height: expanded ? `calc(100% - ${FULL_OFFSET}px)` : PEEK }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute left-0 right-0 bottom-0 z-[500] bg-[#151A1F]/95 backdrop-blur-xl rounded-t-3xl border-t border-[rgba(255,255,255,0.08)] shadow-2xl overflow-hidden touch-none"
    >
      <div className="w-10 h-1.5 bg-[#8A8F98]/30 rounded-full mx-auto mt-3 mb-2" />

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF6B4A]" />
        </div>
      ) : expanded ? (
        <div className="px-4 pb-32 overflow-y-auto h-full space-y-3">
          {spots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              isSaved={bookmarks.includes(spot.id)}
              onSave={() => onBookmark(spot.id)}
              onTap={() => onSpotClick(spot)}
            />
          ))}
          {spots.length === 0 && (
            <p className="text-center text-sm text-[#8A8F98] py-8">Nothing here yet — be the first to drop a pin 📍</p>
          )}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2">
          {spots.map((spot) => (
            <div key={spot.id} className="w-40 flex-shrink-0">
              <SpotCard
                spot={spot}
                isSaved={bookmarks.includes(spot.id)}
                onSave={() => onBookmark(spot.id)}
                onTap={() => onSpotClick(spot)}
              />
            </div>
          ))}
          {spots.length === 0 && (
            <p className="text-sm text-[#8A8F98] py-4 px-1">No spots found</p>
          )}
        </div>
      )}
    </motion.div>
  );
}