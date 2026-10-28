'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { COLLEGE_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Bell,
  FileText,
  Calendar,
  Search,
  ExternalLink,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Building2,
  GraduationCap,
  Eye,
  Copy,
  Trash2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Info,
  ShieldAlert,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  COLLEGE_NOTICES,
  OFFICIAL_NU_NOTICES,
  NU_FEED_METADATA,
  DHAKA_BOARD_GATEWAY_INFO,
  formatNoticeDate,
  NoticeItem,
} from '@/lib/noticesData';

type FeedTab = 'college' | 'nu' | 'dhaka-board';
type NoticeCategoryFilter = 'all' | 'exam' | 'routine' | 'admission' | 'formfillup' | 'general' | 'achievement';

const ADMIN_STORAGE_KEY = 'nurulAminCollege_adminNotices';
const LEGACY_STORAGE_KEY = 'nadc_admin_draft_notices';

const adminNoticesListeners = new Set<() => void>();

function subscribeAdminNotices(callback: () => void) {
  adminNoticesListeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    adminNoticesListeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function emitAdminNoticesChange() {
  for (const listener of adminNoticesListeners) {
    listener();
  }
}

let cachedRaw: string | null = null;
let cachedParsed: NoticeItem[] = [];

const EMPTY_ADMIN_NOTICES_SNAPSHOT: NoticeItem[] = [];

function getAdminNoticesSnapshot(): NoticeItem[] {
  if (typeof window === 'undefined') return EMPTY_ADMIN_NOTICES_SNAPSHOT;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      if (raw) {
        const parsed = JSON.parse(raw);
        cachedParsed = Array.isArray(parsed) ? parsed : [];
      } else {
        cachedParsed = [];
      }
    }
    return cachedParsed;
  } catch {
    return EMPTY_ADMIN_NOTICES_SNAPSHOT;
  }
}

function getAdminNoticesServerSnapshot(): NoticeItem[] {
  return EMPTY_ADMIN_NOTICES_SNAPSHOT;
}

export default function NoticePage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const [activeTab, setActiveTab] = useState<FeedTab>('college');
  const [activeCategory, setActiveCategory] = useState<NoticeCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const adminNotices = useSyncExternalStore(
    subscribeAdminNotices,
    getAdminNoticesSnapshot,
    getAdminNoticesServerSnapshot
  );

  // Admin form state
  const [adminTitleBn, setAdminTitleBn] = useState('');
  const [adminTitleEn, setAdminTitleEn] = useState('');
  const [adminCategory, setAdminCategory] = useState<NoticeCategoryFilter>('general');
  const [adminDate, setAdminDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [adminSummaryBn, setAdminSummaryBn] = useState('');
  const [adminSummaryEn, setAdminSummaryEn] = useState('');
  const [adminLink, setAdminLink] = useState('');
  const [adminMsg, setAdminMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Live Sync feedback state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Handle Tab Switch
  const handleTabChange = (tab: FeedTab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setActiveCategory('all');
    setSyncFeedback(null);
  };

  // Handle Sync simulation
  const handleSyncClick = () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncFeedback(
        isBn
          ? 'স্ট্যাটিক ফ্রন্টএন্ড মোড: ব্যাকএন্ড সার্ভার বা লাইভ স্ক্র্যাপার ছাড়া সরাসরি রিয়েল-টাইম লাইভ সিঙ্ক সম্ভব নয়। জাতীয় বিশ্ববিদ্যালয়ের সংরক্ষিত সত্যায়িত আর্কাইভ এবং মূল পিডিএফ লিংকসমূহ সক্রিয় রয়েছে।'
          : 'Static Frontend Mode: Live auto-sync requires a server backend. The verified National University snapshot archive with official PDF circulars is active.'
      );
    }, 600);
  };

  // Handle Admin Draft Submission
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminTitleBn.trim() || !adminSummaryBn.trim()) {
      setAdminMsg({
        text: isBn ? 'অনুগ্রহ করে বাংলা শিরোনাম ও সারসংক্ষেপ পূরণ করুন।' : 'Please fill in the Bengali title and summary.',
        isError: true,
      });
      return;
    }

    const categoryNames: Record<string, { bn: string; en: string }> = {
      exam: { bn: 'পরীক্ষা', en: 'Examination' },
      routine: { bn: 'রুটিন', en: 'Routine' },
      admission: { bn: 'ভর্তি সংক্রান্ত', en: 'Admission' },
      formfillup: { bn: 'ফরম পূরণ', en: 'Form Fill-up' },
      general: { bn: 'সাধারণ', en: 'General' },
      achievement: { bn: 'অর্জন', en: 'Achievement' },
      all: { bn: 'সকল', en: 'All' },
    };

    const catObj = categoryNames[adminCategory] || { bn: 'সাধারণ', en: 'General' };

    const newDraft: NoticeItem = {
      id: `notice-adm-${Date.now()}`,
      titleBn: adminTitleBn.trim(),
      titleEn: adminTitleEn.trim() || adminTitleBn.trim(),
      date: adminDate || new Date().toISOString().split('T')[0],
      category: adminCategory === 'all' ? 'general' : adminCategory,
      categoryNameBn: catObj.bn,
      categoryNameEn: catObj.en,
      summaryBn: adminSummaryBn.trim(),
      summaryEn: adminSummaryEn.trim() || adminSummaryBn.trim(),
      link: adminLink.trim() || '/notice',
      isExternal: /^https?:\/\//i.test(adminLink.trim()),
      isPdf: /\.pdf$/i.test(adminLink.trim()),
      sourceBn: 'কলেজ প্রশাসন (স্থানীয় ড্রাফট)',
      sourceEn: 'College Administration (Local Draft)',
      isAdminCreated: true,
    };

    const updated = [newDraft, ...adminNotices];

    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
      emitAdminNoticesChange();
    } catch {
      // Storage full or disabled
    }

    setAdminMsg({
      text: isBn
        ? 'নোটিশটি সফলভাবে লোকাল প্রিভিউ বোর্ডে যুক্ত করা হয়েছে!'
        : 'Notice successfully added to local preview board!',
    });

    // Reset fields
    setAdminTitleBn('');
    setAdminTitleEn('');
    setAdminSummaryBn('');
    setAdminSummaryEn('');
    setAdminLink('');
  };

  // Export JSON Snippet
  const handleExportJson = () => {
    if (adminNotices.length === 0) {
      setAdminMsg({
        text: isBn ? 'রপ্তানি করার মতো কোনো ড্রাফট নোটিশ নেই।' : 'No draft notices available to export.',
        isError: true,
      });
      return;
    }
    const jsonStr = JSON.stringify(adminNotices, null, 2);
    navigator.clipboard
      .writeText(jsonStr)
      .then(() => {
        setAdminMsg({
          text: isBn ? 'জেসন (JSON) কোড ক্লিপবোর্ডে কপি হয়েছে!' : 'JSON snippet copied to clipboard!',
        });
      })
      .catch(() => {
        setAdminMsg({
          text: isBn ? 'কপি করতে ব্যর্থ হয়েছে।' : 'Failed to copy to clipboard.',
          isError: true,
        });
      });
  };

  // Clear Local Drafts
  const handleClearDrafts = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      emitAdminNoticesChange();
    } catch {
      // Ignore
    }
    setAdminMsg({
      text: isBn ? 'সকল স্থানীয় ড্রাফট মুছে ফেলা হয়েছে।' : 'All local drafts cleared.',
    });
  };

  // Current Notices List based on active tab
  const activeNotices = useMemo(() => {
    if (activeTab === 'college') {
      return [...adminNotices, ...COLLEGE_NOTICES];
    }
    if (activeTab === 'nu') {
      return OFFICIAL_NU_NOTICES;
    }
    return [];
  }, [activeTab, adminNotices]);

  // Filtered Notices List
  const filteredNotices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return activeNotices.filter((n) => {
      const matchCategory = activeCategory === 'all' || n.category === activeCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      const title = (isBn ? n.titleBn : n.titleEn || n.titleBn).toLowerCase();
      const summary = (isBn ? n.summaryBn : n.summaryEn || n.summaryBn).toLowerCase();
      const source = (isBn ? n.sourceBn : n.sourceEn || n.sourceBn).toLowerCase();
      const date = n.date.toLowerCase();

      return title.includes(q) || summary.includes(q) || source.includes(q) || date.includes(q);
    });
  }, [activeNotices, activeCategory, searchQuery, isBn]);

  // Available categories for current tab with counts
  const categoryFilters = useMemo(() => {
    const list = activeNotices;
    const counts: Record<string, number> = { all: list.length };

    list.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });

    const categories: { id: NoticeCategoryFilter; labelBn: string; labelEn: string }[] = [
      { id: 'all', labelBn: 'সকল নোটিশ', labelEn: 'All Notices' },
      { id: 'exam', labelBn: 'পরীক্ষা', labelEn: 'Examinations' },
      { id: 'routine', labelBn: 'রুটিন', labelEn: 'Routines' },
      { id: 'admission', labelBn: 'ভর্তি', labelEn: 'Admissions' },
      { id: 'formfillup', labelBn: 'ফরম পূরণ', labelEn: 'Form Fill-up' },
      { id: 'general', labelBn: 'সাধারণ', labelEn: 'General' },
      { id: 'achievement', labelBn: 'অর্জন', labelEn: 'Achievements' },
    ];

    return categories.filter((c) => c.id === 'all' || (counts[c.id] && counts[c.id] > 0));
  }, [activeNotices]);

  // Category Badge Helper
  const renderCategoryBadge = (category: string, nameBn: string, nameEn: string) => {
    switch (category) {
      case 'routine':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
      case 'admission':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <GraduationCap className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
      case 'exam':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <FileText className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
      case 'formfillup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <FileText className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
      case 'achievement':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Award className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Bell className="w-3 h-3" aria-hidden="true" />
            {isBn ? nameBn : nameEn}
          </span>
        );
    }
  };

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'প্রাতিষ্ঠানিক নোটিশ বোর্ড' : 'Institutional Notice Board'}
        subtitle={
          isBn
            ? 'সর্বশেষ প্রাতিষ্ঠানিক প্রজ্ঞাপন, জাতীয় বিশ্ববিদ্যালয়ের সার্কুলার ও ঢাকা শিক্ষা বোর্ডের সত্যায়িত নোটিশ।'
            : 'Latest institutional circulars, National University directives, and verified Board of Intermediate and Secondary Education notices.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'নোটিশ বোর্ড' : 'Notice Board',
          },
        ]}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="verified" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>EIIN: {COLLEGE_INFO.identity.eiin}</span>
            </Badge>
            <Badge variant="official" size="sm">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>{isBn ? 'জাতীয় বিশ্ববিদ্যালয় কোড: ৬৩০৯' : 'NU Code: 6309'}</span>
            </Badge>
          </div>
        }
      />

      <div className="container mx-auto px-4 py-8 md:py-12 space-y-8 max-w-7xl">
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-[var(--color-accent)]">
            {t('official_live_notices_title')}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {isBn ? 'সর্বশেষ প্রাতিষ্ঠানিক ও সরকারি নোটিশসমূহ' : 'Latest Institutional & Official Directives'}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            {t('official_live_notices_sub')}
          </p>
        </div>

        {/* Feed Source Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[var(--border-subtle)] pb-4">
          <button
            type="button"
            onClick={() => handleTabChange('college')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              activeTab === 'college'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
            }`}
            aria-selected={activeTab === 'college'}
            role="tab"
          >
            <Building2 className="w-4 h-4" aria-hidden="true" />
            <span>{t('tab_college_notices')}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'college'
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
              }`}
            >
              {COLLEGE_NOTICES.length + adminNotices.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('nu')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              activeTab === 'nu'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
            }`}
            aria-selected={activeTab === 'nu'}
            role="tab"
          >
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            <span>{t('tab_nu_live_notices')}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-600 text-white">
              {NU_FEED_METADATA.totalNotices}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('dhaka-board')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              activeTab === 'dhaka-board'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
            }`}
            aria-selected={activeTab === 'dhaka-board'}
            role="tab"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>{t('tab_dhaka_board_notices')}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-600 text-white">
              OFFICIAL
            </span>
          </button>
        </div>

        {/* NU Feed Status & Explanation Bar (Visible when NU tab is active) */}
        {activeTab === 'nu' && (
          <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl p-4 md:p-5 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                  <span>{isBn ? 'সংরক্ষিত সরকারি নোটিশ আর্কাইভ (স্ট্যাটিক স্ন্যাপশট)' : 'Verified Official Snapshot (Static Archive)'}</span>
                </span>
                <span className="text-xs md:text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">{t('feed_last_updated')}</strong>{' '}
                  {isBn ? NU_FEED_METADATA.lastSyncedBn : NU_FEED_METADATA.lastSyncedEn}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSyncClick}
                disabled={isSyncing}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors disabled:opacity-60"
                aria-label="Refresh or check sync status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>{isSyncing ? t('btn_syncing') : t('btn_sync_now')}</span>
              </button>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {isBn
                ? 'বিজ্ঞপ্তি: স্ট্যাটিক ফ্রন্টএন্ডে রিয়েল-টাইম লাইভ সিঙ্ক সার্ভার অনুপলব্ধ। জাতীয় বিশ্ববিদ্যালয়ের (nu.ac.bd) মূল সার্ভার থেকে সংগৃহীত সত্যায়িত নোটিশ ও অফিসিয়াল পিডিএফ সার্কুলার লিংক সরাসরি নিচে সংরক্ষিত ও সক্রিয় রয়েছে।'
                : 'Notice: Direct real-time syncing requires an active backend server. The verified official notices and authentic PDF links below are directly extracted from the National University public server.'}
            </p>

            {syncFeedback && (
              <div
                className="text-xs p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-start gap-2"
                role="status"
                aria-live="polite"
              >
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>{syncFeedback}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 3 Content: Dhaka Board Protected Gateway Info */}
        {activeTab === 'dhaka-board' && (
          <div className="space-y-6">
            <Card variant="standard" padding="lg" className="space-y-6 border-l-4 border-l-[var(--color-primary)]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                      {isBn ? DHAKA_BOARD_GATEWAY_INFO.nameBn : DHAKA_BOARD_GATEWAY_INFO.nameEn}
                    </h3>
                    <Badge variant="official" size="sm">
                      {isBn ? DHAKA_BOARD_GATEWAY_INFO.statusLabelBn : DHAKA_BOARD_GATEWAY_INFO.statusLabelEn}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {isBn ? DHAKA_BOARD_GATEWAY_INFO.explanationBn : DHAKA_BOARD_GATEWAY_INFO.explanationEn}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-muted)] space-y-2 border border-[var(--border-subtle)]">
                <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                  <span>{isBn ? 'সরাসরি অফিসিয়াল নোটিশ সেকশন' : 'Direct Official Board Notice Sections'}</span>
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {isBn
                    ? `কলেজ EIIN: ${COLLEGE_INFO.identity.eiin} • মূল অভিভাবক বোর্ড: মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা`
                    : `College EIIN: ${COLLEGE_INFO.identity.eiin} • Regulatory Body: Board of Intermediate & Secondary Education, Dhaka`}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={DHAKA_BOARD_GATEWAY_INFO.hscCornerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
                >
                  <span>{isBn ? 'ঢাকা বোর্ড এইচএসসি কর্নার' : 'Dhaka Board HSC Corner'}</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={DHAKA_BOARD_GATEWAY_INFO.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[var(--surface-primary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors"
                >
                  <span>{isBn ? 'ঢাকা বোর্ড মূল পোর্টাল' : 'Dhaka Board Official Portal'}</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <Link
                  href="/routine"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[var(--surface-primary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors"
                >
                  <span>{isBn ? 'কলেজ পরীক্ষার রুটিন ও নির্দেশিকা' : 'Campus Exam Routine & Guidelines'}</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Filter Bar & Search Box (Active for College & NU tabs) */}
        {activeTab !== 'dhaka-board' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--border-subtle)] shadow-sm">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Notice Categories">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                      activeCategory === cat.id
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {isBn ? cat.labelBn : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px] md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_notices_placeholder')}
                  className="w-full pl-9 pr-8 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-muted)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  aria-label="Search notices"
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
            </div>

            {/* Results Count Summary */}
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
              <span>
                {isBn
                  ? `মোট ${filteredNotices.length} টি নোটিশ প্রদর্শিত হচ্ছে`
                  : `Showing ${filteredNotices.length} notices`}
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>{isBn ? 'অনুসন্ধান মুছুন' : 'Clear search'}</span>
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredNotices.length === 0 && (
              <div className="text-center py-12 px-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] space-y-3">
                <Search className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-50" aria-hidden="true" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {isBn ? 'কোনো নোটিশ পাওয়া যায়নি' : 'No Notices Found'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                  {isBn
                    ? 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো নোটিশ নেই। অনুগ্রহ করে অন্য কোনো কি-ওয়ার্ড অথবা ক্যাটাগরি নির্বাচন করুন।'
                    : 'No notices matched your current search or filter. Try using different keywords or selecting all categories.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isBn ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}</span>
                </button>
              </div>
            )}

            {/* Notices Grid */}
            {filteredNotices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {filteredNotices.map((notice) => {
                  const title = isBn ? notice.titleBn : notice.titleEn || notice.titleBn;
                  const summary = isBn ? notice.summaryBn : notice.summaryEn || notice.summaryBn;
                  const source = isBn ? notice.sourceBn : notice.sourceEn || notice.sourceBn;
                  const formattedDate = formatNoticeDate(notice.date, isBn);

                  return (
                    <Card
                      key={notice.id}
                      variant="standard"
                      padding="md"
                      className={`flex flex-col justify-between space-y-4 transition-all hover:border-[var(--color-primary)] hover:shadow-md ${
                        notice.featured ? 'border-amber-300 dark:border-amber-800' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Header: Badge & Date */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {renderCategoryBadge(notice.category, notice.categoryNameBn, notice.categoryNameEn)}
                            {notice.featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                                <Sparkles className="w-3 h-3" />
                                {isBn ? 'বিশেষ নোটিশ' : 'Featured'}
                              </span>
                            )}
                            {notice.isAdminCreated && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/60 text-red-900 dark:text-red-200 border border-red-300 dark:border-red-700">
                                <ShieldAlert className="w-3 h-3" />
                                {isBn ? 'অ্যাডমিন ড্রাফট' : 'Admin Draft'}
                              </span>
                            )}
                          </div>
                          <time className="text-xs text-[var(--text-muted)] flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                            <span>{formattedDate}</span>
                          </time>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)] leading-snug">
                          {notice.isExternal ? (
                            <a
                              href={notice.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--color-primary)] hover:underline inline-flex items-start gap-1"
                            >
                              <span>{title}</span>
                              {notice.isPdf ? (
                                <Download className="w-3.5 h-3.5 shrink-0 mt-1 text-[var(--color-primary)]" />
                              ) : (
                                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 text-[var(--color-primary)]" />
                              )}
                            </a>
                          ) : (
                            <Link
                              href={notice.link}
                              className="hover:text-[var(--color-primary)] hover:underline inline-flex items-start gap-1"
                            >
                              <span>{title}</span>
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-1 text-[var(--color-primary)]" />
                            </Link>
                          )}
                        </h3>

                        {/* Subtitle Highlight for NU notices */}
                        {notice.isPdf && (
                          <div className="text-xs px-2.5 py-1 rounded bg-[var(--surface-muted)] text-[var(--text-secondary)] font-medium flex items-center gap-1.5 border border-[var(--border-subtle)]">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>
                              {isBn
                                ? 'জাতীয় বিশ্ববিদ্যালয় পাবলিক সার্ভার থেকে সত্যায়িত সার্কুলার'
                                : 'Extracted directly from National University public server'}
                            </span>
                          </div>
                        )}

                        {/* Summary */}
                        <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {summary}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-[var(--text-muted)] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{source}</span>
                        </span>

                        {notice.isExternal ? (
                          <a
                            href={notice.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline bg-[var(--surface-muted)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] transition-colors"
                          >
                            <span>{notice.isPdf ? (isBn ? 'মূল পিডিএফ দেখুন' : 'View Official PDF') : isBn ? 'বিস্তারিত দেখুন' : 'Read Full Post'}</span>
                            {notice.isPdf ? (
                              <Download className="w-3.5 h-3.5" />
                            ) : (
                              <ExternalLink className="w-3.5 h-3.5" />
                            )}
                          </a>
                        ) : (
                          <Link
                            href={notice.link}
                            className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] hover:underline bg-[var(--surface-muted)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] transition-colors"
                          >
                            <span>
                              {notice.category === 'routine'
                                ? isBn
                                  ? 'রুটিন দেখুন'
                                  : 'View Routine'
                                : notice.category === 'admission'
                                ? isBn
                                  ? 'ভর্তি নির্দেশিকা'
                                  : 'Admission Guide'
                                : isBn
                                ? 'বিস্তারিত দেখুন'
                                : 'Read Details'}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Administrator Notice Publisher Sandbox (Collapsible Local Tool) */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="w-full p-4 md:p-5 flex items-center justify-between gap-4 text-left hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-expanded={isAdminOpen}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
                  {t('admin_publisher_heading')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                  {t('admin_publisher_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs px-2.5 py-1 rounded bg-[var(--surface-muted)] text-[var(--text-secondary)] font-semibold border border-[var(--border-subtle)] hidden sm:inline-block">
                {isBn ? 'লোকাল স্যান্ডবক্স' : 'Local Sandbox'}
              </span>
              {isAdminOpen ? (
                <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
              )}
            </div>
          </button>

          {isAdminOpen && (
            <div className="p-4 md:p-6 border-t border-[var(--border-subtle)] space-y-5 bg-[var(--surface-muted)]/40">
              <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {isBn
                    ? 'সতর্কবার্তা: এটি একটি ক্লায়েন্ট-সাইড লোকাল প্রিভিউ স্যান্ডবক্স। এখানে ড্রাফট করা নোটিশ আপনার বর্তমান ব্রাউজারের লোকালস্টোরেজে প্রিভিউ হিসেবে সংরক্ষিত হবে। কোনো সার্ভার বা ডেটাবেজে আপলোড হয় না।'
                    : 'Notice: This is a client-side local preview sandbox. Drafted notices are rendered locally in this browser using LocalStorage. No server-side database mutation occurs.'}
                </span>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_title_bn')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={adminTitleBn}
                      onChange={(e) => setAdminTitleBn(e.target.value)}
                      placeholder={isBn ? 'উদাঃ একাদশ শ্রেণির বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি' : 'e.g. একাদশ শ্রেণির বার্ষিক পরীক্ষা'}
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_title_en')}
                    </label>
                    <input
                      type="text"
                      value={adminTitleEn}
                      onChange={(e) => setAdminTitleEn(e.target.value)}
                      placeholder="e.g. Schedule of XI Class Annual Examination 2026"
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_category')}
                    </label>
                    <select
                      value={adminCategory}
                      onChange={(e) => setAdminCategory(e.target.value as NoticeCategoryFilter)}
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    >
                      <option value="general">{isBn ? 'সাধারণ / General' : 'General'}</option>
                      <option value="exam">{isBn ? 'পরীক্ষা / Examination' : 'Examination'}</option>
                      <option value="routine">{isBn ? 'রুটিন / Routine' : 'Routine'}</option>
                      <option value="admission">{isBn ? 'ভর্তি সংক্রান্ত / Admission' : 'Admission'}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_date')}
                    </label>
                    <input
                      type="date"
                      value={adminDate}
                      onChange={(e) => setAdminDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_summary_bn')} *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={adminSummaryBn}
                      onChange={(e) => setAdminSummaryBn(e.target.value)}
                      placeholder={isBn ? 'শিক্ষার্থীদের জন্য সংক্ষিপ্ত নির্দেশনা ও সারসংক্ষেপ...' : 'Brief Bengali summary...'}
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_summary_en')}
                    </label>
                    <textarea
                      rows={2}
                      value={adminSummaryEn}
                      onChange={(e) => setAdminSummaryEn(e.target.value)}
                      placeholder="Brief English summary for students..."
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">
                      {t('admin_form_link')}
                    </label>
                    <input
                      type="text"
                      value={adminLink}
                      onChange={(e) => setAdminLink(e.target.value)}
                      placeholder="/routine বা অনলাইন পিডিএফ লিংক"
                      className="w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('admin_btn_preview')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[var(--surface-primary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('admin_btn_export')}</span>
                  </button>

                  {adminNotices.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearDrafts}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('admin_btn_clear')}</span>
                    </button>
                  )}
                </div>

                {adminMsg && (
                  <div
                    className={`text-xs p-3 rounded-lg flex items-center gap-2 ${
                      adminMsg.isError
                        ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>{adminMsg.text}</span>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Emergency Notice / General Guidance Box */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-l-amber-500 rounded-xl p-5 md:p-6 space-y-2">
          <h4 className="text-sm md:text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
            <span>{isBn ? 'নোটিশ বোর্ড সংক্রান্ত সাধারণ নির্দেশনা' : 'Official Notice Board Advisory'}</span>
          </h4>
          <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            {isBn
              ? 'পরীক্ষা, রেজিস্ট্রেশন ও ভর্তি সংক্রান্ত যেকোনো তারিখ বা সময়সূচি ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের আনুষ্ঠানিক সার্কুলার অনুযায়ী পরিবর্তিত হতে পারে। শিক্ষার্থী ও অভিভাবকদের কলেজের নোটিশ বোর্ড এবং সংশ্লিষ্ট বোর্ডের অফিসিয়াল ওয়েবসাইটে নিয়মিত নজর রাখার অনুরোধ করা হচ্ছে।'
              : 'Examination schedules, registration timelines, and admission dates are subject to official circulars issued by the Board of Intermediate & Secondary Education, Dhaka, and National University. Students and guardians are requested to monitor this notice board and official portals regularly.'}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
