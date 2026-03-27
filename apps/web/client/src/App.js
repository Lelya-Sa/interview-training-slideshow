import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsView from './components/QuestionsView';

const TOTAL_DAYS = 34;

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showSideQuest, setShowSideQuest] = useState(false);
  const [showCognyteRoadmap, setShowCognyteRoadmap] = useState(false);
  const [showDayByDayPlan, setShowDayByDayPlan] = useState(false);
  const [useCognyteAsMain, setUseCognyteAsMain] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cognytePhases = [
    {
      title: 'Phase 1 (Days 1-4): Foundation',
      goal: 'Solid JS/TS + React + Angular fundamentals and async confidence.',
      tasks: [
        'Day 1: JS/TS core + 4 logic tasks + rapid Q&A',
        'Day 2: React fundamentals + TODO/filter/search mini feature',
        'Day 3: Angular fundamentals + same feature in Angular',
        'Day 4: API integration in both apps + error/loading handling'
      ],
      verification: 'Explain event loop and closure clearly, and build one API feature in both React and Angular.'
    },
    {
      title: 'Phase 2 (Days 5-7): State + Testing + Mock #1',
      goal: 'Build interview-level implementation and testing basics.',
      tasks: [
        'Day 5: React Context + Angular service state (BehaviorSubject)',
        'Day 6: Testing essentials in React Testing Library and Angular TestBed',
        'Day 7: Mock interview #1 (technical + coding + behavioral)'
      ],
      verification: 'Write basic tests without tutorials and complete mock #1 with written gap analysis.'
    },
    {
      title: 'Phase 3 (Days 8-11): Intermediate Topics',
      goal: 'Cover common junior-intermediate questions asked in interviews.',
      tasks: [
        'Day 8: React performance and form patterns',
        'Day 9: Angular RxJS, guards, lazy loading, change detection basics',
        'Day 10: Frontend architecture and clean-code refactor',
        'Day 11: Performance/security basics + timed mixed logic set'
      ],
      verification: 'Explain one architecture trade-off and answer most React/Angular intermediate questions confidently.'
    },
    {
      title: 'Phase 4 (Days 12-14): Final Sprint',
      goal: 'Convert knowledge into interview performance under time pressure.',
      tasks: [
        'Day 12: Fullstack frontend integration and API contract reasoning',
        'Day 13: Mock interview #2 full loop',
        'Day 14: Final revision + timed coding + project storytelling'
      ],
      verification: 'Pass 2 mocks, solve 2 easy + 1 medium in time, and explain one project end-to-end.'
    }
  ];
  const cognyteDailyPlan = [
    { dayNumber: 1, title: 'JS + TS Core', focus: 'Scope, closures, event loop, async, TS basics', tasks: ['4 logic tasks', '15 rapid Q&A', 'mistake log'], verify: 'Can explain closure and event loop clearly.' },
    { dayNumber: 2, title: 'React Fundamentals', focus: 'Props/state/hooks/effects and pitfalls', tasks: ['Build TODO/filter/search', '3 logic tasks', 'component flow explanation'], verify: 'Can build a basic React feature without tutorial.' },
    { dayNumber: 3, title: 'Angular Fundamentals', focus: 'Components, DI, lifecycle, routing basics', tasks: ['Rebuild mini feature in Angular', '3 logic tasks', 'React vs Angular compare'], verify: 'Can explain Angular component lifecycle and DI.' },
    { dayNumber: 4, title: 'API + Async in Both', focus: 'Loading/error/empty states and retries', tasks: ['Wire one API in React + Angular', '3 logic tasks', 'async checklist'], verify: 'Can implement robust API flow in both frameworks.' },
    { dayNumber: 5, title: 'State Management', focus: 'Context/Reducer and Angular service state', tasks: ['Shared-state use case in both', '3 logic tasks', 'trade-off Q&A'], verify: 'Can justify local vs global state choices.' },
    { dayNumber: 6, title: 'Testing Essentials', focus: 'RTL + Angular TestBed basics', tasks: ['Write 8 tests', '3 logic tasks', 'test strategy drill'], verify: 'Can write unit tests and explain what to test.' },
    { dayNumber: 7, title: 'Mock Interview #1', focus: 'Technical + coding + behavioral', tasks: ['45m technical', '30m coding', '15m behavioral'], verify: 'Weakness backlog created with next-step fixes.' },
    { dayNumber: 8, title: 'React Intermediate', focus: 'memo/useMemo/useCallback/forms', tasks: ['Optimize one component', '3 logic tasks', 'rendering Q&A'], verify: 'Can explain when optimization is useful.' },
    { dayNumber: 9, title: 'Angular Intermediate', focus: 'RxJS, guards, lazy loading, OnPush basics', tasks: ['Observable flow practice', '3 logic tasks', 'routing/security Q&A'], verify: 'Can explain switchMap and route guards.' },
    { dayNumber: 10, title: 'Architecture + Refactor', focus: 'Feature structure and clean code', tasks: ['Refactor one feature', '3 logic tasks', 'trade-offs explanation'], verify: 'Can justify architectural decisions clearly.' },
    { dayNumber: 11, title: 'Performance + Security', focus: 'Debounce/throttle, rendering, XSS/auth basics', tasks: ['Add one perf and one reliability improvement', 'timed mixed set', 'security Q&A'], verify: 'Can discuss optimization and frontend security basics.' },
    { dayNumber: 12, title: 'Fullstack Integration', focus: 'API contracts/status codes/error handling', tasks: ['OA-style timed set', 'debug scenario walkthrough', 'integration explanation'], verify: 'Can explain UI-event-to-API-response end-to-end.' },
    { dayNumber: 13, title: 'Mock Interview #2', focus: 'Full simulation under pressure', tasks: ['60m technical', '40m live coding', '20m behavioral'], verify: 'Score improved vs Mock #1.' },
    { dayNumber: 14, title: 'Final Polish', focus: 'Weak topics + final rehearsal', tasks: ['4 tasks in 90m', 'project storytelling', 'interview opening'], verify: 'Ready to answer ~80% core questions without notes.' }
  ];
  const dayByDayQuestionPlan = [
    { day: 1, focus: 'React + JS foundations', questions: 'Q1-Q11' },
    { day: 2, focus: 'React deeper concepts', questions: 'Q12-Q22' },
    { day: 3, focus: 'React + JS bridge', questions: 'Q23-Q33' },
    { day: 4, focus: 'JavaScript fundamentals', questions: 'Q34-Q44' },
    { day: 5, focus: 'JavaScript completion + Angular start', questions: 'Q45-Q55' },
    { day: 6, focus: 'Angular core architecture', questions: 'Q56-Q66' },
    { day: 7, focus: 'Angular + HTTP + RxJS', questions: 'Q67-Q77' },
    { day: 8, focus: 'TypeScript essentials', questions: 'Q78-Q88' },
    { day: 9, focus: 'JS/TS depth + communication', questions: 'Q89-Q99' },
    { day: 10, focus: 'Transition day + logic start', questions: 'Q100-Q110' },
    { day: 11, focus: 'Logic/LeetCode pattern set 1', questions: 'Q111-Q120' },
    { day: 12, focus: 'Logic/LeetCode pattern set 2', questions: 'Q121-Q130' },
    { day: 13, focus: 'Logic + mixed frontend scenarios', questions: 'Q131-Q140' },
    { day: 14, focus: 'Final mixed interview prep', questions: 'Q141-Q150' }
  ];

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
      {selectedDay == null && !showSideQuest && !showCognyteRoadmap && !showDayByDayPlan ? (
        <>
          <header className="app-header">
            <h1 className="app-title">Interview Training</h1>
            <p className="app-subtitle">
              {useCognyteAsMain
                ? '14-day Cognyte-ready roadmap · React + Angular + Logic'
                : '34-day roadmap · Daily questions by topic'}
            </p>
            <div className="header-actions">
              <button
                type="button"
                className={`day-btn mode-toggle-btn ${useCognyteAsMain ? 'active-mode' : ''}`}
                onClick={() => setUseCognyteAsMain((prev) => !prev)}
              >
                {useCognyteAsMain ? 'Using Cognyte 14-day plan' : 'Switch to Cognyte 14-day plan'}
              </button>
              <button
                type="button"
                className="day-btn side-quest-btn"
                onClick={() => setShowSideQuest(true)}
              >
                Side Quest
              </button>
              <button
                type="button"
                className="day-btn cognyte-roadmap-btn"
                onClick={() => setShowCognyteRoadmap(true)}
              >
                Cognyte Prep Roadmap
              </button>
              <button
                type="button"
                className="day-btn day-by-day-btn"
                onClick={() => setShowDayByDayPlan(true)}
              >
                Day-by-Day Question Plan
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
          {!useCognyteAsMain && !loading && roadmap && roadmap.length > 0 && (
            <p className="roadmap-hint">Choose a day to open its questions.</p>
          )}
          {useCognyteAsMain && (
            <div className="roadmap-list">
              {cognyteDailyPlan.map((day) => (
                <article key={day.dayNumber} className="roadmap-day-card prep-day-card">
                  <div className="roadmap-day-header">
                    <span className="roadmap-day-title">Day {day.dayNumber}: {day.title}</span>
                    <button
                      type="button"
                      className="day-btn open-questions-btn"
                      onClick={() => setSelectedDay(day.dayNumber)}
                    >
                      Open questions
                    </button>
                  </div>
                  <p className="prep-day-focus"><strong>Focus:</strong> {day.focus}</p>
                  <ul className="roadmap-day-topics">
                    {day.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                  <p className="prep-day-verify"><strong>Verify:</strong> {day.verify}</p>
                </article>
              ))}
            </div>
          )}
          {!useCognyteAsMain && !loading && (
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
          cognyteMode={useCognyteAsMain && selectedDay >= 1 && selectedDay <= 14}
          onClose={() => setSelectedDay(null)}
        />
      ) : showDayByDayPlan ? (
        <section className="cognyte-roadmap-panel" aria-live="polite">
          <div className="cognyte-roadmap-header">
            <h2 className="cognyte-roadmap-title">Day-by-Day Question Plan (14 Days)</h2>
            <button
              type="button"
              className="day-btn"
              onClick={() => setShowDayByDayPlan(false)}
            >
              Back to roadmap
            </button>
          </div>
          <p className="cognyte-roadmap-description">
            Follow this exact question queue each day. Open questions from the main roadmap to practice.
          </p>
          <div className="cognyte-phase-list">
            {dayByDayQuestionPlan.map((item) => (
              <article key={item.day} className="cognyte-phase-card">
                <h3>Day {item.day}</h3>
                <p><strong>Focus:</strong> {item.focus}</p>
                <p><strong>Questions:</strong> {item.questions}</p>
              </article>
            ))}
          </div>
          <p className="cognyte-roadmap-note">
            Full markdown plan: <code> COGNYTE_DAY_BY_DAY_QUESTION_PLAN.md </code>
          </p>
        </section>
      ) : showCognyteRoadmap ? (
        <section className="cognyte-roadmap-panel" aria-live="polite">
          <div className="cognyte-roadmap-header">
            <h2 className="cognyte-roadmap-title">Cognyte Interview Prep Roadmap (14 Days)</h2>
            <button
              type="button"
              className="day-btn"
              onClick={() => setShowCognyteRoadmap(false)}
            >
              Back to roadmap
            </button>
          </div>
          <p className="cognyte-roadmap-description">
            Use this as your daily checklist for React + Angular + logic interview preparation.
          </p>
          <div className="cognyte-phase-list">
            {cognytePhases.map((phase) => (
              <article key={phase.title} className="cognyte-phase-card">
                <h3>{phase.title}</h3>
                <p><strong>Goal:</strong> {phase.goal}</p>
                <ul>
                  {phase.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <p className="cognyte-verify"><strong>Verification:</strong> {phase.verification}</p>
              </article>
            ))}
          </div>
          <p className="cognyte-roadmap-note">
            Full details and question packs are available in project docs:
            <code> COGNYTE_14_DAY_PREP_PLAN.md </code> and
            <code> COGNYTE_150_QUESTION_PACK_PHASE_2.md </code>.
          </p>
        </section>
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
            Full checklist: <code>content/ai/SIDE_QUEST_CHECKLIST.md</code>
          </p>
        </section>
      )}
    </div>
  );
}

export default App;
