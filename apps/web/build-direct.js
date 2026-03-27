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

// Step 0: Sync runtime API markdown from canonical source content/
console.log('\n📋 Step 0: Syncing canonical content to api directory...');
try {
  const syncScriptPath = path.resolve(projectRoot, '..', '..', 'scripts', 'sync-content.js');
  execSync(`node "${syncScriptPath}"`, { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Content sync failed:', err.message);
  process.exit(1);
}

console.log('\n📦 Step 1: Building React app directly to root build directory...');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
const buildPath = path.relative(clientDir, buildDir);
console.log('📍 BUILD_PATH set to:', buildPath);

try {
  execSync('npm run build', {
    stdio: 'inherit',
    cwd: clientDir,
    env: { ...process.env, BUILD_PATH: buildPath }
  });
  console.log('✅ React build completed directly to root build directory');
} catch (error) {
  console.error('❌ React build failed');
  process.exit(1);
}

if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory was not created at expected location:', buildDir);
  process.exit(1);
}
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((entry) => {
      copyRecursiveSync(path.join(src, entry), path.join(dest, entry));
    });
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}
if (!fs.existsSync(clientBuildDir)) {
  copyRecursiveSync(buildDir, clientBuildDir);
}

const indexPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in build directory!');
  process.exit(1);
}

console.log('\n✅ Build complete!');
console.log('📍 Build directory:', path.resolve(buildDir));
if (!(fs.existsSync(buildDir) && fs.existsSync(indexPath) && fs.statSync(buildDir).isDirectory())) {
  console.error('❌ CRITICAL: Build directory verification failed!');
  process.exit(1);
}
console.log('✅ Build script completed successfully');
