import React from 'react';

interface Spot {
  id: string;
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
}

const SpotCard: React.FC<{ spot: Spot }> = ({ spot }) => {
  return (
    <div className="bg-[#0D171B] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:-translate-y-1 transition-transform duration-300">
      <div className="h-48 bg-[#111D22] relative">
        {spot.image_url ? (
          <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📍</div>
        )}
        <span className="absolute top-3 left-3 bg-[#18F5A4] text-black text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
          {spot.category}
        </span>
        <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white text-sm">
          ♡
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white">{spot.name}</h3>
        <p className="text-[#8B9998] text-xs mt-1">📍 Hyderabad</p>
        <p className="text-[#8B9998] text-sm mt-2 line-clamp-2">{spot.description}</p>
      </div>
    </div>
  );
};

export default SpotCard;