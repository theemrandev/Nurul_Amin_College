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
  GraduationCap,
  BookOpen,
  FlaskConical,
  BookMarked,
  Briefcase,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
} from 'lucide-react';

export function AcademicsClient() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'শিক্ষা কার্যক্রম ও কোর্স বিবরণী' : 'Academic Programs & Curriculum'}
        subtitle={
          isBn
            ? 'ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের আওতাধীন এইচএসসি এবং ৩ বছর মেয়াদী ডিগ্রি (পাস) কোর্স।'
            : 'HSC programs and 3-Year Degree (Pass) courses affiliated with BISE Dhaka and National University.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'শিক্ষা কার্যক্রম' : 'Academics',
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

      {/* Program Navigation Pills */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-[var(--color-primary)] dark:text-amber-300 mr-1">
            {isBn ? 'বিভাগ নির্বাচন:' : 'Jump to Program:'}
          </span>
          <a
            href="#hsc"
            className="px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            {isBn ? 'উচ্চমাধ্যমিক (এইচএসসি)' : 'HSC Programs'}
          </a>
          <a
            href="#degree-pass"
            className="px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            {isBn ? 'ডিগ্রি (পাস) কোর্সসমূহ' : 'Degree (Pass) Courses'}
          </a>
          <Link
            href="/routine"
            className="px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? 'পরীক্ষার সময়সূচি ও রুটিন' : 'Exam Routines'}</span>
          </Link>
          <Link
            href="/admission"
            className="px-3 py-1.5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] dark:text-amber-300 border border-[var(--border-subtle)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5 font-semibold"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isBn ? 'ভর্তি নির্দেশিকা' : 'Admission Guidelines'}</span>
          </Link>
        </div>
      </section>

      {/* Official Advisory Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-lg shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-amber-900 dark:text-amber-200">
                {isBn ? 'জরুরি নির্দেশনা / Official Authority Advisory:' : 'Important Academic Advisory:'}
              </span>
              <p className="text-amber-800 dark:text-amber-300 font-medium">
                {isBn
                  ? 'সর্বশেষ রুটিন, ভর্তি বিজ্ঞপ্তি ও পরীক্ষার আপডেটের জন্য সংশ্লিষ্ট কর্তৃপক্ষের অফিসিয়াল ওয়েবসাইট দেখুন।'
                  : 'For the latest routine, admission notice, and examination updates, please check the official authority’s website.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. HSC Curriculum Section                                                 */}
      {/* ========================================================================= */}
      <section id="hsc" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'উচ্চমাধ্যমিক স্তর (ঢাকা শিক্ষা বোর্ড)' : 'Higher Secondary Level (BISE Dhaka)'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'এইচএসসি পাঠ্যক্রম ও শাখাসমূহ' : 'HSC Curriculum & Academic Groups'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় পূর্ণাঙ্গ ও যুগোপযোগী সিলেবাস অনুযায়ী দক্ষ শিক্ষকমণ্ডলী দ্বারা পাঠদান।'
                : 'Comprehensive teaching across Science, Humanities, and Business Studies adhering to modern NCTB curriculum.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Science */}
            <Card className="flex flex-col border-t-4 border-t-blue-600">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {isBn ? 'বিজ্ঞান বিভাগ' : 'Science'}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {isBn ? 'এইচএসসি বিজ্ঞান শাখা' : 'HSC Science Group'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'চিকিৎসা বিজ্ঞান, প্রকৌশল, প্রযুক্তি ও সাধারণ বিজ্ঞান বিষয়ে বিশ্ববিদ্যালয় পর্যায়ে উচ্চশিক্ষার জন্য সুদৃঢ় ভিত্তি গড়ে তোলে।'
                    : 'Builds a rigorous foundation for higher studies in medical sciences, engineering, technology, and applied research.'}
                </p>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold text-[var(--color-primary)] dark:text-amber-300 block">
                    {isBn ? 'আবশ্যিক ও নৈর্বাচনিক বিষয়সমূহ:' : 'Core & Elective Subjects:'}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {isBn
                      ? 'বাংলা, ইংরেজি, তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি), পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং উচ্চতর গণিত।'
                      : 'Bangla, English, ICT, Physics, Chemistry, Biology, and Higher Mathematics.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-xs text-amber-800 dark:text-amber-400 font-semibold">
                {isBn ? 'ভর্তির ন্যূনতম যোগ্যতা: এসএসসি পরীক্ষায় বিজ্ঞান বিভাগে জিপিএ ৩.০০' : 'Eligibility: Minimum SSC GPA 3.00 in Science Group'}
              </div>
            </Card>

            {/* Humanities */}
            <Card className="flex flex-col border-t-4 border-t-emerald-600">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <BookMarked className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      {isBn ? 'মানবিক বিভাগ' : 'Humanities'}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {isBn ? 'এইচএসসি মানবিক শাখা' : 'HSC Humanities Group'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'আইন, বিসিএস ও জনপ্রশাসন, সমাজবিজ্ঞান, সাহিত্য ও শিক্ষকতা পেশায় আগ্রহী শিক্ষার্থীদের জন্য আদর্শ পাঠ্যধারা।'
                    : 'Ideal curriculum for students aiming for careers in Law, Public Administration, Social Work, Literature, and Teaching.'}
                </p>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold text-[var(--color-primary)] dark:text-amber-300 block">
                    {isBn ? 'আবশ্যিক ও নৈর্বাচনিক বিষয়সমূহ:' : 'Core & Elective Subjects:'}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {isBn
                      ? 'বাংলা, ইংরেজি, আইসিটি, পৌরনীতি ও সুশাসন, অর্থনীতি, যুক্তিবিদ্যা, ইসলামের ইতিহাস ও সংস্কৃতি / ইতিহাস।'
                      : 'Bangla, English, ICT, Civics & Good Governance, Economics, Logic, and Islamic History / History.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-xs text-amber-800 dark:text-amber-400 font-semibold">
                {isBn ? 'ভর্তির ন্যূনতম যোগ্যতা: এসএসসি পরীক্ষায় যেকোনো বিভাগ থেকে জিপিএ ২.০০' : 'Eligibility: Minimum SSC GPA 2.00 from any discipline'}
              </div>
            </Card>

            {/* Business Studies */}
            <Card className="flex flex-col border-t-4 border-t-amber-600">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {isBn ? 'ব্যবসায় শিক্ষা' : 'Business Studies'}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {isBn ? 'এইচএসসি ব্যবসায় শিক্ষা শাখা' : 'HSC Business Studies'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'হিসাববিজ্ঞান, ব্যাংকিং, করপোরেট ব্যবস্থাপনা ও সফল উদ্যোক্তা হওয়ার বাস্তবসম্মত ও ব্যবহারিক জ্ঞান প্রদান করে।'
                    : 'Provides practical grounding in Accounting, Banking, Corporate Finance, Management, and Entrepreneurship.'}
                </p>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold text-[var(--color-primary)] dark:text-amber-300 block">
                    {isBn ? 'আবশ্যিক ও নৈর্বাচনিক বিষয়সমূহ:' : 'Core & Elective Subjects:'}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {isBn
                      ? 'বাংলা, ইংরেজি, আইসিটি, হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা, ফিন্যান্স ও ব্যাংকিং / উৎপাদন ব্যবস্থাপনা।'
                      : 'Bangla, English, ICT, Accounting, Business Organization & Management, and Finance & Banking.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-xs text-amber-800 dark:text-amber-400 font-semibold">
                {isBn ? 'ভর্তির ন্যূনতম যোগ্যতা: এসএসসি পরীক্ষায় যেকোনো বিভাগ থেকে জিপিএ ২.৫০' : 'Eligibility: Minimum SSC GPA 2.50 from any discipline'}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Degree Pass Section (National University)                              */}
      {/* ========================================================================= */}
      <section id="degree-pass" className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] py-12 px-4 sm:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'স্নাতক স্তর (জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত)' : 'Undergraduate Level (National University)'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'ডিগ্রি (পাস) ৩ বছর মেয়াদী কোর্সসমূহ' : '3-Year Degree (Pass) Academic Programs'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'জাতীয় বিশ্ববিদ্যালয়ের কলেজ কোড ৬৩০৯-এর আওতায় ৩ বছর মেয়াদী ডিগ্রি কোর্সসমূহ।'
                : 'National University affiliated Degree (Pass) courses under Institutional College Code: 6309.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BA */}
            <Card className="p-5 space-y-3 border-t-4 border-t-[var(--color-primary)]">
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-[var(--color-primary)] dark:text-amber-400 font-mono">
                {isBn ? 'কোর্স কোড: ৬০০১' : 'Code: 6001'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'বি.এ. পাস (Bachelor of Arts)' : 'B.A. Pass'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'কলা অনুষদভুক্ত ৩ বছর মেয়াদী ডিগ্রি কোর্স। সাহিত্য, সমাজ ও মানবিক ভাবনার গভীরতর পর্যালোচনা।'
                  : 'Faculty of Arts 3-year undergraduate degree exploring language, culture, and civilization.'}
              </p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 pt-2 border-t border-[var(--border-subtle)]">
                <li>• {isBn ? 'বাংলা ও ইংরেজি ভাষা ও সাহিত্য' : 'Bangla & English Literature'}</li>
                <li>• {isBn ? 'ইতিহাস ও ইসলামের ইতিহাস' : 'History & Islamic History'}</li>
                <li>• {isBn ? 'দর্শন ও ইসলামিক স্টাডিজ' : 'Philosophy & Islamic Studies'}</li>
              </ul>
            </Card>

            {/* BSS */}
            <Card className="p-5 space-y-3 border-t-4 border-t-emerald-600">
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-[var(--color-primary)] dark:text-amber-400 font-mono">
                {isBn ? 'কোর্স কোড: ৬০০২' : 'Code: 6002'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'বি.এস.এস. পাস (Bachelor of Social Science)' : 'B.S.S. Pass'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'সামাজিক বিজ্ঞান অনুষদের অন্যতম জনপ্রিয় কোর্স। রাষ্ট্রবিজ্ঞান, অর্থনীতি ও সমাজতাত্ত্বিক জ্ঞানের সমন্বয়।'
                  : 'Popular Social Science curriculum combining Political Science, Economics, and Sociology.'}
              </p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 pt-2 border-t border-[var(--border-subtle)]">
                <li>• {isBn ? 'রাষ্ট্রবিজ্ঞান ও আন্তর্জাতিক সম্পর্ক' : 'Political Science & Gov'}</li>
                <li>• {isBn ? 'অর্থনীতি ও সামাজিক বিশ্লেষণ' : 'Economics & Analysis'}</li>
                <li>• {isBn ? 'সমাজবিজ্ঞান ও সমাজকল্যাণ' : 'Sociology & Social Welfare'}</li>
              </ul>
            </Card>

            {/* BBS */}
            <Card className="p-5 space-y-3 border-t-4 border-t-amber-600">
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-[var(--color-primary)] dark:text-amber-400 font-mono">
                {isBn ? 'কোর্স কোড: ৬০০৪' : 'Code: 6004'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'বি.বি.এস. পাস (Bachelor of Business Studies)' : 'B.B.S. Pass'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'ব্যবসায় শিক্ষা শিক্ষার্থীদের স্নাতক স্তরের ডিগ্রি। হিসাবরক্ষণ ও বাণিজ্যিক ব্যবস্থাপনার খুঁটিনাটি।'
                  : 'Undergraduate business curriculum focusing on Accounting, Finance, and Enterprise Management.'}
              </p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 pt-2 border-t border-[var(--border-subtle)]">
                <li>• {isBn ? 'উচ্চতর হিসাববিজ্ঞান ও নিরীক্ষা' : 'Advanced Accounting & Audit'}</li>
                <li>• {isBn ? 'ব্যবসায় সংগঠন ও যোগাযোগ' : 'Business Organization'}</li>
                <li>• {isBn ? 'মার্কেটিং ও ফিন্যান্স' : 'Marketing & Finance'}</li>
              </ul>
            </Card>

            {/* BSc */}
            <Card className="p-5 space-y-3 border-t-4 border-t-blue-600">
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-[var(--color-primary)] dark:text-amber-400 font-mono">
                {isBn ? 'কোর্স কোড: ৬০০৩' : 'Code: 6003'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'বি.এসসি. পাস (Bachelor of Science)' : 'B.Sc. Pass'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'বিজ্ঞান বিভাগের শিক্ষার্থীদের ৩ বছর মেয়াদী স্নাতক বিজ্ঞান কোর্স।'
                  : '3-year Science degree curriculum for undergraduate science students.'}
              </p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 pt-2 border-t border-[var(--border-subtle)]">
                <li>• {isBn ? 'পদার্থবিজ্ঞান ও রসায়ন' : 'Physics & Chemistry'}</li>
                <li>• {isBn ? 'গণিত ও ব্যবহারিক প্রয়োগ' : 'Mathematics & Lab Practicals'}</li>
                <li>• {isBn ? 'উদ্ভিদবিজ্ঞান ও প্রাণিবিজ্ঞান' : 'Botany & Zoology'}</li>
              </ul>
            </Card>
          </div>

          <div className="p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--color-primary)] dark:text-amber-300 mr-1">
              * {isBn ? 'প্রাতিষ্ঠানিক ভর্তি তথ্য নোট:' : 'Institutional Enrollment Note:'}
            </span>
            {isBn
              ? 'বি.এ. (৬০০১) ও বি.এস.এস. (৬০০২) অত্র কলেজের মূল চালুকৃত ডিগ্রি পাস শাখা। বি.এসসি. ও বি.বি.এস. শাখা অনলাইন শিক্ষা ডিরেক্টরিতে তালিকাভুক্ত হলেও বর্তমান সেশনের আসন সংখ্যা সরাসরি কলেজ প্রশাসনিক দপ্তর থেকে যাচাইযোগ্য।'
              : 'B.A. (6001) and B.S.S. (6002) are the primary active degree pass faculties. B.Sc. and B.B.S. seats for current sessions can be verified directly at the college administrative office.'}
          </div>
        </div>
      </section>

      {/* Official Portals & Gateways */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'সরকারি শিক্ষা পোর্টাল গেটওয়ে' : 'Official Educational Gateways'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'বোর্ড ও বিশ্ববিদ্যালয় কেন্দ্রীয় সার্ভিস' : 'Board & University Central Portals'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5 space-y-3">
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'ঢাকা শিক্ষা বোর্ড (HSC Corner)' : 'BISE Dhaka (HSC Corner)'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {isBn
                  ? 'ঢাকা শিক্ষা বোর্ডের প্রজ্ঞাপন, রেজিস্ট্রেশন ও বোর্ড ফলাফল সংক্রান্ত সেবা।'
                  : 'Official circulars, registration guidelines, and examination results.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                href="https://deb110882.dhakaeducationboard.gov.bd/"
                isExternal
                className="w-full justify-center gap-1.5"
              >
                <span>{isBn ? 'বোর্ড পোর্টালে যান' : 'Visit BISE Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Card>

            <Card className="p-5 space-y-3">
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'জাতীয় বিশ্ববিদ্যালয় অফিসিয়াল' : 'National University (Main)'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {isBn
                  ? 'ডিগ্রি (পাস) কোর্সের কেন্দ্রীয় নোটিশ, পরীক্ষার সময়সূচি ও সার্কুলার।'
                  : 'Central exam routines, circulars, and notifications for affiliated colleges.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                href="https://www.nu.ac.bd/"
                isExternal
                className="w-full justify-center gap-1.5"
              >
                <span>{isBn ? 'এনইউ পোর্টালে যান' : 'Visit NU Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Card>

            <Card className="p-5 space-y-3">
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'এনইউ ফলাফল পোর্টাল' : 'NU Results Portal'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {isBn
                  ? 'ডিগ্রি পাস প্রথম, দ্বিতীয় ও তৃতীয় বর্ষের বোর্ড ফলাফল যাচাই।'
                  : 'Online portal for checking Degree Pass Year 1, Year 2, and Year 3 results.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                href="http://results.nu.ac.bd/"
                isExternal
                className="w-full justify-center gap-1.5"
              >
                <span>{isBn ? 'ফলাফল চেক করুন' : 'Check Results'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
