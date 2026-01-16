"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Types
type Character = {
    id?: string;
    name: string;
    description: string;
    image: string | null;
    faction: 'main' | 'black_organization' | 'police' | 'fbi';
};

export default function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChars = async () => {
            try {
                const res = await fetch('/api/characters');
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setCharacters(data);
            } catch (e) {
                console.error(e);
                // Fallback or empty state
            } finally {
                setLoading(false);
            }
        };
        fetchChars();
    }, []);

    const mainChars = characters.filter(c => c.faction !== 'black_organization');
    const boChars = characters.filter(c => c.faction === 'black_organization');

    const CharCard = ({ char }: { char: Character }) => (
        <motion.div
            className="char-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="char-image-wrapper">
                <div className="char-placeholder">{char.name.charAt(0)}</div>
                {char.image && (
                    <img
                        src={char.image}
                        alt={char.name}
                        className="char-img-element"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement?.querySelector('.char-placeholder')?.setAttribute('style', 'display:flex');
                        }}
                    />
                )}
            </div>
            <div className="char-content">
                <h3 className="char-name">{char.name}</h3>
                <div className="char-desc">
                    <p>{char.description}</p>
                </div>
            </div>
        </motion.div>
    );

    if (loading) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Profiles...</div>;

    return (
        <div className="container">
            <header className="character-header animate-on-scroll-active">
                <h1>The Key Players</h1>
                <p>Unravel the mystery behind the faces.</p>
            </header>

            <div className="section-divider">
                <h2>The Protagonists</h2>
            </div>

            {mainChars.length === 0 && <p className="text-center">No profiles found in database.</p>}

            <div className="character-premium-grid">
                {mainChars.map((char, i) => (
                    <CharCard key={char.id || i} char={char} />
                ))}
            </div>

            <div className="section-divider" style={{ marginTop: '4rem' }}>
                <h2 style={{ color: 'var(--accent-red)' }}>The Black Organization</h2>
            </div>

            {boChars.length === 0 && <p className="text-center">No Black Organization profiles found.</p>}

            <div className="character-premium-grid">
                {boChars.map((char, i) => (
                    <CharCard key={char.id || i} char={char} />
                ))}
            </div>

            <div className="disclaimer-section">
                <p>
                    All character data and images are sourced from <a href="https://www.detectiveconanworld.com" target="_blank">Detective Conan World</a>.
                    This content is used for informational purposes only.
                </p>
            </div>
        </div>
    );
}
