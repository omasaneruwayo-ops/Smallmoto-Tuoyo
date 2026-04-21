import React, { useState } from 'react';
import Simulator from './components/Simulator';
import VeoGenerator from './components/VeoGenerator';
import { Car, MapPin, Wind, Gauge, Navigation, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'drive' | 'cinema'>('drive');

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans flex flex-col overflow-hidden">
      {/* Top Status Bar */}
      <div className="status-bar">
        <div className="status-item">SESSION: <span>TRAINING-092</span></div>
        <div className="status-item">BOSTON, MA <span>42°F OVERCAST</span></div>
        <div className="status-item">SYSTEM: <span>NOMINAL</span></div>
      </div>

      {/* Main Viewport */}
      <main className="flex-grow relative flex flex-col">
        {/* Navigation Overlays */}
        <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
          <div className="bg-black/70 px-4 py-2 rounded border-l-4 border-accent backdrop-blur-sm">
            <div className="text-[10px] text-text-secondary uppercase tracking-widest">Current Route</div>
            <div className="text-sm font-bold">I-90 WEST (MASS PIKE)</div>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10 pointer-events-none">
          <div className="bg-[#00703c] border-2 border-white px-5 py-2 text-center shadow-xl">
            <div className="text-sm font-bold">EXIT 131</div>
            <div className="text-[10px] font-normal">Prudential Ctr / Copley Sq</div>
          </div>
        </div>

        {/* Tab Switcher (Floating) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <nav className="flex items-center gap-1 bg-panel/80 p-1 rounded-full border border-line backdrop-blur-md">
            <button
              onClick={() => setActiveTab('drive')}
              className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === 'drive' ? 'bg-accent text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Simulator
            </button>
            <button
              onClick={() => setActiveTab('cinema')}
              className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === 'cinema' ? 'bg-accent text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cinematic
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-bg overflow-hidden">
          {activeTab === 'drive' ? (
            <Simulator />
          ) : (
            <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-8 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white">AI Cinematic Generator</h2>
                  <p className="text-text-secondary leading-relaxed">
                    Transform your photos into professional driving sequences using Veo AI.
                  </p>
                </div>
                <VeoGenerator />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Dashboard */}
        <div className="h-[280px] bg-panel border-t border-line grid grid-cols-[280px_1fr_280px] gap-px p-6 shrink-0">
          <div className="dash-panel">
            <div>
              <div className="panel-title">Navigation & Route</div>
              <div className="flex-grow bg-bg rounded border border-line relative h-24 overflow-hidden">
                <div className="absolute w-2 h-2 bg-accent rounded-full left-[60%] top-[40%] shadow-[0_0_10px_var(--color-accent)] animate-pulse" />
                {/* Simple grid lines for map feel */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-line) 1px, transparent 0)', backgroundSize: '10px 10px' }} />
              </div>
            </div>
            <div className="mt-3">
              <div className="data-row">
                <span className="data-key">ETA</span>
                <span className="data-val">14:22</span>
              </div>
              <div className="data-row">
                <span className="data-key">DIST</span>
                <span className="data-val">4.2 MI</span>
              </div>
            </div>
          </div>

          <div className="flex justify-around items-center px-8">
            <div className="gauge w-32 h-32 mt-8">
              <div className="gauge-inner w-24 h-24">
                <div className="text-2xl font-mono font-bold text-accent">3.2</div>
                <div className="text-[8px] uppercase text-text-secondary mt-1">x1000 RPM</div>
              </div>
            </div>
            <div className="gauge">
              <div className="gauge-inner">
                <div className="gauge-value">65</div>
                <div className="gauge-label">MPH</div>
                <div className="mt-2 text-accent font-bold text-sm">D4</div>
              </div>
            </div>
            <div className="gauge w-32 h-32 mt-8">
              <div className="gauge-inner w-24 h-24">
                <div className="text-2xl font-mono font-bold text-text-primary">196</div>
                <div className="text-[8px] uppercase text-text-secondary mt-1">OIL TEMP</div>
              </div>
            </div>
          </div>

          <div className="dash-panel">
            <div>
              <div className="panel-title">Vehicle Diagnostics</div>
              <div className="data-row">
                <span className="data-key">BRAKE</span>
                <span className="data-val text-zinc-700">INACTIVE</span>
              </div>
              <div className="data-row">
                <span className="data-key">THROTTLE</span>
                <span className="data-val">24%</span>
              </div>
              <div className="data-row">
                <span className="data-key">STEER</span>
                <span className="data-val">-2.5°</span>
              </div>
            </div>
            <div>
              <div className="panel-title mb-1">Fuel Reserve</div>
              <div className="h-1 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[65%]" />
              </div>
              <div className="data-row mt-2">
                <span className="data-key">RANGE</span>
                <span className="data-val">218 MI</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
