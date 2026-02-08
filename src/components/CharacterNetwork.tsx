"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

// Enhanced nodes including characters from your document
const nodes = [
    // Protagonists
    { id: 'conan', x: 50, y: 50, label: 'Conan / Shinichi', type: 'protagonist' },
    { id: 'ran', x: 35, y: 50, label: 'Ran Mōri', type: 'ally' },
    { id: 'haibara', x: 65, y: 55, label: 'Ai Haibara / Sherry', type: 'ally' },

    // FBI / Law Enforcement
    { id: 'akai', x: 25, y: 30, label: 'Shūichi Akai', type: 'fbi' },
    { id: 'jodie', x: 15, y: 35, label: 'Jodie Starling', type: 'fbi' },
    { id: 'amuro', x: 75, y: 30, label: 'Amuro / Bourbon', type: 'psb' },

    // Black Organization
    { id: 'gin', x: 50, y: 15, label: 'Gin', type: 'bo' },
    { id: 'vermouth', x: 65, y: 20, label: 'Vermouth', type: 'bo' },
    { id: 'rum', x: 35, y: 15, label: 'Rum', type: 'bo' },

    // Others
    { id: 'kid', x: 85, y: 50, label: 'Kaitō Kid', type: 'rival' },
    { id: 'heiji', x: 15, y: 65, label: 'Heiji Hattori', type: 'rival' },
    { id: 'mary', x: 25, y: 10, label: 'Mary Sera', type: 'mi6' }
];

const links = [
    { source: 'conan', target: 'ran', label: 'Romantic', type: 'bond' },
    { source: 'conan', target: 'haibara', label: 'Partners', type: 'bond' },
    { source: 'conan', target: 'akai', label: 'Strategic Allies', type: 'bond' },
    { source: 'conan', target: 'amuro', label: 'Mutual Respect/Suspicion', type: 'neutral' },
    { source: 'gin', target: 'conan', label: 'Primary Target', type: 'hostile' },
    { source: 'akai', target: 'gin', label: 'Nemesis', type: 'hostile' },
    { source: 'vermouth', target: 'conan', label: 'Secret Protector', type: 'bond' },
    { source: 'rum', target: 'conan', label: 'Searching', type: 'hostile' },
    { source: 'mary', target: 'akai', label: 'Family', type: 'bond' },
    { source: 'jodie', target: 'vermouth', label: 'Target', type: 'hostile' }
];

export default function CharacterNetwork() {
    return (
        <section className="py-12 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tighter uppercase">
                        Intelligence Network
                    </h2>
                    <p className="text-gray-400 mt-2">Mapping connections and secret identities</p>
                </div>

                {/* Glassy Container */}
                <div className="relative w-full h-[600px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">

                    {/* Background Grid for Detective Vibe */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {links.map((link, i) => {
                            const source = nodes.find(n => n.id === link.source)!;
                            const target = nodes.find(n => n.id === link.target)!;
                            return (
                                <motion.line
                                    key={i}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    x1={`${source.x}%`} y1={`${source.y}%`}
                                    x2={`${target.x}%`} y2={`${target.y}%`}
                                    stroke={link.type === 'hostile' ? '#ff4444' : '#60a5fa'}
                                    strokeWidth="1.5"
                                />
                            );
                        })}
                    </svg>

                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            className="absolute z-10 flex flex-col items-center"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className={`
                                w-14 h-14 rounded-2xl border backdrop-blur-md flex items-center justify-center
                                ${node.type === 'bo' ? 'border-red-500/50 bg-red-500/10' : 'border-cyan-500/50 bg-cyan-500/10'}
                                shadow-lg cursor-pointer
                            `}>
                                <span className="text-white font-mono font-bold text-lg">{node.label.charAt(0)}</span>
                            </div>
                            <span className="mt-2 text-[10px] uppercase tracking-widest text-gray-300 font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
                                {node.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
