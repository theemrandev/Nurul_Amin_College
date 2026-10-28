'use client';

import React from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Code,
  Laptop,
  Heart,
  Sparkles,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function CreditsPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'শিক্ষার্থী উদ্যোগ ও প্রজেক্টের ইতিহাস' : 'Student Initiative & Project Evolution'}
        subtitle={
          isBn
            ? 'নুরুল আমিন ডিগ্রি কলেজের ডিজিটাল উপস্থিতির সূচনা, শিক্ষার্থী অবদান ও প্রাতিষ্ঠানিক রূপান্তরের কাহিনী।'
            : 'The origin story, student initiative, and transformation into a modern institutional academic portal.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'কলেজ পরিচিতি' : 'About Us',
            href: '/about',
          },
          {
            label: isBn ? 'প্রজেক্ট পরিচিতি ও কৃতিত্ব' : 'Project Credits',
          },
        ]}
      />

      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <Card className="p-6 sm:p-10 space-y-6 border-t-4 border-t-[var(--color-accent)] shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-[var(--color-accent)] flex items-center justify-center text-amber-800 dark:text-amber-400 flex-shrink-0 shadow-inner">
              <Laptop className="w-12 h-12" />
            </div>

            <div className="space-y-1.5 flex-1">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {isBn ? 'মূল ডেমো উদ্যোগ ও ডেভেলপমেন্ট' : 'Initial Prototype & Student Development'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'আহমেদ ইমরান (Ahmed Emran)' : 'Ahmed Emran'}
              </h2>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                {isBn
                  ? 'এইচএসসি ব্যাচ ২০২৫, নুরুল আমিন ডিগ্রি কলেজ, শিবচর'
                  : 'HSC Batch 2025, Nurul Amin Degree College, Shibchar'}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {isBn ? 'শিক্ষার্থী, ক্রিয়েটিভ আইটি ইনস্টিটিউট (Creative IT Institute)' : 'Learner, Creative IT Institute'}
              </p>
            </div>
          </div>

          {/* Acknowledgments & Inspiration Box */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-amber-300 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>{isBn ? 'কৃতজ্ঞতা ও অনুপ্রেরণা' : 'Inspirations & Acknowledgments'}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {isBn ? 'প্রথম কোডিং শিক্ষক ও অনুপ্রেরণা:' : 'First Coding Teacher & Mentor:'}
                  </strong>{' '}
                  {isBn ? 'মোঃ জাহাঙ্গীর স্যার (আইসিটি শিক্ষক, নুরুল আমিন ডিগ্রি কলেজ)' : 'Md. Jahangir Sir (ICT Teacher, NADC)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {isBn ? 'পরিকল্পনা ও ধারণা সহায়তা:' : 'Concept & Planning Support:'}
                  </strong>{' '}
                  {isBn ? 'শাকিবুল হাসান (এইচএসসি ব্যাচ ২০২৫, এনএডিসি)' : 'Shakibul Hasan (HSC Batch 2025, NADC)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {isBn ? 'ক্যাম্পাস ফটোগ্রাফি ও তথ্য সহায়তা:' : 'Photography & Data Assistance:'}
                  </strong>{' '}
                  {isBn ? 'নূর হোসেন (এইচএসসি ব্যাচ ২০২৫, এনএডিসি)' : 'Nur Hossain (HSC Batch 2025, NADC)'}
                </span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Story: Background of the initiative */}
        <Card className="p-6 sm:p-8 space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
            {isBn ? 'উদ্যোগের পটভূমি' : 'Background Story'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            {isBn ? 'কেন এই ওয়েবসাইটটি তৈরি করা হয়েছিল?' : 'Why Was This Portal Conceived?'}
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {isBn
              ? 'মাদারীপুরের শিবচরের বিভিন্ন শিক্ষা প্রতিষ্ঠানের আধুনিক ডিজিটাল পোর্টাল থাকলেও, ঐতিহ্যবাহী নুরুল আমিন ডিগ্রি কলেজের একটি প্রাতিষ্ঠানিক ওয়েব উপস্থিতির অভাব দীর্ঘদিন ধরে অনুভূত হচ্ছিল। এই শূন্যতা উপলব্ধি করে এইচএসসি ২০২৫ ব্যাচের শিক্ষার্থী আহমেদ ইমরান তাঁর শিক্ষক মোঃ জাহাঙ্গীর স্যারের অনুপ্রেরণায় এবং বন্ধুদের সহযোগিতায় একটি আধুনিক ডেমো ওয়েবসাইট তৈরির চ্যালেঞ্জ গ্রহণ করেন।'
              : 'While various schools and colleges in Shibchar, Madaripur maintained digital presences, the historic Nurul Amin Degree College lacked an authentic modern institutional portal. Recognizing this gap, Ahmed Emran, an HSC 2025 student, encouraged by his ICT teacher Md. Jahangir Sir and assisted by classmates, undertook the ambitious initiative to create a dedicated prototype.'}
          </p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {isBn
              ? 'নিজেদের ক্যামেরায় ক্যাম্পাসের সবুজ খেলার মাঠ, একাডেমিক ভবন, শহীদ মিনার, শিক্ষা সফর ও ক্রীড়া মুহূর্তের বাস্তব আলোকচিত্র ধারণ করে ওয়েবসাইটে সন্নিবেশিত করা হয়। পরবর্তীতে এই শিক্ষার্থী উদ্যোগকে সরকারি শিক্ষা বোর্ড (EIIN: ১১০৮৮২), জাতীয় বিশ্ববিদ্যালয় (কোড: ৬৩০৯) এবং ব্যানবেইসের তথ্যের সাথে সমন্বয় করে একটি পূর্ণাঙ্গ ও দায়িত্বশীল প্রাতিষ্ঠানিক পোর্টালে রূপান্তরিত করা হয়েছে।'
              : 'Using their personal cameras, the students captured authentic photographs of the expansive playing field, academic buildings, Shaheed Minar, annual study tours, and sports matches. That student-led effort has now been elevated into a verified institutional portal backed by official BISE Dhaka records (EIIN: 110882) and National University affiliations (Code: 6309).'}
          </p>
        </Card>

        {/* Architectural Evolution Timeline */}
        <Card className="p-6 sm:p-8 space-y-6">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
            {isBn ? 'প্রজেক্টের রূপান্তর' : 'Architectural Evolution'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            {isBn ? 'শিক্ষার্থী প্রোটোটাইপ থেকে পূর্ণাঙ্গ প্রাতিষ্ঠানিক পোর্টাল' : 'From Student Prototype to Enterprise Institutional Portal'}
          </h3>

          <div className="space-y-6 border-l-2 border-[var(--color-accent)] pl-5 sm:pl-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                {isBn ? 'পর্যায় ১ • শিক্ষার্থী উদ্যোগ ও সৃজনশীলতা' : 'Phase 1 • Student Dedication'}
              </span>
              <h4 className="text-base font-bold text-[var(--color-primary)] dark:text-white">
                {isBn ? 'প্রাথমিক ধারণা ও ক্যাম্পাস ফটোগ্রাফি' : 'Initial Concept & Real Campus Photography'}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'আহমেদ ইমরান ও তাঁর সহপাঠীরা কলেজের প্রথম ওয়েব প্রোটোটাইপ তৈরি করেন, পরীক্ষার রুটিন ডিজিটালাইজ করেন এবং ১৭টিরও বেশি আসল আলোকচিত্র সংরক্ষণ করেন।'
                  : 'Ahmed Emran and peers built the original website prototype, digitalized academic routines, and preserved authentic campus photographs.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                {isBn ? 'পর্যায় ২ • তথ্য যাচাই ও সরকারি শুদ্ধিকরণ' : 'Phase 2 • Verification & Compliance'}
              </span>
              <h4 className="text-base font-bold text-[var(--color-primary)] dark:text-white">
                {isBn ? 'প্রাতিষ্ঠানিক সনাক্তকরণ ও কোড ম্যাপিং' : 'Official Credentials & Institutional Standards'}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'ব্যানবেইস, ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের তথ্যের আলোকে সঠিক EIIN (১১০৮৮২), কলেজ কোড (৬৩০৯) এবং ৪টি ডিগ্রি পাস কোর্স নির্ভুলভাবে প্রতিষ্ঠিত করা হয়।'
                  : 'Mapped and verified official BANBEIS, BISE Dhaka, and National University records to ensure legal accuracy and public transparency.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                {isBn ? 'পর্যায় ৩ • আধুনিক Next.js App Router আর্কিটেকচার' : 'Phase 3 • Next.js App Router Engineering'}
              </span>
              <h4 className="text-base font-bold text-[var(--color-primary)] dark:text-white">
                {isBn ? 'দ্বিভাষিক ব্যবস্থা, থিম পারসিস্টেন্স ও এক্সেসিবিলিটি' : 'Bilingual Engine, Dark Mode & WCAG Accessibility'}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'বাংলাকে প্রথম শ্রেণির ভাষার মর্যাদা দিয়ে লাইট/ডার্ক মোড, রেসপনসিভ নেভিগেশন ও স্ক্রিন রিডার বান্ধব আধুনিক ওয়েব পোর্টালে রূপান্তর।'
                  : 'Transformed into a fast, responsive, and bilingual web application with dark/light theme persistence and WCAG contrast compliance.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Button variant="primary" size="md" href="/about" className="gap-2">
            <span>{isBn ? 'কলেজ পরিচিতিতে ফিরে যান' : 'Back to About College'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
