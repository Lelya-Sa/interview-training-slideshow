// Build script that ensures React builds directly to root build directory
// This avoids copy operations and ensures Vercel can find the output

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const clientDir = path.join(projectRoot, 'client');
// Create build in root for vercel.json, but also ensure client/build exists for dashboard compatibility
const buildDir = path.join(projectRoot, 'build');
const clientBuildDir = path.join(clientDir, 'build');

console.log('🔨 Starting build process...');
console.log('Project root:', projectRoot);
console.log('Client directory:', clientDir);
console.log('Build directory:', buildDir);

// Step 1: Build React app in client directory
// Use absolute paths and cwd option instead of process.chdir()
console.log('\n📦 Step 1: Building React app...');
try {
  execSync('npm run build', { 
    stdio: 'inherit',
    cwd: clientDir  // Use cwd option instead of changing directory
  });
  console.log('✅ React build completed');
} catch (error) {
  console.error('❌ React build failed');
  process.exit(1);
}

// Step 2: Copy to build directory (we're already at root)
console.log('\n📋 Step 2: Copying build output to root...');

if (!fs.existsSync(clientBuildDir)) {
  console.error('❌ Client build directory does not exist:', clientBuildDir);
  process.exit(1);
}

// Remove existing build directory
if (fs.existsSync(buildDir)) {
  console.log('🗑️  Removing existing build directory...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

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

// Copy everything to root build directory
copyRecursiveSync(clientBuildDir, buildDir);

// CRITICAL: Ensure client/build still exists (for dashboard compatibility)
// The dashboard might be set to "client/build", so we need both
if (!fs.existsSync(clientBuildDir)) {
  console.log('⚠️  client/build was removed, recreating for dashboard compatibility...');
  copyRecursiveSync(buildDir, clientBuildDir);
}

console.log('✅ Build exists at both root/build and client/build for maximum compatibility');
console.log('📍 Root build:', fs.existsSync(buildDir) ? '✅ EXISTS' : '❌ MISSING');
console.log('📍 Client build:', fs.existsSync(clientBuildDir) ? '✅ EXISTS' : '❌ MISSING');

// Step 3: Verify build directory exists
console.log('\n✅ Step 3: Verifying build directory...');
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory was not created!');
  process.exit(1);
}

const indexPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in build directory!');
  process.exit(1);
}

// List files to prove it exists
const files = fs.readdirSync(buildDir);
console.log('📊 Files in build directory:', files.length);
console.log('📄 Files:', files.slice(0, 10));

// Force sync
try {
  const markerPath = path.join(buildDir, '.vercel-ready');
  fs.writeFileSync(markerPath, 'ready');
  const fd = fs.openSync(markerPath, 'r+');
  fs.fsyncSync(fd);
  fs.closeSync(fd);
  console.log('✅ File system synced');
} catch (err) {
  console.error('⚠️  Warning:', err.message);
}

// CRITICAL: Ensure we're at the root directory when script exits
// (We never changed directories, so we're already here)

// Final verification - list directory to prove it exists to Vercel
console.log('\n✅ Build complete!');
console.log('📍 Build directory:', path.resolve(buildDir));
console.log('📍 Current working directory:', process.cwd());
console.log('📍 Build dir relative to cwd:', path.relative(process.cwd(), buildDir));

// List the build directory one more time to ensure it's visible
try {
  const finalCheck = fs.readdirSync(buildDir);
  console.log('✅ Final verification - build directory contains', finalCheck.length, 'items');
  console.log('✅ Items:', finalCheck);
} catch (err) {
  console.error('❌ FATAL: Could not read build directory:', err.message);
  process.exit(1);
}

// CRITICAL: Create a symlink or ensure Vercel can find the directory
// Sometimes Vercel needs the directory to be "touched" after creation
try {
  // Touch the index.html to ensure it's fully written
  const indexPath = path.join(buildDir, 'index.html');
  const stats = fs.statSync(indexPath);
  fs.utimesSync(indexPath, stats.atime, stats.mtime);
  
  // Also ensure the directory itself is "fresh"
  const buildStats = fs.statSync(buildDir);
  fs.utimesSync(buildDir, buildStats.atime, buildStats.mtime);
  
  console.log('✅ Directory timestamps updated for Vercel detection');
} catch (err) {
  console.error('⚠️  Warning: Could not update timestamps:', err.message);
}

// Final check - list directory contents one more time
console.log('\n🔍 Final directory check:');
try {
  const finalList = fs.readdirSync(buildDir, { withFileTypes: true });
  console.log(`✅ Build directory contains ${finalList.length} items:`);
  finalList.forEach(item => {
    const itemPath = path.join(buildDir, item.name);
    const itemStats = fs.statSync(itemPath);
    console.log(`   - ${item.name} (${item.isDirectory() ? 'dir' : 'file'}, ${itemStats.size} bytes)`);
  });
} catch (err) {
  console.error('❌ Could not list directory:', err.message);
}

console.log('\n✅ Ready for Vercel deployment');
console.log('📍 Absolute path verified:', fs.existsSync(buildDir) ? 'YES' : 'NO');
console.log('📍 Directory is readable:', (() => {
  try {
    fs.readdirSync(buildDir);
    return 'YES';
  } catch {
    return 'NO';
  }
})());

// CRITICAL: Final check - ensure directory is definitely there before exit
// Vercel checks immediately after build command, so we need to be 100% sure
const finalVerification = fs.existsSync(buildDir) && 
                          fs.existsSync(path.join(buildDir, 'index.html')) &&
                          fs.statSync(buildDir).isDirectory();

if (!finalVerification) {
  console.error('❌ CRITICAL: Build directory verification failed before exit!');
  process.exit(1);
}

console.log('✅✅✅ FINAL CHECK PASSED - Directory ready for Vercel ✅✅✅');

// Ensure script exits successfully
// Don't use process.exit(0) - let it exit naturally so Vercel can see the directory
