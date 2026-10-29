import type { Metadata } from 'next';
import SportsClient from './SportsClient';

export const metadata: Metadata = {
  title: 'ক্রীড়া সংস্কৃতি ও অ্যাথলেটিকস | Sports Culture & Athletics',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের সুবিশাল খেলার মাঠ, শিক্ষক-শিক্ষার্থীদের ফুটবল ও ক্রিকেট প্রতিযোগিতা এবং সহশিক্ষা ক্রীড়া সংস্কৃতি।',
  alternates: {
    canonical: '/sports',
  },
  openGraph: {
    title: 'ক্রীড়া সংস্কৃতি ও অ্যাথলেটিকস | Sports - Nurul Amin Degree College',
    description:
      'খেলার মাঠে শিক্ষক ও শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণ ও সুস্থ ক্রীড়া চর্চা।',
    url: '/sports',
  },
};

export default function SportsPage() {
  return <SportsClient />;
}
