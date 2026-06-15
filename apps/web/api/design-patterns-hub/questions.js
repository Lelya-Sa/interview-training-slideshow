const fs = require('fs');
const path = require('path');

/** Global pattern ID → category slug. */
const TOPIC_RANGES = {
  creational: { min: 1, max: 6, label: 'Creational' },
  structural: { min: 7, max: 13, label: 'Structural' },
  behavioral: { min: 14, max: 24, label: 'Behavioral' }
};

const PACK_FILES = {
  creational: 'creational.md',
  structural: 'structural.md',
  behavioral: 'behavioral.md'
};

const CODE_LANGS = 'python|py|csharp|cs|js|javascript|txt';

function topicFromId(id) {
  for (const [slug, range] of Object.entries(TOPIC_RANGES)) {
    if (id >= range.min && id <= range.max) return range.label;
  }
  return 'Design Patterns';
}

function parseQuestionsFromMarkdown(content) {
  const questionsById = new Map();
  const headingRegex = /^###\s+(\d+)\)\s+(.+)$/gm;
  const matches = [...content.matchAll(headingRegex)];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const id = parseInt(m[1], 10);
    const title = m[2].trim();
    const blockStart = m.index;
    const blockEnd = i + 1 < matches.length ? matches[i + 1].index : content.length;
    const block = content.slice(blockStart, blockEnd);

    const theory = (block.match(/\*\*Theory:\*\*\s*([\s\S]*?)\n\*\*Answer:\*\*/m) || [])[1]?.trim() || '';
    const directAnswer = (block.match(/\*\*Answer:\*\*\s*([\s\S]*?)\n\*\*Explanation:\*\*/m) || [])[1]?.trim() || '';
    const explanation = (block.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?=\r?\n```|\s*$)/m) || [])[1]?.trim() || '';
    const codeRegex = new RegExp(`\`\`\`(?:${CODE_LANGS})?\\r?\\n([\\s\\S]*?)\`\`\``, 'g');
    const codeMatches = [...block.matchAll(codeRegex)];
    const code = codeMatches.map((cm) => cm[1].trim()).filter(Boolean).join('\n\n');

    if (!id || !title) continue;

    const answer = [
      theory ? `Theory:\n${theory}` : '',
      directAnswer ? `Answer:\n${directAnswer}` : '',
      explanation ? `Explanation:\n${explanation}` : '',
      code ? `Code:\n${code}` : ''
    ].filter(Boolean).join('\n\n');

    questionsById.set(id, {
      id,
      question: title,
      answer,
      topicName: topicFromId(id),
      questionId: `DP${id}`
    });
  }

  return questionsById;
}

function loadAllDesignPatternQuestions() {
  const root = path.resolve(__dirname, '../../../..');
  const dir = path.join(root, 'content/design-patterns-hub');
  const merged = new Map();

  for (const file of Object.values(PACK_FILES)) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseQuestionsFromMarkdown(content);
    for (const [id, q] of parsed.entries()) {
      merged.set(id, q);
    }
  }
  return merged;
}

function idsForTopic(topic) {
  const key = String(topic || '').toLowerCase();
  if (key === 'all') {
    return Object.values(TOPIC_RANGES).flatMap((r) => {
      const ids = [];
      for (let i = r.min; i <= r.max; i++) ids.push(i);
      return ids;
    });
  }
  const range = TOPIC_RANGES[key];
  if (!range) return null;
  const ids = [];
  for (let i = range.min; i <= range.max; i++) ids.push(i);
  return ids;
}

module.exports = {
  TOPIC_RANGES,
  PACK_FILES,
  topicFromId,
  parseQuestionsFromMarkdown,
  loadAllDesignPatternQuestions,
  idsForTopic,
  handler: function designPatternsHubHandler(req, res) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const topic = String(req.query.topic || 'all').toLowerCase();
    const validTopics = [...Object.keys(TOPIC_RANGES), 'all'];
    if (!validTopics.includes(topic)) {
      return res.status(400).json({
        success: false,
        error: `topic must be one of: ${validTopics.join(', ')}`
      });
    }

    const ids = idsForTopic(topic);
    const all = loadAllDesignPatternQuestions();
    const questions = ids
      .map((id) => all.get(id))
      .filter(Boolean)
      .map((q) => ({
        question: q.question,
        answer: q.answer,
        topicName: q.topicName,
        questionId: q.questionId
      }));

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No patterns found for requested topic',
        topic
      });
    }

    const range = TOPIC_RANGES[topic];
    return res.status(200).json({
      success: true,
      topic,
      topicLabel: range ? range.label : 'All Design Patterns',
      count: questions.length,
      questions
    });
  }
};

module.exports.default = module.exports.handler;
