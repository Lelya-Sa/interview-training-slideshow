// Vercel serverless: GET /api/questions?path=...&dayNumber=...&topicName=...&count=...
// Tries filesystem (api/<path>) first, then fetches from GitHub raw so it works when bundle has no markdown.

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_RAW = 'https://raw.githubusercontent.com/Lelya-Sa/interview-training-slideshow/main/';

function parseQuestionsMd(content) {
  const questions = [];
  const blocks = content.split(/(?=###\s+)/).filter(Boolean);
  for (const block of blocks) {
    const firstLine = (block.split('\n')[0] || '').replace(/\r$/, '');
    const titleMatch = firstLine.match(/^###\s+(?:\d+\.\s*)?(.+)$/);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    const answerMatch = block.match(/\*\*Answer:\*\*\s*([\s\S]*?)(?=\r?\n###|$)/);
    const answer = answerMatch ? answerMatch[1].trim() : '';
    if (!title) continue;
    questions.push({ question: title, answer });
  }
  return questions;
}

function getQuestionCountForTopic(topicName, dayNumber) {
  const nameLower = (topicName || '').toLowerCase();
  if (nameLower.includes('logic building 101') || nameLower === 'logic building 101') return 3;
  if (nameLower.includes('logic') || nameLower === 'logic questions') return 3;
  if (nameLower.includes('leetcode') || nameLower === 'leetcode') return 2;
  if (nameLower.includes('data structures') || nameLower === 'data structures') return 5;
  return 12;
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function tryReadFromKnownRoots(safePath) {
  const candidates = [
    // apps/web/api/<path> (legacy copied-content layout)
    path.resolve(__dirname, safePath),
    // intreview_training/content/<path> (current monorepo layout)
    path.resolve(__dirname, '../../../content', safePath),
    // intreview_training/<path> (direct-content layout)
    path.resolve(__dirname, '../../../', safePath),
    // intreview_training/apps/web/api/<path> (defensive duplicate)
    path.resolve(__dirname, '../api', safePath)
  ];

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return fs.readFileSync(filePath, 'utf8');
      }
    } catch (e) {
      // keep trying
    }
  }

  return null;
}

async function tryFetchFromGitHub(safePath) {
  const rawSafePath = safePath.split('/').map(encodeURIComponent).join('/');
  const urlCandidates = [
    // repo-root content
    `${GITHUB_RAW}${rawSafePath}`,
    // monorepo content folder
    `${GITHUB_RAW}content/${rawSafePath}`,
    // legacy folder kept in some branches
    `${GITHUB_RAW}slideshow-app/${rawSafePath}`,
    // old nested layout
    `${GITHUB_RAW}intreview_training/${rawSafePath}`,
    `${GITHUB_RAW}apps/web/api/${rawSafePath}`
  ];

  for (const url of urlCandidates) {
    try {
      return await fetchUrl(url);
    } catch (e) {
      // try next URL
    }
  }

  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const pathParam = req.query.path;
  const dayNumber = parseInt(req.query.dayNumber, 10) || 1;
  const topicName = req.query.topicName || '';
  const countParam = req.query.count != null ? parseInt(req.query.count, 10) : null;

  if (!pathParam || typeof pathParam !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing path' });
  }

  const safePath = pathParam.replace(/\.\./g, '').replace(/^\/+/, '').trim();
  if (safePath.includes('..')) {
    return res.status(400).json({ success: false, error: 'Invalid path' });
  }

  let content = null;

  // 1) Try filesystem from known project roots
  content = tryReadFromKnownRoots(safePath);

  // 2) Fallback: fetch from GitHub raw
  if (!content) {
    content = await tryFetchFromGitHub(safePath);
    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
        path: safePath
      });
    }
  }

  const count = countParam != null && !isNaN(countParam) ? countParam : getQuestionCountForTopic(topicName, dayNumber);
  const isLogicBuilding101 = (topicName || '').toLowerCase().includes('logic building 101');

  try {
    const all = parseQuestionsMd(content);
    let questions;
    if (isLogicBuilding101 && all.length >= 102) {
      const start = (dayNumber - 1) * 3;
      const end = Math.min(dayNumber * 3, all.length);
      questions = all.slice(start, end);
    } else {
      questions = all.slice(0, count);
    }
    const list = questions.map((q, idx) => ({
      question: q.question,
      answer: q.answer,
      topicName,
      questionId: `${topicName}-${dayNumber}-${idx}`
    }));
    return res.status(200).json({
      success: true,
      questions: list,
      totalAvailable: all.length,
      dayNumber
    });
  } catch (err) {
    console.error('questions API error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
