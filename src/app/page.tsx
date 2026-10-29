import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'Nurul Amin Degree College (NAC) | Shibchar, Madaripur',
  description:
    'Official web portal of Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ), established in 1994 in Shibchar, Madaripur, Bangladesh. EIIN: 110882, National University Code: 6309. Higher Secondary & Degree programs, admissions, notices, routines, and student services.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nurul Amin Degree College (NAC) | Shibchar, Madaripur',
    description:
      'Official web portal of Nurul Amin Degree College (নুরুল আমিন ডিগ্রি কলেজ), Shibchar, Madaripur. EIIN: 110882, National University Code: 6309. Academic programs, admissions, and student services.',
    url: '/',
    images: [
      {
        url: '/images/clg1.jpg',
        width: 1200,
        height: 630,
        alt: 'Nurul Amin Degree College Main Campus, Shibchar, Madaripur',
      },
    ],
  },
};

export default function Page() {
  return <HomePageClient />;
}
