import React from 'react';
import { ArrowUp, Github, Linkedin, Code2, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Copyright strictly requested */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-hero font-black text-white text-lg tracking-tight">
            V<span className="text-white/60 font-medium">i</span>VEK
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <p className="text-xs sm:text-sm font-mono text-white/60">
            © 2026 Boyina Veera Venkata Vivek
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-full border border-white/15 hover:border-white text-white/60 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-full border border-white/15 hover:border-white text-white/60 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="p-2 rounded-full border border-white/15 hover:border-white text-white/60 hover:text-white transition-colors"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            aria-label="Email"
            className="p-2 rounded-full border border-white/15 hover:border-white text-white/60 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll back to top"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer bg-white/[0.02] hover:bg-white/[0.08]"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
