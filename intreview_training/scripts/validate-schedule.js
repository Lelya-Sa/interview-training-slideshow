#!/usr/bin/env node
/**
 * Schedule Validation Script
 *
 * Validates that:
 * 1. Every day (1-75) has a topics.md with required topics
 * 2. Every topic path exists and points to a questions.md file
 * 3. Each topic file has enough questions for progressive daily coverage
 *    (Logic: 3/day × 75 = 225 min; LeetCode: 2/day × 75 = 150; Data Structures: 5/day × 75 = 375; Full topics: 12/day × 75 = 900)
 *
 * Run from intreview_training: node scripts/validate-schedule.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DAILY_SCHEDULE = path.join(ROOT, 'daily-schedule');

// Questions per day by topic type (matches QuestionsView.js getQuestionCountForTopic)
const QUESTIONS_PER_DAY = {
  logic: 3,
  leetcode: 2,   // 1-3 avg 2
  'data-structures': 5,
  default: 12
};

function cleanPath(raw) {
  let p = raw.trim();
  while (p.startsWith('../')) p = p.replace(/^\.\.\//, '');
  return p.replace(/\//g, path.sep);
}

function countQuestionsInFile(filePath) {
  if (!fs.existsSync(filePath)) return { count: 0, error: 'File not found' };
  const content = fs.readFileSync(filePath, 'utf8');
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n');
  let n = 0;
  const langSubs = new Set(['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust']);
  for (const line of lines) {
    const trimmed = line.trim();
    const m = trimmed.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
    if (m && !langSubs.has(m[1])) n++;
  }
  return { count: n };
}

function getQuestionsPerDay(topicName, topicPath) {
  const lower = (topicName + topicPath).toLowerCase();
  if (lower.includes('logic')) return QUESTIONS_PER_DAY.logic;
  if (lower.includes('leetcode')) return QUESTIONS_PER_DAY.leetcode;
  if (lower.includes('data structures')) return QUESTIONS_PER_DAY['data-structures'];
  return QUESTIONS_PER_DAY.default;
}

function extractTopicsFromDay(dayPath) {
  const topicsPath = path.join(dayPath, 'topics.md');
  if (!fs.existsSync(topicsPath)) return [];
  const content = fs.readFileSync(topicsPath, 'utf8');
  const topics = [];
  const lines = content.split(/\r?\n/);
  let currentTopic = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Topic name: ### Name (not ## Core/Extra Topics)
    const nameMatch = line.match(/^###\s+(.+)$/);
    if (nameMatch && !line.includes('Core Topics') && !line.includes('Extra Topics')) {
      currentTopic = { name: nameMatch[1].trim(), path: '' };
      continue;
    }
    // Path: - **Path**: `...` or **Path**: `...`
    const pathMatch = line.match(/\*\*Path\*\*:\s*`([^`]+)`/) || line.match(/Path:\s*`([^`]+)`/);
    if (pathMatch && currentTopic) {
      currentTopic.path = cleanPath(pathMatch[1]);
      topics.push({ ...currentTopic });
      currentTopic = null;
    }
  }
  return topics;
}

function main() {
  console.log('=== Schedule validation (intreview_training) ===\n');
  console.log('Root:', ROOT);
  console.log('Daily schedule:', DAILY_SCHEDULE);
  console.log('');

  const missingFiles = [];
  const questionCounts = new Map(); // path -> { count, minRequired, daysUsed }
  const daysByPath = new Map();     // path -> [day numbers]
  const dayTopicCount = [];
  let daysWithMissingTopics = 0;

  for (let d = 1; d <= 75; d++) {
    const dayDir = path.join(DAILY_SCHEDULE, `day-${String(d).padStart(2, '0')}`);
    const topics = extractTopicsFromDay(dayDir);
    dayTopicCount.push({ day: d, count: topics.length });

    for (const t of topics) {
      const fullPath = path.join(ROOT, t.path);
      if (!fs.existsSync(fullPath)) {
        missingFiles.push({ day: d, topic: t.name, path: t.path });
        if (!daysWithMissingTopics || dayTopicCount[dayTopicCount.length - 1].day === d) daysWithMissingTopics++;
      }
      if (!daysByPath.has(t.path)) daysByPath.set(t.path, []);
      daysByPath.get(t.path).push(d);
      if (!questionCounts.has(t.path)) {
        const res = countQuestionsInFile(fullPath);
        const perDay = getQuestionsPerDay(t.name, t.path);
        questionCounts.set(t.path, { count: res.count, perDay, topicName: t.name });
      }
    }
  }

  // Report: missing files
  const missingUnique = [...new Set(missingFiles.map(m => m.path))];
  console.log('--- 1. Missing topic files ---');
  if (missingUnique.length === 0) {
    console.log('OK: All topic paths exist.\n');
  } else {
    console.log('Missing paths (' + missingUnique.length + '):');
    missingUnique.forEach(p => console.log('  -', p));
    console.log('Days affected:', [...new Set(missingFiles.map(m => m.day))].sort((a,b)=>a-b).join(', '));
    console.log('');
  }

  // Report: question counts vs min required (min = daysUsed * perDay so each day gets fresh questions)
  console.log('--- 2. Question counts (progressive daily coverage) ---');
  console.log('Per day: Logic 3, LeetCode 2, Data Structures 5, Other 12. Min = days used × per day.\n');
  const low = [];
  const ok = [];
  for (const [p, info] of questionCounts.entries()) {
    const daysUsed = daysByPath.get(p)?.length || 0;
    const minRequired = daysUsed * info.perDay;
    const status = info.count >= minRequired ? 'OK' : 'LOW';
    const line = `${status} ${p} → ${info.count} questions (min ${minRequired} for ${daysUsed} days × ${info.perDay}/day)`;
    if (status === 'LOW') low.push(line);
    else ok.push(line);
  }
  low.forEach(l => console.log(l));
  if (low.length) console.log('');
  ok.slice(0, 25).forEach(l => console.log(l));
  if (ok.length > 25) console.log('... and', ok.length - 25, 'more OK');
  console.log('');

  // Report: days with few topics (possible missing topics)
  const daysWithFewTopics = dayTopicCount.filter(x => x.count < 4);
  console.log('--- 3. Days with fewer than 4 topics ---');
  if (daysWithFewTopics.length === 0) {
    console.log('None. Every day has at least 4 topics.\n');
  } else {
    daysWithFewTopics.forEach(({ day, count }) => console.log(`  Day ${day}: ${count} topics`));
    console.log('');
  }

  console.log('--- Summary ---');
  console.log('Missing files:', missingUnique.length);
  console.log('Topics with low question count:', low.length);
  console.log('Days with < 4 topics:', daysWithFewTopics.length);
  process.exit(missingUnique.length > 0 ? 1 : 0);
}

main();
