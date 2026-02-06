"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminTerminal() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('Standby');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Decrypting...');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      setIsAuth(true);
      setStatus('Access Granted');
    } else {
      setStatus('Access Denied');
    }
  };

  if (!isAuth) {
    return (
      <div className="admin-login-overlay" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d' }}>
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}
        >
          <h2 style={{ color: '#e63946', marginBottom: '1rem' }}>Admin Terminal</h2>
          <input
            type="password"
            placeholder="Enter Secret Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', background: '#000', color: '#0f0', border: '1px solid #444' }}
          />
          <button type="submit" style={{ width: '100%', padding: '0.7rem', background: '#e63946', border: 'none', cursor: 'pointer' }}>
            {status}
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ paddingTop: '100px', color: '#fff' }}>
      <div className="container">
        <h1>Dossier Management</h1>
        {/* Cases and News creation forms go here */}
      </div>
    </div>
  );
}