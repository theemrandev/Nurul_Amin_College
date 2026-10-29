import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { requireMainAdmin, canModifyAdminAccount } from '@/lib/rbac';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteContext) {
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

  const { id } = await context.params;

  const targetUser = await db.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    return NextResponse.json({ error: 'Administrator account not found.' }, { status: 404 });
  }

  const perm = canModifyAdminAccount(session, targetUser);
  if (!perm.allowed) {
    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'ADMIN_STATUS_UPDATE',
      targetId: id,
      details: `Unauthorized attempt to modify admin @${targetUser.username}`,
      outcome: 'DENIED',
    });
    return NextResponse.json({ error: perm.message }, { status: perm.statusCode || 403 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
    }

    const updateData: {
      name?: string;
      isActive?: boolean;
      passwordHash?: string;
    } = {};

    if (typeof body.name === 'string' && body.name.trim().length >= 2) {
      updateData.name = body.name.trim();
    }

    if (typeof body.isActive === 'boolean') {
      // Prevent disabling the Main Admin
      if (targetUser.role === 'MAIN_ADMIN' && !body.isActive) {
        return NextResponse.json(
          { error: 'Cannot disable the Main Administrator account.' },
          { status: 400 }
        );
      }
      updateData.isActive = body.isActive;
    }

    if (typeof body.password === 'string' && body.password.length >= 8) {
      updateData.passwordHash = await hashPassword(body.password);
    }

    const updated = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'ADMIN_STATUS_UPDATE',
      targetId: id,
      details: `Updated admin @${updated.username} (active: ${updated.isActive})`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err: unknown) {
    console.error('[API /api/admin/users/[id] PUT] Error:', err);
    return NextResponse.json({ error: 'Failed to update administrator due to an unexpected server error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
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

  const { id } = await context.params;

  const targetUser = await db.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    return NextResponse.json({ error: 'Administrator account not found.' }, { status: 404 });
  }

  const perm = canModifyAdminAccount(session, targetUser);
  if (!perm.allowed) {
    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'ADMIN_DELETE',
      targetId: id,
      details: `Unauthorized attempt to delete admin @${targetUser.username}`,
      outcome: 'DENIED',
    });
    return NextResponse.json({ error: perm.message }, { status: perm.statusCode || 403 });
  }

  // Check if target user owns student or teacher records
  const studentCount = await db.student.count({
    where: { createdById: id },
  });
  const teacherCount = await db.teacher.count({
    where: { createdById: id },
  });
  const totalRecords = studentCount + teacherCount;

  // Check if reassignment is requested via query param or body
  const { searchParams } = new URL(req.url);
  let reassignToId = searchParams.get('reassignToId');
  if (!reassignToId) {
    try {
      const body = await req.json();
      if (body && typeof body.reassignToId === 'string') {
        reassignToId = body.reassignToId;
      }
    } catch {
      // Body may be empty in standard DELETE
    }
  }

  if (totalRecords > 0) {
    // If reassignment was NOT requested, block deletion to prevent record loss
    if (!reassignToId) {
      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'ADMIN_DELETE_BLOCKED_HAS_RECORDS',
        targetId: id,
        details: `Blocked deletion of @${targetUser.username}: owns ${studentCount} students and ${teacherCount} teachers`,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        {
          error: `এই প্রশাসকের অধীনে ${studentCount}টি শিক্ষার্থী ও ${teacherCount}টি শিক্ষক রেকর্ড সংরক্ষিত রয়েছে। অ্যাকাউন্টটি মুছে ফেলার পূর্বে রেকর্ডগুলো অন্য প্রশাসকের কাছে স্থানান্তর (reassign) করুন। / Cannot delete administrator: This account owns ${studentCount} student record(s) and ${teacherCount} teacher record(s). Reassign records before deletion.`,
          studentCount,
          teacherCount,
          totalRecords,
          requiresReassignment: true,
        },
        { status: 400 }
      );
    }

    // Validate reassignment target
    const reassignTarget = await db.user.findUnique({
      where: { id: reassignToId },
    });

    if (!reassignTarget || !reassignTarget.isActive) {
      return NextResponse.json(
        { error: 'Invalid reassignment target administrator / স্থানান্তর করার জন্য নির্বাচিত প্রশাসক সঠিক বা সক্রিয় নয়।' },
        { status: 400 }
      );
    }

    if (reassignTarget.id === id) {
      return NextResponse.json(
        { error: 'Cannot reassign records to the administrator being deleted.' },
        { status: 400 }
      );
    }

    // Atomically reassign students & teachers and delete target user
    try {
      await db.$transaction([
        db.student.updateMany({
          where: { createdById: id },
          data: { createdById: reassignTarget.id },
        }),
        db.teacher.updateMany({
          where: { createdById: id },
          data: { createdById: reassignTarget.id },
        }),
        db.user.delete({
          where: { id },
        }),
      ]);

      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'ADMIN_REASSIGN_RECORDS',
        targetId: reassignTarget.id,
        details: `Reassigned ${studentCount} student(s) and ${teacherCount} teacher(s) from @${targetUser.username} to @${reassignTarget.username}`,
        outcome: 'SUCCESS',
      });

      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'ADMIN_DELETE',
        targetId: id,
        details: `Deleted admin @${targetUser.username} after reassigning records`,
        outcome: 'SUCCESS',
      });

      return NextResponse.json({
        success: true,
        message: `প্রশাসক অ্যাকাউন্ট সফলভাবে অপসারণ করা হয়েছে এবং ${studentCount}টি শিক্ষার্থী ও ${teacherCount}টি শিক্ষক রেকর্ড @${reassignTarget.username}-এর কাছে স্থানান্তর করা হয়েছে। / Administrator removed. ${studentCount} student(s) and ${teacherCount} teacher(s) reassigned to @${reassignTarget.username}.`,
        reassignedCount: totalRecords,
      });
    } catch (err: unknown) {
      console.error('[API /api/admin/users/[id] DELETE reassign] Error:', err);
      return NextResponse.json({ error: 'Failed to reassign and delete administrator due to an unexpected server error.' }, { status: 500 });
    }
  }

  // No student or teacher records owned: safe to delete directly
  try {
    await db.user.delete({
      where: { id },
    });

    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'ADMIN_DELETE',
      targetId: id,
      details: `Deleted admin @${targetUser.username} (0 records owned)`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({ success: true, message: 'Administrator account removed successfully.' });
  } catch (err: unknown) {
    console.error('[API /api/admin/users/[id] DELETE] Error:', err);
    return NextResponse.json({ error: 'Failed to delete administrator due to an unexpected server error.' }, { status: 500 });
  }
}
