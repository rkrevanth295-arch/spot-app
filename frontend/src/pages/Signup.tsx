import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signup({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });
      navigate('/login', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05090B] flex items-center justify-center p-4">
      <div className="bg-[#0D171B] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-white">SP</span>
          <span className="text-[#18F5A4]">O</span>
          <span className="text-white">T</span>
        </h1>
        <p className="text-[#8B9998] text-center mt-2 text-sm">Create your account</p>

        {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <input type="password" placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#111D22] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B9998] outline-none focus:border-[#18F5A4]" required />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#18F5A4] text-black rounded-lg font-medium disabled:opacity-50">{loading ? 'Creating account...' : 'Create account'}</button>
        </form>
        <p className="text-[#8B9998] text-center mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-[#18F5A4]">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;