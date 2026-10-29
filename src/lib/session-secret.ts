import 'server-only';

export const MIN_SESSION_SECRET_LENGTH = 32;
export const DEV_FALLBACK_SECRET = 'nadc-default-dev-secret-change-in-prod-at-least-32-chars';

export const INSECURE_PLACEHOLDER_SECRETS = new Set([
  'nadc-default-dev-secret-change-in-prod-at-least-32-chars',
  'change-this-to-a-secure-random-32-char-secret-in-production',
]);

export interface SecretValidationEnv {
  NODE_ENV?: string;
  SESSION_SECRET?: string;
}

/**
 * Validates and retrieves the active session secret for JWT signing and verification.
 *
 * Security Requirements:
 * 1. Production (NODE_ENV === 'production'):
 *    - SESSION_SECRET is strictly mandatory and non-empty.
 *    - Must be at least 32 characters in length (256-bit entropy).
 *    - Must not match known development or example template placeholders.
 *    - Throws a descriptive configuration error if any condition fails.
 * 2. Development / Test (NODE_ENV !== 'production'):
 *    - If SESSION_SECRET is provided, it must be at least 32 characters long.
 *    - If omitted, falls back to DEV_FALLBACK_SECRET to ensure seamless local developer workflow.
 *
 * @param env Optional environment map for unit testing and dependency injection.
 */
export function getValidatedSessionSecret(env: SecretValidationEnv = process.env): string {
  const isProduction = env.NODE_ENV === 'production';
  const rawSecret = env.SESSION_SECRET;
  const trimmed = typeof rawSecret === 'string' ? rawSecret.trim() : '';

  if (isProduction) {
    if (!trimmed) {
      throw new Error(
        'CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET is required in production environment.'
      );
    }
    if (trimmed.length < MIN_SESSION_SECRET_LENGTH) {
      throw new Error(
        `CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters long in production.`
      );
    }
    if (INSECURE_PLACEHOLDER_SECRETS.has(trimmed)) {
      throw new Error(
        'CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET in production cannot use a known development or example placeholder.'
      );
    }
    return trimmed;
  }

  // Non-production (development, test)
  if (trimmed) {
    if (trimmed.length < MIN_SESSION_SECRET_LENGTH) {
      throw new Error(
        `SESSION_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters long if configured.`
      );
    }
    return trimmed;
  }

  return DEV_FALLBACK_SECRET;
}

export function getSecretKey(env?: SecretValidationEnv): Uint8Array {
  const secret = getValidatedSessionSecret(env);
  return new TextEncoder().encode(secret);
}
