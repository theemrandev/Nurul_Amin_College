/**
 * Shared Type Definitions
 * Nurul Amin College Portal
 */

export type Language = 'bn' | 'en';
export type Theme = 'light' | 'dark' | 'system';

export interface BilingualText {
  bn: string;
  en: string;
}

export type AdminRole = 'main_admin' | 'sub_admin';

export type SubAdminPermission =
  | 'manage_notices'
  | 'manage_teachers'
  | 'manage_routines'
  | 'manage_admissions'
  | 'view_messages';

export interface AdminUser {
  id: string;
  userId: string;
  email: string;
  role: AdminRole;
  permissions: SubAdminPermission[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  departmentBn: string;
  departmentEn: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  orderIndex: number;
  isPublished: boolean;
  isVerified: boolean;
  sourceNote?: string;
  verifiedAt?: string;
}

export type NoticeCategory = 'general' | 'exam' | 'admission' | 'routine' | 'achievement';

export interface Notice {
  id: string;
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  category: NoticeCategory;
  publishedDate: string;
  attachmentUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineItem {
  id: string;
  titleBn: string;
  titleEn: string;
  classGroup: string;
  examType: string;
  session: string;
  fileUrl: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  actorUserId?: string;
  targetUserId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}
