import type { Metadata } from 'next';
import { AcademicsClient } from './AcademicsClient';

export const metadata: Metadata = {
  title: 'শিক্ষা কার্যক্রম ও কোর্স বিবরণী | Academics',
  description:
    'Academic curriculum at Nurul Amin Degree College: Higher Secondary (HSC Science, Humanities, Business Studies) and 3-Year National University Degree Pass courses (B.A., B.S.S., B.B.S., B.Sc.).',
  alternates: {
    canonical: '/academics',
  },
  openGraph: {
    title: 'শিক্ষা কার্যক্রম ও কোর্স বিবরণী | Academics - Nurul Amin Degree College',
    description:
      'Explore HSC programs and National University Degree Pass courses at Nurul Amin Degree College, Shibchar, Madaripur.',
    url: '/academics',
  },
};

export default function AcademicsPage() {
  return <AcademicsClient />;
}
