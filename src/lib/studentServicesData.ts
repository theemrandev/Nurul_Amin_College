/**
 * Verified Student Services Data Snapshot
 * Nurul Amin Degree College Portal
 *
 * Source: js/data.js (COLLEGE_DATA.studentServices) & student-services.html
 * 12 verified student services across 10 categories + 5 official portal connectivity records.
 */

export interface StudentServiceItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category:
    | 'admission'
    | 'results'
    | 'routine'
    | 'formfillup'
    | 'admit'
    | 'board'
    | 'nu'
    | 'degree'
    | 'notices';
  categoryNameBn: string;
  categoryNameEn: string;
  officialSourceBn: string;
  officialSourceEn: string;
  badgeType: 'official' | 'direct' | 'institutional';
  badgeTextBn: string;
  badgeTextEn: string;
  url: string;
  isExternal: boolean;
  descBn: string;
  descEn: string;
  keyInfoBn: string;
  keyInfoEn: string;
  icon: string;
  featuredOnHome?: boolean;
}

export const STUDENT_SERVICES: StudentServiceItem[] = [
  {
    id: 'srv-xi-admission',
    titleBn: 'একাদশ শ্রেণিতে অনলাইন ভর্তি পোর্টাল',
    titleEn: 'XI Class Online Admission Portal',
    category: 'admission',
    categoryNameBn: 'ভর্তি ও আবেদন',
    categoryNameEn: 'Admission & Apply',
    officialSourceBn: 'শিক্ষা মন্ত্রণালয় (xiclassadmission.gov.bd)',
    officialSourceEn: 'Ministry of Education (xiclassadmission.gov.bd)',
    badgeType: 'official',
    badgeTextBn: 'অফিসিয়াল সরকারি পোর্টাল',
    badgeTextEn: 'Official Government Portal',
    url: 'https://xiclassadmission.gov.bd/',
    isExternal: true,
    descBn: 'এইচএসসি বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় অনলাইনে ভর্তির সরকারি কেন্দ্রীয় পোর্টাল।',
    descEn: 'Centralized admission portal for Higher Secondary Certificate (HSC) Science, Humanities, and Business Studies.',
    keyInfoBn: 'কলেজ EIIN: ১১০৮৮২ • পছন্দক্রমে ১ম সারিতে নির্বাচন করুন',
    keyInfoEn: 'College EIIN: 110882 • Select as preferred college',
    featuredOnHome: true,
    icon: 'graduation-cap',
  },
  {
    id: 'srv-board-results',
    titleBn: 'এসএসসি ও এইচএসসি পরীক্ষার ফলাফল',
    titleEn: 'SSC & HSC Examination Results Portal',
    category: 'results',
    categoryNameBn: 'এসএসসি/এইচএসসি রেজাল্ট',
    categoryNameEn: 'SSC/HSC Results',
    officialSourceBn: 'শিক্ষা মন্ত্রণালয় ও আন্তঃশিক্ষা বোর্ড (educationboardresults.gov.bd)',
    officialSourceEn: 'Ministry of Education & Inter-Board (educationboardresults.gov.bd)',
    badgeType: 'direct',
    badgeTextBn: 'সরাসরি ফলাফল পোর্টাল',
    badgeTextEn: 'Direct Portal Service',
    url: 'https://educationboardresults.gov.bd/v2/home',
    isExternal: true,
    descBn: 'শিক্ষা বোর্ডসমূহের এসএসসি ও এইচএসসি পরীক্ষার ব্যক্তিগত ও প্রাতিষ্ঠানিক গ্রেডশিট যাচাইয়ের সরকারি সার্ভার।',
    descEn: 'Official Ministry server for checking individual and institution-wise SSC and HSC board examination results.',
    keyInfoBn: 'বোর্ড: ঢাকা • EIIN: ১১০৮৮২ • রোল ও রেজিস্ট্রেশন নম্বর প্রয়োজন',
    keyInfoEn: 'Board: Dhaka • EIIN: 110882 • Roll & Registration required',
    featuredOnHome: true,
    icon: 'award',
  },
  {
    id: 'srv-nu-results',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় পরীক্ষার ফলাফল পোর্টাল',
    titleEn: 'National University Examination Results',
    category: 'results',
    categoryNameBn: 'জাতীয় বিশ্ববিদ্যালয় রেজাল্ট',
    categoryNameEn: 'NU Results',
    officialSourceBn: 'জাতীয় বিশ্ববিদ্যালয় (results.nu.ac.bd)',
    officialSourceEn: 'National University of Bangladesh (results.nu.ac.bd)',
    badgeType: 'direct',
    badgeTextBn: 'এনইউ রেজাল্ট পোর্টাল',
    badgeTextEn: 'NU Direct Result',
    url: 'https://results.nu.ac.bd/',
    isExternal: true,
    descBn: 'ডিগ্রি (পাস), অনার্স ও মাস্টার্স পরীক্ষার ফলাফল এবং নম্বরপত্র ডাউনলোডের অফিসিয়াল ফলাফল পোর্টাল।',
    descEn: 'Official publication system for Degree (Pass), Honours, and Masters examination results and CGPA transcripts.',
    keyInfoBn: 'কলেজ কোড: ৬৩০৯ • ডিগ্রি কোর্স কোড: ৬০০১–৬০০৪',
    keyInfoEn: 'College Code: 6309 • Degree Course Codes: 6001–6004',
    featuredOnHome: true,
    icon: 'poll',
  },
  {
    id: 'srv-hsc-routine',
    titleBn: 'ঢাকা বোর্ড এইচএসসি পরীক্ষার রুটিন ও নির্দেশিকা',
    titleEn: 'Dhaka Board HSC Examination Routine & Guidelines',
    category: 'routine',
    categoryNameBn: 'পরীক্ষার রুটিন',
    categoryNameEn: 'Exam Routine',
    officialSourceBn: 'ঢাকা শিক্ষা বোর্ড ও কলেজ একাডেমিক শাখা',
    officialSourceEn: 'BISE Dhaka & College Academic Section',
    badgeType: 'institutional',
    badgeTextBn: 'ক্যাম্পাস রুটিন',
    badgeTextEn: 'Campus Schedule',
    url: '/routine',
    isExternal: false,
    descBn: 'ঢাকা বোর্ডের অধীন এইচএসসি পরীক্ষার্থীদের পরীক্ষার সময়সূচি, কেন্দ্র ও প্রবেশপত্র সংক্রান্ত প্রাতিষ্ঠানিক নির্দেশিকা।',
    descEn: 'Examination schedules, center guidelines, and admit card protocols for HSC candidates under Dhaka Education Board.',
    keyInfoBn: 'সর্বশেষ রুটিন ও পরীক্ষার আপডেটের জন্য সংশ্লিষ্ট কর্তৃপক্ষের অফিসিয়াল ওয়েবসাইট দেখুন।',
    keyInfoEn: "For latest routine and exam updates, check the official authority's website.",
    featuredOnHome: true,
    icon: 'calendar-alt',
  },
  {
    id: 'srv-nu-routine',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ও পরীক্ষা সময়সূচি নির্দেশিকা',
    titleEn: 'NU Degree & Academic Examination Schedules',
    category: 'routine',
    categoryNameBn: 'পরীক্ষার রুটিন',
    categoryNameEn: 'Exam Routine',
    officialSourceBn: 'জাতীয় বিশ্ববিদ্যালয় পরীক্ষা নিয়ন্ত্রণ দপ্তর (nu.ac.bd)',
    officialSourceEn: 'National University Examination Controller (nu.ac.bd)',
    badgeType: 'institutional',
    badgeTextBn: 'পরীক্ষা নোটিশ',
    badgeTextEn: 'Exam Circular',
    url: '/routine',
    isExternal: false,
    descBn: 'জাতীয় বিশ্ববিদ্যালয়ের ডিগ্রি পাস ও পরীক্ষা সংক্রান্ত কেন্দ্রীয় সময়সূচি এবং জরুরি প্রাতিষ্ঠানিক প্রজ্ঞাপন।',
    descEn: 'Central examination schedules for National University Degree (Pass) and affiliated academic years.',
    keyInfoBn: 'সর্বশেষ রুটিন ও পরীক্ষার আপডেটের জন্য অফিসিয়াল এনইউ পোর্টাল দেখুন',
    keyInfoEn: 'For latest schedules, visit the official National University portal',
    featuredOnHome: false,
    icon: 'clock',
  },
  {
    id: 'srv-dhaka-board-formfillup',
    titleBn: 'ঢাকা বোর্ড এইচএসসি ফরম পূরণ ও ই-এসআইএফ',
    titleEn: 'Dhaka Board HSC Form Fill-up & eSIF Corner',
    category: 'formfillup',
    categoryNameBn: 'ফরম পূরণ',
    categoryNameEn: 'Form Fill-up',
    officialSourceBn: 'ঢাকা শিক্ষা বোর্ড এইচএসসি কর্নার (dhakaeducationboard.gov.bd)',
    officialSourceEn: 'Dhaka Education Board HSC Corner (dhakaeducationboard.gov.bd)',
    badgeType: 'official',
    badgeTextBn: 'অফিসিয়াল সরকারি পোর্টাল',
    badgeTextEn: 'Official Government Portal',
    url: 'https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner',
    isExternal: true,
    descBn: 'এইচএসসি পরীক্ষার্থীদের রেজিস্ট্রেশন, সম্ভাব্য তালিকা (ই-এসআইএফ), ফরম পূরণের বিজ্ঞপ্তি ও ফি সংক্রান্ত পোর্টাল।',
    descEn: 'Official corner for HSC registration, eSIF student entry, examination form fill-up circulars, and fee notices.',
    keyInfoBn: 'সোনালী সেবার মাধ্যমে ফি পরিশোধ ও নির্দেশিকা',
    keyInfoEn: 'Check Sonali Seba payment slips & deadlines',
    featuredOnHome: true,
    icon: 'file-signature',
  },
  {
    id: 'srv-nu-formfillup',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ও অনার্স অনলাইন ফরম পূরণ',
    titleEn: 'National University Online Form Fill-up (EMS)',
    category: 'formfillup',
    categoryNameBn: 'ফরম পূরণ',
    categoryNameEn: 'Form Fill-up',
    officialSourceBn: 'জাতীয় বিশ্ববিদ্যালয় ইএমএস (ems.nu.ac.bd)',
    officialSourceEn: 'NU Education Management System (ems.nu.ac.bd)',
    badgeType: 'official',
    badgeTextBn: 'অফিসিয়াল সরকারি পোর্টাল',
    badgeTextEn: 'Official Government Portal',
    url: 'http://ems.nu.ac.bd/',
    isExternal: true,
    descBn: 'ডিগ্রি পাস ও অনার্স পরীক্ষার্থীদের নির্ধারিত সেশনে পরীক্ষায় অংশগ্রহণের অনলাইন আবেদন ও প্রিন্ট কপি সংগ্রহ।',
    descEn: 'Online student portal for Degree (Pass) and Honours candidates to submit examination form fill-up applications.',
    keyInfoBn: 'আবেদন কপি প্রিন্ট করে কলেজ অফিসে ফি জমা দিন',
    keyInfoEn: 'Print student copy and deposit fee to college office',
    featuredOnHome: false,
    icon: 'edit',
  },
  {
    id: 'srv-admit-card',
    titleBn: 'প্রবেশপত্র সংগ্রহ ও পরীক্ষা কেন্দ্র নির্দেশনা',
    titleEn: 'Examination Admit Card & Center Instructions',
    category: 'admit',
    categoryNameBn: 'প্রবেশপত্র ও নোটিশ',
    categoryNameEn: 'Admit Card & Notices',
    officialSourceBn: 'এনএডিসি পরীক্ষা শাখা ও শিক্ষা বোর্ড',
    officialSourceEn: 'NADC Examination Section & Board Directives',
    badgeType: 'institutional',
    badgeTextBn: 'কলেজ অভ্যন্তরীণ সেবা',
    badgeTextEn: 'Institutional Campus Service',
    url: '/routine#admit',
    isExternal: false,
    descBn: 'কলেজ কার্যালয় থেকে সইযুক্ত প্রবেশপত্র সংগ্রহ, রোল-রেজিস্ট্রেশন যাচাই ও পরীক্ষার হলের কঠোর আচরণবিধি।',
    descEn: 'Guidelines for collecting signed admit cards, checking subject codes, and adhering to strict board examination hall rules.',
    keyInfoBn: 'পরীক্ষা শুরুর ৫ দিন পূর্বে কলেজ অফিস থেকে সংগ্রহ আবশ্যক',
    keyInfoEn: 'Collect admit cards 5 days prior to exams from campus office',
    featuredOnHome: false,
    icon: 'id-card',
  },
  {
    id: 'srv-dhaka-board',
    titleBn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা',
    titleEn: 'Board of Intermediate & Secondary Education, Dhaka',
    category: 'board',
    categoryNameBn: 'শিক্ষা বোর্ড',
    categoryNameEn: 'Education Board',
    officialSourceBn: 'ঢাকা শিক্ষা বোর্ড (dhakaeducationboard.gov.bd)',
    officialSourceEn: 'BISE Dhaka (dhakaeducationboard.gov.bd)',
    badgeType: 'official',
    badgeTextBn: 'অফিসিয়াল শিক্ষা বোর্ড',
    badgeTextEn: 'Official Education Board',
    url: 'https://dhakaeducationboard.gov.bd/',
    isExternal: true,
    descBn: 'উচ্চমাধ্যমিক (এইচএসসি) পাঠ্যক্রম, সিলেবাস, রেজিস্ট্রেশন এবং পরীক্ষা নিয়ন্ত্রণকারী মূল শিক্ষা বোর্ড পোর্টাল।',
    descEn: 'Parent regulatory board governing curriculum, syllabus, registrations, and examinations for HSC programs.',
    keyInfoBn: 'মূল শিক্ষা বোর্ড: ঢাকা • অফিসিয়াল EIIN: ১১০৮৮২',
    keyInfoEn: 'Affiliated Board: Dhaka • Official EIIN: 110882',
    featuredOnHome: false,
    icon: 'landmark',
  },
  {
    id: 'srv-nu-portal',
    titleBn: 'জাতীয় বিশ্ববিদ্যালয় মূল পোর্টাল ও কেন্দ্রীয় প্রজ্ঞাপন',
    titleEn: 'National University Official Portal & Central Circulars',
    category: 'nu',
    categoryNameBn: 'জাতীয় বিশ্ববিদ্যালয়',
    categoryNameEn: 'National University',
    officialSourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
    officialSourceEn: 'National University, Gazipur (nu.ac.bd)',
    badgeType: 'official',
    badgeTextBn: 'কেন্দ্রীয় বিশ্ববিদ্যালয় পোর্টাল',
    badgeTextEn: 'Central University Portal',
    url: 'https://www.nu.ac.bd/',
    isExternal: true,
    descBn: 'বিশ্ববিদ্যালয়ের সার্বিক প্রজ্ঞাপন, একাডেমিক ক্যালেন্ডার, সিলেবাস এবং অধিভুক্ত কলেজসমূহের কেন্দ্রীয় পোর্টাল।',
    descEn: 'Central portal for university notifications, academic calendars, curriculum regulations, and affiliated college directories.',
    keyInfoBn: 'নুরুল আমিন ডিগ্রি কলেজ ডিগ্রি পাসের জন্য অধিভুক্ত (কোড ৬০০১–৬০০৪)',
    keyInfoEn: 'NADC holds affiliation for Degree Pass (Codes 6001–6004)',
    featuredOnHome: true,
    icon: 'university',
  },
  {
    id: 'srv-degree-pass',
    titleBn: 'ডিগ্রি (পাস) কোর্সসমূহ ও প্রাতিষ্ঠানিক তথ্য',
    titleEn: 'Degree (Pass) Curriculum & Academic Details',
    category: 'degree',
    categoryNameBn: 'ডিগ্রি পাস তথ্য',
    categoryNameEn: 'Degree Pass Information',
    officialSourceBn: 'এনএডিসি একাডেমিক বিভাগ (জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত)',
    officialSourceEn: 'NADC Academic Faculty (National University Affiliated)',
    badgeType: 'institutional',
    badgeTextBn: 'কলেজ অভ্যন্তরীণ সেবা',
    badgeTextEn: 'Institutional Campus Service',
    url: '/academics#degree-pass',
    isExternal: false,
    descBn: 'নুরুল আমিন ডিগ্রি কলেজের অনুমোদিত স্নাতক ডিগ্রি পাস কোর্স: বি.এ. (৬০০১), বি.এস.এস. (৬০০২), বি.এসসি. (৬০০৩) ও বি.বি.এস. (৬০০৪)।',
    descEn: 'Details of approved undergraduate degree courses at NADC: B.A. (6001), B.S.S. (6002), B.Sc. (6003), and B.B.S. (6004).',
    keyInfoBn: '৩ বছর মেয়াদী ডিগ্রি পাস পাঠ্যক্রম • কলেজ শাখায় সরাসরি ভর্তি',
    keyInfoEn: '3-Year Degree Curriculum • Direct campus admission',
    featuredOnHome: false,
    icon: 'book',
  },
  {
    id: 'srv-official-notices',
    titleBn: 'কলেজের সকল প্রাতিষ্ঠানিক নোটিশ ও বিজ্ঞপ্তি',
    titleEn: 'Institutional Notices & College Circulars',
    category: 'notices',
    categoryNameBn: 'অফিসিয়াল নোটিশ',
    categoryNameEn: 'Official Notices',
    officialSourceBn: 'অধ্যক্ষের কার্যালয়, নুরুল আমিন ডিগ্রি কলেজ',
    officialSourceEn: 'Office of the Principal, NADC',
    badgeType: 'institutional',
    badgeTextBn: 'কলেজ অভ্যন্তরীণ সেবা',
    badgeTextEn: 'Institutional Campus Service',
    url: '/notice',
    isExternal: false,
    descBn: 'কলেজ প্রশাসন কর্তৃক জারিকৃত সকল প্রাতিষ্ঠানিক নোটিশ, ছুটির তালিকা, ফি জমাদানের তারিখ ও অভ্যন্তরীণ নির্দেশনা।',
    descEn: 'Official announcements, holiday notices, fee deadlines, class routines, and internal directives issued by college administration.',
    keyInfoBn: 'বিষয়ভিত্তিক অনুসন্ধানযোগ্য ও ক্যাটাগরিভিত্তিক নোটিশ',
    keyInfoEn: 'Searchable by keyword & filterable by category',
    featuredOnHome: false,
    icon: 'bullhorn',
  },
];

export interface PortalStatusRecord {
  id: string;
  nameBn: string;
  nameEn: string;
  domain: string;
  statusBn: string;
  statusEn: string;
  url: string;
  notesBn: string;
  notesEn: string;
}

export const VERIFIED_GOVERNMENT_PORTALS: PortalStatusRecord[] = [
  {
    id: 'portal-xi',
    nameBn: 'একাদশ শ্রেণি ভর্তি সিস্টেম (শিক্ষা মন্ত্রণালয়)',
    nameEn: 'XI Class Admission System (Ministry of Education)',
    domain: 'xiclassadmission.gov.bd',
    statusBn: 'অনলাইন ও সচল',
    statusEn: 'Online & Active',
    url: 'https://xiclassadmission.gov.bd/',
    notesBn: 'একাদশ শ্রেণিতে ভর্তির কেন্দ্রীয় সরকারি পোর্টাল।',
    notesEn: 'Central government admission portal for HSC XI Class.',
  },
  {
    id: 'portal-results',
    nameBn: 'শিক্ষা বোর্ড ফলাফল সার্ভার (এসএসসি ও এইচএসসি)',
    nameEn: 'Education Board Results Server (SSC & HSC)',
    domain: 'educationboardresults.gov.bd',
    statusBn: 'অনলাইন ও সচল',
    statusEn: 'Online & Active',
    url: 'https://educationboardresults.gov.bd/v2/home',
    notesBn: 'এসএসসি ও এইচএসসি ফলাফল প্রকাশের সরকারি সার্ভার।',
    notesEn: 'SSC & HSC exam grade publication.',
  },
  {
    id: 'portal-nu-results',
    nameBn: 'জাতীয় বিশ্ববিদ্যালয় ফলাফল পোর্টাল (ডিগ্রি ও অনার্স)',
    nameEn: 'National University Results Portal (Degree & Honours)',
    domain: 'results.nu.ac.bd',
    statusBn: 'অনলাইন ও সচল',
    statusEn: 'Online & Active',
    url: 'https://results.nu.ac.bd/',
    notesBn: 'ডিগ্রি ও অনার্স পরীক্ষার ফলাফল প্রকাশের মূল সার্ভার।',
    notesEn: 'Degree Pass & Honours results.',
  },
  {
    id: 'portal-dhaka-board',
    nameBn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা',
    nameEn: 'Board of Intermediate & Secondary Education, Dhaka',
    domain: 'dhakaeducationboard.gov.bd',
    statusBn: 'অনলাইন (সুরক্ষিত গেটওয়ে)',
    statusEn: 'Online (Protected Gateway)',
    url: 'https://dhakaeducationboard.gov.bd/',
    notesBn: 'স্বয়ংক্রিয় বট প্রতিরোধ গেটওয়ে দ্বারা সুরক্ষিত।',
    notesEn: 'Protected by browser verification gateway.',
  },
  {
    id: 'portal-nu-main',
    nameBn: 'জাতীয় বিশ্ববিদ্যালয় মূল অফিসিয়াল পোর্টাল',
    nameEn: 'National University Official Website',
    domain: 'nu.ac.bd',
    statusBn: 'অনলাইন ও সচল',
    statusEn: 'Online & Active',
    url: 'https://www.nu.ac.bd/',
    notesBn: 'সকল কেন্দ্রীয় নোটিশ ও প্রজ্ঞাপন।',
    notesEn: 'Central notices and notifications.',
  },
];
