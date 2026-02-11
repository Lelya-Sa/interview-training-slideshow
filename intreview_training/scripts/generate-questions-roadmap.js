#!/usr/bin/env node
/**
 * Generates ROADMAP_QUESTIONS_COVERAGE.md: a checklist of every topic with
 * required vs current question counts for junior fullstack interview prep.
 *
 * Run from intreview_training: node scripts/generate-questions-roadmap.js
 * Output: ROADMAP_QUESTIONS_COVERAGE.md (in project root)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DAILY_SCHEDULE = path.join(ROOT, 'daily-schedule');
const OUTPUT_PATH = path.join(ROOT, 'ROADMAP_QUESTIONS_COVERAGE.md');

const QUESTIONS_PER_DAY = { logic: 3, leetcode: 2, 'data-structures': 5, default: 12 };

function cleanPath(raw) {
  let p = raw.trim();
  while (p.startsWith('../')) p = p.replace(/^\.\.\//, '');
  return p.replace(/\//g, path.sep);
}

function countQuestionsInFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;
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
  return n;
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

function getCategory(pathStr) {
  const p = pathStr.replace(/\\/g, '/');
  if (p.startsWith('algorithms/')) return 'Algorithms';
  if (p.startsWith('frontend/')) return 'Frontend';
  if (p.startsWith('backend/')) return 'Backend';
  if (p.startsWith('apis/')) return 'APIs';
  if (p.startsWith('architecture/')) return 'Architecture';
  if (p.startsWith('databases/')) return 'Databases';
  if (p.startsWith('design-patterns/')) return 'Design Patterns';
  if (p.startsWith('devops/')) return 'DevOps';
  if (p.startsWith('security/')) return 'Security';
  if (p.startsWith('oop/')) return 'OOP';
  if (p.startsWith('qa/')) return 'QA';
  if (p.startsWith('documentation/')) return 'Documentation';
  if (p.startsWith('advanced-patterns/')) return 'Advanced Patterns';
  return 'Other';
}

function main() {
  const daysByPath = new Map();
  const topicInfo = new Map(); // path -> { topicName, perDay, count }

  for (let d = 1; d <= 75; d++) {
    const dayDir = path.join(DAILY_SCHEDULE, `day-${String(d).padStart(2, '0')}`);
    const topics = extractTopicsFromDay(dayDir);
    for (const t of topics) {
      const fullPath = path.join(ROOT, t.path);
      if (!daysByPath.has(t.path)) daysByPath.set(t.path, []);
      daysByPath.get(t.path).push(d);
      if (!topicInfo.has(t.path)) {
        const count = countQuestionsInFile(fullPath);
        const perDay = getQuestionsPerDay(t.name, t.path);
        topicInfo.set(t.path, { topicName: t.name, perDay, count });
      }
    }
  }

  const rows = [];
  for (const [p, info] of topicInfo.entries()) {
    const daysUsed = daysByPath.get(p)?.length || 0;
    const minRequired = daysUsed * info.perDay;
    const status = info.count >= minRequired ? 'OK' : 'LOW';
    const gap = Math.max(0, minRequired - info.count);
    rows.push({
      path: p.replace(/\\/g, '/'),
      topicName: info.topicName,
      category: getCategory(p),
      daysUsed,
      perDay: info.perDay,
      minRequired,
      count: info.count,
      status,
      gap
    });
  }

  rows.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.path.localeCompare(b.path);
  });

  const byCategory = {};
  for (const r of rows) {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  }

  const criticalPaths = [
    'frontend/react/questions.md',
    'frontend/javascript/questions.md',
    'backend/nodejs/questions.md',
    'algorithms/data-structures/questions.md',
    'algorithms/logic-questions/questions.md',
    'algorithms/leetcode/questions.md',
    'apis/rest/questions.md',
    'architecture/system-design/questions.md'
  ];
  const norm = (s) => (s || '').replace(/\\/g, '/');
  const criticalRows = criticalPaths
    .map(p => rows.find(r => norm(r.path) === p))
    .filter(Boolean);

  let md = `# Questions Coverage Roadmap – Junior Fullstack Interview

**Purpose:** Track that **every topic** in the 75-day schedule has enough questions for progressive daily practice (different questions each day).

---

## Schedule coverage – all topics included

The **75-day schedule** covers **all** of these areas (not just Logic, LeetCode, and Data Structures):

| Area | Topics in schedule |
|------|---------------------|
| **Algorithms** | Logic Questions, LeetCode, Data Structures, Time Complexity, Hash Tables, Binary Trees |
| **Frontend** | **React**, **JavaScript**, HTML, CSS, ES6, Tailwind, SPA/SSR/SSG |
| **Backend** | Node.js, Backend Services, Storage, Queues, Integrations |
| **APIs** | REST, HTTP, HTTPS, GraphQL, gRPC, AJAX, Headers, Webhooks, BFF, API fundamentals |
| **Databases** | SQL vs NoSQL, PostgreSQL, MongoDB, Redis, Data Modeling, Sharding/Replication/Caching |
| **Architecture** | MVC, System Design, Clean Architecture, Onion, Application Layers, System/Project Architecture |
| **Design Patterns** | Singleton, Factory, Observer, Strategy, Adapter, Design Patterns overview |
| **Security** | Authentication/Authorization, JWT, OAuth, OpenID, Secure-by-Design, Security Keys |
| **DevOps** | Docker, CI/CD, Kubernetes, Scaling, Failover/Load Balancing, Observability |
| **Other** | OOP, QA, ADRs, C4 Model, Event Sourcing, CQRS |

Every topic above appears on specific days (see "By category" below). This roadmap ensures each has **enough questions** so you get fresh ones each day.

---

## Critical for junior fullstack (don't skip)

These are especially important for junior fullstack interviews. Make sure they have enough questions:

| Topic | Path | Days in schedule | Min questions | Current | Status | Gap |
|-------|------|------------------|---------------|---------|--------|-----|
`;
  for (const r of criticalRows) {
    const statusIcon = r.status === 'OK' ? '✅' : '❌';
    md += `| **${r.topicName}** | \`${r.path}\` | ${r.daysUsed} | ${r.minRequired} | ${r.count} | ${statusIcon} ${r.status} | ${r.gap} |\n`;
  }
  md += `
**React** is in the schedule on 36 days (e.g. Days 1–28, 32, 36, 40, 44, 48, 52, 56, 60). Prioritize filling React (and JavaScript, Node.js) questions so the schedule is fully usable.

---

## Rules (questions per day)

- **Logic Questions:** 3/day × days used → min required
- **LeetCode:** 2/day × days used → min required  
- **Data Structures:** 5/day × days used → min required
- **All other topics (including React, JavaScript, Node.js, REST, etc.):** 12/day × days used → min required

**How to refresh:** Run \`node scripts/generate-questions-roadmap.js\` from \`intreview_training\`.

**How to use:** Work through topics marked ❌ (LOW). Add questions in \`### N. Question\` / \`**Answer:**\` format until count ≥ min required. One topic per session is fine. Start with React, JavaScript, Node.js if you want maximum impact.

---

## Summary

| Status | Count |
|--------|--------|
| ✅ OK (enough questions) | ${rows.filter(r => r.status === 'OK').length} |
| ❌ Need more questions | ${rows.filter(r => r.status === 'LOW').length} |
| **Total topics** | **${rows.length}** |

---

## By category

`;

  const categoryOrder = ['Algorithms', 'Frontend', 'Backend', 'APIs', 'Architecture', 'Databases', 'Design Patterns', 'OOP', 'Security', 'DevOps', 'QA', 'Documentation', 'Advanced Patterns', 'Other'];
  for (const cat of categoryOrder) {
    const list = byCategory[cat];
    if (!list || list.length === 0) continue;
    md += `### ${cat}\n\n`;
    md += `| Topic | Path | Days | Per day | Min required | Current | Status | Gap |\n`;
    md += `|-------|------|------|---------|---------------|---------|--------|-----|\n`;
    for (const r of list) {
      const statusIcon = r.status === 'OK' ? '✅' : '❌';
      md += `| ${r.topicName} | \`${r.path}\` | ${r.daysUsed} | ${r.perDay} | ${r.minRequired} | ${r.count} | ${statusIcon} ${r.status} | ${r.gap} |\n`;
    }
    md += '\n';
  }

  md += `---

## Priority order (by gap, then by days used)

Use this order to fill questions topic-by-topic (biggest gaps first).

| # | Topic | Path | Gap | Min | Current | Days |
|---|-------|------|-----|-----|---------|------|
`;
  const byGap = [...rows].filter(r => r.status === 'LOW').sort((a, b) => b.gap - a.gap);
  byGap.forEach((r, i) => {
    md += `| ${i + 1} | ${r.topicName} | \`${r.path}\` | ${r.gap} | ${r.minRequired} | ${r.count} | ${r.daysUsed} |\n`;
  });

  md += `

---

*Generated by \`scripts/generate-questions-roadmap.js\` – re-run to update after adding questions.*
`;

  fs.writeFileSync(OUTPUT_PATH, md, 'utf8');
  console.log('Wrote', OUTPUT_PATH);
  console.log('OK:', rows.filter(r => r.status === 'OK').length, '| LOW:', rows.filter(r => r.status === 'LOW').length);
}

main();
