import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        college: {
          navy: {
            DEFAULT: '#0a2240',
            dark: '#051529',
            light: '#153a66',
          },
          gold: {
            DEFAULT: '#c8932e',
            light: '#e0a842',
            soft: '#fdf6e7',
          },
          emerald: {
            DEFAULT: '#064e3b',
            light: '#047857',
            soft: '#ecfdf5',
          },
        },
      },
      fontFamily: {
        bengali: ['var(--font-siliguri)', 'sans-serif'],
        english: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
