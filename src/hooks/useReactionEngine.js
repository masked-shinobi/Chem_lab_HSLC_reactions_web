import { useState, useCallback, useMemo } from 'react';
import { reactionDataset } from '../data/reactionDataset';

export const useReactionEngine = () => {
    const [activeReactants, setActiveReactants] = useState([]);
    const [currentReaction, setCurrentReaction] = useState(null);

    // Calculate which chemicals are "compatible" with current vessel contents
    const compatibleChemicals = useMemo(() => {
        if (activeReactants.length === 0) return null; // All are compatible if vessel is empty

        const reactantSet = new Set(activeReactants);
        const compatibleSet = new Set();

        reactionDataset.forEach(reaction => {
            // A reaction is a "candidate" if ALL reagents currently in the vessel are 
            // part of that reaction's requirement.
            const isVesselSubsetOfReaction = activeReactants.every(r => reaction.reactants.includes(r));

            if (isVesselSubsetOfReaction) {
                // If it's a candidate, all its reactants are "compatible"
                reaction.reactants.forEach(r => compatibleSet.add(r));
            }
        });

        return Array.from(compatibleSet);
    }, [activeReactants]);

    const checkReaction = (reactants) => {
        if (reactants.length === 0) {
            setCurrentReaction(null);
            return;
        }

        const reactantSet = new Set(reactants);

        // Find all reactions whose reactants are a SUBSET of what's in the vessel
        const matches = reactionDataset.filter((reaction) => {
            return reaction.reactants.every((r) => reactantSet.has(r));
        });

        if (matches.length === 0) {
            setCurrentReaction(null);
            return;
        }

        // Prefer the most specific match (most reactants used)
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
        compatibleChemicals,
        addReactant,
        removeReactant,
        resetVessel
    };
};
