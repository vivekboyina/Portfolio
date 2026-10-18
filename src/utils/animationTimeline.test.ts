import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_TIMELINE,
  VIVEK_LETTERS,
  getStageFromTime,
  validateLetterStructure,
} from './animationTimeline.ts';

test('DEFAULT_TIMELINE has total sequence ~5.0s with 1.0s initial black delay', () => {
  assert.equal(DEFAULT_TIMELINE.blackScreenDuration, 1.0);
  assert.equal(DEFAULT_TIMELINE.iAppearDelay, 1.0);
  assert.ok(DEFAULT_TIMELINE.pulse1Delay > DEFAULT_TIMELINE.iAppearDelay);
  assert.ok(DEFAULT_TIMELINE.pulse2Delay > DEFAULT_TIMELINE.pulse1Delay);
  assert.ok(DEFAULT_TIMELINE.snapDelay > DEFAULT_TIMELINE.pulse2Delay);
  assert.ok(DEFAULT_TIMELINE.sweepDelay > DEFAULT_TIMELINE.snapDelay);
  assert.ok(DEFAULT_TIMELINE.idleStartDelay > DEFAULT_TIMELINE.sweepDelay);
  assert.equal(DEFAULT_TIMELINE.replayReadyDelay, 5.0);
});

test('Letter structure matches V - i - V - E - K with proper groupings', () => {
  assert.equal(VIVEK_LETTERS.length, 5);
  assert.equal(validateLetterStructure(VIVEK_LETTERS), true);

  const chars = VIVEK_LETTERS.map(l => l.char).join('');
  assert.equal(chars, 'ViVEK');
  assert.equal(VIVEK_LETTERS[1].char, 'i');
  assert.equal(VIVEK_LETTERS[1].group, 'center');
});

test('getStageFromTime returns correct animation stages across chronological progression', () => {
  assert.equal(getStageFromTime(0.0), 'black');
  assert.equal(getStageFromTime(0.5), 'black');
  assert.equal(getStageFromTime(1.0), 'flip-i');
  assert.equal(getStageFromTime(1.5), 'flip-i');
  assert.equal(getStageFromTime(2.2), 'call-v');
  assert.equal(getStageFromTime(3.0), 'call-vek');
  assert.equal(getStageFromTime(3.8), 'magnetic-snap');
  assert.equal(getStageFromTime(4.3), 'light-sweep');
  assert.equal(getStageFromTime(5.1), 'idle');
});
