'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Bus,
  Image as ImageIcon,
  Compass,
  Users,
  Heart,
  Trophy,
  ArrowRight,
  Quote,
} from 'lucide-react';

export default function TourPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'বার্ষিক শিক্ষামূলক ভ্রমণ ও শিক্ষা সফর' : 'Annual Educational Study Tour'}
        subtitle={
          isBn
            ? 'শ্রেণিকক্ষের চার দেয়ালের বাইরে বাস্তব জগতের অভিজ্ঞতা ও সৌহার্দ্যময় ভ্রমণের চিরস্মরণীয় স্মৃতি।'
            : 'Experiential learning, cultural discovery, and unforgettable memories beyond classroom walls.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'কলেজ পরিচিতি' : 'About Us',
            href: '/about',
          },
          {
            label: isBn ? 'শিক্ষা সফর' : 'Study Tour',
          },
        ]}
      />

      {/* Main Narrative & Media */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <Card className="overflow-hidden shadow-lg border border-[var(--border-subtle)] space-y-6">
          {/* Main Authentic Tour Photograph */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-slate-100 dark:bg-slate-800">
            <Image
              src="/images/tour.jpg"
              alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজের বার্ষিক শিক্ষা সফর' : 'Nurul Amin Degree College Annual Study Tour'}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {isBn ? 'ব্যবহারিক শিক্ষা ও ভ্রমণ' : 'Experiential Learning & Excursion'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn
                  ? 'শ্রেণিকক্ষের বাইরে বাস্তব শিক্ষার আনন্দময় অভিজ্ঞতা'
                  : 'Joy of Real-World Learning Beyond the Classroom'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'আমাদের শিক্ষামূলক ভ্রমণ ছিল শিক্ষা, বন্ধুত্ব এবং রোমাঞ্চকর অভিজ্ঞতায় ভরপুর এক চিরস্মরণীয় যাত্রা। এর মাধ্যমে শিক্ষার্থীরা শ্রেণিকক্ষের চার দেয়ালের বাইরে গিয়ে বাস্তব জগতের সাথে পরিচিত হওয়ার এবং ঐতিহাসিক ও ভৌগোলিক নিদর্শন প্রত্যক্ষ করার সুযোগ পায়।'
                : 'Our annual educational excursions offer an enduring journey enriched with intellectual discovery, friendship, and cultural exploration. Students step outside textbook abstractions to engage directly with historical landmarks, geographical sites, and living heritage.'}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'সফরের প্রতিটি পদক্ষেপে শিক্ষার্থীরা পারস্পরিক সহযোগিতা, শৃংখলাবোধ ও টিমওয়ার্কের গুরুত্ব অনুধাবন করেছে। শিক্ষক ও শিক্ষার্থীদের হৃদ্যতাপূর্ণ সান্নিধ্যে এই ভ্রমণ কেবল আনন্দের খোরাকই জোগায়নি, বরং শিক্ষার্থীদের ব্যক্তিত্বের বিকাশ ও মানসিক দিগন্তকে প্রসারিত করেছে।'
                : 'Throughout every step of the excursion, students learn the indispensable values of mutual support, punctuality, and teamwork. The warm mentor-student interactions not only provide joyful memories but also expand intellectual horizons and leadership capabilities.'}
            </p>

            {/* Quote Box */}
            <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 space-y-2">
              <Quote className="w-6 h-6 text-amber-700 dark:text-amber-400 opacity-60" />
              <blockquote className="italic text-sm sm:text-base font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
                {isBn
                  ? '"ভ্রমণ মানুষকে উদার ও অনুসন্ধিৎসু করে। প্রকৃতির সান্নিধ্যে কাটানো এই স্মৃতিময় দিনগুলো শিক্ষার্থীদের হৃদয়ে আজীবন অনুপ্রেরণার আলো হয়ে থাকবে।"'
                  : '"Travel broadens the human spirit and cultivates curiosity. These memorable days spent amidst nature will remain an enduring beacon of inspiration in the hearts of our students."'}
              </blockquote>
            </div>

            {/* Back & Cross-Navigation Buttons */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <Button variant="outline" size="md" href="/gallery" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>{isBn ? 'গ্যালারিতে ফিরে যান' : 'Back to Gallery'}</span>
              </Button>

              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="md" href="/sports" className="gap-2">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span>{isBn ? 'ক্রীড়া ও অ্যাথলেটিকস' : 'Sports Page'}</span>
                </Button>
                <Button variant="secondary" size="md" href="/humanitarian" className="gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>{isBn ? 'মানবসেবা ও ত্রাণ' : 'Humanitarian Work'}</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
