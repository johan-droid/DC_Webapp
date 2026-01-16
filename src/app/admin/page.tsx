"use client";
import { useState } from 'react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'news' | 'case'>('news');
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [newsForm, setNewsForm] = useState({ title: '', category: 'Fan Theory', image: '', content: '' });
    const [caseForm, setCaseForm] = useState({ title: '', type: 'canon', image: '', description: '' });

    const handleNewsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) return alert('Enter Admin Key');
        setIsLoading(true);

        try {
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
                body: JSON.stringify(newsForm)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Success: ' + data.message);
                setNewsForm({ title: '', category: 'Fan Theory', image: '', content: '' });
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Network Error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCaseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) return alert('Enter Admin Key');
        setIsLoading(true);

        try {
            const res = await fetch('/api/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
                body: JSON.stringify(caseForm)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Success: ' + data.message);
                setCaseForm({ title: '', type: 'canon', image: '', description: '' });
            } else {
                alert('Error: ' + data.error);
            }
        } catch (err) {
            alert('Network Error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="admin-container" style={{
                maxWidth: '800px', margin: '0 auto', padding: '2rem',
                background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Scriptwriter Terminal</h2>

                <div style={{ background: 'rgba(230, 57, 70, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--accent-red)' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>🔐 Admin Access Key</label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter Secret Key"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                        className={`btn ${activeTab === 'news' ? '' : 'video-btn-inactive'}`} // simplified logic
                        onClick={() => setActiveTab('news')}
                        style={{ opacity: activeTab === 'news' ? 1 : 0.5 }}
                    >
                        Post News
                    </button>
                    <button
                        className={`btn`}
                        onClick={() => setActiveTab('case')}
                        style={{ opacity: activeTab === 'case' ? 1 : 0.5 }}
                    >
                        Add Case File
                    </button>
                </div>

                {activeTab === 'news' && (
                    <form onSubmit={handleNewsSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Headline</label>
                            <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Category</label>
                            <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>
                                <option>Fan Theory</option>
                                <option>Merchandise</option>
                                <option>Interview</option>
                                <option>Breaking News</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Image URL</label>
                            <input type="url" value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Content</label>
                            <textarea value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} rows={4} required style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }}></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Processing...' : 'Publish News'}</button>
                    </form>
                )}

                {activeTab === 'case' && (
                    <form onSubmit={handleCaseSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Case Title</label>
                            <input type="text" value={caseForm.title} onChange={e => setCaseForm({ ...caseForm, title: e.target.value })} required style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Type</label>
                            <select value={caseForm.type} onChange={e => setCaseForm({ ...caseForm, type: e.target.value })} style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>
                                <option value="canon">Manga Canon</option>
                                <option value="anime">Anime Original</option>
                                <option value="movie">Feature Film</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Evidence Image URL</label>
                            <input type="url" value={caseForm.image} onChange={e => setCaseForm({ ...caseForm, image: e.target.value })} style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Details</label>
                            <textarea value={caseForm.description} onChange={e => setCaseForm({ ...caseForm, description: e.target.value })} rows={4} required style={{ display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' }}></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Processing...' : 'File Case Report'}</button>
                    </form>
                )}
            </div>
        </div>
    );
}
