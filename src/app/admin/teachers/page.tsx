import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminHeader } from '../AdminHeader';
import { TeacherManager, TeacherRecord } from './TeacherManager';

export const metadata = {
  title: 'শিক্ষক ও কর্মকর্তা ব্যবস্থাপনা | Teacher Management - Nurul Amin Degree College',
  robots: 'noindex, nofollow',
};

export default async function AdminTeachersPage() {
  const session = await getSession();

  if (!session || !session.isActive) {
    redirect('/admin/login');
  }

  const rawTeachers = await db.teacher.findMany({
    where: session.role === 'ASSISTANT_ADMIN' ? { createdById: session.id } : {},
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

  const initialTeachers: TeacherRecord[] = rawTeachers.map((t) => ({
    ...t,
    rank: t.rank as TeacherRecord['rank'],
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col transition-colors">
      <AdminHeader user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <TeacherManager currentUser={session} initialTeachers={initialTeachers} />
      </main>
    </div>
  );
}
