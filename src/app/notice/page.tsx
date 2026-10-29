import type { Metadata } from 'next';
import { NoticeClient } from './NoticeClient';

export const metadata: Metadata = {
  title: 'নোটিশ বোর্ড ও জরুরি বিজ্ঞপ্তি | Notice Board',
  description:
    'Official academic notices, circulars, examination schedules, holiday declarations, and National University updates for Nurul Amin Degree College.',
  alternates: {
    canonical: '/notice',
  },
  openGraph: {
    title: 'নোটিশ বোর্ড ও জরুরি বিজ্ঞপ্তি | Notice Board - Nurul Amin Degree College',
    description:
      'Official announcements, examination schedules, and academic circulars from Nurul Amin Degree College, Shibchar.',
    url: '/notice',
  },
};

export default function NoticePage() {
  return <NoticeClient />;
}
