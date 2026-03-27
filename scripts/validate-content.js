const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const contentDir = path.join(repoRoot, 'content');
const webApiDir = path.join(repoRoot, 'apps', 'web', 'api');

const requiredSourcePaths = [
  'daily-schedule',
  'algorithms',
  'apis',
  'architecture',
  'backend',
  'databases',
  'devops',
  'security',
  'design-patterns',
  'logic-building-101',
  'ai',
  'qa',
  'documentation',
  'oop',
  'advanced-patterns'
];

const requiredRuntimePaths = [
  'daily-schedule/day-01/topics.md',
  'frontend/javascript/questions.md',
  'backend/nodejs/questions.md',
  'algorithms/logic-questions/questions.md',
  'ai/langchain/questions.md'
];

function checkExists(base, relativePath, label) {
  const fullPath = path.join(base, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`${label} missing: ${relativePath}`);
  }
}

function runValidation() {
  if (!fs.existsSync(contentDir)) {
    throw new Error('Canonical content directory missing: content/');
  }
  if (!fs.existsSync(webApiDir)) {
    throw new Error('Web runtime content directory missing: apps/web/api/');
  }

  requiredSourcePaths.forEach((p) => checkExists(contentDir, p, 'Source path'));
  requiredRuntimePaths.forEach((p) => checkExists(webApiDir, p, 'Runtime path'));

  console.log('✓ Content validation passed');
}

try {
  runValidation();
} catch (err) {
  console.error(`Content validation failed: ${err.message}`);
  process.exit(1);
}
