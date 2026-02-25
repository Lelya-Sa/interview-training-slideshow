// Vercel serverless: GET /api/roadmap/days?dayNumber=N
// Returns day metadata and topics for the roadmap (parsed from api/daily-schedule/day-NN/topics.md)

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
      // Path in topics.md is relative to day folder (e.g. ../../logic-building-101/questions.md)
      // Resolve to path relative to api/ so questions API can load it
      const rawPath = pathMatch[1].trim();
      const normalized = rawPath.replace(/\.\.\/\.\.\//g, '').replace(/^\.\.\//, '');
      topics.push({ name: currentName, path: normalized });
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

  const dayNumber = parseInt(req.query.dayNumber || req.query.day, 10);
  if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 34) {
    return res.status(400).json({ success: false, error: 'Invalid dayNumber (1-34)' });
  }

  const projectRoot = path.resolve(path.join(__dirname, '..', '..'));
  const dayDir = path.join(projectRoot, 'daily-schedule', `day-${pad(dayNumber)}`);
  const topicsPath = path.join(dayDir, 'topics.md');

  if (!fs.existsSync(topicsPath)) {
    return res.status(404).json({
      success: false,
      error: 'Day not found',
      dayNumber
    });
  }

  try {
    const content = fs.readFileSync(topicsPath, 'utf8');
    const topics = parseTopicsMd(content);
    return res.status(200).json({
      success: true,
      day: {
        dayNumber,
        topics: topics.map(t => ({ name: t.name, path: t.path }))
      }
    });
  } catch (err) {
    console.error('roadmap/days error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
