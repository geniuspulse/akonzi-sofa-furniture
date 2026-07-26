'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--brown)', color: 'var(--amber)', borderRadius: '8px', width: '44px', height: '44px', fontWeight: 'bold', fontSize: '1.6rem' }}>
            A
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--brown-dark)', fontWeight: '700', lineHeight: 1 }}>AKONZI</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase', marginTop: '2px' }}>SOFA FURNITURE</div>
          </div>
        </div>

        <h2>Admin Panel</h2>
        <p>Please enter your administrator password to continue.</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-dark)' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '1rem',
                transition: 'var(--transition)'
              }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full">
            {loading ? 'Logging in...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
