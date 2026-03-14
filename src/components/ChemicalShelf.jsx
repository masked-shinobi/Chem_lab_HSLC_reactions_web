import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, FlaskConical, LayoutGrid, X } from 'lucide-react';
import { chemicals } from '../data/reactionDataset';

const STATE_COLORS = {
    solid: { bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)', dot: '#94a3b8', label: 'S' },
    liquid: { bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)', dot: '#60a5fa', label: 'L' },
    gas: { bg: 'rgba(168,85,247,0.06)', border: 'rgba(168,85,247,0.15)', dot: '#c084fc', label: 'G' },
};

const CATEGORIES = ['All', 'Solid', 'Liquid', 'Gas'];

const ChemicalShelf = ({ onAddReactant, activeReactants = [], compatibleChemicals = null }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [showOnlyCompatible, setShowOnlyCompatible] = useState(true);

    const filtered = useMemo(() => {
        return chemicals.filter(chem => {
            const matchSearch =
                chem.name.toLowerCase().includes(search.toLowerCase()) ||
                chem.formula.toLowerCase().includes(search.toLowerCase());

            const matchCat =
                category === 'All' || chem.state.toLowerCase() === category.toLowerCase();

            const isCompatible = !showOnlyCompatible || !compatibleChemicals || compatibleChemicals.includes(chem.id);

            // Strictly hide if already in vessel and we are in filtered mode
            if (showOnlyCompatible && compatibleChemicals && activeReactants.includes(chem.id)) {
                return false;
            }

            return matchSearch && matchCat && isCompatible;
        });
    }, [search, category, compatibleChemicals, showOnlyCompatible, activeReactants]);

    const isFilteredByCompatibility = compatibleChemicals !== null && showOnlyCompatible;

    return (
        <div className="flex flex-col h-full glass border-l border-white/5 rounded-none overflow-hidden" style={{ width: 340 }}>
            {/* Header / Search */}
            <div className="px-6 py-8 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <LayoutGrid size={18} className="text-blue-400" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Inventory</span>
                    </div>
                    {isFilteredByCompatibility && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setShowOnlyCompatible(false)}
                            className="text-[10px] font-black text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all shadow-sm shadow-blue-500/10"
                        >
                            Show All
                        </motion.button>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="relative group">
                        <motion.div
                            initial={false}
                            animate={{ opacity: search ? 1 : 0.5 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                            <Search size={16} className="text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        </motion.div>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Reagent search..."
                            className="w-full pl-12 pr-12 py-3 text-xs font-semibold rounded-2xl bg-white/[0.03] border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 focus:bg-white/[0.05] transition-all duration-300 backdrop-blur-md shadow-inner"
                        />
                        <AnimatePresence>
                            {search && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setSearch('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-xl text-slate-500 transition-colors"
                                >
                                    <X size={14} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex p-1.5 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${category === cat
                                    ? 'bg-blue-600/30 text-blue-200 shadow-lg shadow-blue-500/5'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable Grid */}
            <div className="flex-1 overflow-y-auto px-6 pt-8 pb-24 custom-scrollbar" style={{ scrollBehavior: 'smooth' }}>
                {isFilteredByCompatibility && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-lg shadow-blue-500/5"
                    >
                        <p className="text-[10px] text-blue-300 font-bold leading-relaxed tracking-wide">
                            GUIDED SELECTION:<br />
                            <span className="text-blue-100/90 font-medium">Filtering for compatible reagents.</span>
                        </p>
                    </motion.div>
                )}

                <div className="grid grid-cols-2 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map(chem => {
                            const stateStyle = STATE_COLORS[chem.state] || STATE_COLORS.solid;
                            const isActive = activeReactants.includes(chem.id);

                            return (
                                <motion.div
                                    key={chem.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={!isActive ? { y: -5, scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' } : {}}
                                    whileTap={!isActive ? { scale: 0.95 } : {}}
                                    onClick={() => !isActive && onAddReactant(chem.id)}
                                    className={`relative group flex flex-col items-center justify-center p-5 rounded-[2rem] border transition-all duration-500 ${isActive
                                        ? 'border-blue-500/40 bg-blue-500/20 opacity-40 cursor-default blur-[1px]'
                                        : 'border-white/5 bg-white/[0.01] cursor-pointer hover:border-white/20'
                                        }`}
                                    style={{ height: 130 }}
                                >
                                    {/* Indicator dot */}
                                    <div className="absolute top-4 right-4">
                                        <div className="w-2 h-2 rounded-full shadow-lg" style={{ background: stateStyle.dot, boxShadow: `0 0 10px ${stateStyle.dot}` }} />
                                    </div>

                                    <span className="text-xl font-black tracking-tighter mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: isActive ? '#93c5fd' : '#f8fafc' }}>
                                        {chem.formula}
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight text-center leading-tight px-2">
                                        {chem.name}
                                    </span>

                                    {isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2rem] backdrop-blur-[2px]">
                                            <span className="text-[9px] font-black tracking-[0.2em] text-blue-100 bg-blue-600/50 px-3 py-1 rounded-full shadow-xl">IN VESSEL</span>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                        <Filter size={32} className="text-slate-800 mb-4" />
                        <p className="text-xs text-slate-500 font-medium">No results found for these filters.</p>
                        {isFilteredByCompatibility && (
                            <button
                                onClick={() => setShowOnlyCompatible(false)}
                                className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                            >
                                Disable Compatibility Filter
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Legend / Footer */}
            <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-center gap-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Solid</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Liquid</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Gas</span>
                </div>
            </div>
        </div>
    );
};

export default ChemicalShelf;
