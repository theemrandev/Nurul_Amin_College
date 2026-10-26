"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";

export const ThemeToggle = React.memo(function ThemeToggle({
  id = "theme-toggle-button",
  className = "",
}: {
  id?: string;
  className?: string;
} = {}) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      aria-label={`${t.nav.toggleTheme}: ${isDark ? "Light mode" : "Dark mode"}`}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative grid place-items-center size-8 rounded-full glass-button text-neutral-800 dark:text-white active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-editorial-accent cursor-pointer ${className}`}
    >
      <span className="sr-only">
        {isDark ? "Switch to light theme" : "Switch to dark theme"}
      </span>
      {mounted ? (
        isDark ? (
          <Sun
            className="size-4 text-amber-400 transition-transform duration-500 hover:rotate-90 hover:scale-110"
            aria-hidden="true"
          />
        ) : (
          <Moon
            className="size-4 text-neutral-700 transition-transform duration-500 hover:-rotate-45 hover:scale-110"
            aria-hidden="true"
          />
        )
      ) : (
        <>
          <Sun
            className="size-4 text-amber-400 hidden dark:block"
            aria-hidden="true"
          />
          <Moon
            className="size-4 text-neutral-700 block dark:hidden"
            aria-hidden="true"
          />
        </>
      )}
    </button>
  );
});
