import { supabase } from '@/lib/supabase';
// REMOVED: import Image from 'next/image'; 
// REASON: Using standard img tag prevents crashes when Admin adds images from unconfigured domains.

// Server Component
export default async function NewsPage() {
    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <section className="section">
            <div className="container">
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>News & Gossip</h1>
                <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                    The latest whispers from Beika City.
                </p>

                <div className="card-grid">
                    {(!news || news.length === 0) ? (
                        <p style={{ textAlign: 'center', width: '100%', color: '#aaa' }}>
                            {error ? '📡 Database Connection Error.' : 'No recent signals intercepted.'}
                        </p>
                    ) : (
                        news.map((item: any) => (
                            <article key={item.id} className="card">
                                <div className="card-image" style={{ position: 'relative' }}>
                                    {/* FIX: Use standard img to handle any external URL without crashing */}
                                    <img
                                        src={item.image || '/assets/hero-bg.png'}
                                        alt={item.title || 'News Image'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-content">
                                    <span className="card-category">
                                        {item.category} • {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.content.substring(0, 100)}...</p>
                                    <a href={item.link || '#'} className="read-more">Read Full Report →</a>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
