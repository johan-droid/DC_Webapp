"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminTerminal() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('Standby');
  const [activeTab, setActiveTab] = useState<'news' | 'bounties'>('news');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Authenticating...');

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
      <div className="admin-login-overlay" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            padding: '3rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>SYSTEM ACCESS</h2>
            <p style={{ color: 'var(--detective-red)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>TOP SECRET CLEARANCE REQUIRED</p>
          </div>

          <input
            type="password"
            placeholder="Enter Bio-Key / Password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontFamily: 'monospace'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--detective-red)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s'
            }}
          >
            {status}
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Console</h1>
            <p style={{ opacity: 0.6 }}>Manage classified investigations and reports.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setActiveTab('news')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'news' ? 'var(--detective-red)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              News Reports
            </button>
            <button
              onClick={() => setActiveTab('bounties')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'bounties' ? 'var(--detective-red)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Bounties
            </button>
          </div>
        </header>

        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <AnimatePresence mode="wait">
            {activeTab === 'news' ? (
              <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <NewsCreationForm />
              </motion.div>
            ) : (
              <motion.div key="bounties" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <BountyCreationForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NewsCreationForm() {
  const [form, setForm] = useState({ title: '', content: '', image_url: '', author: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Publishing...');

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div>
      <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Create News Report</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Headline</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
            required
            maxLength={255}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Reporter Alias</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="e.g., Conan Edogawa"
              style={inputStyle}
              required
              maxLength={100}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Image Evidence URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Full Report</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }}
            required
            maxLength={10000}
          />
        </div>
        <button type="submit" style={buttonStyle}>Publish Report</button>
        {status && <p style={{ marginTop: '1rem', color: status.includes('Error') ? '#ff4444' : '#00ff00', fontWeight: 'bold' }}>{status}</p>}
      </form>
    </div>
  );
}

function BountyCreationForm() {
  const [form, setForm] = useState({ title: '', description: '', reward: '', status: 'open' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Posting Bounty...');

    try {
      const res = await fetch('/api/bounties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('Bounty Posted Successfully');
        setForm({ title: '', description: '', reward: '', status: 'open' });
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Transmission Failed');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Post New Bounty</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Target / Mission Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
            required
            maxLength={255}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Reward</label>
          <input
            type="text"
            value={form.reward}
            onChange={(e) => setForm({ ...form, reward: e.target.value })}
            placeholder="e.g. 1,000,000 Yen"
            style={inputStyle}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Mission Details</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }}
            required
            maxLength={5000}
          />
        </div>
        <button type="submit" style={buttonStyle}>Post Bounty</button>
        {status && <p style={{ marginTop: '1rem', color: status.includes('Error') ? '#ff4444' : '#00ff00', fontWeight: 'bold' }}>{status}</p>}
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '1rem',
  transition: 'border-color 0.2s'
};

const buttonStyle = {
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #e63946 0%, #d32f2f 100%)',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  boxShadow: '0 4px 15px rgba(230, 57, 70, 0.4)'
};