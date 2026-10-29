'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setError('ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন / Please provide both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUser, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
        setIsLoading(false);
        return;
      }

      // Login successful: redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch {
      setError('সার্ভারের সাথে যোগাযোগ করা যায়নি। ইন্টারনেট সংযোগ চেক করুন।');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Link */}
        <div className="mb-6 px-4 sm:px-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল ওয়েবসাইটে ফিরে যান / Return to Website</span>
          </Link>
        </div>

        {/* Institutional Branding */}
        <div className="text-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
            <Image
              src="/images/logo (4).png"
              alt="নুরুল আমিন ডিগ্রি কলেজ প্রাতিষ্ঠানিক প্রতীক"
              fill
              sizes="80px"
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            নুরুল আমিন ডিগ্রি কলেজ
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mt-0.5">
            Nurul Amin Degree College • EIIN: 110882
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] mt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>প্রশাসনিক পোর্টাল / Administrative Portal</span>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="p-6 sm:p-8 border border-[var(--border-strong)] shadow-xl bg-[var(--bg-surface-elevated)]">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Error Message Alert */}
            {error && (
              <div
                className="p-3.5 rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1.5"
              >
                ইউজারনেম / Username
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  placeholder="admin"
                  className="block w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1.5"
              >
                পাসওয়ার্ড / Password
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors disabled:opacity-60"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)] transition-colors disabled:opacity-60 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>যাচাই করা হচ্ছে... / Verifying...</span>
                  </>
                ) : (
                  <span>প্রবেশ করুন / Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-center">
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              নিরাপত্তা নির্দেশনা: এই পোর্টালটি শুধুমাত্র কলেজের অনুমোদিত কর্মকর্তাদের জন্য সংরক্ষিত। সেশন সুরক্ষায় এনক্রিপ্টেড এইচটিটিপি-অনলি কুকি ব্যবহৃত হয়।
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
