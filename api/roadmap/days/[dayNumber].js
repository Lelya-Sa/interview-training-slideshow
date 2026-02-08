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
    
    // Get dayNumber from query (Vercel dynamic routes)
    const dayNumber = parseInt(req.query.dayNumber);
    
    if (isNaN(dayNumber)) {
        return res.status(400).json({ success: false, message: 'Invalid day number' });
    }
    
    const dayPath = path.join(__dirname, '../../../../daily-schedule', `day-${String(dayNumber).padStart(2, '0')}`);
    
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
