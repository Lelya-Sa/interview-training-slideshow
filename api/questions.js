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
    // Normalize line endings: replace \r\n with \n, then \r with \n
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedContent.split('\n');
    
    let currentQuestion = null;
    let currentAnswer = [];
    let questionNumber = 0;
    let inQuestionBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Match question format: ### 1. Question text or ### Question text (without number)
        // Trim line to handle \r and other whitespace
        const trimmedLine = line.trim();
        const questionMatch = trimmedLine.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
        
        if (questionMatch) {
            const questionText = questionMatch[1];
            // Check if this is a language subsection (JavaScript, Python, etc.) - not a real question
            const isLanguageSubsection = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust'].includes(questionText);
            
            if (!isLanguageSubsection) {
                // Save previous question if exists
                if (currentQuestion && currentAnswer.length > 0) {
                    let answerText = currentAnswer.join('\n').trim();
                    // Remove leading "**Answer:**" or "**Answer:** " if present (only at the very start)
                    answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
                    
                    // Only remove leading dashes/list markers if they're formatting (not content)
                    // Don't remove list items that are part of the answer content
                    const finalAnswer = answerText;
                    
                    if (finalAnswer.length > 3) {
                        questions.push({
                            question: currentQuestion.trim(),
                            answer: finalAnswer,
                            questionNumber: questionNumber
                        });
                        questionNumber++;
                    } else {
                        console.log(`⚠️ Question "${currentQuestion.substring(0, 50)}..." has answer too short (${finalAnswer.length} chars)`);
                    }
                }
                
                // Start new question
                currentQuestion = questionText;
                currentAnswer = [];
                inQuestionBlock = true;
            } else {
                // This is a language subsection, add to current answer
                if (inQuestionBlock && currentQuestion) {
                    currentAnswer.push(line);
                }
            }
        } else if (currentQuestion !== null && inQuestionBlock) {
            // Check for separator (---) or section headers (##) - these mark the end of a question
            const trimmedLine = line.trim();
            if (trimmedLine === '---' || trimmedLine.match(/^##\s+/)) {
                // Save current question if we have answer content
                if (currentAnswer.length > 0) {
                    let answerText = currentAnswer.join('\n').trim();
                    // Remove leading "**Answer:**" or "**Answer:** " if present (only at the very start)
                    answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
                    
                    // Only remove leading dashes/list markers if they're formatting (not content)
                    // Don't remove list items that are part of the answer content
                    const finalAnswer = answerText;
                    
                    if (finalAnswer.length > 3) {
                        questions.push({
                            question: currentQuestion.trim(),
                            answer: finalAnswer,
                            questionNumber: questionNumber
                        });
                        questionNumber++;
                    } else {
                        console.log(`⚠️ Question "${currentQuestion.substring(0, 50)}..." has answer too short (${finalAnswer.length} chars)`);
                    }
                }
                // Reset for next section
                currentQuestion = null;
                currentAnswer = [];
                inQuestionBlock = false;
                continue;
            }
            
            // Collect answer lines (everything until next question or separator)
            // Include empty lines as they might be part of formatting
            currentAnswer.push(line);
        }
    }
    
    // Don't forget the last question
    if (currentQuestion && currentAnswer.length > 0) {
        let answerText = currentAnswer.join('\n').trim();
        // Remove leading "**Answer:**" or "**Answer:** " if present (only at the very start)
        answerText = answerText.replace(/^\*\*Answer:\*\*\s*/i, '').trim();
        
        // Only remove leading dashes/list markers if they're formatting (not content)
        // Don't remove list items that are part of the answer content
        const finalAnswer = answerText;
        
        if (finalAnswer.length > 3) {
            questions.push({
                question: currentQuestion.trim(),
                answer: finalAnswer,
                questionNumber: questionNumber
            });
        } else {
            console.log(`⚠️ Last question "${currentQuestion.substring(0, 50)}..." has answer too short (${finalAnswer.length} chars)`);
        }
    }
    
    console.log(`Parsed ${questions.length} questions from markdown`);
    if (questions.length === 0) {
        console.log('⚠️ No questions parsed. First 20 lines:', lines.slice(0, 20));
        // Try to find why - check for question patterns
        const questionLines = lines.filter((line, idx) => line.match(/^###\s+(?:\d+\.\s+)?(.+)$/));
        console.log(`Found ${questionLines.length} potential question headers:`, questionLines.slice(0, 5));
    } else {
        console.log(`✅ Successfully parsed questions. Sample:`, questions.slice(0, 2).map(q => ({
            question: q.question.substring(0, 50) + '...',
            answerLength: q.answer.length
        })));
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
    
    const { path: questionPath, dayNumber, topicName, count } = req.query;
    
    if (!questionPath) {
        return res.status(400).json({
            success: false,
            message: 'Path parameter required'
        });
    }
    
    // Helper function to select questions for a specific day (progressive learning)
    function selectQuestionsForDay(allQuestions, dayNum, requestedCount) {
        if (!allQuestions || allQuestions.length === 0) {
            return [];
        }
        
        // If no count specified, return all questions
        if (!requestedCount || requestedCount === 'all') {
            return allQuestions;
        }
        
        const countNum = parseInt(requestedCount);
        if (isNaN(countNum) || countNum <= 0) {
            return allQuestions;
        }
        
        // Use day number as seed to select different questions each day
        // This ensures progressive learning - different questions each day
        const daySeed = dayNum || 1;
        const questionsPerDay = Math.min(countNum, allQuestions.length);
        
        // Calculate starting index based on day (ensures different questions each day)
        // For progressive learning: Day 1 starts at 0, Day 2 starts at questionsPerDay, etc.
        // Use a simple offset that advances each day, wrapping around when needed
        // This ensures Day 1 and Day 2 show different questions
        let startIndex = (daySeed - 1) * questionsPerDay;
        
        // Wrap around if we exceed the available questions
        if (startIndex >= allQuestions.length) {
            startIndex = startIndex % allQuestions.length;
        }
        
        // Select questions starting from calculated index
        const selected = [];
        for (let i = 0; i < questionsPerDay; i++) {
            const index = (startIndex + i) % allQuestions.length;
            selected.push(allQuestions[index]);
        }
        
        console.log(`Day ${dayNum}: Selecting ${selected.length} questions starting from index ${startIndex} (total available: ${allQuestions.length}, requested: ${countNum})`);
        if (selected.length > 0) {
            console.log(`  First question: "${selected[0].question.substring(0, 50)}..."`);
            console.log(`  Last question: "${selected[selected.length - 1].question.substring(0, 50)}..."`);
            console.log(`  Question indices: ${selected.map((q, i) => (startIndex + i) % allQuestions.length).join(', ')}`);
        }
        
        return selected;
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
        
        // Check if file exists
        if (!fs.existsSync(resolvedPath)) {
            // List directory to see what's actually there
            const parentDir = path.dirname(resolvedPath);
            let dirContents = [];
            try {
                if (fs.existsSync(parentDir)) {
                    dirContents = fs.readdirSync(parentDir).slice(0, 10);
                }
            } catch (e) {
                // Ignore
            }
            
            console.log('Questions API - File not found at:', resolvedPath);
            console.log('Questions API - Parent directory exists?', fs.existsSync(parentDir));
            console.log('Questions API - Parent directory contents:', dirContents);
            
            // Try to list api directory to see what's available
            try {
                const apiFiles = fs.readdirSync(__dirname).slice(0, 20);
                console.log('Questions API - Files in api directory:', apiFiles);
            } catch (e) {
                console.log('Questions API - Could not list api directory:', e.message);
            }
            
            return res.status(404).json({
                success: false,
                message: 'Questions file not found: ' + questionPath,
                attemptedPath: resolvedPath,
                parentDir: parentDir,
                parentDirExists: fs.existsSync(parentDir),
                parentDirContents: dirContents
            });
        }
        
        const content = fs.readFileSync(resolvedPath, 'utf8');
        const allQuestions = parseQuestionsFromMarkdown(content);
        
        // Select questions based on day number and count if provided
        let selectedQuestions = allQuestions;
        if (dayNumber && count) {
            const dayNum = parseInt(dayNumber);
            selectedQuestions = selectQuestionsForDay(allQuestions, dayNum, count);
            console.log(`Selected ${selectedQuestions.length} questions for day ${dayNum} (requested: ${count}, available: ${allQuestions.length})`);
        }
        
        res.json({
            success: true,
            count: selectedQuestions.length,
            totalAvailable: allQuestions.length,
            questions: selectedQuestions,
            path: questionPath,
            dayNumber: dayNumber ? parseInt(dayNumber) : null
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
