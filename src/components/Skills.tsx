"use client";

import React, { useState } from "react";
import { Code2, Server, Cloud, BrainCircuit, Sparkles, CheckCircle2 } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { skillGroups, SkillGroup } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { TechLogo } from "./TechLogos";

export function Skills() {
  const { t } = useI18n();
  const revealRef = useScrollReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "devops" | "genai">("all");

  const groupMeta = {
    frontend: {
      title: t.skills.catFrontend,
      icon: Code2,
      badgeText: "Core Stack",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
      isLearning: false,
      desc: "Architecting high-performance, responsive, accessible, and type-safe web applications.",
    },
    backend: {
      title: t.skills.catBackend,
      icon: Server,
      badgeText: t.skills.learningBadge,
      badgeColor: "bg-editorial-accent/10 text-editorial-accent border-editorial-accent/25",
      isLearning: true,
      desc: "Expanding server-side competence in RESTful APIs, relational/NoSQL databases, authentication, and caching.",
    },
    devops: {
      title: t.skills.catDevops,
      icon: Cloud,
      badgeText: t.skills.learningBadge,
      badgeColor: "bg-editorial-accent/10 text-editorial-accent border-editorial-accent/25",
      isLearning: true,
      desc: "Building foundations in Linux automation, containerization, cloud infrastructure, and CI/CD delivery.",
    },
    genai: {
      title: t.skills.catGenai,
      icon: BrainCircuit,
      badgeText: t.skills.learningBadge,
      badgeColor: "bg-editorial-accent/10 text-editorial-accent border-editorial-accent/25",
      isLearning: true,
      desc: "Exploring frontier agentic AI workflows, RAG knowledge retrieval, LangGraph, and Model Context Protocol (MCP).",
    },
  };

  // Extract ONLY learned Frontend skills from the existing skill data
  const frontendGroup = skillGroups.find((g) => g.id === "frontend");
  const allFrontendSkills = frontendGroup ? frontendGroup.skills : [];

  // Frontend Marquee Row 1: Core Languages, UI Frameworks, & State Management (Learned Frontend Skills Only)
  const marqueeRow1 = allFrontendSkills.slice(0, 11);

  // Frontend Marquee Row 2: Tooling, Layout Systems, Design & Integration (Learned Frontend Skills Only)
  const marqueeRow2 = allFrontendSkills.slice(11);

  const filteredGroups =
    activeTab === "all"
      ? skillGroups
      : skillGroups.filter((g) => g.id === activeTab);

  return (
    <section
      id="skills"
      ref={revealRef}
      aria-labelledby="skills-heading"
      className="reveal-on-scroll py-16 sm:py-24 border-t border-neutral-200 dark:border-neutral-800 relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-accent font-semibold">
            {t.skills.sectionTag}
          </span>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2 mb-4"
          >
            {t.skills.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t.skills.subtitle}
          </p>
        </div>

        {/* ============================================================== */}
        {/* CONTINUOUS RIGHT-TO-LEFT MARQUEE SHOWCASE                     */}
        {/* Learned Frontend Skills Only - Dual-track infinite hardware ticker */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-18 space-y-3.5 relative">
          {/* Subtle Mask Gradient Fade on Left & Right Edges */}
          <div className="w-full overflow-hidden marquee-mask py-1">
            {/* Track 1: Core Learned Frontend Technologies */}
            <div className="flex w-max animate-marquee-rtl select-none hover:[animation-play-state:paused]">
              {/* Primary Sequence */}
              <div className="flex items-center gap-3 shrink-0 pr-3">
                {marqueeRow1.map((item, idx) => (
                  <div
                    key={`r1-a-${idx}`}
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card text-neutral-900 dark:text-white shadow-2xs hover:border-editorial-accent/60 dark:hover:border-editorial-accent/60 hover:shadow-md transition-all duration-200 group"
                  >
                    <TechLogo name={item.name} className="size-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60 whitespace-nowrap">
                      {item.tag || "Frontend"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Seamless Duplicate Sequence (aria-hidden for accessible screen readers) */}
              <div aria-hidden="true" className="flex items-center gap-3 shrink-0 pr-3">
                {marqueeRow1.map((item, idx) => (
                  <div
                    key={`r1-b-${idx}`}
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card text-neutral-900 dark:text-white shadow-2xs hover:border-editorial-accent/60 dark:hover:border-editorial-accent/60 hover:shadow-md transition-all duration-200 group"
                  >
                    <TechLogo name={item.name} className="size-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60 whitespace-nowrap">
                      {item.tag || "Frontend"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Track 2: Tooling & Architecture Learned Frontend Technologies (Complementary RTL Speed) */}
          <div className="w-full overflow-hidden marquee-mask py-1">
            <div className="flex w-max animate-marquee-rtl-slow select-none hover:[animation-play-state:paused]">
              {/* Primary Sequence */}
              <div className="flex items-center gap-3 shrink-0 pr-3">
                {marqueeRow2.map((item, idx) => (
                  <div
                    key={`r2-a-${idx}`}
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card text-neutral-900 dark:text-white shadow-2xs hover:border-editorial-accent/60 dark:hover:border-editorial-accent/60 hover:shadow-md transition-all duration-200 group"
                  >
                    <TechLogo name={item.name} className="size-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60 whitespace-nowrap">
                      {item.tag || "Frontend"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Seamless Duplicate Sequence */}
              <div aria-hidden="true" className="flex items-center gap-3 shrink-0 pr-3">
                {marqueeRow2.map((item, idx) => (
                  <div
                    key={`r2-b-${idx}`}
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card text-neutral-900 dark:text-white shadow-2xs hover:border-editorial-accent/60 dark:hover:border-editorial-accent/60 hover:shadow-md transition-all duration-200 group"
                  >
                    <TechLogo name={item.name} className="size-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60 whitespace-nowrap">
                      {item.tag || "Frontend"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === "all"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            All Disciplines ({skillGroups.reduce((acc, g) => acc + g.skills.length, 0)})
          </button>
          {skillGroups.map((group) => {
            const meta = groupMeta[group.id];
            const isActive = activeTab === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveTab(group.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{meta.title}</span>
                {meta.isLearning && (
                  <span className="size-1.5 rounded-full bg-editorial-accent" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* 4 ORGANIZED DISCIPLINE GROUPS WITH SVG LOGO CARDS             */}
        {/* ============================================================== */}
        <div className="space-y-12 sm:space-y-16">
          {filteredGroups.map((group, groupIdx) => {
            const meta = groupMeta[group.id];
            const Icon = meta.icon;

            return (
              <div
                key={group.id}
                className="stagger-child glass-card rounded-3xl p-6 sm:p-8 transition-all duration-300"
                style={{ "--stagger-delay": `${groupIdx * 80 + 40}ms` } as React.CSSProperties}
              >
                {/* Group Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200/80 dark:border-neutral-800">
                  <div className="flex items-center gap-3.5">
                    <div className="grid place-items-center size-11 rounded-2xl bg-editorial-accent/10 text-editorial-accent shrink-0">
                      <Icon className="size-5.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                          {meta.title}
                        </h3>
                        {/* Learning / Core Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border ${meta.badgeColor}`}
                        >
                          {meta.isLearning ? (
                            <span className="size-1.5 rounded-full bg-editorial-accent animate-pulse" />
                          ) : (
                            <CheckCircle2 className="size-3.5" />
                          )}
                          <span>{meta.badgeText}</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {meta.desc}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 self-start sm:self-center">
                    {group.skills.length} Technologies
                  </span>
                </div>

                {/* Skill Cards Grid (Each with 24–32px SVG Logo and Skill Name) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/50 backdrop-blur-xs hover:bg-white/90 dark:hover:bg-neutral-800 hover:border-editorial-accent/50 dark:hover:border-editorial-accent/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* 28px Recognizable SVG Logo with Brand Colors */}
                      <div className="size-8 rounded-xl grid place-items-center bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0">
                        <TechLogo name={skill.name} className="size-6" />
                      </div>

                      {/* Skill Name & Contextual Category Tag */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate">
                          {skill.name}
                        </h4>
                        {skill.tag && (
                          <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block truncate">
                            {skill.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
