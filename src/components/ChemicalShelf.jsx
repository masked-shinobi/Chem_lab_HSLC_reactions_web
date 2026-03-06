import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FlaskConical } from 'lucide-react';
import { chemicals } from '../data/reactionDataset';

const ChemicalShelf = ({ onAddReactant }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChemicals = chemicals.filter(chem =>
        chem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chem.formula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <footer className="glass rounded-t-3xl p-6 h-56 border-x-0 border-b-0 mt-auto z-30">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Chemical Collection</span>
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Find chemical..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none w-64 transition-all"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    {['All', 'Liquids', 'Solids', 'Gases'].map(cat => (
                        <button key={cat} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${cat === 'All' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                <AnimatePresence>
                    {filteredChemicals.map((chem) => (
                        <motion.div
                            key={chem.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02, translateY: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAddReactant(chem.id)}
                            className="min-w-[140px] p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 cursor-pointer transition-all group flex flex-col items-center justify-center gap-2"
                        >
                            <span className="text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">
                                {chem.formula}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold text-center leading-tight">
                                {chem.name}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </footer>
    );
};

export default ChemicalShelf;
