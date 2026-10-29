import type { Metadata } from 'next';
import RoutineClient from './RoutineClient';

export const metadata: Metadata = {
  title: 'পরীক্ষার সময়সূচি ও রুটিন | Exam Routines & Circulars',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের এইচএসসি ও ডিগ্রি (পাস) পরীক্ষার সর্বশেষ সময়সূচি, ঢাকা শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের রুটিন এবং প্রবেশপত্র নির্দেশনা।',
  alternates: {
    canonical: '/routine',
  },
  openGraph: {
    title: 'পরীক্ষার সময়সূচি ও রুটিন | Exam Routine - Nurul Amin Degree College',
    description:
      'ঢাকা শিক্ষা বোর্ড (EIIN: 110882) ও জাতীয় বিশ্ববিদ্যালয়ের (Code: 6309) পরীক্ষার সর্বশেষ সময়সূচি ও কেন্দ্র নির্দেশনা।',
    url: '/routine',
  },
};

export default function RoutinePage() {
  return <RoutineClient />;
}
