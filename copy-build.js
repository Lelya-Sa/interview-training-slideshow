// Simple Node.js script to copy build output
// This is more reliable than shell commands across platforms

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'client', 'build');
const destDir = path.join(__dirname, 'build');

// Remove destination if it exists
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Create destination directory
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
copyRecursiveSync(sourceDir, destDir);
console.log('✅ Successfully copied client/build to build/');
