"use client";

import React from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Wordmark } from "./Wordmark";
import { useI18n } from "../context/I18nContext";
import { personalInfo } from "../data/portfolio";

export function Footer() {
  const { t } = useI18n();

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (id === "home") {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      } else {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }

      if (window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 glass-panel pt-16 pb-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <Wordmark isDarkContext={false} />
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-500">
                Based in Dhaka, Bangladesh · Available Globally
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-4">
              {t.footer.navigationTitle}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="py-1.5 min-h-[32px] inline-flex items-center text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social and Professional Channels */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-4">
              {t.footer.socialTitle}
            </h4>
            <div className="flex flex-col space-y-1 text-sm">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-1 min-h-[32px] inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:translate-x-1 transition-all duration-200"
              >
                <GithubIcon className="size-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-1 min-h-[32px] inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:translate-x-1 transition-all duration-200"
              >
                <LinkedinIcon className="size-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group py-1 min-h-[32px] inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:translate-x-1 transition-all duration-200"
              >
                <Mail className="size-4" />
                <span>Email</span>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                className="group py-1 min-h-[32px] inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:translate-x-1 transition-all duration-200"
              >
                <Phone className="size-4" />
                <span>Phone</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            © {currentYear} {personalInfo.name} ({personalInfo.brandName}). {t.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-button text-neutral-700 dark:text-neutral-300 hover:border-editorial-accent/60 dark:hover:border-editorial-accent/60 hover:text-editorial-accent dark:hover:text-editorial-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
