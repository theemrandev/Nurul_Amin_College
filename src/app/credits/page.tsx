import type { Metadata } from 'next';
import CreditsClient from './CreditsClient';

export const metadata: Metadata = {
  title: 'প্রজেক্ট পরিচিতি ও কৃতিত্ব | Project Credits & Developer - The Emran Dev',
  description:
    'নুরুল আমিন ডিগ্রি কলেজ ওয়েব পোর্টালের সূচনা, শিক্ষার্থী উদ্যোগ ও কারিগরি রূপান্তর। Developed by The Emran Dev (Md Emran Chokder / Emran).',
  alternates: {
    canonical: '/credits',
  },
  openGraph: {
    title: 'প্রজেক্ট পরিচিতি ও কৃতিত্ব | Project Credits - The Emran Dev',
    description:
      'নুরুল আমিন ডিগ্রি কলেজের ডিজিটাল পোর্টাল আর্কিটেকচার ও শিক্ষার্থী অবদান। The Emran Dev (Md Emran Chokder).',
    url: '/credits',
  },
};

const creditsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Project Credits & Developer Attribution - Nurul Amin Degree College',
  description:
    'Origin story, student initiative, and web portal architecture for Nurul Amin Degree College.',
  url: 'https://nurul-amin-college.vercel.app/credits',
  mainEntity: {
    '@type': 'Person',
    name: 'Md Emran Chokder',
    alternateName: ['The Emran Dev', 'Emran'],
    jobTitle: 'Website Developer & Maintainer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Nurul Amin Degree College',
    },
    sameAs: [
      'https://github.com/theemrandev',
      'https://github.com/theemrandev/Nurul_Amin_College',
      'https://linkedin.com/in/theemrandev',
    ],
  },
};

export default function CreditsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creditsJsonLd) }}
      />
      <CreditsClient />
    </>
  );
}
