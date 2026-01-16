"use client";
import { motion } from 'framer-motion';
import { mainCharactersData, blackOrgCharactersData } from '@/data/characters';

const CharCard = ({ char }: { char: any }) => (
    <motion.div
        className="char-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
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

export default function CharactersPage() {
    return (
        <div className="container">
            <header className="character-header animate-on-scroll-active">
                <h1>The Key Players</h1>
                <p>Unravel the mystery behind the faces.</p>
            </header>

            <div className="section-divider">
                <h2>The Protagonists</h2>
            </div>
            <div className="character-premium-grid">
                {mainCharactersData.map((char, i) => (
                    <CharCard key={i} char={char} />
                ))}
            </div>

            <div className="section-divider" style={{ marginTop: '4rem' }}>
                <h2 style={{ color: 'var(--accent-red)' }}>The Black Organization</h2>
            </div>
            <div className="character-premium-grid">
                {blackOrgCharactersData.map((char, i) => (
                    <CharCard key={i} char={char} />
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
