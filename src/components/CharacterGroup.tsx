"use client";

import { motion } from 'framer-motion';
import { CharacterGroup as ICharacterGroup } from '@/lib/charactersData';
import CharacterCard from './CharacterCard';

interface CharacterGroupProps {
    group: ICharacterGroup;
}

export default function CharacterGroup({ group }: CharacterGroupProps) {
    return (
        <section className="py-16 md:py-24 relative border-b border-white/5 last:border-0" id={group.id}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4 font-serif text-white">
                        <span className="w-2 h-12 bg-red-600 rounded"></span>
                        {group.title}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl font-light pl-6 border-l border-white/10">
                        {group.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {group.characters.map((char) => (
                        <CharacterCard key={char.id} character={char} />
                    ))}
                </div>
            </div>
        </section>
    );
}
