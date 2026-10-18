import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, ExternalLink, Flame, Star, Award, TrendingUp } from 'lucide-react';
import { PORTFOLIO_DATA, AchievementItem } from '../data/portfolioData.ts';

/**
 * Animated CountUp Number Component
 */
const AnimatedStatValue: React.FC<{
  target: number;
  prefix?: string;
  suffix?: string;
}> = ({ target, prefix = '', suffix = '' }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * target);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-hero font-black tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export const Achievements: React.FC = () => {
  const getAchievementIcon = (id: string) => {
    switch (id) {
      case 'atf-scholarship':
        return <Trophy className="w-6 h-6 text-white" />;
      case 'leetcode':
        return <Flame className="w-6 h-6 text-white" />;
      case 'codechef':
        return <TrendingUp className="w-6 h-6 text-white" />;
      case 'hackerrank':
        return <Star className="w-6 h-6 text-white" />;
      default:
        return <Award className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section
      id="achievements"
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
          // 06. MILESTONES & HONORS
        </span>
        <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Competitive Coding & Honors
        </h2>
      </motion.div>

      {/* Animated Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.achievements.map((item: AchievementItem, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="group relative p-6 rounded-2xl border border-white/15 bg-white/[0.02] hover:border-white/50 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <div>
              {/* Card Icon & Top Accent */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl border border-white/20 bg-white/[0.05] group-hover:bg-white/10 transition-colors">
                  {getAchievementIcon(item.id)}
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                  RANK #{index + 1}
                </span>
              </div>

              {/* Animated Count-Up Big Number */}
              <div className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight mb-3">
                <AnimatedStatValue
                  target={item.numericValue}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              <h3 className="font-hero font-bold text-white text-lg tracking-tight mb-2">
                {item.title}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                {item.description}
              </p>
            </div>

            {/* Link Button */}
            {item.link && item.link !== '#' && (
              <div className="pt-4 border-t border-white/10">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider text-white/75 group-hover:text-white transition-colors"
                >
                  <span>{item.linkLabel || 'View Verification'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
