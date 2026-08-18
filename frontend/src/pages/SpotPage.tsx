import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bookmark, Share2, Navigation, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';

interface Spot {
  id: string;
  name: string;
  place?: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
}

export default function SpotPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSpot() {
      if (!id) {
        setError('Spot not found');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/spots/${id}`);
        setSpot(res.data);
        if (user) {
          const savedRes = await api.get('/spots/saved/mine');
          setIsSaved(savedRes.data.some((item: Spot) => item.id === id));
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Unable to load spot');
      } finally {
        setLoading(false);
      }
    }
    loadSpot();
  }, [id, user]);

  const handleSave = async () => {
    if (!spot) return;
    if (!user) {
      navigate('/login');
      return;
    }
    setSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/spots/${spot.id}/save`);
      } else {
        await api.post(`/spots/${spot.id}/save`);
      }
      setIsSaved((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    const link = `${window.location.origin}/spot/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard');
  };

  const handleDirections = () => {
    if (!spot) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF6B4A] animate-spin" />
      </div>
    );
  }

  if (error || !spot) {
    return (
      <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24 px-5 pt-10">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">Spot not available</h1>
          <p className="text-[#8A8F98] mb-6">{error || 'This spot could not be found.'}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-3xl bg-[#FF6B4A] py-3 text-sm font-semibold text-white"
          >Go back home</button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24">
      <div className="relative">
        {spot.image_url ? (
          <img src={spot.image_url} alt={spot.name} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 bg-[#151A1F] flex items-center justify-center text-6xl">📍</div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{spot.name}</h1>
            <p className="text-sm text-[#8A8F98] mt-2">{spot.place || 'Hyderabad'}</p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-[#151A1F]/90 text-xs text-[#F5F5F0] uppercase tracking-[0.18em]">
            {spot.category}
          </span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#B0BEC5]">{spot.description || 'No description available.'}</p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`rounded-3xl py-3 text-sm font-semibold ${isSaved ? 'bg-[#FF6B4A] text-white' : 'bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.08)]'}`}
          >
            <Bookmark className="inline w-4 h-4 mr-2" />{isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            className="rounded-3xl py-3 text-sm font-semibold bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.08)]"
          >
            <Share2 className="inline w-4 h-4 mr-2" />Share
          </button>
          <button
            onClick={handleDirections}
            className="rounded-3xl py-3 text-sm font-semibold bg-[#151A1F] text-[#F5F5F0] border border-[rgba(255,255,255,0.08)]"
          >
            <Navigation className="inline w-4 h-4 mr-2" />Go
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
