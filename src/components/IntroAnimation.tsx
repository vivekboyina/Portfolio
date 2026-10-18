import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward, Sun, Moon } from 'lucide-react';
import { DEFAULT_TIMELINE, AnimationStage } from '../utils/animationTimeline.ts';

export interface IntroAnimationProps {
  onComplete: () => void;
  fontFamily?: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

/**
 * Phase 1 Intro Animation
 * Sequence:
 * 0. 1.0s completely black screen (nothing visible)
 * 1. "i" appears alone at exact center, flips upright with ease-out & bounce
 * 2. "i" pulses with thin white ring; first "V" slides in from left and attaches
 * 3. "i" pulses again; "VEK" slides in from right and attaches
 *    Whole word group smoothly shifts (container x: iCenterOffset -> 0 over 0.8s) so full word "VIVEK" is exactly centered
 * 4. Letters lock with short magnetic snap into "VIVEK" at exact center, followed by soft white light sweep
 * 5. Wordmark transitions seamlessly into sticky navbar logo
 * Includes a "Skip intro" button in the corner.
 */
export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onComplete,
  fontFamily = "'Montserrat', 'Poppins', sans-serif",
  theme = 'dark',
  onToggleTheme,
}) => {
  const [stage, setStage] = useState<AnimationStage>('black');
  const [showPulse1, setShowPulse1] = useState(false);
  const [showPulse2, setShowPulse2] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [showSweep, setShowSweep] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const [iCenterOffset, setICenterOffset] = useState<number>(0);

  // Measure exact offset needed to center letter "i" on screen
  const measureOffset = useCallback(() => {
    if (containerRef.current && letterIRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const iRect = letterIRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const iCenter = iRect.left + iRect.width / 2;
      const offset = containerCenter - iCenter;
      if (offset !== 0) {
        setICenterOffset(offset);
      }
    }
  }, []);

  useEffect(() => {
    measureOffset();
    window.addEventListener('resize', measureOffset);
    if (document.fonts) {
      document.fonts.ready.then(measureOffset);
    }
    return () => window.removeEventListener('resize', measureOffset);
  }, [measureOffset]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Stage 1: At 1.0s, "i" appears and flips upright
    timeouts.push(
      setTimeout(() => {
        measureOffset();
        setStage('flip-i');
      }, DEFAULT_TIMELINE.iAppearDelay * 1000)
    );

    // Stage 2: At ~2.1s, "i" pulses and calls "V"
    timeouts.push(
      setTimeout(() => {
        setShowPulse1(true);
        setStage('call-v');
      }, DEFAULT_TIMELINE.pulse1Delay * 1000)
    );

    // Stage 3: At ~2.9s, "i" pulses again and calls "VEK", container shifts to center
    timeouts.push(
      setTimeout(() => {
        setShowPulse2(true);
        setStage('call-vek');
      }, DEFAULT_TIMELINE.pulse2Delay * 1000)
    );

    // Stage 4: At ~3.7s, magnetic snap locks centered word
    timeouts.push(
      setTimeout(() => {
        setStage('magnetic-snap');
        setIsSnapped(true);
      }, DEFAULT_TIMELINE.snapDelay * 1000)
    );

    // Stage 5: At ~4.1s, soft white light sweep across centered word
    timeouts.push(
      setTimeout(() => {
        setStage('light-sweep');
        setShowSweep(true);
      }, DEFAULT_TIMELINE.sweepDelay * 1000)
    );

    // Complete intro at ~5.0s -> trigger Phase 2
    timeouts.push(
      setTimeout(() => {
        onComplete();
      }, DEFAULT_TIMELINE.replayReadyDelay * 1000)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete, measureOffset]);

  const isVVisible = stage === 'call-v' || stage === 'call-vek' || stage === 'magnetic-snap' || stage === 'light-sweep' || stage === 'idle';
  const isVekVisible = stage === 'call-vek' || stage === 'magnetic-snap' || stage === 'light-sweep' || stage === 'idle';
  const isAtCenter = stage === 'call-vek' || stage === 'magnetic-snap' || stage === 'light-sweep' || stage === 'idle';

  return (
    <div
      className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ fontFamily }}
      aria-label="VIVEK Intro Animation"
    >
      {/* Starting Page Top Controls: Mode Switch & Skip Intro */}
      <div className="absolute top-6 right-6 z-50 pointer-events-auto flex items-center gap-2.5">
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white bg-black/60 hover:bg-white/10 text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={handleSkip}
          type="button"
          aria-label="Skip intro animation"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white text-white/60 hover:text-white bg-black/60 hover:bg-white/10 text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5 text-white/80" />
        </button>
      </div>

      {/* 3D Perspective Stage for Letters */}
      <div className="relative flex items-center justify-center perspective-1000 w-full h-full">
        {/* Recoil / Scale container */}
        <motion.div
          animate={
            isSnapped
              ? { scale: [1, 1.04, 0.992, 1] }
              : { scale: 1 }
          }
          transition={{
            duration: 0.35,
            ease: [0.2, 0.9, 0.3, 1.2],
          }}
          className="relative inline-flex items-center justify-center"
        >
          {/*
            Full-Word Flex Container containing all five letters (V, i, V, E, K).
            Starts at x = iCenterOffset (placing letter "i" at the exact center of screen).
            Animates x to 0 (ease-out, 0.8s) when "VEK" arrives, perfectly centering "VIVEK".
          */}
          <motion.div
            ref={containerRef}
            layoutId="hero-navbar-wordmark"
            animate={{
              x: isAtCenter ? 0 : iCenterOffset,
              opacity: stage === 'black' ? 0 : 1,
            }}
            transition={{
              x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.01 },
            }}
            className="relative inline-flex items-center justify-center preserve-3d tracking-tight font-hero font-black"
          >
            {/* ====================================================
                LETTER 1: "V" (slides in from left to attach to "i")
               ==================================================== */}
            <div className="relative inline-flex items-center justify-center overflow-visible">
              <motion.span
                id="letter-v1"
                data-testid="letter-v1"
                initial={{ x: -320, opacity: 0, scale: 0.94 }}
                animate={
                  isVVisible
                    ? isSnapped
                      ? { x: 0, opacity: 1, scale: 1 }
                      : { x: [-320, 14, -3, 0], opacity: [0, 0.9, 1, 1], scale: [0.94, 1.03, 1, 1] }
                    : { x: -320, opacity: 0, scale: 0.94 }
                }
                transition={
                  isSnapped
                    ? { duration: 0.2, ease: 'easeOut' }
                    : { duration: 0.7, ease: [0.16, 1, 0.3, 1], times: [0, 0.7, 0.88, 1] }
                }
                className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none pr-[0.02em]"
              >
                V
              </motion.span>
            </div>

            {/* ====================================================
                LETTER 2: "i" (protagonist, centered initially)
               ==================================================== */}
            <div className="relative inline-flex items-center justify-center z-20">
              {/* Pulse 1: Outward ripple ring when calling "V" */}
              <AnimatePresence>
                {showPulse1 && (
                  <motion.div
                    key="pulse-1"
                    initial={{ scale: 0.2, opacity: 0.95 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="absolute rounded-full border border-white pointer-events-none"
                    style={{
                      width: '180px',
                      height: '180px',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-90px',
                      marginTop: '-90px',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Pulse 2: Outward ripple ring when calling "VEK" */}
              <AnimatePresence>
                {showPulse2 && (
                  <motion.div
                    key="pulse-2"
                    initial={{ scale: 0.25, opacity: 0.95 }}
                    animate={{ scale: 3.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="absolute rounded-full border border-white pointer-events-none"
                    style={{
                      width: '180px',
                      height: '180px',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-90px',
                      marginTop: '-90px',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Letter "i" with reverse flip */}
              <motion.span
                ref={letterIRef}
                id="letter-i"
                data-testid="letter-i"
                initial={{
                  rotateX: 180,
                  scaleY: -1,
                  opacity: 0,
                  scale: 0.88,
                }}
                animate={
                  stage === 'black'
                    ? { opacity: 0, rotateX: 180, scaleY: -1 }
                    : {
                        rotateX: [180, -12, 4, 0],
                        scaleY: [-1, 1.08, 0.98, 1],
                        opacity: [0, 0.85, 1, 1],
                        scale: [0.88, 1.06, 0.99, 1],
                      }
                }
                transition={{
                  duration: 0.78,
                  ease: [0.16, 1, 0.3, 1],
                  times: [0, 0.65, 0.85, 1],
                }}
                className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none preserve-3d px-[0.02em]"
                style={{ transformOrigin: '50% 60%' }}
              >
                i
              </motion.span>
            </div>

            {/* ====================================================
                LETTERS 3, 4, 5: "VEK" (slide in together from right)
               ==================================================== */}
            <motion.div
              initial={{ x: 320, opacity: 0, scale: 0.94 }}
              animate={
                isVekVisible
                  ? isSnapped
                    ? { x: 0, opacity: 1, scale: 1 }
                    : { x: [320, -14, 3, 0], opacity: [0, 0.9, 1, 1], scale: [0.94, 1.03, 1, 1] }
                  : { x: 320, opacity: 0, scale: 0.94 }
              }
              transition={
                isSnapped
                  ? { duration: 0.2, ease: 'easeOut' }
                  : { duration: 0.7, ease: [0.16, 1, 0.3, 1], times: [0, 0.7, 0.88, 1] }
              }
              className="inline-flex items-center pl-[0.02em]"
            >
              <motion.span
                id="letter-v2"
                data-testid="letter-v2"
                className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none"
              >
                V
              </motion.span>
              <motion.span
                id="letter-e"
                data-testid="letter-e"
                className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none pl-[0.02em]"
              >
                E
              </motion.span>
              <motion.span
                id="letter-k"
                data-testid="letter-k"
                className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none pl-[0.02em]"
              >
                K
              </motion.span>
            </motion.div>

            {/* Light Sweep across the full centered word */}
            <AnimatePresence>
              {showSweep && (
                <div className="absolute inset-x-[-30%] inset-y-[-40%] pointer-events-none overflow-hidden z-30">
                  <motion.div
                    key="light-sweep"
                    initial={{ x: '-80%', opacity: 0 }}
                    animate={{ x: ['-80%', '180%'], opacity: [0, 0.9, 0.95, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[50%] h-full pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,1.0) 51%, rgba(255,255,255,0.7) 54%, rgba(255,255,255,0.02) 80%, transparent 100%)',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroAnimation;
