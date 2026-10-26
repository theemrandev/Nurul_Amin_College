/**
 * Nurul Amin Degree College - Official Education Notices Sync Script
 * 
 * Fetches legitimate live notices from National University (nu.ac.bd) without bypassing
 * authentication or CAPTCHAs, and documents connectivity status for Dhaka Education Board
 * and XI Class Admission portals.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'official-notices.json');

// In-memory cache & rate limiting
let cachedPayload = null;
let lastSyncTimestamp = 0;
let inFlightPromise = null;
const MIN_SYNC_INTERVAL_MS = 30000; // 30-second cooldown to prevent overwhelming official server

function fetchHttp(url, options = {}, maxRedirects = 3) {
    return new Promise((resolve) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                ...options.headers
            },
            timeout: options.timeout || 15000
        }, (res) => {
            if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
                let redirectUrl = res.headers.location;
                if (!redirectUrl.startsWith('http')) {
                    const u = new URL(url);
                    redirectUrl = `${u.origin}${redirectUrl}`;
                }
                return resolve(fetchHttp(redirectUrl, options, maxRedirects - 1));
            }

            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    url,
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body
                });
            });
        });

        req.on('error', err => resolve({ url, error: err.message }));
        req.on('timeout', () => {
            req.destroy();
            resolve({ url, error: 'TIMEOUT' });
        });
    });
}

function sanitizeNuUrl(rawLink) {
    if (typeof rawLink !== 'string') return null;
    let trimmed = rawLink.trim();

    // Explicitly reject dangerous schemes
    if (/^(javascript|data|vbscript|blob|file):/i.test(trimmed)) {
        return null;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        // Only allow safe relative paths (e.g. uploads/notices/... or .pdf files)
        if (!/^(uploads\/|[a-zA-Z0-9_\-\/]+\.pdf)/i.test(trimmed)) {
            return null;
        }
        trimmed = `https://www.nu.ac.bd/${trimmed.replace(/^\/+/, '')}`;
    }

    try {
        const u = new URL(trimmed);
        if ((u.protocol === 'http:' || u.protocol === 'https:') &&
            (u.hostname === 'www.nu.ac.bd' || u.hostname === 'nu.ac.bd')) {
            return u.href;
        }
    } catch (e) {}
    return null;
}

function parsePublicationDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return { dateStr: '', timestamp: 0 };
    const cleanStr = dateStr.replace(/\s+/g, ' ').trim();
    const parsed = Date.parse(cleanStr);
    if (!isNaN(parsed)) {
        return { dateStr: cleanStr, timestamp: parsed };
    }
    // Fallback: check dd-mm-yyyy or yyyy-mm-dd
    const match = cleanStr.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (match) {
        const ts = new Date(match[3], match[2] - 1, match[1]).getTime();
        return { dateStr: cleanStr, timestamp: isNaN(ts) ? 0 : ts };
    }
    return { dateStr: cleanStr, timestamp: 0 };
}

function parseNationalUniversityNotices(html) {
    const notices = [];
    if (!html || typeof html !== 'string') return notices;

    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    if (!tableMatch) return notices;

    const rows = tableMatch[1].match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    const seenLinks = new Set();
    const seenIds = new Set();

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        
        // Extract link and title
        const linkMatch = row.match(/href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
        if (!linkMatch) continue;

        const rawLink = linkMatch[1];
        const fullLink = sanitizeNuUrl(rawLink);
        if (!fullLink) continue; // Reject any non-NU domain or unsafe protocol

        let title = linkMatch[2]
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (title.length < 5) continue;

        // Extract date from table cell
        const dateMatch = row.match(/<td[^>]*>[\s\S]*?<b[^>]*class=["']dated-document["'][^>]*>([\s\S]*?)<\/b>[\s\S]*?<\/td>/i);
        const { dateStr, timestamp } = parsePublicationDate(dateMatch ? dateMatch[1] : '');

        // Stable identifier based on official filename
        const idMatch = rawLink.match(/notice_([0-9]+)/i) || rawLink.match(/([a-zA-Z0-9_\-]+)\.pdf$/i);
        const noticeId = idMatch ? `nu-${idMatch[1]}` : `nu-doc-${i}`;

        // Deduplicate
        if (seenLinks.has(fullLink) || seenIds.has(noticeId)) continue;
        seenLinks.add(fullLink);
        seenIds.add(noticeId);

        let category = 'general';
        if (title.includes('ফরম পূরণ') || title.toLowerCase().includes('form fill')) {
            category = 'formfillup';
        } else if (title.includes('পরীক্ষা') || title.toLowerCase().includes('exam') || title.includes('রুটিন')) {
            category = 'exam';
        }

        notices.push({
            id: noticeId,
            titleBn: title,
            titleEn: `National University Notice: ${title}`,
            date: dateStr || 'Official Circular',
            timestamp: timestamp,
            category: category,
            source: 'National University of Bangladesh (nu.ac.bd)',
            sourceBn: 'জাতীয় বিশ্ববিদ্যালয় (nu.ac.bd)',
            link: fullLink,
            isExternal: true,
            isLive: true
        });

        // Collect up to 20 for sorting, then trim to top 10
        if (notices.length >= 20) break;
    }

    // Sort by publication date, newest first
    notices.sort((a, b) => b.timestamp - a.timestamp);

    // Limit to top 10 newest notices
    return notices.slice(0, 10);
}

function loadExistingSnapshot() {
    try {
        if (fs.existsSync(OUTPUT_FILE)) {
            const raw = fs.readFileSync(OUTPUT_FILE, 'utf8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.warn('Could not read existing snapshot:', e.message);
    }
    return null;
}

function formatTimestamps(date) {
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const toBnNum = num => String(num).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);

    const formattedEn = `${date.getDate()} ${monthsEn[date.getMonth()]} ${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const formattedBn = `${toBnNum(date.getDate())} ${monthsBn[date.getMonth()]} ${toBnNum(date.getFullYear())}, ${toBnNum(date.getHours())}:${toBnNum(date.getMinutes().toString().padStart(2, '0'))}`;

    return { formattedEn, formattedBn };
}

async function syncAllNotices(options = {}) {
    const force = Boolean(options.force);
    const nowMs = Date.now();

    // 1. In-flight promise sharing
    if (!force && inFlightPromise) {
        return inFlightPromise;
    }

    // 2. Cooldown check to prevent overwhelming official server
    if (!force && cachedPayload && (nowMs - lastSyncTimestamp < MIN_SYNC_INTERVAL_MS)) {
        return {
            ...cachedPayload,
            isCachedCooldown: true,
            cooldownRemainingMs: MIN_SYNC_INTERVAL_MS - (nowMs - lastSyncTimestamp)
        };
    }

    inFlightPromise = (async () => {
        try {
            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }

            const now = new Date();
            const isoTimestamp = now.toISOString();
            const { formattedEn, formattedBn } = formatTimestamps(now);
            const prevSnapshot = loadExistingSnapshot();

            // 1. Fetch National University notices
            console.log('1. Fetching National University public notices from nu.ac.bd/recent-news-notice.php...');
            const fetchStartTime = Date.now();
            const nuRes = await fetchHttp('https://www.nu.ac.bd/recent-news-notice.php', { timeout: 15000 });
            const fetchDurationMs = Date.now() - fetchStartTime;

            let nuNotices = [];
            let nuStatus = 'error';
            let nuError = null;
            let isSuccessfulFetch = false;

            if (nuRes.body && nuRes.statusCode === 200) {
                nuNotices = parseNationalUniversityNotices(nuRes.body);
                if (nuNotices.length > 0) {
                    nuStatus = 'live';
                    isSuccessfulFetch = true;
                    console.log(`✓ Successfully parsed ${nuNotices.length} live notices from National University (${fetchDurationMs}ms)!`);
                } else {
                    nuError = 'Zero notices parsed from portal';
                    console.warn(`✗ Zero notices parsed from response`);
                }
            } else {
                nuError = nuRes.error || `HTTP ${nuRes.statusCode || 'Unreachable'}`;
                console.warn(`✗ Failed to fetch NU notices: ${nuError}`);
            }

            // 2. Handle failure: PRESERVE last known good snapshot
            let finalNuNotices = nuNotices;
            let lastSuccessfulSync = isoTimestamp;
            let lastSuccessfulSyncFormattedEn = formattedEn;
            let lastSuccessfulSyncFormattedBn = formattedBn;

            if (!isSuccessfulFetch) {
                nuStatus = 'offline_cached';
                if (prevSnapshot && prevSnapshot.sources && prevSnapshot.sources.nu && Array.isArray(prevSnapshot.sources.nu.notices) && prevSnapshot.sources.nu.notices.length > 0) {
                    finalNuNotices = prevSnapshot.sources.nu.notices;
                    lastSuccessfulSync = prevSnapshot.lastSuccessfulSync || prevSnapshot.lastSynced || isoTimestamp;
                    lastSuccessfulSyncFormattedEn = prevSnapshot.lastSuccessfulSyncFormattedEn || prevSnapshot.lastSyncedFormattedEn || formattedEn;
                    lastSuccessfulSyncFormattedBn = prevSnapshot.lastSuccessfulSyncFormattedBn || prevSnapshot.lastSyncedFormattedBn || formattedBn;
                    console.log(`✓ Preserved ${finalNuNotices.length} notices from previous verified snapshot`);
                }
            }

            // 3. Probing Dhaka Education Board gateway
            console.log('2. Probing Dhaka Education Board gateway...');
            const debRes = await fetchHttp('https://dhakaeducationboard.gov.bd/', { timeout: 8000 });
            const isDebChallenge = Boolean(debRes.body && debRes.body.includes('_challenge-engine'));

            const payload = {
                lastAttemptedSync: isoTimestamp,
                lastSuccessfulSync: lastSuccessfulSync,
                lastSyncedFormattedEn: lastSuccessfulSyncFormattedEn,
                lastSyncedFormattedBn: lastSuccessfulSyncFormattedBn,
                lastSuccessfulSyncFormattedEn: lastSuccessfulSyncFormattedEn,
                lastSuccessfulSyncFormattedBn: lastSuccessfulSyncFormattedBn,
                fetchDurationMs: fetchDurationMs,
                sources: {
                    nu: {
                        id: 'national-university',
                        name: 'National University of Bangladesh',
                        nameBn: 'জাতীয় বিশ্ববিদ্যালয়',
                        url: 'https://www.nu.ac.bd/',
                        noticePageUrl: 'https://www.nu.ac.bd/recent-news-notice.php',
                        status: nuStatus,
                        isLive: isSuccessfulFetch,
                        statusLabelEn: isSuccessfulFetch ? 'Live Official Feed' : 'Live update unavailable — showing cached notices',
                        statusLabelBn: isSuccessfulFetch ? 'লাইভ সরকারি ফিড (সক্রিয়)' : 'লাইভ আপডেট অনুপলব্ধ — সংরক্ষিত নোটিশ প্রদর্শিত হচ্ছে',
                        fetchMethod: 'Direct Public Notice Extraction',
                        error: nuError,
                        noticesCount: finalNuNotices.length,
                        notices: finalNuNotices
                    },
                    dhakaBoard: {
                        id: 'dhaka-education-board',
                        name: 'Board of Intermediate & Secondary Education, Dhaka',
                        nameBn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা',
                        url: 'https://dhakaeducationboard.gov.bd/',
                        noticePageUrl: 'https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner',
                        status: 'gateway_protected',
                        statusLabelEn: 'Security Gateway Protected (Direct Link)',
                        statusLabelBn: 'নিরাপত্তা গেটওয়ে সুরক্ষিত (সরাসরি লিংক)',
                        statusReasonEn: 'Protected by automated browser challenge engine (bpanel.challenge). Accessible directly on official board server.',
                        statusReasonBn: 'ঢাকা বোর্ডের স্বয়ংক্রিয় বট প্রতিরক্ষা গেটওয়ে (bpanel.challenge) দ্বারা সুরক্ষিত। সরাসরি অফিসিয়াল পোর্টালে ভিজিট করুন।',
                        noticesCount: 0,
                        notices: []
                    },
                    xiAdmission: {
                        id: 'xi-class-admission',
                        name: 'Ministry of Education XI Class Admission Portal',
                        nameBn: 'একাদশ শ্রেণি অনলাইন ভর্তি সিস্টেম (শিক্ষা মন্ত্রণালয়)',
                        url: 'https://xiclassadmission.gov.bd/',
                        noticePageUrl: 'https://xiclassadmission.gov.bd/',
                        status: 'external_portal_only',
                        statusLabelEn: 'Direct Government Portal Link',
                        statusLabelBn: 'সরাসরি সরকারি ভর্তি পোর্টাল লিংক',
                        statusReasonEn: 'Active during central admission cycles. No public RSS feed is published.',
                        statusReasonBn: 'ভর্তি চক্র চলাকালীন কেন্দ্রীয় বিজ্ঞপ্তি প্রকাশিত হয়। কোনো উন্মুক্ত আরএসএস ফিড নেই।',
                        noticesCount: 0,
                        notices: []
                    }
                }
            };

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
            cachedPayload = payload;
            lastSyncTimestamp = Date.now();
            return payload;
        } finally {
            inFlightPromise = null;
        }
    })();

    return inFlightPromise;
}

if (require.main === module) {
    syncAllNotices({ force: true }).then(() => process.exit(0)).catch(err => {
        console.error('Fatal sync error:', err);
        process.exit(1);
    });
}

module.exports = {
    syncAllNotices,
    parseNationalUniversityNotices,
    sanitizeNuUrl,
    parsePublicationDate,
    MIN_SYNC_INTERVAL_MS
};
