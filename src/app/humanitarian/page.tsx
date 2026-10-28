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
  Heart,
  Users,
  Image as ImageIcon,
  Trophy,
  Bus,
  Quote,
  Sparkles,
} from 'lucide-react';

export default function HumanitarianPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'মানবিক সহায়তা ও সামাজিক দায়বদ্ধতা' : 'Humanitarian Relief & Social Responsibility'}
        subtitle={
          isBn
            ? 'সংকটময় মুহূর্তে অসহায় মানুষের পাশে দাঁড়াতে শিক্ষক ও শিক্ষার্থীদের যৌথ সামাজিক ও মানবিক প্রয়াস।'
            : 'Fostering compassion, civic empathy, and disaster relief support for vulnerable communities.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'কলেজ পরিচিতি' : 'About Us',
            href: '/about',
          },
          {
            label: isBn ? 'মানবসেবা ও সমাজকল্যাণ' : 'Humanitarian Initiatives',
          },
        ]}
      />

      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <Card className="overflow-hidden shadow-lg border border-[var(--border-subtle)] space-y-6">
          {/* Main Authentic Humanitarian Photograph */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-slate-100 dark:bg-slate-800">
            <Image
              src="/images/help.jpg"
              alt={isBn ? 'শিক্ষার্থী ও শিক্ষকদের যৌথ মানবিক সহায়তা ও ফান্ড সংগ্রহ' : 'Student and faculty humanitarian relief initiative'}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                {isBn ? 'মানবসেবায় এনএডিসি' : 'NADC in Community Service'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn
                  ? 'অসহায় ও আর্তপীড়িত মানুষের কল্যাণে শিক্ষার্থী উদ্যোগ'
                  : 'Student Initiatives for Community Welfare and Crisis Relief'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'নুরুল আমিন ডিগ্রি কলেজ শিক্ষার্থীদের শুধু পাঠ্যপুস্তকের শিক্ষায় নয়, মানবিক মূল্যবোধ ও সামাজিক দায়িত্ববোধে সমৃদ্ধ করে গড়ে তোলায় বিশ্বাস করে। যেকোনো জাতীয় দুর্যোগ, শীতবস্ত্র বিতরণ কিংবা বন্যা পরিস্থিতিতে শিক্ষকবৃন্দের দিকনির্দেশনায় শিক্ষার্থীরা সক্রিয়ভাবে ত্রাণ তহবিল সংগ্রহ ও বিতরণ কার্যক্রমে অংশগ্রহণ করেন।'
                : 'Nurul Amin Degree College is steadfast in the belief that true education transcends rote learning to embrace empathy and social responsibility. During national disasters, harsh winter chills, or monsoon floods, our students, guided by faculty mentors, actively mobilize community relief campaigns and distribute emergency aid.'}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'শিক্ষার্থীদের এই নিঃস্বার্থ মানবিক প্রয়াস সমাজে ইতিবাচক প্রভাব ফেলার পাশাপাশি তাদের ভেতর পারস্পরিক সহমর্মিতা, নেতৃত্বগুণ এবং সুনাগরিকসুলভ চরিত্র গঠনে অনন্য ভূমিকা রাখে।'
                : 'These selfless humanitarian efforts create lasting positive impacts in the local community while instilling lifelong qualities of collective solidarity, leadership, and public service in our learners.'}
            </p>

            {/* Quote Box */}
            <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 space-y-2">
              <Quote className="w-6 h-6 text-amber-700 dark:text-amber-400 opacity-60" />
              <blockquote className="italic text-sm sm:text-base font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
                {isBn
                  ? '"শিক্ষার আসল সৌন্দর্য মানুষের কল্যাণে নিহিত। আমাদের শিক্ষার্থীরা যেভাবে সংকটময় মুহূর্তে মানুষের পাশে দাঁড়ায়, তা আমাদের সমগ্র কলেজের জন্য এক পরম গর্বের বিষয়।"'
                  : '"The authentic grandeur of education lies in the betterment of humanity. The way our students rally to support people in times of crisis is a matter of profound institutional pride for our college."'}
              </blockquote>
            </div>

            {/* Navigation & Action Links */}
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
                <Button variant="secondary" size="md" href="/tour" className="gap-2">
                  <Bus className="w-4 h-4 text-emerald-600" />
                  <span>{isBn ? 'শিক্ষা সফরের গল্প' : 'Study Tour'}</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
