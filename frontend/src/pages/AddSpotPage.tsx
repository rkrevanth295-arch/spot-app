import React, { useState } from 'react';
import { PlusCircle, Navigation, ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BottomNav from '../components/BottomNav';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const hyderabadCenter: [number, number] = [17.3850, 78.4867];

const categories = [
  'Sunset Points', 'Late Night Runs', 'Cheap Thrills', 'Aesthetic AF',
  'Green Escape', 'Old City Secrets', 'Creative Corners', 'Bike Points',
  'Chill & Study', 'Underrated AF', 'Group Hangout', 'Monsoon Special',
  'Local Bazaar', 'Street Food Trail', 'Waterside', 'Adrenaline Zone',
  'Late Night Eats', 'Culture Fix', 'City Lights View', 'Pet-Friendly',
  'Gaming Zones', 'Weekend Getaway', 'Peace Out', 'Drink & Chill',
  'Movie Nights', 'Skate Spots', 'Instagram Bloom', 'Hidden Ruins', 'First Date Spots'
];

const createPinIcon = () => {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 34px; height: 44px; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));">
        <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 0C7.6 0 0 7.6 0 17C0 31.5 17 44 17 44C17 44 34 31.5 34 17C34 7.6 26.4 0 17 0Z" fill="#FF6B4A"/>
          <circle cx="17" cy="15" r="10" fill="white" opacity="0.15"/>
        </svg>
        <div style="position: absolute; top: 5px; left: 50%; transform: translateX(-50%); font-size: 14px;">📍</div>
      </div>
    `,
    className: 'spot-pin',
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  });
};

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e: any) { onMapClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function FlyToLocation({ location }: { location: [number, number] }) {
  const map = useMap();
  React.useEffect(() => { if (location) map.flyTo(location, 15, { duration: 1 }); }, [location, map]);
  return null;
}

export default function AddSpotPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Aesthetic AF');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pinLocation, setPinLocation] = useState<[number, number]>(hyderabadCenter);
  const [autoDetected, setAutoDetected] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAutoDetect = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPinLocation([position.coords.latitude, position.coords.longitude]);
          setAutoDetected(true);
        },
        () => setError('Location denied. Tap on map instead.')
      );
    }
  };

  const handleMapTap = (lat: number, lng: number) => {
    setPinLocation([lat, lng]);
    setAutoDetected(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!user) { setError('Please log in to add a spot.'); return; }
    if (!name.trim()) { setError('Spot name is required.'); return; }
    setLoading(true);
    try {
      const spotRes = await api.post('/spots/', {
        name, category, description,
        latitude: pinLocation[0], longitude: pinLocation[1],
      });
      const spotId = spotRes.data.id;
      if (imageFile && spotId) {
        const formData = new FormData();
        formData.append('file', imageFile);
        await api.post(`/upload/spot/${spotId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Unable to upload spot');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24">
      <div className="px-5 pt-8">
        <div className="flex items-center gap-3">
          <div className="rounded-3xl bg-[#151A1F]/80 p-3">
            <PlusCircle className="w-6 h-6 text-[#FF6B4A]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Add a spot</h1>
            <p className="text-sm text-[#8A8F98] mt-1">Share your favourite place</p>
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-[#8A8F98]">Spot name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter the spot name"
              className="mt-2 w-full rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#151A1F]/80 px-4 py-3 text-sm text-[#F5F5F0] outline-none" />
          </div>

          <div>
            <label className="text-sm text-[#8A8F98]">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#151A1F]/80 px-4 py-3 text-sm text-[#F5F5F0] outline-none">
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#8A8F98]">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description"
              className="mt-2 w-full min-h-[100px] rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#151A1F]/80 px-4 py-3 text-sm text-[#F5F5F0] outline-none resize-none" />
          </div>

          <div>
            <label className="text-sm text-[#8A8F98]">Location</label>
            <button type="button" onClick={handleAutoDetect}
              className="mt-2 w-full rounded-3xl border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 px-4 py-3 text-sm text-[#FF6B4A] flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" /> Use my current location
            </button>
            <p className="text-center text-[#8A8F98] text-xs my-2">or tap on the map</p>
            <div className="rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ height: '220px' }}>
              <MapContainer center={pinLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution='&copy; CartoDB' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <MapClickHandler onMapClick={handleMapTap} />
                <FlyToLocation location={pinLocation} />
                <Marker position={pinLocation} icon={createPinIcon()} />
              </MapContainer>
            </div>
            <p className="text-xs text-[#8A8F98] mt-2">
              📍 {pinLocation[0].toFixed(5)}, {pinLocation[1].toFixed(5)} {autoDetected && '· Auto-detected'}
            </p>
          </div>

          <div>
            <label className="text-sm text-[#8A8F98]">Add photo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload"
              className="mt-2 w-full rounded-3xl border border-dashed border-[rgba(255,255,255,0.2)] bg-[#151A1F]/40 px-4 py-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6B4A]/50 transition-all">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-2xl" />
              ) : (
                <>
                  <ImagePlus className="w-8 h-8 text-[#8A8F98]" />
                  <span className="text-sm text-[#8A8F98] mt-2">Tap to add photos</span>
                  <span className="text-xs text-[#8A8F98]/60 mt-1">JPG, PNG, WebP</span>
                </>
              )}
            </label>
            {imageFile && (
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="text-xs text-red-400 mt-2">Remove photo</button>
            )}
          </div>

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

          <button type="submit" disabled={loading}
            className="mt-2 w-full rounded-3xl bg-gradient-to-br from-[#FF6B4A] to-[#F5A623] py-4 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? 'Uploading...' : 'Upload spot'}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
}