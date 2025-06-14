#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 MathMotion Setup Checker\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('   Run: cp env.example .env.local');
  process.exit(1);
}

// Read environment variables
require('dotenv').config({ path: envPath });

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GEMINI_API_KEY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

let allSet = true;

console.log('Environment Variables Check:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== `your-${varName.toLowerCase().replace('_', '-')}-here` && value !== 'your-nextauth-secret-here') {
    console.log(`✅ ${varName}`);
  } else {
    console.log(`❌ ${varName} - Not set or using placeholder`);
    allSet = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allSet) {
  console.log('🎉 All environment variables are configured!');
  console.log('🚀 Ready to run: npm run dev');
} else {
  console.log('⚠️  Please configure the missing environment variables');
  console.log('📖 Check README.md for setup instructions');
}

console.log('\n🔗 Quick Links:');
console.log('   Google Cloud Console: https://console.cloud.google.com/');
console.log('   Google AI Studio: https://makersuite.google.com/app/apikey');
console.log('   Cloudinary: https://cloudinary.com/'); 