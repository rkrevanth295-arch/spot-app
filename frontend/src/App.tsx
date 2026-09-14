import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: 'easeOut' }}
        className="min-h-screen"
      >
        <Routes location={location}>
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
      </motion.main>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <SplashScreen show={showSplash} onDone={() => { sessionStorage.setItem('spot_splash_seen', '1'); setShowSplash(false); }} />
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
