const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');
const questionsDir = path.join(projectRoot, 'algorithms', 'leetcode', 'questions');

console.log('='.repeat(80));
console.log('📋 REVIEWING LEETCODE QUESTIONS');
console.log('='.repeat(80));

// Read current questions.md
const content = fs.readFileSync(questionsFile, 'utf8');
const lines = content.split('\n');

// Count questions
const questionHeaders = lines.filter(line => line.match(/^### \d+\./));
console.log(`\n📊 Current questions.md:`);
console.log(`   Total question headers: ${questionHeaders.length}`);

// Check for Python implementations
const hasPython = content.includes('```python') || content.includes('### Python');
const hasJS = content.includes('```javascript') || content.includes('### JavaScript');
console.log(`   Has JavaScript: ${hasJS ? '✅' : '❌'}`);
console.log(`   Has Python: ${hasPython ? '✅' : '❌'}`);

// List all questions
console.log(`\n📝 Questions in file:`);
questionHeaders.forEach((header, idx) => {
  const match = header.match(/^### (\d+)\. (.+)$/);
  if (match) {
    console.log(`   ${match[1]}. ${match[2]}`);
  }
});

// Check questions directory
console.log(`\n📁 Questions directory:`);
if (fs.existsSync(questionsDir)) {
  const questionFolders = fs.readdirSync(questionsDir)
    .filter(item => {
      const itemPath = path.join(questionsDir, item);
      return fs.statSync(itemPath).isDirectory() && item !== 'node_modules';
    })
    .sort();
  
  console.log(`   Found ${questionFolders.length} question folders`);
  console.log(`\n   First 10 folders:`);
  questionFolders.slice(0, 10).forEach(folder => {
    const folderPath = path.join(questionsDir, folder);
    const hasJS = fs.existsSync(path.join(folderPath, 'js'));
    const hasPython = fs.existsSync(path.join(folderPath, 'python'));
    const hasJava = fs.existsSync(path.join(folderPath, 'java'));
    console.log(`   - ${folder}`);
    console.log(`     JS: ${hasJS ? '✅' : '❌'}, Python: ${hasPython ? '✅' : '❌'}, Java: ${hasJava ? '✅' : '❌'}`);
  });
  
  if (questionFolders.length > 10) {
    console.log(`   ... and ${questionFolders.length - 10} more`);
  }
} else {
  console.log(`   Directory not found`);
}

// Issues found
console.log(`\n${'='.repeat(80)}`);
console.log('🔍 ISSUES FOUND');
console.log('='.repeat(80));

const issues = [];

// Check numbering
const numbers = questionHeaders.map(h => {
  const match = h.match(/^### (\d+)\./);
  return match ? parseInt(match[1]) : null;
}).filter(n => n !== null);

const duplicates = numbers.filter((n, idx) => numbers.indexOf(n) !== idx);
if (duplicates.length > 0) {
  issues.push(`❌ Duplicate question numbers: ${[...new Set(duplicates)].join(', ')}`);
}

// Check for Python
if (!hasPython) {
  issues.push(`❌ No Python implementations found`);
}

// Check count
if (questionHeaders.length < 75) {
  issues.push(`❌ Only ${questionHeaders.length} questions (need 75 minimum, 150 recommended)`);
}

if (issues.length > 0) {
  issues.forEach(issue => console.log(`   ${issue}`));
} else {
  console.log(`   ✅ No issues found!`);
}

console.log(`\n${'='.repeat(80)}\n`);
