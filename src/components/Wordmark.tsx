"use client";

import React from "react";
import Image from "next/image";

interface WordmarkProps {
  className?: string;
  isDarkContext?: boolean; // When rendered in a dark container
}

export const Wordmark = React.memo(function Wordmark({
  className = "",
  isDarkContext = false,
}: WordmarkProps) {
  const handleScrollHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (window.history.pushState) {
      window.history.pushState(null, "", "#home");
    }
  };

  return (
    <a
      href="#home"
      onClick={handleScrollHome}
      aria-label="theemrandev - Home"
      className={`group inline-flex items-center select-none focus:outline-none focus:ring-2 focus:ring-editorial-accent/60 rounded-lg px-1.5 py-1 min-h-[36px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {isDarkContext ? (
        /* Dark container context: Always display the light/copper brand logo */
        <Image
          src="/theemrandev-brand-logo-dark.png"
          alt="theemrandev"
          width={175}
          height={36}
          priority
          className="h-8 sm:h-9 w-auto max-w-[175px] object-contain"
        />
      ) : (
        <>
          {/* Light Theme: Dark text with copper accent on light frosted glass */}
          <Image
            src="/theemrandev-brand-logo-light.png"
            alt="theemrandev"
            width={175}
            height={36}
            priority
            className="h-8 sm:h-9 w-auto max-w-[175px] object-contain block dark:hidden"
          />
          {/* Dark Theme: White text with copper accent on dark frosted glass */}
          <Image
            src="/theemrandev-brand-logo-dark.png"
            alt="theemrandev"
            width={175}
            height={36}
            priority
            className="h-8 sm:h-9 w-auto max-w-[175px] object-contain hidden dark:block"
          />
        </>
      )}
    </a>
  );
});


