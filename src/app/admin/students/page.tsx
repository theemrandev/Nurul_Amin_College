import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminHeader } from '../AdminHeader';
import { StudentManager, StudentRecord } from './StudentManager';

export const metadata = {
  title: 'শিক্ষার্থী ব্যবস্থাপনা | Student Management - Nurul Amin Degree College',
  robots: 'noindex, nofollow',
};

export default async function AdminStudentsPage() {
  const session = await getSession();

  if (!session || !session.isActive) {
    redirect('/admin/login');
  }

  const rawStudents = await db.student.findMany({
    where: session.role === 'ASSISTANT_ADMIN' ? { createdById: session.id } : {},
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

  const initialStudents: StudentRecord[] = rawStudents.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    guardianRelationship: s.guardianRelationship as 'Father' | 'Mother',
  }));

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col transition-colors">
      <AdminHeader user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <StudentManager currentUser={session} initialStudents={initialStudents} />
      </main>
    </div>
  );
}
