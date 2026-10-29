'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COLLEGE_INFO } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { HeroSlider } from '@/components/layout/HeroSlider';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Calendar,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Building2,
  ExternalLink,
  FileText,
  School,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export function HomePageClient() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Single Fixed Navbar at Top of Viewport */}
      <Navbar onOpenMobileNav={() => setIsMobileNavOpen(true)} />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area with Top Padding Offset for Fixed Navbar */}
      <main id="main-content" className="flex-1 pt-16 sm:pt-18 lg:pt-20">
        {/* Full-Width Hero Banner & Swiper Slider */}
        <HeroSlider />

        {/* ========================================================================= */}
        {/* HERO SECTION: Authentic Institutional Academic Showcase                  */}
        {/* ========================================================================= */}
        <section className="relative bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Institutional Credentials & Headlines */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="verified" size="md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>{isBn ? 'EIIN: ১১০৮৮২ (ঢাকা বোর্ড অনুমোদিত)' : 'EIIN: 110882 (BISE Dhaka Verified)'}</span>
                </Badge>
                <Badge variant="official" size="md">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড: ৬৩০৯' : 'NU College Code: 6309'}</span>
                </Badge>
                <Badge variant="gold" size="md">
                  <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>{isBn ? 'এমপিও: ৩৫০৪০১৩২০১' : 'MPO: 3504013201'}</span>
                </Badge>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-primary)] dark:text-[var(--color-primary-light)] leading-tight">
                  {t('hero_tagline')}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-amber-800 dark:text-amber-400">
                  {t('hero_established')}
                </p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {t('hero_desc')}
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  href="https://xiclassadmission.gov.bd/"
                  isExternal
                  className="gap-2"
                >
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  <span>{t('apply_btn')}</span>
                  <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" aria-hidden="true" />
                </Button>

                <Button variant="gold" size="lg" href="#academics" className="gap-2">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  <span>{t('hero_btn_academic')}</span>
                </Button>

                <Button variant="secondary" size="lg" href="#notices" className="gap-2">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                  <span>{t('hero_btn_notice')}</span>
                </Button>
              </div>

              {/* Campus Address Snippet */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span>
                  {isBn
                    ? COLLEGE_INFO.location.fullAddressBn
                    : COLLEGE_INFO.location.fullAddressEn}
                </span>
              </div>
            </div>

            {/* Right Column: Authentic Campus Building Photo */}
            <div className="lg:col-span-5">
              <Card variant="elevated" padding="none" className="overflow-hidden border-2 border-[var(--border-strong)] shadow-lg group">
                <div className="relative h-64 sm:h-80 w-full bg-slate-900">
                  <Image
                    src="/images/clg1.jpg"
                    alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজ প্রধান একাডেমিক ভবন' : 'Nurul Amin Degree College Main Academic Building'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-0.5">
                      <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                      {isBn ? 'প্রধান প্রশাসনিক ও একাডেমিক ভবন' : 'Main Academic & Admin Building'}
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      {isBn ? 'উমেদপুর, শিবচর, মাদারীপুর' : 'Umedpur, Shibchar, Madaripur'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INSTITUTIONAL METRICS: 4 Verified Academic Stats                           */}
        {/* ========================================================================= */}
        <section className="bg-[var(--bg-primary)] py-8 border-b border-[var(--border-subtle)] px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="standard" padding="sm" className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium">{t('stat_eiin')}</p>
                <p className="text-lg sm:text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] font-mono">
                  {isBn ? '১১০৮৮২' : '110882'}
                </p>
              </div>
            </Card>

            <Card variant="standard" padding="sm" className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center flex-shrink-0">
                <School className="w-6 h-6 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium">{t('stat_nu_code')}</p>
                <p className="text-lg sm:text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] font-mono">
                  {isBn ? '৬৩০৯' : '6309'}
                </p>
              </div>
            </Card>

            <Card variant="standard" padding="sm" className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium">{t('stat_founded')}</p>
                <p className="text-lg sm:text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? '১৯৯৪ (৭ সেপ্টেম্বর)' : '1994 (Sept 7)'}
                </p>
              </div>
            </Card>

            <Card variant="standard" padding="sm" className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium">{t('stat_pass_rate')}</p>
                <p className="text-sm sm:text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'এইচএসসি ও ডিগ্রি' : 'HSC & Degree'}
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRINCIPAL'S WELCOME & FOUNDER RECOGNITION                                */}
        {/* ========================================================================= */}
        <section className="py-14 px-4 sm:px-8 bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Text & Academic Mission */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <Badge variant="official" size="sm" className="mb-2">
                    {t('vp_message_title')}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {t('welcome_title')}
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-accent)] font-semibold mt-1">
                    {t('welcome_subtitle')}
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  <p>{t('welcome_p1')}</p>
                  <p>{t('welcome_p2')}</p>
                </div>

                {/* Academic Leadership Quote */}
                <div className="border-l-4 border-[var(--color-accent)] bg-[var(--bg-muted)] p-4 sm:p-5 rounded-r-xl">
                  <p className="text-sm sm:text-base italic font-medium text-[var(--text-primary)]">
                    &ldquo;{t('vp_quote')}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {t('vp_name')}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">• {t('vp_designation')}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder & Leadership Portrait (Compact, Balanced & Elegant) */}
              <div className="lg:col-span-4 flex justify-center">
                <Card
                  variant="elevated"
                  padding="sm"
                  className="w-full max-w-[240px] sm:max-w-[280px] space-y-3 text-center border-2 border-[var(--border-strong)] shadow-md"
                >
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-slate-900 shadow-inner">
                    <Image
                      src="/images/principal.jpeg"
                      alt={isBn ? 'প্রফেসর ড. নুরুল আমিন বেপারী (প্রতিষ্ঠাতা)' : 'Prof. Dr. Nurul Amin Bepari (Founder)'}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                      className="object-cover object-[32%_30%]"
                    />
                  </div>
                  <div className="px-1 pb-1">
                    <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {isBn ? 'প্রফেসর ড. নুরুল আমিন বেপারী' : COLLEGE_INFO.identity.founder}
                    </h3>
                    <p className="text-xs text-[var(--color-accent)] font-semibold mt-0.5">
                      {isBn ? 'প্রতিষ্ঠাতা ও শিক্ষাবিদ' : 'Founder & Academician'}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                      {isBn
                        ? 'প্রতিষ্ঠাকালীন সভাপতি ও প্রতিষ্ঠাতা • ৭ সেপ্টেম্বর, ১৯৯৪'
                        : 'Founding President & Founder • Sept 7, 1994'}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACADEMIC PROGRAMS: HSC & DEGREE (PASS)                                    */}
        {/* ========================================================================= */}
        <section id="academics" className="py-14 px-4 sm:px-8 bg-[var(--bg-primary)] scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <Badge variant="official" size="sm">
                {t('nav_academics')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {t('academic_section_title')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                {t('academic_section_sub')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Program 1: Higher Secondary Certificate (HSC) */}
              <Card variant="elevated" padding="lg" className="border-t-4 border-[var(--color-primary)] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {t('hsc_subtitle')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                      {t('hsc_title')}
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা-এর শিক্ষাক্রম অনুযায়ী দুই বছর মেয়াদী উচ্চ মাধ্যমিক কোর্স। অভিজ্ঞ শিক্ষক মণ্ডলী দ্বারা নিয়মিত পাঠদান, ব্যবহারিক ল্যাব ও নিয়মিত মডেল টেস্ট গ্রহণ করা হয়।'
                    : 'Two-year Higher Secondary Certificate curriculum affiliated with the Board of Intermediate and Secondary Education, Dhaka, featuring modern science labs and experienced educators.'}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {isBn ? 'শাখা ও বিষয়সমূহ:' : 'Available Disciplines:'}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{isBn ? 'বিজ্ঞান বিভাগ' : 'Science'}</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{isBn ? 'মানবিক বিভাগ' : 'Humanities'}</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{isBn ? 'ব্যবসায় শিক্ষা' : 'Business Studies'}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="md"
                    href="https://xiclassadmission.gov.bd/"
                    isExternal
                    className="w-full sm:w-auto gap-2"
                  >
                    <span>{isBn ? 'একাদশ শ্রেণিতে ভর্তি নির্দেশনা' : 'HSC Admission Info'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Program 2: Degree (Pass) Course */}
              <Card variant="elevated" padding="lg" className="border-t-4 border-[var(--color-accent)] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {t('degree_subtitle')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                      {t('degree_title')}
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <GraduationCap className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'জাতীয় বিশ্ববিদ্যালয়ের আওতাধীন ৩ বছর মেয়াদী ডিগ্রি (পাস) কোর্স। গ্রামীণ জনগোষ্ঠীর উচ্চশিক্ষার সুযোগ সম্প্রসারণে মানসম্মত শিক্ষাদান ও নিয়মিত পরীক্ষা কার্যক্রম পরিচালনা করা হয়।'
                    : 'Three-year Bachelor Degree (Pass) programs under National University, providing accessible quality undergraduate education to students in Shibchar and Madaripur.'}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {isBn ? 'ডিগ্রি পাস কোর্সসমূহ:' : 'Degree Programs:'}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{isBn ? 'বি.এ. (পাস)' : 'B.A. (Pass)'}</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{isBn ? 'বি.এস.এস. (পাস)' : 'B.S.S. (Pass)'}</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-muted)] font-semibold text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{isBn ? 'বি.বি.এস. (পাস)' : 'B.B.S. (Pass)'}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant="gold"
                    size="md"
                    href="https://www.nu.ac.bd/"
                    isExternal
                    className="w-full sm:w-auto gap-2"
                  >
                    <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় ভর্তি পোর্টাল' : 'NU Admission Portal'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LATEST NOTICES: Institutional Announcements & Circulars                   */}
        {/* ========================================================================= */}
        <section id="notices" className="py-14 px-4 sm:px-8 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge variant="official" size="sm" className="mb-2">
                  {t('quick_announcements')}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  {t('latest_notices_title')}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                  {t('latest_notices_sub')}
                </p>
              </div>

              <Link
                href="/notice"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline"
              >
                <span>{t('view_notices')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Notice Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Notice 1: HSC Exam 2026 */}
              <Card variant="standard" padding="md" className="space-y-3 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                      {t('filter_exam')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isBn ? '১৫ অক্টোবর, ২০২৬' : 'Oct 15, 2026'}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {isBn ? 'এইচএসসি পরীক্ষা ২০২৬ ফরম পূরণ ও সময়সূচি নির্দেশনা' : 'HSC Examination 2026 Form Fill-up & Schedule Notice'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                    {isBn
                      ? 'ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডের নির্দেশনা অনুযায়ী একাদশ ও দ্বাদশ শ্রেণির সকল শিক্ষার্থীদের নির্ধারিত তারিখের মধ্যে ফরম পূরণ সম্পন্ন করতে হবে।'
                      : 'All eligible HSC students must complete their examination form fill-up within the specified deadline as per BISE Dhaka circular.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <Link href="/notice" className="text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline inline-flex items-center gap-1">
                    <span>{t('read_more')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>

              {/* Notice 2: Degree Admission */}
              <Card variant="standard" padding="md" className="space-y-3 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {t('filter_admission')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isBn ? '০১ অক্টোবর, ২০২৬' : 'Oct 01, 2026'}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {isBn ? 'ডিগ্রি (পাস) ১ম বর্ষে অনলাইন ভর্তি কার্যক্রম' : 'Degree (Pass) 1st Year Online Admission Notice'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                    {isBn
                      ? 'জাতীয় বিশ্ববিদ্যালয়ের অধীন ২০২৬-২০২৭ শিক্ষাবর্ষে ডিগ্রি (পাস) কোর্সে ভর্তির আবেদন আহ্বান করা হচ্ছে। কলেজ কোড: ৬৩০৯।'
                      : 'Applications are invited for admission to Degree (Pass) courses for the academic year 2026-2027 under National University. College Code: 6309.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <Link href="/notice" className="text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline inline-flex items-center gap-1">
                    <span>{t('read_more')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>

              {/* Notice 3: Class Routine */}
              <Card variant="standard" padding="md" className="space-y-3 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      {t('filter_routine')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isBn ? '২০ সেপ্টেম্বর, ২০২৬' : 'Sep 20, 2026'}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {isBn ? 'একাদশ ও দ্বাদশ শ্রেণির পরিবর্তিত ক্লাস রুটিন' : 'Revised Class Routine for HSC Classes'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                    {isBn
                      ? 'নতুন সেমিস্টার ও ল্যাব ক্লাসের জন্য সংশোধিত ক্লাসরুটিন প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে রুটিন অনুসরণের নির্দেশ দেওয়া হলো।'
                      : 'The revised class timetable including laboratory and practical sessions has been published for all HSC students.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <Link href="/routine" className="text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline inline-flex items-center gap-1">
                    <span>{t('download_routine')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>

              {/* Notice 4: Sports & Culture */}
              <Card variant="standard" padding="md" className="space-y-3 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                      {t('filter_general')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isBn ? '১০ সেপ্টেম্বর, ২০২৬' : 'Sep 10, 2026'}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] leading-snug">
                    {isBn ? 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক সপ্তাহ' : 'Annual Sports Competition & Cultural Week'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                    {isBn
                      ? 'কলেজ ক্যাম্পাসে বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক উৎসব অনুষ্ঠিত হতে যাচ্ছে। ইভেন্টে অংশগ্রহণে আগ্রহীদের নাম জমা দিতে বলা হয়েছে।'
                      : 'Annual college sports and cultural festival preparations are underway. Interested students are requested to register.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <Link href="/gallery" className="text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline inline-flex items-center gap-1">
                    <span>{t('read_more')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CAMPUS LIFE & FACILITIES GALLERY SHOWCASE                                */}
        {/* ========================================================================= */}
        <section className="py-14 px-4 sm:px-8 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="official" size="sm">
                {t('nav_gallery')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {t('facilities_title')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                {t('facilities_sub')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Photo 1: Students */}
              <Card variant="standard" padding="none" className="overflow-hidden border border-[var(--border-strong)] group">
                <div className="relative h-56 w-full bg-slate-900">
                  <Image
                    src="/images/STUDENT.jpg"
                    alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজের শিক্ষার্থীবৃন্দ' : 'Students of Nurul Amin Degree College'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    {isBn ? 'শ্রেণি কার্যক্রম ও শিক্ষার্থীবৃন্দ' : 'Classroom Learning & Students'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {isBn
                      ? 'মনোযোগ ও শৃঙ্খলার সাথে পাঠদান এবং আধুনিক মাল্টিমিডিয়া শ্রেণিকক্ষ।'
                      : 'Interactive classroom instruction with modern digital learning facilities.'}
                  </p>
                </div>
              </Card>

              {/* Photo 2: Faculty */}
              <Card variant="standard" padding="none" className="overflow-hidden border border-[var(--border-strong)] group">
                <div className="relative h-56 w-full bg-slate-900">
                  <Image
                    src="/images/sirs.jpg"
                    alt={isBn ? 'সম্মানিত শিক্ষক পরিষদ ও পরিচালনা পর্ষদ' : 'Honorable Faculty Members and Administration'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    {isBn ? 'অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক পরিষদ' : 'Experienced Faculty Council'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {isBn
                      ? 'উচ্চতর ডিগ্রিধারী অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা নিয়মিত পাঠদান ও তত্ত্বাবধান।'
                      : 'Dedicated and qualified teachers committed to academic guidance.'}
                  </p>
                </div>
              </Card>

              {/* Photo 3: Shaheed Minar & National Heritage */}
              <Card variant="standard" padding="none" className="overflow-hidden border border-[var(--border-strong)] group">
                <div className="relative h-56 w-full bg-slate-900">
                  <Image
                    src="/images/shaheed-minar-national.jpg"
                    alt={isBn ? 'কেন্দ্রীয় শহীদ মিনার ও ভাষা আন্দোলনের স্মৃতি' : 'Central Shaheed Minar & Language Movement Heritage'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    {isBn ? 'জাতীয় শহীদ মিনার ও ভাষা আন্দোলনের চেতনা' : 'National Shaheed Minar & Language Heritage'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {isBn
                      ? 'মহান ভাষা শহিদদের প্রতি বিনম্র শ্রদ্ধা, আন্তর্জাতিক মাতৃভাষা দিবস ও জাতীয় চেতনার প্রতীক।'
                      : 'Honoring the language martyrs, International Mother Language Day, and national pride.'}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OFFICIAL PORTAL VERIFICATION BANNER                                      */}
        {/* ========================================================================= */}
        <section className="bg-[var(--bg-muted)] border-t border-[var(--border-subtle)] py-10 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldCheck className="w-7 h-7 text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--text-primary)]">
                  {t('portal_live_status')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-xl mt-0.5">
                  {t('portal_live_info')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={COLLEGE_INFO.contact.officialBoardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-light)] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                <span>{isBn ? 'ঢাকা শিক্ষা বোর্ড পোর্টাল (EIIN: ১১০৮৮২)' : 'BISE Dhaka Portal (EIIN: 110882)'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.nu.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-bold hover:bg-[var(--bg-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় পোর্টাল' : 'National University Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Academic Footer */}
      <Footer />
    </div>
  );
}
