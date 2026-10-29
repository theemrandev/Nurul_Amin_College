'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COLLEGE_INFO } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <footer
      className="w-full bg-[#051529] text-slate-300 border-t-4 border-[var(--color-accent)] mt-16 transition-colors"
      role="contentinfo"
      aria-label="College Institutional Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: College Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white/10 rounded-lg p-1">
                <Image
                  src="/images/logo (4).png"
                  alt={isBn ? 'নুরুল আমিন ডিগ্রি কলেজ প্রতীক' : 'Nurul Amin Degree College Logo'}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">
                  {isBn ? COLLEGE_INFO.name.bn : COLLEGE_INFO.name.en}
                </h2>
                <p className="text-xs text-amber-300 font-mono mt-0.5">EIIN: {COLLEGE_INFO.identity.eiin}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'নুরুল আমিন ডিগ্রি কলেজ শিবচর উপজেলার একটি ঐতিহ্যবাহী উচ্চশিক্ষা প্রতিষ্ঠান। জাতীয় বিশ্ববিদ্যালয় ও ঢাকা শিক্ষা বোর্ডের আওতাধীন মানসম্মত শিক্ষা প্রদানে অঙ্গীকারবদ্ধ।'
                : 'Nurul Amin Degree College is a premier higher education institution in Shibchar, Madaripur, affiliated with National University and BISE Dhaka.'}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>• {isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড: ৬৩০৯' : 'NU College Code: 6309'}</p>
              <p>• {isBn ? 'এমপিও কোড: ৩৫০৪০১৩২০১' : 'MPO Code: 3504013201'}</p>
              <p>• {isBn ? 'স্থাপিত: ৭ সেপ্টেম্বর, ১৯৯৪' : 'Established: September 7, 1994'}</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              {t('footer_quick_links')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_academics')}
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_admission')}
                </Link>
              </li>
              <li>
                <Link href="/student-services" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_student_services')}
                </Link>
              </li>
              <li>
                <Link href="/notice" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_notices')}
                </Link>
              </li>
              <li>
                <Link href="/routine" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_routine')}
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_teachers')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors inline-block py-1">
                  {t('nav_gallery')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Government Portals */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              {t('footer_official_portals')}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://deb110882.dhakaeducationboard.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-300 transition-colors py-1 group"
                >
                  <span>{isBn ? 'ঢাকা শিক্ষা বোর্ড (কলেজ সাইট)' : 'BISE Dhaka (College Portal)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://dhakaeducationboard.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-300 transition-colors py-1 group"
                >
                  <span>{isBn ? 'ঢাকা শিক্ষা বোর্ড মূল পোর্টাল' : 'BISE Dhaka Main Portal'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nu.ac.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-300 transition-colors py-1 group"
                >
                  <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় পোর্টাল' : 'National University (NU)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://xiclassadmission.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-300 transition-colors py-1 group"
                >
                  <span>{isBn ? 'একাদশ শ্রেণি ভর্তি পোর্টাল' : 'XI Class Admission Portal'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.dshe.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-300 transition-colors py-1 group"
                >
                  <span>{isBn ? 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর' : 'DSHE Official Portal'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              {t('footer_contact_info')}
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isBn ? COLLEGE_INFO.location.fullAddressBn : COLLEGE_INFO.location.fullAddressEn}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${COLLEGE_INFO.contact.phone}`} className="hover:text-white font-mono">
                  {COLLEGE_INFO.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${COLLEGE_INFO.contact.email}`} className="hover:text-white font-mono break-all">
                  {COLLEGE_INFO.contact.email}
                </a>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-emerald-400 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সরকারি গ্যাজেট সত্যায়িত' : 'Government Gazette Verified'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Developer Credit */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {isBn ? COLLEGE_INFO.name.bn : COLLEGE_INFO.name.en}. {t('footer_copyright')}.
          </p>

          <p className="text-center sm:text-right text-[11px] flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
            <span>{t('footer_dev_credit')}</span>
            <Link href="/credits" className="font-semibold text-slate-200 hover:text-amber-300 transition-colors">
              {isBn ? COLLEGE_INFO.developer.creditBn : COLLEGE_INFO.developer.creditEn}
            </Link>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">•</span>
            <a
              href={COLLEGE_INFO.developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-0.5"
              aria-label="The Emran Dev GitHub Profile"
            >
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
