'use client';

import React from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Button } from '@/components/ui/Button';
import {
  Home,
  BookOpen,
  Calendar,
  Phone,
  ArrowLeft,
  FileQuestion,
  GraduationCap,
} from 'lucide-react';

export default function NotFound() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      <div className="py-20 sm:py-28 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-6">
        {/* Academic 404 Numerals */}
        <div className="relative inline-block">
          <span className="text-7xl sm:text-9xl font-black tracking-tight text-[var(--color-primary)] dark:text-[var(--color-primary-light)] font-mono opacity-90 select-none">
            404
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[var(--color-accent)]" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-white">
            {isBn ? 'অনুরোধকৃত পাতাটি পাওয়া যায়নি' : 'Page Not Found'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            {isBn
              ? 'আপনি যে পাতাটি খুঁজছেন তা স্থানান্তরিত হয়েছে কিংবা ইউআরএল লিংকে টাইপো থাকতে পারে। নিচের লিংকগুলো ব্যবহার করে মূল সাইটে ফিরে যান।'
              : 'The page you are looking for may have been moved or the URL might contain a typo. Please use the quick links below to explore the portal.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button variant="primary" size="lg" href="/" className="gap-2">
            <Home className="w-4 h-4" />
            <span>{isBn ? 'মূলপাতায় ফিরে যান' : 'Back to Home'}</span>
          </Button>

          <Button variant="outline" size="lg" href="/academics" className="gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{isBn ? 'শিক্ষা কার্যক্রম' : 'Academic Programs'}</span>
          </Button>

          <Button variant="gold" size="lg" href="/notice" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span>{isBn ? 'নোটিশ বোর্ড' : 'Notice Board'}</span>
          </Button>
        </div>

        {/* Directory links */}
        <div className="pt-8 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">
            {isBn ? 'কলেজ পরিচিতি' : 'About College'}
          </Link>
          <Link href="/admission" className="hover:text-[var(--color-primary)] transition-colors">
            {isBn ? 'ভর্তি নির্দেশিকা' : 'Admission'}
          </Link>
          <Link href="/gallery" className="hover:text-[var(--color-primary)] transition-colors">
            {isBn ? 'ফটোগ্যালারি' : 'Photo Gallery'}
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">
            {isBn ? 'যোগাযোগ' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
