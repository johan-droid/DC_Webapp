"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

// Define the nodes for our "Evidence Board"
const nodes = [
    { id: 'conan', x: 50, y: 50, label: 'Conan', type: 'protagonist', img: null },
    { id: 'ran', x: 30, y: 50, label: 'Ran', type: 'ally', img: null },
    { id: 'kogoro', x: 40, y: 30, label: 'Kogoro', type: 'ally', img: null },
    { id: 'haibara', x: 60, y: 60, label: 'Haibara', type: 'ally', img: null },
    { id: 'agasa', x: 70, y: 50, label: 'Agasa', type: 'ally', img: null },
    { id: 'heiji', x: 20, y: 70, label: 'Heiji', type: 'rival', img: null },
    { id: 'kid', x: 80, y: 20, label: 'Kid', type: 'rival', img: null },
    { id: 'akai', x: 20, y: 20, label: 'Akai', type: 'fbi', img: null },
    { id: 'amuro', x: 80, y: 80, label: 'Amuro', type: 'psb', img: null },
    { id: 'gin', x: 50, y: 10, label: 'Gin', type: 'bo', img: null },
    { id: 'vermouth', x: 60, y: 20, label: 'Vermouth', type: 'bo', img: null },
];

const links = [
    { source: 'conan', target: 'ran', label: 'Love / Secret' },
    { source: 'conan', target: 'kogoro', label: 'Mouthpiece' },
    { source: 'conan', target: 'haibara', label: 'Partners' },
    { source: 'conan', target: 'agasa', label: 'Gadgets' },
    { source: 'conan', target: 'heiji', label: 'Rivals / Friends' },
    { source: 'conan', target: 'kid', label: 'Rivals' },
    { source: 'conan', target: 'akai', label: 'Allies' },
    { source: 'conan', target: 'amuro', label: 'Complex' },
    { source: 'gin', target: 'conan', label: 'Hunter' },
    { source: 'vermouth', target: 'conan', label: 'Silver Bullet' },
    { source: 'akai', target: 'amuro', label: 'Enemies' },
    { source: 'akai', target: 'gin', label: 'Nemesis' },
    { source: 'ran', target: 'kogoro', label: 'Father/Daughter' },
];

export default function CharacterNetwork() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-square md:aspect-[16/9] bg-neutral-900 overflow-hidden rounded-xl border border-neutral-700 shadow-2xl">
            {/* Corkboard Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] pointer-events-none" />

            {/* Grid Lines (Detective vibe) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <motion.div className="relative w-full h-full p-10">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {links.map((link, i) => {
                        const source = nodes.find(n => n.id === link.source)!;
                        const target = nodes.find(n => n.id === link.target)!;

                        return (
                            <g key={i}>
                                <motion.line
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    x1={`${source.x}%`}
                                    y1={`${source.y}%`}
                                    x2={`${target.x}%`}
                                    y2={`${target.y}%`}
                                    stroke={link.label.includes('Enemies') || link.label.includes('Hunter') ? '#c0392b' : '#ecf0f1'}
                                    strokeWidth="2"
                                    strokeOpacity="0.4"
                                    strokeDasharray={link.label.includes('Secret') ? "5,5" : "0"}
                                />
                                {/* Label on line generic center */}
                                {/* <text 
                    x={(source.x + target.x) / 2 + '%'} 
                    y={(source.y + target.y) / 2 + '%'}
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    className="opacity-50"
                  >
                    {link.label}
                  </text> */}
                            </g>
                        );
                    })}
                </svg>

                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className="absolute z-10"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
                        whileHover={{ scale: 1.2, zIndex: 50 }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className={`
              transform -translate-x-1/2 -translate-y-1/2 
              w-16 h-16 md:w-20 md:h-20 
              rounded-full border-2 
              flex items-center justify-center 
              shadow-[0_0_20px_rgba(0,0,0,0.5)]
              bg-neutral-800
              ${node.type === 'bo' ? 'border-red-600' : 'border-blue-400'}
              cursor-pointer
              overflow-hidden
            `}>
                            <div className="text-xs md:text-sm font-bold text-white/50">{node.label.charAt(0)}</div>
                            {/* Image Placeholder */}
                        </div>

                        {/* Label Tag */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded whitespace-nowrap border border-white/20 backdrop-blur-sm">
                            {node.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Legend / Key */}
            <div className="absolute top-4 left-4 bg-black/60 p-4 rounded-lg backdrop-blur-md border border-white/10 z-20">
                <h3 className="text-white font-serif font-bold mb-2">Relationship Map</h3>
                <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Allies</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span> Black Org / Enemies</div>
                </div>
            </div>
        </div>
    );
}
