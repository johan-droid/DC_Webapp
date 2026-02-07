"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
    <div className="admin-dashboard" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Console</h1>
            <p style={{ opacity: 0.6 }}>Manage news reports and classified data.</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid #ff4444',
              color: '#ff4444',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
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
            <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <NewsCreationForm />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NewsCreationForm() {
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
      });

      if (res.ok) {
        setStatus('News Published Successfully');
        setForm({ title: '', content: '', author: '', category: 'General' });
        setImageFile(null);
        // Reset file input manually if needed
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('Transmission Failed');
    } finally {
      setIsUploading(false);
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
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Panel Size (Category)</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={inputStyle}
            >
              <option value="General">Standard (General)</option>
              <option value="Featured">Featured (Large)</option>
              <option value="Banner">Banner (Wide)</option>
              <option value="Sidebar">Sidebar (Compact)</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Evidence Photo (JPG/PNG)</label>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            style={inputStyle}
          />
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
        <button type="submit" style={buttonStyle} disabled={isUploading}>
          {isUploading ? 'Transmitting Data...' : 'Publish Report'}
        </button>
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