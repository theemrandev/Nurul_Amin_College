"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "../context/I18nContext";
import { personalInfo } from "../data/portfolio";

export function Navbar() {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // High-performance IntersectionObserver for scroll-spy active section detection
  useEffect(() => {
    const sections = ["home", "about", "services", "skills", "projects", "contact"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    // Detect section in the reading viewport zone without layout thrashing
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const primary = intersecting.reduce((prev, curr) =>
            curr.intersectionRatio >= prev.intersectionRatio ? curr : prev
          );
          if (primary && primary.target.id) {
            setActiveSection((prev) => (prev !== primary.target.id ? primary.target.id : prev));
          }
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Optimized passive scroll listener for scrolled navbar elevation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth anchor navigation handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.slice(1);
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          document.body.style.overflow = "";
        }
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
    },
    [mobileMenuOpen]
  );

  const navLinks = [
    { href: "#home", label: t.nav.home, id: "home" },
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#services", label: t.nav.services, id: "services" },
    { href: "#skills", label: t.nav.skills, id: "skills" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 max-w-6xl mx-auto">
        <nav
          aria-label="Main Navigation"
          className={`glass-nav rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled ? "is-scrolled" : ""
          }`}
        >
          {/* Brand Wordmark (Theme-aware) */}
          <Wordmark isDarkContext={false} />

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3.5 py-1.5 min-h-[36px] inline-flex items-center text-xs lg:text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive
                        ? "text-neutral-950 dark:text-white bg-neutral-900/[0.08] dark:bg-white/[0.12] font-semibold"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-900/[0.04] dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full bg-editorial-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action Controls: Language, Theme, Download CV */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSelector />
            <ThemeToggle />

            {/* Download CV Button */}
            <a
              href={personalInfo.cvPath}
              download="Md_Emran_Chokder_Frontend_Developer_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-editorial-accent hover:bg-editorial-accentHover active:scale-95 rounded-full transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-editorial-accent focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <Download className="size-3.5" aria-hidden="true" />
              <span>{t.nav.downloadCv}</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-button"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              className="md:hidden grid place-items-center size-9 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-neutral-800 dark:text-white border border-neutral-200 dark:border-white/15 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-editorial-accent"
            >
              {mobileMenuOpen ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-dropdown mt-2 rounded-2xl p-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${
                        isActive
                          ? "bg-editorial-accent text-white font-semibold"
                          : "text-neutral-700 dark:text-white/85 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-neutral-100/70 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10">
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  {t.nav.toggleTheme}
                </span>
                <ThemeToggle id="mobile-drawer-theme-toggle" />
              </div>

              <a
                href={personalInfo.cvPath}
                download="Md_Emran_Chokder_Frontend_Developer_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-neutral-950 bg-editorial-accent hover:bg-editorial-accentHover rounded-xl transition-all shadow-sm active:scale-98"
              >
                <Download className="size-4" aria-hidden="true" />
                <span>{t.nav.downloadCv}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}
    </>
  );
}
