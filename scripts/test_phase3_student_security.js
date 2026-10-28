/**
 * Phase 3 Student Management Security, Authorization & RBAC Automated Test Suite
 * Nurul Amin Degree College Portal
 *
 * Verifies all Phase 3 constraints:
 * 1. Unauthenticated read/create/update/delete requests denied (401)
 * 2. Main Admin can create, view, edit, and delete student records
 * 3. Assistant Admin A can create, edit, and delete their own records
 * 4. Assistant Admin B CANNOT view, edit, or delete Assistant Admin A's records (403)
 * 5. Client-supplied createdById cannot impersonate another administrator
 * 6. Conflicting duplicate roll numbers in the same class, group & section are rejected (400)
 * 7. Invalid inputs are rejected with descriptive validation errors (400)
 * 8. Deactivated administrator accounts are denied access (401)
 * 9. Search and filtering return exact matching records
 * 10. Mass-assignment protection for record ownership and timestamps
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { SignJWT } = require('jose');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  if (process.loadEnvFile) {
    process.loadEnvFile(envPath);
  } else {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

const prisma = new PrismaClient();
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'nadc-default-dev-secret-change-in-prod-at-least-32-chars'
);

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

async function createJWT(user) {
  return new SignJWT({
    userId: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    sessionId: 'test-session-' + Date.now(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET_KEY);
}

const TEST_USERNAMES = [
  'phase3_test_main_admin',
  'phase3_test_asst_a',
  'phase3_test_asst_b',
  'phase3_test_deactivated_admin',
];

async function cleanupTestData() {
  try {
    const testUsers = await prisma.user.findMany({
      where: { username: { in: TEST_USERNAMES } },
      select: { id: true },
    });
    const userIds = testUsers.map((u) => u.id);
    if (userIds.length > 0) {
      await prisma.student.deleteMany({
        where: { createdById: { in: userIds } },
      });
      await prisma.user.deleteMany({
        where: { id: { in: userIds } },
      });
    }
    // Also remove any test students created with roll prefix 'SYNTH-'
    await prisma.student.deleteMany({
      where: { roll: { startsWith: 'SYNTH-' } },
    });
  } catch (err) {
    // ignore
  }
}

async function runStudentSecurityTests() {
  console.log('\n=============================================================');
  console.log(' Phase 3: Student Management Security & RBAC Suite');
  console.log('=============================================================\n');

  try {
    await cleanupTestData();

    // Setup Test Actors
    const passwordHash = await bcrypt.hash('TestSecurityPass123!', 12);

    const mainAdmin = await prisma.user.create({
      data: {
        name: 'Phase3 Main Admin',
        username: 'phase3_test_main_admin',
        email: 'main@phase3test.local',
        passwordHash,
        role: 'MAIN_ADMIN',
        isActive: true,
      },
    });

    const asstAdminA = await prisma.user.create({
      data: {
        name: 'Phase3 Assistant Admin A',
        username: 'phase3_test_asst_a',
        email: 'assta@phase3test.local',
        passwordHash,
        role: 'ASSISTANT_ADMIN',
        isActive: true,
      },
    });

    const asstAdminB = await prisma.user.create({
      data: {
        name: 'Phase3 Assistant Admin B',
        username: 'phase3_test_asst_b',
        email: 'asstb@phase3test.local',
        passwordHash,
        role: 'ASSISTANT_ADMIN',
        isActive: true,
      },
    });

    const deactivatedAdmin = await prisma.user.create({
      data: {
        name: 'Phase3 Deactivated Admin',
        username: 'phase3_test_deactivated_admin',
        email: 'deact@phase3test.local',
        passwordHash,
        role: 'ASSISTANT_ADMIN',
        isActive: false,
      },
    });

    // Generate JWT tokens
    const mainToken = await createJWT(mainAdmin);
    const asstAToken = await createJWT(asstAdminA);
    const asstBToken = await createJWT(asstAdminB);
    const deactToken = await createJWT(deactivatedAdmin);

    const baseUrl = 'http://localhost:3000';

    // -------------------------------------------------------------------------
    // TEST 1: Unauthenticated Requests Denied (401)
    // -------------------------------------------------------------------------
    console.log('[1/10] Testing Unauthenticated Access Rejection...');
    const rUnauthGet = await fetch(`${baseUrl}/api/admin/students`);
    assert(rUnauthGet.status === 401, 'Unauthenticated GET /api/admin/students returns 401');

    const rUnauthPost = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Synthetic Student' }),
    });
    assert(rUnauthPost.status === 401, 'Unauthenticated POST /api/admin/students returns 401');

    const rUnauthPut = await fetch(`${baseUrl}/api/admin/students/non-existent-id`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Synthetic Student' }),
    });
    assert(rUnauthPut.status === 401, 'Unauthenticated PUT /api/admin/students/:id returns 401');

    const rUnauthDelete = await fetch(`${baseUrl}/api/admin/students/non-existent-id`, {
      method: 'DELETE',
    });
    assert(rUnauthDelete.status === 401, 'Unauthenticated DELETE /api/admin/students/:id returns 401');

    // -------------------------------------------------------------------------
    // TEST 2: Main Admin Full Authority
    // -------------------------------------------------------------------------
    console.log('\n[2/10] Testing Main Admin Full Authority...');
    const mainStudentData = {
      name: 'Main Admin Synthetic Student',
      studentClass: 'HSC 1st Year (একাদশ শ্রেণি)',
      roll: 'SYNTH-101',
      group: 'Science (বিজ্ঞান)',
      section: 'A',
      personalPhone: '01711000001',
      personalEmail: 'synth101@example.com',
      guardianName: 'Guardian Alpha',
      guardianRelationship: 'Father',
      guardianPhone: '01711000002',
      guardianEmail: 'alpha.g@example.com',
      homeAddress: 'Umedpur, Shibchar, Madaripur',
    };

    const rMainCreate = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${mainToken}`,
      },
      body: JSON.stringify(mainStudentData),
    });
    const mainCreated = await rMainCreate.json();
    assert(rMainCreate.status === 201 && mainCreated.student?.id, 'Main Admin successfully creates student record');

    const mainStudentId = mainCreated.student.id;

    // View record
    const rMainView = await fetch(`${baseUrl}/api/admin/students/${mainStudentId}`, {
      headers: { Cookie: `nadc_admin_session=${mainToken}` },
    });
    assert(rMainView.status === 200, 'Main Admin successfully views student record');

    // Edit record
    const rMainEdit = await fetch(`${baseUrl}/api/admin/students/${mainStudentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${mainToken}`,
      },
      body: JSON.stringify({
        ...mainStudentData,
        name: 'Main Admin Synthetic Student (Updated)',
      }),
    });
    const mainUpdated = await rMainEdit.json();
    assert(
      rMainEdit.status === 200 && mainUpdated.student?.name === 'Main Admin Synthetic Student (Updated)',
      'Main Admin successfully updates student record'
    );

    // Delete record
    const rMainDelete = await fetch(`${baseUrl}/api/admin/students/${mainStudentId}`, {
      method: 'DELETE',
      headers: { Cookie: `nadc_admin_session=${mainToken}` },
    });
    assert(rMainDelete.status === 200, 'Main Admin successfully deletes student record');

    // -------------------------------------------------------------------------
    // TEST 3: Assistant Admin A Can Manage Own Record
    // -------------------------------------------------------------------------
    console.log('\n[3/10] Testing Assistant Admin A Own Record Authority...');
    const asstAStudentData = {
      name: 'Assistant A Synthetic Student',
      studentClass: 'HSC 2nd Year (দ্বাদশ শ্রেণি)',
      roll: 'SYNTH-201',
      group: 'Humanities (মানবিক)',
      section: 'B',
      personalPhone: '01811000001',
      personalEmail: 'synth201@example.com',
      guardianName: 'Guardian Beta',
      guardianRelationship: 'Mother',
      guardianPhone: '01811000002',
      guardianEmail: 'beta.g@example.com',
      homeAddress: 'Shibchar Sadar, Madaripur',
    };

    const rAsstACreate = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify(asstAStudentData),
    });
    const asstACreated = await rAsstACreate.json();
    assert(rAsstACreate.status === 201 && asstACreated.student?.id, 'Assistant Admin A creates student record');
    const asstAStudentId = asstACreated.student.id;
    assert(
      asstACreated.student.createdById === asstAdminA.id,
      'Record server-stored createdById matches Assistant Admin A ID'
    );

    // Assistant A edits own record
    const rAsstAEdit = await fetch(`${baseUrl}/api/admin/students/${asstAStudentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify({
        ...asstAStudentData,
        name: 'Assistant A Synthetic Student (Edited)',
      }),
    });
    assert(rAsstAEdit.status === 200, 'Assistant Admin A successfully edits own student record');

    // -------------------------------------------------------------------------
    // TEST 4: Assistant Admin B Forbidden from Assistant Admin A Record (403)
    // -------------------------------------------------------------------------
    console.log('\n[4/10] Testing Assistant Admin B Peer Isolation (403 Forbidden)...');
    const rAsstBView = await fetch(`${baseUrl}/api/admin/students/${asstAStudentId}`, {
      headers: { Cookie: `nadc_admin_session=${asstBToken}` },
    });
    assert(rAsstBView.status === 403, 'Assistant Admin B denied viewing Assistant Admin A record (403 Forbidden)');

    const rAsstBEdit = await fetch(`${baseUrl}/api/admin/students/${asstAStudentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstBToken}`,
      },
      body: JSON.stringify({
        ...asstAStudentData,
        name: 'Malicious Hijacked Name',
      }),
    });
    assert(rAsstBEdit.status === 403, 'Assistant Admin B denied editing Assistant Admin A record (403 Forbidden)');

    const rAsstBDelete = await fetch(`${baseUrl}/api/admin/students/${asstAStudentId}`, {
      method: 'DELETE',
      headers: { Cookie: `nadc_admin_session=${asstBToken}` },
    });
    assert(rAsstBDelete.status === 403, 'Assistant Admin B denied deleting Assistant Admin A record (403 Forbidden)');

    // Verify record was NOT modified
    const dbStudentCheck = await prisma.student.findUnique({ where: { id: asstAStudentId } });
    assert(
      dbStudentCheck?.name === 'Assistant A Synthetic Student (Edited)',
      'Record intact: unauthorized modifications strictly prevented'
    );

    // -------------------------------------------------------------------------
    // TEST 5: Impersonation Prevention (Client-supplied createdById)
    // -------------------------------------------------------------------------
    console.log('\n[5/10] Testing Impersonation Guard (Client createdById Overwrite)...');
    const spoofAttempt = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify({
        name: 'Spoof Test Student',
        studentClass: 'HSC 1st Year (একাদশ শ্রেণি)',
        roll: 'SYNTH-SPOOF-1',
        group: 'Business Studies (ব্যবসায় শিক্ষা)',
        section: 'A',
        guardianName: 'Guardian Spoof',
        guardianRelationship: 'Father',
        homeAddress: 'Test Location, Madaripur',
        createdById: mainAdmin.id, // Malicious spoof attempt
      }),
    });
    const spoofResult = await spoofAttempt.json();
    assert(
      spoofResult.student?.createdById === asstAdminA.id && spoofResult.student?.createdById !== mainAdmin.id,
      'Server strictly binds record to authenticated session user ID and rejects client spoofing'
    );

    // -------------------------------------------------------------------------
    // TEST 6: Roll Number Duplicate & Conflict Checks
    // -------------------------------------------------------------------------
    console.log('\n[6/10] Testing Duplicate Roll Number Rejection...');
    // Attempt duplicate roll in same class, group, and section
    const dupAttempt = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify({
        name: 'Conflicting Student',
        studentClass: 'HSC 2nd Year (দ্বাদশ শ্রেণি)',
        roll: 'SYNTH-201', // Same roll as asstAStudent
        group: 'Humanities (মানবিক)', // Same group
        section: 'B', // Same section
        guardianName: 'Guardian Other',
        guardianRelationship: 'Father',
        homeAddress: 'Another Address, Shibchar',
      }),
    });
    assert(
      dupAttempt.status === 400,
      'Duplicate roll within same class, group, and section rejected with 400 Bad Request'
    );

    // Allowed roll when in different section
    const diffSectionAttempt = await fetch(`${baseUrl}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify({
        name: 'Section C Student',
        studentClass: 'HSC 2nd Year (দ্বাদশ শ্রেণি)',
        roll: 'SYNTH-201', // Same roll
        group: 'Humanities (মানবিক)',
        section: 'C', // Different section
        guardianName: 'Guardian Other C',
        guardianRelationship: 'Mother',
        homeAddress: 'Another Address, Shibchar',
      }),
    });
    assert(
      diffSectionAttempt.status === 201,
      'Same roll permitted across distinct sections (Section C vs Section B)'
    );

    // -------------------------------------------------------------------------
    // TEST 7: Input Validation & Sanitization
    // -------------------------------------------------------------------------
    console.log('\n[7/10] Testing Server Input Validation & Bad Input Rejection...');
    const badInputs = [
      { payload: {}, field: 'all missing' },
      { payload: { name: 'A', studentClass: 'HSC', roll: '1', group: 'Sci', guardianName: 'G', guardianRelationship: 'Father', homeAddress: 'Addr' }, field: 'name too short' },
      { payload: { name: 'Valid Name', studentClass: 'HSC', roll: '1', group: 'Sci', guardianName: 'G', guardianRelationship: 'Uncle', homeAddress: 'Addr' }, field: 'invalid relationship' },
      { payload: { name: 'Valid Name', studentClass: 'HSC', roll: '1', group: 'Sci', guardianName: 'G', guardianRelationship: 'Father', homeAddress: 'Addr', personalPhone: '123' }, field: 'invalid phone' },
      { payload: { name: 'Valid Name', studentClass: 'HSC', roll: '1', group: 'Sci', guardianName: 'G', guardianRelationship: 'Father', homeAddress: 'Addr', personalEmail: 'not-an-email' }, field: 'invalid email' },
    ];

    let allBadRejected = true;
    for (const testCase of badInputs) {
      const res = await fetch(`${baseUrl}/api/admin/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `nadc_admin_session=${mainToken}`,
        },
        body: JSON.stringify(testCase.payload),
      });
      if (res.status !== 400) {
        allBadRejected = false;
        console.error(`  ✘ Bad input was not rejected for case: ${testCase.field}`);
      }
    }
    assert(allBadRejected, 'All invalid payloads rejected with 400 Bad Request');

    // -------------------------------------------------------------------------
    // TEST 8: Deactivated Account Access Denial
    // -------------------------------------------------------------------------
    console.log('\n[8/10] Testing Deactivated Administrator Access Denial...');
    const rDeact = await fetch(`${baseUrl}/api/admin/students`, {
      headers: { Cookie: `nadc_admin_session=${deactToken}` },
    });
    assert(rDeact.status === 401, 'Deactivated administrator request rejected (401 Unauthorized)');

    // -------------------------------------------------------------------------
    // TEST 9: Search & Filter Isolation
    // -------------------------------------------------------------------------
    console.log('\n[9/10] Testing Search and Filter Logic...');
    // Assistant A listing (should only see records created by A)
    const rListAsstA = await fetch(`${baseUrl}/api/admin/students`, {
      headers: { Cookie: `nadc_admin_session=${asstAToken}` },
    });
    const asstAList = await rListAsstA.json();
    const allBelongToA = asstAList.students.every((s) => s.createdById === asstAdminA.id);
    assert(
      rListAsstA.status === 200 && allBelongToA,
      'Assistant Admin A list returns strictly records created by Assistant A'
    );

    // Assistant B listing (should see 0 records because B created none)
    const rListAsstB = await fetch(`${baseUrl}/api/admin/students`, {
      headers: { Cookie: `nadc_admin_session=${asstBToken}` },
    });
    const asstBList = await rListAsstB.json();
    assert(
      rListAsstB.status === 200 && asstBList.students.length === 0,
      'Assistant Admin B sees 0 records in list query (zero leakage from Assistant A)'
    );

    // Main Admin listing with search
    const rSearch = await fetch(`${baseUrl}/api/admin/students?search=SYNTH-201`, {
      headers: { Cookie: `nadc_admin_session=${mainToken}` },
    });
    const searchResult = await rSearch.json();
    assert(
      rSearch.status === 200 && searchResult.students.length > 0,
      'Search query for "SYNTH-201" returns matching synthetic records'
    );

    // Filter by class
    const rFilterClass = await fetch(
      `${baseUrl}/api/admin/students?studentClass=${encodeURIComponent('HSC 2nd Year (দ্বাদশ শ্রেণি)')}`,
      { headers: { Cookie: `nadc_admin_session=${mainToken}` } }
    );
    const filterClassResult = await rFilterClass.json();
    const allMatchClass = filterClassResult.students.every(
      (s) => s.studentClass === 'HSC 2nd Year (দ্বাদশ শ্রেণি)'
    );
    assert(allMatchClass && filterClassResult.students.length > 0, 'Class filter returns strictly matching class records');

    // -------------------------------------------------------------------------
    // TEST 10: Mass-Assignment Protection
    // -------------------------------------------------------------------------
    console.log('\n[10/10] Testing Mass-Assignment & Ownership Mutation Protection...');
    const originalStudent = await prisma.student.findUnique({ where: { id: asstAStudentId } });
    const originalCreatedById = originalStudent.createdById;
    const originalCreatedAt = originalStudent.createdAt;

    // Malicious attempt to change createdById and createdAt
    const rMassAssign = await fetch(`${baseUrl}/api/admin/students/${asstAStudentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `nadc_admin_session=${asstAToken}`,
      },
      body: JSON.stringify({
        name: 'Protection Check Name',
        studentClass: originalStudent.studentClass,
        roll: originalStudent.roll,
        group: originalStudent.group,
        section: originalStudent.section,
        guardianName: originalStudent.guardianName,
        guardianRelationship: originalStudent.guardianRelationship,
        homeAddress: originalStudent.homeAddress,
        createdById: mainAdmin.id, // Mass-assignment attempt
        createdAt: '1970-01-01T00:00:00.000Z', // Mass-assignment attempt
      }),
    });

    const checkStudentAfter = await prisma.student.findUnique({ where: { id: asstAStudentId } });
    assert(
      checkStudentAfter.createdById === originalCreatedById,
      'Protected field "createdById" cannot be modified via PUT endpoint'
    );
    assert(
      checkStudentAfter.createdAt.getTime() === originalCreatedAt.getTime(),
      'Protected field "createdAt" cannot be modified via PUT endpoint'
    );

    // Clean up
    await cleanupTestData();

    console.log('\n=============================================================');
    console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED across 10 security suites.`);
    console.log('=============================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    await cleanupTestData();
    await prisma.$disconnect();
  }
}

runStudentSecurityTests();
