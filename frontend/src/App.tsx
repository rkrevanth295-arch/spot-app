import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import HomePage from './HomePage';
import SearchPage from './pages/SearchPage';
import SpacesPage from './pages/SpacesPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';
import AddSpotPage from './pages/AddSpotPage';
import SpotPage from './pages/SpotPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AITripPlanner from './pages/AITripPlanner';
import AdminPage from './pages/AdminPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <SplashScreen show={showSplash} onDone={() => { sessionStorage.setItem('spot_splash_seen', '1'); setShowSplash(false); }} />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/spaces' element={<SpacesPage />} />
          <Route path='/saved' element={<SavedPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/add' element={<AddSpotPage />} />
          <Route path='/spot/:id' element={<SpotPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/ai-planner' element={<AITripPlanner />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;