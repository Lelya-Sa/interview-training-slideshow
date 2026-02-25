// Vercel serverless: GET /api/questions?path=...&dayNumber=...&topicName=...&count=...
// Reads markdown from project root (path like logic-building-101/questions.md) so it works on Vercel

const fs = require('fs');
const path = require('path');

function parseQuestionsMd(content) {
  const questions = [];
  const blocks = content.split(/(?=###\s+)/).filter(Boolean);
  for (const block of blocks) {
    const firstLine = block.split('\n')[0] || '';
    const titleMatch = firstLine.match(/^###\s+(?:\d+\.\s*)?(.+)$/);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    const answerMatch = block.match(/\*\*Answer:\*\*\s*([\s\S]*?)(?=\n###|$)/);
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

module.exports = function handler(req, res) {
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

  // Path is relative to api/ (e.g. logic-building-101/questions.md). Read from api/ so deployed content is used.
  const safePath = pathParam.replace(/\.\./g, '').replace(/^\/+/, '').trim();
  const apiDir = path.resolve(path.join(__dirname));
  const filePath = path.resolve(apiDir, safePath);

  if (!filePath.startsWith(apiDir) || safePath.includes('..')) {
    return res.status(400).json({ success: false, error: 'Invalid path' });
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return res.status(404).json({ success: false, error: 'File not found', path: safePath });
  }

  const count = countParam != null && !isNaN(countParam) ? countParam : getQuestionCountForTopic(topicName, dayNumber);
  const isLogicBuilding101 = (topicName || '').toLowerCase().includes('logic building 101');

  try {
    const content = fs.readFileSync(filePath, 'utf8');
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
