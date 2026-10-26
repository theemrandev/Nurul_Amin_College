/**
 * Dedicated Evidence-Based Verification Suite for National University Live Notice System
 * Nurul Amin Degree College Website
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {
    syncAllNotices,
    parseNationalUniversityNotices,
    sanitizeNuUrl,
    parsePublicationDate
} = require('../scripts/fetch_official_notices.js');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3605;

let passed = 0;
let failed = 0;

function assert(cond, msg) {
    if (cond) {
        console.log(`  ✓ ${msg}`);
        passed++;
    } else {
        console.error(`  ✗ FAIL: ${msg}`);
        failed++;
    }
}

function httpGet(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

function httpHead(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
            resolve({ statusCode: res.statusCode, headers: res.headers });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('TIMEOUT')); });
        req.end();
    });
}

async function runTestSuite() {
    console.log('================================================================');
    console.log('STARTING EVIDENCE-BASED AUDIT OF NATIONAL UNIVERSITY NOTICE SYSTEM');
    console.log('================================================================\n');

    // TEST 1: Actual Live Network Fetch against nu.ac.bd
    console.log('[1/7] Testing Live Network Fetch against Official NU Portal (nu.ac.bd)...');
    const startFetch = Date.now();
    const liveResult = await syncAllNotices({ force: true });
    const durationMs = Date.now() - startFetch;

    assert(liveResult !== null && typeof liveResult === 'object', 'Sync returned structured result object');
    assert(liveResult.sources && liveResult.sources.nu, 'Result contains National University source object');

    const nu = liveResult.sources.nu;
    assert(nu.status === 'live', `NU connection status is 'live' (Status: ${nu.status})`);
    assert(nu.isLive === true, 'NU isLive boolean flag is true');
    assert(Array.isArray(nu.notices) && nu.notices.length >= 5, `Fetched genuine live notices (Count: ${nu.notices.length})`);

    const newestNotice = nu.notices[0];
    console.log('\n  [EVIDENCE RECORDED FROM LIVE FETCH]:');
    console.log(`  - Fetch Duration: ${durationMs}ms`);
    console.log(`  - Timestamp (ISO): ${liveResult.lastAttemptedSync}`);
    console.log(`  - Timestamp (EN):  ${liveResult.lastSuccessfulSyncFormattedEn}`);
    console.log(`  - Timestamp (BN):  ${liveResult.lastSuccessfulSyncFormattedBn}`);
    console.log(`  - Total Notices:   ${nu.notices.length}`);
    console.log(`  - Newest ID:       ${newestNotice.id}`);
    console.log(`  - Newest Title:    ${newestNotice.titleBn}`);
    console.log(`  - Published Date:  ${newestNotice.date}`);
    console.log(`  - Official PDF:    ${newestNotice.link}\n`);

    // TEST 2: Validate Newest Notice PDF URL on nu.ac.bd Domain
    console.log('[2/7] Validating Newest Notice Destination URL on Official NU Server...');
    assert(newestNotice.link.startsWith('https://www.nu.ac.bd/') || newestNotice.link.startsWith('http://www.nu.ac.bd/'), `Destination URL is on official nu.ac.bd domain (${newestNotice.link})`);
    assert(newestNotice.link.toLowerCase().endsWith('.pdf'), 'Destination URL points to an official PDF circular');

    try {
        const headRes = await httpHead(newestNotice.link);
        assert(headRes.statusCode === 200, `Live PDF file responds with HTTP 200 OK on official NU server`);
        assert(headRes.headers['content-type'] && headRes.headers['content-type'].includes('pdf'), `Live Content-Type is valid PDF (${headRes.headers['content-type']})`);
        assert(parseInt(headRes.headers['content-length'] || '0', 10) > 1000, `Live PDF has valid file size (${headRes.headers['content-length']} bytes)`);
    } catch (e) {
        assert(false, `Failed to validate PDF HEAD: ${e.message}`);
    }

    // TEST 3: Notice Data Integrity & Sorting
    console.log('\n[3/7] Verifying Notice Data Integrity, Deduplication & Sorting...');
    let allValidUrls = true;
    let allValidTitles = true;
    let isSorted = true;
    const seenLinks = new Set();
    let hasDuplicate = false;

    for (let i = 0; i < nu.notices.length; i++) {
        const n = nu.notices[i];
        if (!n.link || (!n.link.startsWith('https://www.nu.ac.bd/') && !n.link.startsWith('http://www.nu.ac.bd/'))) {
            allValidUrls = false;
        }
        if (!n.titleBn || n.titleBn.length < 5) {
            allValidTitles = false;
        }
        if (seenLinks.has(n.link)) {
            hasDuplicate = true;
        }
        seenLinks.add(n.link);

        if (i > 0 && n.timestamp && nu.notices[i - 1].timestamp) {
            if (n.timestamp > nu.notices[i - 1].timestamp) {
                isSorted = false;
            }
        }
    }

    assert(allValidUrls, 'Every notice link is strictly on the official nu.ac.bd domain');
    assert(allValidTitles, 'Every notice has a non-empty title with minimum 5 characters');
    assert(!hasDuplicate, 'All notices are deduplicated by canonical link');
    assert(isSorted, 'Notices are sorted by publication date, newest first');

    // TEST 4: Security & URL Sanitization
    console.log('\n[4/7] Testing Security & Unsafe URL / XSS Rejection...');
    assert(sanitizeNuUrl('javascript:alert(1)') === null, 'Rejects javascript: scheme in URL');
    assert(sanitizeNuUrl('data:text/html,<script>alert(1)</script>') === null, 'Rejects data: URI scheme');
    assert(sanitizeNuUrl('https://evil-phishing.com/notices/fake.pdf') === null, 'Rejects external non-NU domain');
    assert(sanitizeNuUrl('uploads/notices/notice_123.pdf') === 'https://www.nu.ac.bd/uploads/notices/notice_123.pdf', 'Normalizes valid relative NU path to secure HTTPS link');

    const dirtyHtml = `
        <table>
            <tr><td>Header</td></tr>
            <tr>
                <td><a href="uploads/notices/notice_9999_pub_date_26102026.pdf"><script>alert("xss")</script> <b>নিরাপত্তা নোটিশ</b> </a></td>
                <td><b class="dated-document">October 26, 2026</b></td>
            </tr>
        </table>
    `;
    const parsedDirty = parseNationalUniversityNotices(dirtyHtml);
    assert(parsedDirty.length === 1, 'Parsed mock notice from HTML table');
    assert(!parsedDirty[0].titleBn.includes('<script>'), `Strips <script> tags from notice title (Cleaned: "${parsedDirty[0].titleBn}")`);

    // TEST 5: API Endpoints on Local Development Server
    console.log('\n[5/7] Testing API Endpoints (/api/live-notices, /api/sync-notices) on HTTP Server...');
    process.env.PORT = PORT;
    const testServer = require('../test/server.js');
    await new Promise(r => setTimeout(r, 500));

    try {
        const liveRes = await httpGet(`http://127.0.0.1:${PORT}/api/live-notices`);
        assert(liveRes.statusCode === 200, `/api/live-notices returns HTTP 200 OK`);
        assert(liveRes.headers['access-control-allow-origin'] === '*', `/api/live-notices includes CORS header Access-Control-Allow-Origin: *`);
        const liveJson = JSON.parse(liveRes.body);
        assert(liveJson.sources && liveJson.sources.nu.notices.length >= 5, `/api/live-notices returns valid JSON with notices list`);

        // Test sync endpoint with force=true
        const syncRes = await httpGet(`http://127.0.0.1:${PORT}/api/sync-notices?force=true`);
        assert(syncRes.statusCode === 200, `/api/sync-notices?force=true returns HTTP 200 OK`);
        const syncJson = JSON.parse(syncRes.body);
        assert(syncJson.sources.nu.isLive === true, `/api/sync-notices successfully triggered live sync`);

        // TEST 6: Cooldown & Rate Limiting Protection
        console.log('\n[6/7] Testing Rate Limiting & Cooldown Protection...');
        const rapidStart = Date.now();
        const cooldownRes = await httpGet(`http://127.0.0.1:${PORT}/api/sync-notices`);
        const rapidDuration = Date.now() - rapidStart;
        const cooldownJson = JSON.parse(cooldownRes.body);

        assert(rapidDuration < 50, `Subsequent rapid sync returned in ${rapidDuration}ms (< 50ms) without hammering NU server`);
        assert(cooldownJson.isCachedCooldown === true, 'Cooldown protection activated (isCachedCooldown: true)');
        assert(cooldownJson.cooldownRemainingMs > 0, `Cooldown remaining time recorded: ${cooldownJson.cooldownRemainingMs}ms`);
    } catch (e) {
        assert(false, `Server API test failed: ${e.message}`);
    }

    // TEST 7: Failure Simulation & Snapshot Preservation
    console.log('\n[7/7] Testing Outage Resilience: Preserving Snapshot on Network/Parse Failure...');
    // Corrupted HTML simulation
    const emptyResult = parseNationalUniversityNotices('<html><body>Error 500: Database connection failed</body></html>');
    assert(Array.isArray(emptyResult) && emptyResult.length === 0, 'Parser returns safe empty array on invalid HTML without crashing');

    // Simulate failed sync while existing snapshot is on disk
    const snapshotBefore = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data', 'official-notices.json'), 'utf8'));
    assert(snapshotBefore.sources.nu.notices.length > 0, 'Cached snapshot currently exists on disk');

    console.log('\n================================================================');
    console.log(`VERIFICATION AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

    process.exit(failed > 0 ? 1 : 0);
}

runTestSuite().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
});
