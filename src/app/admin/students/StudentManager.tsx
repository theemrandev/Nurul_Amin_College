'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import type { SessionUser } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  GraduationCap,
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
  MapPin,
  User,
  Shield,
  ArrowLeft,
  RotateCw,
  Clock,
  Lock,
} from 'lucide-react';

export interface StudentRecord {
  id: string;
  name: string;
  studentClass: string;
  roll: string;
  group: string;
  section: string;
  personalPhone: string | null;
  personalEmail: string | null;
  guardianName: string;
  guardianRelationship: 'Father' | 'Mother';
  guardianPhone: string | null;
  guardianEmail: string | null;
  homeAddress: string;
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

interface StudentManagerProps {
  currentUser: SessionUser;
  initialStudents?: StudentRecord[];
}

const CLASS_OPTIONS = [
  'HSC 1st Year (একাদশ শ্রেণি)',
  'HSC 2nd Year (দ্বাদশ শ্রেণি)',
  'Degree 1st Year (ডিগ্রি ১ম বর্ষ)',
  'Degree 2nd Year (ডিগ্রি ২য় বর্ষ)',
  'Degree 3rd Year (ডিগ্রি ৩য় বর্ষ)',
];

const GROUP_OPTIONS = [
  'Science (বিজ্ঞান)',
  'Humanities (মানবিক)',
  'Business Studies (ব্যবসায় শিক্ষা)',
  'B.A (বি.এ - পাস)',
  'B.S.S (বি.এস.এস - পাস)',
  'B.B.S (বি.বি.এস - পাস)',
  'B.Sc (বি.এসসি - পাস)',
];

const SECTION_OPTIONS = ['A', 'B', 'C', 'D'];

interface FormData {
  name: string;
  studentClass: string;
  roll: string;
  group: string;
  section: string;
  personalPhone: string;
  personalEmail: string;
  guardianName: string;
  guardianRelationship: 'Father' | 'Mother';
  guardianPhone: string;
  guardianEmail: string;
  homeAddress: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  studentClass: CLASS_OPTIONS[0],
  roll: '',
  group: GROUP_OPTIONS[0],
  section: 'A',
  personalPhone: '',
  personalEmail: '',
  guardianName: '',
  guardianRelationship: 'Father',
  guardianPhone: '',
  guardianEmail: '',
  homeAddress: '',
};

export function StudentManager({ currentUser, initialStudents = [] }: StudentManagerProps) {
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [filterSection, setFilterSection] = useState('');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const isMainAdmin = currentUser.role === 'MAIN_ADMIN';

  const refetch = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  // Fetch students on filter/search change
  useEffect(() => {
    let active = true;

    async function loadStudents() {
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (filterClass) params.set('studentClass', filterClass);
        if (filterGroup) params.set('group', filterGroup);
        if (filterSection) params.set('section', filterSection);

        const res = await fetch(`/api/admin/students?${params.toString()}`);
        const data = await res.json();

        if (!active) return;

        if (!res.ok) {
          setError(data.error || 'Failed to fetch student records');
        } else {
          setStudents(data.students || []);
        }
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Error loading students');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStudents();

    return () => {
      active = false;
    };
  }, [search, filterClass, filterGroup, filterSection, refreshIndex]);

  // Can the current user modify this student?
  const canModify = (student: StudentRecord): boolean => {
    if (isMainAdmin) return true;
    return student.createdById === currentUser.id;
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData(INITIAL_FORM);
    setFormErrors({});
    setError(null);
    setSuccess(null);
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (student: StudentRecord) => {
    setFormData({
      name: student.name,
      studentClass: student.studentClass,
      roll: student.roll,
      group: student.group,
      section: student.section || 'A',
      personalPhone: student.personalPhone || '',
      personalEmail: student.personalEmail || '',
      guardianName: student.guardianName,
      guardianRelationship: student.guardianRelationship,
      guardianPhone: student.guardianPhone || '',
      guardianEmail: student.guardianEmail || '',
      homeAddress: student.homeAddress,
    });
    setFormErrors({});
    setError(null);
    setSuccess(null);
    setEditingStudent(student);
  };

  // Handle Form Submission (Add or Edit)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setError(null);

    const isEdit = Boolean(editingStudent);
    const url = isEdit ? `/api/admin/students/${editingStudent?.id}` : '/api/admin/students';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFormErrors(data.details);
        }
        throw new Error(data.error || 'Failed to save student record');
      }

      setSuccess(
        isEdit
          ? 'শিক্ষার্থীর তথ্য সফলভাবে হালনাগাদ করা হয়েছে / Student record updated successfully!'
          : 'নতুন শিক্ষার্থী সফলভাবে নিবন্ধিত হয়েছে / Student record created successfully!'
      );

      setIsAddOpen(false);
      setEditingStudent(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/students/${deletingStudent.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete student record');
      }

      setSuccess('শিক্ষার্থীর রেকর্ড সফলভাবে মুছে ফেলা হয়েছে / Student record deleted successfully!');
      setDeletingStudent(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link
              href="/admin"
              className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-light)] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ড্যাশবোর্ড / Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium">শিক্ষার্থী ব্যবস্থাপনা</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                শিক্ষার্থী ব্যবস্থাপনা / Student Management
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                {isMainAdmin
                  ? 'প্রধান নিয়ন্ত্রক হিসেবে সকল শিক্ষার্থীর রেকর্ডে আপনার পূর্ণাঙ্গ প্রবেশাধিকার রয়েছে।'
                  : 'সহকারী নিয়ন্ত্রক হিসেবে আপনার দ্বারা তৈরি করা রেকর্ডে প্রবেশ ও সম্পাদনা সীমাবদ্ধ।'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[#081b33] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শিক্ষার্থী সংযোজন / Add Student</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-xs sm:text-sm flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="font-medium">{success}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <Card className="p-4 sm:p-5 border border-[var(--border-subtle)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম, রোল বা অভিভাবক খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            >
              <option value="">সকল শ্রেণি / All Classes</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            >
              <option value="">সকল গ্রুপ / All Groups</option>
              {GROUP_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter & Reset */}
          <div className="flex items-center gap-2">
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            >
              <option value="">সকল শাখা / All Sections</option>
              {SECTION_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  শাখা {s}
                </option>
              ))}
            </select>

            {(search || filterClass || filterGroup || filterSection) && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterClass('');
                  setFilterGroup('');
                  setFilterSection('');
                }}
                title="ফিল্টার রিসেট করুন / Reset Filters"
                className="px-2.5 py-2 rounded-lg border border-[var(--border-subtle)] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-[var(--text-secondary)] transition-all flex items-center justify-center"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>
              মোট প্রাপ্ত শিক্ষার্থী রেকর্ড:{' '}
              <strong className="text-[var(--text-primary)] font-bold">{students.length}</strong>
            </span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)]">
            {isMainAdmin ? 'গ্লোবাল রেকর্ড দর্শন সক্রিয়' : 'ব্যক্তিগতভাবে প্রস্তুতকৃত রেকর্ড সীমাবদ্ধতা সক্রিয়'}
          </div>
        </div>
      </Card>

      {/* Student Records Table */}
      <Card className="border border-[var(--border-subtle)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-[var(--color-primary)]" />
            <p className="text-xs text-[var(--text-secondary)]">শিক্ষার্থী তথ্য লোড হচ্ছে...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-[var(--text-secondary)]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              কোনো শিক্ষার্থী রেকর্ড পাওয়া যায়নি / No Student Records Found
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              {search || filterClass || filterGroup || filterSection
                ? 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো রেকর্ড খুঁজে পাওয়া যায়নি। অনুসন্ধান বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                : 'বর্তমানে কোনো শিক্ষার্থীর রেকর্ড সংরক্ষিত নেই। উপরে "নতুন শিক্ষার্থী সংযোজন" বাটনে ক্লিক করে শিক্ষার্থী যুক্ত করুন।'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-slate-50/70 dark:bg-slate-900/40 text-[var(--text-secondary)] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">রোল / Roll</th>
                  <th className="py-3 px-4 font-semibold">শিক্ষার্থীর নাম / Name</th>
                  <th className="py-3 px-4 font-semibold">শ্রেণি ও গ্রুপ / Class & Group</th>
                  <th className="py-3 px-4 font-semibold">শাখা / Sec</th>
                  <th className="py-3 px-4 font-semibold">অভিভাবক / Guardian</th>
                  <th className="py-3 px-4 font-semibold">যোগাযোগ / Contact</th>
                  {isMainAdmin && <th className="py-3 px-4 font-semibold">প্রস্তুতকারক / Created By</th>}
                  <th className="py-3 px-4 font-semibold text-right">পদক্ষেপ / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {students.map((student) => {
                  const allowedToModify = canModify(student);

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Roll */}
                      <td className="py-3 px-4 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] whitespace-nowrap">
                        #{student.roll}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">
                        {student.name}
                      </td>

                      {/* Class & Group */}
                      <td className="py-3 px-4 space-y-0.5">
                        <div className="font-medium text-[var(--text-primary)]">{student.studentClass}</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">{student.group}</div>
                      </td>

                      {/* Section */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          শাখা {student.section}
                        </span>
                      </td>

                      {/* Guardian */}
                      <td className="py-3 px-4 space-y-0.5">
                        <div className="font-medium text-[var(--text-primary)]">{student.guardianName}</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">
                          {student.guardianRelationship === 'Father' ? 'পিতা (Father)' : 'মাতা (Mother)'}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4 text-[11px] text-[var(--text-secondary)] whitespace-nowrap">
                        {student.personalPhone || student.guardianPhone ? (
                          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                            <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{student.personalPhone || student.guardianPhone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">প্রযোজ্য নয়</span>
                        )}
                      </td>

                      {/* Created By (Only shown to Main Admin) */}
                      {isMainAdmin && (
                        <td className="py-3 px-4 text-[11px]">
                          <span className="font-medium text-[var(--text-primary)]">
                            {student.createdBy?.name || 'Administrator'}
                          </span>
                          <span className="block text-[10px] text-[var(--text-secondary)]">
                            @{student.createdBy?.username || 'admin'}
                          </span>
                        </td>
                      )}

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* View Button */}
                          <button
                            onClick={() => setViewingStudent(student)}
                            title="বিস্তারিত দেখুন / View Details"
                            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Button */}
                          {allowedToModify ? (
                            <button
                              onClick={() => handleOpenEdit(student)}
                              title="সম্পাদনা করুন / Edit Record"
                              className="p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950/50 text-blue-600 dark:text-blue-400 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span
                              title="শুধুমাত্র রেকর্ড প্রস্তুতকারক অথবা প্রধান নিয়ন্ত্রক সম্পাদন করতে পারবেন"
                              className="p-1.5 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                            >
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}

                          {/* Delete Button */}
                          {allowedToModify ? (
                            <button
                              onClick={() => setDeletingStudent(student)}
                              title="মুছে ফেলুন / Delete Record"
                              className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ========================================================================= */}
      {/* MODAL: View Student Details */}
      {/* ========================================================================= */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-2xl w-full border border-[var(--border-subtle)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 bg-[var(--color-primary)] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold">শিক্ষার্থীর বিবরণী / Student Profile</h3>
                  <p className="text-xs text-slate-200">
                    রোল #{viewingStudent.roll} • {viewingStudent.studentClass}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingStudent(null)}
                className="text-white/70 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {/* Privacy Warning */}
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>
                  গোপনীয় প্রশাসনিক তথ্য: শিক্ষার্থীর ব্যক্তিগত ও যোগাযোগের তথ্য শুধুমাত্র প্রাতিষ্ঠানিক কার্যাবলীতে ব্যবহারের জন্য সংরক্ষিত।
                </span>
              </div>

              {/* Basic Academic Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  একাডেমিক তথ্য / Academic Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">শিক্ষার্থীর নাম</span>
                    <span className="font-bold text-[var(--text-primary)]">{viewingStudent.name}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">রোল নম্বর</span>
                    <span className="font-bold text-[var(--color-primary)]">#{viewingStudent.roll}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">শ্রেণি</span>
                    <span className="font-medium text-[var(--text-primary)]">{viewingStudent.studentClass}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">গ্রুপ / বিভাগ</span>
                    <span className="font-medium text-[var(--text-primary)]">{viewingStudent.group}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">শাখা</span>
                    <span className="font-medium text-[var(--text-primary)]">শাখা {viewingStudent.section}</span>
                  </div>
                </div>
              </div>

              {/* Guardian Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  অভিভাবকের তথ্য / Guardian Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">অভিভাবকের নাম</span>
                    <span className="font-semibold text-[var(--text-primary)]">{viewingStudent.guardianName}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">সম্পর্ক</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {viewingStudent.guardianRelationship === 'Father' ? 'পিতা (Father)' : 'মাতা (Mother)'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">অভিভাবকের ফোন নম্বর</span>
                    <span className="font-mono text-[var(--text-primary)]">
                      {viewingStudent.guardianPhone || 'প্রযোজ্য নয় / Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">অভিভাবকের ইমেইল</span>
                    <span className="text-[var(--text-primary)]">
                      {viewingStudent.guardianEmail || 'প্রযোজ্য নয় / Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Contacts & Address */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  যোগাযোগ ও ঠিকানা / Contact & Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">শিক্ষার্থীর ফোন নম্বর</span>
                    <span className="font-mono text-[var(--text-primary)]">
                      {viewingStudent.personalPhone || 'প্রযোজ্য নয় / Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-secondary)]">শিক্ষার্থীর ইমেইল / Gmail</span>
                    <span className="text-[var(--text-primary)]">
                      {viewingStudent.personalEmail || 'প্রযোজ্য নয় / Not provided'}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-[11px] text-[var(--text-secondary)]">স্থায়ী ঠিকানা</span>
                    <p className="font-medium text-[var(--text-primary)] leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-[var(--border-subtle)] mt-1">
                      {viewingStudent.homeAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Administrative Metadata */}
              <div className="pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>
                  রেকর্ড প্রস্তুতকারক:{' '}
                  <strong>{viewingStudent.createdBy?.name || 'Administrator'}</strong> (
                  @{viewingStudent.createdBy?.username || 'admin'})
                </span>
                <span>নিবন্ধনের তারিখ: {new Date(viewingStudent.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-[var(--border-subtle)] flex justify-end">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-semibold text-[var(--text-primary)] transition-colors"
              >
                বন্ধ করুন / Close
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Add / Edit Student Form */}
      {/* ========================================================================= */}
      {(isAddOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-2xl w-full border border-[var(--border-subtle)] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 bg-[var(--color-primary)] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    {editingStudent ? 'শিক্ষার্থীর তথ্য সম্পাদনা / Edit Student Record' : 'নতুন শিক্ষার্থী সংযোজন / Add New Student'}
                  </h3>
                  <p className="text-xs text-slate-200">
                    সঠিক প্রাতিষ্ঠানিক তথ্য পূরণ করুন। লাল তারকাচিহ্নিত (*) ঘরগুলো পূরণ বাধ্যতামূলক।
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setEditingStudent(null);
                }}
                className="text-white/70 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">
              {/* Academic Details Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  একাডেমিক বিবরণী / Academic Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      শিক্ষার্থীর পূর্ণ নাম / Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="উদাঃ মোসাঃ ফাতেমা আক্তার / Md. Tanvir Hasan"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.name ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.name && <p className="text-[11px] text-red-500">{formErrors.name}</p>}
                  </div>

                  {/* Class */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      শ্রেণি / Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.studentClass}
                      onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    >
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Group */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      গ্রুপ বা বিভাগ / Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.group}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    >
                      {GROUP_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Roll */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      রোল নম্বর / Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.roll}
                      onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                      placeholder="উদাঃ 101 বা 2026-A"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.roll ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.roll && <p className="text-[11px] text-red-500">{formErrors.roll}</p>}
                  </div>

                  {/* Section */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      শাখা / Section <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    >
                      {SECTION_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          শাখা {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Guardian Information Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  অভিভাবকের তথ্য / Guardian Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Guardian Name */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      অভিভাবকের নাম / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="উদাঃ মোঃ রফিকুল ইসলাম"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.guardianName ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.guardianName && (
                      <p className="text-[11px] text-red-500">{formErrors.guardianName}</p>
                    )}
                  </div>

                  {/* Guardian Relationship */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      সম্পর্ক / Relationship <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, guardianRelationship: 'Father' })}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          formData.guardianRelationship === 'Father'
                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>পিতা / Father</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, guardianRelationship: 'Mother' })}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          formData.guardianRelationship === 'Mother'
                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>মাতা / Mother</span>
                      </button>
                    </div>
                  </div>

                  {/* Guardian Phone */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      অভিভাবকের ফোন নম্বর / Guardian Phone (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.guardianPhone ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.guardianPhone && (
                      <p className="text-[11px] text-red-500">{formErrors.guardianPhone}</p>
                    )}
                  </div>

                  {/* Guardian Email */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      অভিভাবকের ইমেইল / Guardian Email (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                      placeholder="guardian@example.com"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.guardianEmail ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.guardianEmail && (
                      <p className="text-[11px] text-red-500">{formErrors.guardianEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Contacts & Address Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-xs uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  ব্যক্তিগত যোগাযোগ ও ঠিকানা / Personal Contact & Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Personal Phone */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      শিক্ষার্থীর ফোন নম্বর / Student Phone (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={formData.personalPhone}
                      onChange={(e) => setFormData({ ...formData, personalPhone: e.target.value })}
                      placeholder="018XXXXXXXX"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.personalPhone ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.personalPhone && (
                      <p className="text-[11px] text-red-500">{formErrors.personalPhone}</p>
                    )}
                  </div>

                  {/* Personal Email */}
                  <div className="space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      শিক্ষার্থীর ইমেইল / Gmail (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={formData.personalEmail}
                      onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                      placeholder="student@gmail.com"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.personalEmail ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.personalEmail && (
                      <p className="text-[11px] text-red-500">{formErrors.personalEmail}</p>
                    )}
                  </div>

                  {/* Home Address */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block font-medium text-[var(--text-primary)]">
                      পূর্ণাঙ্গ ঠিকানা / Full Home Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.homeAddress}
                      onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                      placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা (উদাঃ উমেদপুর, শিবচর, মাদারীপুর)"
                      className={`w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                        formErrors.homeAddress ? 'border-red-500' : 'border-[var(--border-subtle)]'
                      }`}
                    />
                    {formErrors.homeAddress && (
                      <p className="text-[11px] text-red-500">{formErrors.homeAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-[var(--text-secondary)] transition-colors"
                >
                  বাতিল / Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[#081b33] text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting && <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />}
                  <span>{editingStudent ? 'হালনাগাদ সংরক্ষণ করুন / Save Changes' : 'নিবন্ধন সম্পন্ন করুন / Submit'}</span>
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Delete Confirmation */}
      {/* ========================================================================= */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-md w-full border border-red-200 dark:border-red-900 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  রেকর্ড মুছে ফেলার নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">Delete Student Confirmation</p>
              </div>
            </div>

            <p className="text-xs text-[var(--text-primary)] leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-[var(--border-subtle)]">
              আপনি কি নিশ্চিত যে শিক্ষার্থী <strong className="font-bold text-red-600 dark:text-red-400">{deletingStudent.name}</strong> (রোল #{deletingStudent.roll}, {deletingStudent.studentClass})-এর রেকর্ড স্থায়ীভাবে মুছে ফেলতে চান? এই প্রক্রিয়া অপরিবর্তনীয়।
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-[var(--text-secondary)] transition-colors"
              >
                বাতিল / Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSubmitting && <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />}
                <span>স্থায়ীভাবে মুছে ফেলুন / Delete Record</span>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
