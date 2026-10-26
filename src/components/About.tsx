"use client";

import React from "react";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { personalInfo } from "../data/portfolio";

export function About() {
  const { t } = useI18n();
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={revealRef}
      aria-labelledby="about-heading"
      className="reveal-on-scroll py-16 sm:py-24 border-t border-neutral-200 dark:border-neutral-800 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-accent font-semibold">
            {t.about.sectionTag}
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2 mb-4"
          >
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className="stagger-child glass-card rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-lg transition-all duration-300"
              style={{ "--stagger-delay": "80ms" } as React.CSSProperties}
            >
              {/* Author Profile Header with SEO-Optimized Responsive Portrait */}
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
                <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden border-2 border-editorial-accent/60 shadow-md shrink-0 bg-neutral-900">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/md-emran-chokder-theemrandev-portrait-200.avif 200w, /md-emran-chokder-theemrandev-portrait.avif 460w"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/md-emran-chokder-theemrandev-portrait-200.webp 200w, /md-emran-chokder-theemrandev-portrait.webp 460w"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/md-emran-chokder-theemrandev-portrait.png"
                      alt="Md Emran Chokder (theemrandev) — Frontend Developer Portrait"
                      width={460}
                      height={460}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover object-top"
                    />
                  </picture>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-editorial-accent font-semibold">
                    @{personalInfo.brandName} · {personalInfo.role}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {personalInfo.location}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-black dark:text-neutral-200">
                  {t.about.bioP1}
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-black dark:text-neutral-200">
                  {t.about.bioP2}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                className="stagger-child p-4 rounded-2xl glass-panel text-center hover:border-editorial-accent/50 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                style={{ "--stagger-delay": "160ms" } as React.CSSProperties}
              >
                <span className="block text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-mono">
                  1+
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                  {t.about.statsYears}
                </span>
              </div>
              <div
                className="stagger-child p-4 rounded-2xl glass-panel text-center hover:border-editorial-accent/50 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                style={{ "--stagger-delay": "220ms" } as React.CSSProperties}
              >
                <span className="block text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-mono">
                  12+
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                  {t.about.statsProjects}
                </span>
              </div>
              <div
                className="stagger-child p-4 rounded-2xl glass-panel text-center hover:border-editorial-accent/50 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                style={{ "--stagger-delay": "280ms" } as React.CSSProperties}
              >
                <span className="block text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-mono">
                  100%
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                  {t.about.statsCode}
                </span>
              </div>
              <div
                className="stagger-child p-4 rounded-2xl glass-panel text-center hover:border-editorial-accent/50 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                style={{ "--stagger-delay": "340ms" } as React.CSSProperties}
              >
                <span className="block text-2xl sm:text-3xl font-bold text-editorial-accent font-mono">
                  24/7
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                  {t.about.statsCommit}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Academic Records */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="stagger-child glass-card rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-editorial-accent/40 transition-all duration-300"
              style={{ "--stagger-delay": "180ms" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                <GraduationCap className="size-5 text-editorial-accent" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t.about.educationTitle}
                </h3>
              </div>

              <div className="space-y-6">
                {/* HSC */}
                <div className="relative ps-5 border-s-2 border-editorial-accent">
                  <span className="absolute -start-1.5 top-1 size-2.5 rounded-full bg-editorial-accent shadow-[0_0_8px_rgba(196,120,60,0.5)]" />
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {t.about.educationDegree1}
                  </h4>
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                    {t.about.educationSchool1}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                    {t.about.educationYear1}
                  </p>
                </div>

                {/* SSC */}
                <div className="relative ps-5 border-s-2 border-neutral-300 dark:border-neutral-700">
                  <span className="absolute -start-1.5 top-1 size-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {t.about.educationDegree2}
                  </h4>
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                    {t.about.educationSchool2}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                    {t.about.educationYear2}
                  </p>
                </div>
              </div>
            </div>

            {/* Work Readiness Highlight */}
            <div
              className="stagger-child rounded-2xl p-4 bg-editorial-accent/10 border border-editorial-accent/20 flex items-start gap-3 hover:border-editorial-accent/40 transition-colors"
              style={{ "--stagger-delay": "260ms" } as React.CSSProperties}
            >
              <CheckCircle2 className="size-5 text-editorial-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                  Open for Engagement
                </p>
                <p className="text-xs text-neutral-800 dark:text-neutral-300 mt-0.5">
                  Available for remote contract work, full-time engineering roles, and international collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
