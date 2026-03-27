import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsView from './components/QuestionsView';

const TOTAL_DAYS = 34;

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showSideQuest, setShowSideQuest] = useState(false);
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
      {selectedDay == null && !showSideQuest ? (
        <>
          <header className="app-header">
            <h1 className="app-title">Interview Training</h1>
            <p className="app-subtitle">34-day roadmap · Daily questions by topic</p>
            <div className="header-actions">
              <button
                type="button"
                className="day-btn side-quest-btn"
                onClick={() => setShowSideQuest(true)}
              >
                Side Quest
              </button>
            </div>
          </header>
          {loading && (
            <div className="roadmap-loading" aria-busy="true" aria-live="polite">
              <div className="roadmap-loading-spinner" aria-hidden="true" />
              <span>Loading roadmap…</span>
            </div>
          )}
          {error && <p className="roadmap-error">⚠️ {error}</p>}
          {!loading && roadmap && roadmap.length > 0 && (
            <p className="roadmap-hint">Choose a day to open its questions.</p>
          )}
          {!loading && (
            <div className="roadmap-list">
              {roadmap && roadmap.length > 0
                ? roadmap.map((day) => (
                    <article key={day.dayNumber} className="roadmap-day-card">
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
                    </article>
                  ))
                : (
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
          )}
        </>
      ) : selectedDay != null ? (
        <QuestionsView
          dayNumber={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      ) : (
        <section className="side-quest-panel" aria-live="polite">
          <div className="side-quest-header">
            <h2 className="side-quest-title">Side Quest: Repository Archaeology</h2>
            <button
              type="button"
              className="day-btn"
              onClick={() => setShowSideQuest(false)}
            >
              Back to roadmap
            </button>
          </div>
          <p className="side-quest-description">
            Optional challenge: compare legacy <code>slideshow-app</code> with <code>apps/web</code> and design a safe cleanup plan.
          </p>
          <ul className="side-quest-list">
            <li>Compare duplicate folders and identify active vs legacy files.</li>
            <li>Write a low-risk cleanup plan with rollback steps.</li>
            <li>Validate that main routes still work after changes.</li>
            <li>Prepare a short STAR story for interview practice.</li>
          </ul>
          <p className="side-quest-note">
            Full checklist: <code>ai/SIDE_QUEST_CHECKLIST.md</code>
          </p>
        </section>
      )}
    </div>
  );
}

export default App;
