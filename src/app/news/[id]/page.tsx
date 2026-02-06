"use client";
import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url?: string;
    author?: string;
    created_at: string;
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewsItem();
    }, [resolvedParams.id]);

    const fetchNewsItem = async () => {
        try {
            const res = await fetch(`/api/news/${resolvedParams.id}`);
            if (res.ok) {
                const data = await res.json();
                setNews(data);
            } else {
                setNews(null);
            }
        } catch (error) {
            console.error('Failed to fetch news', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
            <h1>Loading Case File...</h1>
        </div>
    );

    if (!news) return (
        <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
            <h1 style={{ color: '#e63946' }}>404 - File Not Found</h1>
            <p>This report appears to have been redacted or destroyed.</p>
            <Link href="/news" className="btn" style={{ marginTop: '20px' }}>Return to Archives</Link>
        </div>
    );

    return (
        <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
                    ← Back to News
                </Link>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                    }}
                >
                    {news.image_url && (
                        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                            <Image
                                src={news.image_url}
                                alt={news.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '150px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                            }} />
                        </div>
                    )}

                    <div style={{ padding: '2rem 3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>{news.title}</h1>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
                            <span style={{ color: '#e63946' }}>By {news.author || 'Detective Boys'}</span>
                            <span>{new Date(news.created_at).toLocaleDateString()}</span>
                        </div>

                        <div style={{ lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                            {news.content}
                        </div>
                    </div>
                </motion.article>
            </div>
        </main>
    );
}
