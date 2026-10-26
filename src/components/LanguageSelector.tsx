"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { LanguageCode } from "../i18n";

export const LanguageSelector = React.memo(function LanguageSelector() {
  const { language, info, setLanguage, languages, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredLanguages = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      <button
        id="language-selector-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={t.nav.selectLanguage}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white glass-button active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-editorial-accent"
      >
        <Globe className="size-3.5 text-editorial-accent" aria-hidden="true" />
        <span className="font-semibold uppercase tracking-wider">{info.code}</span>
        <span className="hidden sm:inline opacity-75">· {info.name}</span>
        <ChevronDown
          className={`size-3 opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="glass-dropdown absolute end-0 mt-2 w-64 sm:w-72 max-h-96 overflow-hidden rounded-2xl p-2 z-50 text-neutral-900 dark:text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search box for 20 languages */}
          <div className="p-1.5 pb-2 border-b border-neutral-200 dark:border-white/10">
            <input
              type="text"
              placeholder="Search / ভাষা / البحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-white/40 focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto mt-1 space-y-0.5 pr-0.5 custom-scroll">
            {filteredLanguages.length === 0 ? (
              <p className="px-3 py-3 text-xs text-center text-neutral-500 dark:text-white/50">
                No languages found
              </p>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    data-lang-code={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-start ${
                      isSelected
                        ? "bg-editorial-accent text-white font-semibold"
                        : "text-neutral-700 dark:text-white/85 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-black/20 text-white" : "bg-neutral-200 dark:bg-black/30 text-neutral-700 dark:text-white/90"
                      }`}>
                        {lang.code}
                      </span>
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-[11px] opacity-60">
                        ({lang.englishName})
                      </span>
                    </div>
                    {isSelected && <Check className="size-3.5" aria-hidden="true" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});
