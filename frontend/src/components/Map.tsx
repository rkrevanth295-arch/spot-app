import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

const hyderabadCenter: [number, number] = [17.3850, 78.4867];

export interface MapSpot {
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

function safeCssUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.href.replace(/['"<>\\]/g, '');
  } catch {
    return null;
  }
}

const userIcon = L.divIcon({
  html: `
    <div class="user-dot">
      <span class="user-dot-pulse"></span>
      <span class="user-dot-core"></span>
    </div>
  `,
  className: 'user-location-marker',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const createSpotIcon = (category: string, imageUrl: string | null, isSelected: boolean, isDimmed: boolean) => {
  const style = categoryStyles[category] || { icon: '📍', bg: '#FF6B4A' };
  const size = isSelected ? 38 : 28;
  const safeUrl = safeCssUrl(imageUrl);
  const fill = safeUrl
    ? `background-image:url("${safeUrl}");background-size:cover;background-position:center;`
    : `background:linear-gradient(135deg,${style.bg},${style.bg}99);`;

  return L.divIcon({
    html: `<div class="spot-marker${isDimmed ? ' spot-marker--dimmed' : ''}${isSelected ? ' spot-marker--selected' : ''}" style="width:${size}px;height:${size}px;border:2px solid ${style.bg};${fill}">${!safeUrl ? `<span>${style.icon}</span>` : ''}</div>`,
    className: 'spot-photo-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function FlyToLocation({ location }: { location?: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 16, { duration: 0.6 });
  }, [location, map]);
  return null;
}

function FocusOnCategory({ spot }: { spot?: MapSpot }) {
  const map = useMap();
  useEffect(() => {
    if (spot) map.flyTo([spot.latitude, spot.longitude], Math.max(map.getZoom(), 14), { duration: 0.28 });
  }, [map, spot]);
  return null;
}

const Map: React.FC<{
  selectedCategory?: string;
  searchQuery?: string;
  spots?: MapSpot[];
  onPinTap?: (spot: MapSpot) => void;
  userLocation?: { lat: number; lng: number } | null;
}> = ({ selectedCategory = 'All', searchQuery = '', spots: spotsProp, onPinTap, userLocation }) => {
  const [fetchedSpots, setFetchedSpots] = useState<MapSpot[]>([]);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  useEffect(() => {
    if (spotsProp) return;
    let url = '/spots/?limit=200';
    if (searchQuery.trim()) url = `/spots/search/?q=${encodeURIComponent(searchQuery.trim())}`;
    let mounted = true;
    const timer = window.setTimeout(() => {
      api.get(url)
        .then((res) => { if (mounted) setFetchedSpots(Array.isArray(res.data) ? res.data : []); })
        .catch(() => { if (mounted) setFetchedSpots([]); });
    }, searchQuery.trim() ? 200 : 0);
    return () => { mounted = false; window.clearTimeout(timer); };
  }, [searchQuery, spotsProp]);

  const spots = spotsProp ?? fetchedSpots;

  const validSpots = useMemo(() => spots.filter((spot) => {
    const latitude = Number(spot.latitude);
    const longitude = Number(spot.longitude);
    return Number.isFinite(latitude) && Number.isFinite(longitude)
      && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
  }), [spots]);

  const matchingSpots = useMemo(() => (
    selectedCategory === 'All' || searchQuery.trim()
      ? validSpots
      : validSpots.filter((spot) => spot.category === selectedCategory)
  ), [validSpots, selectedCategory, searchQuery]);

  return (
    <MapContainer
      center={hyderabadCenter}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      dragging
      touchZoom
      scrollWheelZoom
      doubleClickZoom
      zoomControl={false}
      attributionControl={false}
    >
      <FlyToLocation location={userLocation} />
      {selectedCategory !== 'All' && !searchQuery.trim() && <FocusOnCategory spot={matchingSpots[0]} />}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {validSpots.map((spot) => {
        const isMatch = selectedCategory === 'All' || Boolean(searchQuery.trim()) || spot.category === selectedCategory;
        return (
          <Marker
            key={spot.id}
            position={[spot.latitude, spot.longitude]}
            icon={createSpotIcon(spot.category, spot.image_url, selectedSpotId === spot.id, !isMatch)}
            eventHandlers={{
              click: () => {
                setSelectedSpotId(spot.id);
                onPinTap?.(spot);
              },
            }}
          />
        );
      })}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} zIndexOffset={1000} />
      )}
    </MapContainer>
  );
};

export default React.memo(Map);
