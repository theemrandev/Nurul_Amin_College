'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAVIGATION } from '@/lib/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Dropdown } from '@/components/ui/Dropdown';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onOpenMobileNav: () => void;
}

export function Navbar({ onOpenMobileNav }: NavbarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--bg-surface-elevated)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm transition-colors"
      role="banner"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-5 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-2 sm:gap-3 lg:gap-4">
          {/* ================================================================= */}
          {/* LEFT: Logo & Bilingual College Identity                           */}
          {/* ================================================================= */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-lg p-0.5 min-w-0"
            aria-label="Nurul Amin Degree College Home"
          >
            {/* Authentic College Logo from Project Assets */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <Image
                src="/images/logo (4).png"
                alt="নুরুল আমিন ডিগ্রি কলেজ লোগো / Nurul Amin Degree College Logo"
                fill
                sizes="(max-width: 640px) 36px, (max-width: 1024px) 44px, 48px"
                priority
                className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Bilingual College Names (Bengali first, English directly underneath) */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-xs sm:text-base lg:text-base xl:text-lg font-bold tracking-tight text-[var(--color-primary)] dark:text-[var(--color-primary-light)] leading-tight truncate">
                নুরুল আমিন ডিগ্রি কলেজ
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-[var(--text-secondary)] leading-tight truncate mt-0.5">
                Nurul Amin Degree College
              </span>
            </div>
          </Link>

          {/* ================================================================= */}
          {/* RIGHT (Desktop lg+): Navigation Menu + Language + Theme Controls   */}
          {/* ================================================================= */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
            {/* Primary Desktop Navigation Links */}
            <nav role="navigation" aria-label="Primary Navigation">
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {PRIMARY_NAVIGATION.map((item, index) => {
                  const hasSubmenu = item.items && item.items.length > 0;
                  const isDirectActive = pathname === item.href;
                  const isChildActive =
                    hasSubmenu && item.items?.some((sub) => pathname.startsWith(sub.href));
                  const isActive = isDirectActive || isChildActive;

                  if (hasSubmenu && item.items) {
                    const dropdownItems = item.items.map((sub) => ({
                      id: sub.id,
                      label: t(sub.titleKey),
                      href: sub.href,
                      isExternal: sub.isExternal,
                    }));

                    const align = index >= PRIMARY_NAVIGATION.length - 2 ? 'right' : 'left';

                    return (
                      <li key={item.id} className="relative">
                        <Dropdown
                          label={t(item.titleKey)}
                          items={dropdownItems}
                          isActive={isActive}
                          align={align}
                        />
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[36px] whitespace-nowrap ${
                          isActive
                            ? 'text-[var(--color-primary)] dark:text-[var(--color-primary-light)] bg-[var(--bg-muted)] font-bold border-b-2 border-[var(--color-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {t(item.titleKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Subtle Vertical Divider */}
            <div className="h-5 w-px bg-[var(--border-strong)] mx-0.5 xl:mx-1" aria-hidden="true" />

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-1 xl:gap-1.5">
              <LanguageSwitcher size="sm" variant="compact" />
              <ThemeToggle size="sm" />
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT (Mobile < lg): Single Row with Language, Theme & Drawer     */}
          {/* ================================================================= */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <LanguageSwitcher size="sm" variant="compact" />
            <ThemeToggle size="sm" />
            <button
              type="button"
              onClick={onOpenMobileNav}
              className="inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[36px] min-w-[36px]"
              aria-label={t('a11y_open_menu')}
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
