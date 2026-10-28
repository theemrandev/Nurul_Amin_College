/**
 * Secure Initial Main Administrator Provisioning CLI Script
 * Nurul Amin Degree College Portal
 *
 * Rules:
 * - Exactly ONE Main Administrator is permitted.
 * - Prevents accidental duplicate Main Admin provisioning.
 * - Accepts credentials via environment variables or interactive prompt.
 * - Never prints or logs plain passwords.
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');
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

function askQuestion(query, isPassword = false) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    if (isPassword) {
      // In interactive terminal, capture password
      process.stdout.write(query);
      let password = '';
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', function onData(char) {
          const charStr = char.toString('utf8');
          if (charStr === '\n' || charStr === '\r' || charStr === '\u0004') {
            process.stdin.setRawMode(false);
            process.stdin.pause();
            process.stdin.removeListener('data', onData);
            process.stdout.write('\n');
            rl.close();
            resolve(password);
          } else if (charStr === '\u0008' || charStr === '\x7f') {
            if (password.length > 0) {
              password = password.slice(0, -1);
              process.stdout.write('\b \b');
            }
          } else if (charStr === '\u0003') {
            process.exit(1);
          } else {
            password += charStr;
            process.stdout.write('*');
          }
        });
      } else {
        rl.question('', (ans) => {
          rl.close();
          resolve(ans.trim());
        });
      }
    } else {
      rl.question(query, (ans) => {
        rl.close();
        resolve(ans.trim());
      });
    }
  });
}

async function provisionMainAdmin() {
  console.log('\n======================================================');
  console.log(' Nurul Amin Degree College - Main Admin Provisioning');
  console.log('======================================================\n');

  try {
    // 1. Guard against duplicate Main Admin creation
    const existingMainAdmin = await prisma.user.findFirst({
      where: { role: 'MAIN_ADMIN' },
    });

    if (existingMainAdmin) {
      console.error(
        '✘ [SECURITY GUARD] A Main Administrator already exists in the system:\n' +
        `  ID: ${existingMainAdmin.id}\n` +
        `  Username: ${existingMainAdmin.username}\n` +
        `  Name: ${existingMainAdmin.name}\n\n` +
        'Operation aborted. System policy strictly permits only ONE Main Administrator.\n'
      );
      process.exit(1);
    }

    // 2. Read parameters from environment or interactive prompt
    let name = process.env.MAIN_ADMIN_NAME;
    let username = process.env.MAIN_ADMIN_USERNAME;
    let email = process.env.MAIN_ADMIN_EMAIL;
    let password = process.env.MAIN_ADMIN_PASSWORD;

    if (!name) {
      name = await askQuestion('Enter Full Name: ');
    }
    if (!username) {
      username = await askQuestion('Enter Username: ');
    }
    if (email === undefined && !process.env.MAIN_ADMIN_PASSWORD) {
      email = await askQuestion('Enter Email (optional, press Enter to skip): ');
    }
    if (!password) {
      password = await askQuestion('Enter Password (min 8 chars): ', true);
    }

    name = name ? name.trim() : '';
    username = username ? username.trim().toLowerCase() : '';
    email = email && email.trim() ? email.trim().toLowerCase() : null;

    if (!name || name.length < 2) {
      console.error('✘ Error: Name must be at least 2 characters long.');
      process.exit(1);
    }

    if (!username || !/^[a-zA-Z0-9_.-]{3,30}$/.test(username)) {
      console.error('✘ Error: Username must be 3-30 characters alphanumeric (letters, numbers, hyphens, underscores).');
      process.exit(1);
    }

    if (!password || password.length < 8) {
      console.error('✘ Error: Password must be at least 8 characters long.');
      process.exit(1);
    }

    // Check if username taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.error(`✘ Error: The username "${username}" is already taken.`);
      process.exit(1);
    }

    // Hash password
    console.log('\n[1/2] Generating cryptographic bcrypt hash (salt work factor 12)...');
    const passwordHash = await bcrypt.hash(password, 12);

    // Create Main Admin
    console.log('[2/2] Registering Main Administrator record in database...');
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
        role: 'MAIN_ADMIN',
        isActive: true,
      },
    });

    console.log('\n✔ SUCCESS: Initial Main Administrator successfully provisioned!');
    console.log(`  Account ID : ${user.id}`);
    console.log(`  Username   : ${user.username}`);
    console.log(`  Name       : ${user.name}`);
    console.log(`  Role       : ${user.role}`);
    console.log(`  Created At : ${user.createdAt.toISOString()}`);
    console.log('\nYou can now log in at http://localhost:3000/admin/login\n');
  } catch (err) {
    console.error('✘ Unexpected error during provisioning:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

provisionMainAdmin();
