'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRIMARY_NAVIGATION } from '@/lib/navigation';
import { COLLEGE_INFO } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { X, ChevronDown, ExternalLink, Phone, Mail } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { t, lang } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Body Scroll Locking & Focus Restoration
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      const closeBtn = drawerRef.current?.querySelector('button') as HTMLElement | null;
      closeBtn?.focus();
    } else {
      document.body.style.overflow = '';
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard Trap & Escape Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--bg-surface-elevated)] border-l border-[var(--border-strong)] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo (4).png"
                alt="কলেজ প্রতীক"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-light)] leading-tight truncate">
                নুরুল আমিন ডিগ্রি কলেজ
              </p>
              <p className="text-xs font-semibold text-[var(--text-secondary)] leading-tight truncate mt-0.5">
                Nurul Amin Degree College
              </p>
              <span className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5 block">
                EIIN: {COLLEGE_INFO.identity.eiin}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] border border-[var(--border-strong)] min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            aria-label={t('a11y_close_menu')}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Navigation List */}
        <div className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {PRIMARY_NAVIGATION.map((item) => {
              const hasSubmenu = item.items && item.items.length > 0;
              const isExpanded = !!expandedItems[item.id];

              if (hasSubmenu && item.items) {
                return (
                  <li key={item.id} className="border-b border-[var(--border-subtle)] pb-1 mb-1">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                      aria-expanded={isExpanded}
                    >
                      <span>{t(item.titleKey)}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isExpanded && (
                      <ul className="pl-4 pr-1 py-1 space-y-1 bg-[var(--bg-muted)] rounded-lg my-1">
                        {item.items.map((sub) => (
                          <li key={sub.id}>
                            {sub.isExternal ? (
                              <a
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
                              >
                                <span>{t(sub.titleKey)}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                              </a>
                            ) : (
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className="block px-3 py-2.5 rounded-md text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
                              >
                                {t(sub.titleKey)}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-3 rounded-lg text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    {t(item.titleKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer Controls */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <LanguageSwitcher size="md" />
            <ThemeToggle size="md" />
          </div>

          <div className="pt-2 text-xs text-[var(--text-muted)] space-y-1.5 border-t border-[var(--border-subtle)]">
            <a
              href={`tel:${COLLEGE_INFO.contact.phone}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{COLLEGE_INFO.contact.phone}</span>
            </a>
            <a
              href={`mailto:${COLLEGE_INFO.contact.email}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded"
            >
              <Mail className="w-3.5 h-3.5 text-sky-500" />
              <span>{COLLEGE_INFO.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
