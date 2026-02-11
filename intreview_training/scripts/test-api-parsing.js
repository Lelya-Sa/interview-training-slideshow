const fs = require('fs');
const path = require('path');

// Test the parser function directly (same as API)
function parseQuestionsFromMarkdown(content) {
    const questions = [];
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedContent.split('\n');
    
    let currentQuestion = null;
    let currentAnswer = [];
    let questionNumber = 0;
    let inQuestionBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        const questionMatch = trimmedLine.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
        
        if (questionMatch) {
            const questionText = questionMatch[1];
            const isLanguageSubsection = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust'].includes(questionText);
            
            if (!isLanguageSubsection) {
                if (currentQuestion && currentAnswer.length > 0) {
                    let answerText = currentAnswer.join('\n').trim();
                    answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
                    const finalAnswer = answerText;
                    
                    if (finalAnswer.length > 3) {
                        questions.push({
                            question: currentQuestion.trim(),
                            answer: finalAnswer,
                            questionNumber: questionNumber
                        });
                        questionNumber++;
                    }
                }
                
                currentQuestion = questionText;
                currentAnswer = [];
                inQuestionBlock = true;
            } else {
                if (inQuestionBlock && currentQuestion) {
                    currentAnswer.push(line);
                }
            }
        } else if (currentQuestion !== null && inQuestionBlock) {
            const trimmedLine = line.trim();
            if (trimmedLine === '---' || trimmedLine.match(/^##\s+/)) {
                if (currentAnswer.length > 0) {
                    let answerText = currentAnswer.join('\n').trim();
                    answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
                    const finalAnswer = answerText;
                    
                    if (finalAnswer.length > 3) {
                        questions.push({
                            question: currentQuestion.trim(),
                            answer: finalAnswer,
                            questionNumber: questionNumber
                        });
                        questionNumber++;
                    }
                }
                currentQuestion = null;
                currentAnswer = [];
                inQuestionBlock = false;
                continue;
            }
            
            currentAnswer.push(line);
        }
    }
    
    if (currentQuestion && currentAnswer.length > 0) {
        let answerText = currentAnswer.join('\n').trim();
        answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
        const finalAnswer = answerText;
        
        if (finalAnswer.length > 3) {
            questions.push({
                question: currentQuestion.trim(),
                answer: finalAnswer,
                questionNumber: questionNumber
            });
        }
    }
    
    return questions;
}

// Test progressive learning selection
function selectQuestionsForDay(allQuestions, dayNum, requestedCount) {
    if (!allQuestions || allQuestions.length === 0) {
        return [];
    }
    
    if (!requestedCount || requestedCount === 'all') {
        return allQuestions;
    }
    
    const countNum = parseInt(requestedCount);
    if (isNaN(countNum) || countNum <= 0) {
        return allQuestions;
    }
    
    const daySeed = dayNum || 1;
    const questionsPerDay = Math.min(countNum, allQuestions.length);
    
    let startIndex = (daySeed - 1) * questionsPerDay;
    
    if (startIndex >= allQuestions.length) {
        startIndex = startIndex % allQuestions.length;
    }
    
    const selected = [];
    for (let i = 0; i < questionsPerDay; i++) {
        const index = (startIndex + i) % allQuestions.length;
        selected.push(allQuestions[index]);
    }
    
    return selected;
}

// Test
console.log('='.repeat(80));
console.log('🧪 TESTING API PARSER WITH PROGRESSIVE LEARNING');
console.log('='.repeat(80));

const questionsFile = path.join(__dirname, 'algorithms', 'logic-questions', 'questions.md');
const content = fs.readFileSync(questionsFile, 'utf8');

console.log('\n📖 Parsing questions...');
const allQuestions = parseQuestionsFromMarkdown(content);
console.log(`✅ Parsed ${allQuestions.length} questions\n`);

// Test Days 1-5 and 71-75
const testDays = [1, 2, 3, 4, 5, 71, 72, 73, 74, 75];
const EXPECTED_COUNT = 3;

console.log('='.repeat(80));
console.log('📅 TESTING PROGRESSIVE LEARNING (Days 1-5 and 71-75)');
console.log('='.repeat(80));

const results = [];

testDays.forEach(dayNum => {
    const selected = selectQuestionsForDay(allQuestions, dayNum, EXPECTED_COUNT);
    results.push({
        day: dayNum,
        questions: selected,
        titles: selected.map(q => q.question)
    });
    
    console.log(`\n📅 Day ${dayNum}:`);
    console.log(`   Questions: ${selected.length} (expected: ${EXPECTED_COUNT})`);
    selected.forEach((q, idx) => {
        const title = q.question.substring(0, 50);
        const hasJS = q.answer.includes('```javascript') || q.answer.includes('### JavaScript');
        const hasPython = q.answer.includes('```python') || q.answer.includes('### Python');
        console.log(`   ${idx + 1}. ${title}...`);
        console.log(`      JS: ${hasJS ? '✅' : '❌'}, Python: ${hasPython ? '✅' : '❌'}`);
    });
});

// Analyze
console.log('\n' + '='.repeat(80));
console.log('📊 PROGRESSIVE LEARNING ANALYSIS');
console.log('='.repeat(80));

const first5 = results.filter(r => r.day <= 5);
const last5 = results.filter(r => r.day >= 71);

const first5Titles = new Set(first5.flatMap(r => r.titles));
const last5Titles = new Set(last5.flatMap(r => r.titles));

console.log(`\n📅 First 5 Days:`);
console.log(`   Total unique questions: ${first5Titles.size}`);
console.log(`   Expected if all different: ${5 * EXPECTED_COUNT}`);

console.log(`\n📅 Last 5 Days:`);
console.log(`   Total unique questions: ${last5Titles.size}`);
console.log(`   Expected if all different: ${5 * EXPECTED_COUNT}`);

// Check consecutive days
console.log(`\n🔄 Consecutive Day Overlap:`);
for (let i = 0; i < results.length - 1; i++) {
    const day1 = results[i];
    const day2 = results[i + 1];
    const overlap = day1.titles.filter(t => day2.titles.includes(t));
    if (overlap.length > 0) {
        console.log(`   ⚠️  Day ${day1.day} and Day ${day2.day}: ${overlap.length} shared question(s)`);
    } else {
        console.log(`   ✅ Day ${day1.day} and Day ${day2.day}: No overlap`);
    }
}

// Check if Day 1 and Day 2 are different
const day1Titles = new Set(results[0].titles);
const day2Titles = new Set(results[1].titles);
const day1Day2Overlap = [...day1Titles].filter(t => day2Titles.has(t));

console.log(`\n🎯 Key Test: Day 1 vs Day 2`);
console.log(`   Day 1 questions: ${results[0].titles.map(t => t.substring(0, 30)).join(', ')}`);
console.log(`   Day 2 questions: ${results[1].titles.map(t => t.substring(0, 30)).join(', ')}`);
console.log(`   Overlap: ${day1Day2Overlap.length} question(s)`);
if (day1Day2Overlap.length === 0) {
    console.log(`   ✅ SUCCESS: Day 1 and Day 2 have different questions!`);
} else {
    console.log(`   ⚠️  Day 1 and Day 2 share questions (this is OK if questions wrap around)`);
}

console.log('\n' + '='.repeat(80));
console.log('✅ TEST COMPLETE');
console.log('='.repeat(80));
console.log(`\n📊 Total questions in file: ${allQuestions.length}`);
console.log(`📊 Questions per day: ${EXPECTED_COUNT}`);
console.log(`📊 Days that can be covered: ${Math.floor(allQuestions.length / EXPECTED_COUNT)}`);
console.log(`📊 Total days in schedule: 75`);
console.log(`\n${allQuestions.length >= 75 * EXPECTED_COUNT ? '✅' : '⚠️'} ${allQuestions.length >= 75 * EXPECTED_COUNT ? 'Enough questions for all 75 days!' : `Need ${75 * EXPECTED_COUNT - allQuestions.length} more questions`}\n`);
