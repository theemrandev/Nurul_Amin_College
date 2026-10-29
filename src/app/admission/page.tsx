import type { Metadata } from 'next';
import { AdmissionClient } from './AdmissionClient';

export const metadata: Metadata = {
  title: 'ভর্তি তথ্য ও নির্দেশিকা | Admissions',
  description:
    'Admission rules, eligibility criteria, required documents, and official guidelines for HSC and Degree Pass programs at Nurul Amin Degree College, Shibchar, Madaripur.',
  alternates: {
    canonical: '/admission',
  },
  openGraph: {
    title: 'ভর্তি তথ্য ও নির্দেশিকা | Admissions - Nurul Amin Degree College',
    description:
      'Official admission circular, criteria, and requirements for Nurul Amin Degree College, Shibchar.',
    url: '/admission',
  },
};

export default function AdmissionPage() {
  return <AdmissionClient />;
}
