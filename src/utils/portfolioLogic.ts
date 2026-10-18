/**
 * Pure logic helpers for portfolio validations, animations, and formatting.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Validates the contact form inputs according to requirements:
 * Name: non-empty, min 2 chars
 * Email: valid email regex pattern
 * Message: non-empty, min 10 chars
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats count-up numbers with optional prefixes, suffixes, and thresholds.
 */
export function formatCountUp(current: number, target: number, suffix = '', prefix = ''): string {
  const rounded = Math.min(Math.round(current), target);
  return `${prefix}${rounded}${suffix}`;
}

/**
 * Checks if user prefers reduced motion.
 */
export function shouldSkipIntroAnimation(prefersReducedMotion: boolean, userSkipped: boolean): boolean {
  return prefersReducedMotion || userSkipped;
}
