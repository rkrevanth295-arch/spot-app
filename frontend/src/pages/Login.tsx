import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ username, password });
      const api = (await import('../services/api')).default;
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/users/me');
        setUser(res.data);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05090B] flex items-center justify-center p-4">
      <div className="bg-[#0D171B] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-white">SP</span>
          <span className="text-[#18F5A4]">O</span>
          <span className="text-white">T</span>
        </h1>
        <p className="text-[#8B9998] text-center mt-2 text-sm">Welcome back</p>

        {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#18F5A4] text-black rounded-lg font-medium disabled:opacity-50">Continue</button>
        </form>
        <p className="text-[#8B9998] text-center mt-6 text-sm">
          Don't have an account? <Link to="/signup" className="text-[#18F5A4]">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;