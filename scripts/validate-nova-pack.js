#!/usr/bin/env node
/**
 * Validates Nova Semiconductor interview pack: ≥20 Q per topic, required fields, C# blocks where expected.
 * Run: node scripts/validate-nova-pack.js
 */
const path = require('path');
const {
  TOPIC_RANGES,
  PACK_FILES,
  loadAllNovaQuestions,
  topicFromId
} = require('../apps/web/api/nova/questions.js');

const MIN_PER_TOPIC = 20;
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'content/nova-semiconductor');

let failed = false;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

console.log('Nova Semiconductor pack validation\n');

for (const file of PACK_FILES) {
  const fp = path.join(dir, file);
  if (!require('fs').existsSync(fp)) {
    fail(`Missing file: content/nova-semiconductor/${file}`);
  }
}

const all = loadAllNovaQuestions();
console.log(`Total parsed questions: ${all.size}`);

for (const [slug, range] of Object.entries(TOPIC_RANGES)) {
  const ids = [];
  for (let i = range.min; i <= range.max; i++) {
    if (all.has(i)) ids.push(i);
  }
  const count = ids.length;
  const expected = range.max - range.min + 1;
  console.log(`  ${slug}: ${count}/${expected} (min ${MIN_PER_TOPIC})`);
  if (count < MIN_PER_TOPIC) {
    fail(`${slug} has ${count} questions; need at least ${MIN_PER_TOPIC}`);
  }
  for (const id of ids) {
    const q = all.get(id);
    if (!q.question) fail(`NS${id} missing question title`);
    if (!q.answer.includes('Answer:')) fail(`NS${id} missing Answer block`);
    if (!q.answer.includes('Explanation:')) fail(`NS${id} missing Explanation block`);
    const topic = topicFromId(id);
    if (topic !== range.label) {
      fail(`NS${id} topic mismatch: expected ${range.label}, got ${topic}`);
    }
    if (slug === 'leetcode' || slug === 'code' || slug === 'threading') {
      if (!q.answer.includes('Code:')) {
        fail(`NS${id} (${slug}) should include a code block`);
      }
    }
  }
}

const seen = new Set();
for (const [id] of all) {
  if (seen.has(id)) fail(`Duplicate id ${id}`);
  seen.add(id);
}

if (failed) {
  console.error('\nValidation FAILED.');
  process.exit(1);
}
console.log('\nValidation PASSED (all topics ≥20, structure OK).');
process.exit(0);
