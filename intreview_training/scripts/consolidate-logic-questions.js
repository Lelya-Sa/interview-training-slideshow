const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, 'algorithms', 'logic-questions', 'questions');
const outputFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');

console.log('='.repeat(80));
console.log('📚 CONSOLIDATING LOGIC QUESTIONS');
console.log('='.repeat(80));

// Read all question files
const questionFiles = fs.readdirSync(questionsDir)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .sort();

console.log(`\n📁 Found ${questionFiles.length} question files\n`);

// Parse questions and track duplicates
const questionsMap = new Map(); // key: normalized question title -> best question object
const duplicates = [];

function normalizeTitle(title) {
  // Remove common prefixes/suffixes that indicate variations
  return title
    .toLowerCase()
    .replace(/^(javascript|python|java|typescript)\s+/i, '')
    .replace(/\s*-\s*(xor|sum|explanation|approach|solution)$/i, '')
    .replace(/\s*\(.*?\)\s*$/, '') // Remove parenthetical notes
    .trim();
}

function parseQuestionFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let title = '';
  let problem = [];
  let solution = [];
  let approach = [];
  let currentSection = null;
  let allContent = [];
  
  // Skip explanation files - they're supplementary
  if (fileName.includes('EXPLANATION') || fileName.includes('explanation')) {
    return null; // Skip explanation files
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      title = line.replace(/^# /, '').trim();
    } else if (line.startsWith('## Problem')) {
      currentSection = 'problem';
      problem = [];
    } else if (line.startsWith('## Approach')) {
      currentSection = 'approach';
      approach = [];
    } else if (line.startsWith('## Solution')) {
      currentSection = 'solution';
      solution = [];
    } else if (line.startsWith('## ')) {
      currentSection = null;
      // Keep section headers in content
      allContent.push(line);
    } else if (currentSection === 'problem' && line.trim()) {
      problem.push(line);
      allContent.push(line);
    } else if (currentSection === 'approach' && line.trim()) {
      approach.push(line);
      allContent.push(line);
    } else if (currentSection === 'solution' && line.trim()) {
      solution.push(line);
      allContent.push(line);
    } else if (line.trim() && !line.startsWith('```')) {
      // Include other content (but skip code blocks for now)
      allContent.push(line);
    }
  }
  
  // Combine approach and solution for the answer
  const answerParts = [];
  if (approach.length > 0) {
    answerParts.push('**Approach:**', ...approach, '');
  }
  if (solution.length > 0) {
    answerParts.push('**Solution:**', ...solution);
  } else if (allContent.length > 0) {
    // If no clear solution section, use all content after title
    const contentAfterTitle = allContent.join('\n').trim();
    if (contentAfterTitle) {
      answerParts.push(contentAfterTitle);
    }
  }
  
  const answer = answerParts.join('\n').trim();
  
  if (!title) {
    return null;
  }
  
  // If no answer, use the full content as answer
  const finalAnswer = answer || allContent.join('\n').trim();
  
  if (!finalAnswer) {
    return null;
  }
  
  return {
    title,
    problem: problem.join('\n'),
    answer: finalAnswer,
    fileName,
    filePath
  };
}

console.log('📖 Parsing question files...\n');

for (const file of questionFiles) {
  const filePath = path.join(questionsDir, file);
  const question = parseQuestionFile(filePath, file);
  
  if (!question) {
    console.warn(`⚠️  Skipping ${file}: Could not parse`);
    continue;
  }
  
  const normalizedTitle = normalizeTitle(question.title);
  
  if (questionsMap.has(normalizedTitle)) {
    // Duplicate found - keep the one with more content
    const existing = questionsMap.get(normalizedTitle);
    if (question.answer.length > existing.answer.length) {
      duplicates.push({ old: existing.fileName, new: file });
      questionsMap.set(normalizedTitle, question);
    } else {
      duplicates.push({ old: file, new: existing.fileName });
    }
  } else {
    questionsMap.set(normalizedTitle, question);
  }
}

const uniqueQuestions = Array.from(questionsMap.values());

console.log(`✅ Parsed ${uniqueQuestions.length} unique questions`);
console.log(`⚠️  Found ${duplicates.length} duplicate files (kept best version)\n`);

// Sort questions by their original file number if available
uniqueQuestions.sort((a, b) => {
  const numA = parseInt(a.fileName.match(/^(\d+)/)?.[1] || '999');
  const numB = parseInt(b.fileName.match(/^(\d+)/)?.[1] || '999');
  return numA - numB;
});

// Generate consolidated markdown
let markdown = `# Logic Questions - Interview Questions\n\n`;
markdown += `This file contains ${uniqueQuestions.length} logic questions for interview preparation.\n\n`;
markdown += `## Questions\n\n`;

for (const q of uniqueQuestions) {
  markdown += `### ${q.title}\n\n`;
  if (q.problem) {
    markdown += `**Problem:**\n${q.problem}\n\n`;
  }
  markdown += `**Answer:**\n${q.answer}\n\n`;
  markdown += `---\n\n`;
}

// Write to file
fs.writeFileSync(outputFile, markdown, 'utf8');

console.log('='.repeat(80));
console.log('✅ CONSOLIDATION COMPLETE');
console.log('='.repeat(80));
console.log(`\n📝 Output file: ${outputFile}`);
console.log(`📊 Total unique questions: ${uniqueQuestions.length}`);
console.log(`📊 Duplicates removed: ${duplicates.length}`);
console.log(`\n📋 Next step: Add ${225 - uniqueQuestions.length} more questions to reach recommended count of 225\n`);
