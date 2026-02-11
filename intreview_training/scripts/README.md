# Testing and Validation Scripts

This folder contains all scripts used for testing, validation, and maintenance of the interview training questions.

## 📁 Script Categories

### Validation Scripts
- **`validate-topic.js`** - Validates a single topic's questions (count, format, uniqueness)
- **`validation-roadmap.js`** - Generates validation roadmap for all 75 days

### Testing Scripts
- **`test-logic-questions-parsing.js`** - Tests API parsing of logic questions
- **`test-parser-direct.js`** - Tests parser directly on questions.md file
- **`test-api-parsing.js`** - Tests API parser with progressive learning
- **`test-frontend-api.js`** - Tests frontend API endpoints

### Consolidation Scripts
- **`consolidate-logic-questions.js`** - Consolidates individual question files into questions.md
- **`filter-logic-questions.js`** - Filters out system design questions from logic questions

### Question Management Scripts
- **`add-missing-logic-questions.js`** - Adds missing questions to reach target count
- **`add-remaining-questions.js`** - Adds remaining questions to complete the set

## 📋 Documentation

- **`VALIDATION_ROADMAP.md`** - Complete validation roadmap for all topics
- **`LOGIC_QUESTIONS_VALIDATION_REPORT.md`** - Validation report for Logic Questions topic
- **`FRONTEND_TEST_INSTRUCTIONS.md`** - Instructions for testing the frontend

## 🚀 Usage

### Validate a Topic
```bash
node scripts/validate-topic.js
```

### Test API Parsing
```bash
# Make sure server is running first
cd slideshow-app && npm run server

# Then in another terminal
node scripts/test-frontend-api.js
```

### Generate Validation Roadmap
```bash
node scripts/validation-roadmap.js
```

## 📝 Notes

- All scripts should be run from the project root directory
- Some scripts require the server to be running (test-frontend-api.js)
- Scripts that modify files will create backups or filtered versions
