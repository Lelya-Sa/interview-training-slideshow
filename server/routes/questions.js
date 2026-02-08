/* ============================================
   QUESTIONS API ROUTES
   ============================================
   
   This file handles API endpoints for fetching questions
   from the interview training markdown files.
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// ============================================
// HELPER FUNCTION: Parse Questions from Markdown
// ============================================
function parseQuestionsFromMarkdown(content) {
    const questions = [];
    
    // Line-by-line parsing for robustness
    const lines = content.split('\n');
    
    let currentQuestion = null;
    let currentAnswer = [];
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this is a question header (### 1., ### 2., etc.)
        const questionMatch = line.match(/^###\s+\d+\.\s+(.+)$/);
        
        if (questionMatch) {
            // Save previous question if exists
            if (currentQuestion && currentAnswer.length > 0) {
                const answerText = currentAnswer.join('\n').trim();
                if (answerText.length > 5) { // Only save if answer has meaningful content
                    questions.push({
                        question: currentQuestion.trim(),
                        answer: answerText
                    });
                }
            }
            
            // Start new question
            currentQuestion = questionMatch[1];
            currentAnswer = [];
        } else if (currentQuestion !== null) {
            // We're collecting answer lines
            
            // Check for code block markers
            if (line.includes('```')) {
                inCodeBlock = !inCodeBlock;
            }
            
            // Check if this is a major section header (## ) - end of questions
            if (!inCodeBlock && line.match(/^##\s/) && currentAnswer.length > 0) {
                // End of this question, save it
                const answerText = currentAnswer.join('\n').trim();
                if (answerText.length > 5) {
                    questions.push({
                        question: currentQuestion.trim(),
                        answer: answerText
                    });
                }
                currentQuestion = null;
                currentAnswer = [];
            } else {
                // Add to current answer
                currentAnswer.push(line);
            }
        }
    }
    
    // Don't forget the last question!
    if (currentQuestion && currentAnswer.length > 0) {
        const answerText = currentAnswer.join('\n').trim();
        if (answerText.length > 5) {
            questions.push({
                question: currentQuestion.trim(),
                answer: answerText
            });
        }
    }
    
    console.log(`Parsed ${questions.length} questions from markdown`);
    return questions;
}

// ============================================
// GET /api/questions/test - Test endpoint
// ============================================
router.get('/test', (req, res) => {
    const testPath = path.join(__dirname, '../../frontend/javascript/questions.md');
    console.log('=== Test Endpoint ===');
    console.log('Test path:', testPath);
    console.log('Exists:', fs.existsSync(testPath));
    
    if (fs.existsSync(testPath)) {
        const content = fs.readFileSync(testPath, 'utf8');
        const questions = parseQuestionsFromMarkdown(content);
        res.json({
            success: true,
            testPath,
            fileExists: true,
            questions: questions.length,
            firstFew: questions.slice(0, 3)
        });
    } else {
        res.status(404).json({
            success: false,
            testPath,
            fileExists: false
        });
    }
});

// ============================================
router.get('/', (req, res) => {
    const { path: questionPath } = req.query;
    
    if (!questionPath) {
        return res.status(400).json({
            success: false,
            message: 'Path parameter required'
        });
    }
    
    try {
        // Normalize the path - convert forward slashes to backslashes on Windows
        let normalizedPath = questionPath.replace(/\//g, path.sep);
        
        // Construct full path from project root (intreview_training folder)
        // __dirname = slideshow-app/server/routes, so go up 3 levels to get to intreview_training
        const projectRoot = path.resolve(__dirname, '../../../');
        
        // All paths are relative to the project root (intreview_training)
        const fullPath = path.resolve(projectRoot, normalizedPath);
        
        console.log('\n=== Questions API Request ===');
        console.log('Question path:', questionPath);
        console.log('Project root:', projectRoot);
        console.log('Normalized path:', normalizedPath);
        console.log('Full path:', fullPath);
        
        // Security check - ensure resolved path is still within project root
        const resolvedPath = path.resolve(fullPath);
        const resolvedRoot = path.resolve(projectRoot);
        
        console.log('Check: Does', resolvedPath, 'start with', resolvedRoot, '?', resolvedPath.startsWith(resolvedRoot));
        
        // Check if path is within project root
        if (!resolvedPath.startsWith(resolvedRoot)) {
            console.log('❌ Access denied - path outside project root');
            return res.status(403).json({
                success: false,
                message: 'Access denied - path outside project root'
            });
        }
        
        // Check if file exists
        if (!fs.existsSync(resolvedPath)) {
            console.log('❌ File not found:', resolvedPath);
            return res.status(404).json({
                success: false,
                message: 'Questions file not found: ' + questionPath,
                attemptedPath: resolvedPath
            });
        }
        
        console.log('✅ File found, reading...');
        
        // Read the markdown file
        const content = fs.readFileSync(resolvedPath, 'utf8');
        console.log('File size:', content.length, 'bytes');
        
        // Parse questions
        const questions = parseQuestionsFromMarkdown(content);
        
        console.log(`✅ Returning ${questions.length} questions`);
        console.log('Sample questions:', questions.slice(0, 2).map(q => ({ 
            question: q.question.substring(0, 50) + '...',
            answerLength: q.answer.length 
        })));
        
        res.json({
            success: true,
            count: questions.length,
            questions: questions,
            path: questionPath
        });
    } catch (err) {
        console.error('❌ Error reading questions:', err.message);
        console.error('Stack:', err.stack);
        res.status(500).json({
            success: false,
            message: 'Error reading questions: ' + err.message,
            error: err.message
        });
    }
});

module.exports = router;
