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

        <div style={{ marginTop: '2rem' }}>
          <NewsCreationForm />
        </div>
      </div>
    </div>
  );
}

function NewsCreationForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    image_url: '',
    author: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Transmitting...');

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('News Published Successfully');
        setForm({ title: '', content: '', image_url: '', author: '' });
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Transmission Failed');
    }
  };

  return (
    <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
      <h2 style={{ color: '#e63946', marginBottom: '1.5rem' }}>Create News Report</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #444', color: '#fff' }}
            required
            maxLength={255}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Author Name</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="e.g., Conan Edogawa"
            style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #444', color: '#fff' }}
            required
            maxLength={100}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image URL</label>
          <input
            type="url"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #444', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Content</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #444', color: '#fff', minHeight: '200px' }}
            required
            maxLength={10000}
          />
        </div>

        <button
          type="submit"
          style={{ padding: '0.8rem 2rem', background: '#e63946', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Publish Report
        </button>
        {status && <p style={{ marginTop: '1rem', color: status.includes('Error') ? '#ff4444' : '#00ff00' }}>{status}</p>}
      </form>
    </div>
  );
}