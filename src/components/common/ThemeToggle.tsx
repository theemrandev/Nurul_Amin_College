'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function ThemeToggle({ className = '', size = 'sm' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, isMounted } = useTheme();
  const { t } = useLanguage();

  const isSmall = size === 'sm';
  const buttonDimensions = isSmall ? 'h-8 w-8 min-h-[32px] min-w-[32px]' : 'h-11 w-11 min-h-[44px] min-w-[44px]';

  // Placeholder while mounting to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-muted)] text-[var(--text-muted)] ${buttonDimensions} ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const ariaLabel = isDark
    ? t('a11y_switch_theme') + ' (Switch to Light Mode)'
    : t('a11y_switch_theme') + ' (Switch to Dark Mode)';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] ${buttonDimensions} ${className}`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" aria-hidden="true" />
      )}
    </button>
  );
}
