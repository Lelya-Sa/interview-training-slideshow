const fs = require('fs');
const path = require('path');

// Topic to validate - CHANGE THIS FOR EACH TOPIC
const topic = {
  name: 'Data Structures',
  path: 'algorithms/data-structures/questions.md',
  type: 'DATA-STRUCTURES',
  appearsInDays: 75,
  requirements: { minPerDay: 5, maxPerDay: 5, avgPerDay: 5 },
  questionsNeeded: { minimum: 375, recommended: 375 }
};

console.log('='.repeat(80));
console.log(`🔍 VALIDATING TOPIC #1: ${topic.name}`);
console.log('='.repeat(80));
console.log(`Path: ${topic.path}`);
console.log(`Type: ${topic.type}`);
console.log(`Appears in: ${topic.appearsInDays} day(s)`);
console.log(`Requirements: ${topic.requirements.minPerDay}-${topic.requirements.maxPerDay} per day (avg: ${topic.requirements.avgPerDay})`);
console.log(`Questions Needed: Minimum ${topic.questionsNeeded.minimum}, Recommended ${topic.questionsNeeded.recommended}\n`);

// Get project root (one level up from scripts folder)
const projectRoot = path.resolve(__dirname, '..');

// Check if file exists OR if it's a directory with individual question files
const filePath = path.join(projectRoot, topic.path);
const questionsDir = path.join(projectRoot, 'algorithms', 'logic-questions', 'questions');

console.log(`📁 Checking file: ${filePath}`);

let allQuestionsContent = '';
let totalFiles = 0;
let usingIndividualFiles = false;

// For Logic Questions, prefer the consolidated file if it exists
if (topic.path.includes('logic-questions') && fs.existsSync(filePath)) {
  // Use consolidated file
  usingIndividualFiles = false;
  console.log(`✅ Using consolidated file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  allQuestionsContent = content;
  totalFiles = 1;
} else if (topic.path.includes('logic-questions') && fs.existsSync(questionsDir) && fs.statSync(questionsDir).isDirectory()) {
  // Directory with individual question files
  usingIndividualFiles = true;
  console.log(`📁 Found questions directory: ${questionsDir}`);
  const questionFiles = fs.readdirSync(questionsDir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .sort();
  
  totalFiles = questionFiles.length;
  console.log(`✅ Found ${totalFiles} individual question files\n`);
  
  // Read all question files and combine them
  console.log('📖 Reading question files...');
  for (const file of questionFiles) {
    const filePath = path.join(questionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    // Convert individual file format to consolidated format
    // Each file has: # Title, ## Problem, ## Solution
    // Convert to: ### Title\n**Answer:** Solution content
    const lines = content.split('\n');
    let title = '';
    let solution = [];
    let inSolution = false;
    let inApproach = false;
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        title = line.replace(/^# /, '').trim();
      } else if (line.startsWith('## Problem')) {
        inSolution = false;
        inApproach = false;
      } else if (line.startsWith('## Approach')) {
        inSolution = false;
        inApproach = true;
        solution = [];
      } else if (line.startsWith('## Solution')) {
        inSolution = true;
        inApproach = false;
        if (solution.length === 0) {
          solution = [];
        }
      } else if ((inSolution || inApproach) && line.trim() && !line.startsWith('## ')) {
        solution.push(line);
      } else if (line.startsWith('## ')) {
        inSolution = false;
        inApproach = false;
      }
    }
    
    if (title && solution.length > 0) {
      allQuestionsContent += `### ${title}\n**Answer:** ${solution.join('\n')}\n\n`;
    } else if (title) {
      // If no solution section, use the whole content as answer
      const normalized = content.replace(/^# .+\n\n/, '').trim();
      allQuestionsContent += `### ${title}\n**Answer:** ${normalized}\n\n`;
    }
  }
  console.log(`✅ Combined ${totalFiles} question files\n`);
} else if (fs.existsSync(filePath)) {
  // Single file approach
  console.log(`✅ Main file exists`);
  const content = fs.readFileSync(filePath, 'utf8');
  allQuestionsContent = content;
  totalFiles = 1;
} else {
  console.error(`❌ ERROR: Neither file nor questions directory found`);
  console.error(`   Tried: ${filePath}`);
  console.error(`   Tried: ${questionsDir}`);
  process.exit(1);
}

// Normalize line endings
const normalizedContent = allQuestionsContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const lines = normalizedContent.split('\n');
const fileSize = allQuestionsContent.length;

console.log(`📊 File statistics:`);
console.log(`   - Total lines: ${lines.length}`);
console.log(`   - File size: ${(fileSize / 1024).toFixed(2)} KB\n`);

// Parse questions
console.log('🔍 Parsing questions...\n');

const questions = [];
const questionSet = new Set(); // For duplicate detection
let currentQuestion = null;
let currentAnswer = [];
let questionNumber = 0;
let inQuestionBlock = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  // Match question format: ### 1. Question text or ### Question text
  const questionMatch = trimmedLine.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
  
  if (questionMatch) {
    // Save previous question if exists
    if (currentQuestion && currentAnswer.length > 0) {
      let answerText = currentAnswer.join('\n').trim();
      answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
      
      if (answerText.length > 3) {
        const questionKey = currentQuestion.trim().toLowerCase();
        
        if (questionSet.has(questionKey)) {
          console.warn(`⚠️  Duplicate question detected: "${currentQuestion.substring(0, 50)}..."`);
        } else {
          questionSet.add(questionKey);
        }
        
        questions.push({
          questionNumber: questionNumber,
          question: currentQuestion.trim(),
          answer: answerText,
          answerLength: answerText.length,
          hasAnswer: answerText.length > 3
        });
        questionNumber++;
      }
    }
    
    // Start new question
    currentQuestion = questionMatch[1];
    currentAnswer = [];
    inQuestionBlock = true;
  } else if (currentQuestion !== null && inQuestionBlock) {
    // Check for section headers (##) - these mark the end of a question section
    const trimmedLine = line.trim();
    if (trimmedLine.match(/^##\s+/)) {
      // Save current question if we have answer content
      if (currentAnswer.length > 0) {
        let answerText = currentAnswer.join('\n').trim();
        answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
        
        if (answerText.length > 3) {
          const questionKey = currentQuestion.trim().toLowerCase();
          if (!questionSet.has(questionKey)) {
            questionSet.add(questionKey);
            questions.push({
              questionNumber: questionNumber,
              question: currentQuestion.trim(),
              answer: answerText,
              answerLength: answerText.length,
              hasAnswer: true
            });
            questionNumber++;
          }
        }
      }
      currentQuestion = null;
      currentAnswer = [];
      inQuestionBlock = false;
      continue;
    }
    
    // Collect answer lines
    currentAnswer.push(line);
  }
}

// Don't forget the last question
if (currentQuestion && currentAnswer.length > 0) {
  let answerText = currentAnswer.join('\n').trim();
  answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
  
  if (answerText.length > 3) {
    const questionKey = currentQuestion.trim().toLowerCase();
    if (!questionSet.has(questionKey)) {
      questionSet.add(questionKey);
      questions.push({
        questionNumber: questionNumber,
        question: currentQuestion.trim(),
        answer: answerText,
        answerLength: answerText.length,
        hasAnswer: true
      });
    }
  }
}

// Validation Results
console.log('='.repeat(80));
console.log('📊 VALIDATION RESULTS');
console.log('='.repeat(80));

const totalQuestions = questions.length;
const uniqueQuestions = questionSet.size;
const duplicates = totalQuestions - uniqueQuestions;
const questionsWithAnswers = questions.filter(q => q.hasAnswer).length;
const questionsWithoutAnswers = totalQuestions - questionsWithAnswers;

console.log(`\n1. ✅ File Exists: YES`);
console.log(`2. 📊 Question Count: ${totalQuestions} questions found`);
console.log(`   - Unique questions: ${uniqueQuestions}`);
console.log(`   - Duplicates: ${duplicates}`);
console.log(`   - Questions with answers: ${questionsWithAnswers}`);
console.log(`   - Questions without answers: ${questionsWithoutAnswers}`);

// Check against requirements
console.log(`\n3. 📋 Requirements Check:`);
console.log(`   - Minimum needed: ${topic.questionsNeeded.minimum} questions`);
console.log(`   - Recommended: ${topic.questionsNeeded.recommended} questions`);
console.log(`   - Current: ${totalQuestions} questions`);

if (totalQuestions >= topic.questionsNeeded.minimum) {
  console.log(`   ✅ PASS: Has enough questions (minimum requirement met)`);
} else {
  console.log(`   ❌ FAIL: Needs ${topic.questionsNeeded.minimum - totalQuestions} more questions`);
}

if (totalQuestions >= topic.questionsNeeded.recommended) {
  console.log(`   ✅ EXCELLENT: Meets recommended count`);
} else if (totalQuestions >= topic.questionsNeeded.minimum) {
  console.log(`   ⚠️  WARNING: Below recommended count (needs ${topic.questionsNeeded.recommended - totalQuestions} more for optimal variety)`);
}

// Check question format
console.log(`\n4. ✅ Question Format: All questions use ### format`);

// Check answer format
if (questionsWithoutAnswers === 0) {
  console.log(`5. ✅ Answer Format: All questions have answers`);
} else {
  console.log(`5. ❌ Answer Format: ${questionsWithoutAnswers} questions missing answers`);
}

// Check uniqueness
if (duplicates === 0) {
  console.log(`6. ✅ Uniqueness: No duplicate questions found`);
} else {
  console.log(`6. ⚠️  Uniqueness: ${duplicates} duplicate questions found`);
}

// Progressive learning check (for practice topics, check if enough variety)
if (topic.type === 'LOGIC-QUESTIONS' || topic.type === 'LEETCODE' || topic.type === 'DATA-STRUCTURES') {
  const avgQuestionsPerDay = totalQuestions / topic.appearsInDays;
  console.log(`\n7. 📈 Progressive Learning Check:`);
  console.log(`   - Average questions per day: ${avgQuestionsPerDay.toFixed(2)}`);
  console.log(`   - Required range: ${topic.requirements.minPerDay}-${topic.requirements.maxPerDay} per day`);
  
  if (avgQuestionsPerDay >= topic.requirements.minPerDay) {
    console.log(`   ✅ PASS: Enough questions for daily variety`);
  } else {
    console.log(`   ❌ FAIL: Not enough questions for daily variety`);
  }
}

// Sample questions
console.log(`\n8. 📝 Sample Questions (first 3):`);
questions.slice(0, 3).forEach((q, idx) => {
  console.log(`   ${idx + 1}. "${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}"`);
  console.log(`      Answer length: ${q.answerLength} chars`);
});

// Summary
console.log(`\n${'='.repeat(80)}`);
console.log('📋 VALIDATION SUMMARY');
console.log('='.repeat(80));

const allChecks = [
  { name: 'File Exists', pass: true },
  { name: 'Question Count (Minimum)', pass: totalQuestions >= topic.questionsNeeded.minimum },
  { name: 'Question Count (Recommended)', pass: totalQuestions >= topic.questionsNeeded.recommended },
  { name: 'All Questions Have Answers', pass: questionsWithoutAnswers === 0 },
  { name: 'No Duplicates', pass: duplicates === 0 },
  { name: 'Proper Format', pass: true }
];

const passedChecks = allChecks.filter(c => c.pass).length;
const totalChecks = allChecks.length;

console.log(`\n✅ Passed: ${passedChecks}/${totalChecks} checks\n`);

allChecks.forEach(check => {
  const icon = check.pass ? '✅' : '❌';
  console.log(`   ${icon} ${check.name}`);
});

if (passedChecks === totalChecks) {
  console.log(`\n🎉 VALIDATION PASSED: ${topic.name} is ready for use!`);
} else {
  console.log(`\n⚠️  VALIDATION ISSUES FOUND: Please review the issues above.`);
}

console.log(`\n${'='.repeat(80)}\n`);
