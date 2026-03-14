import { useState, useCallback } from 'react';
import { reactionDataset } from '../data/reactionDataset';

export const useReactionEngine = () => {
    const [activeReactants, setActiveReactants] = useState([]);
    const [currentReaction, setCurrentReaction] = useState(null);

    const checkReaction = (reactants) => {
        if (reactants.length === 0) {
            setCurrentReaction(null);
            return;
        }

        const reactantSet = new Set(reactants);

        // Find all reactions whose reactants are a SUBSET of what's in the vessel
        // This means even if you have extra chemicals, a valid reaction can still fire.
        const matches = reactionDataset.filter((reaction) => {
            return reaction.reactants.every((r) => reactantSet.has(r));
        });

        if (matches.length === 0) {
            setCurrentReaction(null);
            return;
        }

        // Prefer the most specific match (most reactants used), then most recently added
        matches.sort((a, b) => b.reactants.length - a.reactants.length);
        setCurrentReaction(matches[0]);
    };

    const addReactant = useCallback((chemicalId) => {
        setActiveReactants((prev) => {
            if (prev.includes(chemicalId)) return prev;
            const next = [...prev, chemicalId];
            checkReaction(next);
            return next;
        });
    }, []);

    const removeReactant = useCallback((chemicalId) => {
        setActiveReactants((prev) => {
            const next = prev.filter((id) => id !== chemicalId);
            checkReaction(next);
            return next;
        });
    }, []);

    const resetVessel = useCallback(() => {
        setActiveReactants([]);
        setCurrentReaction(null);
    }, []);

    return {
        activeReactants,
        currentReaction,
        addReactant,
        removeReactant,
        resetVessel
    };
};
