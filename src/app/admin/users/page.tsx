import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminHeader } from '../AdminHeader';
import { UsersManager } from './UsersManager';
import { ArrowLeft, UserPlus } from 'lucide-react';

export const metadata = {
  title: 'অ্যাডমিন অ্যাকাউন্ট ব্যবস্থাপনা | Manage Admins - Nurul Amin Degree College',
  robots: 'noindex, nofollow',
};

export default async function AdminUsersPage() {
  const session = await getSession();

  // Strict Server-Side Guard: Only Main Admin can access user management
  if (!session) {
    redirect('/admin/login');
  }

  if (session.role !== 'MAIN_ADMIN') {
    redirect('/admin');
  }

  // Fetch initial users from database
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

  const serializedUsers = users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col transition-colors">
      <AdminHeader user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ড্যাশবোর্ডে ফিরে যান / Return to Dashboard</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            অ্যাডমিনিস্ট্রেটর অ্যাকাউন্ট ব্যবস্থাপনা / Administrator Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            মেইন অ্যাডমিন প্যানেল: সহকারী অ্যাডমিনদের তালিকা, অ্যাকাউন্ট তৈরি ও সক্রিয়তা নিয়ন্ত্রণ।
          </p>
        </div>

        {/* Client-Side Interactive Manager */}
        <UsersManager initialUsers={serializedUsers} currentUserId={session.id} />
      </main>
    </div>
  );
}
