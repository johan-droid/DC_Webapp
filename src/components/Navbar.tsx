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

    const links = [
        { href: '/', label: 'Home' },
        { href: '/characters', label: 'Characters' },
        { href: '/investigations', label: 'Investigations' },
        { href: '/news', label: 'News' },
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
                background: scrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none'
            }}
        >
            <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <Link href="/" className="logo">
                    <motion.span whileHover={{ scale: 1.1, color: '#e63946' }}>DC.</motion.span>
                </Link>

                <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? 'active' : ''}
                                style={{ color: pathname === link.href ? '#e63946' : '#fff', textDecoration: 'none' }}
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