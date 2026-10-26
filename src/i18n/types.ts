export type LanguageCode =
  | "en" // English
  | "bn" // Bengali
  | "ar" // Arabic
  | "es" // Spanish
  | "fr" // French
  | "de" // German
  | "pt" // Portuguese
  | "zh" // Simplified Chinese
  | "ja" // Japanese
  | "ko" // Korean
  | "hi" // Hindi
  | "ur" // Urdu
  | "ru" // Russian
  | "it" // Italian
  | "tr" // Turkish
  | "id" // Indonesian
  | "nl" // Dutch
  | "th" // Thai
  | "vi" // Vietnamese
  | "fa"; // Persian

export interface LanguageInfo {
  code: LanguageCode;
  name: string; // Native name
  englishName: string;
  dir: "ltr" | "rtl";
}

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    skills: string;
    projects: string;
    contact: string;
    downloadCv: string;
    selectLanguage: string;
    toggleTheme: string;
    menu: string;
    close: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    viewWork: string;
    getInTouch: string;
    downloadCv: string;
    focusTitle: string;
    focusSubtitle: string;
  };
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    bioP1: string;
    bioP2: string;
    educationTitle: string;
    educationDegree1: string;
    educationSchool1: string;
    educationYear1: string;
    educationDegree2: string;
    educationSchool2: string;
    educationYear2: string;
    statsYears: string;
    statsProjects: string;
    statsCode: string;
    statsCommit: string;
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
    s5Title: string;
    s5Desc: string;
    s6Title: string;
    s6Desc: string;
  };
  skills: {
    sectionTag: string;
    title: string;
    subtitle: string;
    catFrontend: string;
    catStyling: string;
    catState: string;
    catTools: string;
    learningBadge: string;
    roadmapTag: string;
    roadmapTitle: string;
    roadmapSubtitle: string;
    catBackend: string;
    catDevops: string;
    catGenai: string;
  };
  projects: {
    sectionTag: string;
    title: string;
    subtitle: string;
    viewLive: string;
    viewCode: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    directTitle: string;
    directDesc: string;
    locationLabel: string;
    locationValue: string;
    emailLabel: string;
    phoneLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    errName: string;
    errEmail: string;
    errMessage: string;
  };
  footer: {
    tagline: string;
    navigationTitle: string;
    socialTitle: string;
    rights: string;
    backToTop: string;
  };
}
