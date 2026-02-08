"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [token, setToken] = useState('');
    const [status, setStatus] = useState('Standby');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Authenticating...');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStatus('Access Granted');
                // Redirect to admin dashboard
                router.push('/admin');
            } else {
                const data = await res.json();
                setStatus(data.error || 'Access Denied');
            }
        } catch (_) {
            setStatus('Connection Failed');
        }
    };

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
                    placeholder="Enter Admin Key"
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
