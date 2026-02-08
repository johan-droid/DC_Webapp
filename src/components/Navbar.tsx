"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/news', label: 'News' },
        { href: '/admin', label: 'Admin' },
    ];

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={false}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                background: scrolled
                    ? 'rgba(13, 13, 13, 0.85)'
                    : 'rgba(13, 13, 13, 0.3)',
                backdropFilter: scrolled
                    ? 'blur(20px) saturate(180%)'
                    : 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: scrolled
                    ? 'blur(20px) saturate(180%)'
                    : 'blur(12px) saturate(150%)',
                borderBottom: scrolled
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', height: '100%' }}>
                <Link href="/" className="logo">
                    <motion.span whileHover={{ scale: 1.1, color: '#e63946' }}>DC.</motion.span>
                </Link>

                <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? 'active' : ''}
                                style={{
                                    color: pathname === link.href ? '#e63946' : '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
}