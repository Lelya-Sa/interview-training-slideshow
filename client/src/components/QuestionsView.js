/* ============================================
   QUESTIONS VIEW COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Dynamic question loading from API
   - Interactive quiz interface
   - Answer submission and validation
   - Progress tracking
   - Gamification (points, streaks)
   - State management for quiz
   
   This shows questions for a specific day's topics.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionsView.css';

function QuestionsView({ dayNumber, onClose }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // FETCH QUESTIONS FOR DAY
  // ============================================
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        
        // Fetch day data to get topics
        const dayResponse = await axios.get(`/api/roadmap/days/${dayNumber}`);
        
        if (dayResponse.data.success) {
          const day = dayResponse.data.day;
          const allQuestions = [];
          
          // Extract paths from topics
          for (const topic of day.topics) {
            try {
              // Extract topic path from topic text
              // Format: "🔥 **Topic Name** (PRIORITY)\n  - Path: `path/to/questions.md`"
              const pathMatch = topic.text.match(/Path:\s*`([^`]+)`/);
              
              if (pathMatch) {
                const topicPath = pathMatch[1];
                console.log('Fetching questions from:', topicPath);
                
                // Fetch questions from this topic
                const questionsResponse = await axios.get(`/api/questions`, {
                  params: { path: topicPath }
                });
                
                if (questionsResponse.data.success && questionsResponse.data.questions) {
                  console.log(`Loaded ${questionsResponse.data.questions.length} questions from ${topicPath}`);
                  allQuestions.push(...questionsResponse.data.questions);
                }
              }
            } catch (err) {
              console.error('Error fetching topic questions:', err);
            }
          }
          
          console.log(`Total questions loaded: ${allQuestions.length}`);
          
          if (allQuestions.length === 0) {
            setError('No questions found. Make sure the markdown files have the correct format.');
          } else {
            setQuestions(allQuestions);
            setError(null);
          }
        } else {
          setError('Failed to load day');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchQuestions();
  }, [dayNumber]);

  // ============================================
  // HANDLE ANSWER CHANGE
  // ============================================
  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
  };

  // ============================================
  // SUBMIT ANSWER
  // ============================================
  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex] || '';
    
    // Mark as submitted
    setSubmitted(prev => ({
      ...prev,
      [currentQuestionIndex]: true
    }));
    
    // Award points if answer is not empty (simple validation)
    if (userAnswer.trim().length > 20) {
      // If answer is substantial (20+ chars), award points
      const newPoints = points + 25;
      const newStreak = streak + 1;
      setPoints(newPoints);
      setStreak(newStreak);
    } else {
      // Reset streak if answer too short
      setStreak(0);
    }
  };

  // ============================================
  // NEXT QUESTION
  // ============================================
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete
      alert(`🎉 Quiz Complete!\n\nPoints: ${points}\nStreak: ${streak}`);
      onClose();
    }
  };

  // ============================================
  // PREVIOUS QUESTION
  // ============================================
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // ============================================
  // CALCULATE PROGRESS
  // ============================================
  const answeredCount = Object.keys(submitted).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  // ============================================
  // RENDER LOADING
  // ============================================
  if (loading) {
    return (
      <div className="questions-view">
        <div className="questions-loading">
          <div className="loading-spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER ERROR
  // ============================================
  if (error || questions.length === 0) {
    return (
      <div className="questions-view">
        <div className="questions-error">
          <h2>⚠️ No Questions</h2>
          <p>{error || 'No questions found for this day'}</p>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = submitted[currentQuestionIndex];

  // ============================================
  // RENDER QUESTIONS VIEW
  // ============================================
  return (
    <div className="questions-view">
      <div className="questions-header">
        <div className="questions-title">
          <h1>📋 Daily Questions - Day {dayNumber}</h1>
          <p>Answer all questions to complete the day</p>
        </div>
        <button onClick={onClose} className="close-button">✕</button>
      </div>

      <div className="questions-progress">
        <div className="progress-info">
          <div className="stat">
            <span className="label">Progress</span>
            <span className="value">{answeredCount}/{questions.length}</span>
          </div>
          <div className="stat">
            <span className="label">Points</span>
            <span className="value">{points}</span>
          </div>
          <div className="stat">
            <span className="label">Streak</span>
            <span className="value">{streak}🔥</span>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>

      <div className="questions-container">
        <div className="question-card">
          <div className="question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>

          <div className="question-text">
            <h2>{currentQuestion.question || currentQuestion}</h2>
          </div>

          <div className="answer-section">
            <label htmlFor="answer-input">Your Answer:</label>
            <textarea
              id="answer-input"
              className="answer-input"
              placeholder="Type your answer here... (at least 20 characters)"
              value={userAnswers[currentQuestionIndex] || ''}
              onChange={handleAnswerChange}
              disabled={isAnswered}
            />
          </div>

          {isAnswered && (
            <div className="answer-feedback">
              <div className="feedback-title">✓ Answer Submitted</div>
              <div className="feedback-text">
                {(userAnswers[currentQuestionIndex] || '').length > 20
                  ? '+25 Points! 🎉'
                  : 'Try to write more details!'}
              </div>
            </div>
          )}

          <div className="button-group">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="nav-button"
            >
              ← Previous
            </button>

            {!isAnswered ? (
              <button
                onClick={handleSubmitAnswer}
                className="submit-button"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="next-button"
              >
                {currentQuestionIndex === questions.length - 1
                  ? 'Complete Quiz'
                  : 'Next Question'}
              </button>
            )}
          </div>
        </div>

        {/* Answer Reference */}
        {isAnswered && currentQuestion.answer && (
          <div className="answer-reference">
            <h3>📚 Expected Answer:</h3>
            <div className="reference-text">
              {currentQuestion.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionsView;
