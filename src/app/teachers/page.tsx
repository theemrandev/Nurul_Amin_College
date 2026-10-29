import type { Metadata } from 'next';
import TeachersClient from './TeachersClient';

export const metadata: Metadata = {
  title: 'শিক্ষকমণ্ডলী ও বিভাগীয় পরিচিতি | Faculty & Academic Staff',
  description:
    'নুরul আমিন ডিগ্রি কলেজের অভিজ্ঞ শিক্ষকমণ্ডলী, বিভাগীয় প্রধান ও একাডেমিক কাউন্সিলের তালিকা ও পরিচিতি।',
  alternates: {
    canonical: '/teachers',
  },
  openGraph: {
    title: 'শিক্ষকমণ্ডলী ও বিভাগীয় পরিচিতি | Faculty - Nurul Amin Degree College',
    description:
      'উচ্চ মাধ্যমিক ও জাতীয় বিশ্ববিদ্যালয় ডিগ্রি কোর্সে পাঠদানকারী অভিজ্ঞ শিক্ষকবৃন্দ ও প্রাতিষ্ঠানিক পরিষদ।',
    url: '/teachers',
  },
};

export default function TeachersPage() {
  return <TeachersClient />;
}
