/**
 * Nurul Amin College (নুরুল আমিন ডিগ্রি কলেজ)
 * Official Institutional Constants & Metadata
 * 
 * Verified against:
 * - Board of Intermediate & Secondary Education, Dhaka (EIIN: 110882)
 * - National University of Bangladesh (College Code: 6309)
 * - Directorate of Secondary and Higher Education (MPO: 3504013201)
 */

export const COLLEGE_INFO = {
  name: {
    en: 'Nurul Amin College',
    enFull: 'Nurul Amin Degree College',
    bn: 'নুরুল আমিন ডিগ্রি কলেজ',
    shortEn: 'NAC',
    shortBn: 'এনএসি'
  },
  identity: {
    eiin: '110882',
    nuCollegeCode: '6309',
    mpoCode: '3504013201',
    establishedYear: 1994,
    establishedDate: '1994-09-07',
    founder: 'Prof. Dr. Nurul Amin Bepari'
  },
  location: {
    village: 'Umedpur',
    villageBn: 'উমেদপুর',
    upazila: 'Shibchar',
    upazilaBn: 'শিবচর',
    district: 'Madaripur',
    districtBn: 'মাদারীপুর',
    division: 'Dhaka',
    divisionBn: 'ঢাকা বিভাগ',
    postCode: '7933',
    country: 'Bangladesh',
    countryBn: 'বাংলাদেশ',
    fullAddressEn: 'Umedpur, Shibchar, Madaripur - 7933, Dhaka Division, Bangladesh',
    fullAddressBn: 'উমেদপুর, শিবচর, মাদারীপুর - ৭৯৩৩, ঢাকা বিভাগ, বাংলাদেশ'
  },
  contact: {
    phone: '01703228122',
    email: 'nurulamincollege.degree@gmail.com',
    officialBoardUrl: 'https://deb110882.dhakaeducationboard.gov.bd/',
    officialManpowerUrl: 'https://deb110882.dhakaeducationboard.gov.bd/index.php/content/manpower'
  },
  academic: {
    hscAffiliation: 'Board of Intermediate & Secondary Education, Dhaka',
    degreeAffiliation: 'National University, Bangladesh',
    hscGroups: ['Science', 'Humanities', 'Business Studies'],
    degreeCourses: ['B.A.', 'B.S.S.', 'B.B.S.', 'B.Sc.']
  },
  developer: {
    brand: 'The Emran Dev',
    name: 'Md Emran Chokder',
    shortName: 'Emran',
    creditEn: 'The Emran Dev (Md Emran Chokder)',
    creditBn: 'দ্য এমরান দেব (মোঃ এমরান চোকদার)',
    role: 'Website Developer & Maintainer',
    github: 'https://github.com/theemrandev',
    repo: 'https://github.com/theemrandev/Nurul_Amin_College',
    linkedin: 'https://linkedin.com/in/theemrandev',
  }
} as const;

export type CollegeInfo = typeof COLLEGE_INFO;
