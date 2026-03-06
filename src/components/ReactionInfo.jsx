import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, FlaskRound } from 'lucide-react';

const ReactionInfo = ({ reaction }) => {
    return (
        <AnimatePresence>
            {reaction && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 w-80 glass p-6 border-blue-500/20 shadow-2xl z-20"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FlaskRound className="text-blue-400 w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{reaction.name}</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Observation</p>
                            <p className="text-sm text-blue-100 italic">"{reaction.observations.visual}"</p>
                        </div>

                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Equation</p>
                            <p className="font-mono text-sm font-bold text-blue-300 break-words">{reaction.equation}</p>
                        </div>

                        <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Details</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{reaction.description}</p>
                        </div>

                        <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            Reaction Successful
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReactionInfo;
