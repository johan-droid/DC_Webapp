"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function AdminTerminal() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="admin-layout">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Admin Console</h1>
            <p style={{ opacity: 0.6 }}>Manage news reports and classified data.</p>
          </div>
          <button onClick={handleLogout} className="admin-btn-logout">
            Logout
          </button>
        </header>

        <div className="admin-glass-panel">
          <div className="admin-grid">
            <div className="admin-editor">
              <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Create Report</h2>
              <NewsCreationForm onNewsCreated={() => window.dispatchEvent(new Event('refreshNews'))} />
            </div>

            <div className="admin-archives">
              <div className="admin-archives-header">
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>Archives</h2>
              </div>
              <NewsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsList() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Failed to fetch news', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    window.addEventListener('refreshNews', fetchNews);
    return () => window.removeEventListener('refreshNews', fetchNews);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('EXTREME WARNING: Validating deletion protocol... This action is permanent. Proceed?')) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchNews();
      } else {
        const data = await res.json();
        alert(`Deletion Failed: ${data.details || data.error}`);
      }
    } catch (error) {
      alert('Delete failed');
    }
  };

  if (loading) return <div style={{ padding: '1rem', color: 'rgba(255,255,255,0.5)' }}>Loading archives...</div>;

  return (
    <div className="archives-content">
      {news.map((item) => (
        <div key={item.id} className="archive-item">
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <h4 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{item.title}</h4>
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
          <button
            onClick={() => handleDelete(item.id)}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid #ff4444',
              color: '#ff4444',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              marginLeft: '1rem',
              flexShrink: 0
            }}
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}

function NewsCreationForm({ onNewsCreated }: { onNewsCreated?: () => void }) {
  const [form, setForm] = useState({ title: '', content: '', author: '', category: 'General' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Publishing...');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('author', form.author);
      formData.append('category', form.category);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        setStatus('News Published Successfully');
        setForm({ title: '', content: '', author: '', category: 'General' });
        setImageFile(null);
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
        if (onNewsCreated) onNewsCreated();
      } else {
        const data = await res.json();
        const errorMessage = data.details ? `${data.error}: ${data.details}` : data.error;
        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('Transmission Failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Headline</label>
        <input
          type="text"
          className="admin-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          maxLength={255}
          placeholder="Enter news headline..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Reporter Alias</label>
          <input
            type="text"
            className="admin-input"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="e.g., Conan Edogawa"
            required
            maxLength={100}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Panel Size</label>
          <select
            className="admin-input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="General">Standard (General)</option>
            <option value="Featured">Featured (Large)</option>
            <option value="Banner">Banner (Wide)</option>
            <option value="Sidebar">Sidebar (Compact)</option>
          </select>
        </div>
      </div>

      <div className="admin-form-group">
        <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Evidence Photo</label>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className="admin-input"
            style={{ padding: '0.75rem' }}
          />
        </div>
      </div>

      <div className="admin-form-group">
        <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Full Report</label>
        <textarea
          className="admin-input"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={{ minHeight: '200px', resize: 'vertical' }}
          required
          maxLength={10000}
          placeholder="Type the full news report here..."
        />
      </div>

      <button type="submit" className="admin-btn-primary" disabled={isUploading}>
        {isUploading ? 'Transmitting Data...' : 'Publish Report'}
      </button>

      {status && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '8px',
          background: status.includes('Error') ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 255, 0, 0.1)',
          border: `1px solid ${status.includes('Error') ? '#ff4444' : '#00ff00'}`,
          color: status.includes('Error') ? '#ff4444' : '#00ff00',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {status}
        </div>
      )}
    </form>
  );
}