import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'verified' | 'official' | 'gold' | 'muted' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({
  variant = 'official',
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-semibold rounded-full tracking-wide';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  }[size];

  const variantStyles = {
    verified:
      'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
    official:
      'bg-[var(--bg-muted)] text-[var(--color-primary)] border border-[var(--border-strong)]',
    gold:
      'bg-amber-50 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 border border-amber-300 dark:border-amber-700',
    muted:
      'bg-[var(--bg-muted)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    outline:
      'border border-[var(--border-strong)] text-[var(--text-primary)] bg-transparent',
  }[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
}
