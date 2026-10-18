import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Cpu, Code } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col items-start"
      >
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
          // 01. ABOUT ME
        </span>
        <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Background & Engineering Philosophy
        </h2>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Bio Column */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="lg:col-span-7 space-y-6 text-white/80 text-base sm:text-lg leading-relaxed font-normal"
        >
          <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
            {PORTFOLIO_DATA.about.lead}
          </p>

          <p>
            Strong fundamentals in <strong className="text-white font-semibold">Data Structures</strong>, <strong className="text-white font-semibold">Algorithms</strong>, <strong className="text-white font-semibold">OOP</strong>, <strong className="text-white font-semibold">Operating Systems</strong>, and <strong className="text-white font-semibold">DBMS</strong>, with practical development experience in <strong className="text-white font-semibold">Java</strong>, <strong className="text-white font-semibold">C++</strong>, and <strong className="text-white font-semibold">JavaScript</strong>.
          </p>

          <p>
            Built full-stack and console-based applications using <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">REST APIs</strong>, and core <strong className="text-white font-semibold">Java</strong> with clean architectural layering and persistent file handling.
          </p>

          <p>
            Ranked in the <strong className="text-white font-semibold">Top 14% on LeetCode</strong> with <strong className="text-white font-semibold">750+ problems solved</strong>, demonstrating consistent problem-solving acumen, analytical thinking, and efficient algorithmic implementations.
          </p>
        </motion.div>

        {/* Right Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
        >
          <div className="p-5 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-5 h-5 text-white/80 group-hover:text-white" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">Education</h3>
            </div>
            <p className="text-white font-bold text-base">Aditya University, Surampalem</p>
            <p className="text-white/60 text-sm">B.Tech in CSE (2024–Present) • CGPA: 8.64</p>
          </div>

          <div className="p-5 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-white/80 group-hover:text-white" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">Problem Solving</h3>
            </div>
            <p className="text-white font-bold text-base">LeetCode Top 14%</p>
            <p className="text-white/60 text-sm">750+ Solved • CodeChef 2-Star (1400+ rating)</p>
          </div>

          <div className="p-5 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-white/80 group-hover:text-white" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">Core Foundations</h3>
            </div>
            <p className="text-white font-bold text-base">Systems & Architecture</p>
            <p className="text-white/60 text-sm">DSA, Object-Oriented Programming, OS, DBMS</p>
          </div>

          <div className="p-5 rounded-xl border border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-5 h-5 text-white/80 group-hover:text-white" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">Application Craft</h3>
            </div>
            <p className="text-white font-bold text-base">Java, C++, React & APIs</p>
            <p className="text-white/60 text-sm">Building clean, robust, and maintainable software</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
