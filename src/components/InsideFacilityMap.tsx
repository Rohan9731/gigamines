import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Activity, Cpu, ShieldCheck, Layers } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  code: string;
  category: 'Mechanical' | 'Chemical' | 'Operations' | 'R&D' | 'QA/QC' | 'Warehousing';
  capacity: string;
  purity: string;
  description: string;
  equipment: string[];
}

const zones: Zone[] = [
  {
    id: 'mechanical',
    name: 'Mechanical Delamination & Shredding',
    code: 'ZONE-01',
    category: 'Mechanical',
    capacity: '20,000 TPA Raw Feed',
    purity: 'Black Mass Concentrate >92%',
    description: 'Aqueous de-energization and multi-rotor shredding of spent battery packs and production scrap under inert nitrogen atmosphere.',
    equipment: ['Heavy-Duty Rotary Shredders', 'Cyclonic Classifiers & Density Separators', 'Magnetic & Eddy Current Delaminators'],
  },
  {
    id: 'chemical',
    name: 'Chemical Hydrometallurgical Leaching',
    code: 'ZONE-02',
    category: 'Chemical',
    capacity: '12,500 TPA Process Stream',
    purity: 'Selective Leaching >96%',
    description: 'Proprietary HHM ambient-pressure hydrometallurgy operating below 80°C to selectively dissolve and isolate lithium, nickel, cobalt, and manganese.',
    equipment: ['Titanium-Clad Leaching Reactors', 'Liquid-Liquid Extraction (SX) Train', 'High-Pressure Membrane Filter Presses'],
  },
  {
    id: 'operations',
    name: 'Operations & SCADA Command Center',
    code: 'ZONE-03',
    category: 'Operations',
    capacity: '24/7 Plant Telemetry & Control',
    purity: 'Continuous Process Optimization',
    description: 'Centralized plant-wide distributed control system (DCS) monitoring real-time flow kinetics, chemical dosing, closed-loop thermal balance, and automated ZLD effluent recirculators.',
    equipment: ['Distributed Control System (DCS)', 'Dual-Redundant SCADA Server Consoles', 'Real-Time Emissions & Mass-Balance Sensors'],
  },
  {
    id: 'rnd',
    name: 'R&D & Rare Earth Pilot',
    code: 'ZONE-04',
    category: 'R&D',
    capacity: '1,200 TPA Magnet Scrap',
    purity: 'Nd & Dy Separation >99.4%',
    description: 'Advanced materials innovation center housing India’s first permanent magnet recycling pilot for extracting Neodymium (Nd), Dysprosium (Dy), and Praseodymium (Pr).',
    equipment: ['Chromatography Separation Columns', 'Hydrogen Decrepitation Pilot Reactor', 'Vacuum Induction Melting Furnace'],
  },
  {
    id: 'qaqc',
    name: 'QA/QC Spectrometry Suite',
    code: 'ZONE-05',
    category: 'QA/QC',
    capacity: 'Real-Time Metrology Certification',
    purity: 'Trace Impurities < 10 ppm',
    description: 'ISO 17025 accredited cleanroom certifying batch compliance for global battery cell OEMs with inductively coupled plasma optical emission spectroscopy.',
    equipment: ['ICP-OES Optical Emission Spectrometers', 'X-Ray Fluorescence (XRF) Analyzers', 'Laser Diffraction Particle Size Analyzers'],
  },
  {
    id: 'warehousing',
    name: 'Hazmat & Class 9 Warehousing',
    code: 'ZONE-06',
    category: 'Warehousing',
    capacity: '8,000 MT Storage Capacity',
    purity: 'Climate & Nitrogen Controlled',
    description: 'Automated storage and retrieval system (ASRS) for inbound end-of-life battery modules, intermediate black mass canisters, and finished battery-grade chemical precursor salts.',
    equipment: ['ASRS High-Bay Racking with Robotic Shuttles', 'Continuous Thermal Runaway Monitoring Scanners', 'Dry Nitrogen Inert Storage Pods'],
  },
];

export default function InsideFacilityMap() {
  const [activeZone, setActiveZone] = useState<Zone>(zones[0]);

  return (
    <div className="w-full bg-[#0D2237] rounded-xl border border-[#2E87C6]/25 overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#081726] px-6 py-4 border-b border-[#2E87C6]/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EE7B2B] animate-pulse"></span>
            <h3 className="text-white font-bold font-['Outfit'] text-base sm:text-lg">
              Inside Giga Mines — Complex Blueprint
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            230,000 SQ FT INTEGRATED REFINING INFRASTRUCTURE • SELECT A ZONE TO INSPECT
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#4DA6E8] bg-[#0F2840] px-3 py-1 rounded border border-[#2E87C6]/30">
            ZLD ZERO-DISCHARGE FACILITY
          </span>
        </div>
      </div>

      {/* Main Single Split Layout (Zone Selector on Left, Detailed Inspector on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Zone Selector (Left 5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-[#091B2E] border-b lg:border-b-0 lg:border-r border-[#2E87C6]/20 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Facility Operational Zones
              </span>
              <span className="text-[10px] font-mono text-[#EE7B2B] bg-[#EE7B2B]/10 px-2 py-0.5 rounded border border-[#EE7B2B]/30 font-semibold">
                6 ZONES
              </span>
            </div>

            {zones.map((z) => {
              const isSelected = activeZone.id === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0F2840] border-[#EE7B2B] shadow-md shadow-[#EE7B2B]/15'
                      : 'bg-[#081726]/60 border-[#2E87C6]/15 hover:border-[#4DA6E8] hover:bg-[#081726]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#4DA6E8] block font-bold">{z.code}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#163B5D] text-slate-300">
                        {z.category.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white font-['Outfit'] block mt-1">
                      {z.name}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#EE7B2B]' : 'text-slate-400'}`}>
                    {isSelected ? 'ACTIVE' : 'INSPECT'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2E87C6]/15 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>AUDITED UNDER ISO 9001 / ISO 14001</span>
            <Activity className="w-4 h-4 text-[#2E87C6]" />
          </div>
        </div>

        {/* Selected Zone Inspector Terminal (Right 7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#0D2237]">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E87C6]/20">
              <span className="text-xs font-mono text-[#EE7B2B] font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                {activeZone.code} — {activeZone.category.toUpperCase()} SPECIFICATION
              </span>
              <span className="text-xs font-mono text-slate-400">
                STATUS: COMMISSIONING
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit'] mb-3">
              {activeZone.name}
            </h4>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              {activeZone.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-lg bg-[#081726] border border-[#2E87C6]/20">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Capacity / Throughput</span>
                <span className="text-base font-bold text-white font-mono mt-0.5 block">{activeZone.capacity}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#081726] border border-[#2E87C6]/20">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Purity / Process Target</span>
                <span className="text-base font-bold text-[#EE7B2B] font-mono mt-0.5 block">{activeZone.purity}</span>
              </div>
            </div>

            {/* Equipment list */}
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                Core Machinery &amp; Technical Systems
              </span>
              <ul className="space-y-2">
                {activeZone.equipment.map((eq, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#2E87C6] shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#2E87C6]/20 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ZERO LIQUID DISCHARGE (ZLD)
            </span>
            <a
              href="#partner"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EE7B2B] hover:text-[#D9681A] transition-colors font-mono"
            >
              <span>SCHEDULE TECHNICAL AUDIT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
