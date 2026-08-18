import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import api from './services/api';

const budgetOptions = [
  { value: 200, label: 'Broke student mode', icon: '🎓' },
  { value: 500, label: 'Casual outing', icon: '🚶' },
  { value: 1000, label: 'Treat yourself', icon: '🎉' },
  { value: 2000, label: 'Big day out', icon: '✨' },
];

const timeOptions = [
  { value: 2, label: '2h', icon: '⚡' },
  { value: 4, label: '4h', icon: '🌤️' },
  { value: 6, label: '6h', icon: '🌅' },
  { value: 8, label: '8h', icon: '🌆' },
  { value: 12, label: '12h', icon: '🌃' },
];

const vibes = [
  'Sunset', 'Adventure', 'Romance', 'Culture', 'Food', 'Nature',
  'Party', 'Chill', 'Photography', 'Nightlife', 'Shopping', 'Sports'
];

interface PlanResult {
  spots: any[];
  itinerary: string;
  estimatedBudget: number;
}

export default function AITripPlanner() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!budget || !time || !location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/ai/trip-plan', {
        budget,
        time,
        location,
        vibes: selectedVibes.length > 0 ? selectedVibes : undefined,
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#F5F5F0] pb-20">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[#151A1F]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">AI Trip Planner</h1>
          <span className="text-xs text-[#8A8F98] ml-auto">Tell us your vibe</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {!plan ? (
          <>
            {/* BUDGET SELECTION */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[#8A8F98] mb-3">Budget</h2>
              <div className="grid grid-cols-2 gap-2">
                {budgetOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setBudget(option.value)}
                    className={`p-4 rounded-xl transition-all border ${
                      budget === option.value
                        ? 'bg-[#FF6B4A]/20 border-[#FF6B4A] shadow-lg shadow-[#FF6B4A]/20'
                        : 'bg-[#151A1F] border-[rgba(255,255,255,0.08)] hover:border-[#FF6B4A]/50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                    <div className="text-[10px] text-[#8A8F98]">₹{option.value}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* TIME SELECTION */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[#8A8F98] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time Available
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {timeOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setTime(option.value)}
                    className={`p-3 rounded-xl transition-all border text-center ${
                      time === option.value
                        ? 'bg-[#FF6B4A]/20 border-[#FF6B4A] shadow-lg shadow-[#FF6B4A]/20'
                        : 'bg-[#151A1F] border-[rgba(255,255,255,0.08)] hover:border-[#FF6B4A]/50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* STARTING LOCATION */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[#8A8F98] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Starting From
              </h2>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or landmark..."
                className="w-full bg-[#151A1F] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-[#F5F5F0] placeholder-[#8A8F98] focus:border-[#FF6B4A] outline-none transition-all"
              />
            </div>

            {/* VIBE SELECTION */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[#8A8F98] mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Vibe (Optional)
              </h2>
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe) => (
                  <motion.button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      selectedVibes.includes(vibe)
                        ? 'bg-[#FF6B4A]/20 border-[#FF6B4A] text-[#FF6B4A]'
                        : 'bg-[#151A1F] border-[rgba(255,255,255,0.08)] text-[#8A8F98] hover:border-[#FF6B4A]/50'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {vibe}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* GENERATE BUTTON */}
            <motion.button
              onClick={handleGeneratePlan}
              disabled={loading || !budget || !time || !location}
              className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#F5A623] text-white font-semibold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF6B4A]/30 hover:shadow-xl transition-all"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Generating Your Plan...' : '🚀 Generate My Plan'}
            </motion.button>
          </>
        ) : (
          <>
            {/* PLAN RESULTS */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#FF6B4A]/20 to-[#F5A623]/20 border border-[#FF6B4A]/50 rounded-2xl p-4">
                <h3 className="font-semibold mb-2">Your AI-Generated Plan</h3>
                <p className="text-sm text-[#8A8F98] mb-3">{plan.itinerary}</p>
                <div className="text-xs text-[#FF6B4A] font-medium">
                  Estimated Budget: ₹{plan.estimatedBudget}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#8A8F98] mb-3">Recommended Spots</h3>
                <div className="space-y-2">
                  {plan.spots.map((spot, idx) => (
                    <div
                      key={idx}
                      className="bg-[#151A1F] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 cursor-pointer hover:border-[#FF6B4A]/50 transition-all"
                      onClick={() => navigate(`/spot/${spot.id}`)}
                    >
                      <h4 className="font-medium text-sm">{spot.name}</h4>
                      <p className="text-xs text-[#8A8F98] mt-1">{spot.category}</p>
                      <p className="text-xs text-[#8A8F98] mt-1">{spot.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => setPlan(null)}
                className="w-full bg-[#151A1F] border border-[rgba(255,255,255,0.08)] text-[#FF6B4A] font-semibold py-3 rounded-xl hover:border-[#FF6B4A]/50 transition-all"
                whileTap={{ scale: 0.98 }}
              >
                Create Another Plan
              </motion.button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
