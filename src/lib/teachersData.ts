/**
 * Verified Teachers, Staff & Academic Faculty Records
 * Nurul Amin Degree College Portal
 *
 * Primary Source:
 * Dhaka Education Board Official Institutional Manpower Directory:
 * https://deb110882.dhakaeducationboard.gov.bd/index.php/content/manpower
 *
 * Strict Compliance:
 * - 25 verified individual faculty members (1 Vice Principal, 9 Assistant Professors, 15 Lecturers).
 * - Exact published English names, designations, and official Gmail addresses.
 * - Accurate Bengali name translations alongside authoritative English spelling.
 * - Authentic photo mappings from Board ERP (/images/teachers/*.jpg).
 * - Distinct separation between Individual Teachers, Collective Councils, and Departments.
 * - Zero fabricated qualifications, phone numbers, or teaching claims.
 */

export interface IndividualTeacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  rank: 'vice-principal' | 'assistant-professor' | 'lecturer';
  email: string;
  photoUrl: string;
  photoAltBn: string;
  photoAltEn: string;
  departmentBn?: string;
  departmentEn?: string;
  specialNoteBn?: string;
  specialNoteEn?: string;
  sourceNoteBn: string;
  sourceNoteEn: string;
  isVerified: boolean;
}

export interface CollectiveCouncil {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  photoUrl: string;
  photoAltBn: string;
  photoAltEn: string;
  descBn: string;
  descEn: string;
  sourceNoteBn: string;
  sourceNoteEn: string;
}

export interface DepartmentOverview {
  id: string;
  nameBn: string;
  nameEn: string;
  shortCode: string;
  disciplinesBn: string[];
  disciplinesEn: string[];
  descBn: string;
  descEn: string;
  curriculumBn: string;
  curriculumEn: string;
}

/**
 * 25 Verified Individual Faculty Members
 * Extracted directly from official Dhaka Education Board Manpower Portal (EIIN: 110882)
 */
export const VERIFIED_INDIVIDUAL_TEACHERS: IndividualTeacher[] = [
  // 1. Vice Principal
  {
    id: 'teacher-dinesh-chandra-sarkar',
    nameBn: 'দিনেশ চন্দ্র সরকার',
    nameEn: 'DINESH CHANDRA SARKAR',
    designationBn: 'উপাধ্যক্ষ',
    designationEn: 'Vice Principal',
    rank: 'vice-principal',
    email: 'sarkardinesh67@gmail.com',
    photoUrl: '/images/teachers/58b3e1054258c.jpg',
    photoAltBn: 'দিনেশ চন্দ্র সরকার - উপাধ্যক্ষ, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Dinesh Chandra Sarkar - Vice Principal, Nurul Amin Degree College',
    departmentBn: 'পদার্থবিজ্ঞান (পরীক্ষক কোড: ২০৪০)',
    departmentEn: 'Physics (Board Examiner Code: 2040)',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },

  // 2-10. Assistant Professors (9)
  {
    id: 'teacher-progati-sarkar',
    nameBn: 'প্রগতি সরকার',
    nameEn: 'PROGATI SARKAR',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'nurulamincollege.degree@gmail.com',
    photoUrl: '/images/teachers/586b6cb1c9254.jpg',
    photoAltBn: 'প্রগতি সরকার - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Progati Sarkar - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-shariful-islam',
    nameBn: 'মো. শরিফুল ইসলাম',
    nameEn: 'MD. SHARIFUL ISLAM',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'sharifulnac1973@gmail.com',
    photoUrl: '/images/teachers/636d143f1bf74.jpg',
    photoAltBn: 'মো. শরিফুল ইসলাম - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Shariful Islam - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-amirul-islam',
    nameBn: 'মো. আমিরুল ইসলাম',
    nameEn: 'MD. AMIRUL ISLAM',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'islamamirul4664079@gmail.com',
    photoUrl: '/images/teachers/5ac5a630be1eb.jpg',
    photoAltBn: 'মো. আমিরুল ইসলাম - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Amirul Islam - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-jahangir-alom',
    nameBn: 'মো. জাহাঙ্গীর আলম',
    nameEn: 'MD. JAHANGIR ALOM',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'JAHANGIR.HD.NAC@GMAIL.COM',
    photoUrl: '/images/teachers/5abb3bfcd206e.jpg',
    photoAltBn: 'মো. জাহাঙ্গীর আলম - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Jahangir Alom - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি)',
    departmentEn: 'Information & Communication Technology (ICT)',
    specialNoteBn: 'ওয়েবসাইট ডেভেলপারের মেন্টর',
    specialNoteEn: 'Mentor of the Website Developer',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-mostafa-sher-zaman',
    nameBn: 'মোস্তফা শের জামান',
    nameEn: 'MOSTAFA SHER ZAMAN',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'mostafasherzaman@gmail.com',
    photoUrl: '/images/teachers/59c73e0e3871b.jpg',
    photoAltBn: 'মোস্তফা শের জামান - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Mostafa Sher Zaman - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-shirajul-islam',
    nameBn: 'সিরাজুল ইসলাম',
    nameEn: 'SHIRAJUL ISLAM',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'shirajul248@gmail.com',
    photoUrl: '/images/teachers/58b66e1e9eb4c.jpg',
    photoAltBn: 'সিরাজুল ইসলাম - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Shirajul Islam - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-manirul-islam',
    nameBn: 'মণিরুল ইসলাম',
    nameEn: 'MANIRUL ISLAM',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'manirulmasud88@gmail.com',
    photoUrl: '/images/teachers/58b53a2a0e75e.jpg',
    photoAltBn: 'মণিরুল ইসলাম - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Manirul Islam - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-saber-ali-mollick',
    nameBn: 'মো. ছাবের আলী মল্লিক',
    nameEn: 'MD. SABER ALI MOLLICK',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'safurkhan_bd@gmail.com',
    photoUrl: '/images/teachers/5874e6da4b4a0.jpg',
    photoAltBn: 'মো. ছাবের আলী মল্লিক - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Saber Ali Mollick - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-muhammad-nuruzzaman',
    nameBn: 'মুহাম্মদ নুরুজ্জামান',
    nameEn: 'MUHAMMAD NURUZZAMAN',
    designationBn: 'সহকারী অধ্যাপক',
    designationEn: 'Assistant Professor',
    rank: 'assistant-professor',
    email: 'shimul.nac@gmail.com',
    photoUrl: '/images/teachers/58773fafc3b24.jpg',
    photoAltBn: 'মুহাম্মদ নুরুজ্জামান - সহকারী অধ্যাপক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Muhammad Nuruzzaman - Assistant Professor, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },

  // 11-25. Lecturers (15)
  {
    id: 'teacher-ferdaus-wahid-sohag',
    nameBn: 'ফেরদৌস ওয়াহিদ সোহাগ',
    nameEn: 'FERDAUS WAHID SOHAG',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'ferdauswahid985665@gmail.com',
    photoUrl: '/images/teachers/6388a4a95f029.jpg',
    photoAltBn: 'ফেরদৌস ওয়াহিদ সোহাগ - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Ferdaus Wahid Sohag - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-shahana-khatun',
    nameBn: 'শাহানা খাতুন',
    nameEn: 'SHAHANA KHATUN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'shahnajk682@gmail.com',
    photoUrl: '/images/teachers/64e5974cd4242.jpg',
    photoAltBn: 'শাহানা খাতুন - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Shahana Khatun - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-mohammad-nazrul-islam',
    nameBn: 'মোহাম্মদ নজরুল ইসলাম',
    nameEn: 'MOHAMMAD NAZRUL ISLAM',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'mohammadnazrulislamm4@gmail.com',
    photoUrl: '/images/teachers/662de994469d9.jpg',
    photoAltBn: 'মোহাম্মদ নজরুল ইসলাম - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Mohammad Nazrul Islam - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-masum-hossan',
    nameBn: 'মো. মাসুম হোসেন',
    nameEn: 'MD. MASUM HOSSAN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'masum9261@gmail.com',
    photoUrl: '/images/teachers/5874ca7e1b950.jpg',
    photoAltBn: 'মো. মাসুম হোসেন - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Masum Hossan - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-sufia-sultana',
    nameBn: 'সুফিয়া সুলতানা',
    nameEn: 'SUFIA SULTANA',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'sufiab41@gmail.com',
    photoUrl: '/images/teachers/617f765d0e74b.jpg',
    photoAltBn: 'সুফিয়া সুলতানা - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Sufia Sultana - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-ecahak-sikder',
    nameBn: 'মো. এসাহাক সিকদার',
    nameEn: 'MD. ECAHAK SIKDER',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'sm.jnu987@gmail.com',
    photoUrl: '/images/teachers/6166e26d057ca.jpg',
    photoAltBn: 'মো. এসাহাক সিকদার - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Ecahak Sikder - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-kawshar-ahmed',
    nameBn: 'কাওছার আহমেদ',
    nameEn: 'KAWSHAR AHMED',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'ahmedkawshar774@gmail.com',
    photoUrl: '/images/teachers/5e23de1924899.jpg',
    photoAltBn: 'কাওছার আহমেদ - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Kawshar Ahmed - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-muha-nazmul-hossain',
    nameBn: 'মুহা. নাজমুল হোসেন',
    nameEn: 'MUHA NAZMUL HOSSAIN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'hnazmul187@gmail.com',
    photoUrl: '/images/teachers/5c6799a9c1d94.jpg',
    photoAltBn: 'মুহা. নাজমুল হোসেন - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Muha Nazmul Hossain - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-sarwar-jahan',
    nameBn: 'মো. সারোয়ার জাহান',
    nameEn: 'MD. SARWAR JAHAN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'sarwarph@gmail.com',
    photoUrl: '/images/teachers/5cc88c1db4ffd.jpg',
    photoAltBn: 'মো. সারোয়ার জাহান - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Sarwar Jahan - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-maskuratunnessa',
    nameBn: 'মোসা. মাসকুরাতুন্নেসা',
    nameEn: 'MISS. MASKURATUNNESSA',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'maskura.du@yahoo.com',
    photoUrl: '/images/teachers/5cb17546130de.jpg',
    photoAltBn: 'মোসা. মাসকুরাতুন্নেসা - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Miss. Maskuratunnessa - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-muha-abdullah-al-mamun',
    nameBn: 'মুহা. আব্দুল্লাহ আল মামুন',
    nameEn: 'MUHA. ABDULLAH AL MAMUN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'mukta.ru2005@gmail.com',
    photoUrl: '/images/teachers/5aca063b55525.jpg',
    photoAltBn: 'মুহা. আব্দুল্লাহ আল মামুন - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Muha. Abdullah Al Mamun - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-md-moshiur-rahman',
    nameBn: 'মো. মোশিউর রহমান',
    nameEn: 'MD. MOSHIUR RAHMAN',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'moshiurjnu@gmail.com',
    photoUrl: '/images/teachers/5a79f32e4ca28.jpg',
    photoAltBn: 'মো. মোশিউর রহমান - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Md. Moshiur Rahman - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-krishna-rani-biswas',
    nameBn: 'কৃষ্ণা রানী বিশ্বাস',
    nameEn: 'KRISHNA RANI BISWAS',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'krishna88biswas@gmail.com',
    photoUrl: '/images/teachers/5a013904a189a.jpg',
    photoAltBn: 'কৃষ্ণা রানী বিশ্বাস - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Krishna Rani Biswas - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-mohammad-alamgir-mridha',
    nameBn: 'মোহাম্মদ আলমগীর মৃধা',
    nameEn: 'MOHAMMAD ALAMGIR MRIDHA',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'mridha303@gmail.com',
    photoUrl: '/images/teachers/58777a9663584.jpg',
    photoAltBn: 'মোহাম্মদ আলমগীর মৃধা - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Mohammad Alamgir Mridha - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
  {
    id: 'teacher-razu-ahamed',
    nameBn: 'রাজু আহমেদ',
    nameEn: 'RAZU AHAMED',
    designationBn: 'প্রভাষক',
    designationEn: 'Lecturer',
    rank: 'lecturer',
    email: 'ahamedrajuraju7176@gmail.com',
    photoUrl: '/images/teachers/6988414877b64.jpg',
    photoAltBn: 'রাজু আহমেদ - প্রভাষক, নুরুল আমিন ডিগ্রি কলেজ',
    photoAltEn: 'Razu Ahamed - Lecturer, Nurul Amin Degree College',
    departmentBn: 'দাপ্তরিক নথিতে সংরক্ষিত',
    departmentEn: 'On Record with Administration',
    sourceNoteBn: 'ঢাকা শিক্ষা বোর্ড অফিশিয়াল জনবল পোর্টাল (EIIN: 110882)',
    sourceNoteEn: 'Dhaka Education Board Official Manpower Portal (EIIN: 110882)',
    isVerified: true,
  },
];

/**
 * Collective Institutional Councils & Governing Bodies
 * Clearly separated from individual teacher records
 */
export const COLLECTIVE_COUNCILS: CollectiveCouncil[] = [
  {
    id: 'council-leadership',
    titleBn: 'কলেজ প্রশাসন ও শিক্ষক পরিষদ',
    titleEn: "College Administration & Teachers' Council",
    categoryBn: 'প্রাতিষ্ঠানিক নেতৃত্ব ও পরিচালনা পরিষদ',
    categoryEn: 'Institutional Governance & Leadership',
    photoUrl: '/images/principal.jpeg',
    photoAltBn: 'নুরুল আমিন ডিগ্রি কলেজ প্রাতিষ্ঠানিক পরিচালনা ও শিক্ষক পরিষদ',
    photoAltEn: "Nurul Amin Degree College Institutional Governance & Teachers' Council",
    descBn:
      '১৯৯৪ সালে প্রতিষ্ঠার পর থেকে কলেজ প্রশাসন ও শিক্ষক পরিষদ জাতীয় শিক্ষাক্রম অনুসারে প্রতিষ্ঠানটির সামগ্রিক উচ্চমাধ্যমিক ও স্নাতক ডিগ্রি পাস শিক্ষা কার্যক্রম পরিচালনা করে আসছে।',
    descEn:
      "Since its founding in 1994, the college administration and teachers' council have directed higher secondary and undergraduate degree pass education in alignment with national guidelines.",
    sourceNoteBn: 'উৎস: কলেজ আর্কাইভ (about.html, index.html ও js/data.js)',
    sourceNoteEn: 'Source: College Archives (about.html, index.html & js/data.js)',
  },
  {
    id: 'council-sports-engagement',
    titleBn: 'শিক্ষকমণ্ডলী (ক্রীড়া ও সহশিক্ষা পরিষদ)',
    titleEn: 'Sports & Co-Curricular Faculty Committee',
    categoryBn: 'সহশিক্ষা ও শিক্ষার্থী কল্যাণ পরিচালনা',
    categoryEn: 'Student Engagement & Physical Education',
    photoUrl: '/images/sirs.jpg',
    photoAltBn: 'শিক্ষার্থী ও শিক্ষকবৃন্দের প্রীতি ফুটবল ম্যাচ ও ক্রীড়া অংশগ্রহণ',
    photoAltEn: 'Faculty members participating in friendly campus athletic events',
    descBn:
      'কলেজের সবুজ খেলার মাঠে অনুষ্ঠিত বার্ষিক ক্রীড়া প্রতিযোগিতা, আন্তঃকলেজ ফুটবল টুর্নামেন্ট ও সাংস্কৃতিক কার্যক্রমে শিক্ষকবৃন্দের সক্রিয় উপস্থিতি ও দিকনির্দেশনা ছাত্র-শিক্ষক সম্পর্ককে সুদৃঢ় করে।',
    descEn:
      'Active presence, mentorship, and participation of faculty members in annual intra-college football, athletics, and cultural activities on campus grounds.',
    sourceNoteBn: 'উৎস: ক্রীড়া ও ফটোগ্যালারি অ্যালবাম (play.html, gallery.html ও images/sirs.jpg)',
    sourceNoteEn: 'Source: Sports & Photo Gallery Archives (play.html, gallery.html & images/sirs.jpg)',
  },
];

/**
 * Academic Instructional Departments
 * Distinctly categorized from individual faculty records
 */
export const ACADEMIC_DEPARTMENTS: DepartmentOverview[] = [
  {
    id: 'dept-science',
    nameBn: 'বিজ্ঞান বিভাগ',
    nameEn: 'Department of Science',
    shortCode: 'SCI',
    disciplinesBn: ['পদার্থবিজ্ঞান (Physics)', 'রসায়ন (Chemistry)', 'জীববিজ্ঞান (Biology)', 'উচ্চতর গণিত (Higher Math)'],
    disciplinesEn: ['Physics', 'Chemistry', 'Biology', 'Higher Mathematics'],
    descBn: 'আধুনিক বিজ্ঞান ল্যাব, নিয়মিত ব্যবহারিক ক্লাস ও তাত্ত্বিক পাঠদানের মাধ্যমে উচ্চমাধ্যমিক বিজ্ঞান শিক্ষার্থীদের দক্ষ করে গড়ে তোলা হয়।',
    descEn: 'Equipped with practical science laboratories, regular experimental sessions, and comprehensive theoretical coaching for HSC candidates.',
    curriculumBn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা (এইচএসসি বিজ্ঞান শাখা)',
    curriculumEn: 'Board of Intermediate & Secondary Education, Dhaka (HSC Science Group)',
  },
  {
    id: 'dept-humanities',
    nameBn: 'মানবিক বিভাগ',
    nameEn: 'Department of Humanities',
    shortCode: 'HUM',
    disciplinesBn: ['বাংলা', 'ইংরেজি', 'পৌরনীতি ও সুশাসন', 'সমাজকর্ম', 'ইতিহাস / ইসলামের ইতিহাস', 'অর্থনীতি'],
    disciplinesEn: ['Bengali', 'English', 'Civics & Good Governance', 'Social Work', 'History / Islamic History', 'Economics'],
    descBn: 'সাহিত্য, সংস্কৃতি, রাষ্ট্রনীতি ও সমাজসচেতনতার গভীর পাঠের মাধ্যমে আলোকিত ও মানবিক মূল্যবোধসম্পন্ন গ্র্যাজুয়েট তৈরির বিভাগ।',
    descEn: 'Fostering intellectual depth, civic awareness, and social ethics across both Higher Secondary and Degree undergraduate levels.',
    curriculumBn: 'ঢাকা শিক্ষা বোর্ড (এইচএসসি) ও জাতীয় বিশ্ববিদ্যালয় (বি.এ. / বি.এস.এস.)',
    curriculumEn: 'BISE Dhaka (HSC) & National University (B.A. 6001 / B.S.S. 6002)',
  },
  {
    id: 'dept-business',
    nameBn: 'ব্যবসায় শিক্ষা বিভাগ',
    nameEn: 'Department of Business Studies',
    shortCode: 'BUS',
    disciplinesBn: ['হিসাববিজ্ঞান', 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা', 'ফিন্যান্স, ব্যাংকিং ও বিমা', 'উৎপাদন ব্যবস্থাপনা ও বিপণন'],
    disciplinesEn: ['Accounting', 'Business Organization & Management', 'Finance, Banking & Insurance', 'Production Management & Marketing'],
    descBn: 'বাণিজ্য, হিসাবরক্ষণ ও আধুনিক ব্যবসায়িক নীতিসমূহের প্রয়োগমুখী শিক্ষার সমন্বয়ে পরিচালিত ব্যবসায় শিক্ষা শাখা।',
    descEn: 'Structured instruction in accounting standards, corporate management, financial principles, and trade economics.',
    curriculumBn: 'ঢাকা শিক্ষা বোর্ড (এইচএসসি) ও জাতীয় বিশ্ববিদ্যালয় (বি.বি.এস. কোর্স কোড: ৬০০৪)',
    curriculumEn: 'BISE Dhaka (HSC) & National University (B.B.S. Course Code: 6004)',
  },
  {
    id: 'dept-ict',
    nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ',
    nameEn: 'Department of ICT & Computer Studies',
    shortCode: 'ICT',
    disciplinesBn: ['তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', 'কম্পিউটার অ্যাপ্লিকেশন', 'ডিজিটাল লিটারেসি'],
    disciplinesEn: ['Information & Communication Technology (ICT)', 'Computer Applications', 'Digital Literacy'],
    descBn: 'একাদশ ও দ্বাদশ শ্রেণির সকল শাখার জন্য বাধ্যতামূলক আইসিটি শিক্ষা এবং স্নাতক পর্যায়ের ডিজিটাল দক্ষতার প্রশিক্ষণ প্রদান।',
    descEn: 'Mandatory technology education across all intermediate branches and practical computer literacy for undergraduate students.',
    curriculumBn: 'জাতীয় শিক্ষাক্রম অনুযায়ী বাধ্যতামূলক উচ্চমাধ্যমিক আইসিটি পাঠ্যক্রম',
    curriculumEn: 'National Curriculum Mandatory Intermediate ICT Syllabus',
  },
  {
    id: 'dept-degree',
    nameBn: 'স্নাতক ডিগ্রি (পাস) অনুষদ',
    nameEn: 'Degree (Pass) Academic Faculty',
    shortCode: 'DEG',
    disciplinesBn: ['বি.এ. (কোর্স কোড: ৬০০১)', 'বি.এস.এস. (কোর্স কোড: ৬০০২)', 'বি.বি.এস. (কোর্স কোড: ৬০০৪)', 'বি.এসসি. (কোর্স কোড: ৬০০৩)'],
    disciplinesEn: ['B.A. (Course 6001)', 'B.S.S. (Course 6002)', 'B.B.S. (Course 6004)', 'B.Sc. (Course 6003)'],
    descBn: 'জাতীয় বিশ্ববিদ্যালয়ের অধীন শিবচর উপজেলায় ৩ বছর মেয়াদী ডিগ্রি পাস কোর্সে উচ্চশিক্ষা গ্রহণের অন্যতম প্রধান অনুমোদিত কেন্দ্র।',
    descEn: 'Affiliated 3-year undergraduate degree pass curriculum conducted under National University College Code 6309.',
    curriculumBn: 'জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ (কলেজ কোড: ৬৩০৯)',
    curriculumEn: 'National University of Bangladesh (College Code: 6309)',
  },
];
