import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

const categoryStyles: { [key: string]: { icon: string; bg: string } } = {
  'Sunset Points': { icon: '🌅', bg: '#FF6B4A' },
  'Late Night Runs': { icon: '🌙', bg: '#5D6D7E' },
  'Cheap Thrills': { icon: '💰', bg: '#F5A623' },
  'Aesthetic AF': { icon: '📸', bg: '#9B6BFF' },
  'Green Escape': { icon: '🌳', bg: '#27AE60' },
  'Old City Secrets': { icon: '🏛️', bg: '#C0392B' },
  'Creative Corners': { icon: '🎨', bg: '#8E44AD' },
  'Bike Points': { icon: '🏍️', bg: '#E67E22' },
  'Chill & Study': { icon: '☕', bg: '#1ABC9C' },
  'Underrated AF': { icon: '🔥', bg: '#E74C3C' },
  'Group Hangout': { icon: '🎉', bg: '#3498DB' },
  'Monsoon Special': { icon: '🌧️', bg: '#2E86C1' },
  'Local Bazaar': { icon: '🛍️', bg: '#F39C12' },
  'Street Food Trail': { icon: '🍜', bg: '#FF4757' },
  'Waterside': { icon: '🌊', bg: '#2980B9' },
  'Adrenaline Zone': { icon: '⚡', bg: '#E74C3C' },
  'Late Night Eats': { icon: '🍽️', bg: '#D35400' },
  'Culture Fix': { icon: '🎭', bg: '#8E44AD' },
  'City Lights View': { icon: '🌃', bg: '#1A5276' },
  'Pet-Friendly': { icon: '🐾', bg: '#27AE60' },
  'Gaming Zones': { icon: '🎮', bg: '#1F618D' },
  'Weekend Getaway': { icon: '🏕️', bg: '#117A65' },
  'Peace Out': { icon: '🧘', bg: '#52BE80' },
  'Drink & Chill': { icon: '🍸', bg: '#F5A623' },
  'Movie Nights': { icon: '🎬', bg: '#922B3E' },
  'Skate Spots': { icon: '🛹', bg: '#0E6655' },
  'Instagram Bloom': { icon: '🌸', bg: '#FF69B4' },
  'Hidden Ruins': { icon: '🗿', bg: '#6C3483' },
  'First Date Spots': { icon: '💕', bg: '#E91E63' },
};

const createSpotIcon = (category: string, imageUrl: string | null, isSelected: boolean, index: number) => {
  const style = categoryStyles[category] || { icon: '📍', bg: '#FF6B4A' };
  const baseSize = isSelected ? 56 : 40;
  const ringSize = isSelected ? 3 : 2;
  const badgeSize = isSelected ? 22 : 18;
  const glowSize = isSelected ? 20 : 12;

  const backgroundStyle = imageUrl
    ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;`
    : `background: linear-gradient(135deg, ${style.bg}CC, ${style.bg}66);`;

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${baseSize}px;
        height: ${baseSize}px;
        border-radius: 50%;
        border: ${ringSize}px solid ${style.bg};
        box-shadow: 0 0 ${glowSize}px ${style.bg}80, 0 0 4px rgba(0,0,0,0.4);
        ${backgroundStyle}
        overflow: visible;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: markerDrop 0.5s ease-out ${index * 40}ms both;
        transition: all 0.3s ease;
      ">
        ${!imageUrl ? `<span style="font-size: ${isSelected ? '24px' : '18px'}; line-height: 1;">${style.icon}</span>` : ''}
        <div style="
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: ${badgeSize}px;
          height: ${badgeSize}px;
          border-radius: 50%;
          background: ${style.bg};
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #0B0E11;
          font-size: ${isSelected ? '11px' : '9px'};
          line-height: 1;
          color: white;
        ">
          ${style.icon}
        </div>
      </div>
      <style>
        @keyframes markerDrop {
          0% { transform: translateY(-30px) scale(0.5); opacity: 0; }
          70% { transform: translateY(5px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      </style>
    `,
    className: 'spot-photo-marker',
    iconSize: [baseSize + ringSize * 2, baseSize + ringSize * 2],
    iconAnchor: [(baseSize + ringSize * 2) / 2, (baseSize + ringSize * 2) / 2],
    popupAnchor: [0, -baseSize / 2],
  });
};

const createUserIcon = () => {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 36px; height: 36px;">
        <div style="position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, #4AE0C4 0%, #4AE0C455 40%, transparent 70%); animation: userPulse 2s infinite;"></div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; z-index: 2;">🧍</div>
        <style>
          @keyframes userPulse { 0% { transform: scale(0.7); opacity: 1; } 70% { transform: scale(1.4); opacity: 0; } 100% { transform: scale(1.4); opacity: 0; } }
        </style>
      </div>
    `,
    className: 'user-location-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

function FlyToLocation({ location }: { location?: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 16, { duration: 1.5 });
    }
  }, [location, map]);
  return null;
}

const Map: React.FC<{
  selectedCategory?: string;
  searchQuery?: string;
  compact?: boolean;
  onPinTap?: (spot: Spot) => void;
  userLocation?: { lat: number; lng: number } | null;
}> = ({ selectedCategory = 'All', searchQuery = '', compact = false, onPinTap, userLocation }) => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  useEffect(() => {
    let url = '/spots/';
    const params: string[] = [];
    if (searchQuery.trim()) {
      url = '/spots/search/';
      params.push(`q=${encodeURIComponent(searchQuery.trim())}`);
    } else if (selectedCategory !== 'All') {
      params.push(`category=${encodeURIComponent(selectedCategory)}`);
    }
    if (params.length > 0) url += '?' + params.join('&');
    api.get(url).then((res: any) => setSpots(res.data)).catch(() => {});
  }, [selectedCategory, searchQuery]);

  return (
    <MapContainer
      center={hyderabadCenter}
      zoom={14}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      dragging={true}
      touchZoom={true}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <FlyToLocation location={userLocation} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot, index) => (
        <Marker
          key={spot.id}
          position={[spot.latitude, spot.longitude]}
          icon={createSpotIcon(spot.category, spot.image_url, selectedSpotId === spot.id, index)}
          eventHandlers={{
            click: () => {
              setSelectedSpotId(spot.id);
              if (onPinTap) onPinTap(spot);
            },
          }}
        >
          <Popup>
            <div style={{ fontFamily: 'Inter, sans-serif', color: '#F5F5F0', fontSize: '13px' }}>
              <strong>{spot.name}</strong>
              <br />
              <span style={{ color: '#8A8F98', fontSize: '11px' }}>{spot.category}</span>
            </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserIcon()} zIndexOffset={1000}>
          <Popup>You are here 📍</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;