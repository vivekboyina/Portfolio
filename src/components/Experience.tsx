import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col items-start"
      >
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
          // 04. EXPERIENCE
        </span>
        <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Internships & Practical Work
        </h2>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-white/20 space-y-12 ml-2 sm:ml-4">
        {PORTFOLIO_DATA.experience.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.6)]">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Experience Card */}
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.02] hover:border-white/35 hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-hero text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 font-mono text-sm mt-1">
                    <span className="text-white font-semibold">{item.company}</span>
                    <span className="text-white/40">•</span>
                    <span className="flex items-center gap-1 text-white/60">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 text-white/80 text-xs font-mono tracking-wider shrink-0 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-white/60" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-3 mb-6 text-white/75 text-sm sm:text-base leading-relaxed">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-mono uppercase text-white/40 self-center mr-2">Technologies:</span>
                {item.techTags.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full border border-white/20 bg-white/[0.04] text-white/80 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
