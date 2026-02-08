"use client";

import { motion } from 'framer-motion';
import { characterGroups } from '@/lib/charactersData';
import CharacterGroup from '@/components/CharacterGroup';
import CharacterNetwork from '@/components/CharacterNetwork';
import Link from 'next/link';

export default function CharactersPage() {
    return (
        <main className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden selection:bg-red-800 selection:text-white">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">

                {/* Abstract Detective Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-[#0d0d0d]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent" />
                    {/* Simple Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_12px)]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight"
                    >
                        THE <span className="text-red-600 inline-block filter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">SUSPECTS</span> & ALLIES
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed font-mono"
                    >
                        "There is always only one truth!"
                        <br />
                        <span className="text-sm md:text-base opacity-70 mt-2 block font-sans">
                            Dive into the files of the Tokyo Metropolitan Police, the FBI, and the mysterious Black Organization.
                        </span>
                    </motion.p>
                </div>
            </section>

            {/* Network Visualization */}
            <section className="py-12 bg-black/20">
                <div className="container mx-auto px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold font-serif text-gray-200">Relationship Web</h2>
                        <p className="text-sm text-gray-500">Interactive Map</p>
                    </div>
                    <CharacterNetwork />
                </div>
            </section>

            {/* Intro for New Weebs */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-950/10 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl relative overflow-hidden group hover:border-red-500/30 transition-colors duration-500">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-600 to-transparent" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-6 font-serif text-white tracking-wide border-b border-white/10 pb-4 inline-block">
                                    <span className="text-red-500 mr-2">///</span>
                                    Mission Briefing
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed text-lg font-light">
                                    <strong className="text-white font-medium">Detective Conan</strong> (also known as <em>Case Closed</em>) follows the story of Shinichi Kudo, a brilliant high school detective. After witnessing a shady deal by the <span className="text-red-400">Black Organization</span>, he is force-fed an experimental drug (APTX 4869) that shrinks him into a child.
                                </p>
                                <p className="text-gray-400 leading-relaxed font-light">
                                    Adopting the alias <strong>"Conan Edogawa"</strong>, he lives with his childhood friend Ran and her detective father, solving cases from the shadows while hunting down the syndicate to regain his body.
                                </p>
                            </div>

                            <div className="w-full md:w-1/3 flex flex-col gap-4">
                                <div className="bg-black/40 p-5 rounded-xl border border-white/10 hover:bg-black/60 transition-colors">
                                    <strong className="block text-red-400 mb-2 text-sm uppercase tracking-wider">Directive #1</strong>
                                    <p className="text-gray-400 text-sm">Focus on the <strong>"Black Organization"</strong> episodes. They contain the core plot progression.</p>
                                </div>
                                <div className="bg-black/40 p-5 rounded-xl border border-white/10 hover:bg-black/60 transition-colors">
                                    <strong className="block text-blue-400 mb-2 text-sm uppercase tracking-wider">Directive #2</strong>
                                    <p className="text-gray-400 text-sm">Movies are largely non-canon but offer spectacular action. Treat them as high-budget side missions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Character Groups */}
            <div className="relative">
                {/* Vertical connector line running through sections */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-900/50 to-transparent transform -translate-x-1/2 hidden md:block" />

                {characterGroups.map((group, index) => (
                    <CharacterGroup key={group.id} group={group} />
                ))}
            </div>

            {/* Credits */}
            <footer className="py-20 mt-20 border-t border-white/10 bg-neutral-900 text-center relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <h4 className="text-lg font-bold text-gray-500 mb-4 uppercase tracking-widest">Case File Closed</h4>
                    <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8">
                        Data compiled from Detective Conan World & Various Official Databooks.
                        <br />
                        Images &copy; Gosho Aoyama / Shogakukan / YTV / TMS Entertainment.
                        <br />
                        Fan project for educational and entertainment purposes.
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 border border-red-900 text-red-500 hover:bg-red-900/20 transition-colors rounded uppercase text-xs font-bold tracking-widest">
                        Return to HQ
                    </Link>
                </div>
                {/* Footer background texture */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-transparent to-transparent pointer-events-none" />
            </footer>

        </main>
    );
}
