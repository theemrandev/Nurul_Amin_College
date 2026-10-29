'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldCheck, ArrowLeft, UserCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import type { SessionUser } from '@/lib/auth';

interface AdminHeaderProps {
  user: SessionUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const isMainAdmin = user.role === 'MAIN_ADMIN';

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="/images/logo (4).png"
                  alt="নুরুল আমিন ডিগ্রি কলেজ"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base text-[var(--color-primary)] dark:text-[var(--color-primary-light)] block leading-tight">
                  নুরুল আমিন ডিগ্রি কলেজ
                </span>
                <span className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium block leading-tight">
                  প্রশাসনিক ড্যাশবোর্ড / Admin Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Right: User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Role Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                isMainAdmin
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isMainAdmin ? 'Main Admin (মেইন অ্যাডমিন)' : 'Assistant Admin (সহকারী)'}</span>
            </span>

            {/* User Name */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium border-l border-[var(--border-subtle)] pl-3">
              <UserCircle className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="font-semibold text-[var(--text-primary)]">{user.name}</span>
              <span className="text-[var(--text-muted)]">(@{user.username})</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle size="sm" />

            {/* Website Link */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[var(--border-strong)] bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors min-h-[34px]"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ওয়েবসাইট</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900 transition-colors min-h-[34px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              aria-label="Logout from Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট / Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
