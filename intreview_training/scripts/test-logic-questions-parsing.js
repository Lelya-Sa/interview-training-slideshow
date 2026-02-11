const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5000'; // Local server
// const BASE_URL = 'https://your-vercel-url.vercel.app'; // For Vercel

const LOGIC_QUESTIONS_PATH = 'algorithms/logic-questions/questions.md';
const TEST_DAYS = [1, 2, 3, 4, 5, 71, 72, 73, 74, 75];
const EXPECTED_COUNT = 3; // Logic Questions should show 3 per day

console.log('='.repeat(80));
console.log('🧪 TESTING LOGIC QUESTIONS PARSING & PROGRESSIVE LEARNING');
console.log('='.repeat(80));

async function testDay(dayNumber) {
  console.log(`\n📅 Testing Day ${dayNumber}`);
  console.log('-'.repeat(80));
  
  try {
    // Step 1: Get day data to find Logic Questions topic
    const dayResponse = await axios.get(`${BASE_URL}/api/roadmap/days/${dayNumber}`);
    
    if (!dayResponse.data.success) {
      console.error(`❌ Failed to load day ${dayNumber}`);
      return null;
    }
    
    const day = dayResponse.data.day;
    const logicTopic = day.topics.find(t => 
      t.name?.toLowerCase().includes('logic') || 
      t.text?.toLowerCase().includes('logic')
    );
    
    if (!logicTopic) {
      console.log(`⚠️  Day ${dayNumber} has no Logic Questions topic`);
      return null;
    }
    
    console.log(`✅ Found Logic Questions topic: "${logicTopic.name || logicTopic.text}"`);
    console.log(`   Path: ${logicTopic.path}`);
    
    // Step 2: Fetch questions for this day
    const questionsResponse = await axios.get(`${BASE_URL}/api/questions`, {
      params: {
        path: logicTopic.path,
        dayNumber: dayNumber,
        count: EXPECTED_COUNT
      }
    });
    
    if (!questionsResponse.data.success) {
      console.error(`❌ Failed to load questions for day ${dayNumber}`);
      return null;
    }
    
    const questions = questionsResponse.data.questions || [];
    const totalAvailable = questionsResponse.data.totalAvailable || 0;
    
    console.log(`📊 Questions returned: ${questions.length} (requested: ${EXPECTED_COUNT})`);
    console.log(`📊 Total available: ${totalAvailable}`);
    
    if (questions.length !== EXPECTED_COUNT) {
      console.warn(`⚠️  Expected ${EXPECTED_COUNT} questions, got ${questions.length}`);
    }
    
    // Step 3: Display question titles
    console.log(`\n📝 Questions for Day ${dayNumber}:`);
    questions.forEach((q, idx) => {
      const title = q.question.substring(0, 60);
      console.log(`   ${idx + 1}. ${title}${q.question.length > 60 ? '...' : ''}`);
      
      // Check if answer contains both JavaScript and Python
      const hasJS = q.answer.includes('JavaScript') || q.answer.includes('javascript') || q.answer.includes('```javascript');
      const hasPython = q.answer.includes('Python') || q.answer.includes('python') || q.answer.includes('```python');
      
      if (hasJS && hasPython) {
        console.log(`      ✅ Has both JS and Python implementations`);
      } else if (hasJS) {
        console.log(`      ⚠️  Only JavaScript implementation`);
      } else if (hasPython) {
        console.log(`      ⚠️  Only Python implementation`);
      }
    });
    
    return {
      dayNumber,
      questions,
      questionTitles: questions.map(q => q.question),
      totalAvailable
    };
    
  } catch (error) {
    console.error(`❌ Error testing day ${dayNumber}:`, error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data:`, error.response.data);
    }
    return null;
  }
}

async function testProgressiveLearning() {
  console.log('\n' + '='.repeat(80));
  console.log('🔄 TESTING PROGRESSIVE LEARNING (Different Questions Each Day)');
  console.log('='.repeat(80));
  
  const results = [];
  
  // Test all days
  for (const day of TEST_DAYS) {
    const result = await testDay(day);
    if (result) {
      results.push(result);
    }
  }
  
  // Analyze progressive learning
  console.log('\n' + '='.repeat(80));
  console.log('📊 PROGRESSIVE LEARNING ANALYSIS');
  console.log('='.repeat(80));
  
  // Check first 5 days
  const first5Days = results.filter(r => r.dayNumber <= 5);
  const last5Days = results.filter(r => r.dayNumber >= 71);
  
  console.log('\n📅 First 5 Days (Days 1-5):');
  const first5Titles = new Set();
  first5Days.forEach(day => {
    day.questionTitles.forEach(title => first5Titles.add(title));
    console.log(`   Day ${day.dayNumber}: ${day.questions.length} questions`);
  });
  console.log(`   Total unique questions across first 5 days: ${first5Titles.size}`);
  console.log(`   Expected: ${5 * EXPECTED_COUNT} (if all different)`);
  
  console.log('\n📅 Last 5 Days (Days 71-75):');
  const last5Titles = new Set();
  last5Days.forEach(day => {
    day.questionTitles.forEach(title => last5Titles.add(title));
    console.log(`   Day ${day.dayNumber}: ${day.questions.length} questions`);
  });
  console.log(`   Total unique questions across last 5 days: ${last5Titles.size}`);
  console.log(`   Expected: ${5 * EXPECTED_COUNT} (if all different)`);
  
  // Check for overlaps
  console.log('\n🔄 Overlap Analysis:');
  const overlapFirstLast = [...first5Titles].filter(t => last5Titles.has(t));
  console.log(`   Questions appearing in both first 5 and last 5 days: ${overlapFirstLast.length}`);
  if (overlapFirstLast.length > 0) {
    console.log(`   ⚠️  Some questions repeat (this is OK if total questions < days × count)`);
  } else {
    console.log(`   ✅ No overlap between first 5 and last 5 days`);
  }
  
  // Check consecutive days
  console.log('\n📈 Consecutive Day Analysis:');
  for (let i = 0; i < results.length - 1; i++) {
    const day1 = results[i];
    const day2 = results[i + 1];
    if (day1 && day2) {
      const overlap = day1.questionTitles.filter(t => day2.questionTitles.includes(t));
      if (overlap.length > 0) {
        console.log(`   ⚠️  Day ${day1.dayNumber} and Day ${day2.dayNumber} share ${overlap.length} question(s)`);
      } else {
        console.log(`   ✅ Day ${day1.dayNumber} and Day ${day2.dayNumber} have different questions`);
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('✅ TEST SUMMARY');
  console.log('='.repeat(80));
  
  const allDaysHaveQuestions = results.length === TEST_DAYS.length;
  const allDaysHaveCorrectCount = results.every(r => r.questions.length === EXPECTED_COUNT);
  const totalUniqueQuestions = new Set(results.flatMap(r => r.questionTitles)).size;
  const totalQuestionsShown = results.reduce((sum, r) => sum + r.questions.length, 0);
  
  console.log(`\n✅ All test days loaded: ${allDaysHaveQuestions ? 'YES' : 'NO'}`);
  console.log(`✅ All days have correct count (${EXPECTED_COUNT}): ${allDaysHaveCorrectCount ? 'YES' : 'NO'}`);
  console.log(`📊 Total unique questions shown: ${totalUniqueQuestions}`);
  console.log(`📊 Total questions shown across all days: ${totalQuestionsShown}`);
  console.log(`📊 Average questions per day: ${(totalQuestionsShown / results.length).toFixed(2)}`);
  
  if (allDaysHaveQuestions && allDaysHaveCorrectCount) {
    console.log(`\n🎉 SUCCESS: Logic Questions are parsing correctly and showing progressive learning!`);
  } else {
    console.log(`\n⚠️  ISSUES FOUND: Please review the results above.`);
  }
}

// Run tests
testProgressiveLearning().catch(console.error);
