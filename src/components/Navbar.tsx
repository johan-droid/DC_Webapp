"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/characters', label: 'Characters' },
        { href: '/investigations', label: 'Investigations' },
        { href: '/news', label: 'News & Gossip' },
    ];

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <h1 className="logo">DC.</h1>

                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? 'active' : ''}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
