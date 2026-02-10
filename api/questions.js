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
        // Paths from topics.md are like: ../../algorithms/logic-questions/questions.md
        // These are relative to daily-schedule/day-XX/, but we need them relative to project root
        // Remove ../.. prefix and normalize
        let cleanPath = questionPath;
        
        // Remove leading ../.. or ../ prefixes
        while (cleanPath.startsWith('../')) {
            cleanPath = cleanPath.replace(/^\.\.\//, '');
        }
        
        // Normalize slashes
        let normalizedPath = cleanPath.replace(/\//g, path.sep);
        
        // In Vercel, __dirname points to /var/task/api
        // The markdown files should be in the api directory (copied during build)
        // Try api directory first
        const apiPath = path.join(__dirname, normalizedPath);
        
        console.log('Questions API - Original path:', questionPath);
        console.log('Questions API - Cleaned path:', cleanPath);
        console.log('Questions API - Normalized path:', normalizedPath);
        console.log('Questions API - API path:', apiPath);
        console.log('Questions API - __dirname:', __dirname);
        
        // Check if file exists in api directory
        let resolvedPath = apiPath;
        let resolvedRoot = __dirname; // /var/task/api
        
        // Security check - ensure resolved path is within api directory
        const absoluteResolved = path.resolve(resolvedPath);
        const absoluteRoot = path.resolve(resolvedRoot);
        
        console.log('Questions API - Absolute resolved:', absoluteResolved);
        console.log('Questions API - Absolute root:', absoluteRoot);
        console.log('Questions API - Is within root?', absoluteResolved.startsWith(absoluteRoot));
        
        if (!absoluteResolved.startsWith(absoluteRoot)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied - path outside api root',
                attemptedPath: absoluteResolved,
                root: absoluteRoot
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
