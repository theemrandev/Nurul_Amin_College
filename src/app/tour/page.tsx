import type { Metadata } from 'next';
import TourClient from './TourClient';

export const metadata: Metadata = {
  title: 'বার্ষিক শিক্ষামূলক ভ্রমণ ও শিক্ষা সফর | Annual Study Tour',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের বার্ষিক শিক্ষা সফর, পর্যটন অভিজ্ঞতা ও শিক্ষক-শিক্ষার্থীদের জ্ঞানচর্চামূলক আনন্দভ্রমণের চিত্র।',
  alternates: {
    canonical: '/tour',
  },
  openGraph: {
    title: 'বার্ষিক শিক্ষামূলক ভ্রমণ ও শিক্ষা সফর | Study Tour - Nurul Amin Degree College',
    description:
      'শ্রেণিকক্ষের বাইরে বাস্তব পৃথিবীর বাস্তব অভিজ্ঞতা ও স্মৃতিবিজড়িত শিক্ষা সফর।',
    url: '/tour',
  },
};

export default function TourPage() {
  return <TourClient />;
}
