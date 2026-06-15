#!/usr/bin/env node
/**
 * Validates Design Patterns hub: all IDs present, Theory/Answer/Explanation, Python code blocks.
 * Run: npm run design-patterns:validate
 */
const path = require('path');
const {
  TOPIC_RANGES,
  PACK_FILES,
  loadAllDesignPatternQuestions,
  topicFromId
} = require('../apps/web/api/design-patterns-hub/questions.js');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'content/design-patterns-hub');

let failed = false;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

console.log('Design Patterns hub validation\n');

for (const file of Object.values(PACK_FILES)) {
  const fp = path.join(dir, file);
  if (!require('fs').existsSync(fp)) {
    fail(`Missing file: content/design-patterns-hub/${file}`);
  }
}

const all = loadAllDesignPatternQuestions();
console.log(`Total parsed patterns: ${all.size}`);

for (const [slug, range] of Object.entries(TOPIC_RANGES)) {
  const ids = [];
  for (let i = range.min; i <= range.max; i++) {
    if (all.has(i)) ids.push(i);
  }
  const expected = range.max - range.min + 1;
  console.log(`  ${slug}: ${ids.length}/${expected}`);
  if (ids.length !== expected) {
    fail(`${slug} has ${ids.length} patterns; expected ${expected}`);
  }
  for (const id of ids) {
    const q = all.get(id);
    if (!q.question) fail(`DP${id} missing title`);
    if (!q.answer.includes('Theory:')) fail(`DP${id} missing Theory`);
    if (!q.answer.includes('Answer:')) fail(`DP${id} missing Answer`);
    if (!q.answer.includes('Explanation:')) fail(`DP${id} missing Explanation`);
    if (!q.answer.includes('Code:')) fail(`DP${id} missing Python code block`);
    const topic = topicFromId(id);
    if (topic !== range.label) {
      fail(`DP${id} topic mismatch: expected ${range.label}, got ${topic}`);
    }
  }
}

if (failed) {
  console.error('\nValidation FAILED.');
  process.exit(1);
}
console.log('\nValidation PASSED.');
process.exit(0);
