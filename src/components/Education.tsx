import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Navigation,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  X,
  Cpu,
  Route,
  FileBadge,
} from 'lucide-react';
import { PORTFOLIO_DATA, EducationItem } from '../data/portfolioData.ts';

export const Education: React.FC = () => {
  // Modal state: null by default so ONLY the map is shown on the page!
  const [activeModalItem, setActiveModalItem] = useState<EducationItem | null>(null);

  const educationList = PORTFOLIO_DATA.education;
  const interItem =
    educationList.find((i) => i.id === 'sri-chaitanya') || educationList[0];
  const btechItem =
    educationList.find((i) => i.id === 'aditya-university') || educationList[1];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      }
    };
    if (activeModalItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
            // 05. ACADEMIC ROADMAP
          </span>
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Education Progression Map
          </h2>
        </motion.div>

        {/* Status guidance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-white/70 text-xs font-mono"
        >
          <Compass className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '12s' }} />
          <span>Interactive Map • Click pins to view academic info</span>
        </motion.div>
      </div>

      {/* ====================================================================
          INTERACTIVE ROUTE MAP (ONLY THE MAP - NO PERSISTENT CARDS BELOW)
          ==================================================================== */}
      <div className="education-map-board relative rounded-2xl border border-white/20 hover:border-white/30 bg-black/95 backdrop-blur-2xl p-4 sm:p-6 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.8)]">
        {/* Subtle Top Accent */}
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Minimal Corridor Bar Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-white/80">
            <Route className="w-3.5 h-3.5 text-white/70" />
            <span className="font-semibold text-white">NH-16 Academic Corridor:</span>
            <span className="text-white/60">Visakhapatnam (Inter) ➔ Surampalem (B.Tech CSE)</span>
            <span className="text-white/40 hidden sm:inline">• ~130 km</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Click any waypoint pin to open academic record</span>
          </div>
        </div>

        {/* The Route Map Track Canvas */}
        <div className="relative py-4 px-2 sm:px-4">
          {/* Subtle Cartographic Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15 flex flex-col justify-between py-1 text-[8px] font-mono select-none">
            <div className="flex justify-between">
              <span>LAT 17°41'12" N // LONG 83°13'07" E</span>
              <span>SECTOR: AP-EAST-COAST</span>
            </div>
            <div className="flex justify-between">
              <span>LAT 17°05'11" N // LONG 82°04'02" E</span>
              <span>CORRIDOR: NH-16</span>
            </div>
          </div>

          {/* Map Layout: Pin 1 (Inter) ── Animated SVG Dotted Line with Pulse Dot ── Pin 2 (B.Tech) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {/* Waypoint Pin 1: Intermediate / Sri Chaitanya */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModalItem(interItem)}
              className="education-waypoint-card group w-full md:w-[38%] text-left p-3.5 rounded-xl border border-white/15 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] transition-all cursor-pointer relative shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Radar Pin Beacon */}
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white border border-white/25 group-hover:bg-white group-hover:text-black transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                    </span>
                  </div>

                  <div className="truncate">
                    <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase block">
                      📍 01. INTERMEDIATE
                    </span>
                    <h4 className="font-hero text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                      Sri Chaitanya College
                    </h4>
                    <span className="text-[10px] font-mono text-white/50 block">
                      Visakhapatnam • 2022–2024
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/25 text-white font-mono text-[11px] font-bold bg-white/10">
                    96.6%
                  </span>
                  <span className="block text-[9px] font-mono text-white/50 group-hover:text-white mt-0.5 transition-colors">
                    Click to Open ↗
                  </span>
                </div>
              </div>
            </motion.button>

            {/* Connecting Route Corridor with Dotted Line & Traveling Dot */}
            <div className="w-full md:w-[24%] flex flex-col items-center justify-center px-1 py-1 sm:py-0 select-none">
              <div className="relative w-full flex items-center justify-center">
                {/* SVG Animated Highway Line with Theme-Adaptive Colors */}
                <svg
                  className="w-full h-6 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 200 24"
                >
                  {/* Dotted Track Line */}
                  <line
                    x1="10"
                    y1="12"
                    x2="190"
                    y2="12"
                    className="route-track-line"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />

                  {/* Traveling Signal Pulse Dot */}
                  <circle r="4" className="route-pulse-dot">
                    <animate
                      attributeName="cx"
                      from="10"
                      to="190"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="12; 12"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>

                {/* Transit Milestone Badge */}
                <div className="route-transit-pill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full border border-white/20 bg-black/90 backdrop-blur-md text-[9px] font-mono text-white/90 whitespace-nowrap shadow-sm flex items-center gap-1">
                  <Navigation className="w-2.5 h-2.5 text-white animate-bounce" />
                  <span>MPC ➔ CSE</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-white/40 mt-1">2024 Transition</span>
            </div>

            {/* Waypoint Pin 2: B.Tech / Aditya University */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModalItem(btechItem)}
              className="education-waypoint-card group w-full md:w-[38%] text-left p-3.5 rounded-xl border border-white/15 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] transition-all cursor-pointer relative shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Radar Pin Beacon */}
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white border border-white/25 group-hover:bg-white group-hover:text-black transition-colors">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase">
                        📍 02. B.TECH CSE
                      </span>
                      <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                        CURRENT
                      </span>
                    </div>
                    <h4 className="font-hero text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                      Aditya University
                    </h4>
                    <span className="text-[10px] font-mono text-white/50 block">
                      Surampalem • 2024–Present
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/25 text-white font-mono text-[11px] font-bold bg-white/10">
                    8.64 CGPA
                  </span>
                  <span className="block text-[9px] font-mono text-white/50 group-hover:text-white mt-0.5 transition-colors">
                    Click to Open ↗
                  </span>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ACADEMIC INFORMATION MODAL (OPENS ONLY WHEN PIN/WAYPOINT IS CLICKED)
          ==================================================================== */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="education-dossier relative w-full max-w-3xl rounded-3xl border border-white/20 bg-black/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 overflow-hidden my-auto"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              {/* Corner Decorative Tech Brackets */}
              <div className="education-corner-bracket absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/30 pointer-events-none" />
              <div className="education-corner-bracket absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/30 pointer-events-none" />
              <div className="education-corner-bracket absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/30 pointer-events-none" />
              <div className="education-corner-bracket absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/30 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-white/20 bg-white/[0.06] text-white">
                    <FileBadge className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 border border-white/15 px-2 py-0.5 rounded-full bg-white/[0.03]">
                        ACADEMIC RECORD // MILESTONE 0{activeModalItem.step || 1}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">
                        • VERIFIED
                      </span>
                    </div>
                    <h3 className="font-hero text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                      {activeModalItem.degree}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-full border border-white/20 hover:border-white text-white/60 hover:text-white bg-white/[0.04] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left Column (5 cols): Institution & Score */}
                <div className="md:col-span-5 space-y-4">
                  <div className="education-metric-box p-4 rounded-xl border border-white/15 bg-white/[0.02]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                      INSTITUTION & LOCATION
                    </span>
                    <h4 className="font-hero text-base font-bold text-white mb-2">
                      {activeModalItem.institution}
                    </h4>
                    <div className="space-y-1.5 text-xs font-mono text-white/70">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white/50" />
                        <span>{activeModalItem.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-white/50" />
                        <span>{activeModalItem.period}</span>
                      </div>
                      {activeModalItem.stream && (
                        <div className="flex items-center gap-2 text-white/90 pt-1">
                          <Layers className="w-3.5 h-3.5 text-white/50" />
                          <span>Stream: <strong>{activeModalItem.stream}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="education-metric-box p-4 rounded-xl border border-white/15 bg-white/[0.02] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">
                        {activeModalItem.scoreLabel}
                      </span>
                      <div className="font-hero text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {activeModalItem.score}
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-medium mt-0.5 block">
                        {activeModalItem.status || 'Verified Distinction'}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/[0.06] flex flex-col items-center justify-center text-center p-1.5">
                      <Award className="w-5 h-5 text-white mb-0.5" />
                      <span className="text-[7px] font-mono text-white/60 leading-none">
                        TOP TIER
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column (7 cols): Coursework & Highlights */}
                <div className="md:col-span-7 space-y-4">
                  {activeModalItem.coursework && (
                    <div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block mb-2">
                        Core Coursework & Focus Areas
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalItem.coursework.map((subject: string) => (
                          <span
                            key={subject}
                            className="education-coursework-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/15 bg-white/[0.03] text-white/85 text-xs font-mono"
                          >
                            <Sparkles className="w-3 h-3 text-white/50" />
                            <span>{subject}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block mb-2">
                      Academic Accomplishments
                    </span>
                    <div className="space-y-2">
                      {(activeModalItem.highlights || activeModalItem.details || []).map(
                        (point: string, pIdx: number) => (
                          <div
                            key={pIdx}
                            className="education-highlight-item p-2.5 rounded-lg border border-white/10 bg-white/[0.02] flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-white/80 text-xs font-mono leading-relaxed">
                              {point}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>Document ID: VK-ACAD-0{activeModalItem.step || 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModalItem(
                      activeModalItem.id === 'sri-chaitanya' ? btechItem : interItem
                    )
                  }
                  className="text-white hover:text-white/70 transition-colors cursor-pointer font-bold"
                >
                  {activeModalItem.id === 'sri-chaitanya'
                    ? 'Switch to B.Tech Record →'
                    : '← Switch to Intermediate Record'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;
