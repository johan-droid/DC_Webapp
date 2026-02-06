"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Bounty {
    id: string;
    title: string;
    description: string;
    reward: string;
    status: 'open' | 'closed' | 'claimed';
    created_at: string;
}

export default function BountiesPage() {
    const [bounties, setBounties] = useState<Bounty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBounties();
    }, []);

    const fetchBounties = async () => {
        try {
            const res = await fetch('/api/bounties');
            if (res.ok) {
                const data = await res.json();
                setBounties(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Failed to fetch bounties', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))' }}>
                <h1 className="text-center">Loading Bounties...</h1>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
            <div className="container">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.h1
                        variants={itemVariants}
                        className="text-center"
                        style={{
                            marginBottom: '2rem',
                            color: '#e63946',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        🎯 Active Bounties
                    </motion.h1>

                    <p className="text-center" style={{ marginBottom: '3rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Help the Detective Boys solve these cases. Rewards are guaranteed.
                    </p>

                    {bounties.length === 0 ? (
                        <div className="text-center" style={{ padding: '3rem', background: 'var(--glass-bg)', borderRadius: '1rem' }}>
                            <p>No active bounties at the moment. The city is safe... for now.</p>
                        </div>
                    ) : (
                        <div className="card-grid">
                            {bounties.map((bounty) => (
                                <motion.div
                                    key={bounty.id}
                                    className="card"
                                    variants={itemVariants}
                                    style={{
                                        borderLeft: bounty.status === 'open' ? '4px solid #e63946' : '4px solid #555',
                                        opacity: bounty.status !== 'open' ? 0.6 : 1
                                    }}
                                >
                                    <div className="card-content">
                                        <div className="card-category" style={{
                                            background: bounty.status === 'open' ? 'rgba(230, 57, 70, 0.2)' : 'rgba(255,255,255,0.1)',
                                            color: bounty.status === 'open' ? '#e63946' : '#999'
                                        }}>
                                            {bounty.status.toUpperCase()}
                                        </div>

                                        <h3>{bounty.title}</h3>
                                        <p>{bounty.description}</p>

                                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Reward:</span>
                                            <strong style={{ color: '#ffd700', fontSize: '1.1rem' }}>{bounty.reward}</strong>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
