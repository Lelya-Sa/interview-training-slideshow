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
    
    console.log(`Day ${dayNum}: Selecting ${selected.length} questions starting from index ${startIndex} (total available: ${allQuestions.length})`);
    if (selected.length > 0) {
        console.log(`  First question: "${selected[0].question.substring(0, 50)}..."`);
        console.log(`  Last question: "${selected[selected.length - 1].question.substring(0, 50)}..."`);
    }
    
    return selected;
}

router.get('/', (req, res) => {
    const { path: questionPath, dayNumber, topicName, count } = req.query;
    
    if (!questionPath) {
        return res.status(400).json({
            success: false,
            message: 'Path parameter required'
        });
    }
    
    try {
        // Clean the path: remove ../.. prefixes (paths from topics.md are relative to daily-schedule/day-XX/)
        let cleanPath = questionPath;
        while (cleanPath.startsWith('../')) {
            cleanPath = cleanPath.replace(/^\.\.\//, '');
        }
        
        // Normalize the path - convert forward slashes to backslashes on Windows
        let normalizedPath = cleanPath.replace(/\//g, path.sep);
        
        // Construct full path from project root (intreview_training folder)
        // __dirname = slideshow-app/server/routes, so go up 3 levels to get to intreview_training
        const projectRoot = path.resolve(__dirname, '../../../');
        
        // All paths are relative to the project root (intreview_training)
        const fullPath = path.resolve(projectRoot, normalizedPath);
        
        console.log('\n=== Questions API Request ===');
        console.log('Question path:', questionPath);
        console.log('Cleaned path:', cleanPath);
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
        const allQuestions = parseQuestionsFromMarkdown(content);
        
        // Select questions based on day number and count if provided
        let selectedQuestions = allQuestions;
        if (dayNumber && count) {
            const dayNum = parseInt(dayNumber);
            selectedQuestions = selectQuestionsForDay(allQuestions, dayNum, count);
            console.log(`Selected ${selectedQuestions.length} questions for day ${dayNum} (requested: ${count}, available: ${allQuestions.length})`);
        }
        
        console.log(`✅ Returning ${selectedQuestions.length} questions (${allQuestions.length} total available)`);
        console.log('Sample questions:', selectedQuestions.slice(0, 2).map(q => ({ 
            question: q.question.substring(0, 50) + '...',
            answerLength: q.answer.length 
        })));
        
        res.json({
            success: true,
            count: selectedQuestions.length,
            totalAvailable: allQuestions.length,
            questions: selectedQuestions,
            path: questionPath,
            dayNumber: dayNumber ? parseInt(dayNumber) : null
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
