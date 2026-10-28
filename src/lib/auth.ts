import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export type AdminRole = 'MAIN_ADMIN' | 'ASSISTANT_ADMIN';

export interface SessionPayload {
  userId: string;
  name: string;
  username: string;
  role: AdminRole;
  sessionId: string;
}

export interface SessionUser {
  id: string;
  name: string;
  username: string;
  email: string | null;
  role: AdminRole;
  isActive: boolean;
}

export const SESSION_COOKIE_NAME = 'nadc_admin_session';
const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || 'nadc-default-dev-secret-change-in-prod-at-least-32-chars';
  return new TextEncoder().encode(secret);
}

// =============================================================================
// Password Hashing & Verification
// =============================================================================

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// =============================================================================
// Login Rate Limiter (Brute Force Protection)
// Local Development & Single-Process Runtime Implementation
//
// Operational Note:
// In local development or a single container process, this in-memory Map
// reliably enforces the 5-attempt / 15-minute sliding window policy.
// In distributed, horizontally scaled, or multi-region serverless deployments,
// a centralized shared key-value store (such as Upstash Redis or AWS ElastiCache)
// should be integrated via environment configuration (REDIS_URL / UPSTASH_TOKEN)
// to coordinate rate limiting across multiple server instances.
// =============================================================================

interface RateLimitRecord {
  attempts: number;
  resetAt: number;
}

const loginRateLimits = new Map<string, RateLimitRecord>();

export function checkLoginRateLimit(
  identifier: string,
  maxAttempts = 5,
  windowSeconds = 15 * 60
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = loginRateLimits.get(identifier);

  if (!record || record.resetAt < now) {
    loginRateLimits.set(identifier, { attempts: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true };
  }

  if (record.attempts >= maxAttempts) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.attempts += 1;
  return { allowed: true };
}

export function resetLoginRateLimit(identifier: string): void {
  loginRateLimits.delete(identifier);
}

// =============================================================================
// Session Management (Signed JWT + HTTP-Only Cookies)
// =============================================================================

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const secretKey = getSecretKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get and verify currently active session from HTTP-only cookie.
 * Validates against database to ensure account is active and role has not changed.
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const payload = await verifySessionToken(sessionCookie.value);
    if (!payload?.userId) return null;

    // Verify user in database
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role as AdminRole,
      isActive: user.isActive,
    };
  } catch {
    return null;
  }
}

/**
 * Attach secure session cookie to a NextResponse
 */
export function setSessionCookie(response: NextResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
}

/**
 * Remove session cookie from a NextResponse
 */
export function clearSessionCookie(response: NextResponse): void {
  const isProduction = process.env.NODE_ENV === 'production';
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
}
