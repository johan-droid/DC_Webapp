"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { characterGroups } from '@/lib/charactersData';
import CharacterCard from '@/components/CharacterCard';
import CharacterFilters from '@/components/CharacterFilters';

export default function CharactersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Flatten all characters for search
    const allCharacters = characterGroups.flatMap(group => group.characters);

    // Filter Logic
    const filteredCharacters = allCharacters.filter(char => {
        const matchesSearch =
            char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            char.aliases?.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
            char.affiliation.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;

        // Custom Filter Logic
        if (activeFilter === 'police') return matchesSearch && (char.affiliation.includes('Police') || char.affiliation.includes('PSB') || char.affiliation.includes('MPD'));
        if (activeFilter === 'fbi') return matchesSearch && (char.affiliation.includes('FBI') || char.affiliation.includes('CIA') || char.affiliation.includes('MI6'));
        if (activeFilter === 'bo') return matchesSearch && (char.affiliation.includes('Black Organization') || char.affiliation.includes('BO'));
        if (activeFilter === 'detective') return matchesSearch && (char.role.toLowerCase().includes('detective'));

        return matchesSearch;
    });

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-red-800 selection:text-white">

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://www.detectiveconanworld.com/wiki/images/6/6e/Movie_26_Teaser.jpg')] bg-cover bg-center opacity-20 blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-bold mb-4 font-serif tracking-tighter"
                    >
                        THE <span className="text-red-600 inline-block filter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">SUSPECTS</span> NO. 1412
                    </motion.h1>
                    <p className="text-gray-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-80">
                        Top Secret - Code: Silver Bullet
                    </p>
                </div>
            </section>

            {/* Sticky Filters */}
            <CharacterFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            {/* Results Grid */}
            <section className="py-12 container mx-auto px-4 min-h-[50vh]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Database Results
                    </h2>
                    <span className="text-sm text-gray-500 font-mono">
                        {filteredCharacters.length} RECORDS FOUND
                    </span>
                </div>

                {filteredCharacters.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                    >
                        {filteredCharacters.map((char) => (
                            <CharacterCard key={char.id} character={char} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-20 text-center">
                        <h3 className="text-2xl text-gray-700 font-serif mb-2">No Records Found</h3>
                        <p className="text-gray-500 text-sm">Target unknown. Please refine your search parameters.</p>
                    </div>
                )}
            </section>

        </main>
    );
}
