/**
 * Phase 4: Teacher Management Security, RBAC & Functionality Test Suite
 * Nurul Amin Degree College Portal
 */

const BASE_URL = 'http://localhost:3000';
let passedCount = 0;
let failedCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failedCount++;
  }
}

async function runTests() {
  console.log('\n============================================================');
  console.log('🧪 RUNNING PHASE 4: TEACHER MANAGEMENT COMPREHENSIVE TESTS');
  console.log('============================================================\n');

  let mainAdminCookie = '';
  let asstACookie = '';
  let asstBCookie = '';
  let asstAId = '';
  let asstBId = '';
  let mainAdminId = '';
  let teacher1Id = '';
  let teacher2Id = '';

  // ------------------------------------------------------------------
  // 1. Unauthenticated / Public Visitor Access Restrictions
  // ------------------------------------------------------------------
  console.log('--- Test 1: Unauthenticated & Public API Restrictions ---');
  {
    const resGet = await fetch(`${BASE_URL}/api/admin/teachers`);
    assert(resGet.status === 401, 'GET /api/admin/teachers without session returns 401 Unauthorized');

    const resPost = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Origin': BASE_URL },
      body: JSON.stringify({ nameBn: 'টেস্ট', nameEn: 'Test' }),
    });
    assert(resPost.status === 401, 'POST /api/admin/teachers without session returns 401 Unauthorized');

    const resPut = await fetch(`${BASE_URL}/api/admin/teachers/fake-uuid-1234`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Origin': BASE_URL },
      body: JSON.stringify({ nameBn: 'টেস্ট' }),
    });
    assert(resPut.status === 401, 'PUT /api/admin/teachers/[id] without session returns 401 Unauthorized');

    const resDel = await fetch(`${BASE_URL}/api/admin/teachers/fake-uuid-1234`, {
      method: 'DELETE',
      headers: { 'Origin': BASE_URL },
    });
    assert(resDel.status === 401, 'DELETE /api/admin/teachers/[id] without session returns 401 Unauthorized');
  }

  // ------------------------------------------------------------------
  // 2. Main Admin Login
  // ------------------------------------------------------------------
  console.log('\n--- Test 2: Main Admin Authentication ---');
  {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Origin': BASE_URL },
      body: JSON.stringify({ username: 'admin', password: 'CollegeAdmin2026!' }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.success, 'Main Admin login successful');
    const setCookie = loginRes.headers.get('set-cookie');
    assert(!!setCookie, 'Received session cookie for Main Admin');
    mainAdminCookie = setCookie.split(';')[0];
    mainAdminId = loginData.user.id;
  }

  // ------------------------------------------------------------------
  // 3. Origin Verification on Mutating Endpoints
  // ------------------------------------------------------------------
  console.log('\n--- Test 3: Origin Verification on Mutating Endpoints ---');
  {
    const badOriginRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': mainAdminCookie,
        'Origin': 'https://attacker-evil-website.com',
      },
      body: JSON.stringify({ nameBn: 'টেস্ট', nameEn: 'Test' }),
    });
    assert(badOriginRes.status === 403, 'Cross-origin POST /api/admin/teachers is rejected with 403 Forbidden');
  }

  // ------------------------------------------------------------------
  // 4. Server-Side Input Validation
  // ------------------------------------------------------------------
  console.log('\n--- Test 4: Server-Side Input Validation ---');
  {
    // Empty payload
    const emptyRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({}),
    });
    const emptyData = await emptyRes.json();
    assert(emptyRes.status === 400 && !!emptyData.details?.nameBn, 'Empty teacher payload rejected with validation details');

    // Invalid email
    const badEmailRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'মোঃ আনোয়ার হোসেন',
        nameEn: 'Md. Anwar Hossain',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
        rank: 'lecturer',
        email: 'not-an-email',
      }),
    });
    const badEmailData = await badEmailRes.json();
    assert(badEmailRes.status === 400 && !!badEmailData.details?.email, 'Invalid email format rejected with 400');

    // Invalid phone
    const badPhoneRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'মোঃ আনোয়ার হোসেন',
        nameEn: 'Md. Anwar Hossain',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
        rank: 'lecturer',
        phone: '12345',
      }),
    });
    const badPhoneData = await badPhoneRes.json();
    assert(badPhoneRes.status === 400 && !!badPhoneData.details?.phone, 'Invalid phone number rejected with 400');

    // Invalid rank
    const badRankRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'মোঃ আনোয়ার হোসেন',
        nameEn: 'Md. Anwar Hossain',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
        rank: 'invalid-rank-xyz',
      }),
    });
    const badRankData = await badRankRes.json();
    assert(badRankRes.status === 400 && !!badRankData.details?.rank, 'Invalid rank rejected with 400');
  }

  // ------------------------------------------------------------------
  // 5. Teacher Creation by Main Admin
  // ------------------------------------------------------------------
  console.log('\n--- Test 5: Teacher Creation by Main Admin ---');
  {
    const createRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'মোঃ আনিসুর রহমান',
        nameEn: 'Md. Anisur Rahman',
        designationBn: 'সহকারী অধ্যাপক',
        designationEn: 'Assistant Professor',
        departmentBn: 'অর্থনীতি',
        departmentEn: 'Economics',
        rank: 'assistant-professor',
        email: 'deb110882.anisur@gmail.com',
        phone: '01711223344',
        photoUrl: '/images/teachers/md-anisur-rahman.jpg',
        specialNote: 'বিভাগীয় প্রধান ও পরীক্ষা আহ্বায়ক',
        createdById: 'malicious-spoofed-owner', // Server must ignore this
      }),
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success, 'Main Admin successfully created Teacher 1');
    assert(createData.teacher.createdById === mainAdminId, 'Server strictly set createdById to Main Admin (ignored client spoofing)');
    teacher1Id = createData.teacher.id;
  }

  // ------------------------------------------------------------------
  // 6. Duplicate Prevention (Email & Name+Designation)
  // ------------------------------------------------------------------
  console.log('\n--- Test 6: Duplicate Prevention ---');
  {
    // Duplicate email
    const dupEmailRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'ভিন্ন শিক্ষক',
        nameEn: 'Different Teacher',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
        rank: 'lecturer',
        email: 'deb110882.anisur@gmail.com', // Duplicate email
      }),
    });
    const dupEmailData = await dupEmailRes.json();
    assert(dupEmailRes.status === 400 && dupEmailData.field === 'email', 'Duplicate email registration rejected with 400');

    // Duplicate Name + Designation
    const dupNameRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'মোঃ আনিসুর রহমান',
        nameEn: 'Md. Anisur Rahman',
        designationBn: 'সহকারী অধ্যাপক',
        designationEn: 'Assistant Professor',
        rank: 'assistant-professor',
      }),
    });
    const dupNameData = await dupNameRes.json();
    assert(dupNameRes.status === 400 && dupNameData.field === 'nameEn', 'Duplicate Name + Designation rejected with 400');
  }

  // ------------------------------------------------------------------
  // 7. Assistant Admin Setup & Creator Isolation
  // ------------------------------------------------------------------
  console.log('\n--- Test 7: Assistant Admin Setup & Creator Isolation ---');
  {
    // Create Assistant Admin A
    const resAsstA = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        name: 'Assistant Admin A',
        username: 'asst_teacher_a',
        email: 'asst.teacher.a@college.edu',
        password: 'Password123!',
        role: 'ASSISTANT_ADMIN',
      }),
    });
    const dataAsstA = await resAsstA.json();
    assert(resAsstA.status === 201 && dataAsstA.success, 'Created Assistant Admin A');
    asstAId = dataAsstA.user.id;

    // Create Assistant Admin B
    const resAsstB = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        name: 'Assistant Admin B',
        username: 'asst_teacher_b',
        email: 'asst.teacher.b@college.edu',
        password: 'Password123!',
        role: 'ASSISTANT_ADMIN',
      }),
    });
    const dataAsstB = await resAsstB.json();
    assert(resAsstB.status === 201 && dataAsstB.success, 'Created Assistant Admin B');
    asstBId = dataAsstB.user.id;

    // Login as Assistant Admin A
    const loginARes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Origin': BASE_URL },
      body: JSON.stringify({ username: 'asst_teacher_a', password: 'Password123!' }),
    });
    const loginAData = await loginARes.json();
    assert(loginARes.status === 200 && loginAData.success, 'Assistant Admin A logged in successfully');
    asstACookie = loginARes.headers.get('set-cookie').split(';')[0];

    // Login as Assistant Admin B
    const loginBRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Origin': BASE_URL },
      body: JSON.stringify({ username: 'asst_teacher_b', password: 'Password123!' }),
    });
    const loginBData = await loginBRes.json();
    assert(loginBRes.status === 200 && loginBData.success, 'Assistant Admin B logged in successfully');
    asstBCookie = loginBRes.headers.get('set-cookie').split(';')[0];
  }

  // ------------------------------------------------------------------
  // 8. Assistant Admin A creates Teacher 2
  // ------------------------------------------------------------------
  console.log('\n--- Test 8: Assistant Admin A creates Teacher 2 ---');
  {
    const createRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': asstACookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'ফারহানা ইয়াসমিন',
        nameEn: 'Farhana Yasmin',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
        departmentBn: 'ইংরেজি',
        departmentEn: 'English',
        rank: 'lecturer',
        email: 'deb110882.farhana@gmail.com',
        phone: '01811998877',
      }),
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success, 'Assistant Admin A created Teacher 2');
    assert(createData.teacher.createdById === asstAId, 'Teacher 2 bound to Assistant Admin A');
    teacher2Id = createData.teacher.id;
  }

  // ------------------------------------------------------------------
  // 9. Peer Isolation & Role-Based Access Enforcement
  // ------------------------------------------------------------------
  console.log('\n--- Test 9: Peer Isolation & RBAC Server Enforcement ---');
  {
    // Assistant Admin A list query: should only see their own teacher (Teacher 2), NOT Teacher 1
    const listARes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      headers: { 'Cookie': asstACookie },
    });
    const listAData = await listARes.json();
    assert(listARes.status === 200, 'Assistant Admin A can query teachers list');
    assert(listAData.count === 1 && listAData.teachers[0].id === teacher2Id, 'Assistant Admin A sees ONLY their own created record');

    // Assistant Admin B list query: sees 0 records
    const listBRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      headers: { 'Cookie': asstBCookie },
    });
    const listBData = await listBRes.json();
    assert(listBRes.status === 200 && listBData.count === 0, 'Assistant Admin B sees 0 records (isolated from peers & Main Admin)');

    // Assistant Admin B attempts to VIEW Teacher 2 (created by A)
    const viewBRes = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      headers: { 'Cookie': asstBCookie },
    });
    assert(viewBRes.status === 403, 'Assistant Admin B denied VIEW on peer record (403 Forbidden)');

    // Assistant Admin B attempts to EDIT Teacher 2
    const editBRes = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': asstBCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'ফারহানা হ্যাকড',
        nameEn: 'Farhana Hacked',
        designationBn: 'প্রভাষক',
        designationEn: 'Lecturer',
      }),
    });
    assert(editBRes.status === 403, 'Assistant Admin B denied EDIT on peer record (403 Forbidden)');

    // Assistant Admin B attempts to DELETE Teacher 2
    const delBRes = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      method: 'DELETE',
      headers: { 'Cookie': asstBCookie, 'Origin': BASE_URL },
    });
    assert(delBRes.status === 403, 'Assistant Admin B denied DELETE on peer record (403 Forbidden)');
  }

  // ------------------------------------------------------------------
  // 10. Main Admin Global Authority & Teacher Editing
  // ------------------------------------------------------------------
  console.log('\n--- Test 10: Main Admin Global Authority & Teacher Editing ---');
  {
    // Main Admin list query: sees both Teacher 1 and Teacher 2
    const mainListRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      headers: { 'Cookie': mainAdminCookie },
    });
    const mainListData = await mainListRes.json();
    assert(mainListRes.status === 200 && mainListData.count >= 2, `Main Admin has global visibility (found ${mainListData.count} records)`);

    // Main Admin edits Teacher 2 (created by Asst A)
    const editMainRes = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
      body: JSON.stringify({
        nameBn: 'ফারহানা ইয়াসমিন (হালনাগাদকৃত)',
        nameEn: 'Farhana Yasmin (Updated)',
        designationBn: 'প্রভাষক (স্থায়ী)',
        designationEn: 'Lecturer (Permanent)',
        rank: 'lecturer',
        email: 'deb110882.farhana.updated@gmail.com',
        phone: '01811998877',
      }),
    });
    const editMainData = await editMainRes.json();
    assert(editMainRes.status === 200 && editMainData.success, 'Main Admin successfully edited Teacher 2');
    assert(editMainData.teacher.nameEn === 'Farhana Yasmin (Updated)', 'Teacher 2 nameEn updated correctly');
  }

  // ------------------------------------------------------------------
  // 11. Search and Filtering Verification
  // ------------------------------------------------------------------
  console.log('\n--- Test 11: Search & Filter Endpoints ---');
  {
    // Search by name
    const searchRes = await fetch(`${BASE_URL}/api/admin/teachers?search=Anisur`, {
      headers: { 'Cookie': mainAdminCookie },
    });
    const searchData = await searchRes.json();
    assert(searchRes.status === 200 && searchData.count === 1 && searchData.teachers[0].nameEn === 'Md. Anisur Rahman', 'Search query correctly matched teacher name');

    // Filter by rank
    const rankRes = await fetch(`${BASE_URL}/api/admin/teachers?rank=assistant-professor`, {
      headers: { 'Cookie': mainAdminCookie },
    });
    const rankData = await rankRes.json();
    assert(rankRes.status === 200 && rankData.teachers.every(t => t.rank === 'assistant-professor'), 'Rank filter returned only assistant-professors');
  }

  // ------------------------------------------------------------------
  // 12. Accidental Admin Deletion Prevention with Teachers
  // ------------------------------------------------------------------
  console.log('\n--- Test 12: Admin Deletion Protection with Teacher Records ---');
  {
    // Assistant Admin A owns Teacher 2. Deleting Assistant Admin A without reassignment must fail!
    const delAsstRes = await fetch(`${BASE_URL}/api/admin/users/${asstAId}`, {
      method: 'DELETE',
      headers: { 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
    });
    const delAsstData = await delAsstRes.json();
    assert(delAsstRes.status === 400 && delAsstData.requiresReassignment, 'Deletion of Assistant Admin with teacher records blocked (requiresReassignment: true)');

    // Delete with reassignment to Main Admin
    const reassignRes = await fetch(`${BASE_URL}/api/admin/users/${asstAId}?reassignToId=${mainAdminId}`, {
      method: 'DELETE',
      headers: { 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
    });
    const reassignData = await reassignRes.json();
    assert(reassignRes.status === 200 && reassignData.success, 'Assistant Admin deleted after atomic teacher reassignment');

    // Verify Teacher 2 is now owned by Main Admin
    const verifyTeacher2 = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      headers: { 'Cookie': mainAdminCookie },
    });
    const verifyTeacher2Data = await verifyTeacher2.json();
    assert(verifyTeacher2Data.teacher.createdById === mainAdminId, 'Teacher 2 ownership successfully reassigned to Main Admin');
  }

  // ------------------------------------------------------------------
  // 13. Teardown & Clean Database
  // ------------------------------------------------------------------
  console.log('\n--- Test 13: Clean Deletion & Teardown ---');
  {
    // Delete Teacher 1
    const del1Res = await fetch(`${BASE_URL}/api/admin/teachers/${teacher1Id}`, {
      method: 'DELETE',
      headers: { 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
    });
    assert(del1Res.status === 200, 'Teacher 1 deleted by Main Admin');

    // Delete Teacher 2
    const del2Res = await fetch(`${BASE_URL}/api/admin/teachers/${teacher2Id}`, {
      method: 'DELETE',
      headers: { 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
    });
    assert(del2Res.status === 200, 'Teacher 2 deleted by Main Admin');

    // Delete Assistant Admin B
    const delAsstB = await fetch(`${BASE_URL}/api/admin/users/${asstBId}`, {
      method: 'DELETE',
      headers: { 'Cookie': mainAdminCookie, 'Origin': BASE_URL },
    });
    assert(delAsstB.status === 200, 'Assistant Admin B deleted cleanly (0 records)');

    // Verify Teachers table is clean
    const finalCountRes = await fetch(`${BASE_URL}/api/admin/teachers`, {
      headers: { 'Cookie': mainAdminCookie },
    });
    const finalCountData = await finalCountRes.json();
    assert(finalCountData.count === 0, 'Database clean: 0 test teachers remain');
  }

  console.log('\n============================================================');
  console.log(`🏁 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('============================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
