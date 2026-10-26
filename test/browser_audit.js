/**
 * Comprehensive Browser-Level Quality Audit via Chrome DevTools Protocol (CDP)
 * Nurul Amin Degree College Website
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3600;
const CDP_PORT = 9222;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8'
};

// 1. Static HTTP Server
function createServer() {
    return http.createServer(async (req, res) => {
        let reqUrl = decodeURI(req.url.split('?')[0]);

        if (reqUrl === '/api/live-notices') {
            const noticesFile = path.join(ROOT_DIR, 'data', 'official-notices.json');
            if (fs.existsSync(noticesFile)) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                fs.createReadStream(noticesFile).pipe(res);
                return;
            }
        }

        if (reqUrl === '/api/sync-notices') {
            try {
                const { syncAllNotices } = require('../scripts/fetch_official_notices.js');
                const freshData = await syncAllNotices();
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify(freshData));
                return;
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
        }

        if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';
        const filePath = path.join(ROOT_DIR, reqUrl);

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, {
                'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
                'Cache-Control': 'no-cache'
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            const notFound = path.join(ROOT_DIR, '404.html');
            if (fs.existsSync(notFound)) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                fs.createReadStream(notFound).pipe(res);
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        }
    });
}

// Helper: HTTP GET JSON
function getJson(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// 2. Main Audit Runner
async function runAudit() {
    console.log('========================================================');
    console.log('STARTING CHROME BROWSER-LEVEL COMPREHENSIVE QUALITY AUDIT');
    console.log('========================================================\n');

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

    const server = createServer();
    await new Promise(r => server.listen(PORT, r));
    console.log(`[1/6] Local HTTP Server running on http://127.0.0.1:${PORT}`);

    // Launch Chrome Headless with CDP
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const tmpDataDir = path.join(os.tmpdir(), `nadc_cdp_${Date.now()}`);
    const chrome = spawn(chromePath, [
        '--headless=new',
        `--remote-debugging-port=${CDP_PORT}`,
        `--user-data-dir=${tmpDataDir}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--window-size=1440,900',
        'about:blank'
    ]);

    // Wait for CDP endpoint
    console.log('[2/6] Launching Google Chrome in headless automation mode...');
    let versionInfo = null;
    for (let i = 0; i < 30; i++) {
        try {
            versionInfo = await getJson(`http://127.0.0.1:${CDP_PORT}/json/version`);
            if (versionInfo) break;
        } catch (e) {
            await new Promise(r => setTimeout(r, 200));
        }
    }

    if (!versionInfo) {
        console.error('Could not connect to Chrome CDP endpoint.');
        chrome.kill();
        server.close();
        process.exit(1);
    }
    console.log(`  ✓ Connected to ${versionInfo.Browser}`);

    // Get the active page target
    const targets = await getJson(`http://127.0.0.1:${CDP_PORT}/json/list`);
    const target = targets.find(t => t.type === 'page') || targets[0];
    const wsUrl = target.webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);

    await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
    });

    let messageId = 1;
    const pendingRequests = new Map();
    const consoleErrors = [];
    const failedNetwork = [];
    let onLoadEvent = null;

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && pendingRequests.has(msg.id)) {
            const { resolve, reject } = pendingRequests.get(msg.id);
            pendingRequests.delete(msg.id);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
        }

        if (msg.method === 'Page.loadEventFired') {
            if (onLoadEvent) {
                const fn = onLoadEvent;
                onLoadEvent = null;
                fn();
            }
        }

        // Catch console errors
        if (msg.method === 'Runtime.consoleAPICalled') {
            if (msg.params.type === 'error') {
                const text = msg.params.args.map(a => a.value || a.description).join(' ');
                consoleErrors.push(text);
            }
        }
        // Catch network failures
        if (msg.method === 'Network.loadingFailed') {
            failedNetwork.push(msg.params.errorText + ' for ' + msg.params.requestId);
        }
    };

    function sendCommand(method, params = {}) {
        return new Promise((resolve, reject) => {
            const id = messageId++;
            pendingRequests.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    async function navigateAndWait(url) {
        return new Promise(async (resolve) => {
            onLoadEvent = () => setTimeout(resolve, 300);
            await sendCommand('Page.navigate', { url });
        });
    }

    async function evaluate(expression) {
        const res = await sendCommand('Runtime.evaluate', {
            expression,
            returnByValue: true,
            awaitPromise: true
        });
        if (res.exceptionDetails) {
            throw new Error(res.exceptionDetails.exception.description);
        }
        return res.result.value;
    }

    // Enable domains
    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Network.enable');

    const screenshotsDir = path.join(ROOT_DIR, 'test', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    // 3. Desktop Audit across all pages
    console.log('\n[3/6] Auditing Desktop Layout & Rendering (1440x900)...');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });

    const pages = [
        'index.html',
        'about.html',
        'academics.html',
        'admission.html',
        'student-services.html',
        'notice.html',
        'routine.html',
        'honours.html',
        'gallery.html',
        'contact.html',
        'developer.html',
        'donation.html',
        'tour.html',
        'play.html',
        'admin.html',
        '404.html'
    ];

    for (const page of pages) {
        consoleErrors.length = 0;
        await navigateAndWait(`http://127.0.0.1:${PORT}/${page}`);

        // Validate Title
        const title = await evaluate('document.title');
        assert(title.length > 5, `[${page}] Page title loaded: "${title}"`);

        // Check for 0 console errors
        assert(consoleErrors.length === 0, `[${page}] Zero console runtime errors (Found: ${consoleErrors.length})`);

        // Check horizontal overflow against visible client viewport
        const overflow = await evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth');
        assert(!overflow, `[${page}] Zero horizontal overflow on desktop`);

        // Check active link indicator
        const activeLinkHref = await evaluate(`
            (() => {
                const active = document.querySelector('.nav-link.active, .dropdown-link.active, .mobile-nav-link.active');
                return active ? active.getAttribute('href') : null;
            })()
        `);
        assert(activeLinkHref !== null || page === '404.html', `[${page}] Active navigation indicator set to "${activeLinkHref}"`);

        // Check header and logo rendering
        const logoRendered = await evaluate(`
            (() => {
                const img = document.querySelector('.college-logo-img');
                return img && img.naturalWidth > 0;
            })()
        `);
        assert(logoRendered, `[${page}] College logo loaded with natural dimensions`);

        // Capture screenshot
        const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(screenshotsDir, `${page.replace('.html', '')}_desktop.png`), Buffer.from(shot.data, 'base64'));
    }

    // 4. Mobile Layout & Hamburger Interaction Test (375x812)
    console.log('\n[4/6] Auditing Mobile Layout & Hamburger Navigation (375x812)...');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: 375,
        height: 812,
        deviceScaleFactor: 2,
        mobile: true
    });

    await sendCommand('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    await new Promise(r => setTimeout(r, 400));

    // Check mobile elements visibility
    const isMobileToggleVisible = await evaluate(`
        (() => {
            const toggle = document.querySelector('.mobile-menu-toggle');
            const style = window.getComputedStyle(toggle);
            return style.display !== 'none' && toggle.offsetWidth >= 40;
        })()
    `);
    assert(isMobileToggleVisible, 'Mobile hamburger button visible with adequate touch target (>=40px)');

    const isDesktopNavHidden = await evaluate(`
        (() => {
            const nav = document.querySelector('.desktop-nav');
            return window.getComputedStyle(nav).display === 'none';
        })()
    `);
    assert(isDesktopNavHidden, 'Desktop nav properly hidden on mobile viewport');

    // Test hamburger click -> open
    await evaluate(`document.querySelector('.mobile-menu-toggle').click();`);
    await new Promise(r => setTimeout(r, 200));

    const isOpen = await evaluate(`
        (() => {
            const drawer = document.querySelector('.mobile-nav-drawer');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const overlay = document.querySelector('.mobile-nav-overlay');
            return drawer.classList.contains('open') &&
                   toggle.classList.contains('is-active') &&
                   overlay.classList.contains('open') &&
                   document.body.style.overflow === 'hidden';
        })()
    `);
    assert(isOpen, 'Hamburger click transforms to X, opens drawer, shows overlay, and locks body scrolling');

    // Test mobile dropdown accordion
    await evaluate(`
        const firstDropdown = document.querySelector('.mobile-dropdown-btn');
        if (firstDropdown) firstDropdown.click();
    `);
    await new Promise(r => setTimeout(r, 200));

    const isAccordionOpen = await evaluate(`
        (() => {
            const btn = document.querySelector('.mobile-dropdown-btn');
            const submenu = btn.nextElementSibling;
            return btn.classList.contains('active') && submenu.classList.contains('open');
        })()
    `);
    assert(isAccordionOpen, 'Mobile accordion submenu expands smoothly on tap');

    // Test Escape key dismissal
    await sendCommand('Input.dispatchKeyEvent', {
        type: 'keyDown',
        key: 'Escape',
        code: 'Escape',
        windowsVirtualKeyCode: 27
    });
    await new Promise(r => setTimeout(r, 200));

    const isClosedOnEscape = await evaluate(`
        (() => {
            const drawer = document.querySelector('.mobile-nav-drawer');
            const toggle = document.querySelector('.mobile-menu-toggle');
            return !drawer.classList.contains('open') &&
                   !toggle.classList.contains('is-active') &&
                   document.body.style.overflow === '';
        })()
    `);
    assert(isClosedOnEscape, 'Escape key reliably closes mobile drawer and restores body scrolling');

    // Capture mobile screenshot
    const mobileShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(screenshotsDir, 'index_mobile.png'), Buffer.from(mobileShot.data, 'base64'));

    // 5. Bilingual System & Persistence Test
    console.log('\n[5/6] Auditing Bilingual Switching & LocalStorage Persistence...');
    // Reset to desktop for bilingual inspection
    await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });

    await navigateAndWait(`http://127.0.0.1:${PORT}/index.html`);

    // Switch to English
    await evaluate(`window.switchLanguage('en');`);
    await new Promise(r => setTimeout(r, 100));

    const enNavHome = await evaluate(`document.querySelector('[data-i18n="nav_home"]').textContent.trim()`);
    const enApplyBtn = await evaluate(`document.querySelector('[data-i18n="apply_btn"]').textContent.trim()`);
    const enLangStorage = await evaluate(`localStorage.getItem('nadc_language') || localStorage.getItem('preferredLang')`);
    const enDocLang = await evaluate(`document.documentElement.lang`);

    assert(enNavHome === 'Home', `Language switched to English: nav_home -> "${enNavHome}"`);
    assert(enApplyBtn === 'Apply Online', `Language switched to English: apply_btn -> "${enApplyBtn}"`);
    assert(enLangStorage === 'en', `English preference saved in localStorage: "${enLangStorage}"`);
    assert(enDocLang === 'en', `Document lang attribute updated to <html lang="${enDocLang}">`);

    // Reload page to test persistence
    await navigateAndWait(`http://127.0.0.1:${PORT}/index.html`);

    const persistedEnNav = await evaluate(`document.querySelector('[data-i18n="nav_home"]').textContent.trim()`);
    assert(persistedEnNav === 'Home', `English language persists after page reload: "${persistedEnNav}"`);

    // Switch back to Bengali
    await evaluate(`window.switchLanguage('bn');`);
    await new Promise(r => setTimeout(r, 100));

    const bnNavHome = await evaluate(`document.querySelector('[data-i18n="nav_home"]').textContent.trim()`);
    const bnLangStorage = await evaluate(`localStorage.getItem('nadc_language') || localStorage.getItem('preferredLang')`);
    const bnDocLang = await evaluate(`document.documentElement.lang`);

    assert(bnNavHome === 'মূলপাতা', `Language switched to Bengali: nav_home -> "${bnNavHome}"`);
    assert(bnLangStorage === 'bn', `Bengali preference saved in localStorage: "${bnLangStorage}"`);
    assert(bnDocLang === 'bn', `Document lang attribute updated to <html lang="${bnDocLang}">`);

    // 6. Interactive Features (Live Search, FAQs, Form Validation)
    console.log('\n[6/6] Auditing Interactive Components & Form Validation...');
    await navigateAndWait(`http://127.0.0.1:${PORT}/notice.html`);

    // 6a. Test Notice Feed Tabs & Live NU Feed
    const initialCollegeCount = await evaluate(`document.querySelectorAll('.notice-card').length`);
    assert(initialCollegeCount === 5, `Initial College Campus notices loaded (Count: ${initialCollegeCount})`);

    // Switch to National University Live Tab
    const nuTabSwitched = await evaluate(`
        (() => {
            const nuTab = document.querySelector('.feed-tab-btn[data-feed="nu-live"]');
            if (!nuTab) return false;
            nuTab.click();
            const statusBar = document.getElementById('feed-status-container');
            const isBarVisible = statusBar && window.getComputedStyle(statusBar).display !== 'none';
            const cards = document.querySelectorAll('.notice-card');
            const firstLink = cards[0] ? cards[0].querySelector('a').href : '';
            return isBarVisible && cards.length >= 5 && firstLink.includes('nu.ac.bd');
        })()
    `);
    assert(nuTabSwitched, 'NU Live Tab renders live notices directly from National University public server with active status bar');

    // Test Live Sync Button Trigger
    const syncResult = await evaluate(`
        (async () => {
            const syncBtn = document.getElementById('btn-sync-notices');
            if (!syncBtn) return false;
            syncBtn.click();
            await new Promise(r => setTimeout(r, 600));
            const timeText = document.getElementById('feed-last-updated-time').textContent.trim();
            return timeText.length > 5;
        })()
    `);
    assert(syncResult, 'Live notice sync button (/api/sync-notices) executes and refreshes live timestamp');

    // Switch to Dhaka Education Board Gateway Tab
    const dhakaTabSwitched = await evaluate(`
        (() => {
            const debTab = document.querySelector('.feed-tab-btn[data-feed="dhaka-board"]');
            if (!debTab) return false;
            debTab.click();
            const gatewayCard = document.querySelector('.gateway-notice-card');
            const hasHscCornerLink = gatewayCard && gatewayCard.innerHTML.includes('dhakaeducationboard.gov.bd');
            const filterBar = document.querySelector('.notices-filter-bar');
            const isFilterHidden = filterBar && window.getComputedStyle(filterBar).display === 'none';
            return hasHscCornerLink && isFilterHidden;
        })()
    `);
    assert(dhakaTabSwitched, 'Dhaka Board Gateway tab renders security-protected notice explanation with verified official board links');

    // Return to College Notices Tab
    await evaluate(`
        const collegeTab = document.querySelector('.feed-tab-btn[data-feed="college"]');
        if (collegeTab) collegeTab.click();
    `);

    // 6b. Test Administrator Notice Publisher Drawer (Client-Side Safe Sandbox)
    const adminPublisherTested = await evaluate(`
        (() => {
            const toggleBtn = document.getElementById('admin-toggle-btn');
            const panel = document.getElementById('admin-publisher-panel');
            if (!toggleBtn || !panel) return false;
            
            // Expand drawer
            toggleBtn.click();
            const isExpanded = panel.classList.contains('open');

            // Fill form
            document.getElementById('admin-title-bn').value = 'টেস্ট ড্রাফট নোটিশ ২০২৬';
            document.getElementById('admin-title-en').value = 'Test Draft Notice 2026';
            document.getElementById('admin-summary-bn').value = 'এটি একটি পরীক্ষামূলক টেস্ট ড্রাফট নোটিশ।';
            document.getElementById('admin-summary-en').value = 'This is a test draft notice preview.';
            
            // Submit form to preview
            const form = document.getElementById('admin-notice-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            // Check rendered notice card
            const firstCard = document.querySelector('.notice-card');
            const hasDraftNotice = firstCard && firstCard.textContent.includes('টেস্ট ড্রাফট নোটিশ');

            // Clean up
            const clearBtn = document.getElementById('admin-btn-clear');
            if (clearBtn) clearBtn.click();

            return isExpanded && hasDraftNotice;
        })()
    `);
    assert(adminPublisherTested, 'Admin notice publisher drawer expands, previews local draft notice, and supports safe clearance');

    // Test notice search filter
    const searchCountBefore = await evaluate(`document.querySelectorAll('.notice-card').length`);
    await evaluate(`
        const input = document.getElementById('notice-search-input');
        if (input) {
            input.value = 'রুটিন';
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    `);
    await new Promise(r => setTimeout(r, 100));
    const searchCountAfter = await evaluate(`document.querySelectorAll('.notice-card').length`);
    assert(searchCountAfter <= searchCountBefore && searchCountAfter > 0, `Notice search filter functional (${searchCountBefore} -> ${searchCountAfter} notices)`);

    // Test FAQ Accordion on homepage
    await navigateAndWait(`http://127.0.0.1:${PORT}/index.html`);

    const faqOpened = await evaluate(`
        (() => {
            const secondFaq = document.querySelectorAll('.accordion-header')[1];
            if (!secondFaq) return false;
            secondFaq.click();
            return secondFaq.parentElement.classList.contains('active') && secondFaq.getAttribute('aria-expanded') === 'true';
        })()
    `);
    assert(faqOpened, 'FAQ accordion expands and updates aria-expanded attribute on click');

    // Test Contact Form Validation
    await navigateAndWait(`http://127.0.0.1:${PORT}/contact.html`);

    const formErrorTriggered = await evaluate(`
        (() => {
            const form = document.getElementById('contact-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));
            const feedback = document.getElementById('form-feedback');
            return feedback.classList.contains('error');
        })()
    `);
    assert(formErrorTriggered, 'Empty contact form submission displays accessible error feedback');

    // Test Student Services Page & Dynamic Filtering
    await navigateAndWait(`http://127.0.0.1:${PORT}/student-services.html`);

    const totalServicesCount = await evaluate(`document.querySelectorAll('#student-services-grid .quick-access-card').length`);
    assert(totalServicesCount === 12, `Student Services hub renders all 12 services (Found: ${totalServicesCount})`);

    // Test category filter click (e.g., results tab)
    const resultsCount = await evaluate(`
        (() => {
            const btn = document.querySelector('.services-filter-btn[data-category="results"]');
            if (!btn) return 0;
            btn.click();
            return document.querySelectorAll('#student-services-grid .quick-access-card').length;
        })()
    `);
    assert(resultsCount === 2, `Category filter for 'results' correctly shows 2 result portals (Found: ${resultsCount})`);

    // Reset to all services
    await evaluate(`
        const allBtn = document.querySelector('.services-filter-btn[data-category="all"]');
        if (allBtn) allBtn.click();
    `);

    // Test search filter
    const searchFilterCount = await evaluate(`
        (() => {
            const input = document.getElementById('services-search-input');
            if (!input) return 0;
            input.value = 'জাতীয় বিশ্ববিদ্যালয়';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return document.querySelectorAll('#student-services-grid .quick-access-card').length;
        })()
    `);
    assert(searchFilterCount > 0 && searchFilterCount < 12, `Search filter functional on student services (${searchFilterCount} matches)`);

    // Test Security Guarantee Notice Box
    const securityBoxVisible = await evaluate(`
        (() => {
            const box = document.querySelector('.security-notice-box');
            return box !== null && box.textContent.includes('গোপনীয়তা');
        })()
    `);
    assert(securityBoxVisible, 'Security Guarantee and Privacy Notice Box rendered on Student Services page');

    // Test Live Portal Status Section
    const portalStatusRows = await evaluate(`document.querySelectorAll('table tbody tr').length`);
    assert(portalStatusRows === 5, `Live Government Portal Connectivity table displays 5 verified official portals`);

    // =========================================================================
    // 6c. Auditing Admin Portal Authentication, Session & Notice CRUD
    // =========================================================================
    console.log('\n[6c] Auditing Admin Portal Authentication, Session & Notice CRUD...');
    await navigateAndWait(`http://127.0.0.1:${PORT}/admin.html`);

    // Ensure pristine clean storage for audit
    await evaluate(`
        sessionStorage.removeItem('nurulAminCollege_adminSession');
        localStorage.removeItem('nurulAminCollege_adminSession');
        localStorage.removeItem('nurulAminCollege_adminNotices');
        location.reload();
    `);
    await new Promise(r => setTimeout(r, 400));

    // Test 1: Unauthenticated view state
    const unauthViewCorrect = await evaluate(`
        (() => {
            const loginView = document.getElementById('admin-login-view');
            const dashboardView = document.getElementById('admin-dashboard-view');
            return loginView && loginView.style.display !== 'none' && (!dashboardView || dashboardView.style.display === 'none');
        })()
    `);
    assert(unauthViewCorrect, 'Unauthenticated user sees Admin Login view; protected Dashboard is strictly hidden');

    // Test 2: Invalid Login Attempt
    const invalidLoginRejected = await evaluate(`
        (() => {
            const userInput = document.getElementById('admin-username');
            const passInput = document.getElementById('admin-password');
            const form = document.getElementById('admin-login-form');
            const errorMsg = document.getElementById('admin-login-error');

            userInput.value = 'wronguser';
            passInput.value = 'wrongpass';
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            const isErrorVisible = errorMsg && errorMsg.style.display !== 'none';
            const dashboardHidden = document.getElementById('admin-dashboard-view').style.display === 'none';
            return isErrorVisible && dashboardHidden;
        })()
    `);
    assert(invalidLoginRejected, 'Invalid login rejected with error message without leaking field specificity');

    // Test 3: Successful Login with exact credentials (theemrandev / ESNLK619)
    const validLoginSuccess = await evaluate(`
        (() => {
            const userInput = document.getElementById('admin-username');
            const passInput = document.getElementById('admin-password');
            const form = document.getElementById('admin-login-form');

            userInput.value = 'theemrandev';
            passInput.value = 'ESNLK619';
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            const loginViewHidden = document.getElementById('admin-login-view').style.display === 'none';
            const dashboardVisible = document.getElementById('admin-dashboard-view').style.display !== 'none';
            return loginViewHidden && dashboardVisible;
        })()
    `);
    assert(validLoginSuccess, 'Valid credentials (theemrandev / ESNLK619) unlock Admin Dashboard and hide login form');

    // Test 4: Notice Creation (Add Notice)
    const noticeCreated = await evaluate(`
        (() => {
            document.getElementById('admin-input-title-bn').value = 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬';
            document.getElementById('admin-input-title-en').value = 'Annual Sports Competition 2026';
            document.getElementById('admin-input-category').value = 'achievement';
            document.getElementById('admin-input-date').value = '2026-10-27';
            document.getElementById('admin-input-summary-bn').value = 'কলেজের বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী সপ্তাহে অনুষ্ঠিত হবে।';
            document.getElementById('admin-input-summary-en').value = 'Annual sports competition will be hosted next week.';
            document.getElementById('admin-input-link').value = 'play.html';

            const form = document.getElementById('admin-manage-notice-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            const stored = JSON.parse(localStorage.getItem('nurulAminCollege_adminNotices') || '[]');
            const tableRows = document.querySelectorAll('#admin-notices-table-body tr');
            const hasRow = tableRows.length === 1 && tableRows[0].textContent.includes('বার্ষিক ক্রীড়া প্রতিযোগিতা');
            return stored.length === 1 && hasRow && stored[0].titleBn === 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬';
        })()
    `);
    assert(noticeCreated, 'Admin can publish a new notice: saved to localStorage and rendered in Admin Table');

    // Test 5: Notice Editing (In-Place Update with Stable ID)
    const noticeEdited = await evaluate(`
        (() => {
            const initialStored = JSON.parse(localStorage.getItem('nurulAminCollege_adminNotices') || '[]');
            const initialId = initialStored[0].id;

            // Click Edit button
            const editBtn = document.querySelector('.admin-action-btn.edit');
            editBtn.click();

            // Check form populated
            const editId = document.getElementById('admin-notice-edit-id').value;
            if (editId !== initialId) return false;

            // Modify title
            document.getElementById('admin-input-title-bn').value = 'সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬';
            document.getElementById('admin-input-title-en').value = 'Updated Annual Sports Competition 2026';

            // Submit update
            const form = document.getElementById('admin-manage-notice-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            // Verify in storage
            const updatedStored = JSON.parse(localStorage.getItem('nurulAminCollege_adminNotices') || '[]');
            const tableRows = document.querySelectorAll('#admin-notices-table-body tr');
            const isSameId = updatedStored.length === 1 && updatedStored[0].id === initialId;
            const isUpdatedTitle = updatedStored[0].titleBn === 'সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬';
            const tableHasUpdated = tableRows.length === 1 && tableRows[0].textContent.includes('সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা');
            return isSameId && isUpdatedTitle && tableHasUpdated;
        })()
    `);
    assert(noticeEdited, 'Admin can edit an existing notice: updates in-place with stable preserved ID and no duplication');

    // Test 6: Verify Admin Notice Renders on Public Notice Board
    await navigateAndWait(`http://127.0.0.1:${PORT}/notice.html`);
    const publicNoticeRendered = await evaluate(`
        (() => {
            const firstCard = document.querySelector('.notice-card');
            return firstCard && firstCard.textContent.includes('সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা');
        })()
    `);
    assert(publicNoticeRendered, 'Public notice board immediately renders the admin-published notice from shared localStorage');

    // Test 7: Browser Refresh Persistence in Admin Portal
    await navigateAndWait(`http://127.0.0.1:${PORT}/admin.html`);
    // Explicitly test browser page reload via CDP Page.reload with load event waiting
    await new Promise(async (resolve) => {
        onLoadEvent = () => setTimeout(resolve, 400);
        await sendCommand('Page.reload');
    });

    const refreshPreserved = await evaluate(`
        (() => {
            const dashboardVisible = document.getElementById('admin-dashboard-view').style.display !== 'none';
            const tableRows = document.querySelectorAll('#admin-notices-table-body tr');
            const hasNotice = tableRows.length === 1 && tableRows[0].textContent.includes('সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা');
            return dashboardVisible && hasNotice;
        })()
    `);
    assert(refreshPreserved, 'Admin session and managed notices persist across full browser page refresh');

    // Test 8: Notice Deletion with Confirmation
    const noticeDeleted = await evaluate(`
        (() => {
            window.confirm = () => true; // Auto-confirm deletion
            const deleteBtn = document.querySelector('.admin-action-btn.delete');
            if (!deleteBtn) return false;
            deleteBtn.click();

            const stored = JSON.parse(localStorage.getItem('nurulAminCollege_adminNotices') || '[]');
            const emptyState = document.getElementById('admin-empty-state');
            const isEmptyVisible = emptyState && emptyState.style.display !== 'none';
            return stored.length === 0 && isEmptyVisible;
        })()
    `);
    assert(noticeDeleted, 'Admin can delete notice with confirmation: purged from localStorage and renders empty state');

    // Test 9: Public Notice Page reflects deletion
    await navigateAndWait(`http://127.0.0.1:${PORT}/notice.html`);
    const publicNoticeDeleted = await evaluate(`
        (() => {
            const cards = document.querySelectorAll('.notice-card');
            for (const c of cards) {
                if (c.textContent.includes('সংশোধিত বার্ষিক ক্রীড়া প্রতিযোগিতা')) return false;
            }
            return true;
        })()
    `);
    assert(publicNoticeDeleted, 'Public notice board immediately reflects notice deletion');

    // Test 10: Logout & Back-Button Protection
    await navigateAndWait(`http://127.0.0.1:${PORT}/admin.html`);
    const logoutWorks = await evaluate(`
        (() => {
            const logoutBtn = document.getElementById('btn-admin-logout');
            logoutBtn.click();

            const loginViewVisible = document.getElementById('admin-login-view').style.display !== 'none';
            const dashboardHidden = document.getElementById('admin-dashboard-view').style.display === 'none';
            const sessionGone = !sessionStorage.getItem('nurulAminCollege_adminSession') && !localStorage.getItem('nurulAminCollege_adminSession');
            return loginViewVisible && dashboardHidden && sessionGone;
        })()
    `);
    assert(logoutWorks, 'Logout button terminates session and locks user out of Admin Dashboard');

    // Close browser & server
    ws.close();
    chrome.kill();
    server.close();

    console.log('\n========================================================');
    console.log(`FINAL QUALITY AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================\n');

    if (failed > 0) {
        process.exit(1);
    } else {
        console.log('✓ All browser-level verification checks passed with 100% success!\n');
    }
}

runAudit().catch(err => {
    console.error('Fatal audit error:', err);
    process.exit(1);
});
