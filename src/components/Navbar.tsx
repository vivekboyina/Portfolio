import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Download, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export interface NavbarProps {
  activeSection: string;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme = 'dark',
  toggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-black/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* VIVEK Wordmark Logo (Shared layout animation target from Phase 1) */}
        <motion.a
          layoutId="hero-navbar-wordmark"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="group flex items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Boyina Veera Venkata Vivek Home"
        >
          <span className="font-hero text-2xl font-black tracking-tight text-white group-hover:opacity-80 transition-opacity">
            V<span className="text-white/70 font-semibold">i</span>VEK
          </span>
          <span className="text-[10px] font-mono tracking-widest text-white/50 border border-white/20 px-1.5 py-0.5 rounded uppercase">
            VK
          </span>
        </motion.a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {PORTFOLIO_DATA.navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                type="button"
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer rounded-sm ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 inset-x-2 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle + Resume CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.1] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          )}

          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            download="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.1] text-xs font-mono tracking-wider transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2 rounded-md border border-white/20 hover:border-white text-white/80 hover:text-white bg-black/60 focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/20 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {toggleTheme && (
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
                  <span className="text-xs font-mono text-white/60 uppercase">Theme Mode</span>
                  <button
                    onClick={toggleTheme}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white"
                  >
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              )}
              {PORTFOLIO_DATA.navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    type="button"
                    className={`flex items-center justify-between py-2 text-sm font-mono tracking-wider uppercase text-left transition-colors ${
                      isActive ? 'text-white font-bold pl-2 border-l-2 border-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  download="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-white text-white bg-white/10 text-xs font-mono uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
