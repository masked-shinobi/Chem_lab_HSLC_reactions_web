import React from 'react';
import Vessel from './components/Vessel';
import ChemicalShelf from './components/ChemicalShelf';
import ReactionInfo from './components/ReactionInfo';
import { useReactionEngine } from './hooks/useReactionEngine';
import { Beaker, BookOpen, FlaskConical } from 'lucide-react';

function App() {
  const {
    activeReactants,
    currentReaction,
    addReactant,
    removeReactant,
    resetVessel
  } = useReactionEngine();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(20px)',
          zIndex: 40,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            padding: '8px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.2))',
            border: '1px solid rgba(59,130,246,0.3)',
          }}>
            <Beaker size={20} style={{ color: '#93c5fd' }} />
          </div>
          <div>
            <h1 className="title-gradient" style={{ fontSize: 20, margin: 0, lineHeight: 1.1 }}>ChemSim Pro</h1>
            <p style={{ fontSize: 9, color: '#475569', letterSpacing: '0.22em', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
              NCERT Class 12 · Interactive Lab
            </p>
          </div>
        </div>

        {/* Reaction counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: activeReactants.length > 0 ? '#10b981' : '#334155',
              boxShadow: activeReactants.length > 0 ? '0 0 8px #10b981' : 'none',
              transition: 'all 0.4s',
            }} />
            <span style={{ fontSize: 11, color: activeReactants.length > 0 ? '#6ee7b7' : '#475569', fontWeight: 600 }}>
              {activeReactants.length > 0 ? 'Active' : 'Standby'}
            </span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            fontSize: 11, color: '#64748b', fontWeight: 600,
          }}>
            <FlaskConical size={12} />
            {activeReactants.length} / 14 reagents
          </div>

          <button
            style={{
              padding: '6px 16px', borderRadius: 20,
              border: '1px solid rgba(59,130,246,0.3)',
              background: 'rgba(59,130,246,0.08)',
              color: '#93c5fd', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <BookOpen size={12} />
            Lab Notes
          </button>
        </div>
      </header>

      {/* ── Main 3-column ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left sidebar — instructions */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            padding: '24px 16px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
          }}
        >
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#334155', textTransform: 'uppercase', marginBottom: 10 }}>How to Use</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['1', 'Pick chemicals from the shelf below'],
                ['2', 'Add them to the vessel'],
                ['3', 'Watch the reaction unfold'],
                ['4', 'Click a tag to remove a chemical'],
              ].map(([n, text]) => (
                <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%', 
                    background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
                    color: '#60a5fa', fontSize: 9, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', shrink: 0, flexShrink: 0,
                  }}>{n}</span>
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#334155', textTransform: 'uppercase', marginBottom: 10 }}>Reaction Types</p>
            {[
              ['#fde047', 'Precipitation'],
              ['#6ee7b7', 'Neutralization'],
              ['#93c5fd', 'Displacement'],
              ['#fdba74', 'Combustion'],
              ['#d8b4fe', 'Decomposition'],
              ['#5eead4', 'Redox'],
              ['#fda4af', 'Composition'],
            ].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }} />
                <span style={{ fontSize: 10, color: '#475569', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#334155', textTransform: 'uppercase', marginBottom: 8 }}>Total Reactions</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#60a5fa', fontFamily: 'Space Grotesk, sans-serif' }}>8</p>
            <p style={{ fontSize: 10, color: '#334155' }}>NCERT-aligned experiments</p>
          </div>
        </aside>

        {/* Center — Vessel */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Vessel
            activeReactants={activeReactants}
            currentReaction={currentReaction}
            onReset={resetVessel}
            onRemove={removeReactant}
          />
        </main>

        {/* Right — ReactionInfo */}
        <aside style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}>
          <ReactionInfo reaction={currentReaction} />
        </aside>
      </div>

      {/* ── Chemical Shelf (footer) ── */}
      <ChemicalShelf onAddReactant={addReactant} activeReactants={activeReactants} />
    </div>
  );
}

export default App;
