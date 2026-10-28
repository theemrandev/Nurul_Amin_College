import { NextRequest } from 'next/server';

/**
 * Origin & Cross-Site Request Verification (CSRF Defense)
 * Nurul Amin Degree College Administration Portal
 *
 * Verifies that state-changing requests (POST, PUT, PATCH, DELETE) originate
 * from the trusted college application domain and not a third-party cross-site attacker.
 */
export function validateOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  const method = req.method.toUpperCase();

  // Safe HTTP methods do not mutate state
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return { valid: true };
  }

  const hostHeader = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const originHeader = req.headers.get('origin');
  const refererHeader = req.headers.get('referer');
  const secFetchSite = req.headers.get('sec-fetch-site');

  // Configured extra origins (e.g. custom staging or aliases)
  const configuredOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim().toLowerCase())
    : [];

  const isProduction = process.env.NODE_ENV === 'production';

  // 1. If Origin header is provided, validate strictly
  if (originHeader) {
    try {
      const parsedOrigin = new URL(originHeader);
      const originHost = parsedOrigin.host.toLowerCase();
      const originHostname = parsedOrigin.hostname.toLowerCase();

      // Same-host match
      if (hostHeader && originHost === hostHeader.toLowerCase()) {
        return { valid: true };
      }

      // Explicit configured origins
      if (configuredOrigins.includes(originHeader.toLowerCase())) {
        return { valid: true };
      }

      // Localhost / Loopback allowance in development
      if (!isProduction && (originHostname === 'localhost' || originHostname === '127.0.0.1')) {
        return { valid: true };
      }

      return {
        valid: false,
        reason: `Cross-origin request rejected: Origin '${originHeader}' is not permitted.`,
      };
    } catch {
      return { valid: false, reason: 'Malformed Origin header.' };
    }
  }

  // 2. If Origin is omitted, inspect Referer header
  if (refererHeader) {
    try {
      const parsedReferer = new URL(refererHeader);
      const refererHost = parsedReferer.host.toLowerCase();
      const refererHostname = parsedReferer.hostname.toLowerCase();

      if (hostHeader && refererHost === hostHeader.toLowerCase()) {
        return { valid: true };
      }

      if (configuredOrigins.some((o) => refererHeader.toLowerCase().startsWith(o))) {
        return { valid: true };
      }

      if (!isProduction && (refererHostname === 'localhost' || refererHostname === '127.0.0.1')) {
        return { valid: true };
      }

      return {
        valid: false,
        reason: `Cross-origin request rejected: Referer '${refererHeader}' does not match host.`,
      };
    } catch {
      return { valid: false, reason: 'Malformed Referer header.' };
    }
  }

  // 3. Neither Origin nor Referer provided:
  // Browser Sec-Fetch-Site guard
  if (secFetchSite === 'cross-site') {
    return { valid: false, reason: 'Cross-site request blocked by Sec-Fetch-Site policy.' };
  }

  // In production, browser state-changing requests MUST supply Origin or Referer
  if (isProduction && (secFetchSite || req.headers.get('user-agent'))) {
    return {
      valid: false,
      reason: 'State-changing requests in production require a verified Origin or Referer header.',
    };
  }

  // Local development / internal test scripts without browser origin header
  return { valid: true };
}
