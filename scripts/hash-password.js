#!/usr/bin/env node

/**
 * Password Hash Generator
 * 
 * Usage: node scripts/hash-password.js [password]
 * 
 * Generates a bcrypt hash for the admin password that can be used
 * in the ADMIN_PASSWORD_HASH environment variable.
 */

const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = process.argv[2];
  
  if (!password) {
    console.error('Usage: node scripts/hash-password.js <password>');
    console.error('Example: node scripts/hash-password.js mySecurePassword123');
    process.exit(1);
  }
  
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n🔐 Password Hash Generated Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Hash: ${hash}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📝 Add this to your environment variables:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n⚠️  Security Notes:');
    console.log('• Remove ADMIN_PASSWORD from your environment when using hash');
    console.log('• Keep this hash secure and never commit it to version control');
    console.log('• The hash is one-way - you cannot recover the original password');
    console.log('\n✅ Your admin system will now use secure password hashing!');
    
  } catch (error) {
    console.error('❌ Error generating hash:', error.message);
    process.exit(1);
  }
}

hashPassword();
