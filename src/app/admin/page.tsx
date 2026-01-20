"use client";
import { useState } from 'react';

// Types for your forms
type NewsForm = { title: string; category: string; image: string; content: string };
type CaseForm = { title: string; type: string; image: string; description: string };
type CharForm = { name: string; description: string; image: string; faction: string };

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'news' | 'case' | 'character'>('news');
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial States
    const initNews = { title: '', category: 'Fan Theory', image: '', content: '' };
    const initCase = { title: '', type: 'canon', image: '', description: '' };
    const initChar = { name: '', description: '', image: '', faction: 'main' };

    const [newsForm, setNewsForm] = useState<NewsForm>(initNews);
    const [caseForm, setCaseForm] = useState<CaseForm>(initCase);
    const [charForm, setCharForm] = useState<CharForm>(initChar);

    const handleSubmit = async (endpoint: string, data: any, resetFn: () => void) => {
        if (!apiKey) return setMessage({ type: 'error', text: 'Please enter the Admin Key' });
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
                body: JSON.stringify(data)
            });
            const resData = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: resData.message || 'Success' });
                resetFn();
            } else {
                setMessage({ type: 'error', text: resData.error || 'Operation failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network connection failed' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-wrapper">
            <div className="admin-card">
                <h2 className="admin-title">Scriptwriter Terminal</h2>

                {/* Status Message */}
                {message && (
                    <div className={`status-msg ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* API Key Input */}
                <div className="auth-section">
                    <label>🔐 Admin Access Key</label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter Secret Key"
                        className="input-field"
                    />
                </div>

                {/* Tabs */}
                <div className="tabs">
                    {[
                        { id: 'news', label: 'News' },
                        { id: 'case', label: 'Cases' },
                        { id: 'character', label: 'Characters' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id as any)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Forms Container */}
                <div className="form-container">
                    {activeTab === 'news' && (
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('/api/news', newsForm, () => setNewsForm(initNews)); }}>
                            <FormGroup label="Headline">
                                <input type="text" className="input-field" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required />
                            </FormGroup>
                            <FormGroup label="Category">
                                <select className="input-field" value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}>
                                    <option>Fan Theory</option>
                                    <option>Merchandise</option>
                                    <option>Interview</option>
                                    <option>Breaking News</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Content">
                                <textarea className="input-field" rows={5} value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} required />
                            </FormGroup>
                            <SubmitBtn loading={isLoading} text="Publish News" />
                        </form>
                    )}

                    {activeTab === 'case' && (
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('/api/cases', caseForm, () => setCaseForm(initCase)); }}>
                            <FormGroup label="Case Title">
                                <input type="text" className="input-field" value={caseForm.title} onChange={e => setCaseForm({ ...caseForm, title: e.target.value })} required />
                            </FormGroup>
                            <FormGroup label="Type">
                                <select className="input-field" value={caseForm.type} onChange={e => setCaseForm({ ...caseForm, type: e.target.value })}>
                                    <option value="canon">Manga Canon</option>
                                    <option value="anime">Anime Original</option>
                                    <option value="movie">Feature Film</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Details">
                                <textarea className="input-field" rows={5} value={caseForm.description} onChange={e => setCaseForm({ ...caseForm, description: e.target.value })} required />
                            </FormGroup>
                            <SubmitBtn loading={isLoading} text="File Case" />
                        </form>
                    )}

                    {activeTab === 'character' && (
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('/api/characters', charForm, () => setCharForm(initChar)); }}>
                            <FormGroup label="Name">
                                <input type="text" className="input-field" value={charForm.name} onChange={e => setCharForm({ ...charForm, name: e.target.value })} required />
                            </FormGroup>
                            <FormGroup label="Faction">
                                <select className="input-field" value={charForm.faction} onChange={e => setCharForm({ ...charForm, faction: e.target.value })}>
                                    <option value="main">Protagonist/Ally</option>
                                    <option value="black_organization">Black Organization</option>
                                    <option value="police">Police</option>
                                    <option value="fbi">FBI</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Dossier">
                                <textarea className="input-field" rows={5} value={charForm.description} onChange={e => setCharForm({ ...charForm, description: e.target.value })} required />
                            </FormGroup>
                            <SubmitBtn loading={isLoading} text="Add Character" />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

// UI Components for cleaner code
const FormGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        {children}
    </div>
);

const SubmitBtn = ({ loading, text }: { loading: boolean, text: string }) => (
    <button type="submit" className="btn submit-btn" disabled={loading}>
        {loading ? 'Processing...' : text}
    </button>
);
