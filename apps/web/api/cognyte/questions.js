const fs = require('fs');
const path = require('path');

const DAY_TO_IDS = {
  // Day 1 is intentionally broad JS/TS core to cover junior fundamentals deeply.
  1: [
    // JavaScript core block
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46, 47, 48, 49, 50,
    // TypeScript + JS/TS depth block
    76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 90, 91, 92, 97, 98, 99, 100
  ],
  // Day 2 is a complete React fundamentals pass (core to intermediate-junior).
  2: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25,
    // Phase 2 React extension (Q151-Q165)
    151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
    161, 162, 163, 164, 165,
    // Day 2 supplement file (Q249-Q263), no ID collision with Phase 2
    249, 250, 251, 252, 253, 254, 255, 256, 257, 258,
    259, 260, 261, 262, 263
  ],
  // Day 3 is dedicated Angular fundamentals (core + extension).
  3: [
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75,
    166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
    176, 177, 178, 179, 180
  ],
  // Day 4 is API/async + fullstack integration (Angular HTTP, React fetch, REST/CORS/auth patterns).
  4: [
    67, 68, 69, 70, 71, 72, 73, 75,
    136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147,
    181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
    191, 192, 193, 194, 195, 196, 197, 198, 199, 200
  ],
  // Day 5: state management (React patterns + Angular service/store patterns + extension).
  5: [
    10, 12, 13, 15, 19, 21, 157, 160, 163,
    61, 62, 171,
    201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212,
    213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224
  ],
  // Day 6: testing essentials (RTL/Jest + Angular TestBed/HTTP testing).
  6: [
    148,
    225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236,
    237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248
  ],
  7: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
  8: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
  9: [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
  10: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  11: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
  12: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130],
  13: [131, 132, 133, 134, 135, 136, 137, 138, 139, 140],
  14: [141, 142, 143, 144, 145, 146, 147, 148, 149, 150]
};

function topicFromId(id) {
  if (id === 148) return 'Testing (Jest basics)';
  if (id >= 249 && id <= 263) return 'React (Interview supplement)';
  if (id >= 237 && id <= 248) return 'Angular (Testing)';
  if (id >= 225 && id <= 236) return 'React (Testing)';
  if (id >= 213 && id <= 224) return 'Angular (State)';
  if (id >= 201 && id <= 212) return 'React (State)';
  if (id >= 181 && id <= 200) return 'API & Integration';
  if (id >= 151 && id <= 165) return 'React';
  if (id >= 166 && id <= 180) return 'Angular';
  if (id <= 25) return 'React';
  if (id <= 50) return 'JavaScript';
  if (id <= 75) return 'Angular';
  if (id <= 100) return 'JavaScript/TypeScript';
  if (id <= 135) return 'Logic/LeetCode';
  return 'Mixed Interview Scenarios';
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
    const explanation = (block.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?=\n```|$)/m) || [])[1]?.trim() || '';
    const code = (block.match(/```(?:[a-zA-Z]+)?\n([\s\S]*?)```/m) || [])[1]?.trim() || '';

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
      questionId: `Q${id}`
    });
  }

  return questionsById;
}

function loadAllCognyteQuestions() {
  const root = path.resolve(__dirname, '../../../..');
  const files = [
    path.join(root, 'COGNYTE_150_QUESTION_PACK_PHASE_2.md'),
    path.join(root, 'COGNYTE_REACT_DAY2_SUPPLEMENT.md'),
    path.join(root, 'COGNYTE_150_QUESTION_PACK_PHASE_3.md'),
    path.join(root, 'COGNYTE_150_QUESTION_PACK_PHASE_4.md')
  ];

  const merged = new Map();
  for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseQuestionsFromMarkdown(content);
    for (const [id, q] of parsed.entries()) {
      merged.set(id, q);
    }
  }
  return merged;
}

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const dayNumber = parseInt(req.query.dayNumber, 10);
  if (!dayNumber || dayNumber < 1 || dayNumber > 14) {
    return res.status(400).json({ success: false, error: 'dayNumber must be between 1 and 14' });
  }

  const ids = DAY_TO_IDS[dayNumber] || [];
  const all = loadAllCognyteQuestions();
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
      error: 'No questions found for requested day',
      dayNumber
    });
  }

  return res.status(200).json({
    success: true,
    dayNumber,
    count: questions.length,
    questions
  });
};
