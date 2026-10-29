import type { Metadata } from 'next';
import HumanitarianClient from './HumanitarianClient';

export const metadata: Metadata = {
  title: 'মানবিক সহায়তা ও সামাজিক দায়বদ্ধতা | Humanitarian Initiatives',
  description:
    'সংকটময় মুহূর্তে অসহায় মানুষের পাশে দাঁড়াতে নুরুল আমিন ডিগ্রি কলেজের শিক্ষক ও শিক্ষার্থীদের যৌথ সামাজিক ও মানবিক সেবা কার্যক্রম।',
  alternates: {
    canonical: '/humanitarian',
  },
  openGraph: {
    title: 'মানবিক সহায়তা ও সামাজিক উদ্যোগ | Humanitarian Relief - Nurul Amin Degree College',
    description:
      'শিক্ষার্থী ও শিক্ষকবৃন্দের মানবিক দায়িত্বশীলতা ও সামাজিক কল্যাণমূলক কর্মকাণ্ড।',
    url: '/humanitarian',
  },
};

export default function HumanitarianPage() {
  return <HumanitarianClient />;
}
