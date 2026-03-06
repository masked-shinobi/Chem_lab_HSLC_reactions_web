import React from 'react';
import Vessel from './components/Vessel';
import ChemicalShelf from './components/ChemicalShelf';
import ReactionInfo from './components/ReactionInfo';
import { useReactionEngine } from './hooks/useReactionEngine';
import { Beaker } from 'lucide-react';

function App() {
  const {
    activeReactants,
    currentReaction,
    addReactant,
    resetVessel
  } = useReactionEngine();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Beaker className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight title-gradient">ChemSim Pro</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Interactive Lab • NCERT Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">Class 12</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">Experiments</span>
          <button className="px-5 py-2 glass border-blue-500/20 text-blue-400 text-xs rounded-full hover:bg-blue-500/10 transition-all font-bold">
            LAB NOTES
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex relative">
        <Vessel
          activeReactants={activeReactants}
          currentReaction={currentReaction}
          onReset={resetVessel}
        />

        <ReactionInfo reaction={currentReaction} />
      </main>

      {/* Chemical Shelf */}
      <ChemicalShelf onAddReactant={addReactant} />

      {/* Footer Info */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block">
        <div className="space-y-8">
          <div className="glass p-4 w-48 border-l-4 border-l-blue-500">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Instructions</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Click on any chemical in the shelf below to add it to the reaction vessel.
            </p>
          </div>

          <div className="glass p-4 w-48 border-l-4 border-l-purple-500">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Goal</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discover over 20+ NCERT approved reactions including redox & organic transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
