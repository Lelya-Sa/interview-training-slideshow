// Build script that ensures React builds directly to root build directory
// This avoids copy operations and ensures Vercel can find the output

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const clientDir = path.join(projectRoot, 'client');
const buildDir = path.join(projectRoot, 'build');

console.log('🔨 Starting build process...');
console.log('Project root:', projectRoot);
console.log('Client directory:', clientDir);
console.log('Build directory:', buildDir);

// Step 1: Build React app in client directory
console.log('\n📦 Step 1: Building React app...');
process.chdir(clientDir);
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ React build completed');
} catch (error) {
  console.error('❌ React build failed');
  process.exit(1);
}

// Step 2: Go back to root and copy to build directory
process.chdir(projectRoot);
console.log('\n📋 Step 2: Copying build output to root...');

const clientBuildDir = path.join(clientDir, 'build');

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

// Copy everything
copyRecursiveSync(clientBuildDir, buildDir);

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

console.log('\n✅ Build complete!');
console.log('📍 Build directory:', path.resolve(buildDir));
console.log('✅ Ready for Vercel deployment');
