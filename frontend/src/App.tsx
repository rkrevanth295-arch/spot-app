import React, { useState } from 'react';
import Map from './components/Map';

const categories = [
  'All', 'Cafes', 'Street Eats', 'Nature Fix', 'Study Mode', 'Date Spot',
  'Biker Trails', 'Photoshoot', 'Smoke Spot', 'Sunset Point',
  'Hidden Gem', 'Night Out', 'Live Music', 'Peace Mode'
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 text-white p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          SPOT
        </h1>
        <p className="text-sm text-gray-400">Discover hidden places in Hyderabad</p>
      </header>

      {/* Category Filter */}
      <div className="px-4 py-3 bg-gray-900 overflow-x-auto whitespace-nowrap flex gap-2 border-b border-gray-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="p-4">
        <Map selectedCategory={selectedCategory} />
      </main>
    </div>
  );
}

export default App;