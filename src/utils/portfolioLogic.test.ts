import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  formatCountUp,
  shouldSkipIntroAnimation,
} from './portfolioLogic.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

test('validateContactForm checks name, email, and message correctly', () => {
  // Empty inputs
  const emptyRes = validateContactForm({ name: '', email: '', message: '' });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.message);

  // Invalid email
  const badEmailRes = validateContactForm({
    name: 'Vivek',
    email: 'not-an-email',
    message: 'Hello, this is a test message with enough length.',
  });
  assert.equal(badEmailRes.isValid, false);
  assert.ok(badEmailRes.errors.email);

  // Short message
  const shortMsgRes = validateContactForm({
    name: 'Vivek',
    email: 'vivek@example.com',
    message: 'Too short',
  });
  assert.equal(shortMsgRes.isValid, false);
  assert.ok(shortMsgRes.errors.message);

  // Valid form
  const validRes = validateContactForm({
    name: 'Boyina Vivek',
    email: 'vivekboyina77@gmail.com',
    message: 'I would like to discuss an internship opportunity with you.',
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});

test('formatCountUp calculates numbers with prefixes and suffixes', () => {
  assert.equal(formatCountUp(8, 8, '%', 'Top '), 'Top 8%');
  assert.equal(formatCountUp(750, 750, '+'), '750+');
  assert.equal(formatCountUp(1400, 1400, '+'), '1400+');
  assert.equal(formatCountUp(5, 5, '★'), '5★');
});

test('shouldSkipIntroAnimation respects reduced motion and user skips', () => {
  assert.equal(shouldSkipIntroAnimation(true, false), true);
  assert.equal(shouldSkipIntroAnimation(false, true), true);
  assert.equal(shouldSkipIntroAnimation(false, false), false);
});

test('PORTFOLIO_DATA contains all required sections and valid user information', () => {
  assert.equal(PORTFOLIO_DATA.personal.fullName, 'Boyina Veera Venkata Vivek');
  assert.equal(PORTFOLIO_DATA.personal.email, 'vivekboyina77@gmail.com');
  assert.equal(PORTFOLIO_DATA.personal.phone, '8106464623');
  assert.equal(PORTFOLIO_DATA.skills.length, 4);
  assert.equal(PORTFOLIO_DATA.projects.length, 2);
  assert.equal(PORTFOLIO_DATA.experience.length, 1);
  assert.equal(PORTFOLIO_DATA.education.length, 2);
  assert.equal(PORTFOLIO_DATA.achievements.length, 4);
});
