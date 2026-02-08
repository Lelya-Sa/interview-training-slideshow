/* ============================================
   DAY VIEW COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Detailed view with checklist
   - Interactive checkboxes
   - Progress tracking
   - State management for checklist items
   - LocalStorage persistence
   
   This shows a specific day's checklist with gamification.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsView from './QuestionsView';
import './DayView.css';

function DayView({ dayNumber, onBack }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  // ============================================
  // FETCH DAY DATA
  // ============================================
  useEffect(() => {
    async function fetchDay() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/roadmap/days/${dayNumber}`);
        
        if (response.data.success) {
          const dayData = response.data.day;
          
          // Load saved progress from localStorage
          const saved = localStorage.getItem(`day-${dayNumber}-progress`);
          if (saved) {
            try {
              const savedData = JSON.parse(saved);
              // Merge saved progress with day data
              dayData.topics = dayData.topics.map((topic, idx) => ({
                ...topic,
                completed: savedData.topics?.[idx]?.completed || false
              }));
              dayData.corePractice = dayData.corePractice.map((item, idx) => ({
                ...item,
                completed: savedData.corePractice?.[idx]?.completed || false
              }));
              dayData.completion = dayData.completion.map((item, idx) => ({
                ...item,
                completed: savedData.completion?.[idx]?.completed || false
              }));
              setPoints(savedData.points || 0);
            } catch (err) {
              console.error('Error loading saved progress:', err);
            }
          }
          
          setDay(dayData);
          setError(null);
        } else {
          setError('Failed to load day');
        }
      } catch (err) {
        console.error('Error fetching day:', err);
        setError('Failed to load day. Make sure the server is running.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchDay();
  }, [dayNumber]);

  // ============================================
  // SAVE PROGRESS
  // ============================================
  useEffect(() => {
    if (day) {
      localStorage.setItem(`day-${dayNumber}-progress`, JSON.stringify({
        topics: day.topics,
        corePractice: day.corePractice,
        completion: day.completion,
        points: points
      }));
    }
  }, [day, points, dayNumber]);

  // ============================================
  // TOGGLE ITEM COMPLETION
  // ============================================
  function toggleItem(section, index) {
    setDay(prev => {
      const newDay = { ...prev };
      const item = newDay[section][index];
      const wasCompleted = item.completed;
      
      newDay[section][index] = {
        ...item,
        completed: !item.completed
      };
      
      // Award points
      if (!wasCompleted && newDay[section][index].completed) {
        setPoints(prevPoints => prevPoints + 10);
      } else if (wasCompleted && !newDay[section][index].completed) {
        setPoints(prevPoints => Math.max(0, prevPoints - 10));
      }
      
      return newDay;
    });
  }

  // ============================================
  // CALCULATE PROGRESS
  // ============================================
  function calculateProgress() {
    if (!day) return 0;
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
      <div className="day-loading">
        <div className="loading-spinner"></div>
        <p>Loading day {dayNumber}...</p>
      </div>
    );
  }

  // ============================================
  // RENDER ERROR
  // ============================================
  if (error || !day) {
    return (
      <div className="day-error">
        <h2>⚠️ Error</h2>
        <p>{error || 'Day not found'}</p>
        <button onClick={onBack} className="back-button">← Back to Roadmap</button>
      </div>
    );
  }

  const progress = calculateProgress();
  const isCompleted = progress === 100;

  // ============================================
  // RENDER DAY VIEW
  // ============================================
  // Show questions view if requested
  if (showQuestions) {
    return (
      <QuestionsView 
        dayNumber={dayNumber} 
        onClose={() => setShowQuestions(false)} 
      />
    );
  }

  return (
    <div className="day-view">
      <div className="day-header">
        <button onClick={onBack} className="back-button">← Back to Roadmap</button>
        <div>
          <h1>Day {day.dayNumber}</h1>
          {day.level && <p className="day-level">{day.level}</p>}
        </div>
        <div className="day-stats-header">
          <div className="stat">
            <span className="stat-label">Progress</span>
            <span className="stat-value">{progress}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Points</span>
            <span className="stat-value">{points}</span>
          </div>
          <button 
            onClick={() => setShowQuestions(true)} 
            className="questions-button"
          >
            ❓ See Questions
          </button>
        </div>
      </div>

      <div className="progress-bar-large">
        <div
          className="progress-fill-large"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>

      {isCompleted && (
        <div className="completion-banner">
          🎉 Congratulations! Day {day.dayNumber} completed! 🎉
        </div>
      )}

      <div className="day-content">
        {/* Core Practice Section */}
        {day.corePractice.length > 0 && (
          <section className="checklist-section">
            <h2>🔥 Core Practice (Every Day - 60-90 min)</h2>
            <div className="checklist">
              {day.corePractice.map((item, index) => (
                <label key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem('corePractice', index)}
                  />
                  <span className={item.completed ? 'completed' : ''}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Topics Section */}
        {day.topics.length > 0 && (
          <section className="checklist-section">
            <h2>📚 Core Topics</h2>
            <div className="checklist">
              {day.topics.map((topic, index) => (
                <label key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    onChange={() => toggleItem('topics', index)}
                  />
                  <span className={topic.completed ? 'completed' : ''}>
                    {topic.text}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Completion Section */}
        {day.completion.length > 0 && (
          <section className="checklist-section">
            <h2>✅ Completion Checklist</h2>
            <div className="checklist">
              {day.completion.map((item, index) => (
                <label key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem('completion', index)}
                  />
                  <span className={item.completed ? 'completed' : ''}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default DayView;
