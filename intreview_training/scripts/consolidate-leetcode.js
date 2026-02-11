const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsDir = path.join(projectRoot, 'algorithms', 'leetcode', 'questions');
const outputFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('📚 CONSOLIDATING LEETCODE QUESTIONS');
console.log('='.repeat(80));

// Get all question folders
const questionFolders = fs.readdirSync(questionsDir)
  .filter(item => {
    const itemPath = path.join(questionsDir, item);
    return fs.statSync(itemPath).isDirectory();
  })
  .sort();

console.log(`\n📁 Found ${questionFolders.length} question folders\n`);

const questions = [];

for (const folder of questionFolders) {
  const folderPath = path.join(questionsDir, folder);
  const readmePath = path.join(folderPath, 'README.md');
  const jsPath = path.join(folderPath, 'js', 'solution.js');
  const pythonPath = path.join(folderPath, 'python', 'solution.py');
  
  let title = folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  let problem = '';
  let jsCode = '';
  let pythonCode = '';
  
  // Read README for problem description
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    // Extract problem description
    const problemMatch = readme.match(/## Problem Description\s*\n\s*\n(.+?)(?=\n##|$)/s);
    if (problemMatch) {
      problem = problemMatch[1].trim();
    }
    // Extract title from README if available
    const titleMatch = readme.match(/^# (.+?) -/);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }
  }
  
  // Read JavaScript solution
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    // Extract function code
    const jsMatch = jsContent.match(/(function\s+\w+[^}]*\{[^}]*\})/s) || 
                    jsContent.match(/(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{[^}]*\})/s) ||
                    jsContent.match(/(\w+\s*\([^)]*\)\s*\{[^}]*\})/s);
    if (jsMatch) {
      jsCode = jsMatch[1].trim();
    } else {
      jsCode = jsContent.trim();
    }
  }
  
  // Read Python solution
  if (fs.existsSync(pythonPath)) {
    const pythonContent = fs.readFileSync(pythonPath, 'utf8');
    // Extract function code
    const pythonMatch = pythonContent.match(/(def\s+\w+[^:]*:[^#]*)/s);
    if (pythonMatch) {
      pythonCode = pythonMatch[1].trim();
    } else {
      pythonCode = pythonContent.trim();
    }
  }
  
  if (title && (jsCode || pythonCode)) {
    questions.push({
      title,
      problem: problem || `LeetCode problem: ${title}`,
      jsCode,
      pythonCode,
      folder
    });
    console.log(`✅ ${title} - JS: ${jsCode ? '✅' : '❌'}, Python: ${pythonCode ? '✅' : '❌'}`);
  } else {
    console.log(`⚠️  Skipping ${folder}: Missing code`);
  }
}

console.log(`\n📊 Consolidated ${questions.length} questions\n`);

// Generate markdown
let markdown = `# LeetCode Style Questions\n\n`;
markdown += `This file contains ${questions.length} LeetCode problems with JavaScript and Python implementations.\n\n`;

// Group by category (simplified - all in one list for now)
markdown += `## Questions\n\n`;

questions.forEach((q, idx) => {
  markdown += `### ${idx + 1}. ${q.title}\n\n`;
  
  if (q.problem) {
    markdown += `**Problem:**\n${q.problem}\n\n`;
  }
  
  markdown += `**Answer:**\n\n`;
  
  if (q.jsCode) {
    markdown += `### JavaScript\n\`\`\`javascript\n${q.jsCode}\n\`\`\`\n\n`;
  }
  
  if (q.pythonCode) {
    markdown += `### Python\n\`\`\`python\n${q.pythonCode}\n\`\`\`\n\n`;
  }
  
  markdown += `---\n\n`;
});

// Write file
fs.writeFileSync(outputFile, markdown, 'utf8');

console.log('='.repeat(80));
console.log('✅ CONSOLIDATION COMPLETE');
console.log('='.repeat(80));
console.log(`\n📝 Output file: ${outputFile}`);
console.log(`📊 Total questions: ${questions.length}`);
console.log(`📊 Questions with JS: ${questions.filter(q => q.jsCode).length}`);
console.log(`📊 Questions with Python: ${questions.filter(q => q.pythonCode).length}`);
console.log(`\n📋 Next step: Add ${Math.max(0, 75 - questions.length)} more questions to reach minimum\n`);
