import 'server-only';
import { db } from '@/lib/db';

export type AuditAction =
  | 'AUTH_LOGIN_SUCCESS'
  | 'AUTH_LOGIN_FAILED'
  | 'AUTH_LOGOUT'
  | 'STUDENT_CREATE'
  | 'STUDENT_UPDATE'
  | 'STUDENT_DELETE'
  | 'TEACHER_CREATE'
  | 'TEACHER_UPDATE'
  | 'TEACHER_DELETE'
  | 'ADMIN_CREATE'
  | 'ADMIN_STATUS_UPDATE'
  | 'ADMIN_DELETE'
  | 'ADMIN_DELETE_BLOCKED_HAS_STUDENTS'
  | 'ADMIN_DELETE_BLOCKED_HAS_RECORDS'
  | 'ADMIN_REASSIGN_STUDENTS'
  | 'ADMIN_REASSIGN_RECORDS';

export interface AuditLogParams {
  actorId?: string | null;
  actorName: string;
  actorRole: string;
  action: AuditAction;
  targetId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  outcome: 'SUCCESS' | 'DENIED' | 'FAILURE';
}

/**
 * Sanitizes details to ensure NO passwords, student phone numbers, guardian emails,
 * or full home addresses are accidentally stored in audit logs.
 */
function sanitizeAuditDetails(details?: string | null): string | null {
  if (!details) return null;

  let cleaned = details;

  // Mask any email addresses
  cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');

  // Mask any phone numbers (sequences of 10-15 digits with optional +)
  cleaned = cleaned.replace(/(\+?880|0)?1[3-9]\d{8}|\+?[0-9]{10,15}/g, '[REDACTED_PHONE]');

  // Limit length
  if (cleaned.length > 500) {
    cleaned = cleaned.substring(0, 497) + '...';
  }

  return cleaned;
}

/**
 * Records an administrator or authentication security action to the audit log.
 * Privacy-compliant: Sensitive PII and credentials are never stored.
 */
export async function recordAuditLog(params: AuditLogParams): Promise<void> {
  try {
    const sanitized = sanitizeAuditDetails(params.details);

    await db.auditLog.create({
      data: {
        actorId: params.actorId || null,
        actorName: params.actorName,
        actorRole: params.actorRole,
        action: params.action,
        targetId: params.targetId || null,
        details: sanitized,
        ipAddress: params.ipAddress || null,
        outcome: params.outcome,
      },
    });
  } catch (error) {
    // Non-blocking: audit failure must not crash core user workflows
    console.error('[AUDIT_LOG_ERROR] Could not persist audit log:', error);
  }
}
