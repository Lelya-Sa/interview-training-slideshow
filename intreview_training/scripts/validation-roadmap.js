const fs = require('fs');
const path = require('path');

// Configuration
const DAILY_SCHEDULE_PATH = path.join(__dirname, 'daily-schedule');
const TOTAL_DAYS = 75;

// Question requirements per topic type
const QUESTION_REQUIREMENTS = {
  // Practice topics (daily practice)
  'logic-questions': { minPerDay: 2, maxPerDay: 5, avgPerDay: 3 },
  'leetcode': { minPerDay: 1, maxPerDay: 3, avgPerDay: 2 },
  'data-structures': { minPerDay: 5, maxPerDay: 5, avgPerDay: 5 },
  
  // Full topics (show 12 per day for progressive learning)
  'full-topic': { minPerDay: 12, maxPerDay: 12, avgPerDay: 12 }
};

// Helper function to determine topic type
function getTopicType(topicName, topicPath) {
  const nameLower = topicName.toLowerCase();
  const pathLower = topicPath.toLowerCase();
  
  if (nameLower.includes('logic') || pathLower.includes('logic-questions')) {
    return 'logic-questions';
  }
  if (nameLower.includes('leetcode') || pathLower.includes('leetcode')) {
    return 'leetcode';
  }
  if (nameLower.includes('data structures') || pathLower.includes('data-structures')) {
    return 'data-structures';
  }
  
  return 'full-topic';
}

// Scan all days and collect topics
const topicsMap = new Map();

console.log('📋 Scanning all 75 days for topics...\n');

for (let day = 1; day <= TOTAL_DAYS; day++) {
  const dayDir = `day-${String(day).padStart(2, '0')}`;
  const topicsFilePath = path.join(DAILY_SCHEDULE_PATH, dayDir, 'topics.md');
  
  if (!fs.existsSync(topicsFilePath)) {
    console.warn(`⚠️  Day ${day}: topics.md not found`);
    continue;
  }
  
  const content = fs.readFileSync(topicsFilePath, 'utf8');
  const lines = content.split('\n');
  
  let currentTopic = null;
  let currentCategory = 'CORE';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for category
    if (line.includes('Core Topics')) {
      currentCategory = 'CORE';
      continue;
    }
    if (line.includes('Extra Topics')) {
      currentCategory = 'EXTRA';
      continue;
    }
    
    // Topic name (starts with ###)
    const topicMatch = line.match(/^###\s+(.+)$/);
    if (topicMatch) {
      currentTopic = topicMatch[1].trim();
      continue;
    }
    
    // Path - try multiple patterns (comes after topic name)
    const pathPatterns = [
      /- \*\*Path\*\*:\s*`([^`]+)`/,  // - **Path**: `...`
      /Path:\s*`([^`]+)`/,            // Path: `...`
      /- Path:\s*`([^`]+)`/           // - Path: `...`
    ];
    
    for (const pattern of pathPatterns) {
      const pathMatch = line.match(pattern);
      if (pathMatch && currentTopic) {
        let cleanPath = pathMatch[1];
        // Remove ../.. prefixes
        while (cleanPath.startsWith('../')) {
          cleanPath = cleanPath.replace(/^\.\.\//, '');
        }
        
        if (!topicsMap.has(cleanPath)) {
          topicsMap.set(cleanPath, {
            name: currentTopic,
            path: cleanPath,
            category: currentCategory,
            days: [],
            topicType: null // Will be determined later
          });
        }
        
        topicsMap.get(cleanPath).days.push(day);
        currentTopic = null;
        break; // Found the path, move on
      }
    }
  }
}

console.log(`✅ Found ${topicsMap.size} unique topics across ${TOTAL_DAYS} days\n`);

// Determine topic types and calculate requirements
const validationRoadmap = [];

for (const [topicPath, topicData] of topicsMap.entries()) {
  const topicType = getTopicType(topicData.name, topicPath);
  topicData.topicType = topicType;
  
  const requirements = QUESTION_REQUIREMENTS[topicType];
  const dayCount = topicData.days.length;
  
  // Calculate minimum questions needed
  // For practice topics: minPerDay * dayCount (worst case)
  // For full topics: avgPerDay * dayCount (progressive learning)
  let minQuestionsNeeded;
  if (topicType === 'full-topic') {
    // Full topics: 12 questions per day, so we need at least 12 * dayCount
    // But since we cycle through, we need at least 12 questions total
    minQuestionsNeeded = Math.max(12, requirements.avgPerDay * Math.ceil(dayCount / Math.ceil(70 / requirements.avgPerDay)));
  } else {
    // Practice topics: need enough for all days
    minQuestionsNeeded = requirements.minPerDay * dayCount;
  }
  
  // Calculate recommended questions (for variety)
  const recommendedQuestions = requirements.avgPerDay * dayCount;
  
  validationRoadmap.push({
    topicName: topicData.name,
    topicPath: topicPath,
    category: topicData.category,
    topicType: topicType,
    appearsInDays: dayCount,
    days: topicData.days,
    requirements: {
      minPerDay: requirements.minPerDay,
      maxPerDay: requirements.maxPerDay,
      avgPerDay: requirements.avgPerDay
    },
    questionsNeeded: {
      minimum: minQuestionsNeeded,
      recommended: recommendedQuestions
    }
  });
}

// Sort by category and then by day count (most frequent first)
validationRoadmap.sort((a, b) => {
  if (a.category !== b.category) {
    return a.category === 'CORE' ? -1 : 1;
  }
  return b.appearsInDays - a.appearsInDays;
});

// Generate validation roadmap report
console.log('='.repeat(80));
console.log('📊 VALIDATION ROADMAP - All Topics Across 75 Days');
console.log('='.repeat(80));
console.log(`\nTotal Unique Topics: ${validationRoadmap.length}`);
console.log(`Core Topics: ${validationRoadmap.filter(t => t.category === 'CORE').length}`);
console.log(`Extra Topics: ${validationRoadmap.filter(t => t.category === 'EXTRA').length}\n`);

// Group by topic type
const byType = {
  'logic-questions': validationRoadmap.filter(t => t.topicType === 'logic-questions'),
  'leetcode': validationRoadmap.filter(t => t.topicType === 'leetcode'),
  'data-structures': validationRoadmap.filter(t => t.topicType === 'data-structures'),
  'full-topic': validationRoadmap.filter(t => t.topicType === 'full-topic')
};

console.log('📋 TOPICS BY TYPE:\n');
console.log(`Practice Topics:`);
console.log(`  - Logic Questions: ${byType['logic-questions'].length} topic(s)`);
console.log(`  - LeetCode: ${byType['leetcode'].length} topic(s)`);
console.log(`  - Data Structures: ${byType['data-structures'].length} topic(s)`);
console.log(`\nFull Topics: ${byType['full-topic'].length} topic(s)\n`);

// Detailed list
console.log('='.repeat(80));
console.log('📝 DETAILED VALIDATION ROADMAP');
console.log('='.repeat(80));
console.log('\n[Format: Topic Name | Path | Type | Days | Min Questions | Recommended Questions]\n');

let validationOrder = 1;

for (const topic of validationRoadmap) {
  const typeLabel = topic.topicType === 'full-topic' ? 'FULL' : topic.topicType.toUpperCase();
  const categoryLabel = topic.category === 'CORE' ? '🔥 CORE' : '⭐ EXTRA';
  
  console.log(`${validationOrder}. ${categoryLabel} | ${topic.topicName}`);
  console.log(`   Path: ${topic.topicPath}`);
  console.log(`   Type: ${typeLabel} | Appears in ${topic.appearsInDays} day(s)`);
  console.log(`   Days: ${topic.days.slice(0, 10).join(', ')}${topic.days.length > 10 ? ` ... (+${topic.days.length - 10} more)` : ''}`);
  console.log(`   Requirements: ${topic.requirements.minPerDay}-${topic.requirements.maxPerDay} per day (avg: ${topic.requirements.avgPerDay})`);
  console.log(`   Questions Needed: Minimum ${topic.questionsNeeded.minimum}, Recommended ${topic.questionsNeeded.recommended}`);
  console.log('');
  
  validationOrder++;
}

// Save to file
const outputPath = path.join(__dirname, 'VALIDATION_ROADMAP.md');
const markdownReport = `# Validation Roadmap - All Topics for 75 Days

Generated: ${new Date().toISOString()}

## Summary

- **Total Unique Topics**: ${validationRoadmap.length}
- **Core Topics**: ${validationRoadmap.filter(t => t.category === 'CORE').length}
- **Extra Topics**: ${validationRoadmap.filter(t => t.category === 'EXTRA').length}

## Validation Order

We will validate topics one by one in the following order:

${validationRoadmap.map((topic, idx) => {
  const typeLabel = topic.topicType === 'full-topic' ? 'FULL' : topic.topicType.toUpperCase();
  const categoryLabel = topic.category === 'CORE' ? '🔥 CORE' : '⭐ EXTRA';
  return `${idx + 1}. **${categoryLabel}** - ${topic.topicName}\n   - Path: \`${topic.topicPath}\`\n   - Type: ${typeLabel}\n   - Appears in: ${topic.appearsInDays} day(s)\n   - Questions Needed: Min ${topic.questionsNeeded.minimum}, Recommended ${topic.questionsNeeded.recommended}`;
}).join('\n\n')}

## Validation Checklist Per Topic

For each topic, we will check:

1. ✅ **File Exists**: Does the markdown file exist at the specified path?
2. ✅ **Question Count**: Does it have enough questions for all ${TOTAL_DAYS} days?
3. ✅ **Question Format**: Are questions properly formatted (### Question format)?
4. ✅ **Answer Format**: Do all questions have answers?
5. ✅ **Uniqueness**: Are questions unique (no duplicates)?
6. ✅ **Progressive Learning**: For full topics, are there enough questions for progressive learning (12 per day)?

## Question Requirements

### Practice Topics
- **Logic Questions**: 2-5 questions per day (avg: 3)
- **LeetCode**: 1-3 problems per day (avg: 2)
- **Data Structures**: 5 questions per day

### Full Topics
- **All other topics**: 12 questions per day (progressive learning)

## Next Steps

We will validate each topic one by one. Start with topic #1 and proceed sequentially.
`;

fs.writeFileSync(outputPath, markdownReport, 'utf8');

console.log('='.repeat(80));
console.log(`✅ Validation roadmap saved to: ${outputPath}`);
console.log('='.repeat(80));
console.log(`\n📋 Ready to validate ${validationRoadmap.length} topics one by one.`);
if (validationRoadmap.length > 0) {
  console.log(`\nStart with topic #1: ${validationRoadmap[0].topicName}`);
  console.log(`   Path: ${validationRoadmap[0].topicPath}\n`);
} else {
  console.log('\n⚠️  No topics found. Please check the daily-schedule directory structure.\n');
}
