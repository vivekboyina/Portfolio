import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { DEFAULT_TIMELINE, AnimationStage } from '../utils/animationTimeline.ts';

export interface HeroNameProps {
  /** Optional custom font family (defaults to Montserrat / Poppins ExtraBold) */
  fontFamily?: string;
  /** Optional callback fired when the animation sequence finishes */
  onAnimationComplete?: () => void;
  /** Extra class names for outer container */
  className?: string;
}

/**
 * HeroName Component
 * Renders a full-screen cinematic hero animation of the name "VIVEK".
 * Pure black (#000) background, solid white bold geometric sans-serif typography.
 * Strictly black and white, no colors, no gradients except pure white light sheen.
 *
 * Sequence:
 * 0. 1.0s completely black empty screen (nothing visible)
 * 1. "i" appears upside-down and mirrored (rotateX 180, scaleY -1) at exact screen center,
 *    flips backward to upright with an ease-out, tiny bounce, and quick fade-in. Stays alone briefly.
 * 2. "i" pulses a white ring and calls the first "V", which slides in from the left with slight overshoot and fades in.
 * 3. "i" pulses once more and calls "VEK", which slides in together from the right with overshoot and fades in.
 * 4. Letters combine into "VIVEK" with even letter spacing, with a short magnetic snap as they lock together.
 *    The "i" stays anchored at the center until the end.
 * 5. Soft white light sweep passes across the word, followed by a very subtle floating idle motion.
 * 6. Minimal Replay button appears at the bottom.
 */
export const HeroName: React.FC<HeroNameProps> = ({
  fontFamily = "'Montserrat', 'Poppins', sans-serif",
  onAnimationComplete,
  className = '',
}) => {
  const [playCount, setPlayCount] = useState<number>(0);
  const [stage, setStage] = useState<AnimationStage>('black');
  const [showPulse1, setShowPulse1] = useState<boolean>(false);
  const [showPulse2, setShowPulse2] = useState<boolean>(false);
  const [isSnapped, setIsSnapped] = useState<boolean>(false);
  const [showSweep, setShowSweep] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [isReplayReady, setIsReplayReady] = useState<boolean>(false);

  const restartAnimation = useCallback(() => {
    // Reset stage to black immediately
    setStage('black');
    setShowPulse1(false);
    setShowPulse2(false);
    setIsSnapped(false);
    setShowSweep(false);
    setIsIdle(false);
    setIsReplayReady(false);
    setPlayCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Stage 0: 0s to 1.0s is purely black screen.
    const timeouts: NodeJS.Timeout[] = [];

    // Stage 1: At 1.0s, "i" appears at center and flips upright
    timeouts.push(
      setTimeout(() => {
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

    // Stage 3: At ~2.9s, "i" pulses again and calls "VEK"
    timeouts.push(
      setTimeout(() => {
        setShowPulse2(true);
        setStage('call-vek');
      }, DEFAULT_TIMELINE.pulse2Delay * 1000)
    );

    // Stage 4: At ~3.7s, magnetic snap locks letters together
    timeouts.push(
      setTimeout(() => {
        setStage('magnetic-snap');
        setIsSnapped(true);
      }, DEFAULT_TIMELINE.snapDelay * 1000)
    );

    // Stage 5: At ~4.1s, soft white light sweep begins
    timeouts.push(
      setTimeout(() => {
        setStage('light-sweep');
        setShowSweep(true);
      }, DEFAULT_TIMELINE.sweepDelay * 1000)
    );

    // Stage 5b: At ~4.9s, activate subtle floating idle motion
    timeouts.push(
      setTimeout(() => {
        setStage('idle');
        setIsIdle(true);
      }, DEFAULT_TIMELINE.idleStartDelay * 1000)
    );

    // Completion: At 5.0s, show replay button
    timeouts.push(
      setTimeout(() => {
        setIsReplayReady(true);
        onAnimationComplete?.();
      }, DEFAULT_TIMELINE.replayReadyDelay * 1000)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [playCount, onAnimationComplete]);

  // Keyboard shortcut: Space or 'r' to replay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReplayReady && (e.key === 'r' || e.key === 'R' || e.key === ' ')) {
        e.preventDefault();
        restartAnimation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReplayReady, restartAnimation]);

  const isVVisible = stage === 'call-v' || stage === 'call-vek' || stage === 'magnetic-snap' || stage === 'light-sweep' || stage === 'idle';
  const isVekVisible = stage === 'call-vek' || stage === 'magnetic-snap' || stage === 'light-sweep' || stage === 'idle';

  return (
    <main
      className={`relative w-screen h-screen min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden select-none m-0 p-0 ${className}`}
      style={{ fontFamily }}
      aria-label="VIVEK Hero Typography Animation"
    >
      {/* Stage Container: key={playCount} ensures a clean reset on every replay */}
      <div
        key={playCount}
        className="relative flex items-center justify-center perspective-1000 w-full h-full max-w-full"
      >
        {/* Stage 0 check: During the first 1.0 second, nothing is visible */}
        {stage !== 'black' && (
          <motion.div
            animate={
              isIdle
                ? {
                    y: [-3, 3, -3],
                    rotate: [-0.15, 0.15, -0.15],
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 4.4,
              ease: 'easeInOut',
            }}
            className="relative inline-flex items-center justify-center preserve-3d"
          >
            {/* Magnetic Snap Recoil Container */}
            <motion.div
              animate={
                isSnapped
                  ? {
                      scale: [1, 1.04, 0.992, 1],
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: 0.35,
                ease: [0.2, 0.9, 0.3, 1.2],
              }}
              className="relative inline-flex items-center justify-center"
            >
              {/* ====================================================
                  CENTER ANCHOR: Letter "i"
                  Stays positioned at the exact center until the end.
                  Starts upside-down and mirrored, flips upright with bounce.
                 ==================================================== */}
              <div className="relative flex items-center justify-center z-20">
                {/* Pulse 1: Outward ripple when calling "V" */}
                <AnimatePresence>
                  {showPulse1 && (
                    <motion.div
                      key="pulse-ring-1"
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

                {/* Pulse 2: Outward ripple when calling "VEK" */}
                <AnimatePresence>
                  {showPulse2 && (
                    <motion.div
                      key="pulse-ring-2"
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

                {/* The protagonist letter: "i" */}
                <motion.span
                  id="letter-i"
                  data-testid="letter-i"
                  initial={{
                    rotateX: 180,
                    scaleY: -1,
                    opacity: 0,
                    scale: 0.88,
                  }}
                  animate={{
                    rotateX: [180, -12, 4, 0],
                    scaleY: [-1, 1.08, 0.98, 1],
                    opacity: [0, 0.85, 1, 1],
                    scale: [0.88, 1.06, 0.99, 1],
                  }}
                  transition={{
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.65, 0.85, 1],
                  }}
                  className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none preserve-3d"
                  style={{
                    transformOrigin: '50% 60%',
                  }}
                >
                  i
                </motion.span>
              </div>

              {/* ====================================================
                  LEFT WING: Letter "V"
                  Anchored to the left of "i" (right-full).
                  Slides in from left with overshoot and fades in.
                 ==================================================== */}
              <div
                className="absolute right-full top-0 bottom-0 flex items-center justify-end z-10 pr-[0.05em]"
                aria-hidden="false"
              >
                <motion.span
                  id="letter-v1"
                  data-testid="letter-v1"
                  initial={{
                    x: -380,
                    opacity: 0,
                    scale: 0.94,
                  }}
                  animate={
                    isVVisible
                      ? isSnapped
                        ? {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                          }
                        : {
                            x: [-380, 14, -3, 0],
                            opacity: [0, 0.9, 1, 1],
                            scale: [0.94, 1.03, 1, 1],
                          }
                      : {
                          x: -380,
                          opacity: 0,
                          scale: 0.94,
                        }
                  }
                  transition={
                    isSnapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : {
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                          times: [0, 0.7, 0.88, 1],
                        }
                  }
                  className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none"
                >
                  V
                </motion.span>
              </div>

              {/* ====================================================
                  RIGHT WING: Letters "V", "E", "K"
                  Anchored to the right of "i" (left-full).
                  Slides in together from right with overshoot and fades in.
                 ==================================================== */}
              <div
                className="absolute left-full top-0 bottom-0 flex items-center justify-start z-10 pl-[0.05em]"
                aria-hidden="false"
              >
                <motion.div
                  initial={{
                    x: 380,
                    opacity: 0,
                    scale: 0.94,
                  }}
                  animate={
                    isVekVisible
                      ? isSnapped
                        ? {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                          }
                        : {
                            x: [380, -14, 3, 0],
                            opacity: [0, 0.9, 1, 1],
                            scale: [0.94, 1.03, 1, 1],
                          }
                      : {
                          x: 380,
                          opacity: 0,
                          scale: 0.94,
                        }
                  }
                  transition={
                    isSnapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : {
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                          times: [0, 0.7, 0.88, 1],
                        }
                  }
                  className="inline-flex items-center gap-[0.05em]"
                >
                  {/* Individual Element: second "V" */}
                  <motion.span
                    id="letter-v2"
                    data-testid="letter-v2"
                    className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none"
                  >
                    V
                  </motion.span>

                  {/* Individual Element: "E" */}
                  <motion.span
                    id="letter-e"
                    data-testid="letter-e"
                    className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none"
                  >
                    E
                  </motion.span>

                  {/* Individual Element: "K" */}
                  <motion.span
                    id="letter-k"
                    data-testid="letter-k"
                    className="inline-block text-[clamp(4.2rem,16vw,11.5rem)] font-black text-white leading-none"
                  >
                    K
                  </motion.span>
                </motion.div>
              </div>

              {/* ====================================================
                  Stage 5: Soft White Light Sweep across the word
                 ==================================================== */}
              <AnimatePresence>
                {showSweep && (
                  <div className="absolute inset-x-[-180%] inset-y-[-40%] pointer-events-none overflow-hidden z-30">
                    <motion.div
                      key="light-sweep-sheen"
                      initial={{ x: '-60%', opacity: 0 }}
                      animate={{
                        x: ['-60%', '160%'],
                        opacity: [0, 0.9, 0.95, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.85,
                        ease: [0.22, 1, 0.36, 1],
                      }}
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
        )}
      </div>

      {/* ====================================================
          REPLAY BUTTON: Minimal, thin white outline
          Appears only after the full sequence has finished (~5.0s)
         ==================================================== */}
      <AnimatePresence>
        {isReplayReady && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute bottom-8 sm:bottom-12 z-50 flex items-center justify-center"
          >
            <button
              onClick={restartAnimation}
              type="button"
              aria-label="Replay VIVEK animation"
              className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/35 hover:border-white text-white/75 hover:text-white bg-black/90 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer text-xs font-mono tracking-[0.24em] uppercase focus:outline-none focus:ring-1 focus:ring-white"
            >
              <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-90 text-white" />
              <span>Replay</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default HeroName;
