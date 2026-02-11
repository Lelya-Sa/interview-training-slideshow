#!/usr/bin/env node
/**
 * Topic-by-topic check: does each topic exist in the schedule AND in the program?
 *
 * - In schedule: topic path appears in at least one day's topics.md
 * - In program: questions.md file exists at that path under project root (intreview_training)
 *
 * Run from intreview_training: node scripts/check-topics-schedule-and-program.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DAILY_SCHEDULE = path.join(ROOT, 'daily-schedule');
const SKIP_DIRS = new Set(['slideshow-app', 'daily-schedule', 'node_modules', '.git']);

function cleanPath(raw) {
  let p = raw.trim();
  while (p.startsWith('../')) p = p.replace(/^\.\.\//, '');
  return p.replace(/\//g, path.sep);
}

function toKey(p) {
  return p.replace(/\\/g, '/');
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
    const nameMatch = line.match(/^###\s+(.+)$/);
    if (nameMatch && !line.includes('Core Topics') && !line.includes('Extra Topics')) {
      currentTopic = { name: nameMatch[1].trim(), path: '' };
      continue;
    }
    const pathMatch = line.match(/\*\*Path\*\*:\s*`([^`]+)`/) || line.match(/Path:\s*`([^`]+)`/);
    if (pathMatch && currentTopic) {
      currentTopic.path = cleanPath(pathMatch[1]);
      topics.push({ ...currentTopic });
      currentTopic = null;
    }
  }
  return topics;
}

function collectProgramPaths(dir, baseDir, out) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.git') continue;
    const full = path.join(dir, e.name);
    const rel = path.relative(baseDir, full);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      collectProgramPaths(full, baseDir, out);
    } else if (e.name === 'questions.md') {
      out.add(toKey(rel.replace(/\\/g, '/')));
    }
  }
}

function main() {
  // 1. All paths in schedule: path -> { topicName, days[] }
  const scheduleMap = new Map(); // key(path) -> { topicName, days }
  for (let d = 1; d <= 75; d++) {
    const dayDir = path.join(DAILY_SCHEDULE, `day-${String(d).padStart(2, '0')}`);
    const topics = extractTopicsFromDay(dayDir);
    for (const t of topics) {
      const key = toKey(t.path);
      if (!scheduleMap.has(key)) scheduleMap.set(key, { topicName: t.name, days: [] });
      scheduleMap.get(key).days.push(d);
    }
  }

  // 2. All paths in program (questions.md under ROOT, excluding slideshow-app & daily-schedule)
  const programSet = new Set();
  collectProgramPaths(ROOT, ROOT, programSet);

  // 3. Union of all paths and sort
  const allPaths = new Set([...scheduleMap.keys(), ...programSet]);
  const sorted = [...allPaths].sort();

  // 4. Report
  console.log('=== Topic-by-topic: In schedule? In program? ===\n');
  console.log('Path = relative to intreview_training (project root).');
  console.log('In schedule = path appears in at least one day\'s topics.md.');
  console.log('In program = questions.md exists at that path.\n');

  const col1 = 'Topic path';
  const col2 = 'In schedule';
  const col3 = 'In program';
  const col4 = 'Days (if in schedule)';
  const w1 = Math.max(col1.length, ...sorted.map(p => p.length).concat([50]));
  const w2 = Math.max(col2.length, 12);
  const w3 = Math.max(col3.length, 11);
  console.log(col1.padEnd(w1) + col2.padEnd(w2) + col3.padEnd(w3) + col4);
  console.log('-'.repeat(w1 + w2 + w3 + 30));

  let inScheduleOnly = [];
  let inProgramOnly = [];
  let inBoth = 0;
  let missing = 0;

  for (const p of sorted) {
    const inS = scheduleMap.has(p);
    const inP = programSet.has(p);
    const sStr = inS ? 'Yes' : 'No';
    const pStr = inP ? 'Yes' : 'No';
    const daysStr = inS ? scheduleMap.get(p).days.join(', ') : '-';
    console.log(p.padEnd(w1) + sStr.padEnd(w2) + pStr.padEnd(w3) + daysStr);

    if (inS && inP) inBoth++;
    else if (inS && !inP) missing++;
    else if (!inS && inP) inProgramOnly.push(p);
  }

  console.log('\n--- Summary ---');
  console.log('Total topic paths (union):', sorted.length);
  console.log('In both schedule and program:', inBoth);
  console.log('In schedule but NOT in program (missing file):', missing);
  console.log('In program but NOT in schedule (unused):', inProgramOnly.length);
  if (inProgramOnly.length > 0) {
    console.log('\nUnused in schedule (file exists only):');
    inProgramOnly.forEach(p => console.log('  -', p));
  }
  process.exit(missing > 0 ? 1 : 0);
}

main();
