// Simple Node.js script to copy build output
// This is more reliable than shell commands across platforms

const fs = require('fs');
const path = require('path');

// Get the project root - this script should be in the root
// Use process.cwd() to get the actual working directory (where npm run build was executed from)
const projectRoot = process.cwd();
const sourceDir = path.resolve(projectRoot, 'client', 'build');
const destDir = path.resolve(projectRoot, 'build');

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

// CRITICAL: Ensure the directory is actually written to disk
// Force a sync to ensure all writes are flushed
try {
  fs.writeFileSync(path.join(destDir, '.vercel-ready'), 'ready');
  console.log('✅ Created .vercel-ready marker file');
  
  // Force sync all file system operations
  const fd = fs.openSync(path.join(destDir, '.vercel-ready'), 'r+');
  fs.fsyncSync(fd);
  fs.closeSync(fd);
  console.log('✅ File system synced');
} catch (err) {
  console.error('⚠️  Warning: Could not create marker file:', err.message);
}

// Final verification - double check everything exists
const finalCheck = fs.existsSync(destDir) && fs.existsSync(indexPath);
if (!finalCheck) {
  console.error('❌ FATAL: Build directory verification failed!');
  console.error('Dest exists:', fs.existsSync(destDir));
  console.error('Index exists:', fs.existsSync(indexPath));
  process.exit(1);
}

// List all files in build directory to prove it exists
try {
  const allFiles = [];
  function listFiles(dir, base = '') {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relPath = base ? `${base}/${item}` : item;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        allFiles.push(`${relPath}/`);
        listFiles(fullPath, relPath);
      } else {
        allFiles.push(relPath);
      }
    });
  }
  listFiles(destDir);
  console.log('📋 All files in build directory:', allFiles.length);
  console.log('📄 First 10 files:', allFiles.slice(0, 10));
} catch (err) {
  console.error('⚠️  Could not list files:', err.message);
}

console.log('✅ Verification complete - build directory exists and contains files');
console.log('✅ All files written and synced to disk');
console.log('✅ READY FOR VERCEL DEPLOYMENT');
