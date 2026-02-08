"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/lib/charactersData';
import SmartImage from './SmartImage';
import { User, Heart, Activity, Mic, ChevronDown } from 'lucide-react';

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="group relative"
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    relative w-full overflow-hidden rounded-xl border bg-[#121212] transition-all duration-500 cursor-pointer
                    ${isExpanded ? 'border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'border-white/10 hover:border-white/20 hover:shadow-xl'}
                `}
            >
                {/* Holographic Overlay Effect */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Card Header (Image + Basic Info) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {character.image ? (
                        <SmartImage
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-7xl font-bold text-neutral-800 font-serif">
                            {character.name.charAt(0)}
                        </div>
                    )}

                    {/* Gradient Fade for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 z-20">
                        {/* Faction Badge */}
                        <div className="flex items-center justify-between mb-2">
                            <span
                                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black rounded"
                                style={{ backgroundColor: character.colorTheme || '#fff' }}
                            >
                                {character.affiliation}
                            </span>
                            {character.knowsConanIdentity === 'Yes' && (
                                <span className="text-yellow-500 text-xs" title="Knows Conan's Identity">
                                    <User size={14} fill="currentColor" />
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white font-serif leading-none mb-1">
                            {character.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-wide">
                            {character.role}
                        </p>
                    </div>
                </div>

                {/* Expanded Details (Accordion style for mobile friendly) */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/50 border-t border-white/5 backdrop-blur-sm"
                        >
                            <div className="p-5 space-y-3">
                                {/* Description */}
                                <p className="text-sm text-gray-300 leading-relaxed font-light">
                                    {character.description}
                                </p>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/5">
                                    {/* Status */}
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Activity size={12} className={character.status === 'Alive' ? 'text-green-500' : 'text-red-500'} />
                                        <span>Status: <span className="text-white">{character.status}</span></span>
                                    </div>

                                    {/* Voice Actor */}
                                    {character.voiceActor && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Mic size={12} className="text-purple-400" />
                                            <span>Voice: <span className="text-white">{character.voiceActor}</span></span>
                                        </div>
                                    )}

                                    {/* Romantic Link */}
                                    {character.romanticLink && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Heart size={12} className="text-pink-500" />
                                            <span>Love: <span className="text-white">{character.romanticLink}</span></span>
                                        </div>
                                    )}

                                    {/* Aliases */}
                                    {character.aliases && character.aliases.length > 0 && (
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="shrink-0 text-blue-400 font-bold">AKA:</span>
                                            <span className="text-white/80">{character.aliases.join(', ')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expand Hint */}
                {!isExpanded && (
                    <div className="absolute bottom-2 right-2 text-white/30 animate-pulse">
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
