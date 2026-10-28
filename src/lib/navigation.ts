/**
 * Primary Navigation Structure
 * Nurul Amin College Portal
 */

export interface NavSubItem {
  id: string;
  titleKey: string;
  href: string;
  isExternal?: boolean;
}

export interface NavItem {
  id: string;
  titleKey: string;
  href: string;
  isExternal?: boolean;
  items?: NavSubItem[];
}

export const PRIMARY_NAVIGATION: NavItem[] = [
  {
    id: 'home',
    titleKey: 'nav_home',
    href: '/',
  },
  {
    id: 'about',
    titleKey: 'nav_about',
    href: '/about',
    items: [
      { id: 'about-history', titleKey: 'nav_about_history', href: '/about#history' },
      { id: 'about-tour', titleKey: 'nav_about_tour', href: '/tour' },
      { id: 'about-gallery', titleKey: 'nav_about_gallery', href: '/gallery' },
      { id: 'about-sports', titleKey: 'nav_about_sports', href: '/sports' },
      { id: 'about-welfare', titleKey: 'nav_about_welfare', href: '/humanitarian' },
      { id: 'about-credits', titleKey: 'nav_about_credits', href: '/credits' },
    ],
  },
  {
    id: 'academics',
    titleKey: 'nav_academics',
    href: '/academics',
    items: [
      { id: 'academics-overview', titleKey: 'nav_academics_overview', href: '/academics' },
      { id: 'academics-hsc', titleKey: 'nav_academics_hsc', href: '/academics#hsc' },
      { id: 'academics-degree', titleKey: 'nav_academics_degree', href: '/academics#degree-pass' },
      { id: 'academics-teachers', titleKey: 'nav_teachers', href: '/teachers' },
      { id: 'academics-routine', titleKey: 'nav_routine', href: '/routine' },
    ],
  },
  {
    id: 'student-services',
    titleKey: 'nav_student_services',
    href: '/student-services',
    items: [
      { id: 'services-overview', titleKey: 'nav_student_services', href: '/student-services' },
      { id: 'services-admission', titleKey: 'nav_admission_guidelines', href: '/admission' },
      { id: 'services-portal', titleKey: 'nav_admission_official_portal', href: 'https://xiclassadmission.gov.bd/', isExternal: true },
    ],
  },
  {
    id: 'notices',
    titleKey: 'nav_notices',
    href: '/notice',
    items: [
      { id: 'notices-all', titleKey: 'nav_notices_all', href: '/notice' },
      { id: 'notices-board', titleKey: 'nav_notices_board', href: 'https://deb110882.dhakaeducationboard.gov.bd/', isExternal: true },
      { id: 'notices-nu', titleKey: 'nav_notices_nu', href: 'https://www.nu.ac.bd/', isExternal: true },
    ],
  },
  {
    id: 'contact',
    titleKey: 'nav_contact',
    href: '/contact',
  },
];
