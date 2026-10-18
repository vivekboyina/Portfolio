/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import IntroAnimation from './components/IntroAnimation.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Experience from './components/Experience.tsx';
import Education from './components/Education.tsx';
import Achievements from './components/Achievements.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ScrollReveal from './components/ScrollReveal.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import ThreeScene from './components/ThreeScene.tsx';
import GeminiChatbot from './components/GeminiChatbot.tsx';
import { PORTFOLIO_DATA } from './data/portfolioData.ts';

export type Theme = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    }
    return 'dark';
  });

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // If View Transitions API with circular sweep is supported
    const hasViewTransition =
      typeof document !== 'undefined' &&
      typeof (document as any).startViewTransition === 'function';

    if (hasViewTransition) {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      if (e) {
        const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect?.();
        if (rect) {
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        } else if (e.clientX || e.clientY) {
          x = e.clientX;
          y = e.clientY;
        }
      }

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem('portfolio_theme', nextTheme);
        }
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        }
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 620,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      // Standard smooth transition
      setTheme(nextTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_theme', nextTheme);
      }
      if (nextTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }
  };

  // Sync theme class on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }
  }, [theme]);

  // Check prefers-reduced-motion
  const [hasCompletedIntro, setHasCompletedIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mediaQuery.matches;
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for Navbar highlighting
  useEffect(() => {
    if (!hasCompletedIntro) return;

    const sectionIds = PORTFOLIO_DATA.navLinks.map((link) => link.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the first intersecting entry from top
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasCompletedIntro]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-hero antialiased">
      {/* Custom Monochrome Architectural Cursor with Geometric Trailing Particles */}
      <CustomCursor theme={theme} />

      {/* Phase 1: Intro Animation with Starting Page Mode Switching */}
      <AnimatePresence>
        {!hasCompletedIntro && (
          <motion.div
            key="intro-phase"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <IntroAnimation
              onComplete={() => setHasCompletedIntro(true)}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2 & 3: Sticky Navbar + Staggered Hero + Scroll-Reveal Content */}
      {hasCompletedIntro && (
        <motion.div
          key="portfolio-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full"
        >
          {/* Sticky Navbar with shared layout logo and theme switch */}
          <Navbar
            activeSection={activeSection}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* Main Portfolio Sections */}
          <main className="w-full">
            <Hero />
            <ScrollReveal>
              <About />
            </ScrollReveal>
            <ScrollReveal>
              <Skills />
            </ScrollReveal>
            <ScrollReveal>
              <Projects />
            </ScrollReveal>
            <ScrollReveal>
              <Experience />
            </ScrollReveal>
            <ScrollReveal>
              <Education />
            </ScrollReveal>
            <ScrollReveal>
              <Achievements />
            </ScrollReveal>
            <ScrollReveal>
              <Contact />
            </ScrollReveal>
          </main>

          {/* Footer */}
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </motion.div>
      )}

      {/* Context-Aware Gemini Chatbot with Voice Chat */}
      <GeminiChatbot />

      {/* Persistent Middle 3D Rolling VK Monogram */}
      {hasCompletedIntro && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-45 transition-opacity duration-500">
          <ThreeScene
            showControls={false}
            theme={theme}
            initialGeometry="vk"
            activeSection={activeSection}
          />
        </div>
      )}
    </div>
  );
}
