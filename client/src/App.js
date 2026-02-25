import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsView from './components/QuestionsView';

const TOTAL_DAYS = 34;

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/roadmap/summary')
      .then((res) => {
        if (res.data && res.data.success && res.data.days) {
          setRoadmap(res.data.days);
        } else {
          setRoadmap([]);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load roadmap');
        setRoadmap([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      {selectedDay == null ? (
        <>
          <h1>Interview Training – 34-Day Roadmap</h1>
          {loading && <p>Loading roadmap…</p>}
          {error && <p className="roadmap-error">⚠️ {error}</p>}
          {roadmap && roadmap.length > 0 && (
            <p className="roadmap-hint">Choose a day to open daily questions.</p>
          )}
          <div className="roadmap-list">
            {roadmap && roadmap.length > 0
              ? roadmap.map((day) => (
                  <div key={day.dayNumber} className="roadmap-day-card">
                    <div className="roadmap-day-header">
                      <span className="roadmap-day-title">Day {day.dayNumber}</span>
                      <button
                        type="button"
                        className="day-btn open-questions-btn"
                        onClick={() => setSelectedDay(day.dayNumber)}
                      >
                        Open questions
                      </button>
                    </div>
                    {day.topics && day.topics.length > 0 && (
                      <ul className="roadmap-day-topics">
                        {day.topics.map((t, i) => (
                          <li key={i}>{t.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              : !loading && (
                  <div className="day-grid">
                    {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        type="button"
                        className="day-btn"
                        onClick={() => setSelectedDay(day)}
                      >
                        Day {day}
                      </button>
                    ))}
                  </div>
                )}
          </div>
        </>
      ) : (
        <QuestionsView
          dayNumber={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

export default App;
