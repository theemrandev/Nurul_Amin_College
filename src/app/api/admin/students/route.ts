import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { validateStudentInput } from '@/lib/student-validation';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/students
 * List students with search and filters.
 * RBAC:
 * - MAIN_ADMIN: Global visibility of all student records.
 * - ASSISTANT_ADMIN: Isolated visibility limited strictly to records created by this assistant.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.isActive) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in / প্রমাণীকরণ আবশ্যক।' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';
    const studentClass = searchParams.get('studentClass')?.trim() || '';
    const group = searchParams.get('group')?.trim() || '';
    const section = searchParams.get('section')?.trim() || '';

    // Build base where clause
    const where: Prisma.StudentWhereInput = {};

    // Strict Role-Based Visibility Guard
    if (session.role === 'ASSISTANT_ADMIN') {
      where.createdById = session.id;
    }

    // Filter by Class
    if (studentClass) {
      where.studentClass = studentClass;
    }

    // Filter by Group
    if (group) {
      where.group = group;
    }

    // Filter by Section
    if (section) {
      where.section = section;
    }

    // Search query across student name, roll number, and guardian name
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { roll: { contains: search } },
        { guardianName: { contains: search } },
      ];
    }

    const students = await db.student.findMany({
      where,
      orderBy: [
        { studentClass: 'asc' },
        { group: 'asc' },
        { section: 'asc' },
        { roll: 'asc' },
      ],
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

    return NextResponse.json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error('[API /api/admin/students GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve students / শিক্ষার্থী তথ্য লোড করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/students
 * Create a new student record.
 * RBAC:
 * - MAIN_ADMIN & ASSISTANT_ADMIN can create records.
 * - Server strictly sets createdById from the verified session (rejects client override).
 */
export async function POST(request: NextRequest) {
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

    // Check duplicate or conflicting roll number within (studentClass, group, section)
    const existingRoll = await db.student.findFirst({
      where: {
        studentClass: data.studentClass,
        group: data.group,
        section: data.section,
        roll: data.roll,
      },
    });

    if (existingRoll) {
      return NextResponse.json(
        {
          error: `এই শ্রেণি (${data.studentClass}), গ্রুপ (${data.group}) ও শাখায় (${data.section}) রোল '${data.roll}' ইতিমধ্যে বিদ্যমান / Roll number '${data.roll}' already exists in this class, group, and section.`,
          field: 'roll',
        },
        { status: 400 }
      );
    }

    // Create student record with verified server session ownership
    const student = await db.student.create({
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
        createdById: session.id, // Immutable server assignment
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
      action: 'STUDENT_CREATE',
      targetId: student.id,
      details: `Created student roll: ${student.roll}, class: ${student.studentClass}, group: ${student.group}, sec: ${student.section}`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Student record created successfully / শিক্ষার্থীর তথ্য সফলভাবে সংরক্ষিত হয়েছে।',
        student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/admin/students POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create student record / শিক্ষার্থীর তথ্য তৈরি করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}
