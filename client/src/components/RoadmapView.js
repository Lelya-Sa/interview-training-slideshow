/* ============================================
   ROADMAP VIEW COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Fetching data from API
   - Rendering lists with map()
   - Navigation between views
   - Conditional rendering
   - Progress calculation
   
   This shows all days in the training roadmap with progress.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoadmapView.css';

function RoadmapView({ onSelectDay }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // FETCH ROADMAP DATA
  // ============================================
  useEffect(() => {
    async function fetchRoadmap() {
      try {
        setLoading(true);
        const response = await axios.get('/api/roadmap/days');
        
        console.log('Roadmap API response:', response.data);
        console.log('Days count:', response.data.days?.length);
        console.log('First day:', response.data.days?.[0]);
        
        if (response.data.success) {
          const daysArray = response.data.days || [];
          console.log('Setting days:', daysArray.length);
          setDays(daysArray);
          setError(null);
          
          if (daysArray.length === 0) {
            setError('No days found in roadmap');
          }
        } else {
          setError('Failed to load roadmap');
        }
      } catch (err) {
        console.error('Error fetching roadmap:', err);
        setError('Failed to load roadmap. Make sure the server is running.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchRoadmap();
  }, []);

  // ============================================
  // CALCULATE DAY PROGRESS
  // ============================================
  function calculateProgress(day) {
    const total = day.topics.length + day.corePractice.length + day.completion.length;
    const completed = [
      ...day.topics,
      ...day.corePractice,
      ...day.completion
    ].filter(item => item.completed).length;
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // ============================================
  // RENDER LOADING
  // ============================================
  if (loading) {
    return (
      <div className="roadmap-loading">
        <div className="loading-spinner"></div>
        <p>Loading roadmap...</p>
      </div>
    );
  }

  // ============================================
  // RENDER ERROR
  // ============================================
  if (error) {
    return (
      <div className="roadmap-error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // ============================================
  // RENDER ROADMAP
  // ============================================
  return (
    <div className="roadmap-view">
      <div className="roadmap-header">
        <h1>📚 Training Roadmap</h1>
        <p>Select a day to start your training journey</p>
      </div>

      {days.length === 0 ? (
        <div className="roadmap-error">
          <p>No days found. The API returned {days.length} days.</p>
          <p>Check the browser console for API response details.</p>
        </div>
      ) : (
        <div className="days-grid">
          {days.map(day => {
            const progress = calculateProgress(day);
            const isCompleted = progress === 100;
            
            return (
              <div
                key={day.dayNumber}
                className={`day-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSelectDay(day.dayNumber)}
              >
                <div className="day-header">
                  <h2>Day {day.dayNumber}</h2>
                  {isCompleted && <span className="badge">✓ Complete</span>}
                </div>
                
                {day.level && (
                  <div className="day-level">{day.level}</div>
                )}
                
                <div className="day-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    >
                      {progress}%
                    </div>
                  </div>
                </div>
                
                <div className="day-stats">
                  <span>{day.topics?.length || 0} Topics</span>
                  <span>{day.corePractice?.length || 0} Practice Items</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RoadmapView;
