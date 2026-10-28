/**
 * Student Record Input Validation & Sanitization
 * Nurul Amin Degree College Portal
 */

export interface StudentInput {
  name?: string;
  studentClass?: string;
  roll?: string;
  group?: string;
  section?: string;
  personalPhone?: string | null;
  personalEmail?: string | null;
  guardianName?: string;
  guardianRelationship?: string;
  guardianPhone?: string | null;
  guardianEmail?: string | null;
  homeAddress?: string;
}

export interface ValidatedStudentData {
  name: string;
  studentClass: string;
  roll: string;
  group: string;
  section: string;
  personalPhone: string | null;
  personalEmail: string | null;
  guardianName: string;
  guardianRelationship: 'Father' | 'Mother';
  guardianPhone: string | null;
  guardianEmail: string | null;
  homeAddress: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ValidatedStudentData;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(\+?880|0)?1[3-9]\d{8}$|^(\+?[0-9]{10,15})$/;

export function validateStudentInput(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== 'object') {
    return {
      isValid: false,
      errors: { _general: 'Invalid request payload / অনুরোধের তথ্য সঠিক নয়।' },
    };
  }

  const raw = input as Record<string, unknown>;

  // 1. Name (required)
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (!name || name.length < 2 || name.length > 100) {
    errors.name = 'শিক্ষার্থীর নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে / Student name must be 2 to 100 characters.';
  }

  // 2. Class (required)
  const studentClass = typeof raw.studentClass === 'string' ? raw.studentClass.trim() : '';
  if (!studentClass || studentClass.length < 1 || studentClass.length > 50) {
    errors.studentClass = 'শ্রেণি নির্বাচন করুন / Class is required.';
  }

  // 3. Roll (required)
  const roll = typeof raw.roll === 'string' ? raw.roll.trim() : typeof raw.roll === 'number' ? String(raw.roll) : '';
  if (!roll || roll.length < 1 || roll.length > 20) {
    errors.roll = 'রোল নম্বর আবশ্যক (১-২০ অক্ষর) / Roll number is required (1-20 characters).';
  }

  // 4. Group (required)
  const group = typeof raw.group === 'string' ? raw.group.trim() : '';
  if (!group || group.length < 1 || group.length > 50) {
    errors.group = 'বিভাগ/গ্রুপ নির্বাচন করুন / Group is required.';
  }

  // 5. Section (optional, defaults to "A")
  let section = typeof raw.section === 'string' ? raw.section.trim() : 'A';
  if (!section) section = 'A';
  if (section.length > 20) {
    errors.section = 'শাখা ২০ অক্ষরের বেশি হতে পারবে না / Section cannot exceed 20 characters.';
  }

  // 6. Guardian Name (required)
  const guardianName = typeof raw.guardianName === 'string' ? raw.guardianName.trim() : '';
  if (!guardianName || guardianName.length < 2 || guardianName.length > 100) {
    errors.guardianName = 'অভিভাবকের নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে / Guardian name must be 2 to 100 characters.';
  }

  // 7. Guardian Relationship (required: Father or Mother)
  const rawRel = typeof raw.guardianRelationship === 'string' ? raw.guardianRelationship.trim().toLowerCase() : '';
  let guardianRelationship: 'Father' | 'Mother' | null = null;
  if (rawRel === 'father' || rawRel === 'পিতা' || rawRel === 'বাবা') {
    guardianRelationship = 'Father';
  } else if (rawRel === 'mother' || rawRel === 'মাতা' || rawRel === 'মা') {
    guardianRelationship = 'Mother';
  } else {
    errors.guardianRelationship = 'অভিভাবকের সম্পর্ক পিতা অথবা মাতা হতে হবে / Guardian relationship must be Father or Mother.';
  }

  // 8. Home Address (required)
  const homeAddress = typeof raw.homeAddress === 'string' ? raw.homeAddress.trim() : '';
  if (!homeAddress || homeAddress.length < 3 || homeAddress.length > 300) {
    errors.homeAddress = 'পূর্ণাঙ্গ ঠিকানা লিখুন (৩-৩০০ অক্ষর) / Full home address is required (3-300 characters).';
  }

  // 9. Personal Phone (optional)
  let personalPhone: string | null = null;
  if (typeof raw.personalPhone === 'string' && raw.personalPhone.trim().length > 0) {
    const cleaned = raw.personalPhone.trim();
    if (!PHONE_REGEX.test(cleaned.replace(/[\s-]/g, ''))) {
      errors.personalPhone = 'সঠিক ফোন নম্বর প্রদান করুন (১০-১৫ ডিজিট) / Invalid phone number format.';
    } else {
      personalPhone = cleaned;
    }
  }

  // 10. Personal Email (optional)
  let personalEmail: string | null = null;
  if (typeof raw.personalEmail === 'string' && raw.personalEmail.trim().length > 0) {
    const cleaned = raw.personalEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleaned)) {
      errors.personalEmail = 'সঠিক ইমেইল ঠিকানা প্রদান করুন / Invalid email format.';
    } else {
      personalEmail = cleaned;
    }
  }

  // 11. Guardian Phone (optional)
  let guardianPhone: string | null = null;
  if (typeof raw.guardianPhone === 'string' && raw.guardianPhone.trim().length > 0) {
    const cleaned = raw.guardianPhone.trim();
    if (!PHONE_REGEX.test(cleaned.replace(/[\s-]/g, ''))) {
      errors.guardianPhone = 'সঠিক অভিভাবক ফোন নম্বর প্রদান করুন / Invalid guardian phone format.';
    } else {
      guardianPhone = cleaned;
    }
  }

  // 12. Guardian Email (optional)
  let guardianEmail: string | null = null;
  if (typeof raw.guardianEmail === 'string' && raw.guardianEmail.trim().length > 0) {
    const cleaned = raw.guardianEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleaned)) {
      errors.guardianEmail = 'সঠিক অভিভাবক ইমেইল প্রদান করুন / Invalid guardian email format.';
    } else {
      guardianEmail = cleaned;
    }
  }

  if (Object.keys(errors).length > 0 || !guardianRelationship) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      name,
      studentClass,
      roll,
      group,
      section,
      personalPhone,
      personalEmail,
      guardianName,
      guardianRelationship,
      guardianPhone,
      guardianEmail,
      homeAddress,
    },
  };
}
