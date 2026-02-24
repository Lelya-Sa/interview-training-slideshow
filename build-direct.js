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

// Content (daily-schedule, logic-building-101, etc.): same dir as app when repo root is app (Vercel), else parent (local slideshow-app)
const parentDir = fs.existsSync(path.join(projectRoot, 'daily-schedule'))
  ? projectRoot
  : path.join(projectRoot, '..');

console.log('🔨 Starting build process...');
console.log('Project root:', projectRoot);
console.log('Client directory:', clientDir);
console.log('Build directory:', buildDir);

// Step 0: Copy markdown files from parent directory to api directory
// This ensures they're included with the serverless functions in Vercel
console.log('\n📋 Step 0: Copying markdown files to api directory...');
try {
  const apiDir = path.join(projectRoot, 'api');
  
  // Copy full_stack_interview_answers.md to api directory
  const sourceMarkdown = path.join(parentDir, 'full_stack_interview_answers.md');
  const destMarkdown = path.join(apiDir, 'full_stack_interview_answers.md');
  if (fs.existsSync(sourceMarkdown)) {
    fs.copyFileSync(sourceMarkdown, destMarkdown);
    console.log('✅ Copied full_stack_interview_answers.md to api/');
  } else {
    console.log('⚠️  full_stack_interview_answers.md not found at:', sourceMarkdown);
  }
  
  // Copy daily-schedule directory to api directory
  const sourceSchedule = path.join(parentDir, 'daily-schedule');
  const destSchedule = path.join(apiDir, 'daily-schedule');
  if (fs.existsSync(sourceSchedule)) {
    if (fs.existsSync(destSchedule)) {
      fs.rmSync(destSchedule, { recursive: true, force: true });
    }
    copyRecursiveSync(sourceSchedule, destSchedule);
    console.log('✅ Copied daily-schedule directory to api/');
  } else {
    console.log('⚠️  daily-schedule not found at:', sourceSchedule);
  }
  
  // Copy question markdown directories (frontend, backend, apis, algorithms, architecture, etc.)
  // Only copy questions.md and README.md files to avoid conflicts
  const questionDirs = [
    'frontend',
    'backend',
    'apis',
    'algorithms',
    'architecture',
    'databases',
    'devops',
    'security',
    'design-patterns',
    'logic-building-101'
  ];
  
  console.log('📚 Copying question markdown files (questions.md and README.md only)...');
  
  function shouldCopyFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath, ext).toLowerCase();
    return ext === '.md' && (basename === 'questions' || basename === 'readme');
  }
  
  function copyMarkdownFilesOnly(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(entry => {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        try {
          const entryStats = fs.statSync(srcPath);
          if (entryStats.isFile() && shouldCopyFile(srcPath)) fs.copyFileSync(srcPath, destPath);
          else if (entryStats.isDirectory()) copyMarkdownFilesOnly(srcPath, destPath);
        } catch (err) {}
      });
    } else if (stats.isFile() && shouldCopyFile(src)) {
      const destParent = path.dirname(dest);
      if (!fs.existsSync(destParent)) fs.mkdirSync(destParent, { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }
  
  questionDirs.forEach(dirName => {
    const sourceDir = path.join(parentDir, dirName);
    const destDir = path.join(apiDir, dirName);
    if (fs.existsSync(sourceDir)) {
      try {
        if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true, force: true });
        copyMarkdownFilesOnly(sourceDir, destDir);
        console.log(`✅ Copied ${dirName}/ markdown files to api/`);
      } catch (err) {
        console.error(`⚠️  Could not copy ${dirName}/:`, err.message);
      }
    } else {
      console.log(`⚠️  ${dirName}/ not found at:`, sourceDir);
    }
  });
} catch (err) {
  console.error('⚠️  Warning: Could not copy markdown files:', err.message);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const ext = path.extname(src).toLowerCase();
    const allowedExtensions = ['.md', '.txt'];
    const isReadme = path.basename(src, ext).toLowerCase() === 'readme';
    if (allowedExtensions.includes(ext) || isReadme) fs.copyFileSync(src, dest);
  }
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
