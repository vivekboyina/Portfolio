import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Database,
  Terminal,
  Wrench,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowDown,
  Cpu,
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData.ts';

const CATEGORY_META: Record<
  string,
  {
    tag: string;
    description: string;
    keyHighlights: string[];
  }
> = {
  'Programming Languages': {
    tag: 'Problem Solving & Systems Architecture',
    description:
      'Primary programming languages leveraged for competitive programming on LeetCode (750+ solved) and robust object-oriented system development.',
    keyHighlights: [
      'C++ (STL, Memory Efficiency & High-Speed Execution)',
      'Java (Clean OOP, MVC Pattern & File Handling)',
      'JavaScript (Modern ES6+, Asynchronous Programming & DOM)',
    ],
  },
  'Web Technologies': {
    tag: 'Full-Stack & Client Architecture',
    description:
      'Core web technologies and frameworks utilized to build high-performance, accessible, and responsive user interfaces with live API connectivity.',
    keyHighlights: [
      'React (Custom Hooks, Props Data Flow & Component Architecture)',
      'MySQL (Relational Schema Design & Query Operations)',
      'HTML5 & CSS3 (Semantic Web & Modern Monochrome Layouts)',
    ],
  },
  'Core Computer Science': {
    tag: 'Algorithmic & Engineering Foundations',
    description:
      'Rigorous computer science fundamentals powering optimal algorithmic time/space complexities, process management, and relational integrity.',
    keyHighlights: [
      'Data Structures & Algorithms (Top 14% on LeetCode)',
      'Object-Oriented Programming (Polymorphism, Abstraction, Encapsulation)',
      'Operating Systems & DBMS (Threads, ACID Properties, Normalization)',
    ],
  },
  'Developer Tools': {
    tag: 'DevOps & Workflow Productivity',
    description:
      'Industry-standard tooling and command-line environments for distributed version control, build workflows, and efficient debugging.',
    keyHighlights: [
      'Git & GitHub (Version Management, Branching & Open Source)',
      'Linux CLI / Bash (Shell Scripting & Command-Line Fluency)',
      'VS Code (Advanced Debugging, Linters & Build Tooling)',
    ],
  },
};

export const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 className="w-5 h-5 text-white" />;
      case 'Web Technologies':
        return <Database className="w-5 h-5 text-white" />;
      case 'Core Computer Science':
        return <Terminal className="w-5 h-5 text-white" />;
      case 'Developer Tools':
        return <Wrench className="w-5 h-5 text-white" />;
      default:
        return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  const totalCards = PORTFOLIO_DATA.skills.length;

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
            // 02. TECHNICAL SKILLS
          </span>
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Tools, Languages & CS Fundamentals
          </h2>
        </motion.div>

        {/* Stacking Guidance Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/[0.04] text-white/70 text-xs font-mono"
        >
          <Layers className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>Scroll to stack cards</span>
          <ArrowDown className="w-3 h-3 text-white/40" />
        </motion.div>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative w-full max-w-5xl mx-auto pb-20">
        {PORTFOLIO_DATA.skills.map((group: SkillCategory, index: number) => {
          const meta = CATEGORY_META[group.category] || {
            tag: 'Core Proficiency',
            description: 'Key skills and competencies in software engineering.',
            keyHighlights: group.items,
          };

          // Sticky offsets: Card 0 sticks at ~90px, Card 1 at ~126px, Card 2 at ~162px, Card 3 at ~198px
          const topOffset = `calc(90px + ${index * 36}px)`;
          const zIndex = 10 + index;

          return (
            <div
              key={group.category}
              style={{
                top: topOffset,
                zIndex: zIndex,
              }}
              className="sticky mb-24 sm:mb-32 last:mb-0 transition-transform duration-300"
            >
              <motion.article
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55 }}
                className="skills-card group relative rounded-3xl border border-white/20 hover:border-white/40 bg-black/95 p-6 sm:p-9 md:p-10 shadow-[0_-12px_35px_rgba(0,0,0,0.85),0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden"
              >
                {/* Top Subtle Light Sheen Border */}
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Decorative Corner Accents */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/30 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/30 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/30 pointer-events-none" />

                {/* Card Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl border border-white/20 bg-white/[0.06] text-white shadow-inner">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 border border-white/15 px-2 py-0.5 rounded-full bg-white/[0.02]">
                          Stack 0{index + 1} of 0{totalCards}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">
                          • VERIFIED
                        </span>
                      </div>
                      <h3 className="font-hero text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-white/60 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full hidden sm:inline-block">
                    {meta.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
                  {meta.description}
                </p>

                {/* Skill Chips Grid */}
                <div className="mb-8">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block mb-3">
                    Proficiencies & Technologies
                  </span>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {group.items.map((skill: string) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/20 hover:border-white/60 bg-white/[0.03] hover:bg-white/[0.08] text-white font-mono text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-default hover:scale-[1.03] shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white/50" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Highlights / Real-World Applications */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {meta.keyHighlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                      <span className="text-white/70 text-xs font-mono leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Card Footer Micro-Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <span>{group.items.length} Active Competencies</span>
                  </span>
                  <span>{index === totalCards - 1 ? 'End of Skills Stack' : 'Scroll down for next stack ↓'}</span>
                </div>
              </motion.article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
