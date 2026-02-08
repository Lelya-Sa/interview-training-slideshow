/* ============================================
   VERCEL SERVERLESS FUNCTION: GET STATISTICS
   ============================================
   
   URL: /api/stats
   Method: GET
*/

const fs = require('fs');
const path = require('path');

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
        const markdownPath = path.join(__dirname, '../../full_stack_interview_answers.md');
        const content = fs.readFileSync(markdownPath, 'utf8');
        slidesDataCache = parseMarkdown(content);
        return slidesDataCache;
    } catch (err) {
        console.error('Error loading markdown:', err.message);
        return [];
    }
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
    
    const slides = loadSlides();
    const categories = {};
    
    slides.forEach(slide => {
        categories[slide.category] = (categories[slide.category] || 0) + 1;
    });
    
    res.json({
        success: true,
        totalSlides: slides.length,
        categories: categories
    });
};
