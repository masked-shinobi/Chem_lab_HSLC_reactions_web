import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FlaskConical, ArrowRight, Zap, TestTube } from 'lucide-react';

const TYPE_COLORS = {
    Precipitation: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', text: '#fde047' },
    Neutralization: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', text: '#6ee7b7' },
    Displacement: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#93c5fd' },
    Combustion: { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', text: '#fdba74' },
    Decomposition: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.35)', text: '#d8b4fe' },
    Redox: { bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.35)', text: '#5eead4' },
    Composition: { bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.35)', text: '#fda4af' },
};

const DEFAULT_TYPE = { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)', text: '#a5b4fc' };

const ReactionInfo = ({ reaction }) => {
    const typeStyle = TYPE_COLORS[reaction?.type] || DEFAULT_TYPE;

    return (
        <div className="w-80 h-full flex flex-col py-10 px-6 overflow-y-auto" style={{ minWidth: 320 }}>
            <AnimatePresence mode="wait">
                {reaction ? (
                    <motion.div
                        key={reaction.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex flex-col gap-8"
                    >
                        {/* Header */}
                        <div className="glass p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 rounded-xl" style={{ background: typeStyle.bg }}>
                                    <FlaskConical className="w-4 h-4" style={{ color: typeStyle.text }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm leading-tight text-slate-100 mb-1">{reaction.name}</h3>
                                    <span
                                        className="type-badge"
                                        style={{ background: typeStyle.bg, border: `1px solid ${typeStyle.border}`, color: typeStyle.text }}
                                    >
                                        {reaction.type}
                                    </span>
                                </div>
                            </div>

                            {/* Reaction equation */}
                            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2.5">EQUATION</p>
                                <p className="text-base font-bold break-words leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace', color: typeStyle.text }}>
                                    {reaction.equation}
                                </p>
                            </div>
                        </div>

                        {/* Reactants → Products */}
                        <div className="glass p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">TRANSFORMATION</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex flex-wrap gap-1.5">
                                    {reaction.reactants.map(r => (
                                        <span key={r} className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}>
                                            {r}
                                        </span>
                                    ))}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <div className="flex flex-wrap gap-1.5">
                                    {reaction.products.map(p => (
                                        <span key={p} className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#6ee7b7' }}>
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Observation */}
                        <div className="glass p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-3">OBSERVATION</p>
                            <div className="flex items-start gap-2">
                                <div
                                    className="mt-1 w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-transparent"
                                    style={{ background: reaction.observations.color, boxShadow: `0 0 8px ${reaction.observations.color}` }}
                                />
                                <p className="text-xs text-slate-300 leading-relaxed italic">
                                    "{reaction.observations.visual}"
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="glass p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-3">ABOUT</p>
                            <p className="text-xs text-slate-400 leading-loose">{reaction.description}</p>
                        </div>

                        {/* Success banner */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl"
                            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                        >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Reaction Confirmed</span>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center gap-4 text-center pt-20"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <TestTube className="w-7 h-7 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">No Reaction Yet</p>
                            <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                                Add matching chemicals to the vessel to see a reaction
                            </p>
                        </div>
                        <div className="mt-2 p-3 rounded-xl w-full" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}>
                            <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Zap className="w-3 h-3" /> Quick Combos
                            </p>
                            {[['AgNO₃', 'NaCl'], ['HCl', 'NaOH'], ['Zn', 'H₂SO₄'], ['Fe', 'CuSO₄']].map(([a, b], i) => (
                                <p key={i} className="text-xs text-slate-500 py-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                    {a} + {b}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReactionInfo;
