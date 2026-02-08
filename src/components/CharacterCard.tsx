"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/lib/charactersData';
import SmartImage from './SmartImage';
import { User, Heart, Activity } from 'lucide-react';

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div
                className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.15)] bg-[rgba(26,26,26,0.7)] backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(211,47,47,0.3)] hover:-translate-y-2"
                style={{
                    borderColor: isHovered ? character.colorTheme || 'var(--detective-red)' : 'rgba(255,255,255,0.15)'
                }}
            >
                {/* Background Gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 opacity-80 z-10"
                />

                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                    {character.image ? (
                        <SmartImage
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-6xl font-bold text-zinc-800 font-serif">
                            {character.name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-5 flex flex-col justify-end h-full pointer-events-none">

                    {/* Tag */}
                    <motion.div
                        className="self-start mb-2 px-2 py-1 bg-red-900/80 text-red-100 text-[10px] uppercase font-bold tracking-wider rounded border border-red-500/30 backdrop-blur-sm"
                    >
                        {character.affiliation}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md font-serif leading-tight">
                        {character.name}
                    </h3>

                    <p className="text-sm text-gray-300 mb-3 font-mono border-l-2 border-red-500 pl-2">
                        {character.role}
                    </p>

                    {/* Quick Stats (Always Visible) */}
                    <div className="flex gap-4 text-xs text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                            <Activity size={12} className={character.status === 'Alive' ? 'text-green-500' : 'text-red-500'} />
                            {character.status}
                        </div>
                        {character.knowsConanIdentity === 'Yes' && (
                            <div className="flex items-center gap-1 text-yellow-500">
                                <User size={12} />
                                Knows Secret
                            </div>
                        )}
                    </div>

                    {/* Expanded Info */}
                    <AnimatePresence>
                        {(isHovered || isExpanded) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm text-gray-300 leading-relaxed font-light border-t border-white/10 pt-3 mt-2">
                                    {character.description}
                                </p>

                                {character.romanticLink && (
                                    <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                                        <Heart size={12} className="text-pink-500" fill="currentColor" />
                                        <span>Love: <span className="text-white">{character.romanticLink}</span></span>
                                    </div>
                                )}

                                {character.relationships && (
                                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <User size={12} className="text-blue-400" />
                                        <span>Note: {character.relationships}</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Glass Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
        </motion.div>
    );
}
