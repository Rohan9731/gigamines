import React, { useState } from 'react';
import { BatteryCharging, Magnet, Zap } from 'lucide-react';

export default function TechPreview() {
  const [activeTab, setActiveTab] = useState<'hhm' | 'magnet'>('hhm');

  return (
    <div id="technology" className="w-full bg-[#0D2237] rounded-xl border border-[#2E87C6]/25 p-6 sm:p-8 shadow-xl">
      {/* Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2E87C6]/20 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono text-[#4DA6E8] uppercase tracking-wider block mb-1">
            PROPRIETARY TECHNOLOGY
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
            Extraction Platforms
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-[#081726] p-1.5 rounded-lg border border-[#2E87C6]/20">
          <button
            onClick={() => setActiveTab('hhm')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'hhm'
                ? 'bg-[#EE7B2B] text-[#0F2840] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            <span>HHM Battery Refining (Commercial)</span>
          </button>
          <button
            onClick={() => setActiveTab('magnet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'magnet'
                ? 'bg-[#EE7B2B] text-[#0F2840] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Magnet className="w-4 h-4" />
            <span>Permanent Magnet Refining (Pilot)</span>
          </button>
        </div>
      </div>

      {activeTab === 'hhm' ? (
        <div className="space-y-6">
          <div className="bg-[#081726] p-6 rounded-xl border border-[#2E87C6]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#EE7B2B] font-bold uppercase tracking-wider block mb-1">
                HYBRID HYDROMETALLURGY (HHM) • LOW THERMAL
              </span>
              <h4 className="text-xl font-bold text-white font-['Outfit'] mb-2">
                Ambient-Pressure Battery Mineral Dissolution
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Unlike high-emission pyrometallurgical smelting, HHM operates below 80°C with selective chemical leaching. It extracts over 96% of lithium, cobalt, and nickel with zero toxic SOx flue emissions and zero liquid effluent discharge.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-center">
              <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                <span className="text-[10px] text-slate-400 block uppercase">Temperature</span>
                <span className="text-base font-bold text-white">&lt; 80°C</span>
              </div>
              <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                <span className="text-[10px] text-slate-400 block uppercase">Lithium Yield</span>
                <span className="text-base font-bold text-[#EE7B2B]">&gt; 96%</span>
              </div>
            </div>
          </div>

          {/* 4 Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Inert Delamination', desc: 'Aqueous de-energization and mechanical separation of black mass without thermal breakdown.' },
              { step: '02', title: 'Selective Leaching', desc: 'Ambient acid leaching dissolving transition metals into liquid pregnant solution at <80°C.' },
              { step: '03', title: 'Solvent Extraction', desc: 'Multi-stage counter-current trains separating individual nickel, cobalt, and manganese streams.' },
              { step: '04', title: 'Crystallization', desc: 'Vacuum MVR crystallization producing battery-grade salts (Li2CO3, CoSO4, NiSO4) at 99.85% purity.' },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-lg bg-[#081726] border border-[#2E87C6]/20">
                <div className="text-lg font-bold text-[#2E87C6] font-mono mb-1">{s.step}</div>
                <h5 className="text-sm font-bold text-white font-['Outfit'] mb-1.5">{s.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#081726] p-6 rounded-xl border border-[#2E87C6]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#EE7B2B] font-bold uppercase tracking-wider block mb-1">
                PILOT STAGE • RARE EARTH RECOVERY
              </span>
              <h4 className="text-xl font-bold text-white font-['Outfit'] mb-2">
                Permanent Magnet (NdFeB) Circular Loop
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Recovering Neodymium (Nd), Dysprosium (Dy), and Praseodymium (Pr) directly from decommissioned wind turbine generators and EV motor magnets, reducing energy usage by 78% compared to virgin mining.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-center">
              <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                <span className="text-[10px] text-slate-400 block uppercase">Pilot Throughput</span>
                <span className="text-base font-bold text-white">1,200 TPA</span>
              </div>
              <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                <span className="text-[10px] text-slate-400 block uppercase">Nd/Dy Purity</span>
                <span className="text-base font-bold text-[#EE7B2B]">&gt; 99.4%</span>
              </div>
            </div>
          </div>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Demagnetization', desc: 'Controlled heating above Curie temperature to safely demagnetize scrap rotor magnet blocks.' },
              { step: '02', title: 'Hydrogen Decrepitation', desc: 'Hydrogen absorption breaking the alloy lattice into high-surface-area submicron powders.' },
              { step: '03', title: 'Separation', desc: 'Chromatographic separation cleanly isolating Dysprosium from Neodymium and Praseodymium.' },
              { step: '04', title: 'Alloy Synthesis', desc: 'Vacuum induction melting reconstituting NdFeB sintered alloy flakes with high magnetic flux.' },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-lg bg-[#081726] border border-[#2E87C6]/20">
                <div className="text-lg font-bold text-[#2E87C6] font-mono mb-1">{s.step}</div>
                <h5 className="text-sm font-bold text-white font-['Outfit'] mb-1.5">{s.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
