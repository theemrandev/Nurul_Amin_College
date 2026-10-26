"use client";

import React from "react";
import {
  Smartphone,
  Layers,
  Database,
  Gauge,
  CheckCheck,
} from "lucide-react";
import { FigmaIcon } from "./Icons";
import { useI18n } from "../context/I18nContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Services() {
  const { t } = useI18n();
  const revealRef = useScrollReveal<HTMLElement>();

  const services = [
    {
      num: "01",
      icon: Smartphone,
      title: t.services.s1Title,
      desc: t.services.s1Desc,
    },
    {
      num: "02",
      icon: Layers,
      title: t.services.s2Title,
      desc: t.services.s2Desc,
    },
    {
      num: "03",
      icon: Database,
      title: t.services.s3Title,
      desc: t.services.s3Desc,
    },
    {
      num: "04",
      icon: Gauge,
      title: t.services.s4Title,
      desc: t.services.s4Desc,
    },
    {
      num: "05",
      icon: FigmaIcon,
      title: t.services.s5Title,
      desc: t.services.s5Desc,
    },
    {
      num: "06",
      icon: CheckCheck,
      title: t.services.s6Title,
      desc: t.services.s6Desc,
    },
  ];

  return (
    <section
      id="services"
      ref={revealRef}
      aria-labelledby="services-heading"
      className="reveal-on-scroll py-16 sm:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-accent font-semibold">
            {t.services.sectionTag}
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2 mb-4"
          >
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="stagger-child glass-card group relative rounded-3xl p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={
                  {
                    "--stagger-delay": `${idx * 75 + 50}ms`,
                  } as React.CSSProperties
                }
              >
                {/* Subtle luminous accent hairline on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-editorial-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
                      {item.num}
                    </span>
                    <div className="grid place-items-center size-10 rounded-2xl glass-panel text-editorial-accent group-hover:bg-editorial-accent group-hover:text-white transition-all duration-200 shadow-xs group-hover:scale-105">
                      <Icon className="size-5 transition-transform duration-200 group-hover:rotate-3" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2.5 group-hover:text-editorial-accent transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-black dark:text-neutral-300">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  <span>Standard Compliant</span>
                  <span className="text-editorial-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
