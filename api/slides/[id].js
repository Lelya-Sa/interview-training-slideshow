/* ============================================
   VERCEL SERVERLESS FUNCTION: GET SINGLE SLIDE
   ============================================
   
   URL: /api/slides/5 (where 5 is the slide ID)
   Method: GET
   
   Note: [id].js is Vercel's dynamic route syntax
*/

const fs = require('fs');
const path = require('path');

// Helper function to parse markdown (same as slides.js)
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

let slidesDataCache = null;

function loadSlides() {
    if (slidesDataCache) {
        return slidesDataCache;
    }
    
    try {
        const markdownPath = path.join(__dirname, '../../../full_stack_interview_answers.md');
        const content = fs.readFileSync(markdownPath, 'utf8');
        slidesDataCache = parseMarkdown(content);
        return slidesDataCache;
    } catch (err) {
        console.error('Error loading markdown:', err.message);
        return [];
    }
}

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    // Get ID from query parameter (Vercel dynamic routes)
    const id = parseInt(req.query.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid slide ID' });
    }
    
    const slides = loadSlides();
    const slide = slides.find(s => s.id === id);
    
    if (slide) {
        res.json({
            success: true,
            slide: slide
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Slide not found'
        });
    }
};
