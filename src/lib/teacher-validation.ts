/**
 * Teacher Record Input Validation & Sanitization
 * Nurul Amin Degree College Portal
 */

export interface TeacherInput {
  nameBn?: string;
  nameEn?: string;
  designationBn?: string;
  designationEn?: string;
  departmentBn?: string | null;
  departmentEn?: string | null;
  rank?: string;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  specialNote?: string | null;
}

export interface ValidatedTeacherData {
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  departmentBn: string | null;
  departmentEn: string | null;
  rank: 'vice-principal' | 'assistant-professor' | 'lecturer' | 'staff' | 'other';
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  specialNote: string | null;
}

export interface TeacherValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ValidatedTeacherData;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(\+?880|0)?1[3-9]\d{8}$|^(\+?[0-9]{10,15})$/;
const SAFE_PHOTO_REGEX = /^(\/images\/[a-zA-Z0-9_\-\/.]+\.(jpg|jpeg|png|webp)|https?:\/\/[a-zA-Z0-9_\-./]+\.(jpg|jpeg|png|webp))$/i;

export const ALLOWED_RANKS = [
  'vice-principal',
  'assistant-professor',
  'lecturer',
  'staff',
  'other',
] as const;

export function validateTeacherInput(input: unknown): TeacherValidationResult {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== 'object') {
    return {
      isValid: false,
      errors: { _general: 'Invalid request payload / অনুরোধের তথ্য সঠিক নয়।' },
    };
  }

  const raw = input as Record<string, unknown>;

  // 1. Bengali Name (required)
  const nameBn = typeof raw.nameBn === 'string' ? raw.nameBn.trim() : '';
  if (!nameBn || nameBn.length < 2 || nameBn.length > 100) {
    errors.nameBn = 'শিক্ষকের বাংলা নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে / Bengali name must be 2 to 100 characters.';
  }

  // 2. English Name (required)
  const nameEn = typeof raw.nameEn === 'string' ? raw.nameEn.trim() : '';
  if (!nameEn || nameEn.length < 2 || nameEn.length > 100) {
    errors.nameEn = 'শিক্ষকের ইংরেজি নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে / English name must be 2 to 100 characters.';
  }

  // 3. Bengali Designation (required)
  const designationBn = typeof raw.designationBn === 'string' ? raw.designationBn.trim() : '';
  if (!designationBn || designationBn.length < 2 || designationBn.length > 100) {
    errors.designationBn = 'পদবি (বাংলা) আবশ্যক (২-১০০ অক্ষর) / Designation (Bengali) is required (2-100 characters).';
  }

  // 4. English Designation (required)
  const designationEn = typeof raw.designationEn === 'string' ? raw.designationEn.trim() : '';
  if (!designationEn || designationEn.length < 2 || designationEn.length > 100) {
    errors.designationEn = 'পদবি (ইংরেজি) আবশ্যক (২-১০০ অক্ষর) / Designation (English) is required (2-100 characters).';
  }

  // 5. Bengali Department (optional)
  const departmentBn = typeof raw.departmentBn === 'string' && raw.departmentBn.trim().length > 0
    ? raw.departmentBn.trim()
    : null;
  if (departmentBn && departmentBn.length > 100) {
    errors.departmentBn = 'বিভাগের নাম ১০০ অক্ষরের মধ্যে হতে হবে / Department name must be under 100 characters.';
  }

  // 6. English Department (optional)
  const departmentEn = typeof raw.departmentEn === 'string' && raw.departmentEn.trim().length > 0
    ? raw.departmentEn.trim()
    : null;
  if (departmentEn && departmentEn.length > 100) {
    errors.departmentEn = 'Department name must be under 100 characters / বিভাগের নাম ১০০ অক্ষরের মধ্যে হতে হবে।';
  }

  // 7. Rank (required, one of allowed)
  const rawRank = typeof raw.rank === 'string' ? raw.rank.trim().toLowerCase() : 'lecturer';
  let rank: ValidatedTeacherData['rank'] = 'lecturer';
  if ((ALLOWED_RANKS as readonly string[]).includes(rawRank)) {
    rank = rawRank as ValidatedTeacherData['rank'];
  } else {
    errors.rank = 'অনুমোদিত র্যাঙ্ক নির্বাচন করুন / Please select a valid rank (vice-principal, assistant-professor, lecturer, staff, other).';
  }

  // 8. Email (optional, but must be valid if given)
  let email: string | null = null;
  if (raw.email !== undefined && raw.email !== null) {
    const trimmedEmail = typeof raw.email === 'string' ? raw.email.trim() : '';
    if (trimmedEmail.length > 0) {
      if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 100) {
        errors.email = 'সঠিক ইমেইল ঠিকানা প্রদান করুন / Please provide a valid email address.';
      } else {
        email = trimmedEmail.toLowerCase();
      }
    }
  }

  // 9. Phone (optional, but must be valid if given)
  let phone: string | null = null;
  if (raw.phone !== undefined && raw.phone !== null) {
    const trimmedPhone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
    if (trimmedPhone.length > 0) {
      if (!PHONE_REGEX.test(trimmedPhone)) {
        errors.phone = 'সঠিক ফোন নম্বর প্রদান করুন (যেমন: 017xxxxxxxx) / Please enter a valid phone number.';
      } else {
        phone = trimmedPhone;
      }
    }
  }

  // 10. Photo URL (optional, safe path)
  let photoUrl: string | null = null;
  if (raw.photoUrl !== undefined && raw.photoUrl !== null) {
    const trimmedPhoto = typeof raw.photoUrl === 'string' ? raw.photoUrl.trim() : '';
    if (trimmedPhoto.length > 0) {
      if (trimmedPhoto.length > 255) {
        errors.photoUrl = 'ছবির পাথ বা URL ২৫৫ অক্ষরের বেশি হতে পারবে না / Photo path cannot exceed 255 characters.';
      } else if (!SAFE_PHOTO_REGEX.test(trimmedPhoto) && !trimmedPhoto.startsWith('/')) {
        errors.photoUrl = 'ছবির পাথ সঠিক নয় (যেমন: /images/teachers/faculty.jpg) / Photo path must be a valid relative or image URL.';
      } else {
        photoUrl = trimmedPhoto;
      }
    }
  }

  // 11. Special Note (optional)
  let specialNote: string | null = null;
  if (raw.specialNote !== undefined && raw.specialNote !== null) {
    const trimmedNote = typeof raw.specialNote === 'string' ? raw.specialNote.trim() : '';
    if (trimmedNote.length > 0) {
      if (trimmedNote.length > 500) {
        errors.specialNote = 'বিশেষ মন্তব্য ৫০০ অক্ষরের মধ্যে সীমাবদ্ধ রাখুন / Special note must be under 500 characters.';
      } else {
        specialNote = trimmedNote;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    data: isValid
      ? {
          nameBn,
          nameEn,
          designationBn,
          designationEn,
          departmentBn,
          departmentEn,
          rank,
          email,
          phone,
          photoUrl,
          specialNote,
        }
      : undefined,
  };
}
