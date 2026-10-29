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
  Trophy,
  Users,
  Image as ImageIcon,
  Heart,
  Bus,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function SportsClient() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'ক্রীড়া সংস্কৃতি ও অ্যাথলেটিকস' : 'Sports Culture & Athletics'}
        subtitle={
          isBn
            ? 'খেলার মাঠে শিক্ষক-শিক্ষার্থীদের স্বতঃস্ফূর্ত মেলবন্ধন, দলগত একতা ও শারীরিক উৎকর্ষ সাধন।'
            : 'Fostering physical well-being, team camaraderie, and sportsmanship on the expansive college grounds.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'কলেজ পরিচিতি' : 'About Us',
            href: '/about',
          },
          {
            label: isBn ? 'ক্রীড়া ও শরীরচর্চা' : 'Sports & Athletics',
          },
        ]}
      />

      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
        {/* Story 1: Teachers at the Ground */}
        <Card className="overflow-hidden shadow-lg border border-[var(--border-subtle)] space-y-6">
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-slate-100 dark:bg-slate-800">
            <Image
              src="/images/sirs.jpg"
              alt={isBn ? 'শিক্ষার্থীদের খেলা উপভোগ করছেন শ্রদ্ধেয় শিক্ষকবৃন্দ' : 'Faculty mentors observing student football match'}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              {isBn ? 'শিক্ষক-শিক্ষার্থী মেলবন্ধন' : 'Mentor-Student Bond'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'মাঠে শ্রদ্ধেয় শিক্ষকদের সান্নিধ্য ও অনুপ্রেরণা' : 'Faculty Presence & Encouragement on the Ground'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'ফুটবল নুরুল আমিন ডিগ্রি কলেজের শিক্ষার্থীদের মাঝে সর্বাধিক জনপ্রিয় ও উদ্দীপনামূলক ক্রীড়া ইভেন্ট। পড়াশোনার পাশাপাশি শারীরিক সক্ষমতা ও মানসিক প্রফুল্লতা বজায় রাখতে কলেজ প্রশাসন সর্বদাই ক্রীড়াচর্চাকে উৎসাহিত করে আসছে। আমাদের সম্মানিত অধ্যক্ষ ও শ্রদ্ধেয় শিক্ষকমণ্ডলী মাঠে উপস্থিত হয়ে গভীর আগ্রহ ও উদ্দীপনার সাথে ফুটবল ম্যাচ উপভোগ করেন।'
                : 'Football stands as the most vibrant sporting tradition among our students. Alongside rigorous classroom studies, college leadership actively champions sports to nurture physical vitality, resilience, and mental wellness. Our respected Principal and teachers regularly attend campus matches, offering heartfelt motivation and guidance.'}
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'খেলার মাঠে শিক্ষকদের এই আন্তরিক সান্নিধ্য শিক্ষার্থীদের আত্মবিশ্বাস ও শৃঙ্খলাবোধ বৃদ্ধি করে। এটি শিক্ষক ও শিক্ষার্থীদের পারস্পরিক শ্রদ্ধাবোধ ও ভালোবাসার সম্পর্ককে আরও সুদৃঢ় করে তোলে।'
                : 'The mentors’ engaging presence on the sidelines builds confidence, mutual respect, and discipline, deepening the bond between educators and learners.'}
            </p>
          </div>
        </Card>

        {/* Story 2: The College Football Squad */}
        <Card className="overflow-hidden shadow-lg border border-[var(--border-subtle)] space-y-6">
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-slate-100 dark:bg-slate-800">
            <Image
              src="/images/1000106354.jpg"
              alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজ ফুটবল দলের খেলোয়াড়বৃন্দ' : 'Nurul Amin Degree College Football Squad'}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {isBn ? 'খেলোয়াড় একতা' : 'Athletic Squad Unity'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'ঐক্য ও সংকল্পে ভাস্বর কলেজ ফুটবল দল' : 'Unity, Passion & Athletic Spirit of the College Team'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'নুরুল আমিন ডিগ্রি কলেজের শিক্ষার্থীরা গর্বের সাথে ক্রীড়াঙ্গনে নিজেদের বিদ্যাপীঠের প্রতিনিধিত্ব করে। ইউনিফর্মে সজ্জিত তরুণ ফুটবলারদের হাসিমুখ প্রমাণ করে তাদের বন্ধুত্ব, নিষ্ঠা ও দলগত স্পৃহা।'
                : 'Our students represent the college with pride and distinction across regional tournaments. The cheerful determination of the young athletes in their team jerseys exemplifies genuine sportsmanship, teamwork, and institutional loyalty.'}
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'কলেজের সুবিশাল সবুজ মাঠটি কেবল ফুটবল বা ক্রিকেট খেলার জায়গাই নয়; এটি সততা, হার না মানা মানসিকতা এবং সুস্থ প্রতিযোগিতার এক মহান শিক্ষাঙ্গন।'
                : 'The college’s expansive green playfield serves not merely as a playing ground, but as an open-air classroom for integrity, unyielding perseverance, and healthy athletic competition.'}
            </p>
          </div>
        </Card>

        {/* Navigation & Action Links */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
          <Button variant="outline" size="md" href="/gallery" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>{isBn ? 'গ্যালারিতে ফিরে যান' : 'Back to Gallery'}</span>
          </Button>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="md" href="/tour" className="gap-2">
              <Bus className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? 'শিক্ষা সফরের গল্প' : 'Study Tour'}</span>
            </Button>
            <Button variant="secondary" size="md" href="/humanitarian" className="gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>{isBn ? 'মানবসেবা ও ত্রাণ' : 'Humanitarian Work'}</span>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
