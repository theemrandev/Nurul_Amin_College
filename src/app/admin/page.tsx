import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminHeader } from './AdminHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  GraduationCap,
  Users,
  UserCog,
  ShieldAlert,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  Lock,
} from 'lucide-react';

export const metadata = {
  title: 'প্রশাসনিক ড্যাশবোর্ড | Admin Dashboard - Nurul Amin Degree College',
  robots: 'noindex, nofollow',
};

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const isMainAdmin = session.role === 'MAIN_ADMIN';

  // Query student & teacher counts with role-based scoping
  const studentCount = isMainAdmin
    ? await db.student.count()
    : await db.student.count({ where: { createdById: session.id } });

  const teacherCount = isMainAdmin
    ? await db.teacher.count()
    : await db.teacher.count({ where: { createdById: session.id } });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col transition-colors">
      <AdminHeader user={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#0a2240] to-[#0f3460] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
              <Lock className="w-3.5 h-3.5" />
              <span>নিরাপদ প্রশাসনিক সেশন / Authenticated Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              স্বাগতম, {session.name}
            </h1>
            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              নুরুল আমিন ডিগ্রি কলেজ প্রশাসনিক পোর্টাল। আপনার বর্তমান দায়িত্ব:{' '}
              <strong className="text-amber-300">
                {isMainAdmin ? 'Main Administrator (প্রধান নিয়ন্ত্রক)' : 'Assistant Administrator (সহকারী নিয়ন্ত্রক)'}
              </strong>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Database className="w-72 h-72 text-white" />
          </div>
        </div>

        {/* System Architecture & Status Card */}
        <div className="p-4 sm:p-5 rounded-xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              পর্যায় ৪ সক্রিয় (Phase 4 Active): শিক্ষার্থী ও শিক্ষক ব্যবস্থাপনা (Student & Teacher Management)
            </p>
            <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed text-xs">
              শিক্ষার্থী ও শিক্ষক তথ্য সংযোজন, অনুসন্ধান, ফিল্টারিং, সম্পাদন ও অপসারণের পূর্ণাঙ্গ ব্যবস্থাপনা সক্রিয়। সহকারী প্রশাসকদের রেকর্ড আইসোলেশন, সার্ভার-সাইড আরবাক ও অডিট ট্রেইল সুরক্ষিত।
            </p>
          </div>
        </div>

        {/* Administrative Modules Grid */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] mb-4">
            প্রশাসনিক মডিউলসমূহ / Administrative Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MODULE 1: Student Management (Phase 3 Active) */}
            <Card className="p-6 border border-blue-200 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/20 flex flex-col justify-between hover:border-[var(--color-primary)] transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Badge variant="verified" size="sm">
                    পর্যায় ৩ • সক্রিয় (Active)
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    শিক্ষার্থী ব্যবস্থাপনা / Student Management
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                    শিক্ষার্থীদের নাম, শ্রেণি, রোল, গ্রুপ, বিভাগ, অভিভাবকের তথ্য এবং যোগাযোগের তথ্যাদি সংযোজন, অনুসন্ধান, সম্পাদন ও অপসারণের পূর্ণাঙ্গ ব্যবস্থাপনা।
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold">
                    <span>সংরক্ষিত রেকর্ড: {studentCount} টি</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)] mt-4">
                <Link
                  href="/admin/students"
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline"
                >
                  <span>ম্যানেজমেন্টে প্রবেশ করুন / Access Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* MODULE 2: Teacher Management (Phase 4 Active) */}
            <Card className="p-6 border border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20 flex flex-col justify-between hover:border-emerald-600 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge variant="verified" size="sm">
                    পর্যায় ৪ • সক্রিয় (Active)
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    শিক্ষক ও কর্মকর্তা ব্যবস্থাপনা / Faculty Directory
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                    কলেজের শিক্ষক ও কর্মচারীদের প্রাতিষ্ঠানিক তথ্য, পদবি, বিষয়, সরকারি ইমেইল ও মোবাইল নম্বর পরিচালনা।
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <span>সংরক্ষিত রেকর্ড: {teacherCount} টি</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)] mt-4">
                <Link
                  href="/admin/teachers"
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>ম্যানেজমেন্টে প্রবেশ করুন / Access Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* MODULE 3: Administrator Management (Main Admin ONLY) */}
            {isMainAdmin ? (
              <Card className="p-6 border-2 border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center">
                      <UserCog className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                      সক্রিয় • শুধুমাত্র মেইন অ্যাডমিন
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      অ্যাডমিন ব্যবস্থাপনা / Admin Accounts
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                      সহকারী অ্যাডমিন (Assistant Admin) অ্যাকাউন্ট তৈরি ও সক্রিয়/নিষ্ক্রিয়করণ পরিচালনা করুন।
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-amber-200 dark:border-amber-900 mt-4">
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-amber-900 dark:text-amber-300 hover:underline"
                  >
                    <span>অ্যাকাউন্টসমূহ পরিচালনা করুন / Manage Users</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ) : (
              <Card className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-muted)]/50 opacity-60 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                      <UserCog className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" size="sm">
                      সংরক্ষিত
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-muted)]">
                      অ্যাডমিন অ্যাকাউন্ট ব্যবস্থাপনা
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                      এই মডিউলটি শুধুমাত্র মেইন অ্যাডমিন অ্যাকাউন্টের জন্য সংরক্ষিত।
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border-subtle)] mt-4">
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    শুধুমাত্র Main Admin প্রবেশযোগ্য
                  </span>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Public Notice Management Reference */}
        <Card className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Info className="w-4 h-4 text-[var(--color-primary)]" />
              <span>পাবলিক ওয়েবসাইট সংযোগ / Public Website Integration</span>
            </h3>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline"
            >
              <span>ওয়েবসাইট দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            সাধারণ দর্শনার্থীদের জন্য পাবলিক কলেজ ওয়েবসাইট পূর্ণাঙ্গভাবে উন্মুক্ত রয়েছে। এই প্রশাসনিক পোর্টালটি শুধুমাত্র অনুমোদিত নিয়ন্ত্রকদের জন্য সংরক্ষিত।
          </p>
        </Card>
      </main>
    </div>
  );
}
