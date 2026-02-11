// Using Node's built-in fetch (Node 18+)
const BASE_URL = 'http://localhost:5000'; // Local server
const TEST_DAYS = [1, 2, 3, 4, 5, 71, 72, 73, 74, 75];
const EXPECTED_LOGIC_COUNT = 3;

console.log('='.repeat(80));
console.log('🧪 TESTING FRONTEND API - LOGIC QUESTIONS');
console.log('='.repeat(80));
console.log(`\n📍 Testing against: ${BASE_URL}`);
console.log(`📅 Testing days: ${TEST_DAYS.join(', ')}`);
console.log(`🎯 Expected Logic Questions per day: ${EXPECTED_LOGIC_COUNT}\n`);

async function testDay(dayNumber) {
  try {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📅 DAY ${dayNumber}`);
    console.log('='.repeat(80));
    
    // Step 1: Get day data
    console.log(`\n1️⃣ Fetching day ${dayNumber} data...`);
    const dayResponse = await fetch(`${BASE_URL}/api/roadmap/days/${dayNumber}`, {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!dayResponse.ok) {
      console.error(`❌ Failed to load day ${dayNumber}: ${dayResponse.status}`);
      return null;
    }
    
    const dayData = await dayResponse.json();
    if (!dayData.success) {
      console.error(`❌ Failed to load day ${dayNumber}`);
      return null;
    }
    
    const day = dayData.day;
    console.log(`✅ Day ${dayNumber} loaded`);
    console.log(`   Topics: ${day.topics.length}`);
    
    // Step 2: Find Logic Questions topic
    const logicTopic = day.topics.find(t => {
      const name = (t.name || t.text || '').toLowerCase();
      return name.includes('logic');
    });
    
    if (!logicTopic) {
      console.log(`⚠️  No Logic Questions topic found in Day ${dayNumber}`);
      return null;
    }
    
    console.log(`\n2️⃣ Found Logic Questions topic:`);
    console.log(`   Name: ${logicTopic.name || logicTopic.text}`);
    console.log(`   Path: ${logicTopic.path}`);
    
    // Step 3: Fetch questions
    console.log(`\n3️⃣ Fetching questions (day=${dayNumber}, count=${EXPECTED_LOGIC_COUNT})...`);
    const params = new URLSearchParams({
      path: logicTopic.path,
      dayNumber: dayNumber.toString(),
      count: EXPECTED_LOGIC_COUNT.toString()
    });
    
    const questionsResponse = await fetch(`${BASE_URL}/api/questions?${params}`, {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!questionsResponse.ok) {
      console.error(`❌ Failed to load questions: ${questionsResponse.status}`);
      return null;
    }
    
    const questionsData = await questionsResponse.json();
    if (!questionsData.success) {
      console.error(`❌ Failed to load questions`);
      console.error(`   Error: ${questionsData.message || 'Unknown error'}`);
      return null;
    }
    
    const questions = questionsData.questions || [];
    const totalAvailable = questionsData.totalAvailable || 0;
    
    console.log(`✅ Questions loaded`);
    console.log(`   Returned: ${questions.length} questions`);
    console.log(`   Total available: ${totalAvailable}`);
    
    // Step 4: Validate count
    if (questions.length !== EXPECTED_LOGIC_COUNT) {
      console.error(`\n❌ COUNT MISMATCH!`);
      console.error(`   Expected: ${EXPECTED_LOGIC_COUNT}`);
      console.error(`   Got: ${questions.length}`);
    } else {
      console.log(`\n✅ Count correct: ${questions.length} questions`);
    }
    
    // Step 5: Display questions
    console.log(`\n4️⃣ Questions for Day ${dayNumber}:`);
    questions.forEach((q, idx) => {
      const title = q.question.substring(0, 60);
      const hasJS = q.answer.includes('```javascript') || q.answer.includes('### JavaScript');
      const hasPython = q.answer.includes('```python') || q.answer.includes('### Python');
      const answerLength = q.answer.length;
      
      console.log(`\n   ${idx + 1}. ${title}${q.question.length > 60 ? '...' : ''}`);
      console.log(`      Answer length: ${answerLength} chars`);
      console.log(`      JavaScript: ${hasJS ? '✅' : '❌'}`);
      console.log(`      Python: ${hasPython ? '✅' : '❌'}`);
      
      // Check if it's a system design question (shouldn't be)
      const isSystemDesign = ['cache', 'design', 'system', 'api', 'database', 'session', 
                              'server', 'search', 'debug', 'optimize'].some(keyword => 
        q.question.toLowerCase().includes(keyword)
      );
      
      if (isSystemDesign) {
        console.log(`      ⚠️  WARNING: This looks like a system design question!`);
      }
    });
    
    return {
      dayNumber,
      questions,
      questionTitles: questions.map(q => q.question),
      count: questions.length,
      totalAvailable
    };
    
  } catch (error) {
    console.error(`\n❌ ERROR testing Day ${dayNumber}:`);
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      console.error(`   Cannot connect to server at ${BASE_URL}`);
      console.error(`   Make sure the server is running: cd slideshow-app && npm run server`);
    } else if (error.name === 'AbortError') {
      console.error(`   Request timeout`);
    } else {
      console.error(`   ${error.message}`);
    }
    return null;
  }
}

async function runTests() {
  const results = [];
  
  // Test all days
  for (const day of TEST_DAYS) {
    const result = await testDay(day);
    if (result) {
      results.push(result);
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Summary
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  
  const allCorrectCount = results.every(r => r.count === EXPECTED_LOGIC_COUNT);
  const totalQuestions = results.reduce((sum, r) => sum + r.count, 0);
  const avgQuestions = totalQuestions / results.length;
  
  console.log(`\n✅ Days tested: ${results.length}/${TEST_DAYS.length}`);
  console.log(`✅ All have correct count (${EXPECTED_LOGIC_COUNT}): ${allCorrectCount ? 'YES ✅' : 'NO ❌'}`);
  console.log(`📊 Total questions shown: ${totalQuestions}`);
  console.log(`📊 Average per day: ${avgQuestions.toFixed(2)}`);
  
  // Check for duplicates
  console.log(`\n🔄 Progressive Learning Check:`);
  const allTitles = new Set();
  let duplicates = 0;
  
  results.forEach(r => {
    r.questionTitles.forEach(title => {
      if (allTitles.has(title)) {
        duplicates++;
      }
      allTitles.add(title);
    });
  });
  
  console.log(`   Total unique questions: ${allTitles.size}`);
  console.log(`   Duplicates across test days: ${duplicates}`);
  
  // Check Day 1 vs Day 2
  if (results.length >= 2) {
    const day1 = results[0];
    const day2 = results[1];
    const overlap = day1.questionTitles.filter(t => day2.questionTitles.includes(t));
    console.log(`\n🎯 Day 1 vs Day 2:`);
    console.log(`   Overlap: ${overlap.length} question(s)`);
    if (overlap.length === 0) {
      console.log(`   ✅ SUCCESS: Day 1 and Day 2 have different questions!`);
    } else {
      console.log(`   ⚠️  Day 1 and Day 2 share: ${overlap.map(t => t.substring(0, 40)).join(', ')}`);
    }
  }
  
  // Check for system design questions
  console.log(`\n🔍 System Design Check:`);
  let systemDesignCount = 0;
  results.forEach(r => {
    r.questions.forEach(q => {
      const isSystemDesign = ['cache', 'design', 'system', 'api', 'database', 'session', 
                              'server', 'search', 'debug', 'optimize'].some(keyword => 
        q.question.toLowerCase().includes(keyword)
      );
      if (isSystemDesign) {
        systemDesignCount++;
        console.log(`   ⚠️  Found: "${q.question.substring(0, 50)}..."`);
      }
    });
  });
  
  if (systemDesignCount === 0) {
    console.log(`   ✅ No system design questions found!`);
  } else {
    console.log(`   ❌ Found ${systemDesignCount} system design question(s) - these should be removed!`);
  }
  
  // Final verdict
  console.log(`\n${'='.repeat(80)}`);
  if (allCorrectCount && duplicates === 0 && systemDesignCount === 0) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Logic Questions are working correctly in the frontend!');
  } else {
    console.log('⚠️  SOME ISSUES FOUND');
    if (!allCorrectCount) console.log('   - Question count mismatch');
    if (duplicates > 0) console.log('   - Duplicate questions found');
    if (systemDesignCount > 0) console.log('   - System design questions found');
  }
  console.log('='.repeat(80) + '\n');
}

// Run tests
runTests().catch(error => {
  console.error('\n❌ Test suite failed:', error.message);
  if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
    console.error('\n💡 TIP: Start the server first:');
    console.error('   cd slideshow-app');
    console.error('   npm run server');
  }
  process.exit(1);
});
