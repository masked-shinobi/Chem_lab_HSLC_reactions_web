import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { chemicals } from '../data/reactionDataset';

const STATE_COLORS = {
    solid: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', dot: '#94a3b8', label: 'S' },
    liquid: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', dot: '#60a5fa', label: 'L' },
    gas: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)', dot: '#c084fc', label: 'G' },
};

const CATEGORIES = ['All', 'Solid', 'Liquid', 'Gas'];

const ChemicalShelf = ({ onAddReactant, activeReactants = [] }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = chemicals.filter(chem => {
        const matchSearch =
            chem.name.toLowerCase().includes(search.toLowerCase()) ||
            chem.formula.toLowerCase().includes(search.toLowerCase());
        const matchCat =
            category === 'All' || chem.state.toLowerCase() === category.toLowerCase();
        return matchSearch && matchCat;
    });

    return (
        <div
            className="glass shrink-0 border-x-0 border-b-0 rounded-none pt-4 pb-3 px-6"
            style={{ borderRadius: '20px 20px 0 0', height: 200, borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Chemical Reagents</span>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search…"
                            className="pl-8 pr-3 py-1.5 text-xs rounded-lg w-44 focus:outline-none focus:ring-1"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: '#e2e8f0',
                                focusRingColor: 'rgba(59,130,246,0.5)',
                            }}
                        />
                    </div>
                </div>

                {/* Category filters */}
                <div className="flex gap-1.5">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all"
                            style={category === cat
                                ? { background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }
                                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chemical cards row */}
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                <AnimatePresence>
                    {filtered.map(chem => {
                        const stateStyle = STATE_COLORS[chem.state] || STATE_COLORS.solid;
                        const isActive = activeReactants.includes(chem.id);
                        return (
                            <motion.div
                                key={chem.id}
                                layout
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => !isActive && onAddReactant(chem.id)}
                                className="chem-card shrink-0 cursor-pointer flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-2xl transition-all"
                                style={{
                                    minWidth: 100,
                                    height: 96,
                                    border: isActive
                                        ? '1px solid rgba(59,130,246,0.5)'
                                        : `1px solid ${stateStyle.border}`,
                                    background: isActive
                                        ? 'rgba(59,130,246,0.12)'
                                        : stateStyle.bg,
                                    cursor: isActive ? 'default' : 'pointer',
                                    opacity: isActive ? 0.65 : 1,
                                }}
                                title={isActive ? `${chem.name} is already in the vessel` : `Add ${chem.name}`}
                            >
                                {/* State dot */}
                                <div className="flex items-center gap-1 self-end mb-auto" style={{ marginTop: -2 }}>
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: stateStyle.dot }} />
                                    <span className="text-[8px] font-bold uppercase" style={{ color: stateStyle.dot, letterSpacing: '0.1em' }}>{chem.state}</span>
                                </div>

                                <span className="text-base font-black tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace', color: isActive ? '#93c5fd' : '#e2e8f0' }}>
                                    {chem.formula}
                                </span>
                                <span className="text-[9px] text-slate-500 uppercase font-semibold tracking-wide text-center leading-tight">
                                    {chem.name.length > 14 ? chem.name.slice(0, 13) + '…' : chem.name}
                                </span>

                                {isActive && (
                                    <span className="text-[8px] font-bold text-blue-400 mt-0.5">IN VESSEL</span>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChemicalShelf;
