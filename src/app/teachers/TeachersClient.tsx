'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Building2,
  ShieldCheck,
  Search,
  X,
  CheckCircle2,
  Info,
  Calendar,
  ChevronRight,
  Layers,
  Sparkles,
  Mail,
  ExternalLink,
} from 'lucide-react';
import {
  VERIFIED_INDIVIDUAL_TEACHERS,
  COLLECTIVE_COUNCILS,
  ACADEMIC_DEPARTMENTS,
  IndividualTeacher,
  CollectiveCouncil,
  DepartmentOverview,
} from '@/lib/teachersData';

type FilterCategory =
  | 'all'
  | 'vice-principal'
  | 'assistant-professor'
  | 'lecturer'
  | 'councils'
  | 'departments';

export default function TeachersClient() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter tabs
  const filterTabs: { id: FilterCategory; labelBn: string; labelEn: string; count?: number }[] =
    useMemo(
      () => [
        {
          id: 'all',
          labelBn: 'সকল শিক্ষক',
          labelEn: 'All Teachers',
          count: VERIFIED_INDIVIDUAL_TEACHERS.length,
        },
        {
          id: 'vice-principal',
          labelBn: 'উপাধ্যক্ষ',
          labelEn: 'Vice Principal',
          count: VERIFIED_INDIVIDUAL_TEACHERS.filter((t) => t.rank === 'vice-principal').length,
        },
        {
          id: 'assistant-professor',
          labelBn: 'সহকারী অধ্যাপক',
          labelEn: 'Assistant Professors',
          count: VERIFIED_INDIVIDUAL_TEACHERS.filter((t) => t.rank === 'assistant-professor')
            .length,
        },
        {
          id: 'lecturer',
          labelBn: 'প্রভাষক',
          labelEn: 'Lecturers',
          count: VERIFIED_INDIVIDUAL_TEACHERS.filter((t) => t.rank === 'lecturer').length,
        },
        {
          id: 'councils',
          labelBn: 'পরিচালনা ও পরিষদ',
          labelEn: 'Councils & Committees',
          count: COLLECTIVE_COUNCILS.length,
        },
        {
          id: 'departments',
          labelBn: 'একাডেমিক বিভাগ',
          labelEn: 'Academic Departments',
          count: ACADEMIC_DEPARTMENTS.length,
        },
      ],
      []
    );

  // Filtered individual teachers list
  const filteredTeachers = useMemo(() => {
    if (activeCategory === 'councils' || activeCategory === 'departments') {
      return [];
    }

    const q = searchQuery.toLowerCase().trim();

    return VERIFIED_INDIVIDUAL_TEACHERS.filter((teacher) => {
      // Category match
      const matchCategory =
        activeCategory === 'all' || teacher.rank === activeCategory;

      if (!matchCategory) return false;

      // Search match
      if (!q) return true;

      const nameBn = teacher.nameBn.toLowerCase();
      const nameEn = teacher.nameEn.toLowerCase();
      const desBn = teacher.designationBn.toLowerCase();
      const desEn = teacher.designationEn.toLowerCase();
      const email = teacher.email.toLowerCase();
      const deptBn = (teacher.departmentBn || '').toLowerCase();
      const deptEn = (teacher.departmentEn || '').toLowerCase();
      const noteBn = (teacher.specialNoteBn || '').toLowerCase();
      const noteEn = (teacher.specialNoteEn || '').toLowerCase();

      return (
        nameBn.includes(q) ||
        nameEn.includes(q) ||
        desBn.includes(q) ||
        desEn.includes(q) ||
        email.includes(q) ||
        deptBn.includes(q) ||
        deptEn.includes(q) ||
        noteBn.includes(q) ||
        noteEn.includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Filtered collective councils
  const filteredCouncils = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'councils') {
      return [];
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return COLLECTIVE_COUNCILS;

    return COLLECTIVE_COUNCILS.filter((c) => {
      return (
        c.titleBn.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.descBn.toLowerCase().includes(q) ||
        c.descEn.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Filtered academic departments
  const filteredDepartments = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'departments') {
      return [];
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return ACADEMIC_DEPARTMENTS;

    return ACADEMIC_DEPARTMENTS.filter((d) => {
      return (
        d.nameBn.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.shortCode.toLowerCase().includes(q) ||
        d.disciplinesBn.some((disc) => disc.toLowerCase().includes(q)) ||
        d.disciplinesEn.some((disc) => disc.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <PageShell>
      {/* Page Banner */}
      <PageBanner
        title={isBn ? 'শিক্ষক ও কর্মকর্তা পরিষদ' : 'Faculty & Staff Directory'}
        subtitle={
          isBn
            ? 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা এর দাপ্তরিক জনবল কাঠামো অনুসারে অনুমোদিত শিক্ষক তালিকা'
            : 'Official Faculty and Staff Directory verified under the Board of Intermediate and Secondary Education, Dhaka'
        }
        breadcrumbs={[{ label: isBn ? 'শিক্ষক পরিষদ' : 'Teachers' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Institutional Statistics & Verification Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {isBn ? '২৫ জন' : '25'}
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {isBn ? 'অনুমোদিত শিক্ষকবৃন্দ' : 'Verified Faculty Members'}
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                  {isBn
                    ? '১ উপাধ্যক্ষ • ৯ সহকারী অধ্যাপক • ১৫ প্রভাষক'
                    : '1 VP • 9 Asst. Prof • 15 Lecturers'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-blue-600 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBn ? 'ঢাকা শিক্ষা বোর্ড পোর্টাল' : 'Dhaka Education Board'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  EIIN: {COLLEGE_INFO.identity.eiin} • {isBn ? 'কোড: ৬৩০৯' : 'Code: 6309'}
                </p>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5 font-medium">
                  {isBn ? 'দাপ্তরিক জনবল তালিকাভুক্ত' : 'Official Manpower Registry'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBn ? '১০০% নির্ভরযোগ্য রেকর্ড' : '100% Verified Records'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isBn ? 'অফিশিয়াল ইমেইল ও প্রতিকৃতি' : 'Official Email & Portraits'}
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-medium">
                  {isBn ? 'কোনো অনুমাননির্ভর তথ্য নেই' : 'Zero Speculative Details'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-purple-600 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {isBn ? '৫টি বিভাগ' : '5 Departments'}
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {isBn ? 'উচ্চমাধ্যমিক ও ডিগ্রি অনুষদ' : 'HSC & Degree Pass Faculties'}
                </p>
                <p className="text-[11px] text-purple-700 dark:text-purple-400 mt-0.5">
                  {isBn ? 'বিজ্ঞান • মানবিক • বাণিজ্য • আইসিটি' : 'Science, Arts, Business & ICT'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'শিক্ষকের নাম, পদবি, ইমেইল বা বিভাগ দিয়ে খুঁজুন...'
                  : 'Search by teacher name, designation, email, or subject...'
              }
              aria-label={
                isBn
                  ? 'শিক্ষক তালিকায় অনুসন্ধান করুন'
                  : 'Search teacher directory'
              }
              className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label={isBn ? 'অনুসন্ধান মুছুন' : 'Clear search'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800" role="tablist">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{isBn ? tab.labelBn : tab.labelEn}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Search Results Indicator */}
          {searchQuery && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
              <span>
                {isBn
                  ? `অনুসন্ধান ফলাফল: "${searchQuery}" (${filteredTeachers.length} জন শিক্ষক পাওয়া গেছে)`
                  : `Search results for "${searchQuery}" (${filteredTeachers.length} teachers found)`}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                {isBn ? 'রিসেট করুন' : 'Reset'}
              </button>
            </div>
          )}
        </div>

        {/* SECTION 1: INDIVIDUAL TEACHERS & STAFF */}
        {activeCategory !== 'councils' && activeCategory !== 'departments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>
                    {isBn
                      ? 'ব্যক্তিগত শিক্ষক প্রোফাইল (২৫ জন)'
                      : 'Individual Faculty Profiles (25 Members)'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isBn
                    ? 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা এর প্রাতিষ্ঠানিক জনবল তথ্যভাণ্ডার থেকে সরাসরি সংগৃহীত'
                    : 'Directly sourced from the official Dhaka Education Board Institutional Manpower Registry'}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isBn ? 'বোর্ড যাচাইকৃত' : 'Board Verified'}</span>
              </div>
            </div>

            {/* Individual Teachers Grid */}
            {filteredTeachers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map((teacher) => {
                  const isVP = teacher.rank === 'vice-principal';
                  const isAP = teacher.rank === 'assistant-professor';

                  return (
                    <Card
                      key={teacher.id}
                      className={`overflow-hidden border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                        isVP
                          ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/20 dark:bg-amber-950/10'
                          : isAP
                          ? 'border-blue-200 dark:border-blue-800/40 bg-white dark:bg-slate-900'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="p-5 space-y-4">
                        {/* Top Rank Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isVP
                                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700'
                                : isAP
                                ? 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-700'
                                : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700'
                            }`}
                          >
                            {isBn ? teacher.designationBn : teacher.designationEn}
                          </span>

                          <span className="text-[10px] text-slate-400 font-mono">
                            EIIN: 110882
                          </span>
                        </div>

                        {/* Portrait Photo & Names */}
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400/80 dark:border-amber-500 shadow-sm flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                            <Image
                              src={teacher.photoUrl}
                              alt={isBn ? teacher.photoAltBn : teacher.photoAltEn}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          <div className="space-y-1 flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                              {teacher.nameBn}
                            </h3>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                              {teacher.nameEn}
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium pt-0.5">
                              {isBn ? teacher.designationBn : teacher.designationEn}
                            </p>
                          </div>
                        </div>

                        {/* Department / Subject */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-baseline justify-between text-slate-600 dark:text-slate-400">
                            <span className="text-slate-400 text-[11px]">
                              {isBn ? 'বিষয় / বিভাগ:' : 'Subject / Dept:'}
                            </span>
                            <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                              {isBn
                                ? teacher.departmentBn || 'দাপ্তরিক নথিতে সংরক্ষিত'
                                : teacher.departmentEn || 'On Record with Administration'}
                            </span>
                          </div>

                          {/* Mentorship Special Attribution Note */}
                          {teacher.specialNoteBn && (
                            <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                                {isBn ? teacher.specialNoteBn : teacher.specialNoteEn}
                              </span>
                            </div>
                          )}

                          {/* Working Official Email Link */}
                          <div className="pt-2">
                            <a
                              href={`mailto:${teacher.email}`}
                              className="group flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              title={
                                isBn
                                  ? `${teacher.nameBn} কে ইমেইল পাঠান`
                                  : `Send email to ${teacher.nameEn}`
                              }
                            >
                              <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors flex-shrink-0">
                                <Mail className="w-3.5 h-3.5" />
                              </div>
                              <span className="break-all group-hover:underline">
                                {teacher.email.toLowerCase()}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer with Board Citation */}
                      <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isBn ? 'ঢাকা বোর্ড নথিভুক্ত' : 'Board Verified'}</span>
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          {isBn ? 'নুরুল আমিন কলেজ' : 'Nurul Amin College'}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-xl text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <Users className="w-12 h-12 text-slate-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    {isBn ? 'কোনো শিক্ষক পাওয়া যায়নি' : 'No Teachers Found'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    {isBn
                      ? `"${searchQuery}" অনুসন্ধানের সাথে মেলে এমন কোনো অনুমোদিত শিক্ষকের তথ্য পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করে পুনরায় চেষ্টা করুন।`
                      : `No verified faculty records matched "${searchQuery}". Please refine your search criteria.`}
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
                >
                  {isBn ? 'অনুসন্ধান রিসেট করুন' : 'Reset Search'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: COLLECTIVE COUNCILS & GOVERNING BODIES */}
        {(activeCategory === 'all' || activeCategory === 'councils') && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>
                    {isBn
                      ? 'প্রাতিষ্ঠানিক পরিষদ ও পরিচালনা কমিটি'
                      : 'Institutional Councils & Governing Bodies'}
                  </span>
                </h2>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {isBn ? 'যৌথ প্রশাসনিক পরিষদ' : 'Collective Administrative Councils'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isBn
                  ? 'নোট: এই পরিষদসমূহ যৌথ প্রশাসনিক ও সহশিক্ষা সংস্থা; এদের একক শিক্ষক সংখ্যায় অন্তর্ভুক্ত করা হয়নি।'
                  : 'Note: These bodies represent collective governance and athletic committees; they are not counted as individual teachers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCouncils.map((council) => (
                <Card
                  key={council.id}
                  className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {isBn ? council.categoryBn : council.categoryEn}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                          {isBn ? council.titleBn : council.titleEn}
                        </h3>
                      </div>

                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm">
                        <Image
                          src={council.photoUrl}
                          alt={isBn ? council.photoAltBn : council.photoAltEn}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isBn ? council.descBn : council.descEn}
                    </p>
                  </div>

                  <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{isBn ? council.sourceNoteBn : council.sourceNoteEn}</span>
                    <span className="font-medium text-amber-700 dark:text-amber-400">
                      {isBn ? 'কলেজ আর্কাইভ' : 'College Archive'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: ACADEMIC INSTRUCTIONAL DEPARTMENTS */}
        {(activeCategory === 'all' || activeCategory === 'departments') && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>
                    {isBn
                      ? 'অনুমোদিত একাডেমিক বিভাগসমূহ (৫টি বিভাগ)'
                      : 'Academic Instructional Departments (5 Departments)'}
                  </span>
                </h2>

                <Link
                  href="/academics"
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>{isBn ? 'একাডেমিক পেজ দেখুন' : 'View Academics Page'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isBn
                  ? 'ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয় অনুমোদিত পাঠ্যক্রম অনুসারে পরিচালিত অনুষদ'
                  : 'Approved curriculum departments under BISE Dhaka and National University Bangladesh'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => (
                <Card
                  key={dept.id}
                  className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isBn ? dept.nameBn : dept.nameEn}
                      </h3>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                        {isBn ? dept.curriculumBn : dept.curriculumEn}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs">
                      {dept.shortCode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isBn ? dept.descBn : dept.descEn}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {isBn ? 'অন্তর্ভুক্ত বিষয়সমূহ:' : 'Key Disciplines:'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(isBn ? dept.disciplinesBn : dept.disciplinesEn).map(
                        (disc, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {disc}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: ADMINISTRATIVE CONTACT ADVISORY */}
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300">
              {isBn
                ? 'শিক্ষক পরিষদ ও প্রাতিষ্ঠানিক যোগাযোগ তথ্য'
                : 'Faculty Council & Administrative Contact Notice'}
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isBn
                ? 'নুরুল আমিন ডিগ্রি কলেজের শিক্ষক ও কর্মকর্তাদের অফিশিয়াল ইমেইলসমূহ ঢাকা শিক্ষা বোর্ডের প্রাতিষ্ঠানিক ডেটাবেস থেকে সংগৃহীত। ব্যক্তিগত মোবাইল নম্বর জনসম্মুখে প্রকাশ না করে শিক্ষার্থীদের তথ্যের নিরাপত্তার স্বার্থে কলেজ প্রশাসনিক কার্যালয়ে সংরক্ষিত রাখা হয়েছে। প্রাতিষ্ঠানিক যেকোনো প্রয়োজনে কলেজের অফিশিয়াল ইমেইল অথবা সরাসরি কলেজ অফিসে যোগাযোগ করার অনুরোধ করা যাচ্ছে।'
                : 'Official faculty email addresses are verified and published directly from the Board of Intermediate and Secondary Education, Dhaka ERP database. In compliance with institutional privacy standards, personal phone numbers are maintained on record with the college administrative office. For official queries, please contact through the published email links or visit the college administrative building during working hours.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-800 dark:text-amber-400">
              <span>
                {isBn ? 'ইমেইল: ' : 'Email: '}
                <a
                  href={`mailto:${COLLEGE_INFO.contact.email}`}
                  className="underline hover:text-amber-950 dark:hover:text-amber-200"
                >
                  {COLLEGE_INFO.contact.email}
                </a>
              </span>
              <span>
                {isBn ? 'হটলাইন: ' : 'Phone: '}
                <a
                  href={`tel:${COLLEGE_INFO.contact.phone}`}
                  className="underline hover:text-amber-950 dark:hover:text-amber-200"
                >
                  {COLLEGE_INFO.contact.phone}
                </a>
              </span>
              <span>
                {isBn ? 'সময়সূচি: ' : 'Hours: '}
                {isBn ? 'শনিবার - বৃহস্পতিবার (সকাল ৯:০০ - বিকেল ৪:০০)' : 'Saturday - Thursday (9:00 AM - 4:00 PM)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
