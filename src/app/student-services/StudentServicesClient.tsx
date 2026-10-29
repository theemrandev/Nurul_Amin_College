'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  GraduationCap,
  Award,
  BarChart3,
  Calendar,
  Clock,
  FileSignature,
  Edit,
  IdCard,
  Landmark,
  Building2,
  BookOpen,
  Megaphone,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  Info,
  Globe,
  RefreshCw,
} from 'lucide-react';
import {
  STUDENT_SERVICES,
  VERIFIED_GOVERNMENT_PORTALS,
  StudentServiceItem,
} from '@/lib/studentServicesData';

type ServiceCategory =
  | 'all'
  | 'admission'
  | 'results'
  | 'routine'
  | 'formfillup'
  | 'admit'
  | 'board'
  | 'nu'
  | 'degree'
  | 'notices';

export default function StudentServicesClient() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category Pills Definition
  const categoryTabs: { id: ServiceCategory; labelBn: string; labelEn: string }[] = useMemo(
    () => [
      { id: 'all', labelBn: 'সকল সেবা', labelEn: 'All Services' },
      { id: 'admission', labelBn: 'ভর্তি কার্যক্রম', labelEn: 'Admission' },
      { id: 'results', labelBn: 'ফলাফল', labelEn: 'Results' },
      { id: 'routine', labelBn: 'সময়সূচি ও রুটিন', labelEn: 'Routines' },
      { id: 'formfillup', labelBn: 'ফরম পূরণ', labelEn: 'Form Fill-up' },
      { id: 'admit', labelBn: 'প্রবেশপত্র', labelEn: 'Admit Card' },
      { id: 'board', labelBn: 'ঢাকা বোর্ড', labelEn: 'Dhaka Board' },
      { id: 'nu', labelBn: 'জাতীয় বিশ্ববিদ্যালয়', labelEn: 'National University' },
      { id: 'degree', labelBn: 'ডিগ্রি পাস', labelEn: 'Degree Pass' },
      { id: 'notices', labelBn: 'নোটিশ', labelEn: 'Notices' },
    ],
    []
  );

  // Filtered Services List
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STUDENT_SERVICES.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCat) return false;

      if (!q) return true;

      const title = (isBn ? item.titleBn : item.titleEn).toLowerCase();
      const desc = (isBn ? item.descBn : item.descEn).toLowerCase();
      const source = (isBn ? item.officialSourceBn : item.officialSourceEn).toLowerCase();
      const keyInfo = (isBn ? item.keyInfoBn : item.keyInfoEn).toLowerCase();
      const catName = (isBn ? item.categoryNameBn : item.categoryNameEn).toLowerCase();

      return (
        title.includes(q) ||
        desc.includes(q) ||
        source.includes(q) ||
        keyInfo.includes(q) ||
        catName.includes(q)
      );
    });
  }, [activeCategory, searchQuery, isBn]);

  // Service count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: STUDENT_SERVICES.length };
    STUDENT_SERVICES.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Icon Resolver
  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5" aria-hidden="true" />;
      case 'award':
        return <Award className="w-5 h-5" aria-hidden="true" />;
      case 'poll':
        return <BarChart3 className="w-5 h-5" aria-hidden="true" />;
      case 'calendar-alt':
        return <Calendar className="w-5 h-5" aria-hidden="true" />;
      case 'clock':
        return <Clock className="w-5 h-5" aria-hidden="true" />;
      case 'file-signature':
        return <FileSignature className="w-5 h-5" aria-hidden="true" />;
      case 'edit':
        return <Edit className="w-5 h-5" aria-hidden="true" />;
      case 'id-card':
        return <IdCard className="w-5 h-5" aria-hidden="true" />;
      case 'landmark':
        return <Landmark className="w-5 h-5" aria-hidden="true" />;
      case 'university':
        return <Building2 className="w-5 h-5" aria-hidden="true" />;
      case 'book':
        return <BookOpen className="w-5 h-5" aria-hidden="true" />;
      case 'bullhorn':
        return <Megaphone className="w-5 h-5" aria-hidden="true" />;
      default:
        return <Globe className="w-5 h-5" aria-hidden="true" />;
    }
  };

  // Badge Variant Resolver
  const renderBadge = (item: StudentServiceItem) => {
    if (item.badgeType === 'official') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          <span>{isBn ? item.badgeTextBn : item.badgeTextEn}</span>
        </span>
      );
    }
    if (item.badgeType === 'direct') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <Globe className="w-3 h-3" aria-hidden="true" />
          <span>{isBn ? item.badgeTextBn : item.badgeTextEn}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
        <Building2 className="w-3 h-3" aria-hidden="true" />
        <span>{isBn ? item.badgeTextBn : item.badgeTextEn}</span>
      </span>
    );
  };

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={t('services_hub_title')}
        subtitle={t('services_hub_subtitle')}
        breadcrumbs={[
          {
            label: isBn ? 'শিক্ষার্থী সেবা' : 'Student Services',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>EIIN: {COLLEGE_INFO.identity.eiin}</span>
            </Badge>
            <Badge variant="official" size="sm">
              <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড: ৬৩০৯' : 'NU Code: 6309'}</span>
            </Badge>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-8 md:py-12 space-y-10 max-w-7xl">
        {/* Security & Privacy Guarantee Notice Box */}
        <div
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start gap-4 md:gap-5 border-l-4 border-l-[var(--color-primary)]"
          role="region"
          aria-labelledby="security-guarantee-heading"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-3 flex-1">
            <h2 id="security-guarantee-heading" className="text-base md:text-lg font-bold text-[var(--text-primary)]">
              {t('security_guarantee_title')}
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              {t('security_guarantee_desc')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              <span>{t('portal_live_info')}</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_services_placeholder')}
                className="w-full pl-9 pr-8 py-2.5 text-xs md:text-sm rounded-lg bg-[var(--surface-muted)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                aria-label="Search student services"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs text-[var(--text-muted)] flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
              <span>
                {isBn
                  ? `মোট ${filteredServices.length} টি সেবা প্রদর্শিত হচ্ছে`
                  : `Showing ${filteredServices.length} of 12 services`}
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <X className="w-3 h-3" />
                  <span>{isBn ? 'মুছুন' : 'Clear'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs / Pills */}
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label="Student Service Categories"
          >
            {categoryTabs.map((tab) => {
              const count = categoryCounts[tab.id] || 0;
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span>{isBn ? tab.labelBn : tab.labelEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--surface-muted)] text-[var(--text-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 px-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] space-y-4">
            <Search className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-50" aria-hidden="true" />
            <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)]">
              {t('empty_services_found')}
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              {isBn
                ? 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সেবা পাওয়া যায়নি। অনুগ্রহ করে ভিন্ন কোনো কি-ওয়ার্ড বা ক্যাটাগরি বেছে নিন।'
                : 'No services matched your current search criteria. Try adjusting your query or resetting category filters.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isBn ? 'সকল সেবা প্রদর্শন করুন' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}

        {/* 12 Verified Services Grid */}
        {filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const title = isBn ? service.titleBn : service.titleEn;
              const desc = isBn ? service.descBn : service.descEn;
              const source = isBn ? service.officialSourceBn : service.officialSourceEn;
              const keyInfo = isBn ? service.keyInfoBn : service.keyInfoEn;
              const catName = isBn ? service.categoryNameBn : service.categoryNameEn;

              return (
                <Card
                  key={service.id}
                  variant="standard"
                  padding="md"
                  className="flex flex-col justify-between space-y-4 transition-all hover:border-[var(--color-primary)] hover:shadow-md"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Icon bubble + Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                        {renderServiceIcon(service.icon)}
                      </div>
                      {renderBadge(service)}
                    </div>

                    {/* Category Label */}
                    <div>
                      <span className="text-[11px] font-bold text-[var(--color-accent)] uppercase tracking-wider">
                        {catName}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                      {service.isExternal ? (
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--color-primary)] hover:underline inline-flex items-start gap-1"
                        >
                          <span>{title}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 text-[var(--color-primary)]" />
                        </a>
                      ) : (
                        <Link
                          href={service.url}
                          className="hover:text-[var(--color-primary)] hover:underline inline-flex items-start gap-1"
                        >
                          <span>{title}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-1 text-[var(--color-primary)]" />
                        </Link>
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {desc}
                    </p>

                    {/* Key Info Highlight Box */}
                    <div className="p-2.5 rounded-lg bg-[var(--surface-muted)] text-[var(--text-secondary)] text-xs flex items-start gap-2 border border-[var(--border-subtle)]">
                      <Info className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium leading-normal">{keyInfo}</span>
                    </div>
                  </div>

                  {/* Card Footer: Source & Action */}
                  <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)]">
                    <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        <strong>{t('official_source_label')}:</strong> {source}
                      </span>
                    </div>

                    <div>
                      {service.isExternal ? (
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
                        >
                          <span>{t('btn_visit_official')}</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={service.url}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors"
                        >
                          <span>{t('btn_view_internal')}</span>
                          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Verified Government Portal Connectivity Status Table */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                {t('portal_live_status')}
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">
                {isBn
                  ? 'সকল সরকারি সেবা সরাসরি তাদের অফিসিয়াল নিরাপদ সার্ভার থেকে পরিচালিত হয়।'
                  : 'All central educational services are hosted directly on authenticated official government platforms.'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              <span>{isBn ? 'স্ট্যাটাস আপডেট: অক্টোবর ২০২৬' : 'Status: Oct 2026'}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-[var(--surface-muted)] border-b-2 border-[var(--border-subtle)] text-[var(--text-primary)]">
                  <th className="p-3.5 font-bold">{isBn ? 'সরকারি পোর্টাল ও কর্তৃপক্ষ' : 'Government Portal & Authority'}</th>
                  <th className="p-3.5 font-bold">{isBn ? 'অফিসিয়াল ডোমেন' : 'Official Domain'}</th>
                  <th className="p-3.5 font-bold">{isBn ? 'সার্ভার স্ট্যাটাস' : 'Server Status'}</th>
                  <th className="p-3.5 font-bold text-right">{isBn ? 'সরাসরি প্রবেশ' : 'Direct Gateway'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {VERIFIED_GOVERNMENT_PORTALS.map((portal) => (
                  <tr key={portal.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="p-3.5 font-semibold text-[var(--text-primary)]">
                      {isBn ? portal.nameBn : portal.nameEn}
                    </td>
                    <td className="p-3.5 font-mono text-xs text-blue-700 dark:text-blue-400">
                      {portal.domain}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
                        <span>{isBn ? portal.statusBn : portal.statusEn}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline"
                      >
                        <span>{isBn ? 'পোর্টাল ওপেন' : 'Open Portal'}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
