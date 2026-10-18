import React from 'react';
import { motion } from 'motion/react';
import { Download, Mail, Github, Linkedin, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA, PORTRAIT_IMAGE } from '../data/portfolioData.ts';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Subtle Ambient Glow (Strictly Monochrome White on Black) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10 my-auto">
        {/* Left Column: Typography, Tagline, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.03] text-white/70 text-xs font-mono tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Open to SDE Internships 2026</span>
          </motion.div>

          {/* Full Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-hero text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] mb-4"
          >
            Boyina Veera <br className="hidden sm:inline" />
            Venkata <span className="underline decoration-white/30 decoration-wavy decoration-1 underline-offset-8">Vivek</span>
          </motion.h1>

          {/* Nickname & Alias Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-white/60 font-mono text-sm tracking-wider">
              (goes by <strong className="text-white font-semibold">Vivek</strong>)
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg sm:text-xl text-white/80 font-medium tracking-wide max-w-2xl mb-8 leading-relaxed"
          >
            {PORTFOLIO_DATA.personal.title}
          </motion.p>

          {/* Action Buttons: View Projects, Download Resume, Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
          >
            <button
              onClick={() => scrollTo('projects')}
              type="button"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              View Projects
            </button>

            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              download="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 hover:border-white text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] active:scale-95 text-sm font-mono tracking-wider transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              type="button"
              className="px-6 py-3 rounded-full border border-white/20 hover:border-white/60 text-white/70 hover:text-white bg-transparent active:scale-95 text-sm font-mono tracking-wider transition-all cursor-pointer"
            >
              Contact
            </button>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4 text-white/60 pt-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Connect:</span>
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full border border-white/15 hover:border-white text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full border border-white/15 hover:border-white text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="p-2 rounded-full border border-white/15 hover:border-white text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              aria-label="Email Vivek"
              className="p-2 rounded-full border border-white/15 hover:border-white text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Profile Photo (Phase 2 Blur-to-Sharp Reveal with Scale 1.05 -> 1.0) */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.06,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.95,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative group w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Outer Subtle White Glow Ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-white/10 via-white/20 to-white/5 opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            {/* Photo Card Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/25 group-hover:border-white/60 bg-black shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-all duration-500">
              <img
                src={PORTRAIT_IMAGE}
                alt="Boyina Veera Venkata Vivek (VK) - Portrait"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />

              {/* Minimal Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none" />

              {/* Minimal Badge Overlay: Center-aligned name only */}
              <div className="absolute bottom-4 inset-x-4 bg-black/85 backdrop-blur-md border border-white/20 rounded-lg p-2.5 flex items-center justify-center text-center text-xs font-mono">
                <span className="text-white/90 font-medium tracking-wide">Boyina Veera Venkata Vivek</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
