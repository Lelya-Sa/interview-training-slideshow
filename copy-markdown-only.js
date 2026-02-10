// Script to copy only questions.md and README.md files to api/ directory
// This avoids file name conflicts while including necessary markdown files

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const parentDir = path.join(projectRoot, '..');
const apiDir = path.join(projectRoot, 'api');

// Directories to copy from
const questionDirs = [
  'frontend',
  'backend',
  'apis',
  'algorithms',
  'architecture',
  'databases',
  'devops',
  'security',
  'design-patterns'
];

function shouldCopyFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext).toLowerCase();
  
  // Only copy .md files that are questions.md or README.md
  if (ext === '.md') {
    return basename === 'questions' || basename === 'readme';
  }
  
  return false;
}

function copyMarkdownFiles(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    // Create destination directory
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Recursively process directory contents
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      
      // Only process if it's a file we want to copy
      if (fs.statSync(srcPath).isFile() && shouldCopyFile(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied: ${path.relative(apiDir, destPath)}`);
      } else if (fs.statSync(srcPath).isDirectory()) {
        // Recursively process subdirectories
        copyMarkdownFiles(srcPath, destPath);
      }
    }
  } else if (stats.isFile() && shouldCopyFile(src)) {
    // Create parent directory if needed
    const destParent = path.dirname(dest);
    if (!fs.existsSync(destParent)) {
      fs.mkdirSync(destParent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied: ${path.relative(apiDir, dest)}`);
  }
}

console.log('📋 Copying only questions.md and README.md files...');
console.log('Source:', parentDir);
console.log('Destination:', apiDir);

questionDirs.forEach(dirName => {
  const sourceDir = path.join(parentDir, dirName);
  const destDir = path.join(apiDir, dirName);
  
  if (fs.existsSync(sourceDir)) {
    console.log(`\n📁 Processing ${dirName}/...`);
    copyMarkdownFiles(sourceDir, destDir);
  } else {
    console.log(`⚠️  ${dirName}/ not found at:`, sourceDir);
  }
});

console.log('\n✅ Done copying markdown files!');
