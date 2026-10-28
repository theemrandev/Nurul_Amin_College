'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import type { Language } from '@/lib/types';
import bnDict from '@/locales/bn.json';
import enDict from '@/locales/en.json';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dict: Record<string, string>;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const langListeners = new Set<() => void>();

function subscribeLang(callback: () => void) {
  langListeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    langListeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function emitLangChange() {
  for (const listener of langListeners) {
    listener();
  }
}

function getLangSnapshot(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const stored = localStorage.getItem('nac_lang');
    if (stored === 'en' || stored === 'bn') return stored;
    const match = document.cookie.match(/nac_lang=(bn|en)/);
    if (match && (match[1] === 'en' || match[1] === 'bn')) return match[1];
  } catch {}
  return 'bn';
}

function getLangServerSnapshot(): Language {
  return 'bn';
}

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const lang = useSyncExternalStore(
    subscribeLang,
    getLangSnapshot,
    getLangServerSnapshot
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    try {
      localStorage.setItem('nac_lang', newLang);
      document.cookie = `nac_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch {}
    emitLangChange();
  };

  const rawDict = lang === 'bn' ? bnDict : enDict;
  const dict = rawDict as unknown as Record<string, string>;

  const t = (key: string): string => {
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dict, isMounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
