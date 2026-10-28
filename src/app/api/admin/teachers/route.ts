import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { validateTeacherInput } from '@/lib/teacher-validation';
import { validateOrigin } from '@/lib/origin-check';
import { recordAuditLog } from '@/lib/audit';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/teachers
 * List teachers with search, rank, and department filters.
 * RBAC:
 * - MAIN_ADMIN: Global visibility of all teacher records.
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
    const rank = searchParams.get('rank')?.trim() || '';
    const department = searchParams.get('department')?.trim() || '';

    // Build base where clause
    const where: Prisma.TeacherWhereInput = {};

    // Strict Role-Based Visibility Guard
    if (session.role === 'ASSISTANT_ADMIN') {
      where.createdById = session.id;
    }

    // Filter by Rank
    if (rank) {
      where.rank = rank;
    }

    // Filter by Department
    if (department) {
      where.OR = [
        { departmentEn: { equals: department } },
        { departmentBn: { equals: department } },
      ];
    }

    // Search query across name (BN & EN), designation, email, and department
    if (search) {
      const searchConditions: Prisma.TeacherWhereInput[] = [
        { nameBn: { contains: search } },
        { nameEn: { contains: search } },
        { designationBn: { contains: search } },
        { designationEn: { contains: search } },
        { email: { contains: search } },
        { departmentEn: { contains: search } },
      ];

      if (where.OR) {
        where.AND = [
          { OR: where.OR },
          { OR: searchConditions },
        ];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    const teachers = await db.teacher.findMany({
      where,
      orderBy: [
        { createdAt: 'desc' },
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
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    console.error('[API /api/admin/teachers GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve teachers / শিক্ষকের তথ্য লোড করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/teachers
 * Create a new teacher record.
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

    // Duplicate Check 1: Unique email check if email is provided
    if (data.email) {
      const existingEmail = await db.teacher.findFirst({
        where: { email: data.email },
      });
      if (existingEmail) {
        return NextResponse.json(
          {
            error: `এই ইমেইল '${data.email}' ইতিমধ্যে অন্য একজন শিক্ষকের জন্য সংরক্ষিত রয়েছে / Email '${data.email}' is already registered for another teacher.`,
            field: 'email',
          },
          { status: 400 }
        );
      }
    }

    // Duplicate Check 2: Name + Designation duplicate check to avoid accidental duplicates
    const existingTeacher = await db.teacher.findFirst({
      where: {
        nameEn: data.nameEn,
        designationEn: data.designationEn,
      },
    });

    if (existingTeacher) {
      return NextResponse.json(
        {
          error: `অনুরূপ নামের ও পদবির শিক্ষক (${data.nameEn} - ${data.designationEn}) ইতিমধ্যে বিদ্যমান / A teacher with the same name and designation already exists.`,
          field: 'nameEn',
        },
        { status: 400 }
      );
    }

    // Create teacher record with verified server session ownership
    const teacher = await db.teacher.create({
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
      action: 'TEACHER_CREATE',
      targetId: teacher.id,
      details: `Created teacher: ${teacher.nameEn} (${teacher.designationEn}, ${teacher.rank})`,
      outcome: 'SUCCESS',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Teacher record created successfully / শিক্ষকের তথ্য সফলভাবে সংরক্ষিত হয়েছে।',
        teacher,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/admin/teachers POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create teacher record / শিক্ষকের তথ্য তৈরি করতে ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}
