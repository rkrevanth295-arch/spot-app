import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import api from '../services/api';

interface Spot {
  id: string;
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  status: string;
}

export default function AdminPage() {
  const [pendingSpots, setPendingSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPending(); }, []);

  async function fetchPending() {
    setLoading(true);
    try {
      const res = await api.get('/spots/admin/pending');
      setPendingSpots(res.data);
    } catch {}
    setLoading(false);
  }

  async function approveSpot(id: string) {
    try {
      await api.put(`/spots/admin/${id}/approve`);
      setPendingSpots(prev => prev.filter(s => s.id !== id));
    } catch {}
  }

  async function rejectSpot(id: string) {
    try {
      await api.delete(`/spots/admin/${id}/reject`);
      setPendingSpots(prev => prev.filter(s => s.id !== id));
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-24">
      <div className="px-5 pt-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-[#8A8F98] mt-1">{pendingSpots.length} spots pending review</p>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF6B4A] mx-auto" />
            </div>
          ) : pendingSpots.length === 0 ? (
            <div className="text-center py-12 text-[#8A8F98]">
              All caught up! 🎉
            </div>
          ) : (
            pendingSpots.map(spot => (
              <div key={spot.id} className="bg-[#151A1F] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#0B0E11] rounded-xl flex items-center justify-center text-2xl">📍</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{spot.name}</h3>
                    <span className="text-xs text-[#FF6B4A]">{spot.category}</span>
                    <p className="text-xs text-[#8A8F98] mt-1 line-clamp-2">{spot.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => approveSpot(spot.id)}
                    className="flex-1 py-2.5 rounded-xl bg-green-500/20 text-green-400 text-sm font-medium flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => rejectSpot(spot.id)}
                    className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium flex items-center justify-center gap-1.5">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}