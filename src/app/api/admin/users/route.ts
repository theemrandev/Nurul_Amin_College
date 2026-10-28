import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { requireMainAdmin } from '@/lib/rbac';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  const auth = requireMainAdmin(session);
  if (!auth.allowed) {
    return NextResponse.json({ error: auth.message }, { status: auth.statusCode || 403 });
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  // Origin validation for state-changing requests
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json(
      { error: originCheck.reason || 'Cross-origin request rejected / অবৈধ ক্রস-অরিজিন অনুরোধ।' },
      { status: 403 }
    );
  }

  const session = await getSession();
  const auth = requireMainAdmin(session);
  if (!auth.allowed || !session) {
    return NextResponse.json({ error: auth.message }, { status: auth.statusCode || 403 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
    const email = typeof body.email === 'string' && body.email.trim() ? body.email.trim().toLowerCase() : null;
    const password = typeof body.password === 'string' ? body.password : '';

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long.' }, { status: 400 });
    }

    if (!username || !/^[a-zA-Z0-9_.-]{3,30}$/.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-30 characters alphanumeric (letters, numbers, underscores, dots, hyphens).' },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json({ error: 'An administrator with this username already exists.' }, { status: 409 });
    }

    if (email) {
      const existingEmail = await db.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return NextResponse.json({ error: 'An administrator with this email already exists.' }, { status: 409 });
      }
    }

    // Hash password securely with bcrypt
    const passwordHash = await hashPassword(password);

    // Only Assistant Admin accounts can be created via this endpoint
    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
        role: 'ASSISTANT_ADMIN',
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'ADMIN_CREATE',
      targetId: newUser.id,
      details: `Created Assistant Admin @${newUser.username}`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { error: 'Failed to create administrator account: ' + errorMsg },
      { status: 500 }
    );
  }
}
