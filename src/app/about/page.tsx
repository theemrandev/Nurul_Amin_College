import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'কলেজ পরিচিতি ও ইতিহাস | About Us',
  description:
    'Learn about the founding history, founder Prof. Dr. Nurul Amin Bepari, institutional profile, and academic vision of Nurul Amin Degree College, established in 1994 in Shibchar, Madaripur.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'কলেজ পরিচিতি ও ইতিহাস | About Nurul Amin Degree College',
    description:
      'History, founder Prof. Dr. Nurul Amin Bepari, mission, and institutional profile of Nurul Amin Degree College, Shibchar, Madaripur.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
