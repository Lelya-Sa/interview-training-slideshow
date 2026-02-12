#!/usr/bin/env node
/**
 * Verify Question Progression
 *
 * Checks that:
 * 1. Each day gets the scheduled number of questions per topic (Logic 3, LeetCode 2, Data Structures 5, others 12).
 * 2. Progressive logic: Day 1 = questions 1..N, Day 2 = N+1..2N, Day 3 = 2N+1..3N, etc.
 *    (Same as server selectQuestionsForDay: startIndex = (dayNum - 1) * perDay)
 * 3. Each topic file has enough questions for the days that use it (or wraps correctly).
 *
 * Run from intreview_training: node scripts/verify-question-progression.js
 *
 * Shared constants (must match):
 * - server/routes/questions.js: selectQuestionsForDay(allQuestions, dayNum, count)
 * - client QuestionsView.js: getQuestionCountForTopic(topicName, dayNum)
 * - scripts/validate-schedule.js: QUESTIONS_PER_DAY
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DAILY_SCHEDULE = path.join(ROOT, 'daily-schedule');

// Must match QuestionsView.js getQuestionCountForTopic and validate-schedule.js QUESTIONS_PER_DAY
const QUESTIONS_PER_DAY = {
  logic: 3,
  leetcode: 2,
  'data-structures': 5,
  default: 12
};

function getQuestionsPerDay(topicName, topicPath) {
  const lower = (topicName + ' ' + (topicPath || '')).toLowerCase();
  if (lower.includes('logic')) return QUESTIONS_PER_DAY.logic;
  if (lower.includes('leetcode')) return QUESTIONS_PER_DAY.leetcode;
  if (lower.includes('data structures')) return QUESTIONS_PER_DAY['data-structures'];
  return QUESTIONS_PER_DAY.default;
}

// Same progression logic as server/routes/questions.js selectQuestionsForDay
function getProgressiveRange(dayNum, perDay, totalQuestions) {
  const questionsPerDay = Math.min(perDay, totalQuestions);
  let startIndex = (dayNum - 1) * questionsPerDay;
  if (startIndex >= totalQuestions) {
    startIndex = startIndex % totalQuestions;
  }
  const indices = [];
  for (let i = 0; i < questionsPerDay; i++) {
    indices.push((startIndex + i) % totalQuestions);
  }
  return { startIndex: indices[0], endIndex: indices[indices.length - 1], indices, count: indices.length };
}

// Parse day README (same structure as roadmap.js) to get topics with paths
function parseDayReadme(dayPath) {
  const readmePath = path.join(dayPath, 'README.md');
  if (!fs.existsSync(readmePath)) return { topics: [] };
  const content = fs.readFileSync(readmePath, 'utf8');
  const day = { topics: [] };
  const lines = content.split(/\r?\n/);
  let currentSection = null;
  let lastTopicIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('CORE PRACTICE')) currentSection = 'corePractice';
    else if (line.includes('CORE TOPICS')) currentSection = 'topics';
    else if (line.includes('Completion')) currentSection = 'completion';

    if (line.trim().startsWith('- [ ]')) {
      const item = line.replace(/- \[ \]/, '').trim();
      if (currentSection === 'topics') {
        const nameMatch = item.match(/\*\*(.*?)\*\*/);
        let topicPath = '';
        const pathMatch = item.match(/Path:\s*`([^`]+)`/) ||
          (i + 1 < lines.length && lines[i + 1].match(/Path:\s*`([^`]+)`/));
        if (pathMatch) {
          topicPath = pathMatch[1].trim();
          while (topicPath.startsWith('../')) topicPath = topicPath.replace(/^\.\.\//, '');
          topicPath = topicPath.replace(/\//g, path.sep);
        }
        day.topics.push({
          name: nameMatch ? nameMatch[1].trim() : item,
          path: topicPath.replace(/\//g, path.sep)
        });
        lastTopicIndex = day.topics.length - 1;
      }
    } else if (currentSection === 'topics' && line.match(/Path:\s*`([^`]+)`/)) {
      const pathMatch = line.match(/Path:\s*`([^`]+)`/);
      if (pathMatch && lastTopicIndex >= 0) {
        let p = pathMatch[1].trim();
        while (p.startsWith('../')) p = p.replace(/^\.\.\//, '');
        day.topics[lastTopicIndex].path = p.replace(/\//g, path.sep);
      }
    }
  }
  return day;
}

// Count questions in markdown (same logic as questions.js parser - count ### headers that are not language subs)
function countQuestionsInFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n');
  const langSubs = new Set(['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust']);
  let n = 0;
  for (const line of lines) {
    const m = line.trim().match(/^###\s+(?:\d+\.\s+)?(.+)$/);
    if (m && !langSubs.has(m[1])) n++;
  }
  return n;
}

function main() {
  console.log('=== Verify question counts and progressive ranges ===\n');
  console.log('Schedule folder:', DAILY_SCHEDULE);
  console.log('Per-day counts: Logic', QUESTIONS_PER_DAY.logic, '| LeetCode', QUESTIONS_PER_DAY.leetcode,
    '| Data Structures', QUESTIONS_PER_DAY['data-structures'], '| Other', QUESTIONS_PER_DAY.default);
  console.log('');

  // Collect per path: { topicName, perDay, days: [day numbers] }
  const pathToInfo = new Map();
  const pathToName = new Map();

  const entries = fs.readdirSync(DAILY_SCHEDULE, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.startsWith('day-')) continue;
    const dayNum = parseInt(entry.name.replace('day-', ''), 10);
    const dayPath = path.join(DAILY_SCHEDULE, entry.name);
    const day = parseDayReadme(dayPath);
    for (const t of day.topics) {
      if (!t.path) continue;
      const perDay = getQuestionsPerDay(t.name, t.path);
      if (!pathToInfo.has(t.path)) {
        pathToInfo.set(t.path, { topicName: t.name, perDay, days: [] });
        pathToName.set(t.path, t.name);
      }
      const info = pathToInfo.get(t.path);
      info.days.push(dayNum);
    }
  }

  // Sort days for each path
  for (const info of pathToInfo.values()) {
    info.days.sort((a, b) => a - b);
  }

  let allOk = true;

  // For each path: load question count, verify progression for each day
  console.log('--- Per-topic progression (Day → question indices 1-based) ---\n');
  for (const [topicPath, info] of pathToInfo.entries()) {
    const fullPath = path.join(ROOT, topicPath);
    const total = countQuestionsInFile(fullPath);
    const { topicName, perDay, days } = info;
    const maxDay = Math.max(...days);
    const minRequired = maxDay * perDay;

    const status = total >= minRequired ? 'OK' : 'LOW';
    if (status === 'LOW') allOk = false;
    console.log(`${status} ${topicPath}`);
    console.log(`   Topic: ${topicName} | ${total} questions | ${perDay}/day | used on ${days.length} days (${days[0]}..${days[days.length - 1]})`);
    if (total < minRequired) {
      console.log(`   → Need at least ${minRequired} for progressive days 1..${maxDay} (or wrap).`);
    }

    // Show progressive ranges for first 3 days and last day
    const sampleDays = [...new Set([1, 2, 3].concat(days.includes(maxDay) ? [maxDay] : []))].sort((a, b) => a - b);
    for (const d of sampleDays) {
      if (d > maxDay) continue;
      const range = getProgressiveRange(d, perDay, total);
      if (range.indices.length === 0) {
        console.log(`   Day ${d}: (no questions - file empty or 0 count)`);
        continue;
      }
      const oneBased = range.indices.map(i => i + 1);
      const wrapNote = range.endIndex < range.startIndex ? ' (wraps)' : '';
      console.log(`   Day ${d}: indices 1-based ${oneBased[0]}..${oneBased[oneBased.length - 1]} (${range.count} questions)${wrapNote}`);
    }
    if (maxDay > 3 && !sampleDays.includes(maxDay)) {
      const range = getProgressiveRange(maxDay, perDay, total);
      if (range.indices.length > 0) {
        const oneBased = range.indices.map(i => i + 1);
        console.log(`   Day ${maxDay}: indices 1-based ${oneBased[0]}..${oneBased[oneBased.length - 1]} (${range.count} questions)`);
      }
    }
    console.log('');
  }

  console.log('--- Summary ---');
  console.log('Progressive logic: Day N gets questions (N-1)*perDay+1 .. N*perDay (1-based).');
  console.log('Server (selectQuestionsForDay) uses: startIndex = (dayNum-1)*questionsPerDay; then (startIndex+i)%total.');
  console.log(allOk ? 'All topics have enough questions for their scheduled days.' : 'Some topics have LOW count.');
  process.exit(allOk ? 0 : 1);
}

main();
