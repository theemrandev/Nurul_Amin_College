'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SessionUser } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  Phone,
  Mail,
  ArrowLeft,
  RotateCw,
  Building2,
  Award,
  Calendar,
  Lock,
} from 'lucide-react';

export interface TeacherRecord {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  departmentBn: string | null;
  departmentEn: string | null;
  rank: 'vice-principal' | 'assistant-professor' | 'lecturer' | 'staff' | 'other';
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  specialNote: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
}

interface TeacherManagerProps {
  currentUser: SessionUser;
  initialTeachers?: TeacherRecord[];
}

export const RANK_OPTIONS: { value: TeacherRecord['rank']; labelBn: string; labelEn: string }[] = [
  { value: 'vice-principal', labelBn: 'উপাধ্যক্ষ (Vice Principal)', labelEn: 'Vice Principal' },
  { value: 'assistant-professor', labelBn: 'সহকারী অধ্যাপক (Assistant Professor)', labelEn: 'Assistant Professor' },
  { value: 'lecturer', labelBn: 'প্রভাষক (Lecturer)', labelEn: 'Lecturer' },
  { value: 'staff', labelBn: 'কর্মকর্তা/কর্মচারী (Staff)', labelEn: 'Staff' },
  { value: 'other', labelBn: 'অন্যান্য (Other)', labelEn: 'Other' },
];

export const DEPARTMENT_OPTIONS: { bn: string; en: string }[] = [
  { bn: 'বাংলা', en: 'Bangla' },
  { bn: 'ইংরেজি', en: 'English' },
  { bn: 'অর্থনীতি', en: 'Economics' },
  { bn: 'রাষ্ট্রবিজ্ঞান', en: 'Political Science' },
  { bn: 'দর্শন', en: 'Philosophy' },
  { bn: 'ইতিহাস', en: 'History' },
  { bn: 'ইসলামের ইতিহাস ও সংস্কৃতি', en: 'Islamic History & Culture' },
  { bn: 'পদার্থবিজ্ঞান', en: 'Physics' },
  { bn: 'রসায়ন', en: 'Chemistry' },
  { bn: 'গণিত', en: 'Mathematics' },
  { bn: 'জীববিজ্ঞান/উদ্ভিদবিজ্ঞান/প্রাণিবিজ্ঞান', en: 'Biology' },
  { bn: 'হিসাববিজ্ঞান', en: 'Accounting' },
  { bn: 'ব্যবস্থাপনা', en: 'Management' },
  { bn: 'আইসিটি', en: 'ICT' },
  { bn: 'সাধারণ প্রশাসন', en: 'General Administration' },
];

interface FormData {
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  departmentBn: string;
  departmentEn: string;
  rank: TeacherRecord['rank'];
  email: string;
  phone: string;
  photoUrl: string;
  specialNote: string;
}

const INITIAL_FORM_DATA: FormData = {
  nameBn: '',
  nameEn: '',
  designationBn: '',
  designationEn: '',
  departmentBn: '',
  departmentEn: '',
  rank: 'lecturer',
  email: '',
  phone: '',
  photoUrl: '',
  specialNote: '',
};

export function TeacherManager({ currentUser, initialTeachers = [] }: TeacherManagerProps) {
  const [teachers, setTeachers] = useState<TeacherRecord[]>(initialTeachers);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Active items
  const [activeTeacher, setActiveTeacher] = useState<TeacherRecord | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Feedback banner
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isMainAdmin = currentUser.role === 'MAIN_ADMIN';

  // Fetch teachers from API
  const fetchTeachers = useCallback(async () => {
    try {
      setRefreshing(true);
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (rankFilter) params.set('rank', rankFilter);
      if (departmentFilter) params.set('department', departmentFilter);

      const res = await fetch(`/api/admin/teachers?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to load teachers');
      }
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch {
      setFeedback({
        type: 'error',
        message: 'শিক্ষক তথ্য লোড করতে ব্যর্থ হয়েছে / Failed to load teacher records.',
      });
    } finally {
      setRefreshing(false);
    }
  }, [searchTerm, rankFilter, departmentFilter]);

  // Handle live search / filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTeachers();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchTeachers]);

  // Dismiss feedback automatically
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData(INITIAL_FORM_DATA);
    setFormErrors({});
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (teacher: TeacherRecord) => {
    setActiveTeacher(teacher);
    setFormData({
      nameBn: teacher.nameBn,
      nameEn: teacher.nameEn,
      designationBn: teacher.designationBn,
      designationEn: teacher.designationEn,
      departmentBn: teacher.departmentBn || '',
      departmentEn: teacher.departmentEn || '',
      rank: teacher.rank,
      email: teacher.email || '',
      phone: teacher.phone || '',
      photoUrl: teacher.photoUrl || '',
      specialNote: teacher.specialNote || '',
    });
    setFormErrors({});
    setIsEditOpen(true);
  };

  // Open View Modal
  const handleOpenView = (teacher: TeacherRecord) => {
    setActiveTeacher(teacher);
    setIsViewOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (teacher: TeacherRecord) => {
    setActiveTeacher(teacher);
    setIsDeleteOpen(true);
  };

  // Client-side quick validation before submission
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.nameBn.trim()) {
      errs.nameBn = 'শিক্ষকের বাংলা নাম আবশ্যক / Bengali name is required.';
    }
    if (!formData.nameEn.trim()) {
      errs.nameEn = 'শিক্ষকের ইংরেজি নাম আবশ্যক / English name is required.';
    }
    if (!formData.designationBn.trim()) {
      errs.designationBn = 'বাংলা পদবি আবশ্যক / Bengali designation is required.';
    }
    if (!formData.designationEn.trim()) {
      errs.designationEn = 'ইংরেজি পদবি আবশ্যক / English designation is required.';
    }
    if (formData.email.trim() && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      errs.email = 'সঠিক ইমেইল ঠিকানা লিখুন / Valid email address required.';
    }
    if (formData.phone.trim() && !/^(\+?880|0)?1[3-9]\d{8}$|^(\+?[0-9]{10,15})$/.test(formData.phone.trim())) {
      errs.phone = 'সঠিক ফোন নম্বর প্রদান করুন / Valid phone number required.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Create
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setFormSubmitting(true);
      const res = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          setFormErrors(data.details);
        } else {
          setFeedback({
            type: 'error',
            message: data.error || 'শিক্ষকের তথ্য সংরক্ষণ ব্যর্থ হয়েছে / Failed to create teacher.',
          });
        }
        return;
      }

      setFeedback({
        type: 'success',
        message: 'শিক্ষকের তথ্য সফলভাবে তৈরি ও সংরক্ষিত হয়েছে / Teacher record created successfully.',
      });
      setIsCreateOpen(false);
      fetchTeachers();
    } catch {
      setFeedback({
        type: 'error',
        message: 'সার্ভারের সাথে যোগাযোগে ত্রুটি ঘটেছে / Server communication error.',
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Submit Edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTeacher || !validateForm()) return;

    try {
      setFormSubmitting(true);
      const res = await fetch(`/api/admin/teachers/${activeTeacher.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          setFormErrors(data.details);
        } else {
          setFeedback({
            type: 'error',
            message: data.error || 'শিক্ষকের তথ্য হালনাগাদ ব্যর্থ হয়েছে / Failed to update teacher.',
          });
        }
        return;
      }

      setFeedback({
        type: 'success',
        message: 'শিক্ষকের তথ্য সফলভাবে হালনাগাদ করা হয়েছে / Teacher record updated successfully.',
      });
      setIsEditOpen(false);
      fetchTeachers();
    } catch {
      setFeedback({
        type: 'error',
        message: 'সার্ভারের সাথে যোগাযোগে ত্রুটি ঘটেছে / Server communication error.',
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Submit Delete
  const handleDeleteSubmit = async () => {
    if (!activeTeacher) return;

    try {
      setFormSubmitting(true);
      const res = await fetch(`/api/admin/teachers/${activeTeacher.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({
          type: 'error',
          message: data.error || 'শিক্ষকের তথ্য অপসারণ ব্যর্থ হয়েছে / Failed to delete teacher.',
        });
        return;
      }

      setFeedback({
        type: 'success',
        message: 'শিক্ষকের তথ্য সফলভাবে অপসারণ করা হয়েছে / Teacher record deleted successfully.',
      });
      setIsDeleteOpen(false);
      fetchTeachers();
    } catch {
      setFeedback({
        type: 'error',
        message: 'সার্ভারের সাথে যোগাযোগে ত্রুটি ঘটেছে / Server communication error.',
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Check if current user can edit/delete this record
  const canModify = (teacher: TeacherRecord): boolean => {
    if (isMainAdmin) return true;
    return teacher.createdById === currentUser.id;
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
            <Link href="/admin" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ড্যাশবোর্ড / Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">শিক্ষক ব্যবস্থাপনা / Faculty</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] flex items-center gap-2.5">
            <Users className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>শিক্ষক ও কর্মকর্তা ব্যবস্থাপনা / Faculty Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            {isMainAdmin
              ? 'সার্বজনীন অধিকার: সকল শিক্ষকের তথ্য সংযোজন, সম্পাদন, অনুসন্ধান ও অপসারণ পরিচালনা করুন।'
              : 'সহকারী নিয়ন্ত্রক: আপনার তৈরিকৃত শিক্ষক রেকর্ডসমূহ পরিচালনা ও নতুন রেকর্ড সংযোজন করুন।'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTeachers}
            disabled={refreshing}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:bg-[var(--border-subtle)] transition flex items-center gap-1.5"
            title="রিফ্রেশ করুন / Refresh"
          >
            <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">রিফ্রেশ / Refresh</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন শিক্ষক যোগ করুন / Add Teacher</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-start justify-between gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 border border-red-300 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p className="font-semibold leading-relaxed">{feedback.message}</p>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <Card className="p-4 sm:p-5 border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম, পদবি, ইমেইল বা বিষয় দিয়ে অনুসন্ধান করুন... / Search..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Rank Filter */}
          <div className="relative">
            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">সকল পদমর্যাদা / All Ranks</option>
              {RANK_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.labelBn}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">সকল বিভাগ / All Departments</option>
              {DEPARTMENT_OPTIONS.map((d) => (
                <option key={d.en} value={d.en}>
                  {d.bn} ({d.en})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count summary bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div>
            মোট শিক্ষক রেকর্ড: <strong className="text-[var(--text-primary)]">{teachers.length}</strong> টি
            {isMainAdmin && ' (সার্বজনীন ভিউ)'}
          </div>
          {(searchTerm || rankFilter || departmentFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setRankFilter('');
                setDepartmentFilter('');
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              ফিল্টার রিসেট / Clear Filters
            </button>
          )}
        </div>
      </Card>

      {/* Teachers Directory Content */}
      {teachers.length === 0 ? (
        <Card className="p-12 text-center border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Users className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            কোনো শিক্ষক রেকর্ড পাওয়া যায়নি / No Teacher Records Found
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto">
            {searchTerm || rankFilter || departmentFilter
              ? 'আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো শিক্ষকের তথ্য পাওয়া যায়নি।'
              : 'বর্তমানে কোনো শিক্ষকের রেকর্ড যুক্ত করা হয়নি। নতুন শিক্ষক যোগ করতে উপরের বাটনে ক্লিক করুন।'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন শিক্ষক যোগ করুন / Add First Teacher</span>
          </button>
        </Card>
      ) : (
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] font-bold">
                  <th className="py-3 px-4">শিক্ষক / Teacher</th>
                  <th className="py-3 px-4">পদবি ও র্যাঙ্ক / Designation & Rank</th>
                  <th className="py-3 px-4">বিভাগ / Department</th>
                  <th className="py-3 px-4">যোগাযোগ / Contact</th>
                  <th className="py-3 px-4">তৈরি করেছেন / Creator</th>
                  <th className="py-3 px-4 text-right">কার্যক্রম / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
                {teachers.map((t) => {
                  const allowedToModify = canModify(t);
                  return (
                    <tr key={t.id} className="hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      {/* Name & Photo */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center border border-[var(--border-subtle)]">
                            {t.photoUrl ? (
                              <img
                                src={t.photoUrl}
                                alt={t.nameEn}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <Users className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[var(--text-primary)]">{t.nameBn}</div>
                            <div className="text-xs text-[var(--text-muted)]">{t.nameEn}</div>
                          </div>
                        </div>
                      </td>

                      {/* Designation & Rank */}
                      <td className="py-3 px-4">
                        <div className="font-semibold">{t.designationBn}</div>
                        <div className="text-[11px] text-[var(--text-muted)]">{t.designationEn}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          {t.rank}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4">
                        <div className="font-medium">{t.departmentBn || '—'}</div>
                        <div className="text-[11px] text-[var(--text-muted)]">{t.departmentEn || '—'}</div>
                      </td>

                      {/* Contact with clickable mailto: and tel: */}
                      <td className="py-3 px-4 space-y-1">
                        {t.email ? (
                          <div>
                            <a
                              href={`mailto:${t.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              title={`ইমেইল পাঠান: ${t.email}`}
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-500" />
                              <span className="truncate max-w-[160px]">{t.email}</span>
                            </a>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[var(--text-muted)] italic">ইমেইল নেই</span>
                        )}

                        {t.phone ? (
                          <div>
                            <a
                              href={`tel:${t.phone}`}
                              className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                              title={`কল করুন: ${t.phone}`}
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{t.phone}</span>
                            </a>
                          </div>
                        ) : (
                          <div className="text-[11px] text-[var(--text-muted)] italic">ফোন নেই</div>
                        )}
                      </td>

                      {/* Creator info */}
                      <td className="py-3 px-4 text-xs text-[var(--text-muted)]">
                        <div className="font-medium text-[var(--text-primary)]">
                          {t.createdBy?.name || 'Admin'}
                        </div>
                        <div className="text-[10px]">@{t.createdBy?.username || 'admin'}</div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenView(t)}
                            className="p-1.5 rounded-md hover:bg-[var(--bg-secondary)] text-blue-600 dark:text-blue-400 transition"
                            title="বিস্তারিত দেখুন / View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {allowedToModify ? (
                            <>
                              <button
                                onClick={() => handleOpenEdit(t)}
                                className="p-1.5 rounded-md hover:bg-[var(--bg-secondary)] text-amber-600 dark:text-amber-400 transition"
                                title="সম্পাদন করুন / Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenDelete(t)}
                                className="p-1.5 rounded-md hover:bg-[var(--bg-secondary)] text-red-600 dark:text-red-400 transition"
                                title="মুছে ফেলুন / Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span
                              className="p-1.5 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                              title="শুধুমাত্র রেকর্ড প্রস্তুতকারক অথবা প্রধান নিয়ন্ত্রক সম্পাদন করতে পারবেন"
                            >
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stack View (Shown on screens < 768px) */}
          <div className="block md:hidden space-y-3">
            {teachers.map((t) => {
              const allowedToModify = canModify(t);
              return (
                <Card key={t.id} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center border border-[var(--border-subtle)]">
                      {t.photoUrl ? (
                        <img
                          src={t.photoUrl}
                          alt={t.nameEn}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Users className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-[var(--text-primary)] truncate">{t.nameBn}</div>
                      <div className="text-xs text-[var(--text-muted)] truncate">{t.nameEn}</div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {t.designationBn}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)]">{t.departmentBn || t.departmentEn || '—'}</div>
                    </div>
                  </div>

                  {/* Clickable phone & email links on mobile */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1.5 text-xs">
                    {t.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <a
                          href={`mailto:${t.email}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                        >
                          {t.email}
                        </a>
                      </div>
                    )}
                    {t.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <a
                          href={`tel:${t.phone}`}
                          className="text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          {t.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Mobile Actions Bar */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-muted)]">
                      তৈরি: {t.createdBy?.name || 'Admin'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenView(t)}
                        className="px-2.5 py-1 text-xs rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>ভিউ</span>
                      </button>

                      {allowedToModify ? (
                        <>
                          <button
                            onClick={() => handleOpenEdit(t)}
                            className="px-2.5 py-1 text-xs rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>এডিট</span>
                          </button>
                          <button
                            onClick={() => handleOpenDelete(t)}
                            className="px-2.5 py-1 text-xs rounded bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>ডিলিট</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-[var(--text-muted)] italic">সংরক্ষিত</span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>নতুন শিক্ষক যুক্ত করুন / Add New Teacher</span>
              </h2>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bengali Name */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    শিক্ষকের নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    placeholder="যেমন: মোঃ নূরুল আমিন"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.nameBn && <p className="text-red-500 text-[11px] mt-1">{formErrors.nameBn}</p>}
                </div>

                {/* English Name */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    Teacher Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="e.g. Md. Nurul Amin"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.nameEn && <p className="text-red-500 text-[11px] mt-1">{formErrors.nameEn}</p>}
                </div>

                {/* Bengali Designation */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    পদবি (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designationBn}
                    onChange={(e) => setFormData({ ...formData, designationBn: e.target.value })}
                    placeholder="যেমন: সহকারী অধ্যাপক / প্রভাষক"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.designationBn && (
                    <p className="text-red-500 text-[11px] mt-1">{formErrors.designationBn}</p>
                  )}
                </div>

                {/* English Designation */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    Designation (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designationEn}
                    onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })}
                    placeholder="e.g. Assistant Professor / Lecturer"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.designationEn && (
                    <p className="text-red-500 text-[11px] mt-1">{formErrors.designationEn}</p>
                  )}
                </div>

                {/* Rank Selection */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    পদমর্যাদা / Official Rank *
                  </label>
                  <select
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value as TeacherRecord['rank'] })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  >
                    {RANK_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.labelBn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Selection (or manual) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    বিভাগ / Department (English)
                  </label>
                  <input
                    type="text"
                    value={formData.departmentEn}
                    onChange={(e) => {
                      const val = e.target.value;
                      const matched = DEPARTMENT_OPTIONS.find(
                        (d) => d.en.toLowerCase() === val.toLowerCase()
                      );
                      setFormData({
                        ...formData,
                        departmentEn: val,
                        departmentBn: matched ? matched.bn : formData.departmentBn,
                      });
                    }}
                    placeholder="e.g. Bangla, English, Mathematics"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Department Bengali */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    বিভাগ (বাংলা) / Department (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.departmentBn}
                    onChange={(e) => setFormData({ ...formData, departmentBn: e.target.value })}
                    placeholder="যেমন: বাংলা, ইংরেজি, গণিত"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    সরকারি/প্রাতিষ্ঠানিক ইমেইল / Email (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. deb110882.teacher@gmail.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.email && <p className="text-red-500 text-[11px] mt-1">{formErrors.email}</p>}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    মোবাইল নম্বর / Phone (ঐচ্ছিক)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="যেমন: 01712345678"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.phone && <p className="text-red-500 text-[11px] mt-1">{formErrors.phone}</p>}
                </div>

                {/* Photo URL (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    ছবির পাথ / Photo Path (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="যেমন: /images/teachers/md-nurul-amin.jpg"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.photoUrl && <p className="text-red-500 text-[11px] mt-1">{formErrors.photoUrl}</p>}
                </div>
              </div>

              {/* Special Note (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                  বিশেষ মন্তব্য বা দায়িত্ব / Special Note (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNote}
                  onChange={(e) => setFormData({ ...formData, specialNote: e.target.value })}
                  placeholder="যেমন: বিভাগীয় প্রধান / ক্রীড়া আহ্বায়ক"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)]"
                >
                  বাতিল / Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow disabled:opacity-50"
                >
                  {formSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন / Save Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && activeTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-600" />
                <span>শিক্ষকের তথ্য সম্পাদন / Edit Teacher Record</span>
              </h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bengali Name */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    শিক্ষকের নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.nameBn && <p className="text-red-500 text-[11px] mt-1">{formErrors.nameBn}</p>}
                </div>

                {/* English Name */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    Teacher Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.nameEn && <p className="text-red-500 text-[11px] mt-1">{formErrors.nameEn}</p>}
                </div>

                {/* Bengali Designation */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    পদবি (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designationBn}
                    onChange={(e) => setFormData({ ...formData, designationBn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.designationBn && (
                    <p className="text-red-500 text-[11px] mt-1">{formErrors.designationBn}</p>
                  )}
                </div>

                {/* English Designation */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    Designation (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designationEn}
                    onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.designationEn && (
                    <p className="text-red-500 text-[11px] mt-1">{formErrors.designationEn}</p>
                  )}
                </div>

                {/* Rank Selection */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    পদমর্যাদা / Official Rank *
                  </label>
                  <select
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value as TeacherRecord['rank'] })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  >
                    {RANK_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.labelBn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Selection */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    বিভাগ / Department (English)
                  </label>
                  <input
                    type="text"
                    value={formData.departmentEn}
                    onChange={(e) => setFormData({ ...formData, departmentEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Department Bengali */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    বিভাগ (বাংলা) / Department (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.departmentBn}
                    onChange={(e) => setFormData({ ...formData, departmentBn: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    ইমেইল / Email (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.email && <p className="text-red-500 text-[11px] mt-1">{formErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    ফোন নম্বর / Phone (ঐচ্ছিক)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.phone && <p className="text-red-500 text-[11px] mt-1">{formErrors.phone}</p>}
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                    ছবির পাথ / Photo Path (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                  />
                  {formErrors.photoUrl && <p className="text-red-500 text-[11px] mt-1">{formErrors.photoUrl}</p>}
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                  বিশেষ মন্তব্য বা দায়িত্ব / Special Note
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNote}
                  onChange={(e) => setFormData({ ...formData, specialNote: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)]"
                >
                  বাতিল / Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow disabled:opacity-50"
                >
                  {formSubmitting ? 'হালনাগাদ হচ্ছে...' : 'হালনাগাদ সংরক্ষণ করুন / Update Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewOpen && activeTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>শিক্ষকের বিস্তারিত তথ্য / Faculty Profile</span>
              </h2>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Photo & Header */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)]">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-emerald-500">
                  {activeTeacher.photoUrl ? (
                    <img
                      src={activeTeacher.photoUrl}
                      alt={activeTeacher.nameEn}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Users className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-tight">
                    {activeTeacher.nameBn}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{activeTeacher.nameEn}</p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {activeTeacher.designationBn} ({activeTeacher.designationEn})
                  </p>
                </div>
              </div>

              {/* Department & Rank info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                  <div className="text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>বিভাগ / Department</span>
                  </div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {activeTeacher.departmentBn || activeTeacher.departmentEn || '—'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                  <div className="text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>পদমর্যাদা / Rank</span>
                  </div>
                  <div className="font-bold text-[var(--text-primary)] uppercase">
                    {activeTeacher.rank}
                  </div>
                </div>
              </div>

              {/* Direct Clickable Contact details */}
              <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] space-y-2 text-xs">
                <div className="text-[var(--text-muted)] font-semibold mb-1">যোগাযোগের মাধ্যম / Contact Details:</div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {activeTeacher.email ? (
                    <a
                      href={`mailto:${activeTeacher.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      {activeTeacher.email} (ক্লিক করুন)
                    </a>
                  ) : (
                    <span className="text-[var(--text-muted)] italic">কোনো ইমেইল সংরক্ষিত নেই</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {activeTeacher.phone ? (
                    <a
                      href={`tel:${activeTeacher.phone}`}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      {activeTeacher.phone} (কল করুন)
                    </a>
                  ) : (
                    <span className="text-[var(--text-muted)] italic">কোনো ফোন নম্বর সংরক্ষিত নেই</span>
                  )}
                </div>
              </div>

              {/* Special Note */}
              {activeTeacher.specialNote && (
                <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs">
                  <div className="text-[var(--text-muted)] font-semibold mb-0.5">বিশেষ মন্তব্য / Note:</div>
                  <div className="text-[var(--text-primary)]">{activeTeacher.specialNote}</div>
                </div>
              )}

              {/* Creator Metadata */}
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]/40 text-[11px] text-[var(--text-muted)] space-y-1">
                <div className="flex items-center justify-between">
                  <span>তৈরি করেছেন / Created By:</span>
                  <strong className="text-[var(--text-primary)]">
                    {activeTeacher.createdBy?.name || 'Administrator'} (@{activeTeacher.createdBy?.username || 'admin'})
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>তৈরির তারিখ / Created At:</span>
                  <span>{new Date(activeTeacher.createdAt).toLocaleDateString('bn-BD')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-subtle)]"
              >
                বন্ধ করুন / Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && activeTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  শিক্ষক রেকর্ড মুছে ফেলার নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  আপনি কি নিশ্চিতভাবে <strong className="text-red-600 dark:text-red-400">{activeTeacher.nameBn}</strong> ({activeTeacher.nameEn})-এর রেকর্ডটি স্থায়ীভাবে মুছে ফেলতে চান? এই প্রক্রিয়া পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                disabled={formSubmitting}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)]"
              >
                বাতিল / Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={formSubmitting}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow disabled:opacity-50"
              >
                {formSubmitting ? 'অপসারণ হচ্ছে...' : 'স্থায়ীভাবে মুছে ফেলুন / Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
