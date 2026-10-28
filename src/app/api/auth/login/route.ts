import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  checkLoginRateLimit,
  resetLoginRateLimit,
  AdminRole,
} from '@/lib/auth';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Origin validation for state-changing requests
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json(
      { error: originCheck.reason || 'Cross-origin request rejected / অবৈধ ক্রস-অরিজিন অনুরোধ।' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body. JSON payload required.' },
        { status: 400 }
      );
    }

    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 400 }
      );
    }

    // Rate Limiting by IP + Username (in-memory for local development / single process)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateLimitKey = `${ip}:${username.toLowerCase()}`;
    const rateLimit = checkLoginRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      await recordAuditLog({
        actorName: username,
        actorRole: 'ANONYMOUS',
        action: 'AUTH_LOGIN_FAILED',
        details: `Rate limit triggered: exceeded allowed login attempts from IP ${ip}`,
        ipAddress: ip,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateLimit.retryAfter} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // Query user in database
    const user = await db.user.findUnique({
      where: { username },
    });

    // Generic error message if user not found or inactive (prevent account enumeration)
    if (!user || !user.isActive) {
      await recordAuditLog({
        actorName: username,
        actorRole: 'ANONYMOUS',
        action: 'AUTH_LOGIN_FAILED',
        details: 'Invalid username or inactive account',
        ipAddress: ip,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Verify Password
    const passwordValid = await verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      await recordAuditLog({
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: 'AUTH_LOGIN_FAILED',
        details: 'Incorrect password attempt',
        ipAddress: ip,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Successful login: reset rate limiter
    resetLoginRateLimit(rateLimitKey);

    // Create session token
    const sessionId = crypto.randomUUID();
    const token = await createSessionToken({
      userId: user.id,
      name: user.name,
      username: user.username,
      role: user.role as AdminRole,
      sessionId,
    });

    await recordAuditLog({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'AUTH_LOGIN_SUCCESS',
      targetId: user.id,
      details: 'Successful administrator login',
      ipAddress: ip,
      outcome: 'SUCCESS',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set HTTP-Only Cookie
    setSessionCookie(response, token);
    return response;
  } catch (err: unknown) {
    console.error('[API /api/auth/login POST] Error:', err);
    return NextResponse.json(
      { error: 'Authentication service encountered an unexpected error.' },
      { status: 500 }
    );
  }
}
