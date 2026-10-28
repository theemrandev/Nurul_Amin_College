'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Power,
} from 'lucide-react';

interface SerializedUser {
  id: string;
  name: string;
  username: string;
  email: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersManagerProps {
  initialUsers: SerializedUser[];
  currentUserId: string;
}

export function UsersManager({ initialUsers, currentUserId }: UsersManagerProps) {
  const [users, setUsers] = useState<SerializedUser[]>(initialUsers);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim().toLowerCase(),
          email: email.trim() || undefined,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFeedback({ type: 'error', message: data.error || 'অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।' });
        setIsSubmitting(false);
        return;
      }

      setUsers((prev) => [...prev, data.user]);
      setFeedback({ type: 'success', message: `সহকারী অ্যাডমিন "${data.user.name}" সফলভাবে যুক্ত হয়েছে!` });
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setIsCreating(false);
    } catch {
      setFeedback({ type: 'error', message: 'সার্ভার সংযোগে ত্রুটি দেখা দিয়েছে।' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (user: SerializedUser) => {
    if (user.role === 'MAIN_ADMIN') {
      alert('মেইন অ্যাডমিন অ্যাকাউন্ট নিষ্ক্রিয় করা যাবে না।');
      return;
    }

    const newStatus = !user.isActive;
    const confirmMsg = newStatus
      ? `আপনি কি "${user.name}" অ্যাকাউন্টটি সক্রিয় করতে চান?`
      : `আপনি কি "${user.name}" অ্যাকাউন্টটি নিষ্ক্রিয় করতে চান? নিষ্ক্রিয় অ্যাকাউন্ট লগইন করতে পারবে না।`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFeedback({ type: 'error', message: data.error || 'স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে।' });
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: newStatus } : u))
      );
      setFeedback({
        type: 'success',
        message: `অ্যাকাউন্ট "${user.name}" ${newStatus ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে।`,
      });
    } catch {
      setFeedback({ type: 'error', message: 'সার্ভার সংযোগে ত্রুটি।' });
    }
  };

  const handleDeleteUser = async (user: SerializedUser) => {
    if (user.role === 'MAIN_ADMIN') {
      alert('মেইন অ্যাডমিন অ্যাকাউন্ট মুছে ফেলা যাবে না।');
      return;
    }

    if (!window.confirm(`সতর্কতা: আপনি কি নিশ্চিত যে আপনি সহকারী অ্যাডমিন "${user.name}" স্থায়ীভাবে মুছে ফেলতে চান?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.requiresReassignment) {
          const confirmReassign = window.confirm(
            `${data.error}\n\nআপনি কি এই প্রশাসকের সমস্ত রেকর্ড (শিক্ষার্থী ও শিক্ষক) আপনার (মেইন অ্যাডমিন) অ্যাকাউন্টে স্থানান্তর করে এই অ্যাকাউন্টটি মুছে ফেলতে চান?\nDo you want to reassign all ${data.totalRecords || data.studentCount} record(s) to your account and proceed with deletion?`
          );
          if (confirmReassign) {
            const reassignRes = await fetch(`/api/admin/users/${user.id}?reassignToId=${currentUserId}`, {
              method: 'DELETE',
            });
            const reassignData = await reassignRes.json().catch(() => ({}));
            if (reassignRes.ok) {
              setUsers((prev) => prev.filter((u) => u.id !== user.id));
              setFeedback({
                type: 'success',
                message: reassignData.message || 'রেকর্ড স্থানান্তর ও অ্যাকাউন্ট অপসারণ সফল হয়েছে।',
              });
              return;
            } else {
              setFeedback({
                type: 'error',
                message: reassignData.error || 'স্থানান্তর প্রক্রিয়া ব্যর্থ হয়েছে।',
              });
              return;
            }
          }
        }
        setFeedback({ type: 'error', message: data.error || 'অপসারণ ব্যর্থ হয়েছে।' });
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setFeedback({ type: 'success', message: `সহকারী অ্যাডমিন "${user.name}" মুছে ফেলা হয়েছে।` });
    } catch {
      setFeedback({ type: 'error', message: 'সার্ভার সংযোগে ত্রুটি।' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
          নিবন্ধিত প্রশাসকবৃন্দ ({users.length})
        </h2>

        <button
          type="button"
          onClick={() => {
            setIsCreating(!isCreating);
            setFeedback(null);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isCreating ? 'ফর্ম বন্ধ করুন' : 'নতুন সহকারী অ্যাডমিন যোগ করুন'}</span>
        </button>
      </div>

      {/* Create Assistant Admin Form */}
      {isCreating && (
        <Card className="p-6 border-2 border-[var(--color-primary)] bg-[var(--bg-surface-elevated)] shadow-md animate-in fade-in">
          <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] mb-4">
            নতুন সহকারী অ্যাডমিন নিবন্ধন / Register Assistant Admin
          </h3>

          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                পূর্ণ নাম / Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: মো: রফিকুল ইসলাম"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                ইউজারনেম / Username *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="যেমন: rofiq_admin"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                অফিসিয়াল ইমেইল / Email (ঐচ্ছিক)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rofiq@nurulamincollege.edu.bd"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                পাসওয়ার্ড / Password (কমপক্ষে ৮ অক্ষর) *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-lg transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>সংরক্ষণ করা হচ্ছে...</span>
                  </>
                ) : (
                  <span>সংরক্ষণ করুন / Save Assistant Admin</span>
                )}
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Users Table */}
      <Card className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Administrator Accounts">
            <thead>
              <tr className="bg-[var(--bg-muted)] border-b border-[var(--border-subtle)] text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <th className="py-3 px-4">নাম ও পরিচয়</th>
                <th className="py-3 px-4">ইউজারনেম</th>
                <th className="py-3 px-4">দায়িত্ব (Role)</th>
                <th className="py-3 px-4">অবস্থা (Status)</th>
                <th className="py-3 px-4 text-right">কার্যক্রম (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-xs sm:text-sm">
              {users.map((user) => {
                const isMainAdmin = user.role === 'MAIN_ADMIN';
                const isCurrentUser = user.id === currentUserId;

                return (
                  <tr key={user.id} className="hover:bg-[var(--bg-muted)]/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">
                      <div>
                        <span>{user.name}</span>
                        {user.email && (
                          <span className="block text-[11px] font-normal text-[var(--text-muted)]">
                            {user.email}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[var(--text-secondary)]">
                      @{user.username}
                    </td>

                    <td className="py-3 px-4">
                      {isMainAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Main Admin</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          <span>Assistant Admin</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {user.isActive ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>সক্রিয় (Active)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold text-xs">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>নিষ্ক্রিয় (Inactive)</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isMainAdmin ? (
                        <span className="text-[11px] font-semibold text-[var(--text-muted)] italic">
                          সুরক্ষিত একাউন্ট
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle Active Status */}
                          <button
                            type="button"
                            onClick={() => handleToggleActive(user)}
                            className={`p-1.5 rounded-md border text-xs font-semibold transition-colors ${
                              user.isActive
                                ? 'border-amber-300 hover:bg-amber-50 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                                : 'border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                            }`}
                            title={user.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Assistant Admin */}
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 rounded-md border border-rose-300 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-700 dark:text-rose-300 transition-colors"
                            title="মুছে ফেলুন / Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
