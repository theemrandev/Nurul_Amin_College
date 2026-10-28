import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie, getSession } from '@/lib/auth';
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

  const session = await getSession();
  if (session) {
    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'AUTH_LOGOUT',
      targetId: session.id,
      details: 'Administrator logged out',
      outcome: 'SUCCESS',
    });
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  clearSessionCookie(response);
  return response;
}
