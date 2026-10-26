"use client";

import React from "react";
import { ExternalLink, ArrowUpRight, Code, Laptop, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useI18n } from "../context/I18nContext";
import { projectsList } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Projects() {
  const { t } = useI18n();
  const revealRef = useScrollReveal<HTMLElement>();

  const projectTranslations = {
    p1: { title: t.projects.p1Title, desc: t.projects.p1Desc },
    p2: { title: t.projects.p2Title, desc: t.projects.p2Desc },
    p3: { title: t.projects.p3Title, desc: t.projects.p3Desc },
  };

  const projectPreviews = {
    p1: { type: "E-Commerce App", badge: "Production App" },
    p2: { type: "Institutional Portal", badge: "Client Solution" },
    p3: { type: "Component System", badge: "Open Source" },
  };

  return (
    <section
      id="projects"
      ref={revealRef}
      aria-labelledby="projects-heading"
      className="reveal-on-scroll py-16 sm:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-accent font-semibold">
            {t.projects.sectionTag}
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2 mb-4"
          >
            {t.projects.title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, idx) => {
            const data = projectTranslations[project.id as keyof typeof projectTranslations];
            const meta = projectPreviews[project.id as keyof typeof projectPreviews] || {
              type: "Web Application",
              badge: "Frontend Project",
            };

            return (
              <article
                key={project.id}
                className="stagger-child glass-card group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={
                  {
                    "--stagger-delay": `${idx * 120 + 80}ms`,
                  } as React.CSSProperties
                }
              >
                {/* Luminous Top Accent Hairline on Hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-editorial-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div>
                  {/* Visual Preview Header with Simulated UI Canvas & subtle zoom */}
                  <div className="relative mb-5 rounded-2xl overflow-hidden glass-panel p-4 transition-all duration-300 group-hover:border-editorial-accent/30">
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200/80 dark:border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                        0{idx + 1} &middot; {meta.badge}
                      </span>
                    </div>

                    {/* Interactive Preview Canvas */}
                    <div className="py-4 px-2 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-[1.03]">
                      <div className="grid place-items-center size-10 rounded-xl glass-button text-editorial-accent shadow-xs mb-2.5">
                        <Laptop className="size-5" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        {meta.type}
                      </span>
                      {project.metrics && (
                        <span className="mt-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                          {project.metrics}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2.5 group-hover:text-editorial-accent transition-colors flex items-center justify-between">
                    <span>{data.title}</span>
                    <ArrowUpRight className="size-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-editorial-accent duration-200" />
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-black dark:text-neutral-300 mb-6">
                    {data.desc}
                  </p>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-editorial-accent/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-editorial-accent dark:hover:text-editorial-accent transition-colors py-1 px-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{t.projects.viewLive}</span>
                    </a>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <GithubIcon className="size-3.5" />
                      <span>{t.projects.viewCode}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
