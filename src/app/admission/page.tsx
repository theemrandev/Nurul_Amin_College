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
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  Building,
  HelpCircle,
  Phone,
  Mail,
  Award,
  AlertCircle,
} from 'lucide-react';

export default function AdmissionPage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'ভর্তি নির্দেশিকা ও আবেদন প্রক্রিয়া' : 'Admission Guidelines & Application Procedure'}
        subtitle={
          isBn
            ? 'শিক্ষা মন্ত্রণালয় ও জাতীয় বিশ্ববিদ্যালয়ের কেন্দ্রীয় অনলাইন পোর্টালের মাধ্যমে ভর্তির পূর্ণাঙ্গ নিয়মাবলী।'
            : 'Comprehensive admission guidelines through Ministry of Education and National University central portals.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'ভর্তি তথ্য' : 'Admission',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>একাদশ শ্রেণি কোড: EIIN {COLLEGE_INFO.identity.eiin}</span>
            </Badge>
            <Badge variant="official" size="sm">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>ডিগ্রি পাস কোড: {COLLEGE_INFO.identity.nuCollegeCode}</span>
            </Badge>
          </div>
        }
      />

      {/* Official Direct Admission Portals */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
            {isBn ? 'অনলাইন আবেদন পদ্ধতি' : 'Online Application Gateways'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            {isBn ? 'একাদশ শ্রেণি ও ডিগ্রি (পাস) কোর্সে ভর্তি' : 'XI Class & Degree (Pass) Admissions'}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {isBn
              ? 'বাংলাদেশ সরকারের কেন্দ্রীয় অনলাইন নিয়মাবলীর আলোকে ভর্তির আবেদন সম্পন্ন করুন।'
              : 'Complete your application through authorized government portals as per official guidelines.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* XI Class Admission */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-t-4 border-t-[var(--color-primary)]">
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {isBn ? 'উচ্চমাধ্যমিক স্তর (এইচএসসি)' : 'Higher Secondary Level (HSC)'}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'একাদশ শ্রেণিতে ভর্তি পদ্ধতি' : 'Class XI Admission Procedure'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'শিক্ষা মন্ত্রণালয়ের নীতিমালার আলোকে একাদশ শ্রেণির সকল শাখায় (বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা) কেন্দ্রীয় সরকারি ওয়েবসাইটের মাধ্যমে অনলাইনে আবেদন করতে হয়।'
                  : 'As per Ministry of Education policy, all admissions for Class XI (Science, Humanities, Business Studies) must be submitted through the centralized online portal.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-primary)] dark:text-amber-300">
                  {isBn ? 'আবেদনের ধারাবাহিক ধাপসমূহ:' : 'Step-by-Step Application Instructions:'}
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <li>
                    {isBn ? (
                      <>
                        <strong className="text-[var(--text-primary)]">xiclassadmission.gov.bd</strong> ওয়েবসাইটে প্রবেশ করুন।
                      </>
                    ) : (
                      <>
                        Visit <strong className="text-[var(--text-primary)]">xiclassadmission.gov.bd</strong>.
                      </>
                    )}
                  </li>
                  <li>
                    {isBn
                      ? 'এসএসসি পরীক্ষার রোল নম্বর, রেজিস্ট্রেশন নম্বর ও পাসের সন দিয়ে লগইন করুন।'
                      : 'Log in with your SSC Roll number, Registration number, and Board/Passing year.'}
                  </li>
                  <li>
                    {isBn ? (
                      <>
                        কলেজ পছন্দ তালিকায় আমাদের কলেজ কোড (EIIN: <strong className="text-amber-700 dark:text-amber-400">110882</strong>) টাইপ করে নির্বাচন করুন।
                      </>
                    ) : (
                      <>
                        In the college choice list, select Nurul Amin Degree College (EIIN: <strong className="text-amber-700 dark:text-amber-400">110882</strong>).
                      </>
                    )}
                  </li>
                  <li>
                    {isBn
                      ? 'শিফট: Day (দিবা), ভার্সন: Bangla (বাংলা), সহশিক্ষা (Co-education) নির্বাচন করুন।'
                      : 'Select Shift: Day, Version: Bangla, and Co-education.'}
                  </li>
                  <li>
                    {isBn
                      ? 'পছন্দক্রম নিশ্চিত করে নির্ধারিত আবেদন ফি (বিকাশ/নগদ/রকেট ইত্যাদি মাধ্যমে) পরিশোধ করুন।'
                      : 'Confirm priority order and pay the official application fee.'}
                  </li>
                </ol>
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant="primary"
                size="lg"
                href="https://xiclassadmission.gov.bd/"
                isExternal
                className="w-full justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{isBn ? 'একাদশ শ্রেণির কেন্দ্রীয় ভর্তি পোর্টালে যান' : 'Go to Class XI Admission Portal'}</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Degree Pass Admission */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-t-4 border-t-emerald-600">
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {isBn ? 'স্নাতক স্তর (জাতীয় বিশ্ববিদ্যালয়)' : 'Undergraduate Level (National University)'}
                </span>
                <h3 className="text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'ডিগ্রি (পাস) কোর্সে ভর্তি পদ্ধতি' : 'Degree (Pass) Admission Procedure'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'জাতীয় বিশ্ববিদ্যালয়ের ৩ বছর মেয়াদী ডিগ্রি (পাস) কোর্সে ভর্তি কার্যক্রম জাতীয় বিশ্ববিদ্যালয়ের কেন্দ্রীয় ভর্তি পোর্টালের মাধ্যমে সম্পন্ন করতে হয়।'
                  : 'Enrollment in the 3-Year Degree (Pass) courses is administered directly via the National University Central Admission Portal.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-primary)] dark:text-amber-300">
                  {isBn ? 'আবেদনের ধারাবাহিক ধাপসমূহ:' : 'Step-by-Step Application Instructions:'}
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <li>
                    {isBn ? (
                      <>
                        জাতীয় বিশ্ববিদ্যালয়ের ভর্তি পোর্টাল <strong className="text-[var(--text-primary)]">app1.nu.edu.bd</strong>-এ প্রবেশ করুন।
                      </>
                    ) : (
                      <>
                        Visit the National University portal at <strong className="text-[var(--text-primary)]">app1.nu.edu.bd</strong>.
                      </>
                    )}
                  </li>
                  <li>
                    {isBn
                      ? "'Degree Pass' অপশনে গিয়ে 'Apply Now' বাটনে ক্লিক করুন।"
                      : "Navigate to the 'Degree Pass' section and click 'Apply Now'."}
                  </li>
                  <li>
                    {isBn
                      ? 'এসএসসি ও এইচএসসি পরীক্ষার রোল ও রেজিস্ট্রেশন দিয়ে নিজের প্রোফাইল যাচাই করুন।'
                      : 'Verify your profile using your SSC and HSC roll and registration numbers.'}
                  </li>
                  <li>
                    {isBn ? (
                      <>
                        কলেজ সিলেকশনে মাদারীপুর জেলা ও শিবচর উপজেলার <strong className="text-amber-700 dark:text-amber-400">Nurul Amin Degree College (Code: 6309)</strong> নির্বাচন করুন।
                      </>
                    ) : (
                      <>
                        Select District: Madaripur, Upazila: Shibchar, and College: <strong className="text-amber-700 dark:text-amber-400">Nurul Amin Degree College (Code: 6309)</strong>.
                      </>
                    )}
                  </li>
                  <li>
                    {isBn
                      ? 'কাঙ্ক্ষিত কোর্স (বি.এ., বি.এস.এস., বি.এসসি., বি.বি.এস.) পছন্দক্রম দিয়ে আবেদন সাবমিট করুন।'
                      : 'Choose your desired degree course (B.A., B.S.S., B.Sc., B.B.S.) and submit.'}
                  </li>
                </ol>
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant="outline"
                size="lg"
                href="http://app1.nu.edu.bd/"
                isExternal
                className="w-full justify-center gap-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]"
              >
                <BookOpen className="w-5 h-5" />
                <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় ভর্তি পোর্টালে যান' : 'Go to National University Portal'}</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
              {isBn ? 'প্রয়োজনীয় কাগজপত্র' : 'Required Documents'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'চূড়ান্ত ভর্তির সময় যা প্রয়োজন হবে' : 'Documents Required for Final Admission'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'অনলাইনে নির্বাচিত হওয়ার পর কলেজে সশরীরে উপস্থিত হয়ে চূড়ান্ত ভর্তির জন্য যেসব নথি সাথে আনতে হবে।'
                : 'Documents to bring in person to the college admissions desk after being selected online.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'মূল নম্বরপত্র ও প্রবেশপত্র' : 'Original Academic Transcripts'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'এসএসসি / সমমান পরীক্ষার মূল ট্রান্সক্রিপ্ট / মার্কশিট এবং প্রবেশপত্রের মূল কপি ও সত্যায়িত ফটোকপি।'
                  : 'Original SSC/Equivalent mark sheet and admit card along with attested photocopies.'}
              </p>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'প্রশংসাপত্র (Testimonial)' : 'Testimonial from Institution'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'পূর্ববর্তী শিক্ষা প্রতিষ্ঠানের প্রধান কর্তৃক ইস্যুকৃত মূল প্রশংসাপত্র এবং ২ কপি সত্যায়িত ফটোকপি।'
                  : 'Original testimonial issued by the head of the previous educational institution.'}
              </p>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'পাসপোর্ট সাইজ ছবি' : 'Passport Size Photographs'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'শিক্ষার্থীর সাম্প্রতিক তোলা পাসপোর্ট সাইজের রঙ্গিন ছবি (৪ কপি) এবং পিতা/মাতার ছবি (১ কপি)।'
                  : 'Recent passport-sized color photographs of student (4 copies) and parents (1 copy).'}
              </p>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'জন্ম নিবন্ধন ও অভিভাবকের এনআইডি' : 'Birth Certificate & Parent NID'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'শিক্ষার্থীর ডিজিটাল জন্ম নিবন্ধন সনদের ফটোকপি এবং পিতা/মাতার জাতীয় পরিচয়পত্রের (NID) কপি।'
                  : 'Digital birth registration certificate copy and photocopies of parents’ national identity cards.'}
              </p>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'অনলাইন নিশ্চায়ন স্লিপ' : 'Online Confirmation Slip'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'কেন্দ্রীয় বোর্ড বা জাতীয় বিশ্ববিদ্যালয়ের পোর্টাল থেকে ডাউনলোডকৃত চূড়ান্ত নিশ্চায়ন ও পেমেন্ট স্লিপ।'
                  : 'Selection confirmation receipt and payment voucher downloaded from the official admission portal.'}
              </p>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'কলেজ ভর্তি হেল্পডেস্ক' : 'College On-Campus Helpdesk'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'অনলাইনে আবেদন প্রক্রিয়ায় কোনো অসুবিধা হলে কলেজের প্রশাসনিক ভবনে স্থাপিত ফ্রি স্টুডেন্ট হেল্পডেস্কে সরাসরি যোগাযোগ করুন।'
                  : 'For assistance with online applications, visit our free Student Helpdesk in the administrative building.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Helpdesk Information */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--color-primary-soft)] to-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য যোগাযোগ' : 'Need Admission Assistance?'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {isBn
                ? 'আমাদের প্রশাসনিক কর্মকর্তারা রবি থেকে বৃহস্পতিবার সকাল ৯:০০ থেকে বিকাল ৪:০০ পর্যন্ত সেবা প্রদান করেন।'
                : 'Our administrative staff is available Sunday through Thursday, 9:00 AM to 4:00 PM.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Button variant="gold" size="md" href="tel:01703228122" className="gap-2">
              <Phone className="w-4 h-4" />
              <span>০১৭০৩২২৮১২২</span>
            </Button>
            <Button variant="outline" size="md" href="/contact" className="gap-2">
              <Mail className="w-4 h-4" />
              <span>{isBn ? 'যোগাযোগ পাতা' : 'Contact Office'}</span>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
