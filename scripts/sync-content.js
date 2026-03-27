const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const contentDir = path.join(repoRoot, 'content');
const webApiDir = path.join(repoRoot, 'apps', 'web', 'api');

function ensureExists(p, label) {
  if (!fs.existsSync(p)) {
    throw new Error(`${label} not found: ${p}`);
  }
}

function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((name) => {
      copyRecursiveSync(path.join(src, name), path.join(dest, name));
    });
    return;
  }

  const ext = path.extname(src).toLowerCase();
  const base = path.basename(src, ext).toLowerCase();
  if (ext === '.md' || ext === '.txt' || base === 'readme') {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function shouldCopyQuestionFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext).toLowerCase();
  return ext === '.md' && (base === 'questions' || base === 'readme');
}

function copyQuestionMarkdownOnly(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((entry) => {
      copyQuestionMarkdownOnly(path.join(src, entry), path.join(dest, entry));
    });
    return;
  }

  if (shouldCopyQuestionFile(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function removeIfExists(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function sync() {
  ensureExists(contentDir, 'Canonical content directory');
  ensureExists(webApiDir, 'Web API directory');

  console.log('Sync content source:', contentDir);
  console.log('Sync destination:', webApiDir);

  const sourceAnswers = path.join(contentDir, 'full_stack_interview_answers.md');
  const destAnswers = path.join(webApiDir, 'full_stack_interview_answers.md');
  if (fs.existsSync(sourceAnswers)) {
    fs.copyFileSync(sourceAnswers, destAnswers);
    console.log('✓ Synced full_stack_interview_answers.md');
  } else {
    console.log('! Skipped full_stack_interview_answers.md (not found)');
  }

  const sourceSchedule = path.join(contentDir, 'daily-schedule');
  const destSchedule = path.join(webApiDir, 'daily-schedule');
  removeIfExists(destSchedule);
  copyRecursiveSync(sourceSchedule, destSchedule);
  console.log('✓ Synced daily-schedule/');

  const questionDirs = [
    'frontend',
    'backend',
    'apis',
    'algorithms',
    'architecture',
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

  questionDirs.forEach((dirName) => {
    const src = path.join(contentDir, dirName);
    const dest = path.join(webApiDir, dirName);
    removeIfExists(dest);
    copyQuestionMarkdownOnly(src, dest);
    console.log(`✓ Synced ${dirName}/ question markdown`);
  });
}

try {
  sync();
} catch (err) {
  console.error('Content sync failed:', err.message);
  process.exit(1);
}
