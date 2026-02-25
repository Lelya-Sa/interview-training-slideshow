// GET /api/roadmap/summary – returns all 34 days with topic names for the roadmap UI

const fs = require('fs');
const path = require('path');

function pad(n) {
  const s = String(n);
  return s.length >= 2 ? s : '0' + s;
}

function parseTopicsMd(content) {
  const topics = [];
  const lines = content.split(/\r?\n/);
  let currentName = null;
  for (const line of lines) {
    const heading = line.match(/^###\s+(.+)$/);
    if (heading) {
      currentName = heading[1].trim();
      continue;
    }
    const pathMatch = line.match(/\*\*Path\*\*:\s*`([^`]+)`/);
    if (pathMatch && currentName) {
      topics.push({ name: currentName });
      currentName = null;
    }
  }
  return topics;
}

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const projectRoot = path.resolve(path.join(__dirname, '..', '..'));
  const scheduleDir = path.join(projectRoot, 'daily-schedule');
  const days = [];

  for (let d = 1; d <= 34; d++) {
    const topicsPath = path.join(scheduleDir, `day-${pad(d)}`, 'topics.md');
    if (!fs.existsSync(topicsPath)) {
      days.push({ dayNumber: d, topics: [] });
      continue;
    }
    try {
      const content = fs.readFileSync(topicsPath, 'utf8');
      days.push({ dayNumber: d, topics: parseTopicsMd(content).map(t => ({ name: t.name })) });
    } catch (err) {
      days.push({ dayNumber: d, topics: [] });
    }
  }

  return res.status(200).json({ success: true, days });
};
