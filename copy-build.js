// Simple Node.js script to copy build output
// This is more reliable than shell commands across platforms

const fs = require('fs');
const path = require('path');

// Get the project root - this script should be in the root
const projectRoot = __dirname;
const sourceDir = path.join(projectRoot, 'client', 'build');
const destDir = path.join(projectRoot, 'build');

console.log('📦 Copy build script starting...');
console.log('Project root:', projectRoot);
console.log('Source:', sourceDir);
console.log('Destination:', destDir);
console.log('Current working directory:', process.cwd());
console.log('Source exists:', fs.existsSync(sourceDir));

// Check if source exists
if (!fs.existsSync(sourceDir)) {
  console.error('❌ Source directory does not exist:', sourceDir);
  process.exit(1);
}

// Remove destination if it exists
if (fs.existsSync(destDir)) {
  console.log('🗑️  Removing existing build directory...');
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Create destination directory
console.log('📁 Creating build directory...');
fs.mkdirSync(destDir, { recursive: true });

// Copy function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy everything
console.log('📋 Copying files...');
copyRecursiveSync(sourceDir, destDir);

// Verify the copy
if (!fs.existsSync(destDir)) {
  console.error('❌ ERROR: Build directory was not created!');
  process.exit(1);
}

const destFiles = fs.readdirSync(destDir);
console.log('✅ Successfully copied client/build to build/');
console.log('📊 Files in build directory:', destFiles.length);
console.log('📄 Sample files:', destFiles.slice(0, 5));

// Ensure index.html exists
const indexPath = path.join(destDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ ERROR: index.html not found in build directory!');
  process.exit(1);
}

// Final verification - list the absolute path
console.log('✅ Build directory is ready for deployment');
console.log('📍 Absolute path to build directory:', path.resolve(destDir));
console.log('✅ Verification complete - build directory exists and contains files');
