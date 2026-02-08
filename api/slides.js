/* ============================================
   VERCEL SERVERLESS FUNCTION: GET ALL SLIDES
   ============================================
   
   This is a Vercel serverless function that replaces the Express route.
   Vercel automatically converts files in /api to serverless functions.
   
   URL: /api/slides
   Method: GET
*/

const fs = require('fs');
const path = require('path');

// Helper function to parse markdown (same as server/index.js)
function parseMarkdown(content) {
    const slides = [];
    const sections = content.split(/^## /m).filter(s => s.trim());
    let slideIndex = 0;
    
    sections.forEach(section => {
        const lines = section.split('\n');
        const sectionTitle = lines[0].trim();
        let currentQuestion = null;
        let currentContent = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim().startsWith('### ')) {
                if (currentQuestion) {
                    slides.push({
                        id: slideIndex++,
                        category: sectionTitle,
                        title: currentQuestion,
                        content: currentContent.join('\n')
                    });
                }
                currentQuestion = line.replace('### ', '').trim();
                currentContent = [];
            } else if (currentQuestion) {
                currentContent.push(line);
            }
        }
        
        if (currentQuestion) {
            slides.push({
                id: slideIndex++,
                category: sectionTitle,
                title: currentQuestion,
                content: currentContent.join('\n')
            });
        }
    });
    
    return slides;
}

// Cache slides data (loaded once, reused for all requests)
let slidesDataCache = null;

function loadSlides() {
    if (slidesDataCache) {
        return slidesDataCache;
    }
    
    try {
        // In Vercel, __dirname points to the api folder
        // Go up to project root to find the markdown file
        const markdownPath = path.join(__dirname, '../../full_stack_interview_answers.md');
        const content = fs.readFileSync(markdownPath, 'utf8');
        slidesDataCache = parseMarkdown(content);
        return slidesDataCache;
    } catch (err) {
        console.error('Error loading markdown:', err.message);
        return [];
    }
}

// Vercel serverless function handler
// req: Request object
// res: Response object
module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    // Load slides (cached after first load)
    const slides = loadSlides();
    
    // Return JSON response
    res.json({
        success: true,
        count: slides.length,
        slides: slides
    });
};
