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
  const [showQuestionList, setShowQuestionList] = useState(true); // Default open for easier navigation
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  // Multiselect: Set of topic names. Empty = show all topics (day's topics).
  const [selectedTopics, setSelectedTopics] = useState(new Set());

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
          
          // Extract paths from topics and load questions with topic info
          const topicQuestionsMap = new Map(); // Track questions by topic to avoid duplicates
          const loadedPaths = new Map(); // Track which paths we've already loaded to avoid loading same file multiple times
          
          console.log(`📅 Day ${dayNumber} has ${day.topics.length} topics`);
          console.log(`📋 Topics for Day ${dayNumber}:`, day.topics.map(t => `${t.name} (${t.path})`));
          
          // Helper: question count per day by topic type. Must match server progression.
          // Progressive logic: Day 1 = Q1..Qn, Day 2 = Q(n+1)..Q(2n), etc. (see server selectQuestionsForDay)
          // Keep counts FIXED so progression is strict. Align with scripts/validate-schedule.js and scripts/verify-question-progression.js
          function getQuestionCountForTopic(topicName) {
            const nameLower = topicName.toLowerCase();
            if (nameLower.includes('logic') || nameLower === 'logic questions') return 3;
            if (nameLower.includes('leetcode') || nameLower === 'leetcode') return 2;  // fixed for strict progression (schedule: 1-3)
            if (nameLower.includes('data structures') || nameLower === 'data structures') return 5;
            return 12;  // full topics (JavaScript, React, Node.js, etc.)
          }
          
          for (const topic of day.topics) {
            // Extract topic name and path (declare outside try for catch block access)
            // Topics can have: topic.name, topic.text, or topic.path
            const topicName = topic.name || topic.text?.replace(/\*\*/g, '').split('(')[0].trim() || 'Unknown Topic';
            const topicPath = topic.path || (() => {
              const pathMatch = topic.text?.match(/Path:\s*`([^`]+)`/);
              return pathMatch ? pathMatch[1] : null;
            })();
            
            try {
              if (topicPath) {
                // Check if we've already loaded questions from this path
                if (loadedPaths.has(topicPath)) {
                  console.log(`⚠️ Topic "${topicName}" uses same path as "${loadedPaths.get(topicPath)}": ${topicPath}`);
                  console.log(`   Reusing ${loadedPaths.get(topicPath)} questions for this topic`);
                  // Reuse questions from the same path but tag them with current topic name
                  const existingQuestions = Array.from(topicQuestionsMap.values())
                    .filter(q => q.topicPath === topicPath);
                  
                  existingQuestions.forEach(existingQ => {
                    // Add this topic as an additional tag (don't replace, but note it's also in this topic)
                    const key = existingQ.question.trim().toLowerCase();
                    if (topicQuestionsMap.has(key)) {
                      const q = topicQuestionsMap.get(key);
                      // Keep the original topic name, but we could add a note
                      console.log(`   Question "${q.question.substring(0, 40)}..." already loaded from "${q.topicName}"`);
                    }
                  });
                  continue; // Skip loading the same file again
                }
                
                // Determine question count for this topic
                const questionCount = getQuestionCountForTopic(topicName);
                
                console.log(`📥 Fetching questions from topic "${topicName}":`, topicPath);
                console.log(`   Day: ${dayNumber}, Count: ${questionCount}`);
                
                // Fetch questions from this topic with day number and count
                const questionsResponse = await axios.get(`/api/questions`, {
                  params: { 
                    path: topicPath,
                    dayNumber: dayNumber, // Make sure dayNumber is passed
                    topicName: topicName,
                    count: questionCount
                  }
                });
                
                console.log(`📥 Response for "${topicName}":`, {
                  success: questionsResponse.data.success,
                  count: questionsResponse.data.count,
                  totalAvailable: questionsResponse.data.totalAvailable,
                  dayNumber: questionsResponse.data.dayNumber
                });
                
                if (questionsResponse.data.success) {
                  const questions = questionsResponse.data.questions || [];
                  
                  if (questions.length === 0) {
                    console.warn(`⚠️ Topic "${topicName}" returned 0 questions from ${topicPath}`);
                    console.warn(`   Total available: ${questionsResponse.data.totalAvailable || 0}`);
                    console.warn(`   Day number: ${dayNumber}, Count requested: ${questionCount}`);
                    // Don't mark as loaded if we got 0 questions - might be a parsing issue
                    // Continue to next topic
                    continue;
                  }
                  
                  loadedPaths.set(topicPath, topicName); // Mark this path as loaded
                  
                  const topicQuestions = questions.map((q, idx) => ({
                    ...q,
                    topicName: topicName,
                    topicPath: topicPath,
                    questionId: `${topicName}-${dayNumber}-${idx}`, // Unique ID: topic-day-index
                    originalIndex: idx
                  }));
                  
                  console.log(`✅ Loaded ${topicQuestions.length} questions from ${topicName} (${topicPath})`);
                  if (questionsResponse.data.totalAvailable && questionsResponse.data.totalAvailable > topicQuestions.length) {
                    console.log(`   (${questionsResponse.data.totalAvailable} total available, showing ${topicQuestions.length} for day ${dayNumber})`);
                  }
                  
                  // Add to map to avoid duplicates (keyed by question text)
                  let addedCount = 0;
                  let skippedCount = 0;
                  topicQuestions.forEach(q => {
                    const key = q.question.trim().toLowerCase();
                    if (!topicQuestionsMap.has(key)) {
                      topicQuestionsMap.set(key, q);
                      addedCount++;
                    } else {
                      skippedCount++;
                      console.log(`   ⚠️ Skipping duplicate question: "${q.question.substring(0, 50)}..."`);
                    }
                  });
                  console.log(`   Added: ${addedCount}, Skipped duplicates: ${skippedCount}`);
                } else {
                  console.error(`❌ Failed to load questions for "${topicName}":`, questionsResponse.data.message);
                }
              } else {
                console.log(`⚠️ Topic "${topicName}" has no path, skipping questions`);
              }
            } catch (err) {
              console.error(`❌ Error fetching questions for topic "${topicName}":`, err);
              if (err.response) {
                console.error(`   Status: ${err.response.status}`);
                console.error(`   Message: ${err.response.data?.message || err.message}`);
                console.error(`   Path attempted: ${topicPath}`);
              } else {
                console.error(`   Error: ${err.message}`);
                console.error(`   Path attempted: ${topicPath}`);
              }
            }
          }
          
          console.log(`📊 Summary for Day ${dayNumber}:`);
          console.log(`   - ${topicQuestionsMap.size} unique questions`);
          console.log(`   - ${loadedPaths.size} unique question files`);
          console.log(`   - Topics covered:`, Array.from(new Set(Array.from(topicQuestionsMap.values()).map(q => q.topicName))));
          
          // Convert map to array
          allQuestions.push(...Array.from(topicQuestionsMap.values()));
          
          console.log(`✅ Total questions loaded for Day ${dayNumber}: ${allQuestions.length}`);
          
          // Log question distribution by topic
          const questionsByTopic = {};
          allQuestions.forEach(q => {
            const topic = q.topicName || 'Unknown';
            questionsByTopic[topic] = (questionsByTopic[topic] || 0) + 1;
          });
          console.log(`📈 Questions by topic:`, questionsByTopic);
          
          if (allQuestions.length === 0) {
            setError('No questions found. Make sure the markdown files have the correct format.');
          } else {
            setQuestions(allQuestions);
            setError(null);
            
            // Initialize expanded topics - expand all by default
            const topicsSet = new Set();
            allQuestions.forEach(q => {
              if (q.topicName) {
                topicsSet.add(q.topicName);
              }
            });
            setExpandedTopics(topicsSet);
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
  // GET FILTERED QUESTIONS (by multiselect topics)
  // ============================================
  const getFilteredQuestions = () => {
    if (!selectedTopics || selectedTopics.size === 0) {
      return questions;
    }
    return questions.filter(q => q.topicName && selectedTopics.has(q.topicName));
  };

  // Unique topics for this day (from loaded questions)
  const dayTopics = React.useMemo(() => {
    const set = new Set();
    questions.forEach(q => { if (q.topicName) set.add(q.topicName); });
    return Array.from(set).sort();
  }, [questions]);

  const toggleTopic = (topicName) => {
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicName)) next.delete(topicName);
      else next.add(topicName);
      return next;
    });
  };

  const selectAllTopics = () => setSelectedTopics(new Set(dayTopics));
  const clearAllTopics = () => setSelectedTopics(new Set());
  const isTopicSelected = (name) => selectedTopics.size === 0 || selectedTopics.has(name);
  const isFilterActive = selectedTopics.size > 0;

  // ============================================
  // NEXT QUESTION (within filtered set)
  // ============================================
  const handleNextQuestion = () => {
    const filtered = getFilteredQuestions();
    const currentInFiltered = filtered.findIndex(q => {
      const originalIndex = questions.indexOf(q);
      return originalIndex === currentQuestionIndex;
    });
    
    if (currentInFiltered < filtered.length - 1) {
      // Next question in filtered set
      const nextQuestion = filtered[currentInFiltered + 1];
      const nextIndex = questions.indexOf(nextQuestion);
      setCurrentQuestionIndex(nextIndex);
    } else if (isFilterActive && filtered.length > 0) {
      // Reached end of filtered set
      alert(`🎉 All questions in selected topic(s) completed!\n\nPoints: ${points}\nStreak: ${streak}`);
    } else {
      // Quiz complete
      alert(`🎉 Quiz Complete!\n\nPoints: ${points}\nStreak: ${streak}`);
      onClose();
    }
  };

  // ============================================
  // PREVIOUS QUESTION (within filtered set)
  // ============================================
  const handlePrevQuestion = () => {
    const filtered = getFilteredQuestions();
    const currentInFiltered = filtered.findIndex(q => {
      const originalIndex = questions.indexOf(q);
      return originalIndex === currentQuestionIndex;
    });
    
    if (currentInFiltered > 0) {
      // Previous question in filtered set
      const prevQuestion = filtered[currentInFiltered - 1];
      const prevIndex = questions.indexOf(prevQuestion);
      setCurrentQuestionIndex(prevIndex);
    } else if (currentQuestionIndex > 0) {
      // Go to previous question overall (even if different topic)
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
            {progress > 5 ? `${progress}%` : ''}
          </div>
          {progress <= 5 && (
            <div className="progress-text-outside">
              {progress}%
            </div>
          )}
        </div>
      </div>

      {/* Topics for Day X – multiselect (show questions from selected topics only) */}
      <div className="quick-navigation topics-multiselect-section">
        <div className="topics-multiselect-header">
          <label className="topics-label">📚 Topics for Day {dayNumber}</label>
          <span className="topics-hint">
            {selectedTopics.size === 0
              ? `Showing all ${questions.length} questions`
              : `Showing ${getFilteredQuestions().length} of ${questions.length} (${selectedTopics.size} topic(s) selected)`}
          </span>
          <div className="topics-actions">
            <button type="button" className="topics-action-btn" onClick={selectAllTopics}>
              Select all
            </button>
            <button type="button" className="topics-action-btn" onClick={clearAllTopics}>
              Clear
            </button>
          </div>
        </div>
        <div className="topics-chips">
          {dayTopics.map(topicName => {
            const count = questions.filter(q => q.topicName === topicName).length;
            const selected = isTopicSelected(topicName);
            return (
              <button
                key={topicName}
                type="button"
                className={`topic-chip ${selected ? 'selected' : ''}`}
                onClick={() => toggleTopic(topicName)}
                title={`${selected ? 'Hide' : 'Show'} questions from ${topicName} (${count})`}
              >
                <span className="topic-chip-check">{selected ? '✓' : ''}</span>
                <span className="topic-chip-name">{topicName}</span>
                <span className="topic-chip-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Jump to question: by topic or by number */}
      <div className="quick-navigation jump-section">
        <div className="nav-controls">
          <div className="nav-control-group">
            <label htmlFor="question-jump-by-number">Jump by question #</label>
            <select
              id="question-jump-by-number"
              className="question-jump"
              value={currentQuestionIndex + 1}
              onChange={(e) => {
                const questionNum = parseInt(e.target.value);
                if (questionNum >= 1 && questionNum <= questions.length) {
                  setCurrentQuestionIndex(questionNum - 1);
                  document.querySelector('.question-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {questions.map((q, idx) => (
                <option key={idx} value={idx + 1}>
                  #{idx + 1} — {(typeof q.question === 'string' ? q.question : q.question || String(q)).substring(0, 45)}
                  {(typeof q.question === 'string' ? q.question : q.question || String(q)).length > 45 ? '…' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="nav-control-group">
            <label htmlFor="question-jump-by-topic">Jump by topic</label>
            <select
              id="question-jump-by-topic"
              className="question-jump question-jump-by-topic"
              value={currentQuestionIndex}
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                if (!isNaN(idx) && idx >= 0 && idx < questions.length) {
                  setCurrentQuestionIndex(idx);
                  document.querySelector('.question-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {(() => {
                const byTopic = {};
                questions.forEach((q, idx) => {
                  const t = q.topicName || 'Other';
                  if (!byTopic[t]) byTopic[t] = [];
                  byTopic[t].push({ q, idx });
                });
                const entries = Object.entries(byTopic).sort((a, b) => a[0].localeCompare(b[0]));
                return entries.flatMap(([topic, items]) => [
                  <optgroup key={topic} label={topic}>
                    {items.map(({ q, idx }) => (
                      <option key={idx} value={idx}>
                        Q{idx + 1}: {(typeof q.question === 'string' ? q.question : q.question || String(q)).substring(0, 40)}
                        {(typeof q.question === 'string' ? q.question : q.question || String(q)).length > 40 ? '…' : ''}
                      </option>
                    ))}
                  </optgroup>
                ]);
              })()}
            </select>
          </div>
          <div className="nav-control-group current-topic-wrap">
            <label>Current</label>
            <div className="current-topic-badge">
              {currentQuestion.topicName || 'Unknown'} · Q{currentQuestionIndex + 1}
            </div>
          </div>
        </div>
      </div>

      <div className={`questions-container ${showQuestionList ? 'has-navigator-open' : ''}`}>
        {/* Question Navigator Sidebar */}
        <div className={`question-navigator ${showQuestionList ? 'open' : ''}`}>
          <button 
            className="toggle-navigator"
            onClick={() => setShowQuestionList(!showQuestionList)}
          >
            {showQuestionList ? '✕' : '📋'} Question List
          </button>
          
          {showQuestionList && (() => {
            // Group questions by topic
            const questionsByTopic = {};
            questions.forEach((q, idx) => {
              const topic = q.topicName || 'Other';
              if (!questionsByTopic[topic]) {
                questionsByTopic[topic] = [];
              }
              questionsByTopic[topic].push({ ...q, globalIndex: idx });
            });
            
            // Filter by search query
            const filteredTopics = Object.keys(questionsByTopic).filter(topic => {
              if (!searchQuery) return true;
              const query = searchQuery.toLowerCase();
              return topic.toLowerCase().includes(query) ||
                     questionsByTopic[topic].some(q => 
                       (typeof q.question === 'string' ? q.question : String(q.question || '')).toLowerCase().includes(query)
                     );
            });
            
            // Calculate progress per topic
            const getTopicProgress = (topicQuestions) => {
              const answered = topicQuestions.filter(q => submitted[q.globalIndex]).length;
              return { answered, total: topicQuestions.length, percentage: Math.round((answered / topicQuestions.length) * 100) };
            };
            
            return (
              <div className="question-list">
                <div className="question-list-header">
                  <h3>Questions ({questions.length})</h3>
                  <input
                    type="text"
                    className="question-search"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="question-list-items">
                  {filteredTopics.map(topic => {
                    const topicQuestions = questionsByTopic[topic];
                    const isExpanded = expandedTopics.has(topic);
                    const progress = getTopicProgress(topicQuestions);
                    
                    return (
                      <div key={topic} className="topic-section">
                        <div 
                          className="topic-header"
                          onClick={() => {
                            const newExpanded = new Set(expandedTopics);
                            if (isExpanded) {
                              newExpanded.delete(topic);
                            } else {
                              newExpanded.add(topic);
                            }
                            setExpandedTopics(newExpanded);
                          }}
                        >
                          <span className="topic-toggle">{isExpanded ? '▼' : '▶'}</span>
                          <span className="topic-name">{topic}</span>
                          <span className="topic-count">({progress.answered}/{progress.total})</span>
                          <div className="topic-progress-bar">
                            <div 
                              className="topic-progress-fill" 
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="topic-questions">
                            {topicQuestions.map((q) => {
                              const idx = q.globalIndex;
                              const isCurrent = idx === currentQuestionIndex;
                              const isAnswered = submitted[idx];
                              
                              return (
                                <div
                                  key={q.questionId || idx}
                                  className={`question-list-item ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                                  onClick={() => {
                                    setCurrentQuestionIndex(idx);
                                    // Scroll to top of question card
                                    document.querySelector('.question-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }}
                                >
                                  <div className="question-item-number">{idx + 1}</div>
                                  <div className="question-item-content">
                                    <div className="question-item-text">
                                      {(typeof q.question === 'string' ? q.question : q.question || String(q)).substring(0, 50)}
                                      {(typeof q.question === 'string' ? q.question : q.question || String(q)).length > 50 ? '...' : ''}
                                    </div>
                                  </div>
                                  {isAnswered && <span className="check-mark">✓</span>}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="question-card">
          <div className="question-header-info">
            <div className="question-number">
              Question {currentQuestionIndex + 1} of {questions.length}
              {isFilterActive && (
                <span className="filtered-count"> · {getFilteredQuestions().length} in selected topic(s)</span>
              )}
            </div>
            {currentQuestion.topicName && (
              <div className="question-topic-badge">
                📚 {currentQuestion.topicName}
              </div>
            )}
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
