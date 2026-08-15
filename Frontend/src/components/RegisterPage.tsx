import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/client';
import type { View } from '../App';

interface AuthPageProps {
  navigate: (v: View | 'login' | 'register') => void;
}

export default function RegisterPage({ navigate }: AuthPageProps) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Register
      await api.post('/api/auth/register', { name, email, password });
      
      // 2. Login immediately after
      const res = await api.post('/api/auth/login', { email, password });
      const { access_token } = res.data;
      
      // 3. Fetch user
      const userRes = await api.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      login(access_token, userRes.data);
      navigate('home');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', padding: '2rem' }}>
      <div style={{ background: 'var(--bg-elevated)', padding: '2.5rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9375rem' }}>Start your AI-guided career journey</p>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary" 
            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('login')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 500, cursor: 'pointer', padding: 0 }}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
