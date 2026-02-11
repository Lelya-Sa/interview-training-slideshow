const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');
const outputFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md.filtered');

console.log('='.repeat(80));
console.log('🔍 FILTERING LOGIC QUESTIONS - REMOVING SYSTEM DESIGN QUESTIONS');
console.log('='.repeat(80));

// System design keywords that should NOT be in logic questions
const systemDesignKeywords = [
  'cache', 'design', 'system', 'api', 'database', 'session', 'server',
  'search', 'estimate', 'debug', 'optimize', 'handle', 'test a pen',
  'idempotent', 'rate limiter', 'tinyurl', 'replication', 'concurrent',
  'n+1', 'query', 'storage', 'distributed', 'transaction', 'stampede',
  'endpoint', 'deadlock', 'gas station', 'capacity'
];

// Read file
const content = fs.readFileSync(questionsFile, 'utf8');
const lines = content.split('\n');

let filteredContent = [];
let currentQuestion = null;
let currentQuestionLines = [];
let skipQuestion = false;
let inQuestion = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  
  // Check if this is a question header
  const questionMatch = trimmed.match(/^###\s+(.+)$/);
  
  if (questionMatch) {
    // Save previous question if we should keep it
    if (currentQuestion && !skipQuestion && currentQuestionLines.length > 0) {
      filteredContent.push(...currentQuestionLines);
    }
    
    // Start new question
    currentQuestion = questionMatch[1];
    currentQuestionLines = [line];
    inQuestion = true;
    
    // Check if this is a system design question
    const questionLower = currentQuestion.toLowerCase();
    skipQuestion = systemDesignKeywords.some(keyword => 
      questionLower.includes(keyword)
    );
    
    if (skipQuestion) {
      console.log(`❌ Removing: "${currentQuestion}" (system design question)`);
    } else {
      console.log(`✅ Keeping: "${currentQuestion}"`);
    }
  } else if (trimmed === '---') {
    // End of question
    if (currentQuestion && !skipQuestion) {
      filteredContent.push(...currentQuestionLines);
      filteredContent.push(line);
    }
    currentQuestion = null;
    currentQuestionLines = [];
    skipQuestion = false;
    inQuestion = false;
  } else if (inQuestion) {
    // Part of current question
    currentQuestionLines.push(line);
  } else {
    // Header or other content
    if (i < 10) { // Keep file header
      filteredContent.push(line);
    }
  }
}

// Don't forget last question
if (currentQuestion && !skipQuestion && currentQuestionLines.length > 0) {
  filteredContent.push(...currentQuestionLines);
}

// Count questions
const questionCount = (filteredContent.join('\n').match(/^### /gm) || []).length;

console.log('\n' + '='.repeat(80));
console.log('📊 FILTERING RESULTS');
console.log('='.repeat(80));
console.log(`\n✅ Questions kept: ${questionCount}`);
console.log(`❌ System design questions removed`);

// Write filtered file
fs.writeFileSync(outputFile, filteredContent.join('\n'), 'utf8');
console.log(`\n📝 Filtered file saved to: ${outputFile}`);
console.log(`\n⚠️  Review the file, then replace the original if correct.`);
console.log(`   Command: mv ${outputFile} ${questionsFile}\n`);
