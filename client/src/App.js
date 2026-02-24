import React, { useState } from 'react';
import QuestionsView from './components/QuestionsView';

const TOTAL_DAYS = 34;

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="app">
      {selectedDay == null ? (
        <>
          <h1>Interview Training – 34-Day Roadmap</h1>
          <p>Choose a day to open daily questions.</p>
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
