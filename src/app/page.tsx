import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0b0d] bg-grid-pattern relative overflow-x-hidden transition-colors selection:bg-editorial-accent selection:text-white">
      {/* Background Architectural Canvas & Subtle Glassmorphic Refraction Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft Ambient Upper Orb (Illuminates hero glass elements) */}
        <div className="absolute -top-20 right-10 sm:right-1/4 size-[28rem] sm:size-[36rem] rounded-full bg-gradient-to-br from-amber-100/40 via-orange-50/20 to-transparent blur-3xl opacity-70 dark:opacity-15" />
        {/* Soft Mid-Section Slate Orb (Reveals blur behind Services & Skills glass cards) */}
        <div className="absolute top-[32%] -left-16 sm:-left-24 size-[32rem] sm:size-[40rem] rounded-full bg-gradient-to-tr from-slate-200/50 via-neutral-100/30 to-transparent blur-3xl opacity-60 dark:opacity-15" />
        {/* Soft Lower Accent Orb (Provides frosted refraction for Projects & Contact glass panels) */}
        <div className="absolute top-[68%] -right-16 sm:-right-24 size-[34rem] sm:size-[42rem] rounded-full bg-gradient-to-bl from-amber-100/35 via-slate-100/30 to-transparent blur-3xl opacity-60 dark:opacity-15" />
      </div>

      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-editorial-accent focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none focus:min-h-[44px]"
      >
        Skip to main content
      </a>

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Regions */}
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
