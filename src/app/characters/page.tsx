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
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
                        <h3 className="text-2xl font-bold mb-4 font-serif text-red-400">New to the Case?</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Detective Conan (Case Closed) is a long-running mystery series revolving around Shinichi Kudo, a high school detective shrunk into a child by the Black Organization. He adopts the alias "Conan Edogawa" and solves cases while secretly hunting down the syndicate to regain his original form.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="bg-black/30 p-4 rounded border border-white/5">
                                <strong className="block text-white mb-1">Beginner Tip #1</strong>
                                <p className="text-gray-400">You don't need to watch all 1000+ episodes! Focus on the "Black Organization" arc episodes for the main plot.</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded border border-white/5">
                                <strong className="block text-white mb-1">Beginner Tip #2</strong>
                                <p className="text-gray-400">The movies are mostly non-canon but offer high-budget action and character moments.</p>
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
