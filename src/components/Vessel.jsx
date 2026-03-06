import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ThermometerSun, AlertCircle } from 'lucide-react';

const Vessel = ({ activeReactants, currentReaction, onReset }) => {
    // Bubbles generating for reactions that show "bubbles" or "heat"
    const bubbles = useMemo(() => {
        if (!currentReaction) return [];
        if (!['bubbles', 'heat'].includes(currentReaction.observations.animation)) return [];

        return Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            size: Math.random() * 6 + 4,
            left: Math.random() * 60 + 20,
            delay: Math.random() * 2,
            duration: Math.random() * 1.5 + 2
        }));
    }, [currentReaction]);

    const vesselColor = useMemo(() => {
        if (currentReaction) return currentReaction.observations.color;
        return activeReactants.length > 0 ? 'rgba(37, 141, 244, 0.2)' : 'transparent';
    }, [currentReaction, activeReactants]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center relative p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,141,244,0.05)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="relative w-80 h-[450px] flex flex-col items-center group">
                {/* Flask Neck */}
                <div className="absolute top-0 w-20 h-32 border-x-2 border-t-2 border-white/10 glass rounded-t-xl z-0"></div>

                {/* Flask Body */}
                <div className="absolute bottom-0 w-full h-[350px] rounded-[50%_50%_10%_10%_/_30%_30%_5%_5%] border-2 border-white/20 glass overflow-hidden reaction-glow z-10 transition-all duration-700">
                    {/* Liquid Content */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: activeReactants.length > 0 ? '60%' : '0%' }}
                        className="absolute bottom-0 left-0 right-0 liquid-gradient transition-all duration-1000 ease-out"
                        style={{
                            backgroundColor: vesselColor,
                            filter: currentReaction ? 'brightness(1.2) saturate(1.2)' : 'none'
                        }}
                    >
                        {/* Bubbles */}
                        {bubbles.map((b) => (
                            <motion.div
                                key={b.id}
                                initial={{ y: 200, opacity: 0 }}
                                animate={{ y: -100, opacity: [0, 0.8, 0] }}
                                transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
                                className="absolute bg-white/40 rounded-full"
                                style={{ width: b.size, height: b.size, left: `${b.left}%` }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Vapor Effects */}
                <AnimatePresence>
                    {currentReaction?.observations.animation === 'smoke' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.2, scale: 1.5, y: -50 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-[-40px] w-32 h-32 bg-white blur-2xl rounded-full z-0"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Controls Overlay */}
            <div className="mt-12 flex gap-4 z-20">
                <button
                    onClick={onReset}
                    className="glass px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest border border-white/10"
                >
                    <RefreshCw className="w-4 h-4 text-primary" />
                    Purge Vessel
                </button>
            </div>

            {/* Status Indicators */}
            <div className="absolute top-6 left-6 flex flex-col gap-4">
                <div className="glass p-4 rounded-xl border border-white/10 min-w-[200px]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Laboratory Status</p>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${activeReactants.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
                        <span className="text-sm font-bold">{activeReactants.length > 0 ? 'Active Simulation' : 'Standby'}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 max-w-[250px]">
                    <AnimatePresence>
                        {activeReactants.map(id => (
                            <motion.span
                                key={id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="px-3 py-1 glass text-[10px] font-bold border border-white/10 text-primary"
                            >
                                {id}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Vessel;
