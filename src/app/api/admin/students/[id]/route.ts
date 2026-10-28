import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { canViewRecord, canModifyRecord } from '@/lib/rbac';
import { db } from '@/lib/db';
import { validateStudentInput } from '@/lib/student-validation';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/students/[id]
 * View single student record.
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
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const student = await db.student.findUnique({
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

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found / শিক্ষার্থীর রেকর্ড পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based view authorization
    const permission = canViewRecord(session, student.createdById);
    if (!permission.allowed) {
      return NextResponse.json(
        { error: permission.message || 'Access denied / অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error) {
    console.error('[API /api/admin/students/[id] GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve student record' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/students/[id]
 * Update an existing student record.
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
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const existingStudent = await db.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found / শিক্ষার্থীর রেকর্ড পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based modification authorization
    const permission = canModifyRecord(session, existingStudent.createdById);
    if (!permission.allowed) {
      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'STUDENT_UPDATE',
        targetId: id,
        details: `Unauthorized attempt to edit student roll ${existingStudent.roll} owned by ${existingStudent.createdById}`,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: permission.message || 'Forbidden / এই রেকর্ড সম্পাদনার অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    // Validate inputs
    const validation = validateStudentInput(body);
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

    // Check duplicate or conflicting roll number within (studentClass, group, section) excluding current student
    const conflictingStudent = await db.student.findFirst({
      where: {
        studentClass: data.studentClass,
        group: data.group,
        section: data.section,
        roll: data.roll,
        id: { not: existingStudent.id },
      },
    });

    if (conflictingStudent) {
      return NextResponse.json(
        {
          error: `এই শ্রেণি (${data.studentClass}), গ্রুপ (${data.group}) ও শাখায় (${data.section}) রোল '${data.roll}' ইতিমধ্যে অন্য শিক্ষার্থীর জন্য নিবন্ধিত / Roll number '${data.roll}' is already in use by another student in this class, group, and section.`,
          field: 'roll',
        },
        { status: 400 }
      );
    }

    // Strictly update permitted attributes; never modify createdById, id, createdAt
    const updatedStudent = await db.student.update({
      where: { id: existingStudent.id },
      data: {
        name: data.name,
        studentClass: data.studentClass,
        roll: data.roll,
        group: data.group,
        section: data.section,
        personalPhone: data.personalPhone,
        personalEmail: data.personalEmail,
        guardianName: data.guardianName,
        guardianRelationship: data.guardianRelationship,
        guardianPhone: data.guardianPhone,
        guardianEmail: data.guardianEmail,
        homeAddress: data.homeAddress,
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

    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'STUDENT_UPDATE',
      targetId: id,
      details: `Updated student roll: ${updatedStudent.roll}, class: ${updatedStudent.studentClass}, group: ${updatedStudent.group}, sec: ${updatedStudent.section}`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({
      success: true,
      message: 'Student record updated successfully / শিক্ষার্থীর তথ্য সফলভাবে হালনাগাদ হয়েছে।',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('[API /api/admin/students/[id] PUT] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update student record / শিক্ষার্থীর তথ্য হালনাগাদ করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/students/[id]
 * Delete a student record.
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
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const existingStudent = await db.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found / শিক্ষার্থীর রেকর্ড পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Role-based deletion authorization
    const permission = canModifyRecord(session, existingStudent.createdById);
    if (!permission.allowed) {
      await recordAuditLog({
        actorId: session.id,
        actorName: session.name,
        actorRole: session.role,
        action: 'STUDENT_DELETE',
        targetId: id,
        details: `Unauthorized attempt to delete student roll ${existingStudent.roll} owned by ${existingStudent.createdById}`,
        outcome: 'DENIED',
      });

      return NextResponse.json(
        { error: permission.message || 'Forbidden / এই রেকর্ড মুছে ফেলার অনুমতি নেই।' },
        { status: permission.statusCode || 403 }
      );
    }

    await db.student.delete({
      where: { id: existingStudent.id },
    });

    await recordAuditLog({
      actorId: session.id,
      actorName: session.name,
      actorRole: session.role,
      action: 'STUDENT_DELETE',
      targetId: id,
      details: `Deleted student roll: ${existingStudent.roll}, class: ${existingStudent.studentClass}, group: ${existingStudent.group}`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json({
      success: true,
      message: 'Student record deleted successfully / শিক্ষার্থীর রেকর্ড সফলভাবে মুছে ফেলা হয়েছে।',
    });
  } catch (error) {
    console.error('[API /api/admin/students/[id] DELETE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete student record / শিক্ষার্থীর রেকর্ড মুছতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}
