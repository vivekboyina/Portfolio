import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Terminal,
  FolderGit2,
  CheckCircle2,
  Layers,
  Code2,
  Cpu,
  Database,
  Globe,
  Sparkles,
  MoveHorizontal,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData.ts';

export const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const projects = PORTFOLIO_DATA.projects;
  const totalProjects = projects.length;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = totalProjects - 1;
      if (next >= totalProjects) next = 0;
      return next;
    });
  };

  const handleDragEnd = (_e: any, { offset, velocity }: PanInfo) => {
    const swipeConfidenceThreshold = 8000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -60) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 60) {
      paginate(-1);
    }
  };

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentProject = projects[currentIndex];
  const isJavaProject = currentProject.id === 'student-management-system';

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header with Slider Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
            // 03. FEATURED WORK
          </span>
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Engineering Projects
          </h2>
        </motion.div>

        {/* Carousel Navigation Bar (Desktop & Tablet) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.03] text-white/70 text-xs font-mono">
            <span className="text-white font-bold">0{currentIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span>0{totalProjects}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => paginate(-1)}
              type="button"
              aria-label="Previous Project"
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/15 transition-all cursor-pointer active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => paginate(1)}
              type="button"
              aria-label="Next Project"
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/15 transition-all cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Length Swipeable Project Card Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[520px] select-none">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            className="project-card w-full cursor-grab active:cursor-grabbing rounded-3xl border border-white/20 hover:border-white/40 bg-black/95 p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
          >
            {/* Corner Decorative Tech Brackets */}
            <div className="project-corner-bracket absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/40 pointer-events-none" />
            <div className="project-corner-bracket absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/40 pointer-events-none" />
            <div className="project-corner-bracket absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/40 pointer-events-none" />
            <div className="project-corner-bracket absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/40 pointer-events-none" />

            {/* Split Grid: Left Details & Right Architecture Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (8 cols): Typography, Specs, Description & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Top Status & Index Pills */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/[0.06] text-white text-xs font-mono uppercase tracking-wider">
                      {isJavaProject ? <Terminal className="w-3.5 h-3.5" /> : <FolderGit2 className="w-3.5 h-3.5" />}
                      <span>Project 0{currentIndex + 1}</span>
                    </span>

                    <span className="project-subtitle-pill text-xs font-mono text-white/60 border border-white/15 px-3 py-1 rounded-full bg-white/[0.04]">
                      {currentProject.subtitle}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                    {currentProject.title}
                  </h3>

                  {/* Description Bullets */}
                  <ul className="space-y-3.5 mb-8 text-white/80 text-sm sm:text-base leading-relaxed">
                    {currentProject.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags Row */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="project-tag px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-white/80 text-xs font-mono tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
                  <a
                    href={currentProject.primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>{currentProject.primaryLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {currentProject.githubLink && (
                    <a
                      href={currentProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 text-xs sm:text-sm font-mono tracking-wider uppercase transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column (5 cols): Architecture & System Highlights Card */}
              <div className="lg:col-span-5">
                <div className="project-inner-card rounded-2xl border border-white/20 bg-white/[0.03] p-6 sm:p-7 relative overflow-hidden">
                  {/* Fake Terminal / Console Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                      Architecture Specs
                    </span>
                  </div>

                  {/* Architecture Highlights */}
                  {isJavaProject ? (
                    <div className="space-y-4 font-mono text-xs">
                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Layers className="w-4 h-4 text-white/70" />
                          <span>Layered MVC Architecture</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Clean separation between domain models, service business logic, and UI execution layer.
                        </p>
                      </div>

                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Database className="w-4 h-4 text-white/70" />
                          <span>Persistent Storage Engine</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Custom file-handling I/O serialization to guarantee state survives across application restarts.
                        </p>
                      </div>

                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Cpu className="w-4 h-4 text-white/70" />
                          <span>Full CRUD Operations</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Validation, search algorithms, record updates, and robust exception-handling pipelines.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 font-mono text-xs">
                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Globe className="w-4 h-4 text-white/70" />
                          <span>GitHub REST API Integration</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Asynchronous fetch client with debounced input, loading state spinners, and error boundaries.
                        </p>
                      </div>

                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Code2 className="w-4 h-4 text-white/70" />
                          <span>Tailwind CSS Monochrome UI</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Responsive layout with metrics cards, repository listings, and minimal typography hierarchy.
                        </p>
                      </div>

                      <div className="project-spec-item p-3.5 rounded-xl border border-white/15 bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-white font-semibold mb-1">
                          <Sparkles className="w-4 h-4 text-white/70" />
                          <span>Production Deployment</span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          Live continuous deployment on Vercel with optimized production build bundling.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Micro Footer Status */}
                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Status: Production Verified
                    </span>
                    <span>VK Engine v3.0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Pagination Indicators & Swipe Hint */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Swipe Guidance Pill */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/40">
          <MoveHorizontal className="w-4 h-4 animate-pulse" />
          <span>Swipe card or use arrow keys to slide projects</span>
        </div>

        {/* Clickable Pagination Dots */}
        <div className="flex items-center gap-2.5">
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={project.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                type="button"
                aria-label={`Go to project ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
