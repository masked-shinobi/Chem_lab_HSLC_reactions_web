import React from 'react';
import Vessel from './components/Vessel';
import ChemicalShelf from './components/ChemicalShelf';
import ReactionInfo from './components/ReactionInfo';
import { useReactionEngine } from './hooks/useReactionEngine';
import { Beaker, BookOpen, FlaskConical, Circle } from 'lucide-react';

const ResponsiveGuard = () => (
  <div className="responsive-guard">
    <div className="glass p-12 text-center max-w-md mx-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="mb-8 inline-flex p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/10 animate-bounce">
        <FlaskConical size={40} className="text-blue-400" />
      </div>
      <h2 className="title-gradient text-3xl mb-4">Desktop Optimized</h2>
      <p className="text-slate-400 text-sm leading-relaxed mb-8">
        ChemSim Pro is a high-precision lab environment designed for high-resolution displays. Please switch to a <strong>laptop or desktop</strong> for the most immersive experience.
      </p>
      <div className="flex justify-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75" />
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-150" />
      </div>
    </div>
  </div>
);

function App() {
  const {
    activeReactants,
    currentReaction,
    compatibleChemicals,
    addReactant,
    removeReactant,
    resetVessel
  } = useReactionEngine();

  return (
    <>
      <ResponsiveGuard />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', background: '#080c14' }}>

        {/* ── Header ── */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 40px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)',
            zIndex: 40,
            flexShrink: 0,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              padding: '10px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.2))',
              border: '1px solid rgba(59,130,246,0.3)',
              boxShadow: '0 8px 16px -4px rgba(0,0,0,0.3)',
            }}>
              <Beaker size={20} style={{ color: '#93c5fd' }} />
            </div>
            <div>
              <h1 className="title-gradient" style={{ fontSize: 22, margin: 0, lineHeight: 1.1, fontWeight: 900, transform: 'skewX(-2deg)' }}>ChemSim Pro</h1>
              <p style={{ fontSize: 9, color: '#475569', letterSpacing: '0.3em', fontWeight: 900, textTransform: 'uppercase', margin: 0, marginTop: 4 }}>
                Interactive Lab Environment
              </p>
            </div>
          </div>

          {/* Center / Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.02)', padding: '8px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: activeReactants.length > 0 ? '#10b981' : '#334155',
                boxShadow: activeReactants.length > 0 ? '0 0 15px #10b981' : 'none',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
              <span style={{ fontSize: 11, color: activeReactants.length > 0 ? '#6ee7b7' : '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {activeReactants.length > 0 ? 'System Active' : 'Standby Mode'}
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              style={{
                padding: '9px 20px', borderRadius: 14,
                border: '1px solid rgba(59,130,246,0.3)',
                background: 'rgba(59,130,246,0.08)',
                color: '#93c5fd', fontSize: 11, fontWeight: 900,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.3s ease',
              }}
              className="hover:bg-blue-500/20 hover:scale-105 active:scale-95"
            >
              <BookOpen size={16} />
              Library
            </button>
          </div>
        </header>

        {/* ── Main Layout ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Column 1: Navigation/Sidebar */}
          <aside
            style={{
              width: 280,
              flexShrink: 0,
              padding: '40px 32px',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              overflowY: 'auto',
            }}
            className="custom-scrollbar"
          >
            <div>
              <p style={{ fontSize: 10, fontBlack: 900, letterSpacing: '0.2em', color: '#475569', textTransform: 'uppercase', marginBottom: 24, fontWeight: 900 }}>Lab Protocol</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  'Select reagents',
                  'Observe reaction',
                  'Analyze results',
                  'Purge to reset'
                ].map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 900, color: '#f8fafc',
                      backgroundColor: '#3b82f622', width: 24, height: 24,
                      borderRadius: 8, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', border: '1px solid #3b82f644'
                    }}>{idx + 1}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40 }}>
              <p style={{ fontSize: 10, fontBlack: 900, letterSpacing: '0.2em', color: '#475569', textTransform: 'uppercase', marginBottom: 24, fontWeight: 900 }}>Classifications</p>
              {[
                ['#fde047', 'Precipitates'],
                ['#6ee7b7', 'Neutralizers'],
                ['#93c5fd', 'Displacements'],
                ['#fdba74', 'Combustibles'],
                ['#d8b4fe', 'Decompositions'],
                ['#c084fc', 'Organic Tests'],
                ['#2dd4bf', 'Redox Reactions'],
              ].map(([color, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <Circle size={8} fill={color} style={{ color, opacity: 0.8 }} />
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', background: 'rgba(59,130,246,0.03)', padding: 24, borderRadius: 24, border: '1px solid rgba(59,130,246,0.05)', boxShadow: '0 8px 32px -8px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Database</span>
                <FlaskConical size={12} style={{ color: '#3b82f6' }} />
              </div>
              <p style={{ fontSize: 32, fontWeight: 900, color: '#f1f5f9', margin: 0, fontStyle: 'italic' }}>15</p>
              <p style={{ fontSize: 10, color: '#475569', margin: 0, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>NCERT Reactions</p>
            </div>
          </aside>

          {/* Column 2: The Vessel (Main Area) */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '0 60px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Vessel
                activeReactants={activeReactants}
                currentReaction={currentReaction}
                onReset={resetVessel}
                onRemove={removeReactant}
              />
            </div>
          </main>

          {/* Column 3: Chemical Library (New Vertical Shelf) */}
          <ChemicalShelf
            onAddReactant={addReactant}
            activeReactants={activeReactants}
            compatibleChemicals={compatibleChemicals}
          />

          {/* Column 4: Reaction Details (Side Panel) */}
          <ReactionInfo reaction={currentReaction} />
        </div>
      </div>
    </>
  );
}

export default App;
