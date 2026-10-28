/**
 * Live Real Browser Verification Script for Phase 4A + 4B
 * Nurul Amin Degree College Portal - Admin Panel & Teacher Management
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const BASE_URL = 'http://localhost:3000';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
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

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(msg.error);
          else cb.resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result ? res.result.value : null;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runBrowserAudit() {
  console.log('================================================================');
  console.log(' LIVE REAL BROWSER VERIFICATION: TEACHER MANAGEMENT (Chrome CDP)');
  console.log('================================================================\n');

  // Pre-test cleanup: ensure no residual test teachers exist
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.teacher.deleteMany({ where: { email: { contains: 'atiqur' } } });
    await prisma.$disconnect();
  } catch {
    // ignore
  }

  const userDataDir = path.join(os.tmpdir(), 'chrome_nadc_phase4_' + Date.now());
  fs.mkdirSync(userDataDir, { recursive: true });

  const chromeProc = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--disable-gpu',
      '--window-size=1280,800',
    ],
    { stdio: 'ignore' }
  );

  let cdp = null;

  try {
    // Wait for Chrome remote debugging endpoint
    let target = null;
    for (let i = 0; i < 40; i++) {
      try {
        const targets = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
        if (Array.isArray(targets) && targets.length > 0) {
          const pageTarget = targets.find((t) => t.type === 'page');
          if (pageTarget && pageTarget.webSocketDebuggerUrl) {
            target = pageTarget;
            break;
          }
        }
      } catch {
        // wait for chrome to spin up
      }
      await sleep(250);
    }

    if (!target) {
      throw new Error('Could not connect to Chrome debugging endpoint on port ' + PORT);
    }

    console.log('[Browser] Connected to Google Chrome instance');
    cdp = new CDPClient(target.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    // 1. Test unauthenticated /admin/teachers navigation (expect redirect to /admin/login)
    console.log('\n[1/8] Testing Unauthenticated /admin/teachers Navigation...');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/admin/teachers` });
    await sleep(2000);

    let currentUrl = await cdp.eval('window.location.href');
    console.log('  Current URL after unauthenticated request:', currentUrl);
    if (!currentUrl.includes('/admin/login')) {
      throw new Error(`Expected redirect to /admin/login, got: ${currentUrl}`);
    }
    console.log('  ✓ Unauthenticated access to /admin/teachers redirected to /admin/login');

    // 2. Perform Main Admin Login
    console.log('\n[2/8] Logging in as Main Admin...');
    // Ensure form is rendered and hydrated
    for (let i = 0; i < 20; i++) {
      const ready = await cdp.eval('Boolean(document.querySelector("#username") && document.querySelector("#password"))');
      if (ready) break;
      await sleep(200);
    }

    const inputValues = await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const u = document.querySelector("#username");
        const p = document.querySelector("#password");
        if (!u || !p) return { error: 'Inputs not found' };

        setReactInput(u, 'admin');
        setReactInput(p, 'CollegeAdmin2026!');

        const form = document.querySelector("form");
        if (!form) return { error: 'Form not found' };
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
        if (submitBtn) {
          submitBtn.click();
          return { submitted: true, uVal: u.value, pVal: p.value ? '***' : '' };
        }
        return { error: 'Submit button not found' };
      })()
    `);
    console.log('  Form Submission Action:', inputValues);

    // Wait for redirect to /admin
    for (let i = 0; i < 25; i++) {
      await sleep(300);
      currentUrl = await cdp.eval('window.location.href');
      if (currentUrl.endsWith('/admin') || currentUrl.includes('/admin/teachers')) {
        break;
      }
    }

    const alertOnPage = await cdp.eval('document.querySelector("[role=\'alert\']")?.innerText');
    if (alertOnPage) console.log('  Alert on page:', alertOnPage);

    console.log('  Current URL after login:', currentUrl);
    if (!currentUrl.includes('/admin') || currentUrl.includes('/admin/login')) {
      throw new Error(`Expected login redirect to /admin, got: ${currentUrl}`);
    }
    console.log('  ✓ Main Admin logged in and redirected');

    // 3. Inspect Dashboard Navigation & Teacher Module Link
    console.log('\n[3/8] Inspecting Dashboard for Active Teacher Management Module...');
    const hasTeacherModule = await cdp.eval('Boolean(document.querySelector("a[href=\'/admin/teachers\']"))');
    console.log('  Teacher Module Link (/admin/teachers) Present:', hasTeacherModule);
    if (!hasTeacherModule) {
      throw new Error('Teacher Module Link (/admin/teachers) not found on dashboard');
    }
    const teacherCardText = await cdp.eval(`
      document.querySelector("a[href='/admin/teachers']")?.closest(".rounded-xl, .p-6")?.innerText
    `);
    console.log('  Teacher Card Details:', teacherCardText?.replace(/\\n/g, ' '));
    console.log('  ✓ Admin Dashboard shows active Teacher Management Module');

    // 4. Navigate to /admin/teachers on Desktop (1280x800)
    console.log('\n[4/8] Navigating to /admin/teachers in Desktop Viewport (1280x800)...');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/admin/teachers` });
    await sleep(2000);

    const teacherPageTitle = await cdp.eval('document.querySelector("h1")?.innerText');
    console.log('  Page Heading:', teacherPageTitle);
    const hasSearch = await cdp.eval('Boolean(document.querySelector("input[placeholder*=\'অনুসন্ধান\']"))');
    const hasRankFilter = await cdp.eval('Boolean(document.querySelector("select"))');
    const hasAddBtn = await cdp.eval('Boolean(document.querySelector("button:has(svg)"))');
    console.log('  Teacher Page Controls:', { hasSearch, hasRankFilter, hasAddBtn });

    // Check desktop overflow
    const desktopOverflow = await cdp.eval(`
      (() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      })()
    `);
    console.log('  Desktop Viewport Metrics:', desktopOverflow);
    if (desktopOverflow.hasHorizontalScroll) {
      throw new Error('Horizontal overflow detected on desktop /admin/teachers');
    }
    console.log('  ✓ Desktop layout fits perfectly without horizontal overflow');

    // 5. Open Create Teacher Modal and Submit Form
    console.log('\n[5/8] Testing Teacher Creation via Modal in Real Browser...');
    await cdp.eval(`
      (() => {
        const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('নতুন শিক্ষক যোগ'));
        if (addBtn) addBtn.click();
      })()
    `);
    await sleep(600);

    const isModalOpen = await cdp.eval('Boolean(document.querySelector("form"))');
    console.log('  Create Modal Open:', isModalOpen);
    if (!isModalOpen) {
      throw new Error('Create Teacher Modal did not open');
    }

    // Fill form fields
    const fillResult = await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const form = document.querySelector(".fixed form") || document.querySelector("form");
        if (!form) return { error: 'Modal form not found' };

        const formInputs = Array.from(form.querySelectorAll('input'));
        if (formInputs.length < 4) return { error: 'Insufficient form inputs', count: formInputs.length };

        // formInputs: [0]=nameBn, [1]=nameEn, [2]=designationBn, [3]=designationEn, [4]=departmentEn, [5]=departmentBn, [6]=email, [7]=phone, [8]=photoUrl
        setReactInput(formInputs[0], 'মোঃ আতিকুর রহমান');
        setReactInput(formInputs[1], 'Md. Atiqur Rahman');
        setReactInput(formInputs[2], 'সহকারী অধ্যাপক');
        setReactInput(formInputs[3], 'Assistant Professor');
        if (formInputs[4]) setReactInput(formInputs[4], 'Mathematics');
        if (formInputs[5]) setReactInput(formInputs[5], 'গণিত');
        if (formInputs[6]) setReactInput(formInputs[6], 'deb110882.atiqur@gmail.com');
        if (formInputs[7]) setReactInput(formInputs[7], '01719876543');

        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return { error: 'Submit button not found' };
        submitBtn.click();
        return {
          success: true,
          inputsCount: formInputs.length,
          nameBn: formInputs[0].value,
          nameEn: formInputs[1].value,
          desBn: formInputs[2].value,
          desEn: formInputs[3].value,
          email: formInputs[6]?.value,
          phone: formInputs[7]?.value,
        };
      })()
    `);
    console.log('  Form Fill & Submit Result:', fillResult);
    await sleep(2500);

    const feedbackBanner = await cdp.eval('document.querySelector(".p-4.rounded-xl")?.innerText');
    if (feedbackBanner) console.log('  Feedback Banner:', feedbackBanner);

    const newTeacherExists = await cdp.eval(`
      Boolean(document.body.innerText.includes('Md. Atiqur Rahman'))
    `);
    console.log('  New Teacher Appears in Directory:', newTeacherExists);
    if (!newTeacherExists) {
      throw new Error('Newly created teacher did not appear in directory');
    }
    console.log('  ✓ Teacher created successfully and rendered in browser DOM');

    // 6. Test Clickable Email & Phone Links
    console.log('\n[6/8] Verifying Clickable mailto: and tel: Contact Links...');
    const mailtoHref = await cdp.eval('document.querySelector("a[href^=\'mailto:\']")?.getAttribute("href")');
    const telHref = await cdp.eval('document.querySelector("a[href^=\'tel:\']")?.getAttribute("href")');
    console.log('  Found Mail Link:', mailtoHref);
    console.log('  Found Phone Link:', telHref);
    if (!mailtoHref || !mailtoHref.includes('deb110882.atiqur@gmail.com')) {
      throw new Error(`Expected mailto: link for teacher, got: ${mailtoHref}`);
    }
    if (!telHref || !telHref.includes('01719876543')) {
      throw new Error(`Expected tel: link for teacher, got: ${telHref}`);
    }
    console.log('  ✓ Both mailto: and tel: links are functional and properly formatted');

    // 7. Mobile Viewport Emulation (375x667)
    console.log('\n[7/8] Emulating Mobile Viewport (375x667 iPhone SE)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(1000);

    const mobileMetrics = await cdp.eval(`
      (() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          hasMobileCard: Boolean(document.querySelector(".block.md\\\\:hidden, .space-y-3")),
          hasMobilePhoneLink: Boolean(document.querySelector("a[href^='tel:']")),
          hasMobileMailLink: Boolean(document.querySelector("a[href^='mailto:']")),
        };
      })()
    `);
    console.log('  Mobile Viewport Metrics:', mobileMetrics);
    if (mobileMetrics.hasHorizontalScroll) {
      throw new Error(`Horizontal overflow on mobile: scrollWidth=${mobileMetrics.scrollWidth}, clientWidth=${mobileMetrics.clientWidth}`);
    }
    console.log('  ✓ Mobile layout rendered cleanly with zero horizontal overflow');

    // 8. Delete Teacher & Teardown
    console.log('\n[8/8] Deleting Test Teacher Record & Verifying Teardown...');
    // Reset to desktop viewport for clean interactions
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(800);

    // Click delete button
    const openDelResult = await cdp.eval(`
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const delBtn = btns.find(b =>
          b.getAttribute('title')?.includes('Delete') ||
          b.getAttribute('title')?.includes('মুছে') ||
          b.innerText.includes('ডিলিট')
        );
        if (delBtn) {
          delBtn.click();
          return { found: true };
        }
        return { found: false, totalButtons: btns.length };
      })()
    `);
    console.log('  Open Delete Modal Action:', openDelResult);
    await sleep(800);

    // Confirm deletion in modal
    const confirmResult = await cdp.eval(`
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const confirmBtn = btns.find(b =>
          b.innerText.includes('স্থায়ীভাবে মুছে ফেলুন') ||
          b.innerText.includes('Confirm Delete')
        );
        if (confirmBtn) {
          confirmBtn.click();
          return { confirmed: true };
        }
        return { confirmed: false, totalButtons: btns.length };
      })()
    `);
    console.log('  Confirm Deletion Action:', confirmResult);
    await sleep(2500);

    const teacherStillExists = await cdp.eval(`
      Boolean(document.body.innerText.includes('Md. Atiqur Rahman'))
    `);
    console.log('  Teacher record still in DOM after delete:', teacherStillExists);
    if (teacherStillExists) {
      throw new Error('Teacher record was not removed after confirmation');
    }
    console.log('  ✓ Teacher record deleted cleanly');

    // Logout
    console.log('\n[Done] Logging out from Admin Portal...');
    await cdp.eval(`
      (() => {
        const logoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('লগআউট'));
        if (logoutBtn) logoutBtn.click();
      })()
    `);
    await sleep(2000);

    currentUrl = await cdp.eval('window.location.href');
    console.log('  Final URL after logout:', currentUrl);
    if (!currentUrl.includes('/admin/login')) {
      throw new Error(`Expected redirect to /admin/login after logout, got: ${currentUrl}`);
    }
    console.log('  ✓ Logout successful and redirected to /admin/login');

    console.log('\n================================================================');
    console.log(' 🎉 ALL LIVE REAL BROWSER TESTS PASSED (100% SUCCESS)');
    console.log('================================================================\n');
  } finally {
    if (cdp) cdp.close();
    chromeProc.kill('SIGKILL');
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
}

runBrowserAudit().catch((err) => {
  console.error('\n❌ Real Browser Verification Failed:', err);
  process.exit(1);
});
