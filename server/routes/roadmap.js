/* ============================================
   ROADMAP API ROUTES
   ============================================
   
   This file handles API endpoints for the roadmap/day system.
   It reads daily schedule files and serves them as JSON.
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// ============================================
// HELPER FUNCTION: Parse Day README
// ============================================
// Reads a day's README.md and extracts checklist items
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
            
            // Detect sections
            if (line.includes('CORE PRACTICE')) {
                currentSection = 'corePractice';
            } else if (line.includes('CORE TOPICS')) {
                currentSection = 'topics';
            } else if (line.includes('Completion')) {
                currentSection = 'completion';
            }
            
            // Parse checklist items
            if (line.trim().startsWith('- [ ]')) {
                const item = line.replace('- [ ]', '').trim();
                if (currentSection === 'corePractice') {
                    day.corePractice.push({ text: item, completed: false });
                } else if (currentSection === 'topics') {
                    // Extract topic name (in bold)
                    const nameMatch = item.match(/\*\*(.*?)\*\*/);
                    let path = '';
                    
                    // Look for path on next line or within item
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
            // Handle paths on separate indented lines
            else if (currentSection === 'topics' && line.match(/^\s+-\s+Path:\s*`([^`]+)`/)) {
                const pathMatch = line.match(/Path:\s*`([^`]+)`/);
                if (pathMatch && lastTopicIndex >= 0) {
                    day.topics[lastTopicIndex].path = pathMatch[1];
                    day.topics[lastTopicIndex].text += '\n  - Path: `' + pathMatch[1] + '`';
                }
            }
            
            // Parse day number and level
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

// ============================================
// GET /api/roadmap/days - Get all days
// ============================================
router.get('/days', (req, res) => {
    const roadmapPath = path.join(__dirname, '../../../daily-schedule');
    const days = [];
    
    try {
        // Read all day folders
        const entries = fs.readdirSync(roadmapPath, { withFileTypes: true });
        
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
        
        // Sort by day number
        days.sort((a, b) => a.dayNumber - b.dayNumber);
        
        res.json({
            success: true,
            count: days.length,
            days: days
        });
    } catch (err) {
        console.error('Error reading roadmap:', err);
        res.status(500).json({
            success: false,
            message: 'Error reading roadmap',
            error: err.message
        });
    }
});

// ============================================
// GET /api/roadmap/days/:dayNumber - Get specific day
// ============================================
router.get('/days/:dayNumber', (req, res) => {
    const dayNumber = parseInt(req.params.dayNumber);
    const dayPath = path.join(__dirname, '../../../daily-schedule', `day-${String(dayNumber).padStart(2, '0')}`);
    
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
});

module.exports = router;
