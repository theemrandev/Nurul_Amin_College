'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
  className?: string;
  align?: 'left' | 'right';
  triggerClassName?: string;
}

export function Dropdown({
  label,
  items,
  isActive = false,
  className = '',
  align = 'left',
  triggerClassName = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closeDropdown]);

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hover with 150ms intent delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      triggerRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const firstItem = menuRef.current?.querySelector('a') as HTMLElement | null;
        firstItem?.focus();
      }
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      triggerRef.current?.focus();
      return;
    }

    const itemLinks = menuRef.current?.querySelectorAll('a');
    if (!itemLinks) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % itemLinks.length;
      (itemLinks[nextIndex] as HTMLElement).focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + itemLinks.length) % itemLinks.length;
      (itemLinks[prevIndex] as HTMLElement).focus();
    } else if (e.key === 'Tab') {
      closeDropdown();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[36px] whitespace-nowrap ${
          isActive || isOpen
            ? 'text-[var(--color-primary)] dark:text-[var(--color-primary-light)] font-bold bg-[var(--bg-muted)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
        } ${triggerClassName}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          role="menu"
          aria-label={label}
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } top-full z-50 mt-1 min-w-[220px] sm:min-w-[240px] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] p-1.5 shadow-xl transition-all animate-in fade-in slide-in-from-top-1 duration-150`}
        >
          {items.map((item, idx) => (
            <li key={item.id} role="none">
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onKeyDown={(e) => handleItemKeyDown(e, idx)}
                  onClick={closeDropdown}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] dark:hover:text-white transition-colors focus-visible:bg-[var(--bg-muted)] focus-visible:outline-none min-h-[38px]"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  role="menuitem"
                  onKeyDown={(e) => handleItemKeyDown(e, idx)}
                  onClick={closeDropdown}
                  className="block rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--color-primary)] dark:hover:text-white transition-colors focus-visible:bg-[var(--bg-muted)] focus-visible:outline-none min-h-[38px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
