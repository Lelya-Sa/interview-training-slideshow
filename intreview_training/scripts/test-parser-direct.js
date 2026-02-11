const fs = require('fs');
const path = require('path');

// Test the parser directly on the questions.md file
const questionsFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');

console.log('='.repeat(80));
console.log('🧪 TESTING PARSER DIRECTLY ON questions.md');
console.log('='.repeat(80));

const content = fs.readFileSync(questionsFile, 'utf8');
const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const lines = normalizedContent.split('\n');

let currentQuestion = null;
let currentAnswer = [];
let questions = [];
let questionNumber = 0;
let inQuestionBlock = false;

console.log(`\n📊 Total lines in file: ${lines.length}\n`);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  // Match question format: ### Question text
  const questionMatch = trimmedLine.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
  
  if (questionMatch) {
    // Check if this is a real question or a subsection (JavaScript/Python)
    const questionText = questionMatch[1];
    const isSubsection = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#'].includes(questionText);
    
    if (!isSubsection) {
      // Save previous question if exists
      if (currentQuestion && currentAnswer.length > 0) {
        let answerText = currentAnswer.join('\n').trim();
        answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
        
        if (answerText.length > 3) {
          questions.push({
            questionNumber: questionNumber,
            question: currentQuestion.trim(),
            answer: answerText,
            answerLength: answerText.length,
            hasJS: answerText.includes('```javascript') || answerText.includes('### JavaScript'),
            hasPython: answerText.includes('```python') || answerText.includes('### Python')
          });
          questionNumber++;
        }
      }
      
      // Start new question
      currentQuestion = questionText;
      currentAnswer = [];
      inQuestionBlock = true;
    } else {
      // This is a subsection (JavaScript/Python), add to current answer
      if (inQuestionBlock && currentQuestion) {
        currentAnswer.push(line);
      }
    }
  } else if (currentQuestion !== null && inQuestionBlock) {
    // Check for section headers (##) - these mark the end of a question section
    if (trimmedLine.match(/^##\s+/)) {
      if (currentAnswer.length > 0) {
        let answerText = currentAnswer.join('\n').trim();
        answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
        
        if (answerText.length > 3) {
          questions.push({
            questionNumber: questionNumber,
            question: currentQuestion.trim(),
            answer: answerText,
            answerLength: answerText.length,
            hasJS: answerText.includes('```javascript') || answerText.includes('### JavaScript'),
            hasPython: answerText.includes('```python') || answerText.includes('### Python')
          });
          questionNumber++;
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
    questions.push({
      questionNumber: questionNumber,
      question: currentQuestion.trim(),
      answer: answerText,
      answerLength: answerText.length,
      hasJS: answerText.includes('```javascript') || answerText.includes('### JavaScript'),
      hasPython: answerText.includes('```python') || answerText.includes('### Python')
    });
  }
}

console.log(`\n✅ Parsed ${questions.length} questions\n`);

// Analyze implementation languages
const withBoth = questions.filter(q => q.hasJS && q.hasPython).length;
const withJSOnly = questions.filter(q => q.hasJS && !q.hasPython).length;
const withPythonOnly = questions.filter(q => !q.hasJS && q.hasPython).length;
const withNeither = questions.filter(q => !q.hasJS && !q.hasPython).length;

console.log('='.repeat(80));
console.log('📊 IMPLEMENTATION LANGUAGE ANALYSIS');
console.log('='.repeat(80));
console.log(`\n✅ Questions with both JS and Python: ${withBoth}`);
console.log(`⚠️  Questions with JS only: ${withJSOnly}`);
console.log(`⚠️  Questions with Python only: ${withPythonOnly}`);
console.log(`⚠️  Questions with neither: ${withNeither}`);

// Show first 5 questions
console.log('\n' + '='.repeat(80));
console.log('📝 FIRST 5 QUESTIONS');
console.log('='.repeat(80));
questions.slice(0, 5).forEach((q, idx) => {
  console.log(`\n${idx + 1}. ${q.question}`);
  console.log(`   Answer length: ${q.answerLength} chars`);
  console.log(`   Has JS: ${q.hasJS ? '✅' : '❌'}`);
  console.log(`   Has Python: ${q.hasPython ? '✅' : '❌'}`);
  if (q.hasJS && q.hasPython) {
    console.log(`   ✅ Perfect: Has both implementations!`);
  }
});

// Show last 5 questions
console.log('\n' + '='.repeat(80));
console.log('📝 LAST 5 QUESTIONS');
console.log('='.repeat(80));
questions.slice(-5).forEach((q, idx) => {
  console.log(`\n${questions.length - 4 + idx}. ${q.question}`);
  console.log(`   Answer length: ${q.answerLength} chars`);
  console.log(`   Has JS: ${q.hasJS ? '✅' : '❌'}`);
  console.log(`   Has Python: ${q.hasPython ? '✅' : '❌'}`);
  if (q.hasJS && q.hasPython) {
    console.log(`   ✅ Perfect: Has both implementations!`);
  }
});

console.log('\n' + '='.repeat(80));
console.log('✅ PARSER TEST COMPLETE');
console.log('='.repeat(80));
console.log(`\n📊 Total questions parsed: ${questions.length}`);
console.log(`📊 Questions with both JS and Python: ${withBoth} (${((withBoth/questions.length)*100).toFixed(1)}%)`);
console.log(`\n${withBoth >= questions.length * 0.8 ? '✅' : '⚠️'} ${withBoth >= questions.length * 0.8 ? 'Most questions have both implementations!' : 'Some questions missing implementations'}\n`);
