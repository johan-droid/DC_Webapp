"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Types
type Character = {
    id?: string;
    name: string;
    description: string;
    image: string | null;
    faction: 'main' | 'black_organization' | 'police' | 'fbi';
};

const CharCard = ({ char }: { char: Character }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            className="char-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="char-image-wrapper">
                <div className="char-placeholder">{char.name.charAt(0)}</div>
                {char.image && !imageError && (
                    <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="char-img-element object-cover"
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImageError(true)}
                        onLoadingComplete={(result) => {
                            if (result.naturalWidth === 0) {
                                setImageError(true);
                            }
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
};

export default function CharacterList({ characters }: { characters: Character[] }) {
    const mainChars = characters.filter(c => c.faction !== 'black_organization');
    const boChars = characters.filter(c => c.faction === 'black_organization');

    return (
        <>
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
        </>
    );
}
