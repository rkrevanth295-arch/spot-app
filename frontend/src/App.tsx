import React from 'react';
import Map from './components/Map';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">SPOT</h1>
        <p className="text-sm">Discover hidden places in Hyderabad</p>
      </header>
      <main className="p-4">
        <Map />
      </main>
    </div>
  );
}

export default App;