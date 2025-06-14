#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function checkPython() {
  try {
    const { stdout } = await execAsync('python3 --version');
    console.log('✅ Python3 found:', stdout.trim());
    return true;
  } catch {
    try {
      const { stdout } = await execAsync('python --version');
      console.log('✅ Python found:', stdout.trim());
      return true;
    } catch {
      console.log('❌ Python not found. Please install Python 3.8+ first.');
      return false;
    }
  }
}

async function checkPip() {
  try {
    await execAsync('pip3 --version');
    console.log('✅ pip3 found');
    return 'pip3';
  } catch {
    try {
      await execAsync('pip --version');
      console.log('✅ pip found');
      return 'pip';
    } catch {
      console.log('❌ pip not found. Please install pip first.');
      return null;
    }
  }
}

async function checkManim() {
  try {
    const { stdout } = await execAsync('manim --version');
    console.log('✅ Manim already installed:', stdout.trim());
    return true;
  } catch {
    console.log('⚠️  Manim not found, will install...');
    return false;
  }
}

async function installManim(pipCommand) {
  console.log('📦 Installing Manim...');
  console.log('This may take a few minutes...');
  
  try {
    // Install Manim with dependencies
    const { stdout, stderr } = await execAsync(`${pipCommand} install manim`, {
      timeout: 300000, // 5 minutes timeout
    });
    
    console.log('✅ Manim installed successfully!');
    if (stdout) console.log('Install output:', stdout);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to install Manim:', error.message);
    console.log('\n🔧 Manual installation instructions:');
    console.log('1. Install Python 3.8+ if not already installed');
    console.log('2. Run: pip install manim');
    console.log('3. For more details: https://docs.manim.community/en/stable/installation.html');
    
    return false;
  }
}

async function testManim() {
  console.log('🧪 Testing Manim installation...');
  
  const testCode = `
from manim import *

class TestScene(Scene):
    def construct(self):
        text = Text("Manim Test", font_size=48)
        self.play(Write(text))
        self.wait(1)
`;

  const fs = require('fs');
  const path = require('path');
  
  try {
    // Create test file
    const testFile = path.join(__dirname, 'manim_test.py');
    fs.writeFileSync(testFile, testCode);
    
    // Run test
    await execAsync(`manim -pql ${testFile} TestScene`, {
      timeout: 60000, // 1 minute timeout
    });
    
    console.log('✅ Manim test successful!');
    
    // Cleanup
    fs.unlinkSync(testFile);
    
    return true;
  } catch (error) {
    console.error('❌ Manim test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 MathMotion Manim Setup\n');
  
  // Check Python
  const hasPython = await checkPython();
  if (!hasPython) {
    process.exit(1);
  }
  
  // Check pip
  const pipCommand = await checkPip();
  if (!pipCommand) {
    process.exit(1);
  }
  
  // Check if Manim is already installed
  const hasManim = await checkManim();
  
  if (!hasManim) {
    // Install Manim
    const installed = await installManim(pipCommand);
    if (!installed) {
      process.exit(1);
    }
  }
  
  // Test Manim
  const testPassed = await testManim();
  
  if (testPassed) {
    console.log('\n🎉 Manim setup complete!');
    console.log('✅ Your MathMotion app can now generate real videos!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure your environment variables are set');
    console.log('2. Run: npm run dev');
    console.log('3. Generate your first video!');
  } else {
    console.log('\n⚠️  Manim installed but test failed.');
    console.log('Please check the installation manually.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkManim, installManim }; 