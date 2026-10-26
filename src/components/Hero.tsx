"use client";

import React from "react";
import { ArrowRight, Download, Mail, Phone, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useI18n } from "../context/I18nContext";
import { personalInfo } from "../data/portfolio";

export function Hero() {
  const { t } = useI18n();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      if (window.history.pushState) {
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="reveal-on-scroll is-revealed relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden scroll-mt-24"
    >
      {/* Subtle editorial warm ambient glow behind hero - restrained, non-distracting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 size-[32rem] sm:size-[42rem] rounded-full opacity-25 dark:opacity-15 -z-10"
        style={{
          background: "radial-gradient(circle, #c4783c 0%, rgba(196, 120, 60, 0.15) 35%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Region: Headline, Role & CTAs */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-10 sm:mb-14">
          {/* Status Badge */}
          <div
            className="hero-animate-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 glass-card text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-xs mb-6 transition-all hover:border-editorial-accent/40"
            style={{ animationDelay: "80ms" }}
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span>{t.hero.badge}</span>
          </div>

          {/* Monospace Greeting */}
          <p
            className="hero-animate-in text-sm sm:text-base font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2"
            style={{ animationDelay: "180ms" }}
          >
            {t.hero.greeting}
          </p>

          {/* Heading */}
          <h1
            id="hero-title"
            className="hero-animate-in text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12] mb-4"
            style={{ animationDelay: "280ms" }}
          >
            {t.hero.name}
            <span className="block mt-2 font-serif italic font-normal text-3xl sm:text-4xl lg:text-5xl text-editorial-accent">
              {t.hero.role}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="hero-animate-in text-base sm:text-lg leading-relaxed text-black dark:text-neutral-300 max-w-2xl mb-8"
            style={{ animationDelay: "400ms" }}
          >
            {t.hero.tagline}
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div
            className="hero-animate-in flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto"
            style={{ animationDelay: "520ms" }}
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "projects")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <span>{t.hero.viewWork}</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-200/90 dark:border-neutral-700/80 glass-button hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-sm font-semibold text-neutral-900 dark:text-white transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <span>{t.hero.getInTouch}</span>
            </a>

            <a
              href={personalInfo.cvPath}
              download="Md_Emran_Chokder_Frontend_Developer_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-editorial-accent/40 bg-editorial-accent/10 hover:bg-editorial-accent/20 hover:border-editorial-accent/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-editorial-accent text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <Download className="size-4" />
              <span>{t.hero.downloadCv}</span>
            </a>
          </div>

          {/* Social and Direct Contact Strip */}
          <div
            className="hero-animate-in flex items-center justify-center gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800 w-full max-w-md"
            style={{ animationDelay: "640ms" }}
          >
            <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mr-2">
              Connect:
            </span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="grid place-items-center size-9 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-editorial-accent dark:hover:border-editorial-accent text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="grid place-items-center size-9 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-editorial-accent dark:hover:border-editorial-accent text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Send Email"
              className="grid place-items-center size-9 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-editorial-accent dark:hover:border-editorial-accent text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <Mail className="size-4" />
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              aria-label="Call Emran"
              className="grid place-items-center size-9 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-editorial-accent dark:hover:border-editorial-accent text-neutral-700 dark:text-neutral-300 hover:text-editorial-accent dark:hover:text-editorial-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <Phone className="size-4" />
            </a>
          </div>
        </div>

        {/* Featured Hero Banner: md-emran-chokder-theemrandev-portfolio-banner.png */}
        {/* Strictly preserves original banner image without any distortions, animations, face modifications, or regeneration */}
        <div
          className="hero-animate-in relative w-full max-w-5xl mx-auto mt-4"
          style={{ animationDelay: "760ms" }}
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            <picture className="block w-full">
              <source
                type="image/avif"
                srcSet="/md-emran-chokder-theemrandev-portfolio-banner-800.avif 800w, /md-emran-chokder-theemrandev-portfolio-banner-1200.avif 1200w, /md-emran-chokder-theemrandev-portfolio-banner.avif 1983w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              />
              <source
                type="image/webp"
                srcSet="/md-emran-chokder-theemrandev-portfolio-banner-800.webp 800w, /md-emran-chokder-theemrandev-portfolio-banner-1200.webp 1200w, /md-emran-chokder-theemrandev-portfolio-banner.webp 1983w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/md-emran-chokder-theemrandev-portfolio-banner.png"
                alt="Md Emran Chokder (theemrandev) — Frontend Developer Portfolio Banner"
                width={1983}
                height={793}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain block select-none"
                style={{ aspectRatio: "1983 / 793" }}
              />
            </picture>
          </div>

          {/* Floating Editorial Badge */}
          <div className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-8 glass-card rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-xl border border-neutral-200 dark:border-neutral-700 flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="grid place-items-center size-8 rounded-xl bg-editorial-accent/15 text-editorial-accent shrink-0">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">
                {t.hero.focusTitle}
              </p>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                {t.hero.focusSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
