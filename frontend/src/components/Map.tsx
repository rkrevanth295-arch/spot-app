import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

const hyderabadCenter: [number, number] = [17.3850, 78.4867];

interface Spot {
  id: string;
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
}

const categoryStyles: { [key: string]: { icon: string; color: string; bg: string } } = {
  'Cafes':         { icon: '☕', color: '#fff', bg: '#C0392B' },
  'Street Eats':   { icon: '🍔', color: '#fff', bg: '#E74C3C' },
  'Food':          { icon: '🍔', color: '#fff', bg: '#E74C3C' },
  'Nature Fix':    { icon: '🌿', color: '#fff', bg: '#27AE60' },
  'Nature':        { icon: '🌿', color: '#fff', bg: '#27AE60' },
  'Study Mode':    { icon: '📚', color: '#fff', bg: '#2980B9' },
  'Study':         { icon: '📚', color: '#fff', bg: '#2980B9' },
  'Date Spot':     { icon: '💕', color: '#fff', bg: '#E91E63' },
  'Couple':        { icon: '💕', color: '#fff', bg: '#E91E63' },
  'Biker Trails':  { icon: '🏍️', color: '#fff', bg: '#E67E22' },
  'Photoshoot':    { icon: '📸', color: '#fff', bg: '#8E44AD' },
  'Smoke Spot':    { icon: '🍃', color: '#fff', bg: '#2C3E50' },
  'Sunset Point':  { icon: '🌅', color: '#fff', bg: '#F39C12' },
  'Sunset':        { icon: '🌅', color: '#fff', bg: '#F39C12' },
  'Hidden Gem':    { icon: '💎', color: '#fff', bg: '#6C3483' },
  'Night Out':     { icon: '🎉', color: '#fff', bg: '#1A5276' },
  'Nightlife':     { icon: '🎉', color: '#fff', bg: '#1A5276' },
  'Skate/Street':  { icon: '🛹', color: '#fff', bg: '#0E6655' },
  'Live Music':    { icon: '🎵', color: '#fff', bg: '#6C3483' },
  'Run/Walk':      { icon: '🏃', color: '#fff', bg: '#117A65' },
  'Peace Mode':    { icon: '🧘', color: '#fff', bg: '#7DCEA0' },
  'Gaming Zone':   { icon: '🎯', color: '#fff', bg: '#1F618D' },
  'Rainy Day':     { icon: '🌧️', color: '#fff', bg: '#5D6D7E' },
  'Adventure':     { icon: '🏔️', color: '#fff', bg: '#16A085' },
};

const createPinIcon = (category: string) => {
  const style = categoryStyles[category] || { icon: '📍', color: '#fff', bg: '#16a34a' };
  
  return L.divIcon({
    html: `
      <div style="position:relative;width:44px;height:56px;filter:drop-shadow(2px 4px 6px rgba(0,0,0,0.5))">
        <svg width="44" height="56" viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${style.bg};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#000;stop-opacity:0.4" />
            </linearGradient>
          </defs>
          <circle cx="22" cy="20" r="18" fill="white" opacity="0.12"/>
          <path d="M22 0C9.85 0 0 9.85 0 22c0 16.5 22 34 22 34s22-17.5 22-34C44 9.85 34.15 0 22 0z" fill="url(#grad-${category})"/>
          <ellipse cx="15" cy="14" rx="6" ry="4" fill="white" opacity="0.2" transform="rotate(-30 15 14)"/>
          <circle cx="22" cy="20" r="14" fill="white" opacity="0.08"/>
        </svg>
        <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-size:18px;line-height:1;filter:drop-shadow(0 2px 2px rgba(0,0,0,0.3))">${style.icon}</div>
        <div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:6px;height:6px;background:white;border-radius:50%;opacity:0.4"></div>
      </div>
    `,
    className: '',
    iconSize: [44, 56],
    iconAnchor: [22, 56],
    popupAnchor: [0, -56],
  });
};

const Map: React.FC<{ selectedCategory?: string }> = ({ selectedCategory = 'All' }) => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  useEffect(() => {
    const url = selectedCategory === 'All' ? '/spots/' : `/spots/?category=${encodeURIComponent(selectedCategory)}`;
    api.get(url)
      .then((res: any) => setSpots(res.data))
      .catch((err: any) => console.error('Failed:', err));
  }, [selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <MapContainer center={hyderabadCenter} zoom={12} style={{ height: '550px', width: '100%', borderRadius: '12px' }}>
          <TileLayer
            attribution='&copy; CartoDB'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.latitude, spot.longitude]}
              icon={createPinIcon(spot.category)}
              eventHandlers={{ click: () => setSelectedSpot(spot) }}
            >
              <Popup>
                <strong>{spot.name}</strong><br/>{spot.category}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedSpot && (
        <div className="w-full md:w-80 bg-gray-900 rounded-xl shadow-lg p-4 text-white">
          {selectedSpot.image_url && (
            <img src={selectedSpot.image_url} alt={selectedSpot.name} className="w-full h-48 object-cover rounded-lg mb-3" />
          )}
          <h2 className="text-xl font-bold">{selectedSpot.name}</h2>
          <span className="inline-block px-2 py-1 text-xs rounded-full mt-1" style={{ backgroundColor: (categoryStyles[selectedSpot.category] || {}).bg || '#333' }}>
            {(categoryStyles[selectedSpot.category] || {}).icon || '📍'} {selectedSpot.category}
          </span>
          <p className="text-gray-300 mt-3 text-sm">{selectedSpot.description || 'No description yet.'}</p>
          <button onClick={() => setSelectedSpot(null)} className="mt-4 text-sm text-red-400 hover:underline">Close</button>
        </div>
      )}
    </div>
  );
};

export default Map;