/* ============================================
   VERCEL SERVERLESS FUNCTION: GET QUESTIONS
   ============================================
   
   URL: /api/questions?path=frontend/javascript/questions.md
   Method: GET
*/

const fs = require('fs');
const path = require('path');

function parseQuestionsFromMarkdown(content) {
    const questions = [];
    const lines = content.split('\n');
    
    let currentQuestion = null;
    let currentAnswer = [];
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        const questionMatch = line.match(/^###\s+\d+\.\s+(.+)$/);
        
        if (questionMatch) {
            if (currentQuestion && currentAnswer.length > 0) {
                const answerText = currentAnswer.join('\n').trim();
                if (answerText.length > 5) {
                    questions.push({
                        question: currentQuestion.trim(),
                        answer: answerText
                    });
                }
            }
            
            currentQuestion = questionMatch[1];
            currentAnswer = [];
        } else if (currentQuestion !== null) {
            if (line.includes('```')) {
                inCodeBlock = !inCodeBlock;
            }
            
            if (!inCodeBlock && line.match(/^##\s/) && currentAnswer.length > 0) {
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
                currentAnswer.push(line);
            }
        }
    }
    
    if (currentQuestion && currentAnswer.length > 0) {
        const answerText = currentAnswer.join('\n').trim();
        if (answerText.length > 5) {
            questions.push({
                question: currentQuestion.trim(),
                answer: answerText
            });
        }
    }
    
    return questions;
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    const { path: questionPath } = req.query;
    
    if (!questionPath) {
        return res.status(400).json({
            success: false,
            message: 'Path parameter required'
        });
    }
    
    try {
        let normalizedPath = questionPath.replace(/\//g, path.sep);
        
        // In Vercel, __dirname points to /var/task/api
        // Go up to project root (slideshow-app) to find markdown files
        // Files should be copied there during build
        const projectRoot = path.resolve(__dirname, '../');
        const fullPath = path.resolve(projectRoot, normalizedPath);
        
        console.log('Questions API - Project root:', projectRoot);
        console.log('Questions API - Normalized path:', normalizedPath);
        console.log('Questions API - Full path:', fullPath);
        
        const resolvedPath = path.resolve(fullPath);
        const resolvedRoot = path.resolve(projectRoot);
        
        if (!resolvedPath.startsWith(resolvedRoot)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied - path outside project root'
            });
        }
        
        if (!fs.existsSync(resolvedPath)) {
            return res.status(404).json({
                success: false,
                message: 'Questions file not found: ' + questionPath,
                attemptedPath: resolvedPath
            });
        }
        
        const content = fs.readFileSync(resolvedPath, 'utf8');
        const questions = parseQuestionsFromMarkdown(content);
        
        res.json({
            success: true,
            count: questions.length,
            questions: questions,
            path: questionPath
        });
    } catch (err) {
        console.error('Error reading questions:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error reading questions: ' + err.message,
            error: err.message
        });
    }
};
