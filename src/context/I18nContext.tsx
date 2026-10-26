"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  LanguageCode,
  LanguageInfo,
  TranslationSchema,
  getLanguageInfo,
  getTranslation,
  languages,
} from "../i18n";

interface I18nContextType {
  language: LanguageCode;
  info: LanguageInfo;
  t: TranslationSchema;
  setLanguage: (lang: LanguageCode) => void;
  languages: LanguageInfo[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_lang") as LanguageCode | null;
      if (stored && languages.some((l) => l.code === stored)) {
        setLanguageState(stored);
        updateHtmlAttributes(stored);
      } else {
        // Check browser language
        const browser = navigator.language?.slice(0, 2) as LanguageCode;
        if (browser && languages.some((l) => l.code === browser)) {
          setLanguageState(browser);
          updateHtmlAttributes(browser);
        } else {
          updateHtmlAttributes("en");
        }
      }
    } catch {
      updateHtmlAttributes("en");
    }
  }, []);

  const updateHtmlAttributes = (lang: LanguageCode) => {
    const langInfo = getLanguageInfo(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = langInfo.dir;
  };

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    updateHtmlAttributes(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
    } catch {}
  };

  const t = getTranslation(language);
  const info = getLanguageInfo(language);

  return (
    <I18nContext.Provider value={{ language, info, t, setLanguage, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
