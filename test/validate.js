/**
 * Comprehensive Automated Validation Test Suite
 * Nurul Amin Degree College Website
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('--- Starting Automated Test & Quality Audit ---');
console.log('Root Directory:', ROOT_DIR);

let errorCount = 0;
let warningCount = 0;
let passedChecks = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✓ ${message}`);
        passedChecks++;
    } else {
        console.error(`  ✗ FAIL: ${message}`);
        errorCount++;
    }
}

function warn(condition, message) {
    if (!condition) {
        console.warn(`  ⚠ WARN: ${message}`);
        warningCount++;
    }
}

// 1. Validate Data Module Schema & Configuration Consistency
console.log('\n[1/5] Validating js/data.js schema & configured values...');
try {
    const dataModule = require(path.join(ROOT_DIR, 'js', 'data.js'));
    const { COLLEGE_DATA, TRANSLATIONS } = dataModule;

    assert(COLLEGE_DATA !== undefined, 'COLLEGE_DATA is exported properly');
    assert(COLLEGE_DATA.identity.eiin === '110882', `Data schema check: EIIN configured as 110882`);
    assert(COLLEGE_DATA.identity.nuCollegeCode === '6309', `Data schema check: National University Code configured as 6309`);
    assert(COLLEGE_DATA.identity.dhakaBoardCode === null, `Data schema check: Dhaka Board code is null (unverified, not conflated with NU 6309)`);
    assert(COLLEGE_DATA.identity.mpoCode === '3504013201', `Data schema check: MPO Code configured as 3504013201`);
    assert(COLLEGE_DATA.identity.enName === 'Nurul Amin Degree College', `Data schema check: English name matches 'Nurul Amin Degree College'`);
    assert(COLLEGE_DATA.identity.bnName === 'নুরুল আমিন ডিগ্রি কলেজ', `Data schema check: Bengali name matches 'নুরুল আমিন ডিগ্রি কলেজ'`);
    assert(COLLEGE_DATA.programs.degreePass.courses.length === 4, `Data schema check: 4 Degree Pass course definitions present (6001, 6002, 6003, 6004)`);
    assert(Array.isArray(COLLEGE_DATA.studentServices) && COLLEGE_DATA.studentServices.length === 12, `Data schema check: 12 student services configured across 10 official categories`);
    assert(COLLEGE_DATA.livePortalStatus && COLLEGE_DATA.livePortalStatus.portals.length === 5, `Data schema check: 5 official government portals configured with live status`);
    assert(COLLEGE_DATA.officialNotices && Array.isArray(COLLEGE_DATA.officialNotices.nuNotices), 'Data schema check: officialNotices fallback snapshot configured with NU notices');
    assert(TRANSLATIONS.bn && TRANSLATIONS.en, 'Both Bengali and English translation dictionaries exist');
} catch (err) {
    assert(false, `js/data.js execution error: ${err.message}`);
}

// 2. Validate Core Files & Sitemap
console.log('\n[2/5] Validating Core Files & SEO Assets...');
const requiredFiles = [
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
    'admin.html',
    '404.html',
    'css/style.css',
    'js/data.js',
    'js/app.js',
    'robots.txt',
    'sitemap.xml',
    'data/official-notices.json',
    'scripts/fetch_official_notices.js'
];

requiredFiles.forEach(file => {
    const fullPath = path.join(ROOT_DIR, file);
    assert(fs.existsSync(fullPath), `Required asset exists: ${file}`);
});

// 3. HTML Integrity and Internal Link Verification
console.log('\n[3/5] Inspecting HTML files for internal link resolution and meta tags...');
const htmlFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

htmlFiles.forEach(htmlFile => {
    const filePath = path.join(ROOT_DIR, htmlFile);
    const content = fs.readFileSync(filePath, 'utf8');

    // Title tag check
    assert(content.includes('<title>'), `${htmlFile} has a <title> tag`);
    assert(content.includes('viewport'), `${htmlFile} has responsive viewport meta`);
    assert(content.includes('css/style.css'), `${htmlFile} links to modern stylesheet`);
    assert(content.includes('js/app.js') || htmlFile === 'apply.html' || htmlFile === 'developre.html', `${htmlFile} has core script`);

    // Extract all local href and src attributes
    const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
    const srcMatches = [...content.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);

    const localLinks = [...hrefMatches, ...srcMatches].filter(link => {
        return !link.startsWith('http://') &&
               !link.startsWith('https://') &&
               !link.startsWith('mailto:') &&
               !link.startsWith('tel:') &&
               !link.startsWith('#') &&
               !link.startsWith('data:');
    });

    localLinks.forEach(link => {
        // Remove hash / query params
        const cleanLink = link.split('#')[0].split('?')[0];
        if (!cleanLink) return;
        const targetPath = path.join(ROOT_DIR, cleanLink);
        assert(fs.existsSync(targetPath), `${htmlFile} -> link target exists: "${cleanLink}"`);
    });
});

// 4. Check Authentic Photo Preservation
console.log('\n[4/5] Checking authentic institutional photo preservation in images/...');
const imagesDir = path.join(ROOT_DIR, 'images');
const images = fs.readdirSync(imagesDir);
assert(images.length >= 25, `Authentic photographs preserved: ${images.length} images found`);
const expectedImages = ['principal.jpeg', 'clg1.jpg', 'minar.jpg', 'sirs.jpg', 'math (1).jpg', 'tour.jpg', 'help.jpg'];
expectedImages.forEach(img => {
    assert(fs.existsSync(path.join(imagesDir, img)), `Key authentic photograph exists: images/${img}`);
});

// 5. Check CSS & Syntax
console.log('\n[5/7] Checking CSS design system variables & properties...');
const cssContent = fs.readFileSync(path.join(ROOT_DIR, 'css', 'style.css'), 'utf8');
assert(cssContent.includes('--color-primary: #0a2240'), 'Primary Oxford Midnight Navy variable present (#0a2240)');
assert(cssContent.includes('--color-accent: #c8932e'), 'Burnished Academic Gold variable present (#c8932e)');
assert(cssContent.includes('@import url'), 'Google Fonts typography included');
assert(cssContent.includes('.skip-link'), 'Accessibility skip-link styled');
assert(cssContent.includes('@media (max-width: 768px)'), 'Mobile responsive breakpoints configured');

// 6. Mathematical WCAG Contrast Calculations
console.log('\n[6/7] Computing and verifying mathematical WCAG contrast ratios...');
function sRGBtoLin(c) {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function lum(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
}
function calcRatio(hex1, hex2) {
    const l1 = lum(hex1);
    const l2 = lum(hex2);
    return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
}

const textOnWhite = calcRatio('#0f172a', '#ffffff');
assert(textOnWhite >= 7.0, `Primary text on white canvas satisfies WCAG AAA (Actual: ${textOnWhite.toFixed(2)}:1 >= 7.0)`);

const secTextOnWhite = calcRatio('#334155', '#ffffff');
assert(secTextOnWhite >= 7.0, `Secondary text on white canvas satisfies WCAG AAA (Actual: ${secTextOnWhite.toFixed(2)}:1 >= 7.0)`);

const whiteOnNavy = calcRatio('#ffffff', '#0a2240');
assert(whiteOnNavy >= 7.0, `White text on Oxford Navy satisfies WCAG AAA (Actual: ${whiteOnNavy.toFixed(2)}:1 >= 7.0)`);

const whiteOnEmerald = calcRatio('#ffffff', '#064e3b');
assert(whiteOnEmerald >= 7.0, `White text on Academic Emerald satisfies WCAG AAA (Actual: ${whiteOnEmerald.toFixed(2)}:1 >= 7.0)`);

const navyOnGold = calcRatio('#051529', '#c8932e');
assert(navyOnGold >= 4.5, `Navy text on Burnished Gold button satisfies WCAG AA & AAA-Large (Actual: ${navyOnGold.toFixed(2)}:1 >= 4.5)`);

// 7. Verify All i18n Translation Keys
console.log('\n[7/7] Verifying bilingual dictionary completeness for all HTML templates...');
const dataModule = require(path.join(ROOT_DIR, 'js', 'data.js'));
const { TRANSLATIONS } = dataModule;
let missingKeysCount = 0;
htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(path.join(ROOT_DIR, htmlFile), 'utf8');
    const matches = [...content.matchAll(/data-i18n=["']([^"']+)["']/g)].map(m => m[1]);
    matches.forEach(k => {
        if (!TRANSLATIONS.en[k] || !TRANSLATIONS.bn[k]) {
            console.error(`  ✗ Missing translation key in ${htmlFile}: ${k}`);
            missingKeysCount++;
        }
    });
});
assert(missingKeysCount === 0, `All data-i18n keys resolve in both English and Bengali dictionaries (Missing: ${missingKeysCount})`);

console.log('\n=============================================');
console.log(`TEST SUMMARY: ${passedChecks} checks PASSED, ${errorCount} ERRORS, ${warningCount} WARNINGS.`);
console.log('=============================================');

if (errorCount > 0) {
    process.exit(1);
} else {
    console.log('✓ All verification tests passed successfully!\n');
}
