import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'যোগাযোগ ও অবস্থান | Contact Us & Location',
  description:
    'নুরুল আমিন ডিগ্রি কলেজের প্রাতিষ্ঠানিক ঠিকানা, হেল্পলাইন ফোন নম্বর, অফিসিয়াল ইমেইল ও গুগল ম্যাপে ক্যাম্পাস অবস্থান।',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'যোগাযোগ ও অবস্থান | Contact Us - Nurul Amin Degree College',
    description:
      'উমেদপুর, শিবচর, মাদারীপুর। ফোন: 01703228122, ইমেইল: nurulamincollege.degree@gmail.com',
    url: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
