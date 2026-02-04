"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  id?: number;
  title: string;
  content: string;
  image_url?: string;
  created_at?: string;
}

interface CaseItem {
  id?: number;
  title: string;
  description: string;
  episode_number?: number;
  case_type: 'episode' | 'movie' | 'special';
  created_at?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'cases'>('news');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // News form state
  const [newsForm, setNewsForm] = useState<NewsItem>({
    title: '',
    content: '',
    image_url: ''
  });

  // Cases form state
  const [caseForm, setCaseForm] = useState<CaseItem>({
    title: '',
    description: '',
    episode_number: undefined,
    case_type: 'episode'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setStatus({ type: 'success', message: 'Access granted!' });
        setPassword('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Access denied' });
        setPassword('');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Connection failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'News published successfully!' });
        setNewsForm({ title: '', content: '', image_url: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to publish' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caseForm),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Case filed successfully!' });
        setCaseForm({ title: '', description: '', episode_number: undefined, case_type: 'episode' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to file case' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-wrapper">
        <motion.div 
          className="admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="admin-title">🔍 Detective Access Terminal</h1>
          
          <form onSubmit={handleLogin} className="auth-section">
            <label htmlFor="password">Security Clearance Required</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter admin password..."
              required
            />
            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Terminal'}
            </button>
          </form>

          {status && (
            <div className={`status-msg ${status.type}`}>
              {status.message}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <motion.div 
        className="admin-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
          <h1 className="admin-title">🕵️ Content Management</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="btn"
            style={{ padding: 'var(--space-sm) var(--space-md)', fontSize: 'var(--text-sm)' }}
          >
            Logout
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            📰 News
          </button>
          <button
            className={`tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            📁 Cases
          </button>
        </div>

        {status && (
          <div className={`status-msg ${status.type}`}>
            {status.message}
          </div>
        )}

        {activeTab === 'news' && (
          <motion.form 
            onSubmit={handleNewsSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-group">
              <label className="form-label">News Title</label>
              <input
                type="text"
                value={newsForm.title}
                onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                className="input-field"
                placeholder="Breaking: New Detective Conan episode..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                className="input-field"
                rows={6}
                placeholder="Write the news content here..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL (Optional)</label>
              <input
                type="url"
                value={newsForm.image_url}
                onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={loading}
            >
              {loading ? 'Publishing...' : '📰 Publish News'}
            </button>
          </motion.form>
        )}

        {activeTab === 'cases' && (
          <motion.form 
            onSubmit={handleCaseSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-group">
              <label className="form-label">Case Title</label>
              <input
                type="text"
                value={caseForm.title}
                onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                className="input-field"
                placeholder="The Mysterious Murder Case"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Case Type</label>
              <select
                value={caseForm.case_type}
                onChange={(e) => setCaseForm({ ...caseForm, case_type: e.target.value as 'episode' | 'movie' | 'special' })}
                className="input-field"
              >
                <option value="episode">Episode</option>
                <option value="movie">Movie</option>
                <option value="special">Special</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Episode Number (Optional)</label>
              <input
                type="number"
                value={caseForm.episode_number || ''}
                onChange={(e) => setCaseForm({ ...caseForm, episode_number: e.target.value ? parseInt(e.target.value) : undefined })}
                className="input-field"
                placeholder="123"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Case Description</label>
              <textarea
                value={caseForm.description}
                onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                className="input-field"
                rows={6}
                placeholder="Describe the case details..."
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={loading}
            >
              {loading ? 'Filing...' : '📁 File Case'}
            </button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}