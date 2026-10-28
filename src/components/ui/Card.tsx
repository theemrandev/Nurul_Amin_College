import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({
  variant = 'standard',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all';

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const variantStyles = {
    standard:
      'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm',
    elevated:
      'bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-md',
    bordered:
      'bg-transparent border-2 border-[var(--border-strong)] text-[var(--text-primary)]',
  }[variant];

  return (
    <div className={`${baseStyles} ${paddingStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
