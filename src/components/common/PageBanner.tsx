import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: React.ReactNode;
}

export function PageBanner({ title, subtitle, breadcrumbs, badge }: PageBannerProps) {
  return (
    <div className="relative bg-gradient-to-b from-[var(--color-primary-soft)] via-[var(--bg-surface)] to-[var(--bg-primary)] border-b border-[var(--border-subtle)] py-8 sm:py-12 px-4 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-[var(--color-primary)] dark:hover:text-amber-300 transition-colors py-0.5"
              >
                <Home className="w-3.5 h-3.5" aria-hidden="true" />
                <span>মূলপাতা / Home</span>
              </Link>
            </li>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  <li aria-hidden="true" className="text-[var(--text-muted)]">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li>
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="hover:text-[var(--color-primary)] dark:hover:text-amber-300 transition-colors py-0.5"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className="font-semibold text-[var(--color-primary)] dark:text-amber-300"
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        {/* Title, Badge & Subtitle */}
        <div className="space-y-2">
          {badge && <div className="mb-2">{badge}</div>}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-primary)] dark:text-[var(--color-primary-light)] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
