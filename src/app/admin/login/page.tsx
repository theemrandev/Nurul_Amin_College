import type { Metadata } from 'next';
import AdminLoginClient from './AdminLoginClient';

export const metadata: Metadata = {
  title: 'প্রশাসনিক লগইন | Admin Portal Login',
  description: 'নুরুল আমিন ডিগ্রি কলেজ প্রশাসনিক লগইন পোর্টাল। শুধুমাত্র অনুমোদিত কর্মকর্তা ও শিক্ষকদের জন্য।',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
