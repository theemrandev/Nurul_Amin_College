'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Landmark,
  Target,
  Compass,
  Users,
  Award,
  BookOpen,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  Trophy,
  Bus,
  Heart,
  Code,
} from 'lucide-react';

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'কলেজের ইতিহাস ও প্রাতিষ্ঠানিক পরিচিতি' : 'College History & Institutional Profile'}
        subtitle={
          isBn
            ? '১৯৯৪ সাল থেকে শিবচর, মাদারীপুরে মানসম্মত উচ্চশিক্ষা ও আলোকিত ভবিষ্যৎ গড়ার অঙ্গীকার।'
            : 'Committed to standard higher education and enlightenment in Shibchar, Madaripur since 1994.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'কলেজ পরিচিতি' : 'About Us',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>EIIN: {COLLEGE_INFO.identity.eiin}</span>
            </Badge>
            <Badge variant="official" size="sm">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>{isBn ? 'এনইউ কোড: ৬৩০৯' : 'NU Code: 6309'}</span>
            </Badge>
            <Badge variant="gold" size="sm">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>{isBn ? 'স্থাপিত: ১৯৯৪' : 'Est: 1994'}</span>
            </Badge>
          </div>
        }
      />

      {/* Subpage Quick Nav Pills */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-[var(--color-primary)] dark:text-amber-300 flex items-center gap-1.5 mr-1">
            <Landmark className="w-4 h-4" />
            <span>{isBn ? 'সম্পর্কিত পাতা:' : 'Related Pages:'}</span>
          </span>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? 'ক্যাম্পাস ফটোগ্যালারি' : 'Photo Gallery'}</span>
          </Link>
          <Link
            href="/tour"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Bus className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? 'শিক্ষা সফর' : 'Study Tour'}</span>
          </Link>
          <Link
            href="/sports"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-blue-600" />
            <span>{isBn ? 'ক্রীড়া ও অ্যাথলেটিকস' : 'Sports & Athletics'}</span>
          </Link>
          <Link
            href="/humanitarian"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>{isBn ? 'মানবসেবা ও ত্রাণ' : 'Humanitarian Work'}</span>
          </Link>
          <Link
            href="/credits"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-purple-600" />
            <span>{isBn ? 'প্রজেক্ট পরিচিতি' : 'Project Credits'}</span>
          </Link>
        </div>
      </section>

      {/* History & Establishment Section */}
      <section id="history" className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                {isBn ? 'প্রতিষ্ঠার পটভূমি ও ঐতিহ্য' : 'Foundation & Heritage'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'ঐতিহ্য ও অগ্রযাত্রার ইতিহাস' : 'History of Heritage and Progress'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'মাদারীপুর জেলার শিবচর উপজেলার অন্তর্গত উমেদপুর ইউনিয়নের নিভৃত পল্লী অঞ্চলে শিক্ষার আলো ছড়াতে ১৯৯৪ সালের ৭ সেপ্টেম্বর স্থানীয় শিক্ষানুরাগী ও বিশিষ্ট ব্যক্তিদের ঐকান্তিক প্রচেষ্টায় নুরুল আমিন ডিগ্রি কলেজ প্রতিষ্ঠিত হয়। বিশিষ্ট শিক্ষাবিদ প্রফেসর ডা. নুরুল আমিন ব্যাপারীর স্মৃতি ও অবদানের প্রতি সম্মান জানিয়ে কলেজটির নামকরণ করা হয়।'
                : 'Nurul Amin Degree College was established on September 7, 1994, in Umedpur, Shibchar, Madaripur, through the dedicated efforts of local education enthusiasts and philanthropists to spread the light of higher education in rural Bangladesh. The institution was named in honor of distinguished academician Prof. Dr. Nurul Amin Bepari.'}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'প্রতিষ্ঠালগ্ন থেকেই কলেজটি ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডের অধীনে এইচএসসি স্তরে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় এবং পরবর্তীতে জাতীয় বিশ্ববিদ্যালয়ের অধীনে ৩ বছর মেয়াদী ডিগ্রি (পাস) কোর্সে (বি.এ., বি.এস.এস., বি.এসসি., বি.বি.এস.) সফলভাবে পাঠদান পরিচালনা করে আসছে।'
                : 'From its inception, the college has been successfully conducting HSC programs under the Board of Intermediate and Secondary Education (BISE) Dhaka in Science, Humanities, and Business Studies, and subsequently 3-year Degree (Pass) courses under National University (B.A., B.S.S., B.Sc., B.B.S.).'}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isBn
                ? 'বর্তমানে প্রতিষ্ঠানটি বাংলাদেশ সরকারের মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE) কর্তৃক এমপিওভুক্ত (MPO Index: 3504013201) এবং স্থানীয় এলাকার শিক্ষার্থীদের জন্য স্বল্প খরচে মানসম্মত উচ্চশিক্ষার একটি নির্ভরযোগ্য কেন্দ্র।'
                : 'Currently, the college is fully MPO-enlisted under the Directorate of Secondary and Higher Education (DSHE), Bangladesh Government (MPO Index: 3504013201), serving as a trusted hub for affordable, high-quality education.'}
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                <span className="block text-xl font-bold text-[var(--color-primary)] dark:text-amber-400">১৯৯৪</span>
                <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'প্রতিষ্ঠা সাল' : 'Founded'}</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                <span className="block text-xl font-bold text-[var(--color-primary)] dark:text-amber-400">১১০৮৮২</span>
                <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'বোর্ড EIIN' : 'EIIN Code'}</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                <span className="block text-xl font-bold text-[var(--color-primary)] dark:text-amber-400">৬৩০৯</span>
                <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'এনইউ কোড' : 'NU Code'}</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                <span className="block text-xl font-bold text-[var(--color-primary)] dark:text-amber-400">৪টি</span>
                <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'ডিগ্রি পাস কোর্স' : 'Degree Courses'}</span>
              </div>
            </div>
          </div>

          {/* Building Card & Institutional Recognition */}
          <div className="lg:col-span-5 space-y-5">
            <Card className="overflow-hidden border border-[var(--border-subtle)] shadow-md">
              <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/images/clg1.jpg"
                  alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজ মূল একাডেমিক ভবন' : 'Nurul Amin Degree College Main Building'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'প্রাতিষ্ঠানিক সনাক্তকরণ ও সরকারি স্বীকৃতি' : 'Institutional Identification & Recognition'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)]">EIIN:</strong> 110882 ({isBn ? 'ঢাকা শিক্ষা বোর্ড ও ব্যানবেইস' : 'BISE Dhaka & BANBEIS'})
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)]">{isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড:' : 'NU College Code:'}</strong> 6309
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)]">{isBn ? 'এমপিও ইনডেক্স:' : 'MPO Index:'}</strong> 3504013201
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)]">{isBn ? 'ক্যাম্পাসের অবস্থান:' : 'Campus Location:'}</strong> {isBn ? 'উমেদপুর, শিবচর, মাদারীপুর - ৭৯৩৩' : 'Umedpur, Shibchar, Madaripur - 7933'}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'আদর্শ ও পথচলা' : 'Ideals & Journey'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'আমাদের মিশন ও ভিশন' : 'Our Mission & Vision'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'শিক্ষার্থীদের আধুনিক জ্ঞান, মানবিক দৃষ্টিভঙ্গি ও নৈতিক মূল্যবোধে সমৃদ্ধ করা।'
                : 'Enriching students with modern knowledge, human values, and ethical integrity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <Card className="p-6 space-y-4 border-t-4 border-t-[var(--color-primary)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                    {isBn ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
                  </h3>
                  <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'জ্ঞানচর্চা ও সেবার ব্রত' : 'Pursuit of Knowledge & Service'}</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'গ্রামীণ ও মফস্বল এলাকার শিক্ষার্থীদের কাছে সুলভ ও মানসম্মত উচ্চশিক্ষা পৌঁছে দেওয়া।' : 'Deliver affordable, quality higher education to rural and suburban learners.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'জ্ঞানচর্চার পাশাপাশি সৃজনশীলতা, সততা ও নেতৃত্বগুণের সমন্বিত বিকাশ ঘটানো।' : 'Foster integrated growth of creativity, integrity, and leadership alongside academic excellence.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'বিজ্ঞান ও তথ্যপ্রযুক্তিভিত্তিক যুগোপযোগী শিক্ষায় দক্ষ মানবসম্পদ তৈরি করা।' : 'Build skilled human capital through modern science and IT-based education.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'দেশপ্রেম ও সামাজিক দায়িত্ববোধে উদ্বুদ্ধ আদর্শ সুনাগরিক হিসেবে গড়ে তোলা।' : 'Shape patriotic, socially conscious ideal citizens for national progress.'}</span>
                </li>
              </ul>
            </Card>

            {/* Vision Card */}
            <Card className="p-6 space-y-4 border-t-4 border-t-[var(--color-accent)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                    {isBn ? 'আমাদের স্বপ্ন (Vision)' : 'Our Vision'}
                  </h3>
                  <span className="text-xs text-[var(--text-secondary)]">{isBn ? 'ভবিষ্যতের দিগন্ত' : 'Horizons for the Future'}</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'শিবচর তথা মাদারীপুর অঞ্চলের অন্যতম শ্রেষ্ঠ মডেল শিক্ষা প্রতিষ্ঠান হিসেবে নিজেকে প্রতিষ্ঠিত করা।' : 'Establish the institution as a leading model college in Shibchar and the greater Madaripur region.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'ডিগ্রি (পাস) কোর্সের পাশাপাশি ভবিষ্যতে স্নাতক সম্মান (অনার্স) কোর্স চালু করে উচ্চশিক্ষার পরিধি বেগবান করা।' : 'Expand higher education opportunities by introducing specialized Honours degree programs in the future.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'পাবলিক বিশ্ববিদ্যালয় ভর্তি পরীক্ষা ও জাতীয় প্রতিযোগিতায় শিক্ষার্থীদের শীর্ষস্থান অর্জনের উপযোগী করে তোলা।' : 'Prepare students to excel in public university admission tests and national career competitions.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span>{isBn ? 'ডিজিটাল শিক্ষা ব্যবস্থা ও পরিবেশবান্ধব সবুজ ক্যাম্পাসের স্থায়ী রূপায়ন।' : 'Realize a green, eco-friendly campus enriched with modern digital classroom infrastructure.'}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Administration & Faculty Overview */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'প্রশাসন ও পরিচালনা' : 'Administration & Leadership'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'কলেজ প্রশাসন ও শিক্ষক পরিষদ' : 'College Administration & Faculty Council'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'অভিজ্ঞ শিক্ষকমণ্ডলী ও সুযোগ্য পরিচালনার সমন্বয়ে পরিচালিত একটি ঐতিহ্যবাহী বিদ্যাপীঠ।'
                : 'An established institution guided by experienced faculty and dedicated institutional leadership.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Leadership Message Card */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-slate-100 border-2 border-[var(--color-accent)]">
                    <Image
                      src="/images/principal.jpeg"
                      alt={isBn ? 'কলেজ প্রশাসন ও শিক্ষক পরিষদ' : 'College Administration and Faculty'}
                      fill
                      sizes="128px"
                      className="object-cover object-[32%_30%]"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {isBn ? 'প্রাতিষ্ঠানিক নেতৃত্বের বার্তা' : 'Message from Institutional Leadership'}
                    </h3>
                    <p className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                      {isBn ? 'কলেজ প্রশাসন ও শিক্ষক পরিষদ' : 'College Administration & Faculty Council'}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {isBn ? 'নুরুল আমিন ডিগ্রি কলেজ, উমেদপুর, শিবচর, মাদারীপুর' : 'Nurul Amin Degree College, Shibchar, Madaripur'}
                    </p>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 italic text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? '"নুরুল আমিন ডিগ্রি কলেজ কেবল পাঠ্যপুস্তকের শিক্ষায় সীমাবদ্ধ নয়। শিক্ষার্থীদের আত্মবিশ্বাসী, মার্জিত ও সমাজসচেতন হিসেবে গড়ে তোলার জন্য আমাদের শিক্ষকবৃন্দ নিরলসভাবে কাজ করে যাচ্ছেন। আমরা বিশ্বাস করি, নিষ্ঠা ও শৃঙ্খলা থাকলে যেকোনো প্রতিকূলতা জয় করা সম্ভব।"'
                    : '"Nurul Amin Degree College extends far beyond textbook memorization. Our faculty works tirelessly to mold students into confident, courteous, and socially responsible leaders. We believe with dedication and discipline, every challenge can be surmounted."'}
                </blockquote>
              </Card>
            </div>

            {/* Academic Guidance Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'শিক্ষকমণ্ডলীর বৈশিষ্ট্য ও একাডেমিক যত্ন' : 'Faculty Strengths & Academic Care'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isBn
                    ? 'কলেজে বিভিন্ন বিভাগে অভিজ্ঞ এবং জাতীয় শিক্ষাক্রম অনুসারে প্রশিক্ষিত শিক্ষকমণ্ডলী নিয়োজিত আছেন। আইসিটি, বাংলা, ইংরেজি, বিজ্ঞান ও বাণিজ্য বিভাগের শিক্ষকরা নিয়মিত শ্রেণিকক্ষে পাঠদানের পাশাপাশি শিক্ষার্থীদের সৃজনশীল মেধা বিকাশে সহায়তা প্রদান করেন।'
                    : 'The college hosts skilled, government-trained educators across ICT, Bengali, English, Science, Humanities, and Commerce faculties dedicated to nurturing academic competence and intellectual curiosity.'}
                </p>
                <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 text-xs sm:text-sm text-amber-900 dark:text-amber-300">
                  <p className="font-semibold">
                    ✓ {isBn ? 'নিয়মিত সেমিস্টার মূল্যায়ন ও বিশেষ রিমেডিয়াল ক্লাস' : 'Regular semester assessments and remedial sessions'}
                  </p>
                  <p className="text-xs text-amber-800/80 dark:text-amber-400/80 mt-1">
                    {isBn
                      ? 'দুর্বল শিক্ষার্থীদের জন্য অতিরিক্ত পাঠদান ও নিয়মিত ক্লাস টেস্টের মাধ্যমে সার্বক্ষণিক অগ্রগতি পর্যবেক্ষণ করা হয়।'
                      : 'Dedicated tutorial support and continuous evaluation to ensure every learner achieves their full potential.'}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'গৌরবময় সাফল্য' : 'Key Milestones'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'আমাদের সাম্প্রতিক অর্জনসমূহ' : 'Recent Institutional Achievements'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'শিক্ষার্থীদের মেধা ও শিক্ষকদের ঐকান্তিক প্রচেষ্টার বাস্তব প্রতিফলন।'
                : 'A tangible reflection of students’ hard work and dedicated faculty guidance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 border-t-4 border-t-amber-500">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {isBn ? 'পাবলিক বিশ্ববিদ্যালয় ভর্তি • ২০২৪-২৫' : 'Public University Admission • 2024-25'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'ঢাকা বিশ্ববিদ্যালয়ে ভর্তির গৌরব' : 'Admission to Dhaka University'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'নুরুল আমিন ডিগ্রি কলেজ থেকে উচ্চমাধ্যমিক সম্পন্ন করা এক কৃতি শিক্ষার্থী ঢাকা বিশ্ববিদ্যালয়ের কলা ও মানবিক অনুষদে ভর্তির সুযোগ লাভ করেছেন। এটি অত্র প্রতিষ্ঠানের ধারাবাহিক সাফল্যের একটি উজ্জ্বল মাইলফলক।'
                  : 'An alumnus of Nurul Amin Degree College successfully gained admission to the Faculty of Arts at the University of Dhaka, showcasing the academic caliber fostered here.'}
              </p>
            </Card>

            <Card className="p-6 space-y-3 border-t-4 border-t-blue-500">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {isBn ? 'বোর্ড পরীক্ষা • ঢাকা শিক্ষা বোর্ড' : 'Board Examination • BISE Dhaka'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'সন্তোষজনক ফলাফল ও জিপিএ ৫' : 'Strong Pass Rates & GPA 5 Success'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'প্রতি বছর ঢাকা শিক্ষা বোর্ডের অধীনে অনুষ্ঠিত এইচএসসি পরীক্ষায় আমাদের কলেজের শিক্ষার্থীরা প্রশংসনীয় ফলাফল অর্জন করে আসছে। বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা সব শাখায় পাশের হার উল্লেখযোগ্য।'
                  : 'Year after year, our candidates record commendable results and GPA 5 marks across Science, Humanities, and Business Studies in the HSC examinations.'}
              </p>
            </Card>

            <Card className="p-6 space-y-3 border-t-4 border-t-emerald-500">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {isBn ? 'সহশিক্ষা ও অ্যাথলেটিকস' : 'Co-Curricular & Athletics'}
              </span>
              <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                {isBn ? 'জাতীয় বিশ্ববিদ্যালয় ক্রীড়া ও আঞ্চলিক টুর্নামেন্ট' : 'NU Inter-College & Regional Sports'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'উপজেলা ও জেলা পর্যায়ের ফুটবল টুর্নামেন্ট এবং জাতীয় বিশ্ববিদ্যালয়ের আন্তঃকলেজ ক্রীড়া প্রতিযোগিতায় কলেজ দল সক্রিয়ভাবে অংশগ্রহণ করে সুনাম অর্জন করেছে।'
                  : 'College teams participate actively in upazila and district sports tournaments as well as National University inter-college sports competitions.'}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
