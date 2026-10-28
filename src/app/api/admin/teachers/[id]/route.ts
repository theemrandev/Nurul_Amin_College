import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { canViewRecord, canModifyRecord } from '@/lib/rbac';
import { db } from '@/lib/db';
import { validateTeacherInput } from '@/lib/teacher-validation';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/teachers/[id]
 * View single teacher record.
 * RBAC:
 * - MAIN_ADMIN: Global visibility.
 * - ASSISTANT_ADMIN: Only records created by the authenticated assistant.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session || !session.isActive) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in / প্রমাণীকরণ আবশ্যক।' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    const teacher = await db.teacher.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found / শিক্ষকের রেকর্ড পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based view authorization
    const permission = canViewRecord(session, teacher.createdById);
    if (!permission.allowed) {
      return NextResponse.json(
        { error: permission.message || 'Access denied / অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    return NextResponse.json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error('[API /api/admin/teachers/[id] GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve teacher record' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/teachers/[id]
 * Update an existing teacher record.
 * RBAC:
 * - MAIN_ADMIN: Full editing authority.
 * - ASSISTANT_ADMIN: Can only edit records created by themselves.
 * - Ownership & timestamps are protected from modification (no mass-assignment).
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  // Origin validation for state-changing requests
  const originCheck = validateOrigin(request);
  if (!originCheck.valid) {
    return NextResponse.json(
      { error: originCheck.reason || 'Cross-origin request rejected / অবৈধ ক্রস-অরিজিন অনুরোধ।' },
      { status: 403 }
    );
  }

  try {
    const session = await getSession();
    if (!session || !session.isActive) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in / প্রমাণীকরণ আবশ্যক।' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    const existingTeacher = await db.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher record not found / শিক্ষকের তথ্য পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based modification authorization
    const permission = canModifyRecord(session, existingTeacher.createdById);
    if (!permission.allowed) {
      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'TEACHER_UPDATE',
        targetId: id,
        details: `Unauthorized attempt to modify teacher: ${existingTeacher.nameEn}`,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: permission.message || 'Permission denied / আপনার এই রেকর্ড পরিবর্তনের অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload / অনুরোধের তথ্য সঠিক নয়।' },
        { status: 400 }
      );
    }

    // Server-side validation
    const validation = validateTeacherInput(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          error: 'Validation failed / তথ্যের সঠিকতা যাচাই ব্যর্থ হয়েছে।',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check duplicate email for another teacher
    if (data.email) {
      const emailConflict = await db.teacher.findFirst({
        where: {
          email: data.email,
          id: { not: id },
        },
      });

      if (emailConflict) {
        return NextResponse.json(
          {
            error: `এই ইমেইল '${data.email}' ইতিমধ্যে অন্য একজন শিক্ষকের জন্য সংরক্ষিত রয়েছে / Email '${data.email}' is already in use by another teacher.`,
            field: 'email',
          },
          { status: 400 }
        );
      }
    }

    // Check duplicate nameEn + designationEn for another teacher
    const nameConflict = await db.teacher.findFirst({
      where: {
        nameEn: data.nameEn,
        designationEn: data.designationEn,
        id: { not: id },
      },
    });

    if (nameConflict) {
      return NextResponse.json(
        {
          error: `অনুরূপ নামের ও পদবির অন্য একজন শিক্ষক ইতিমধ্যে বিদ্যমান / Another teacher with this name and designation already exists.`,
          field: 'nameEn',
        },
        { status: 400 }
      );
    }

    // Update teacher record - strictly whitelist fields to prevent mass-assignment
    const updatedTeacher = await db.teacher.update({
      where: { id },
      data: {
        nameBn: data.nameBn,
        nameEn: data.nameEn,
        designationBn: data.designationBn,
        designationEn: data.designationEn,
        departmentBn: data.departmentBn,
        departmentEn: data.departmentEn,
        rank: data.rank,
        email: data.email,
        phone: data.phone,
        photoUrl: data.photoUrl,
        specialNote: data.specialNote,
        // createdById is intentionally NOT modified to protect record ownership
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });

    // Record non-sensitive audit entry
    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'TEACHER_UPDATE',
      targetId: updatedTeacher.id,
      details: `Updated teacher: ${updatedTeacher.nameEn} (${updatedTeacher.designationEn})`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({
      success: true,
      message: 'Teacher record updated successfully / শিক্ষকের তথ্য সফলভাবে হালনাগাদ করা হয়েছে।',
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error('[API /api/admin/teachers/[id] PUT] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update teacher record / শিক্ষকের তথ্য হালনাগাদ করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/teachers/[id]
 * Remove an existing teacher record.
 * RBAC:
 * - MAIN_ADMIN: Global deletion authority.
 * - ASSISTANT_ADMIN: Can only delete records created by themselves.
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  // Origin validation for state-changing requests
  const originCheck = validateOrigin(request);
  if (!originCheck.valid) {
    return NextResponse.json(
      { error: originCheck.reason || 'Cross-origin request rejected / অবৈধ ক্রস-অরিজিন অনুরোধ।' },
      { status: 403 }
    );
  }

  try {
    const session = await getSession();
    if (!session || !session.isActive) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in / প্রমাণীকরণ আবশ্যক।' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    const existingTeacher = await db.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher record not found / শিক্ষকের তথ্য পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based modification authorization
    const permission = canModifyRecord(session, existingTeacher.createdById);
    if (!permission.allowed) {
      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'TEACHER_DELETE',
        targetId: id,
        details: `Unauthorized attempt to delete teacher: ${existingTeacher.nameEn}`,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: permission.message || 'Permission denied / আপনার এই রেকর্ড মুছে ফেলার অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    await db.teacher.delete({
      where: { id },
    });

    // Record non-sensitive audit entry
    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'TEACHER_DELETE',
      targetId: id,
      details: `Deleted teacher: ${existingTeacher.nameEn} (${existingTeacher.designationEn})`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({
      success: true,
      message: 'Teacher record deleted successfully / শিক্ষকের তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
    });
  } catch (error) {
    console.error('[API /api/admin/teachers/[id] DELETE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete teacher record / শিক্ষকের তথ্য মুছে ফেলতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}
