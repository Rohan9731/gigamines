import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why It Matters', href: '#why' },
    { name: 'The Model', href: '#model' },
    { name: 'Inside Facility', href: '#facility' },
    { name: 'Technology', href: '#technology' },
    { name: 'Elements', href: '#elements' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#081726]/90 backdrop-blur-md border-b border-[#2E87C6]/20 py-3.5 shadow-lg shadow-[#050E17]/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity: Clean and minimalist */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[#0F2840] border border-[#2E87C6]/30 flex items-center justify-center text-[#2E87C6] group-hover:border-[#EE7B2B] group-hover:text-[#EE7B2B] transition-colors">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-['Outfit'] leading-none">
              GIGA MINES
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 font-mono mt-0.5">
              CRITICAL MINERALS REFINING
            </span>
          </div>
        </a>

        {/* Center Navigation Links: Clean, spacious, single line */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-[#EE7B2B] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Navy text on Orange */}
        <div className="hidden sm:flex items-center">
          <a
            href="#partner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EE7B2B] hover:bg-[#D9681A] text-[#0F2840] font-bold text-sm tracking-wide whitespace-nowrap transition-all shadow-md shadow-[#EE7B2B]/20 transform hover:-translate-y-0.5"
          >
            <span>Partner with Us</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#0F2840] border border-[#2E87C6]/30 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#081726]/98 border-b border-[#2E87C6]/30 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#EE7B2B] py-1 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#partner"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#EE7B2B] text-[#0F2840] font-bold text-sm tracking-wide shadow-md"
            >
              <span>Partner with Us</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
