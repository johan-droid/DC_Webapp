"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/news', label: 'News' },
        { href: '/characters', label: 'Characters' },
    ];

    return (
        <>
            {/* Translucent overlay when mobile menu is open */}
            {isOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        zIndex: 999,
                        transition: 'opacity 0.3s ease',
                        opacity: isOpen ? 1 : 0
                    }}
                />
            )}

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
                <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <Link href="/" className="logo">
                        <motion.span whileHover={{ scale: 1.1, color: '#e63946' }}>DC.</motion.span>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        className={`hamburger ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        style={{
                            position: 'relative',
                            zIndex: 1002,
                            padding: '10px', /* Larger tap target */
                            marginTop: '4px'
                        }}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    {/* Mobile Navigation Menu */}
                    <ul className={`nav-links ${isOpen ? 'active' : ''}`} style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                        {/* Close button for mobile menu */}
                        <li className="mobile-close-btn" style={{ display: 'none' }}>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close navigation menu"
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    zIndex: 1001
                                }}
                            >
                                ×
                            </button>
                        </li>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={pathname === link.href ? 'active' : ''}
                                    style={{ color: pathname === link.href ? '#e63946' : '#fff', textDecoration: 'none' }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.nav>
        </>
    );
}