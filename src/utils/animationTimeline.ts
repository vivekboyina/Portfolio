/**
 * Animation timing constants and pure timeline calculation helpers.
 * Defines the choreography stages for the VIVEK hero animation sequence.
 */

export interface AnimationTimelineConfig {
  blackScreenDuration: number; // Stage 0: 1.0s pure black
  iAppearDelay: number;        // Stage 1: starts at 1.0s
  iFlipDuration: number;       // Stage 1: flip upright ~0.75s
  iPauseDuration: number;      // Stage 1: pause alone ~0.35s
  pulse1Delay: number;         // Stage 2: first pulse calls 'V' ~2.1s
  vSlideDuration: number;      // Stage 2: 'V' slides in ~0.7s
  pulse2Delay: number;         // Stage 3: second pulse calls 'VEK' ~2.9s
  vekSlideDuration: number;    // Stage 3: 'VEK' slides in ~0.7s
  snapDelay: number;           // Stage 4: magnetic snap ~3.7s
  snapDuration: number;        // Stage 4: lock duration ~0.3s
  sweepDelay: number;          // Stage 5: light sweep ~4.1s
  sweepDuration: number;       // Stage 5: sweep duration ~0.8s
  idleStartDelay: number;      // Stage 5: idle float starts ~4.9s
  replayReadyDelay: number;    // Replay button visible ~5.0s
}

export const DEFAULT_TIMELINE: AnimationTimelineConfig = {
  blackScreenDuration: 1.0,
  iAppearDelay: 1.0,
  iFlipDuration: 0.75,
  iPauseDuration: 0.35,
  pulse1Delay: 2.1,
  vSlideDuration: 0.7,
  pulse2Delay: 2.9,
  vekSlideDuration: 0.7,
  snapDelay: 3.7,
  snapDuration: 0.3,
  sweepDelay: 4.1,
  sweepDuration: 0.8,
  idleStartDelay: 4.9,
  replayReadyDelay: 5.0,
};

export type AnimationStage =
  | 'black'
  | 'flip-i'
  | 'call-v'
  | 'call-vek'
  | 'magnetic-snap'
  | 'light-sweep'
  | 'idle';

export interface LetterSpec {
  id: string;
  char: string;
  group: 'left' | 'center' | 'right';
  groupIndex: number;
}

export const VIVEK_LETTERS: LetterSpec[] = [
  { id: 'letter-v1', char: 'V', group: 'left', groupIndex: 0 },
  { id: 'letter-i', char: 'i', group: 'center', groupIndex: 0 },
  { id: 'letter-v2', char: 'V', group: 'right', groupIndex: 0 },
  { id: 'letter-e', char: 'E', group: 'right', groupIndex: 1 },
  { id: 'letter-k', char: 'K', group: 'right', groupIndex: 2 },
];

/**
 * Given elapsed time in seconds, determine the current animation stage.
 */
export function getStageFromTime(timeSeconds: number, config = DEFAULT_TIMELINE): AnimationStage {
  if (timeSeconds < config.iAppearDelay) {
    return 'black';
  }
  if (timeSeconds < config.pulse1Delay) {
    return 'flip-i';
  }
  if (timeSeconds < config.pulse2Delay) {
    return 'call-v';
  }
  if (timeSeconds < config.snapDelay) {
    return 'call-vek';
  }
  if (timeSeconds < config.sweepDelay) {
    return 'magnetic-snap';
  }
  if (timeSeconds < config.idleStartDelay) {
    return 'light-sweep';
  }
  return 'idle';
}

/**
 * Returns letter metadata for rendering.
 */
export function getLetterTokens() {
  return VIVEK_LETTERS;
}

/**
 * Validates that the letter structure adheres to the prompt requirements:
 * 5 letters total, "i" at center, "V" on left, "VEK" on right.
 */
export function validateLetterStructure(letters: LetterSpec[]): boolean {
  if (letters.length !== 5) return false;
  const left = letters.filter(l => l.group === 'left').map(l => l.char).join('');
  const center = letters.filter(l => l.group === 'center').map(l => l.char).join('');
  const right = letters.filter(l => l.group === 'right').map(l => l.char).join('');

  return left === 'V' && center === 'i' && right === 'VEK';
}
