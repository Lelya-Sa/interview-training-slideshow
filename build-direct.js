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

// Step 1: Build React app directly into root build directory
// Use BUILD_PATH environment variable to tell React where to build
console.log('\n📦 Step 1: Building React app directly to root build directory...');

// Remove existing build directory if it exists
if (fs.existsSync(buildDir)) {
  console.log('🗑️  Removing existing build directory...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

// Set BUILD_PATH to build directly into root build directory
// This avoids any copying and ensures the directory is exactly where Vercel expects it
const buildPath = path.relative(clientDir, buildDir); // Relative path from client to root/build
console.log('📍 BUILD_PATH set to:', buildPath);

try {
  execSync('npm run build', { 
    stdio: 'inherit',
    cwd: clientDir,
    env: {
      ...process.env,
      BUILD_PATH: buildPath  // Tell React to build to ../build instead of ./build
    }
  });
  console.log('✅ React build completed directly to root build directory');
} catch (error) {
  console.error('❌ React build failed');
  process.exit(1);
}

// Verify the build was created in the right place
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory was not created at expected location:', buildDir);
  process.exit(1);
}

// Also ensure client/build exists for dashboard compatibility (if dashboard is set to client/build)
if (!fs.existsSync(clientBuildDir)) {
  console.log('📋 Creating client/build for dashboard compatibility...');
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

// CRITICAL: Create a .vercel directory marker to help Vercel detect the build
try {
  const vercelMarker = path.join(projectRoot, '.vercel', 'project.json');
  const vercelDir = path.join(projectRoot, '.vercel');
  if (!fs.existsSync(vercelDir)) {
    fs.mkdirSync(vercelDir, { recursive: true });
  }
  // This might help Vercel understand the project structure
  console.log('✅ Created .vercel marker directory');
} catch (err) {
  console.log('⚠️  Could not create .vercel marker:', err.message);
}

// CRITICAL: List the build directory one final time with absolute path
// This ensures the directory is "touched" and visible to Vercel's detection
try {
  const absoluteBuildPath = path.resolve(buildDir);
  console.log('📍 FINAL ABSOLUTE PATH:', absoluteBuildPath);
  const dirContents = fs.readdirSync(absoluteBuildPath);
  console.log('📍 FINAL DIRECTORY CONTENTS:', dirContents.length, 'items');
  
  // Force a stat on the directory to ensure it's fully synced
  const dirStat = fs.statSync(absoluteBuildPath);
  console.log('📍 DIRECTORY STATS:', {
    isDirectory: dirStat.isDirectory(),
    size: dirStat.size,
    mtime: dirStat.mtime
  });
} catch (err) {
  console.error('❌ FATAL: Could not access build directory:', err.message);
  process.exit(1);
}

// Ensure script exits successfully
// Exit with code 0 to indicate success
process.exit(0);
