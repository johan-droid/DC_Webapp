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

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrolled(currentScrollY > 50);
                    
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        setHidden(true);
                    } else {
                        setHidden(false);
                    }
                    
                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

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
        { href: '/news', label: 'News' },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "-100%",
            transition: {
                duration: 0.3,
                ease: "easeOut" as const
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -50 },
        open: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <motion.nav 
            className={`navbar ${hidden ? 'hide' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                background: scrolled 
                    ? 'rgba(13, 13, 13, 0.95)' 
                    : 'rgba(13, 13, 13, 0.6)',
                backdropFilter: scrolled ? 'blur(30px)' : 'blur(20px)',
            }}
        >
            <div className="container nav-content">
                <Link href="/" className="logo" onClick={closeMenu}>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        DC.
                    </motion.span>
                </Link>

                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className="nav-links" style={{ display: 'none' }}>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? 'active' : ''}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            className="nav-links active"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {links.map((link) => (
                                <motion.li key={link.href} variants={itemVariants}>
                                    <Link
                                        href={link.href}
                                        className={pathname === link.href ? 'active' : ''}
                                        onClick={closeMenu}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                @media (min-width: 769px) {
                    .nav-links[style*="display: none"] {
                        display: flex !important;
                    }
                    .hamburger {
                        display: none !important;
                    }
                }
            `}</style>
        </motion.nav>
    );
}