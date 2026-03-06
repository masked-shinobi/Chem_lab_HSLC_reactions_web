import { useState, useCallback, useMemo } from 'react';
import { reactionDataset } from '../data/reactionDataset';

export const useReactionEngine = () => {
    const [activeReactants, setActiveReactants] = useState([]);
    const [currentReaction, setCurrentReaction] = useState(null);

    const addReactant = useCallback((chemicalId) => {
        setActiveReactants((prev) => {
            // Avoid duplicates if needed, though in chemistry you can add more.
            // For this simulator, we'll treat them as present/absent for simple matching.
            if (prev.includes(chemicalId)) return prev;
            const next = [...prev, chemicalId];
            checkReaction(next);
            return next;
        });
    }, []);

    const resetVessel = useCallback(() => {
        setActiveReactants([]);
        setCurrentReaction(null);
    }, []);

    const checkReaction = (reactants) => {
        if (reactants.length === 0) {
            setCurrentReaction(null);
            return;
        }

        // Normalize: sort and join
        const normalizedInput = [...reactants].sort().join('+');

        const match = reactionDataset.find((reaction) => {
            const normalizedReaction = [...reaction.reactants].sort().join('+');
            return normalizedReaction === normalizedInput;
        });

        setCurrentReaction(match || null);
    };

    return {
        activeReactants,
        currentReaction,
        addReactant,
        resetVessel
    };
};
