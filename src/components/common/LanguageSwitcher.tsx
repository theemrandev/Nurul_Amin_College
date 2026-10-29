'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface LanguageSwitcherProps {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({
  className = '',
  size = 'sm',
  variant = 'default',
}: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-muted)] hover:bg-[var(--bg-surface)] text-xs transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] select-none ${className}`}
        aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
        title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
      >
        <span
          className={`text-[11px] font-bold px-1 py-0.5 rounded transition-colors ${
            lang === 'bn'
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--text-muted)]'
          }`}
        >
          বাং
        </span>
        <span className="text-[var(--border-strong)] text-[10px] font-mono">/</span>
        <span
          className={`text-[11px] font-bold px-1 py-0.5 rounded transition-colors ${
            lang === 'en'
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--text-muted)]'
          }`}
        >
          EN
        </span>
      </button>
    );
  }

  const isSmall = size === 'sm';

  return (
    <div
      className={`inline-flex rounded-lg border border-[var(--border-strong)] bg-[var(--bg-muted)] p-0.5 shadow-sm ${className}`}
      role="group"
      aria-label="Language selection / ভাষা নির্বাচন"
    >
      <button
        type="button"
        onClick={() => setLang('bn')}
        className={`rounded-md font-semibold transition-all ${
          isSmall ? 'px-2.5 py-1 text-xs min-h-[32px]' : 'px-3.5 py-1.5 text-sm min-h-[44px]'
        } ${
          lang === 'bn'
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        aria-pressed={lang === 'bn'}
      >
        বাংলা
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded-md font-semibold transition-all ${
          isSmall ? 'px-2.5 py-1 text-xs min-h-[32px]' : 'px-3.5 py-1.5 text-sm min-h-[44px]'
        } ${
          lang === 'en'
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        aria-pressed={lang === 'en'}
      >
        English
      </button>
    </div>
  );
}
