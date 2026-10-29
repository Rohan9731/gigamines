import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  type: string;
  product: string;
  purity: string;
  application: string;
  yieldRate: string;
}

const elements: ElementData[] = [
  {
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    type: 'Battery Mineral',
    product: 'Lithium Carbonate (Li2CO3) & LiOH',
    purity: '99.85% Battery Grade',
    application: 'Cathode active materials for EV battery cells and grid storage.',
    yieldRate: '96.2%',
  },
  {
    symbol: 'Co',
    name: 'Cobalt',
    atomicNumber: 27,
    type: 'Battery Mineral',
    product: 'Refined Cobalt Sulfate (CoSO4)',
    purity: '99.90% Precursor Grade',
    application: 'Thermal stability and structural durability in NMC formulations.',
    yieldRate: '97.5%',
  },
  {
    symbol: 'Ni',
    name: 'Nickel',
    atomicNumber: 28,
    type: 'Battery Mineral',
    product: 'Battery-Grade Nickel Sulfate (NiSO4)',
    purity: '99.80% High-Nickel Grade',
    application: 'Key driver of energy density and driving range in EV cells.',
    yieldRate: '96.8%',
  },
  {
    symbol: 'Mn',
    name: 'Manganese',
    atomicNumber: 25,
    type: 'Battery Mineral',
    product: 'High-Purity Manganese Sulfate',
    purity: '99.70% Chemical Grade',
    application: 'Cost optimization and structural safety in high-voltage cathodes.',
    yieldRate: '95.4%',
  },
  {
    symbol: 'Nd',
    name: 'Neodymium',
    atomicNumber: 60,
    type: 'Rare Earth',
    product: 'Neodymium (NdFeB) Sintered Flakes',
    purity: '99.50% Magnet Grade',
    application: 'High-torque permanent magnet traction motors and direct-drive wind turbines.',
    yieldRate: '94.8%',
  },
  {
    symbol: 'Dy',
    name: 'Dysprosium',
    atomicNumber: 66,
    type: 'Rare Earth',
    product: 'Dysprosium Oxide (Dy2O3)',
    purity: '99.20% Thermal Coercivity',
    application: 'Anti-demagnetization additive for extreme temperature EV drivetrains.',
    yieldRate: '93.5%',
  },
  {
    symbol: 'Pr',
    name: 'Praseodymium',
    atomicNumber: 59,
    type: 'Rare Earth',
    product: 'Praseodymium-Neodymium Metal',
    purity: '99.40% High-Flux Grade',
    application: 'Magnetic alloy enhancement for robotics, aerospace, and clean mobility.',
    yieldRate: '95.1%',
  },
];

export default function ElementTeaser() {
  const [selected, setSelected] = useState<ElementData>(elements[0]);

  return (
    <div className="w-full bg-[#0D2237] rounded-xl border border-[#2E87C6]/25 p-6 sm:p-8 shadow-xl">
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-mono text-[#4DA6E8] uppercase tracking-wider block mb-1">
          ELEMENT RECOVERY MATRIX
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
          Critical Minerals &amp; Rare Earths
        </h3>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Click an element to view target chemical purity, output specifications, and industrial applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Element Selection Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {elements.map((el) => {
            const isSelected = selected.symbol === el.symbol;
            return (
              <button
                key={el.symbol}
                onClick={() => setSelected(el)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F2840] border-[#EE7B2B] shadow-md shadow-[#EE7B2B]/20'
                    : 'bg-[#081726] border-[#2E87C6]/20 hover:border-[#4DA6E8]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>#{el.atomicNumber}</span>
                  <span className={el.type === 'Rare Earth' ? 'text-[#EE7B2B]' : 'text-[#4DA6E8]'}>
                    {el.type === 'Rare Earth' ? 'REE' : 'BAT'}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white font-['Outfit']">{el.symbol}</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">{el.name}</div>
                <div className="text-[10px] font-mono text-emerald-400 font-bold mt-2">
                  Yield: {el.yieldRate}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Element Specs Card (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#081726] rounded-xl border border-[#2E87C6]/30 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span className="text-[#4DA6E8]">{selected.type.toUpperCase()}</span>
              <span className="text-[#EE7B2B] font-bold">ATOMIC NO. {selected.atomicNumber}</span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <h4 className="text-3xl font-bold text-white font-['Outfit']">{selected.name}</h4>
              <span className="text-xl font-mono text-[#EE7B2B] font-bold">({selected.symbol})</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
              {selected.application}
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                <span className="text-[10px] text-slate-400 block uppercase">Product Output</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{selected.product}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                  <span className="text-[10px] text-slate-400 block uppercase">Target Purity</span>
                  <span className="text-sm font-bold text-[#EE7B2B] mt-0.5 block">{selected.purity}</span>
                </div>
                <div className="p-3 bg-[#0D2237] rounded-lg border border-[#2E87C6]/20">
                  <span className="text-[10px] text-slate-400 block uppercase">Recovery Yield</span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{selected.yieldRate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#2E87C6]/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">BATTERY &amp; MAGNET GRADE</span>
            <a
              href="#partner"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#EE7B2B] hover:text-[#D9681A] transition-colors font-mono"
            >
              <span>INQUIRE OFFTAKE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
