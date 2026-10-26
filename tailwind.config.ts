import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        editorial: {
          dark: "#0a0b0d",
          cardDark: "#121418",
          borderDark: "#22252c",
          light: "#fbfaf8",
          cardLight: "#ffffff",
          borderLight: "#e7e4dc",
          accent: "#c4783c", // Warm terracotta / burnt amber
          accentHover: "#b26830",
          accentMuted: "rgba(196, 120, 60, 0.12)",
        },
      },
      fontFamily: {
        serif: ["var(--font-editorial-serif)", "Georgia", "serif"],
        sans: ["var(--font-editorial-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-editorial-mono)", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        editorial: "1.25rem",
      },
      boxShadow: {
        editorial: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        "editorial-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        glass: "0 16px 36px -10px rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
        "glass-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        micro: "180ms",
        standard: "350ms",
        macro: "700ms",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ambientFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(25px, -30px, 0) scale(1.05)" },
        },
        heroReveal: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "ambient-drift": "ambientFloat 24s ease-in-out infinite alternate",
        "hero-reveal": "heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

