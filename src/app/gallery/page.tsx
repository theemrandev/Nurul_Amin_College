import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'ফটোগ্যালারি ও ক্যাম্পাস চিত্র | Photo Gallery & Campus Life',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের সবুজ ক্যাম্পাস, একাডেমিক ভবন, খেলার মাঠ, বার্ষিক ক্রীড়া, শিক্ষা সফর ও মানবিক উদ্যোগের বাস্তব আলোকচিত্র।',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'ফটোগ্যালারি ও ক্যাম্পাস চিত্র | Photo Gallery - Nurul Amin Degree College',
    description:
      'ক্যাম্পাসের নয়নাভিরাম পরিবেশ ও শিক্ষার্থীদের প্রাণবন্ত পদচারণার আলোকচিত্র প্রদর্শনী।',
    url: '/gallery',
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
