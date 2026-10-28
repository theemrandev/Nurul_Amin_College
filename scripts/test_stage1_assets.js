/**
 * Stage 1 Asset Verification Script
 * Validates that all authentic photographs in images/ have been non-destructively
 * copied to public/images/ and match bit-for-bit using SHA-256 checksums.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, 'images');
const TARGET_DIR = path.join(ROOT_DIR, 'public', 'images');

function getSha256(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

console.log('--- Starting Stage 1 Asset Verification ---');
console.log('Source Directory:', SOURCE_DIR);
console.log('Target Directory:', TARGET_DIR);

if (!fs.existsSync(TARGET_DIR)) {
    console.error('FAIL: Target directory does not exist:', TARGET_DIR);
    process.exit(1);
}

const sourceFiles = fs.readdirSync(SOURCE_DIR).filter(file => {
    return fs.statSync(path.join(SOURCE_DIR, file)).isFile();
});

console.log(`Found ${sourceFiles.length} source images in images/.`);

let matchedCount = 0;
let errors = [];

for (const fileName of sourceFiles) {
    const sourceFilePath = path.join(SOURCE_DIR, fileName);
    const targetFilePath = path.join(TARGET_DIR, fileName);

    if (!fs.existsSync(targetFilePath)) {
        errors.push(`Missing copied file: public/images/${fileName}`);
        continue;
    }

    const sourceHash = getSha256(sourceFilePath);
    const targetHash = getSha256(targetFilePath);

    if (sourceHash !== targetHash) {
        errors.push(`Checksum mismatch for ${fileName}: expected ${sourceHash}, got ${targetHash}`);
    } else {
        matchedCount++;
    }
}

console.log(`Verified ${matchedCount} / ${sourceFiles.length} photographs with exact SHA-256 matches.`);

if (errors.length > 0) {
    console.error('FAIL: Errors found during asset verification:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
}

console.log('SUCCESS: All authentic campus photographs preserved and verified.');
process.exit(0);
