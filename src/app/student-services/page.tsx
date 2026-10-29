import type { Metadata } from 'next';
import StudentServicesClient from './StudentServicesClient';

export const metadata: Metadata = {
  title: 'শিক্ষার্থী সেবা ও তথ্য বাতায়ন | Student Services Portal',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের শিক্ষার্থী সেবা কর্নার — ভর্তি, পরীক্ষার ফলাফল, রেজিস্ট্রেশন, ফরম পূরণ, প্রবেশপত্র ও শিক্ষা বোর্ডের সরাসরি সেবা লিংক।',
  alternates: {
    canonical: '/student-services',
  },
  openGraph: {
    title: 'শিক্ষার্থী সেবা ও তথ্য বাতায়ন | Student Services - Nurul Amin Degree College',
    description:
      'একাদশ শ্রেণি ও ডিগ্রি (পাস) শিক্ষার্থীদের কেন্দ্রীয় একাডেমিক ও ডিজিটাল সেবা কেন্দ্র।',
    url: '/student-services',
  },
};

export default function StudentServicesPage() {
  return <StudentServicesClient />;
}
