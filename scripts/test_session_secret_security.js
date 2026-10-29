/**
 * Automated Security Test Suite: Session Secret Enforcement & Validation
 * Nurul Amin Degree College Portal
 *
 * Verifies that:
 * 1. SESSION_SECRET is strictly mandatory in production.
 * 2. Missing, empty, or whitespace secrets in production fail safely.
 * 3. Secrets shorter than 32 characters in production fail safely.
 * 4. Known development/example placeholders in production fail safely.
 * 5. Valid 32+ character secrets in production pass and generate valid keys.
 * 6. Local development safely falls back to development secret when unset.
 * 7. Explicitly invalid short secrets in development are rejected.
 * 8. Real JWT signing and verification works end-to-end with valid secrets.
 * 9. Tampered/cross-secret tokens are rejected.
 * 10. Secrets are never exposed in error messages, logs, or client bundles.
 */

// If running in Node without 'react-server' condition, re-spawn with --conditions=react-server
// to satisfy the official 'server-only' package export map.
if (!process.execArgv.some((arg) => arg.includes('react-server'))) {
  const { spawnSync } = require('child_process');
  const result = spawnSync(
    process.execPath,
    ['--conditions=react-server', __filename, ...process.argv.slice(2)],
    { stdio: 'inherit', env: process.env }
  );
  process.exit(result.status !== null ? result.status : 0);
}

const fs = require('fs');
const path = require('path');
const { SignJWT, jwtVerify } = require('jose');

const ROOT_DIR = path.resolve(__dirname, '..');

// Import session secret logic
const sessionSecretModulePath = path.join(ROOT_DIR, 'src', 'lib', 'session-secret.ts');
let sessionSecretModule;
try {
  sessionSecretModule = require(sessionSecretModulePath);
} catch (e) {
  console.error('Failed to load session-secret module:', e);
  process.exit(1);
}

const {
  MIN_SESSION_SECRET_LENGTH,
  DEV_FALLBACK_SECRET,
  INSECURE_PLACEHOLDER_SECRETS,
  getValidatedSessionSecret,
  getSecretKey,
} = sessionSecretModule;

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✘ FAILED: ${message}`);
    failed++;
  }
}

function assertThrows(fn, expectedSubstring, message) {
  try {
    fn();
    console.error(`  ✘ FAILED (Did not throw): ${message}`);
    failed++;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (!expectedSubstring || errorMsg.includes(expectedSubstring)) {
      console.log(`  ✓ ${message} [Error: ${errorMsg.slice(0, 70)}...]`);
      passed++;
    } else {
      console.error(`  ✘ FAILED (Wrong error message): Expected "${expectedSubstring}", got "${errorMsg}"`);
      failed++;
    }
  }
}

async function runTests() {
  console.log('--- Starting Session Secret Security Test Suite ---');

  // ---------------------------------------------------------------------------
  // 1. Production Mode: Missing / Empty Secrets
  // ---------------------------------------------------------------------------
  console.log('\n[1/5] Testing Production Environment Strict Requirement...');

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: undefined }),
    'CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET is required',
    'Rejects missing SESSION_SECRET in production'
  );

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: '' }),
    'CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET is required',
    'Rejects empty string SESSION_SECRET in production'
  );

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: '    ' }),
    'CRITICAL SECURITY CONFIGURATION ERROR: SESSION_SECRET is required',
    'Rejects whitespace-only SESSION_SECRET in production'
  );

  // ---------------------------------------------------------------------------
  // 2. Production Mode: Invalid Length & Placeholder Secrets
  // ---------------------------------------------------------------------------
  console.log('\n[2/5] Testing Production Secret Strength & Placeholder Rejection...');

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: 'too-short-secret-16' }),
    `must be at least ${MIN_SESSION_SECRET_LENGTH} characters long in production`,
    'Rejects secrets shorter than 32 characters in production'
  );

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: DEV_FALLBACK_SECRET }),
    'cannot use a known development or example placeholder',
    'Rejects default development fallback secret in production'
  );

  assertThrows(
    () =>
      getValidatedSessionSecret({
        NODE_ENV: 'production',
        SESSION_SECRET: 'change-this-to-a-secure-random-32-char-secret-in-production',
      }),
    'cannot use a known development or example placeholder',
    'Rejects .env.example template placeholder secret in production'
  );

  // ---------------------------------------------------------------------------
  // 3. Production Mode: Valid High-Entropy Secret
  // ---------------------------------------------------------------------------
  console.log('\n[3/5] Testing Production Valid High-Entropy Secret...');

  const validProductionSecret = 'c7e84920b6d19485e927cfa02410a8e945cba8971234567890abcdef12345678';
  let retrievedSecret = '';
  try {
    retrievedSecret = getValidatedSessionSecret({
      NODE_ENV: 'production',
      SESSION_SECRET: validProductionSecret,
    });
    assert(retrievedSecret === validProductionSecret, 'Valid production secret retrieved successfully');
  } catch (err) {
    console.error('Unexpected throw on valid production secret:', err);
    failed++;
  }

  const key = getSecretKey({ NODE_ENV: 'production', SESSION_SECRET: validProductionSecret });
  assert(key instanceof Uint8Array, 'getSecretKey returns a valid Uint8Array key');
  assert(key.length === 64, 'Uint8Array key length matches 64 bytes');

  // ---------------------------------------------------------------------------
  // 4. Non-Production Mode: Development Fallback & Validation
  // ---------------------------------------------------------------------------
  console.log('\n[4/5] Testing Local Development Mode Fallback & Controls...');

  const devFallback = getValidatedSessionSecret({ NODE_ENV: 'development', SESSION_SECRET: undefined });
  assert(
    devFallback === DEV_FALLBACK_SECRET,
    'Safely falls back to default dev secret in development when unset'
  );

  const customDevSecret = 'my-custom-local-development-secret-32-chars-long';
  const devCustom = getValidatedSessionSecret({ NODE_ENV: 'development', SESSION_SECRET: customDevSecret });
  assert(
    devCustom === customDevSecret,
    'Uses custom SESSION_SECRET in development when provided'
  );

  assertThrows(
    () => getValidatedSessionSecret({ NODE_ENV: 'development', SESSION_SECRET: 'short-dev-secret' }),
    `SESSION_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters long`,
    'Rejects explicitly configured short secret in development'
  );

  // ---------------------------------------------------------------------------
  // 5. End-to-End JWT Signing, Verification & Secret Privacy
  // ---------------------------------------------------------------------------
  console.log('\n[5/5] Testing End-to-End JWT Signature & Secret Privacy...');

  const signingKey = getSecretKey({ NODE_ENV: 'production', SESSION_SECRET: validProductionSecret });
  const payload = { userId: 'test-admin-id', role: 'MAIN_ADMIN' };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(signingKey);

  assert(typeof token === 'string' && token.split('.').length === 3, 'JWT successfully created and signed');

  const { payload: verifiedPayload } = await jwtVerify(token, signingKey);
  assert(verifiedPayload.userId === 'test-admin-id', 'JWT successfully verified with correct secret key');

  // Test token rejection with wrong secret
  const differentSecret = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  const wrongKey = getSecretKey({ NODE_ENV: 'production', SESSION_SECRET: differentSecret });
  let rejected = false;
  try {
    await jwtVerify(token, wrongKey);
  } catch {
    rejected = true;
  }
  assert(rejected, 'JWT correctly rejected when verified with a different secret');

  // Verify secret privacy: Check error messages for leaks
  try {
    getValidatedSessionSecret({ NODE_ENV: 'production', SESSION_SECRET: 'super-secret-password-123' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    assert(
      !msg.includes('super-secret-password-123'),
      'Secret value is never echoed or leaked in validation error messages'
    );
  }

  // Verify server-only presence in auth modules
  const authSource = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'auth.ts'), 'utf8');
  const secretSource = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'session-secret.ts'), 'utf8');
  assert(
    authSource.includes("import 'server-only';") || authSource.includes('import "server-only";'),
    'src/lib/auth.ts contains server-only protection'
  );
  assert(
    secretSource.includes("import 'server-only';") || secretSource.includes('import "server-only";'),
    'src/lib/session-secret.ts contains server-only protection'
  );

  // Verify no NEXT_PUBLIC_ exposure of session secrets in src/
  function checkDirForPublicSecrets(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      const full = path.join(dir, f.name);
      if (f.isDirectory()) {
        checkDirForPublicSecrets(full);
      } else if (/\.(ts|tsx|js|jsx)$/.test(f.name)) {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes('NEXT_PUBLIC_SESSION_SECRET')) {
          throw new Error(`Found NEXT_PUBLIC_SESSION_SECRET in ${full}`);
        }
      }
    }
  }
  let leakFound = false;
  try {
    checkDirForPublicSecrets(path.join(ROOT_DIR, 'src'));
  } catch {
    leakFound = true;
  }
  assert(!leakFound, 'Zero occurrences of NEXT_PUBLIC_SESSION_SECRET in src/');

  console.log('\n=============================================');
  console.log(`SESSION SECRET TESTS: ${passed} passed, ${failed} failed.`);
  console.log('=============================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
