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
    // Check api directory first (where files are committed)
    const apiSchedulePath = path.join(__dirname, '../daily-schedule');
    if (fs.existsSync(apiSchedulePath)) {
        // Directory exists, will be included in bundle
        console.log('Daily schedule directory will be included:', apiSchedulePath);
    }
} catch (e) {
    // Ignore - we'll read it at runtime
}

function parseDayReadme(dayPath) {
    try {
        const readmePath = path.join(dayPath, 'README.md');
        
        // Check if README.md exists
        if (!fs.existsSync(readmePath)) {
            console.warn(`README.md not found for day at: ${dayPath}`);
            return null;
        }
        
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
    // Try api directory first (where files are committed)
    const apiSchedulePath = path.join(__dirname, '../daily-schedule');
    const days = [];
    
    console.log('Looking for daily-schedule at:', apiSchedulePath);
    console.log('__dirname:', __dirname);
    
    // List files in api directory to debug
    try {
        const apiDir = path.resolve(__dirname, '..');
        const apiFiles = fs.readdirSync(apiDir);
        console.log('Files in api directory:', apiFiles.slice(0, 20));
    } catch (e) {
        console.log('Could not list api directory:', e.message);
    }
    
    try {
        // Check api directory first (where files are committed)
        if (fs.existsSync(apiSchedulePath)) {
            console.log('Found daily-schedule at:', apiSchedulePath);
            const entries = fs.readdirSync(apiSchedulePath, { withFileTypes: true });
            return processDays(entries, apiSchedulePath, res);
        }
        
        console.error('Daily schedule not found at:', apiSchedulePath);
        // Try alternative paths (project root - fallback)
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
            attemptedPath: apiSchedulePath,
            __dirname: __dirname
        });
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
    const skippedDays = [];
    
    console.log(`\n=== PROCESSING DAYS ===`);
    console.log(`Processing ${entries.length} entries from ${roadmapPath}`);
    console.log(`Roadmap path exists: ${fs.existsSync(roadmapPath)}`);
    
    // List what's actually in the directory
    try {
        const dirContents = fs.readdirSync(roadmapPath);
        console.log(`Directory contents (first 20):`, dirContents.slice(0, 20));
        console.log(`Total items in directory: ${dirContents.length}`);
        
        // Check if day directories exist
        const dayDirs = dirContents.filter(item => {
            const itemPath = path.join(roadmapPath, item);
            try {
                return fs.statSync(itemPath).isDirectory() && item.startsWith('day-');
            } catch {
                return false;
            }
        });
        console.log(`Found ${dayDirs.length} day directories:`, dayDirs.slice(0, 5));
    } catch (e) {
        console.error(`Cannot read directory: ${e.message}`);
        return res.status(500).json({
            success: false,
            message: 'Cannot read roadmap directory: ' + e.message
        });
    }
    
    // Process only first 3 days for detailed debugging
    let processedCount = 0;
    const maxDebugDays = 3;
    
    entries.forEach(entry => {
        if (entry.isDirectory() && entry.name.startsWith('day-')) {
            const dayNumber = parseInt(entry.name.replace('day-', ''));
            const dayPath = path.join(roadmapPath, entry.name);
            
            // Detailed logging for first few days
            const isDebugDay = processedCount < maxDebugDays;
            
            if (isDebugDay) {
                console.log(`\n--- Processing Day ${dayNumber} ---`);
                console.log(`Day path: ${dayPath}`);
                console.log(`Day path exists: ${fs.existsSync(dayPath)}`);
            }
            
            // Check if day directory exists
            if (!fs.existsSync(dayPath)) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: Directory not found at ${dayPath}`);
                }
                skippedDays.push({ day: dayNumber, reason: 'Directory not found', path: dayPath });
                return;
            }
            
            // List files in day directory
            let dayFiles = [];
            try {
                dayFiles = fs.readdirSync(dayPath);
                if (isDebugDay) {
                    console.log(`Day ${dayNumber} files (${dayFiles.length}):`, dayFiles);
                }
            } catch (e) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: Cannot list directory: ${e.message}`);
                }
                skippedDays.push({ day: dayNumber, reason: 'Cannot list directory: ' + e.message, path: dayPath });
                return;
            }
            
            // Check if README.md exists before trying to parse
            const readmePath = path.join(dayPath, 'README.md');
            const readmeExists = fs.existsSync(readmePath);
            
            if (isDebugDay) {
                console.log(`Day ${dayNumber}: README.md exists at ${readmePath}? ${readmeExists}`);
                if (readmeExists) {
                    try {
                        const stats = fs.statSync(readmePath);
                        console.log(`Day ${dayNumber}: README.md size: ${stats.size} bytes`);
                    } catch (e) {
                        console.warn(`Day ${dayNumber}: Cannot stat README.md: ${e.message}`);
                    }
                }
            }
            
            if (!readmeExists) {
                if (isDebugDay) {
                    console.warn(`Day ${dayNumber}: README.md not found at ${readmePath}`);
                    console.warn(`Day ${dayNumber}: Available files:`, dayFiles);
                }
                skippedDays.push({ day: dayNumber, reason: 'README.md not found', path: readmePath });
                return; // Skip this day
            }
            
            try {
                const dayData = parseDayReadme(dayPath);
                
                if (dayData) {
                    days.push({
                        dayNumber,
                        ...dayData
                    });
                    if (isDebugDay) {
                        console.log(`Day ${dayNumber}: Successfully parsed`);
                    }
                } else {
                    if (isDebugDay) {
                        console.warn(`Day ${dayNumber}: Failed to parse day data`);
                    }
                    skippedDays.push({ day: dayNumber, reason: 'Parse failed', path: dayPath });
                }
            } catch (err) {
                if (isDebugDay) {
                    console.error(`Day ${dayNumber}: Error parsing - ${err.message}`);
                    console.error(`Day ${dayNumber}: Stack:`, err.stack);
                }
                skippedDays.push({ day: dayNumber, reason: err.message, path: dayPath });
            }
            
            processedCount++;
        }
    });
    
    days.sort((a, b) => a.dayNumber - b.dayNumber);
    
    console.log(`Successfully loaded ${days.length} days. Skipped ${skippedDays.length} days.`);
    if (skippedDays.length > 0) {
        console.log('Skipped days:', skippedDays.slice(0, 5).map(d => `Day ${d.day}: ${d.reason}`));
    }
    
    res.json({
        success: true,
        count: days.length,
        days: days,
        skipped: skippedDays.length > 0 ? skippedDays.length : undefined
    });
}
