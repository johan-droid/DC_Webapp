"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characterGroups } from '@/lib/charactersData';
import CharacterCard from '@/components/CharacterCard';
import CharacterFilters from '@/components/CharacterFilters';

export default function CharactersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Logic: If search or filter is active, use flattened list. Otherwise, group view.
    const isDefaultView = searchQuery === '' && activeFilter === 'all';

    // Flatten all characters for search
    const allCharacters = characterGroups.flatMap(group => group.characters);

    // Filter Logic (only used when NOT in default view)
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
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-red-800 selection:text-white pb-32">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://www.detectiveconanworld.com/wiki/images/6/6e/Movie_26_Teaser.jpg')] bg-cover bg-center opacity-30 blur-sm scale-105 animate-pulse-slow" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold mb-4 font-serif tracking-tighter">
                            THE <span className="text-red-600 inline-block filter drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">SUSPECTS</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-xs md:text-sm tracking-[0.5em] uppercase opacity-80">
                            Case File No. 1412 • Top Secret
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Filters */}
            <CharacterFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            {/* Quick Navigation (Only in Default View) */}
            {isDefaultView && (
                <div className="bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5 py-3 overflow-x-auto sticky top-[73px] z-30">
                    <div className="container mx-auto px-4 flex gap-6 md:justify-center min-w-max">
                        {characterGroups.map((group) => (
                            <a
                                key={group.id}
                                href={`#${group.id}`}
                                className="text-xs font-mono text-gray-400 hover:text-red-500 transition-colors whitespace-nowrap uppercase tracking-widest flex items-center gap-2 group"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors" />
                                {group.title.split('&')[0]}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="container mx-auto px-4">

                {/* VIEW 1: Grouped View (Default) */}
                {isDefaultView && (
                    <div className="space-y-24 py-12">
                        {characterGroups.map((group, groupIndex) => (
                            <section key={group.id} id={group.id} className="scroll-mt-48">
                                {/* Group Header */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="mb-8 border-l-4 border-red-600 pl-6 py-2"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight mb-2">
                                        {group.title}
                                    </h2>
                                    <p className="text-gray-400 font-light max-w-2xl text-sm md:text-base">
                                        {group.description}
                                    </p>
                                </motion.div>

                                {/* Character Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                                    {group.characters.map((char) => (
                                        <CharacterCard key={char.id} character={char} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}


                {/* VIEW 2: Flattened Search Results */}
                {!isDefaultView && (
                    <section className="py-12 min-h-[60vh]">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                Search Results
                            </h2>
                            <span className="text-xs text-gray-500 font-mono border border-white/10 px-2 py-1 rounded">
                                {filteredCharacters.length} MATCHES FOUND
                            </span>
                        </div>

                        {filteredCharacters.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8"
                            >
                                <AnimatePresence>
                                    {filteredCharacters.map((char) => (
                                        <CharacterCard key={char.id} character={char} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-white/5"
                            >
                                <h3 className="text-2xl text-gray-400 font-serif mb-2">No Records Found</h3>
                                <p className="text-gray-600 text-sm font-mono">Query returned 0 results. Try a different alias or code name.</p>
                            </motion.div>
                        )}
                    </section>
                )}

            </div>
        </main>
    );
}
