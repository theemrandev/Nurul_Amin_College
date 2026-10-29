import 'server-only';
import { NextResponse } from 'next/server';
import { SessionUser } from '@/lib/auth';

/**
 * Server-Side Role-Based Access Control (RBAC) Helpers
 * Nurul Amin Degree College Administration Portal
 *
 * Strict Enforcement:
 * - MAIN_ADMIN: Full system authority over all records and administrators.
 * - ASSISTANT_ADMIN: Operational staff. Can create records and modify own records.
 *   Strictly prohibited from modifying, deleting, or creating administrator accounts.
 */

export interface PermissionCheckResult {
  allowed: boolean;
  statusCode?: number;
  message?: string;
}

/**
 * Validates whether the active session belongs to a logged-in administrator.
 */
export function requireAuth(session: SessionUser | null): PermissionCheckResult {
  if (!session || !session.isActive) {
    return {
      allowed: false,
      statusCode: 401,
      message: 'Authentication required. Please log in to access this resource.',
    };
  }
  return { allowed: true };
}

/**
 * Validates that only the Main Admin can perform administrative user operations.
 */
export function requireMainAdmin(session: SessionUser | null): PermissionCheckResult {
  const authCheck = requireAuth(session);
  if (!authCheck.allowed) return authCheck;

  if (session?.role !== 'MAIN_ADMIN') {
    return {
      allowed: false,
      statusCode: 403,
      message: 'Access denied: Only the Main Administrator can perform administrator management.',
    };
  }
  return { allowed: true };
}

/**
 * Enforces administrator account modification rules:
 * - Assistant Admins cannot create, modify, disable, or delete ANY administrator accounts.
 * - Main Admin cannot delete their own Main Admin account.
 */
export function canModifyAdminAccount(
  actor: SessionUser,
  targetUser: { id: string; role: string }
): PermissionCheckResult {
  if (actor.role !== 'MAIN_ADMIN') {
    return {
      allowed: false,
      statusCode: 403,
      message: 'Forbidden: Assistant Admins are strictly prohibited from modifying administrator accounts.',
    };
  }

  // Prevent Main Admin from deleting or disabling their own account
  if (targetUser.role === 'MAIN_ADMIN' && targetUser.id === actor.id) {
    return {
      allowed: false,
      statusCode: 400,
      message: 'Invalid operation: Main Administrator account cannot disable or delete itself.',
    };
  }

  return { allowed: true };
}

/**
 * Enforces Record Viewing Rules (for Student, Teacher, and content records):
 * - Main Admin has global authority to view any record.
 * - Assistant Admin can only view records they personally created.
 */
export function canViewRecord(
  actor: SessionUser,
  recordOwnerId: string
): PermissionCheckResult {
  const authCheck = requireAuth(actor);
  if (!authCheck.allowed) return authCheck;

  // Main Admin has global override
  if (actor.role === 'MAIN_ADMIN') {
    return { allowed: true };
  }

  // Assistant Admin: must be the creator of the record
  if (actor.role === 'ASSISTANT_ADMIN') {
    if (actor.id === recordOwnerId) {
      return { allowed: true };
    }
    return {
      allowed: false,
      statusCode: 403,
      message: 'Forbidden: Assistant Admins may only view records they personally created.',
    };
  }

  return {
    allowed: false,
    statusCode: 403,
    message: 'Forbidden: Unauthorized role.',
  };
}

/**
 * Enforces Record Ownership Rules (for Student, Teacher, and content records):
 * - Main Admin has global authority to edit or delete any record.
 * - Assistant Admin can only edit or delete records they personally created.
 */
export function canModifyRecord(
  actor: SessionUser,
  recordOwnerId: string
): PermissionCheckResult {
  const authCheck = requireAuth(actor);
  if (!authCheck.allowed) return authCheck;

  // Main Admin has global override
  if (actor.role === 'MAIN_ADMIN') {
    return { allowed: true };
  }

  // Assistant Admin: must be the creator of the record
  if (actor.role === 'ASSISTANT_ADMIN') {
    if (actor.id === recordOwnerId) {
      return { allowed: true };
    }
    return {
      allowed: false,
      statusCode: 403,
      message: 'Forbidden: Assistant Admins may only modify or delete records they personally created.',
    };
  }

  return {
    allowed: false,
    statusCode: 403,
    message: 'Forbidden: Unauthorized role.',
  };
}
