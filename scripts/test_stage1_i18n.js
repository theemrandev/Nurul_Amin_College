/**
 * Stage 1 Bilingual Dictionary Parity Test
 * Verifies that all keys in src/locales/bn.json and src/locales/en.json match 1:1,
 * have non-empty string values, and contain the required draft metadata header.
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.resolve(__dirname, '..', 'src', 'locales');
const BN_FILE = path.join(LOCALES_DIR, 'bn.json');
const EN_FILE = path.join(LOCALES_DIR, 'en.json');

console.log('--- Starting Stage 1 Bilingual Dictionary Parity Test ---');

if (!fs.existsSync(BN_FILE) || !fs.existsSync(EN_FILE)) {
    console.error('FAIL: Locale dictionary files missing.');
    process.exit(1);
}

const bn = JSON.parse(fs.readFileSync(BN_FILE, 'utf-8'));
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

const bnKeys = Object.keys(bn);
const enKeys = Object.keys(en);

console.log(`Loaded Bengali dictionary: ${bnKeys.length} keys.`);
console.log(`Loaded English dictionary: ${enKeys.length} keys.`);

let errors = [];

// 1. Check metadata
if (!bn._meta || bn._meta.status !== 'DRAFT_PENDING_CONFIRMATION') {
    errors.push('bn.json is missing DRAFT_PENDING_CONFIRMATION metadata.');
}
if (!en._meta || en._meta.status !== 'DRAFT_PENDING_CONFIRMATION') {
    errors.push('en.json is missing DRAFT_PENDING_CONFIRMATION metadata.');
}

// 2. Check keys in bn exist in en
for (const key of bnKeys) {
    if (en[key] === undefined) {
        errors.push(`Key "${key}" exists in bn.json but is missing in en.json`);
    } else if (key !== '_meta' && (typeof bn[key] !== 'string' || bn[key].trim() === '')) {
        errors.push(`Key "${key}" in bn.json has an empty or invalid string value.`);
    }
}

// 3. Check keys in en exist in bn
for (const key of enKeys) {
    if (bn[key] === undefined) {
        errors.push(`Key "${key}" exists in en.json but is missing in bn.json`);
    } else if (key !== '_meta' && (typeof en[key] !== 'string' || en[key].trim() === '')) {
        errors.push(`Key "${key}" in en.json has an empty or invalid string value.`);
    }
}

if (errors.length > 0) {
    console.error('FAIL: Parity test failed with the following issues:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
}

console.log(`SUCCESS: 100% dictionary parity verified across all ${bnKeys.length} keys.`);
process.exit(0);
