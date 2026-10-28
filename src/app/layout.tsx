import type { Metadata, Viewport } from 'next';
import './globals.css';
import { COLLEGE_INFO } from '@/lib/constants';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

export const metadata: Metadata = {
  title: {
    default: `${COLLEGE_INFO.name.bn} | ${COLLEGE_INFO.name.en}`,
    template: `%s | ${COLLEGE_INFO.name.bn}`,
  },
  description: `Official web portal of ${COLLEGE_INFO.name.enFull}, Shibchar, Madaripur, Bangladesh. EIIN: ${COLLEGE_INFO.identity.eiin}.`,
  keywords: [
    'Nurul Amin College',
    'Nurul Amin Degree College',
    'নুরুল আমিন ডিগ্রি কলেজ',
    'Shibchar',
    'Madaripur',
    'EIIN 110882',
    'NU 6309',
  ],
  authors: [{ name: COLLEGE_INFO.developer.creditEn }],
  icons: {
    icon: '/images/logo (4).png',
    shortcut: '/images/logo (4).png',
    apple: '/images/logo (4).png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a2240',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('nac_theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  const storedLang = localStorage.getItem('nac_lang');
                  if (storedLang === 'en' || storedLang === 'bn') {
                    document.documentElement.lang = storedLang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content / মূল তথ্যে যান
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <div id="main-content">{children}</div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
