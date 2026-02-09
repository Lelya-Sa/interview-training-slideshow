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

// Force Vercel to include the markdown file by requiring it
// This ensures it's included in the serverless function bundle
try {
    // Try to require the file to force inclusion (will fail, but that's ok)
    // The file will be available via fs.readFileSync at runtime
    const markdownPath = path.join(__dirname, '../full_stack_interview_answers.md');
    if (fs.existsSync(markdownPath)) {
        // File exists, will be included in bundle
        console.log('Markdown file will be included:', markdownPath);
    }
} catch (e) {
    // Ignore - we'll read it at runtime
}

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
        // In Vercel, __dirname points to /var/task/api
        // The markdown file should be in the api directory itself
        const markdownPath = path.join(__dirname, 'full_stack_interview_answers.md');
        
        console.log('Looking for markdown at:', markdownPath);
        console.log('__dirname:', __dirname);
        
        // List files in api directory to debug
        try {
            const apiFiles = fs.readdirSync(__dirname);
            console.log('Files in api directory:', apiFiles.slice(0, 10));
        } catch (e) {
            console.log('Could not list api directory:', e.message);
        }
        
        if (!fs.existsSync(markdownPath)) {
            console.error('Markdown file not found at:', markdownPath);
            // Try alternative paths (project root)
            const altPaths = [
                path.join(__dirname, '../full_stack_interview_answers.md'),
                '/var/task/full_stack_interview_answers.md'
            ];
            
            for (const altPath of altPaths) {
                console.log('Trying alternative path:', altPath);
                if (fs.existsSync(altPath)) {
                    console.log('Found at:', altPath);
                    const content = fs.readFileSync(altPath, 'utf8');
                    slidesDataCache = parseMarkdown(content);
                    return slidesDataCache;
                }
            }
            console.error('Could not find markdown file in any location');
            return [];
        }
        
        console.log('Found markdown file at:', markdownPath);
        const content = fs.readFileSync(markdownPath, 'utf8');
        slidesDataCache = parseMarkdown(content);
        return slidesDataCache;
    } catch (err) {
        console.error('Error loading markdown:', err.message);
        console.error('Stack:', err.stack);
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
