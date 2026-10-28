/**
 * Verified Institutional & Official Notices Data Snapshot
 * Nurul Amin Degree College Portal
 *
 * Source: js/data.js and data/official-notices.json
 * Contains both campus institutional directives and official National University circulars.
 */

export interface NoticeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  date: string; // YYYY-MM-DD or formatted date
  category: 'routine' | 'admission' | 'exam' | 'formfillup' | 'general' | 'achievement';
  categoryNameBn: string;
  categoryNameEn: string;
  summaryBn: string;
  summaryEn: string;
  featured?: boolean;
  link: string;
  isExternal: boolean;
  isPdf?: boolean;
  sourceBn: string;
  sourceEn: string;
  isAdminCreated?: boolean;
}

export const COLLEGE_NOTICES: NoticeItem[] = [
  {
    id: 'notice-01',
    titleBn: 'প্রাতিষ্ঠানিক নির্দেশনা: একাডেমিক রুটিন ও পরীক্ষার সময়সূচি সংক্রান্ত বিজ্ঞপ্তি',
    titleEn: 'Official Advisory: Academic Routines & Examination Schedules',
    date: '2026-10-26',
    category: 'routine',
    categoryNameBn: 'পরীক্ষার রুটিন',
    categoryNameEn: 'Academic Routine',
    summaryBn: 'সর্বশেষ রুটিন, ভর্তি বিজ্ঞপ্তি ও পরীক্ষার আপডেটের জন্য সংশ্লিষ্ট কর্তৃপক্ষের অফিসিয়াল ওয়েবসাইট দেখুন।',
    summaryEn: "For the latest routine, admission notice, and examination updates, please check the official authority's website.",
    featured: true,
    link: '/routine',
    isExternal: false,
    sourceBn: 'এনএডিসি একাডেমিক শাখা ও প্রাতিষ্ঠানিক নির্দেশনা',
    sourceEn: 'NADC Academic Section & Official Directives',
  },
  {
    id: 'notice-02',
    titleBn: 'একাদশ শ্রেণিতে অনলাইনে ভর্তি সংক্রান্ত কেন্দ্রীয় নির্দেশিকা',
    titleEn: 'Central Online Admission Guidelines for XI Class (Higher Secondary)',
    date: '2026-10-20',
    category: 'admission',
    categoryNameBn: 'ভর্তি সংক্রান্ত',
    categoryNameEn: 'Admission',
    summaryBn: 'একাদশ শ্রেণির বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় কেন্দ্রীয় ভর্তি কার্যক্রম xiclassadmission.gov.bd এর মাধ্যমে অনুষ্ঠিত হয়। কলেজের EIIN ১১০৮৮২ নির্বাচন করুন।',
    summaryEn: 'Central admission for XI Class Science, Humanities, and Business Studies is processed via xiclassadmission.gov.bd. Select College EIIN 110882.',
    featured: true,
    link: '/admission',
    isExternal: false,
    sourceBn: 'শিক্ষা মন্ত্রণালয় (xiclassadmission.gov.bd)',
    sourceEn: 'Ministry of Education (xiclassadmission.gov.bd)',
  },
  {
    id: 'notice-03',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি (পাস) কোর্স ও পরীক্ষার সময়সূচি তথ্য',
    titleEn: 'National University Degree (Pass) Academic Programs & Examination Notices',
    date: '2026-10-15',
    category: 'exam',
    categoryNameBn: 'ডিগ্রি ও পরীক্ষা',
    categoryNameEn: 'Degree & Examination',
    summaryBn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীন কলেজ কোড ৬৩০৯-এ ৩ বছর মেয়াদী ডিগ্রি পাস কোর্স পরিচালিত হয়। পরীক্ষার সময়সূচি ও ফলাফলের জন্য অফিসিয়াল পোর্টাল দেখুন।',
    summaryEn: 'Nurul Amin Degree College conducts 3-year Degree Pass courses under NU Code 6309. Central exam schedules and results are published on nu.ac.bd and results.nu.ac.bd.',
    featured: true,
    link: '/academics',
    isExternal: false,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় নোটিশ পোর্টাল (nu.ac.bd)',
    sourceEn: 'National University Notice Portal (nu.ac.bd)',
  },
  {
    id: 'notice-04',
    titleBn: 'কৃতিত্বপূর্ণ অর্জন: ঢাকা বিশ্ববিদ্যালয়ে নুরুল আমিন কলেজের শিক্ষার্থীর ভর্তি',
    titleEn: 'Student Success: NADC Alumnus Admitted to University of Dhaka',
    date: '2026-04-12',
    category: 'achievement',
    categoryNameBn: 'অর্জন',
    categoryNameEn: 'Achievement',
    summaryBn: 'নুরুল আমিন ডিগ্রি কলেজের একজন মেধাবী শিক্ষার্থী ঢাকা বিশ্ববিদ্যালয়ের কলা ও মানবিক অনুষদে ভর্তির গৌরব অর্জন করেছেন।',
    summaryEn: 'A talented student from our college has earned admission into the Faculty of Arts & Humanities at the University of Dhaka.',
    featured: false,
    link: 'https://www.facebook.com/share/18kPEvTfck/',
    isExternal: true,
    sourceBn: 'প্রাতিষ্ঠানিক ঘোষণা',
    sourceEn: 'Institutional Announcement',
  },
  {
    id: 'notice-05',
    titleBn: 'কলেজের প্রশাসনিক দাপ্তরিক সময়সূচি ও সাপ্তাহিক বন্ধ সংক্রান্ত বিজ্ঞপ্তি',
    titleEn: 'College Administrative Office Working Hours & Weekly Closures',
    date: '2026-03-01',
    category: 'general',
    categoryNameBn: 'সাধারণ',
    categoryNameEn: 'General',
    summaryBn: 'কলেজের প্রশাসনিক কার্যক্রম রবিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে বিকাল ৪টা পর্যন্ত চালু থাকবে। শুক্র ও শনিবার সাপ্তাহিক ছুটি।',
    summaryEn: 'Administrative offices remain open Sunday to Thursday from 9:00 AM to 4:00 PM. Offices are closed on Fridays and Saturdays.',
    featured: false,
    link: '/contact',
    isExternal: false,
    sourceBn: 'অধ্যক্ষের কার্যালয়, নুরুল আমিন ডিগ্রি কলেজ',
    sourceEn: "Principal's Office, NADC",
  },
];

export const OFFICIAL_NU_NOTICES: NoticeItem[] = [
  {
    id: 'nu-17121',
    titleBn: '২০২৪ সালের বি.এসসি (অনার্স) ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) ৩য় বর্ষ ৬ষ্ঠ সেমিস্টারের মৌখিক ও ব্যবহারিক পরীক্ষা সংক্রান্ত বিজ্ঞপ্তি।',
    titleEn: 'National University Notice: 2024 B.Sc (Hons) in CSE 3rd Year 6th Semester Practical & Viva Examination Circular.',
    date: '2026-10-27',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'জাতীয় বিশ্ববিদ্যালয়ের পাবলিক নোটিশ সার্ভার থেকে সংগৃহীত। মূল সত্যায়িত পিডিএফ ফাইলটি নিচের বোতামে ক্লিক করে দেখুন বা ডাউনলোড করুন।',
    summaryEn: 'Extracted directly from the National University public notice server. Click below to view or download the official PDF circular.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17121_pub_date_26102026.PDF',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17122',
    titleBn: '২০২৪ সালের বি.এসসি (অনার্স) ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) ৩য় বর্ষ ৬ষ্ঠ সেমিস্টারের মৌখিক ও ব্যবহারিক পরীক্ষার কেন্দ্র তালিকা।',
    titleEn: 'National University Notice: 2024 B.Sc (Hons) in CSE 3rd Year 6th Semester Practical & Viva Exam Center List.',
    date: '2026-10-27',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'সিএসই ৩য় বর্ষ ৬ষ্ঠ সেমিস্টার ব্যবহারিক ও মৌখিক পরীক্ষার অনুমোদিত পরীক্ষা কেন্দ্র তালিকা সংক্রান্ত অফিসিয়াল প্রজ্ঞাপন।',
    summaryEn: 'Official circular regarding authorized examination centers for CSE 3rd Year 6th Semester Practical and Viva exams.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17122_pub_date_26102026.PDF',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17126',
    titleBn: 'গ্রন্থাগার ও তথ্যবিজ্ঞান ডিপ্লোমা ২য় সেমিস্টার পরীক্ষা ২০২৬-এর ফরম পূরণের সংশোধিত বিজ্ঞপ্তি।',
    titleEn: 'National University Notice: Revised Form Fill-up Circular for Library & Information Science Diploma 2nd Semester Exam 2026.',
    date: '2026-10-27',
    category: 'formfillup',
    categoryNameBn: 'ফরম পূরণ',
    categoryNameEn: 'Form Fill-up',
    summaryBn: 'গ্রন্থাগার ও তথ্যবিজ্ঞান ডিপ্লোমা কোর্সের ২য় সেমিস্টার পরীক্ষার সংশোধিত ফরম পূরণ সময়সূচি ও ফি জমাদান সংক্রান্ত বিজ্ঞপ্তি।',
    summaryEn: 'Revised form fill-up schedule and fee submission circular for Library and Information Science Diploma 2nd Semester candidates.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17126_pub_date_26102026.PDF',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17134',
    titleBn: '২০২৪ সালের বিবিএ (অনার্স) ইন ট্যুরিজম অ্যান্ড হসপিটালিটি ম্যানেজমেন্ট ৩য় বর্ষ ৬ষ্ঠ সেমিস্টারের ব্যবহারিক ও মৌখিক পরীক্ষার কেন্দ্র তালিকা।',
    titleEn: 'National University Notice: 2024 BBA (Hons) in Tourism & Hospitality Management 3rd Year 6th Sem Exam Center List.',
    date: '2026-10-27',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'ট্যুরিজম অ্যান্ড হসপিটালিটি ম্যানেজমেন্ট ৩য় বর্ষ ৬ষ্ঠ সেমিস্টার ব্যবহারিক ও মৌখিক পরীক্ষা কেন্দ্র তালিকা সংক্রান্ত সার্কুলার।',
    summaryEn: 'Official notification on center allocations for BBA (Hons) in Tourism & Hospitality Management viva and practical examinations.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17134_pub_date_26102026.pdf',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-1790',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয়ের ডাটা সেন্টারের নেটওয়ার্ক ইনফ্রাস্ট্রাকচার আপগ্রেডেশন ও মাইগ্রেশন কাজের জন্য অনলাইন সেবা সাময়িক বন্ধ সংক্রান্ত জরুরি বিজ্ঞপ্তি।',
    titleEn: 'National University Notice: Urgent Circular regarding temporary downtime of online services for Data Center Network Infrastructure upgrade & migration.',
    date: '2026-10-26',
    category: 'general',
    categoryNameBn: 'সাধারণ',
    categoryNameEn: 'General',
    summaryBn: 'এনইউ কেন্দ্রীয় ডাটা সেন্টার অবকাঠামো আধুনিকায়নের কারণে বিশ্ববিদ্যালয়ের ওয়েব পোর্টাল ও অনলাইন সেবাসমূহ সাময়িক বিঘ্নিত হওয়া সংক্রান্ত বিজ্ঞপ্তি।',
    summaryEn: 'Urgent advisory regarding scheduled temporary service downtime across university online portals due to central data center migration.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_1790_pub_date_26102026.pdf',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-656',
    titleBn: '২০২৩–২০২৪ শিক্ষাবর্ষের বাংলা বিষয়ে এমএএম গবেষকগণের ৩য় সেমিস্টার পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি।',
    titleEn: 'National University Notice: Examination Form Fill-up circular for MAM researchers (Session 2023–2024, Bangla Dept, 3rd Semester).',
    date: '2026-10-26',
    category: 'formfillup',
    categoryNameBn: 'ফরম পূরণ',
    categoryNameEn: 'Form Fill-up',
    summaryBn: 'বাংলা বিভাগের এমএএম গবেষকগণের ৩য় সেমিস্টার পরীক্ষার অনলাইন ফরম পূরণ ও সংশ্লিষ্ট নিয়মাবলি সংক্রান্ত প্রজ্ঞাপন।',
    summaryEn: 'Official circular regarding online examination form fill-up procedures for MAM Bengali research scholars (3rd Semester).',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_656_pub_date_26102026.pdf',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-657',
    titleBn: '২০২৩–২০২৪ শিক্ষাবর্ষের ইতিহাস বিষয়ে এমএএম গবেষকগণের ২য় সেমিস্টার পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি।',
    titleEn: 'National University Notice: Examination Form Fill-up circular for MAM researchers (Session 2023–2024, History Dept, 2nd Semester).',
    date: '2026-10-26',
    category: 'formfillup',
    categoryNameBn: 'ফরম পূরণ',
    categoryNameEn: 'Form Fill-up',
    summaryBn: 'ইতিহাস বিষয়ে এমএএম গবেষকগণের ২য় সেমিস্টার পরীক্ষার ফরম পূরণ সময়সীমা ও সংশ্লিষ্ট নির্দেশনা সংক্রান্ত বিজ্ঞপ্তি।',
    summaryEn: 'Official directive regarding 2nd semester examination form submission for MAM History research scholars.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_657_pub_date_26102026.pdf',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17115',
    titleBn: '২০২৪ সালের বি.এসসি (অনার্স) ইন AMT, KMT ও FDT ৪র্থ বর্ষ ৮ম সেমিস্টার ব্যবহারিক পরীক্ষার কেন্দ্র তালিকা।',
    titleEn: 'National University Notice: Practical Examination Center List for 2024 B.Sc (Honours) in AMT, KMT & FDT 4th Year 8th Semester.',
    date: '2026-10-26',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'এএমটি, কেএমটি ও এফডিটি কোর্সের ৪র্থ বর্ষ ৮ম সেমিস্টার ব্যবহারিক পরীক্ষা কেন্দ্র নির্ধারণ সংক্রান্ত বিজ্ঞপ্তি।',
    summaryEn: 'Notification of approved examination center allocations for B.Sc (Hons) in Apparel and Fashion Technology 4th year practicals.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17115_pub_date_26102026.pdf',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17112',
    titleBn: '২০২৪ সালের এলএলবি শেষ পর্ব পরীক্ষার পুনঃসংশোধিত কেন্দ্র তালিকা।',
    titleEn: 'National University Notice: Revised Center List for 2024 LLB Final Part Examination.',
    date: '2026-10-26',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীন ২০২৪ সালের এলএলবি শেষ পর্ব পরীক্ষার পুনঃসংশোধিত পরীক্ষা কেন্দ্র তালিকা।',
    summaryEn: 'Official notification presenting the revised center assignments for 2024 LLB Final Part examinations.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17112_pub_date_26102026.PDF',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
  {
    id: 'nu-17113',
    titleBn: '২০২৫ ও ২০২৬ সালের এলএলবি প্রথম পর্ব পরীক্ষার পুনঃসংশোধিত কেন্দ্র তালিকা।',
    titleEn: 'National University Notice: Revised Center List for 2025 & 2026 LLB 1st Part Examination.',
    date: '2026-10-26',
    category: 'exam',
    categoryNameBn: 'পরীক্ষা',
    categoryNameEn: 'Examination',
    summaryBn: 'এলএলবি প্রথম পর্বের পরীক্ষার্থীদের জন্য পুনর্নির্ধারিত কেন্দ্র তালিকা সংক্রান্ত আনুষ্ঠানিক প্রজ্ঞাপন।',
    summaryEn: 'Revised examination centers published for LLB Preliminary / First Part candidates under National University.',
    link: 'https://www.nu.ac.bd/uploads/notices/notice_17113_pub_date_26102026.PDF',
    isExternal: true,
    isPdf: true,
    sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    sourceEn: 'National University of Bangladesh (nu.ac.bd)',
  },
];

export const NU_FEED_METADATA = {
  lastSyncedBn: '২৭ অক্টোবর ২০২৬, ০২:০১',
  lastSyncedEn: '27 Oct 2026, 02:01 AM',
  sourceUrl: 'https://www.nu.ac.bd/recent-news-notice.php',
  sourceNameBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
  sourceNameEn: 'National University of Bangladesh (nu.ac.bd)',
  totalNotices: 10,
};

export const DHAKA_BOARD_GATEWAY_INFO = {
  nameBn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা',
  nameEn: 'Board of Intermediate & Secondary Education, Dhaka',
  statusLabelBn: 'নিরাপত্তা গেটওয়ে সুরক্ষিত (সরাসরি লিংক)',
  statusLabelEn: 'Security Gateway Protected (Direct Link)',
  explanationBn:
    'ঢাকা শিক্ষা বোর্ডের নোটিশ পোর্টালটি একটি স্বয়ংক্রিয় নিরাপত্তা ব্যবস্থা (bpanel.challenge) দ্বারা সুরক্ষিত। সাইবার নিরাপত্তা নীতি ও বৈধ ব্যবহারের স্বার্থে কোনোপ্রকার অননুমোদিত স্ক্র্যাপিং করা হয় না। শিক্ষার্থীরা নিচের সত্যায়িত বোতামের মাধ্যমে সরাসরি বোর্ডের মূল সার্ভার থেকে প্রজ্ঞাপন দেখতে পারবেন।',
  explanationEn:
    'The Board of Intermediate & Secondary Education, Dhaka protects its notice portal with an automated browser security gateway (bpanel.challenge). In strict adherence to state cybersecurity and legitimate access principles, automated scrapers are not deployed. Students and guardians are encouraged to access circulars directly on the official board server via the verified link below.',
  hscCornerUrl: 'https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner',
  portalUrl: 'https://dhakaeducationboard.gov.bd/',
};

export function formatNoticeDate(dateStr: string, isBn: boolean): string {
  if (!dateStr) return '';
  const monthsBn = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const toBnNumber = (num: number | string) => String(num).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (isBn) {
      return `${toBnNumber(d)} ${monthsBn[m - 1]} ${toBnNumber(y)}`;
    }
    return `${d} ${monthsEn[m - 1]} ${y}`;
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const day = parsed.getDate();
    const month = parsed.getMonth();
    const year = parsed.getFullYear();
    if (isBn) {
      return `${toBnNumber(day)} ${monthsBn[month]} ${toBnNumber(year)}`;
    }
    return `${day} ${monthsEn[month]} ${year}`;
  }

  return dateStr;
}
