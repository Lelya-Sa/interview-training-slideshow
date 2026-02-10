/* ============================================
   VERCEL SERVERLESS FUNCTION: GET SPECIFIC DAY
   ============================================
   
   URL: /api/roadmap/days/1 (where 1 is the day number)
   Method: GET
*/

const fs = require('fs');
const path = require('path');

function parseDayReadme(dayPath) {
    try {
        // Try README.md first, then fall back to topics.md
        let readmePath = path.join(dayPath, 'README.md');
        let content = null;
        let fileType = 'README.md';
        
        if (fs.existsSync(readmePath)) {
            content = fs.readFileSync(readmePath, 'utf8');
        } else {
            // Fall back to topics.md
            readmePath = path.join(dayPath, 'topics.md');
            if (fs.existsSync(readmePath)) {
                content = fs.readFileSync(readmePath, 'utf8');
                fileType = 'topics.md';
                console.log(`Using topics.md for day at: ${dayPath}`);
            } else {
                console.warn(`Neither README.md nor topics.md found for day at: ${dayPath}`);
                return null;
            }
        }
        
        const day = {
            topics: [],
            corePractice: [],
            completion: []
        };
        
        const lines = content.split('\n');
        
        // Parse based on file type (same logic as days.js)
        if (fileType === 'topics.md') {
            // Parse topics.md format
            let currentTopic = null;
            let inCoreTopics = false;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Extract day number
                if (line.match(/^# Day (\d+)/)) {
                    const match = line.match(/Day (\d+)/);
                    if (match) {
                        day.dayNumber = parseInt(match[1]);
                    }
                }
                
                // Check if we're in Core Topics section
                if (line.includes('Core Topics')) {
                    inCoreTopics = true;
                    continue;
                }
                
                // Check if we're in Extra Topics section (skip for now)
                if (line.includes('Extra Topics')) {
                    inCoreTopics = false;
                    continue;
                }
                
                // Topic name (starts with ###)
                if (line.match(/^### (.+)$/)) {
                    const match = line.match(/^### (.+)$/);
                    if (match && inCoreTopics) {
                        currentTopic = {
                            name: match[1].trim(),
                            path: '',
                            text: match[1].trim(),
                            completed: false
                        };
                    }
                }
                
                // Path line (format: - **Path**: `...`)
                const pathPatterns = [
                    /- \*\*Path\*\*:\s*`([^`]+)`/,  // - **Path**: `...`
                    /Path:\s*`([^`]+)`/,            // Path: `...`
                    /- Path:\s*`([^`]+)`/           // - Path: `...`
                ];
                
                for (const pattern of pathPatterns) {
                    const match = line.match(pattern);
                    if (match && currentTopic) {
                        currentTopic.path = match[1];
                        currentTopic.text += `\n  - Path: \`${match[1]}\``;
                        day.topics.push(currentTopic);
                        currentTopic = null;
                        break;
                    }
                }
            }
            
            // If no day number was found, try to extract from path
            if (!day.dayNumber) {
                const pathMatch = dayPath.match(/day-(\d+)/);
                if (pathMatch) {
                    day.dayNumber = parseInt(pathMatch[1]);
                }
            }
        } else {
            // Parse README.md format (original format)
            let currentSection = null;
            let lastTopicIndex = -1;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                if (line.includes('CORE PRACTICE')) {
                    currentSection = 'corePractice';
                } else if (line.includes('CORE TOPICS')) {
                    currentSection = 'topics';
                } else if (line.includes('Completion')) {
                    currentSection = 'completion';
                }
                
                if (line.trim().startsWith('- [ ]')) {
                    const item = line.replace('- [ ]', '').trim();
                    if (currentSection === 'corePractice') {
                        day.corePractice.push({ text: item, completed: false });
                    } else if (currentSection === 'topics') {
                        const nameMatch = item.match(/\*\*(.*?)\*\*/);
                        let path = '';
                        
                        const pathMatch = item.match(/Path:\s*`([^`]+)`/) || 
                                         (i + 1 < lines.length && lines[i + 1].match(/Path:\s*`([^`]+)`/));
                        
                        if (pathMatch) {
                            path = pathMatch[1];
                        }
                        
                        day.topics.push({
                            name: nameMatch ? nameMatch[1] : item,
                            text: item + (path ? `\n  - Path: \`${path}\`` : ''),
                            path: path,
                            completed: false
                        });
                        lastTopicIndex = day.topics.length - 1;
                    } else if (currentSection === 'completion') {
                        day.completion.push({ text: item, completed: false });
                    }
                }
                else if (currentSection === 'topics' && line.match(/^\s+-\s+Path:\s*`([^`]+)`/)) {
                    const pathMatch = line.match(/Path:\s*`([^`]+)`/);
                    if (pathMatch && lastTopicIndex >= 0) {
                        day.topics[lastTopicIndex].path = pathMatch[1];
                        day.topics[lastTopicIndex].text += '\n  - Path: `' + pathMatch[1] + '`';
                    }
                }
                
                if (line.startsWith('# Day')) {
                    const match = line.match(/Day (\d+):/);
                    if (match) {
                        day.dayNumber = parseInt(match[1]);
                    }
                }
                
                if (line.includes('Level:')) {
                    const match = line.match(/Level: (.*?)\|/);
                    if (match) {
                        day.level = match[1].trim();
                    }
                }
            }
        }
        
        return day;
    } catch (err) {
        console.error(`Error parsing day: ${err.message}`);
        return null;
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
    
    // Get dayNumber from URL path
    // Vercel dynamic routes: /api/roadmap/days/1 -> [dayNumber].js
    // The parameter should be in req.query.dayNumber for Vercel dynamic routes
    let dayNumber = null;
    
    // Method 1: From query parameter (Vercel's default for [param].js files)
    if (req.query && req.query.dayNumber) {
        dayNumber = parseInt(req.query.dayNumber);
    }
    // Method 2: Extract from URL path as fallback
    else if (req.url) {
        // Match /api/roadmap/days/1 or /days/1
        const urlMatch = req.url.match(/\/days\/(\d+)(?:\?|$|\/)/);
        if (urlMatch) {
            dayNumber = parseInt(urlMatch[1]);
        }
    }
    
    console.log('=== Day Number Extraction ===');
    console.log('Request URL:', req.url);
    console.log('Request query:', JSON.stringify(req.query));
    console.log('Extracted dayNumber:', dayNumber);
    
    if (!dayNumber || isNaN(dayNumber) || dayNumber < 1) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid day number',
            url: req.url,
            query: req.query,
            hint: 'Expected /api/roadmap/days/1 format'
        });
    }
    
    // In Vercel, __dirname points to /var/task/api/roadmap/days
    // The daily-schedule directory should be in the api directory itself
    const apiSchedulePath = path.join(__dirname, '../daily-schedule');
    const dayPath = path.join(apiSchedulePath, `day-${String(dayNumber).padStart(2, '0')}`);
    
    console.log(`Looking for day ${dayNumber} at: ${dayPath}`);
    console.log(`__dirname: ${__dirname}`);
    
    // Check if day directory exists
    if (!fs.existsSync(dayPath)) {
        console.error(`Day directory not found: ${dayPath}`);
        return res.status(404).json({
            success: false,
            message: `Day ${dayNumber} not found`,
            attemptedPath: dayPath
        });
    }
    
    try {
        const dayData = parseDayReadme(dayPath);
        
        if (dayData) {
            res.json({
                success: true,
                day: {
                    dayNumber,
                    ...dayData
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Day not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error reading day',
            error: err.message
        });
    }
};
