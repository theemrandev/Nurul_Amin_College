'use client';

import React from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Ban,
  FileCheck,
  Building2,
  ArrowRight,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

export default function RoutinePage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'পরীক্ষার সময়সূচি ও রুটিন নির্দেশিকা' : 'Examination Routine & Schedules'}
        subtitle={
          isBn
            ? 'ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয় কর্তৃক প্রকাশিত পরীক্ষার সর্বশেষ সময়সূচি, নির্দেশিকা ও প্রবেশপত্র তথ্য।'
            : 'Official exam routines, circulars, admit card instructions, and guidelines from BISE Dhaka & National University.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'পরীক্ষার রুটিন' : 'Examination Routine',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>ঢাকা শিক্ষা বোর্ড (EIIN: {COLLEGE_INFO.identity.eiin})</span>
            </Badge>
            <Badge variant="official" size="sm">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>জাতীয় বিশ্ববিদ্যালয় কোড: {COLLEGE_INFO.identity.nuCollegeCode}</span>
            </Badge>
          </div>
        }
      />

      {/* Official Advisory Alert Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-lg shadow-sm">
          <div className="flex items-start gap-3 sm:gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                {isBn ? 'জরুরি নির্দেশনা / Official Authority Notice:' : 'Important Examination Advisory:'}
              </span>
              <p className="text-amber-900 dark:text-amber-300 font-semibold text-sm sm:text-base">
                {isBn
                  ? '"সর্বশেষ রুটিন, ভর্তি বিজ্ঞপ্তি ও পরীক্ষার আপডেটের জন্য সংশ্লিষ্ট কর্তৃপক্ষের অফিসিয়াল ওয়েবসাইট দেখুন।"'
                  : '"For the latest routine, admission notice, and examination updates, please check the official authority’s website."'}
              </p>
              <p className="text-amber-800/80 dark:text-amber-400/80 italic text-xs">
                {isBn
                  ? 'ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের রুটিন সরকারি গ্যাজেট ও কেন্দ্রীয় প্রজ্ঞাপন অনুযায়ী পরিবর্তনযোগ্য।'
                  : 'Routines and examination dates are subject to official board gazettes and university circulars.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Examination Gateways */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
            {isBn ? 'সরাসরি গেটওয়ে' : 'Official Direct Gateways'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            {isBn ? 'সংশ্লিষ্ট কর্তৃপক্ষের অফিসিয়াল পোর্টাল ও রুটিন লিংক' : 'Official Authority Portals & Live Routine Links'}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {isBn
              ? 'নিচের সত্যায়িত লিংকগুলোর মাধ্যমে মূল সরকারি সার্ভার থেকে সর্বশেষ প্রজ্ঞাপন সরাসরি দেখুন।'
              : 'Access the latest examination timetables directly from authoritative government servers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Dhaka Board HSC */}
          <Card className="p-6 flex flex-col justify-between border-t-4 border-t-blue-600">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {isBn ? 'ঢাকা শিক্ষা বোর্ড' : 'BISE Dhaka'}
                </span>
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'ঢাকা শিক্ষা বোর্ড — এইচএসসি কর্নার' : 'BISE Dhaka — HSC Routine Corner'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'এইচএসসি পরীক্ষার অফিসিয়াল সময়সূচি, কেন্দ্র তালিকা, ব্যবহারিক পরীক্ষার বিজ্ঞপ্তি ও সর্বশেষ প্রজ্ঞাপন সরাসরি মূল সার্ভার থেকে দেখুন।'
                  : 'View official HSC examination routines, center lists, practical exam schedules, and circulars directly from the board.'}
              </p>
            </div>

            <div className="pt-6">
              <Button
                variant="primary"
                size="md"
                href="https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner"
                isExternal
                className="w-full justify-center gap-2"
              >
                <span>{isBn ? 'বোর্ড এইচএসসি কর্নারে যান' : 'Visit Dhaka Board Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Card 2: National University */}
          <Card className="p-6 flex flex-col justify-between border-t-4 border-t-emerald-600">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {isBn ? 'জাতীয় বিশ্ববিদ্যালয়' : 'National University'}
                </span>
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'জাতীয় বিশ্ববিদ্যালয় — সাম্প্রতিক নোটিশ ও রুটিন' : 'NU Recent News & Examination Routine'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'ডিগ্রি (পাস) ও অধিভুক্ত কোর্সের কেন্দ্রীয় পরীক্ষার সময়সূচি, কেন্দ্র তালিকা ও সংশোধিত প্রজ্ঞাপনসমূহ দেখুন।'
                  : 'Official Degree Pass examination timetable, revised exam dates, and affiliated college guidelines.'}
              </p>
            </div>

            <div className="pt-6">
              <Button
                variant="outline"
                size="md"
                href="https://www.nu.ac.bd/recent-news-notice.php"
                isExternal
                className="w-full justify-center gap-2 border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950"
              >
                <span>{isBn ? 'এনইউ নোটিশ বোর্ডে যান' : 'Visit NU Notice Board'}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Card 3: College Notice Board */}
          <Card className="p-6 flex flex-col justify-between border-t-4 border-t-amber-600">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {isBn ? 'কলেজ অভ্যন্তরীণ' : 'Internal Notices'}
                </span>
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'কলেজের অভ্যন্তরীণ নোটিশ বোর্ড' : 'College Internal Notice Board'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'কলেজের অভ্যন্তরীণ সেমিস্টার পরীক্ষা, মডেল টেস্ট, ফরম পূরণ ও প্রশাসনিক নির্দেশনাসমূহ নোটিশ বোর্ডে দেখুন।'
                  : 'Check college semester exams, model test schedules, internal evaluations, and administrative circulars.'}
              </p>
            </div>

            <div className="pt-6">
              <Button
                variant="gold"
                size="md"
                href="/notice"
                className="w-full justify-center gap-2"
              >
                <span>{isBn ? 'নোটিশ বোর্ডে যান' : 'Open Notice Board'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Admit Card & Examination Hall Rules */}
      <section id="admit" className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] py-12 sm:py-16 px-4 sm:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'পরীক্ষার্থীদের আচরণবিধি' : 'Candidate Code of Conduct'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'প্রবেশপত্র সংগ্রহ ও পরীক্ষা কেন্দ্র আচরণবিধি' : 'Admit Card Collection & Exam Hall Regulations'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'মূল প্রবেশপত্র সংগ্রহ' : 'Admit Card Collection'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'শিক্ষা বোর্ডের চূড়ান্ত সময়সূচি অনুযায়ী পরীক্ষা শুরুর ন্যূনতম ৫ দিন পূর্বে কলেজ প্রশাসনিক শাখা থেকে অফিসিয়াল সিল ও অধ্যক্ষ মহোদয়ের স্বাক্ষরযুক্ত মূল প্রবেশপত্র এবং রেজিস্ট্রেশন কার্ড সংগ্রহ করতে হবে।'
                  : 'Collect your official sealed admit card signed by the Principal and registration card from the administrative office at least 5 days prior to the start of exams.'}
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'পরীক্ষা কেন্দ্রে সময়মত উপস্থিতি' : 'Punctual Center Arrival'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'পরীক্ষা শুরুর অন্তত ৩০ মিনিট পূর্বে পরীক্ষার্থীকে নির্ধারিত পরীক্ষা কেন্দ্রে আসন গ্রহণ করতে হবে। পরীক্ষা হলের শৃঙ্খলা ও দায়িত্বপ্রাপ্ত পরিদর্শকের নির্দেশ কঠোরভাবে মেনে চলা বাধ্যতামূলক।'
                  : 'Examinees must take their designated seats at least 30 minutes before the scheduled start time. Hall discipline and invigilator instructions must be strictly observed.'}
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  <Ban className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'নিষিদ্ধ ইলেকট্রনিক ডিভাইস' : 'Prohibited Devices'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'সাধারণ নন-প্রোগ্রামেবল সায়েন্টিফিক ক্যালকুলেটর ব্যতীত মোবাইল ফোন, স্মার্ট ঘড়ি কিংবা যেকোনো ধরনের প্রোগ্রামিং বা ইলেকট্রনিক ডিভাইস পরীক্ষা কেন্দ্রে বহন সম্পূর্ণরূপে নিষিদ্ধ।'
                  : 'Except for approved non-programmable scientific calculators, mobile phones, smart watches, and unauthorized electronic devices are strictly prohibited inside the hall.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Institutional Metadata & Codes Summary */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
          <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            {isBn ? 'পরীক্ষার্থীদের জন্য প্রয়োজনীয় প্রাতিষ্ঠানিক কোডসমূহ' : 'Institutional Examination Identification Codes'}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] font-mono text-xs sm:text-sm font-semibold text-[var(--color-primary)] dark:text-amber-300">
              EIIN: {COLLEGE_INFO.identity.eiin} ({isBn ? 'ঢাকা শিক্ষা বোর্ড' : 'BISE Dhaka'})
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] font-mono text-xs sm:text-sm font-semibold text-[var(--color-primary)] dark:text-amber-300">
              {isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড:' : 'NU College Code:'} {COLLEGE_INFO.identity.nuCollegeCode}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] font-mono text-xs sm:text-sm font-semibold text-[var(--color-primary)] dark:text-amber-300">
              {isBn ? 'এমপিও ইনডেক্স:' : 'MPO Index:'} {COLLEGE_INFO.identity.mpoCode}
            </span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
