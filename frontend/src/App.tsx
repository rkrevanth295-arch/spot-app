import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './components/Map';
import SpotCard from './components/SpotCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import api from './services/api';

const vibeChips = [
  'All', 'Sunset Points', 'Late Night Runs', 'Cheap Thrills', 'Aesthetic AF',
  'Green Escape', 'Chill & Study', 'Underrated AF', 'Group Hangout',
  'Street Food Trail', 'Waterside', 'Late Night Eats', 'Culture Fix',
  'City Lights View', 'Peace Out', 'Drink & Chill', 'First Date Spots'
];

interface Spot {
  id: string; name: string; category: string; description: string;
  latitude: number; longitude: number; image_url: string | null;
}

function HomePage() {
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState<Spot[]>([]);
  const [showMap, setShowMap] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/spots/?limit=20')
      .then(res => setSpots(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#05090B] text-[#F5F7F6]">
      <header className="px-5 pt-5 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">SP</span>
            <span className="text-[#18F5A4] relative">
              O
              <span className="absolute -top-1 -right-1 text-[10px]">✦</span>
            </span>
            <span className="text-white">T</span>
          </h1>
          <p className="text-[#8B9998] text-sm mt-0.5">Discover hidden places in Hyderabad</p>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={logout} className="text-xs text-[#8B9998]">logout</button>
          ) : (
            <Link to="/login" className="bg-[#18F5A4] text-black px-4 py-2 rounded-full text-sm font-medium">Login</Link>
          )}
        </div>
      </header>

      <div className="px-5 pb-3">
        <div className="bg-[#0D171B] border border-[rgba(255,255,255,0.08)] rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <span className="text-[#8B9998]">⌕</span>
          <input
            type="text" placeholder="What's your vibe today?"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-[#8B9998] text-sm w-full outline-none"
          />
        </div>
      </div>

      <div className="px-5 pb-4 overflow-x-auto whitespace-nowrap flex gap-2">
        {vibeChips.map(vibe => (
          <button
            key={vibe}
            onClick={() => setSelectedVibe(vibe)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedVibe === vibe
                ? 'bg-[#18F5A4] text-black shadow-[0_0_20px_rgba(24,245,164,0.2)]'
                : 'bg-[#0D171B] text-[#8B9998] border border-[rgba(255,255,255,0.06)]'
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>

      <div className="px-5 pb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Curated for you</h2>
        <button onClick={() => setShowMap(!showMap)} className="text-sm text-[#18F5A4]">
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>

      {showMap && (
        <div className="px-5 pb-5">
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
            <Map selectedCategory={selectedVibe} searchQuery={searchQuery} compact />
          </div>
        </div>
      )}

      <div className="px-5 pb-24 space-y-4">
        {spots.map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#091115] border-t border-[rgba(255,255,255,0.08)] px-8 py-3 flex justify-between items-center">
        <button className="text-[#18F5A4] text-xs">⌂ Home</button>
        <button className="text-[#8B9998] text-xs">◎ Explore</button>
        <button className="w-14 h-14 bg-[#18F5A4] rounded-full flex items-center justify-center text-black text-xl shadow-[0_0_30px_rgba(24,245,164,0.3)] -mt-8">+</button>
        <button className="text-[#8B9998] text-xs">♡ Saved</button>
        <button className="text-[#8B9998] text-xs">◉ Profile</button>
      </nav>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;