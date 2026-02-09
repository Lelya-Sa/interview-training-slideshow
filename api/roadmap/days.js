/* ============================================
   VERCEL SERVERLESS FUNCTION: GET ALL DAYS
   ============================================
   
   URL: /api/roadmap/days
   Method: GET
*/

const fs = require('fs');
const path = require('path');

// Force Vercel to include the daily-schedule directory
// Check if it exists to ensure it's included in the bundle
try {
    const schedulePath = path.join(__dirname, '../../daily-schedule');
    if (fs.existsSync(schedulePath)) {
        // Directory exists, will be included in bundle
        console.log('Daily schedule directory will be included:', schedulePath);
    }
} catch (e) {
    // Ignore - we'll read it at runtime
}

function parseDayReadme(dayPath) {
    try {
        const readmePath = path.join(dayPath, 'README.md');
        const content = fs.readFileSync(readmePath, 'utf8');
        
        const day = {
            topics: [],
            corePractice: [],
            completion: []
        };
        
        const lines = content.split('\n');
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
    
    // In Vercel, __dirname points to /var/task/api/roadmap
    // The daily-schedule directory should be in the api directory itself
    const roadmapPath = path.join(__dirname, '../daily-schedule');
    const days = [];
    
    console.log('Looking for daily-schedule at:', roadmapPath);
    console.log('__dirname:', __dirname);
    console.log('Project root:', projectRoot);
    
    // List files in project root to debug
    try {
        const rootFiles = fs.readdirSync(projectRoot);
        console.log('Files in project root:', rootFiles.slice(0, 20));
    } catch (e) {
        console.log('Could not list project root:', e.message);
    }
    
    try {
        if (!fs.existsSync(roadmapPath)) {
            console.error('Daily schedule not found at:', roadmapPath);
            // Try alternative paths (project root)
            const altPaths = [
                path.join(__dirname, '../../daily-schedule'),
                '/var/task/daily-schedule'
            ];
            
            for (const altPath of altPaths) {
                console.log('Trying alternative path:', altPath);
                if (fs.existsSync(altPath)) {
                    console.log('Found at:', altPath);
                    const entries = fs.readdirSync(altPath, { withFileTypes: true });
                    return processDays(entries, altPath, res);
                }
            }
            
            console.error('Could not find daily-schedule in any location');
            return res.status(404).json({
                success: false,
                message: 'Daily schedule directory not found',
                attemptedPath: roadmapPath,
                __dirname: __dirname
            });
        }
        
        console.log('Found daily-schedule at:', roadmapPath);
        const entries = fs.readdirSync(roadmapPath, { withFileTypes: true });
        return processDays(entries, roadmapPath, res);
    } catch (err) {
        console.error('Error reading roadmap:', err);
        res.status(500).json({
            success: false,
            message: 'Error reading roadmap',
            error: err.message
        });
    }
};

function processDays(entries, roadmapPath, res) {
    const days = [];
    
    entries.forEach(entry => {
        if (entry.isDirectory() && entry.name.startsWith('day-')) {
            const dayNumber = parseInt(entry.name.replace('day-', ''));
            const dayPath = path.join(roadmapPath, entry.name);
            const dayData = parseDayReadme(dayPath);
            
            if (dayData) {
                days.push({
                    dayNumber,
                    ...dayData
                });
            }
        }
    });
    
    days.sort((a, b) => a.dayNumber - b.dayNumber);
    
    res.json({
        success: true,
        count: days.length,
        days: days
    });
}
