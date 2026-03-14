import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Beaker } from 'lucide-react';

// Determine liquid color blending
const getLiquidStyle = (currentReaction, activeReactants) => {
    if (currentReaction) {
        return { background: `linear-gradient(180deg, ${currentReaction.observations.color}88 0%, ${currentReaction.observations.color} 100%)` };
    }
    if (activeReactants.length > 0) {
        return { background: 'linear-gradient(180deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.5) 100%)' };
    }
    return { background: 'transparent' };
};

const BUBBLE_COUNT = 10;

const Vessel = ({ activeReactants, currentReaction, onReset, onRemove }) => {
    const animation = currentReaction?.observations?.animation;
    const hasContent = activeReactants.length > 0;
    const isReacting = !!currentReaction;

    const bubbles = useMemo(() => {
        if (!currentReaction || !['bubbles', 'heat'].includes(animation)) return [];
        return Array.from({ length: BUBBLE_COUNT }).map((_, i) => ({
            id: i,
            size: Math.random() * 7 + 4,
            left: 10 + Math.random() * 80,
            delay: Math.random() * 2.5,
            dur: 1.8 + Math.random() * 1.5,
            drift: (Math.random() - 0.5) * 20,
        }));
    }, [currentReaction, animation]);

    const smokeParticles = useMemo(() => {
        if (!currentReaction || animation !== 'smoke') return [];
        return Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            size: 30 + Math.random() * 40,
            left: 20 + Math.random() * 60,
            delay: Math.random() * 2,
            dur: 2.5 + Math.random() * 1.5,
        }));
    }, [currentReaction, animation]);

    const liquidStyle = getLiquidStyle(currentReaction, activeReactants);
    const liquidHeight = hasContent ? '62%' : '0%';

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-full px-4">
            {/* Flask assembly */}
            <div className="relative flex flex-col items-center select-none">
                {/* Smoke above flask */}
                <AnimatePresence>
                    {smokeParticles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 0, scale: 0.3 }}
                            animate={{ opacity: [0, 0.5, 0], y: -70, scale: 2 }}
                            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
                            className="absolute"
                            style={{
                                top: -10,
                                left: `calc(${p.left}% - ${p.size / 2}px)`,
                                width: p.size,
                                height: p.size,
                                borderRadius: '50%',
                                background: 'rgba(241,245,249,0.12)',
                                filter: 'blur(14px)',
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                </AnimatePresence>

                {/* Flask Neck */}
                <div className="flask-neck" />

                {/* Flask Body */}
                <motion.div
                    animate={{
                        boxShadow: isReacting
                            ? [`0 0 30px ${currentReaction?.observations?.color || '#3b82f6'}66`, `0 0 60px ${currentReaction?.observations?.color || '#3b82f6'}88`, `0 0 30px ${currentReaction?.observations?.color || '#3b82f6'}66`]
                            : hasContent
                            ? ['0 0 20px rgba(59,130,246,0.2)', '0 0 35px rgba(59,130,246,0.3)', '0 0 20px rgba(59,130,246,0.2)']
                            : '0 0 0px transparent'
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`flask-body ${hasContent ? 'active' : ''}`}
                    style={{ width: 170, height: 210 }}
                >
                    {/* Liquid */}
                    <motion.div
                        className="liquid-layer"
                        animate={{ height: liquidHeight }}
                        transition={{ duration: 1.2, ease: [0.34, 1.2, 0.64, 1] }}
                        style={liquidStyle}
                    >
                        {/* Wave surface */}
                        <div className="liquid-surface">
                            <motion.div
                                className="liquid-wave"
                                style={{ background: `${currentReaction?.observations?.color || 'rgba(59,130,246,0.5)'}55` }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        {/* Bubbles */}
                        {bubbles.map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ y: '100%', x: 0, opacity: 0 }}
                                animate={{ y: '-120%', x: b.drift, opacity: [0, 0.7, 0.5, 0] }}
                                transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeIn' }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: `${b.left}%`,
                                    width: b.size,
                                    height: b.size,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.45)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                }}
                            />
                        ))}

                        {/* Flash (combustion) */}
                        {animation === 'flash' && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0.8 }}
                                style={{
                                    position: 'absolute', inset: 0,
                                    background: 'radial-gradient(circle, rgba(255,255,200,0.9), rgba(255,150,0,0.6))',
                                }}
                            />
                        )}

                        {/* Precipitate (settling) */}
                        {animation === 'precipitate' && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: '30%' }}
                                transition={{ duration: 2, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: `${currentReaction?.observations?.color}cc`,
                                    filter: 'blur(2px)',
                                }}
                            />
                        )}
                    </motion.div>

                    {/* Flask reflection shine */}
                    <div style={{
                        position: 'absolute', top: '10%', left: '15%',
                        width: '20%', height: '40%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }} />
                </motion.div>

                {/* Reaction label under flask */}
                <AnimatePresence>
                    {isReacting && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 px-4 py-1.5 rounded-full text-xs font-bold"
                            style={{
                                border: `1px solid ${currentReaction.observations.color}55`,
                                background: `${currentReaction.observations.color}15`,
                                color: currentReaction.observations.color === '#ffffff' || currentReaction.observations.color === '#f1f5f9' ? '#e2e8f0' : currentReaction.observations.color,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.04em',
                            }}
                        >
                            ✦ {currentReaction.type}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Active chemicals in vessel */}
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                <AnimatePresence>
                    {activeReactants.map(id => (
                        <motion.span
                            key={id}
                            layout
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            className="chem-tag"
                            onClick={() => onRemove && onRemove(id)}
                            title={`Click to remove ${id}`}
                        >
                            {id}
                            <span style={{ fontSize: 9, opacity: 0.5 }}>✕</span>
                        </motion.span>
                    ))}
                </AnimatePresence>
                {activeReactants.length === 0 && (
                    <p className="text-xs text-slate-600 italic">Vessel is empty — add chemicals below</p>
                )}
            </div>

            {/* Reset */}
            {activeReactants.length > 0 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onReset}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    style={{
                        border: '1px solid rgba(239,68,68,0.3)',
                        background: 'rgba(239,68,68,0.06)',
                        color: '#fca5a5',
                    }}
                    whileHover={{ background: 'rgba(239,68,68,0.15)' }}
                    whileTap={{ scale: 0.97 }}
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Clear Vessel
                </motion.button>
            )}
        </div>
    );
};

export default Vessel;
