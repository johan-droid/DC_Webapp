"use client";

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CharacterFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const filters = [
    { id: 'all', label: 'All Files' },
    { id: 'police', label: 'Police/PSB' },
    { id: 'fbi', label: 'FBI/CIA' },
    { id: 'bo', label: 'Black Org' },
    { id: 'detective', label: 'Detectives' },
];

export default function CharacterFilters({
    searchQuery,
    onSearchChange,
    activeFilter,
    onFilterChange
}: CharacterFiltersProps) {
    return (
        <div className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by name, alias, or codename..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                    />
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`
                                px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all
                                ${activeFilter === filter.id
                                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
