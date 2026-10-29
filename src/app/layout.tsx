import type { Metadata, Viewport } from 'next';
import './globals.css';
import { COLLEGE_INFO } from '@/lib/constants';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://nurul-amin-college.vercel.app';
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nurul Amin Degree College (NAC) | Shibchar, Madaripur',
    template: '%s | Nurul Amin Degree College',
  },
  description:
    'Official web portal of Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ), established in 1994 in Shibchar, Madaripur, Bangladesh. EIIN: 110882, National University Code: 6309. Higher Secondary & Degree Pass programs, admissions, notices, routines, and student services.',
  applicationName: 'Nurul Amin Degree College',
  keywords: [
    'Nurul Amin College',
    'Nurul Amin Degree College',
    'নুরুল আমিন কলেজ',
    'নুরুল আমিন ডিগ্রি কলেজ',
    'NAC',
    'Shibchar College',
    'Madaripur College',
    'EIIN 110882',
    'NU 6309',
    'National University College',
    'HSC Admission Shibchar',
    'Degree Pass Admission Madaripur',
  ],
  authors: [
    { name: 'Nurul Amin Degree College' },
    { name: 'The Emran Dev (Md Emran Chokder)', url: 'https://github.com/theemrandev' },
  ],
  creator: 'Nurul Amin Degree College',
  publisher: 'Nurul Amin Degree College',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: 'en_US',
    siteName: 'Nurul Amin Degree College',
    title: 'Nurul Amin Degree College (NAC) | Shibchar, Madaripur',
    description:
      'Official web portal of Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ), Shibchar, Madaripur. EIIN: 110882, National University Code: 6309. Academic programs, admissions, and student facilities.',
    images: [
      {
        url: '/images/clg1.jpg',
        width: 1200,
        height: 630,
        alt: 'Nurul Amin Degree College Main Campus, Shibchar, Madaripur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nurul Amin Degree College (NAC) | Shibchar, Madaripur',
    description:
      'Official web portal of Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ), Shibchar, Madaripur. EIIN: 110882, National University Code: 6309.',
    images: ['/images/clg1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [
      { url: '/images/logo (4).png' },
      { url: '/images/logo (4).png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo (4).png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/logo (4).png',
    apple: '/images/logo (4).png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a2240',
};

const collegeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'Nurul Amin Degree College',
  alternateName: [
    'নুরুল আমিন ডিগ্রি কলেজ',
    'Nurul Amin College',
    'নুরুল আমিন কলেজ',
    'NAC',
  ],
  url: baseUrl,
  logo: `${baseUrl}/images/logo%20(4).png`,
  image: `${baseUrl}/images/clg1.jpg`,
  description:
    'Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ) is a higher secondary and undergraduate educational institution established in 1994 in Shibchar, Madaripur, Bangladesh. EIIN: 110882, National University Code: 6309.',
  identifier: [
    {
      '@type': 'PropertyValue',
      name: 'EIIN',
      value: COLLEGE_INFO.identity.eiin,
    },
    {
      '@type': 'PropertyValue',
      name: 'National University Code',
      value: COLLEGE_INFO.identity.nuCollegeCode,
    },
    {
      '@type': 'PropertyValue',
      name: 'MPO Code',
      value: COLLEGE_INFO.identity.mpoCode,
    },
  ],
  foundingDate: COLLEGE_INFO.identity.establishedDate,
  founder: {
    '@type': 'Person',
    name: COLLEGE_INFO.identity.founder,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: COLLEGE_INFO.location.village,
    addressLocality: COLLEGE_INFO.location.upazila,
    addressRegion: COLLEGE_INFO.location.district,
    postalCode: COLLEGE_INFO.location.postCode,
    addressCountry: 'BD',
  },
  telephone: COLLEGE_INFO.contact.phone,
  email: COLLEGE_INFO.contact.email,
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'National University, Bangladesh',
    url: 'https://www.nu.ac.bd',
  },
  sameAs: [COLLEGE_INFO.contact.officialBoardUrl],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collegeStructuredData),
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content / মূল তথ্যে যান
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <div>{children}</div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
