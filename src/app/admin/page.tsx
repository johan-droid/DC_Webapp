"use client";
import { useState } from 'react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'news' | 'case' | 'character'>('news');
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [newsForm, setNewsForm] = useState({ title: '', category: 'Fan Theory', image: '', content: '' });
    const [caseForm, setCaseForm] = useState({ title: '', type: 'canon', image: '', description: '' });
    const [charForm, setCharForm] = useState({ name: '', description: '', image: '', faction: 'main' });

    // Generic Handlers
    const handleNewsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData('/api/news', newsForm, () => setNewsForm({ title: '', category: 'Fan Theory', image: '', content: '' }));
    };

    const handleCaseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData('/api/cases', caseForm, () => setCaseForm({ title: '', type: 'canon', image: '', description: '' }));
    };

    const handleCharSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitData('/api/characters', charForm, () => setCharForm({ name: '', description: '', image: '', faction: 'main' }));
    };

    const submitData = async (endpoint: string, data: any, resetFn: () => void) => {
        if (!apiKey) return alert('Enter Admin Key');
        setIsLoading(true);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            if (res.ok) {
                alert('Success: ' + (resData.message || 'Operation complete'));
                resetFn();
            } else {
                alert('Error: ' + resData.error);
            }
        } catch (err) {
            alert('Network Error');
        } finally {
            setIsLoading(false);
        }
    };

    // Style helper
    const inputStyle = { display: 'block', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #444', color: 'white', borderRadius: '4px' };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600 as const, fontSize: '0.9rem' };

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

                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        className={`btn`}
                        onClick={() => setActiveTab('news')}
                        style={{ opacity: activeTab === 'news' ? 1 : 0.5, padding: '10px 20px', fontSize: '0.9rem' }}
                    >
                        Post News
                    </button>
                    <button
                        className={`btn`}
                        onClick={() => setActiveTab('case')}
                        style={{ opacity: activeTab === 'case' ? 1 : 0.5, padding: '10px 20px', fontSize: '0.9rem' }}
                    >
                        Add Case
                    </button>
                    <button
                        className={`btn`}
                        onClick={() => setActiveTab('character')}
                        style={{ opacity: activeTab === 'character' ? 1 : 0.5, padding: '10px 20px', fontSize: '0.9rem' }}
                    >
                        Add Character
                    </button>
                </div>

                {/* NEWS FORM */}
                {activeTab === 'news' && (
                    <form onSubmit={handleNewsSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Headline</label>
                            <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Category</label>
                            <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} style={inputStyle}>
                                <option>Fan Theory</option>
                                <option>Merchandise</option>
                                <option>Interview</option>
                                <option>Breaking News</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Image URL</label>
                            <input type="url" value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Content</label>
                            <textarea value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} rows={4} required style={inputStyle}></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Processing...' : 'Publish News'}</button>
                    </form>
                )}

                {/* CASE FORM */}
                {activeTab === 'case' && (
                    <form onSubmit={handleCaseSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Case Title</label>
                            <input type="text" value={caseForm.title} onChange={e => setCaseForm({ ...caseForm, title: e.target.value })} required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Type</label>
                            <select value={caseForm.type} onChange={e => setCaseForm({ ...caseForm, type: e.target.value })} style={inputStyle}>
                                <option value="canon">Manga Canon</option>
                                <option value="anime">Anime Original</option>
                                <option value="movie">Feature Film</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Evidence Image URL</label>
                            <input type="url" value={caseForm.image} onChange={e => setCaseForm({ ...caseForm, image: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Details</label>
                            <textarea value={caseForm.description} onChange={e => setCaseForm({ ...caseForm, description: e.target.value })} rows={4} required style={inputStyle}></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Processing...' : 'File Case Report'}</button>
                    </form>
                )}

                {/* CHARACTER FORM */}
                {activeTab === 'character' && (
                    <form onSubmit={handleCharSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Name</label>
                            <input type="text" value={charForm.name} onChange={e => setCharForm({ ...charForm, name: e.target.value })} required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Faction</label>
                            <select value={charForm.faction} onChange={e => setCharForm({ ...charForm, faction: e.target.value })} style={inputStyle}>
                                <option value="main">Protagonist/Ally</option>
                                <option value="black_organization">Black Organization</option>
                                <option value="police">Police</option>
                                <option value="fbi">FBI</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Profile Image URL</label>
                            <input type="url" value={charForm.image} onChange={e => setCharForm({ ...charForm, image: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Dossier / Description</label>
                            <textarea value={charForm.description} onChange={e => setCharForm({ ...charForm, description: e.target.value })} rows={4} required style={inputStyle}></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Processing...' : 'Add Dossier'}</button>
                    </form>
                )}
            </div>
        </div>
    );
}
