/* ============================================
   MAIN APP COMPONENT - REACT FRONTEND
   ============================================
   
   INTERVIEW PREP: This file demonstrates:
   - React functional components
   - useState hook for state management
   - useEffect hook for side effects
   - API calls with axios
   - Component composition
   - Event handling
   - Conditional rendering
   
   HOW TO BUILD FROM SCRATCH IN INTERVIEW:
   1. npx create-react-app client
   2. cd client
   3. npm install axios
   4. Create components folder
   5. Build App.js with state and API call
   6. Create child components
   7. Add event handlers
   8. Style with CSS
*/

// ============================================
// STEP 1: IMPORT REACT AND DEPENDENCIES
// ============================================
// import: ES6 module syntax (React uses ES6 modules)
// React: The React library (needed for JSX)
// useState, useEffect: React Hooks (functions that add features to components)
// Interview: "I use functional components with hooks - modern React approach"

import React, { useState, useEffect, useCallback } from 'react';
// React: Required for JSX to work
// useState: Hook for managing component state
// useEffect: Hook for side effects (API calls, subscriptions, etc.)

// Import CSS file for styling
import './App.css';

// Import child components (we'll build these)
// These are custom components we create
// Interview: "Component composition - breaking UI into reusable pieces"

import Sidebar from './components/Sidebar';
// Sidebar: Shows progress and achievements

import SlideContainer from './components/SlideContainer';
// SlideContainer: Displays the current slide

import Navigation from './components/Navigation';
// Navigation: Previous/Next buttons

import KeyboardHint from './components/KeyboardHint';
// KeyboardHint: Shows keyboard shortcuts

import PointsPopup from './components/PointsPopup';
// PointsPopup: Shows notification when points earned

import RoadmapView from './components/RoadmapView';
// RoadmapView: Shows all training days in grid

import DayView from './components/DayView';
// DayView: Shows specific day's checklist

// Import axios for HTTP requests
// axios: Library for making API calls (alternative to fetch)
// Interview: "I use axios because it has better error handling and interceptors"

import axios from 'axios';

// ============================================
// STEP 2: CREATE APP COMPONENT
// ============================================
// Function component: Returns JSX (JavaScript XML)
// Interview: "Functional components are simpler and preferred over class components"

function App() {
  // ============================================
  // STEP 3: DECLARE STATE WITH useState
  // ============================================
  // useState: Hook that adds state to functional components
  // Returns array: [currentValue, setterFunction]
  // Interview: "useState returns a stateful value and function to update it"
  
  // State 1: Store all slides data from API
  // useState([]): Initialize with empty array
  // slidesData: Current value (array of slide objects)
  // setSlidesData: Function to update slidesData
  // Interview: "I initialize with empty array - will be filled by API call"
  
  const [slidesData, setSlidesData] = useState([]);
  // When setSlidesData is called, component re-renders with new data
  
  // State 2: Track which slide is currently displayed
  // useState(0): Initialize with 0 (first slide)
  // currentSlide: Current index (number)
  // setCurrentSlide: Function to change slide
  // Interview: "I use index instead of slide object - simpler and more efficient"
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State 3: Track user's game progress
  // useState({}): Initialize with object
  // gameState: Object containing points, completed slides, achievements
  // Interview: "I group related state together - better than separate useState calls"
  
  const [gameState, setGameState] = useState({
    points: 0, // Total points earned
    completedSlides: new Set(), // Set of completed slide indices
    // Set: Collection of unique values (no duplicates)
    // Interview: "I use Set because checking membership is O(1) vs Array's O(n)"
    achievements: new Set() // Set of unlocked achievement IDs
  });
  
  // State 4: Loading state
  // true: Show loading spinner, false: Show content
  // Interview: "Loading state improves UX - user knows something is happening"
  
  const [loading, setLoading] = useState(true);
  // Start with true because we're fetching data on mount
  
  // State 5: Error state
  // null: No error, string: Error message to display
  // Interview: "Error state allows graceful error handling"
  
  const [error, setError] = useState(null);
  // null means no error initially
  
  // State 6: Points popup visibility
  // false: Hidden, true: Show popup
  // Interview: "I separate popup state for better control"
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupPoints, setPopupPoints] = useState(0);
  // popupPoints: How many points to show in popup
  
  // View state: 'slideshow' or 'roadmap' or 'day'
  const [currentView, setCurrentView] = useState('roadmap');
  const [selectedDay, setSelectedDay] = useState(null);

  // ============================================
  // STEP 4: FETCH DATA WITH useEffect
  // ============================================
  // useEffect: Hook for side effects (API calls, subscriptions, DOM manipulation)
  // Runs after component renders
  // Interview: "useEffect replaces componentDidMount, componentDidUpdate, componentWillUnmount"
  
  useEffect(() => {
    // This function fetches slides from backend API
    // async: Allows use of await keyword
    // Interview: "async/await is cleaner than .then() chains"
    
    async function fetchSlides() {
      // try-catch: Error handling
      // Interview: "I wrap API calls in try-catch to handle network errors"
      
      try {
        // Set loading to true - show spinner
        setLoading(true);
        // This triggers re-render with loading state
        
        // axios.get(): Makes HTTP GET request
        // '/api/slides': API endpoint (proxy in package.json redirects to localhost:5000)
        // await: Wait for promise to resolve
        // Interview: "await pauses execution until promise resolves"
        
        const response = await axios.get('/api/slides');
        // response: Object containing status, data, headers, etc.
        // response.data: The JSON response body
        
        // Check if request was successful
        // response.data.success: Boolean from our API
        if (response.data.success) {
          // Update state with slides data
          // setSlidesData: Triggers re-render with new data
          setSlidesData(response.data.slides);
          // slidesData is now array of slide objects
          
          // Clear any previous errors
          setError(null);
        } else {
          // API returned success: false
          setError('Failed to load slides');
        }
      } catch (err) {
        // If request fails (network error, server down, etc.)
        // err: Error object with message, stack, etc.
        
        // Log error for debugging
        console.error('Error fetching slides:', err);
        // console.error: Logs to browser console (red text)
        
        // Set error message for user
        setError('Failed to load slides. Make sure the server is running on port 5000.');
      } finally {
        // finally: Always runs, whether success or error
        // Stop loading spinner
        setLoading(false);
      }
    }
    
    // Call the function immediately
    fetchSlides();
    // This runs once when component mounts
    
    // Load saved progress from browser storage
    loadProgress();
    // Defined below
  }, []); // Empty dependency array [] means run only once on mount
  // Interview: "Empty array = componentDidMount behavior (runs once)"

  // ============================================
  // STEP 5: LOAD SAVED PROGRESS
  // ============================================
  // localStorage: Browser storage that persists across sessions
  // Interview: "localStorage is synchronous, sessionStorage is same-tab only"
  
  function loadProgress() {
    // localStorage.getItem(): Retrieve value by key
    // Returns string or null
    const saved = localStorage.getItem('interviewTrainingProgress');
    // 'interviewTrainingProgress': Key we use to store progress
    
    // If data exists
    if (saved) {
      try {
        // JSON.parse(): Convert JSON string to JavaScript object
        // localStorage only stores strings
        const data = JSON.parse(saved);
        // data is now object with points, completedSlides, achievements
        
        // Update state with saved data
        setGameState({
          points: data.points || 0, // Use saved value or default to 0
          // || 0: If data.points is undefined/null, use 0
          // Interview: "I use || for default values, ?? (nullish coalescing) is also valid"
          
          completedSlides: new Set(data.completedSlides || []),
          // Convert array back to Set
          // Set constructor accepts iterable (array)
          
          achievements: new Set(data.achievements || [])
        });
      } catch (err) {
        // If JSON.parse fails (corrupted data)
        console.error('Error loading progress:', err);
        // Continue with default state
      }
    }
    // If no saved data, state remains at initial values
  }

  // ============================================
  // STEP 6: SAVE PROGRESS WHEN IT CHANGES
  // ============================================
  // useEffect with gameState dependency: Runs whenever gameState changes
  // Interview: "This is like componentDidUpdate but only for specific state"
  
  useEffect(() => {
    // localStorage.setItem(): Store value by key
    // JSON.stringify(): Convert JavaScript object to JSON string
    // Set cannot be stringified directly, so convert to array first
    // Interview: "I convert Set to Array because JSON doesn't support Set"
    
    localStorage.setItem('interviewTrainingProgress', JSON.stringify({
      points: gameState.points,
      completedSlides: Array.from(gameState.completedSlides),
      // Array.from(): Convert Set to Array
      achievements: Array.from(gameState.achievements)
    }));
    // This saves progress whenever gameState changes
  }, [gameState]); // Dependency: run when gameState changes
  // Interview: "Dependency array ensures effect runs when dependencies change"

  // ============================================
  // STEP 7: NAVIGATION FUNCTION
  // ============================================
  // Function to change current slide
  // direction: -1 for previous, 1 for next
  // Interview: "I pass functions as props to child components"
  
  const changeSlide = useCallback((direction) => {
    // Calculate new index
    const newIndex = currentSlide + direction;
    // direction is -1 or 1
    
    // Validate: Check if new index is within bounds
    // >= 0: Not negative
    // < slidesData.length: Not beyond last slide
    // Interview: "I validate before updating state to prevent errors"
    
    if (newIndex >= 0 && newIndex < slidesData.length) {
      // Update current slide index
      setCurrentSlide(newIndex);
      // This triggers re-render with new slide
    }
    // If invalid, do nothing (button will be disabled)
  }, [currentSlide, slidesData.length]);

  // ============================================
  // STEP 8: MARK SLIDE AS COMPLETE
  // ============================================
  // Function called when user clicks "Mark as Complete"
  // index: The slide index to mark complete
  // Interview: "I use functional setState to ensure I have latest state"
  
  const markComplete = useCallback((index) => {
    // Check if already completed
    // Set.has(): Check if value exists in Set (O(1) operation)
    // Interview: "Set.has() is faster than Array.includes() for large sets"
    
    if (gameState.completedSlides.has(index)) return;
    // return: Exit function early (already completed)
    
    // Update state using functional form
    // prev: Previous state value
    // Interview: "Functional setState ensures I work with latest state, not stale closure"
    
    setGameState(prev => {
      // Create new Set from previous Set
      // Spread operator: Copy all values from prev Set
      const newCompleted = new Set(prev.completedSlides);
      // new Set(): Creates new Set instance
      
      // Add current slide index to Set
      newCompleted.add(index);
      // Set.add(): Adds value if not already present
      
      // Show points popup
      setPopupPoints(10); // Award 10 points
      setShowPopup(true); // Show popup
      // setTimeout: Run function after delay
      // 2300: Milliseconds (2.3 seconds)
      setTimeout(() => setShowPopup(false), 2300);
      // Hide popup after animation
      
      // Return new state object
      // Spread operator: Copy all properties from prev
      // Interview: "I create new object to trigger re-render (React compares by reference)"
      
      return {
        ...prev, // Keep existing state (points, achievements)
        points: prev.points + 10, // Add 10 points
        completedSlides: newCompleted // Update with new Set
      };
      // React sees new object reference and re-renders
    });
  }, [gameState.completedSlides]);

  // ============================================
  // STEP 9: UNLOCK ACHIEVEMENT
  // ============================================
  // Function called when achievement condition is met
  // achievementId: Unique identifier for achievement
  // points: Bonus points to award
  // Interview: "This is called from Sidebar component via prop"
  
  const unlockAchievement = (achievementId, points) => {
    // Update state with new achievement
    setGameState(prev => {
      // Create new Set with previous achievements
      const newAchievements = new Set(prev.achievements);
      
      // Add new achievement ID
      newAchievements.add(achievementId);
      
      // Show achievement popup
      setPopupPoints(points);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2300);
      
      // Return updated state
      return {
        ...prev,
        achievements: newAchievements, // Updated Set
        points: prev.points + points // Add bonus points
      };
    });
  };

  // ============================================
  // STEP 10: VIEW SWITCHING HANDLERS
  // ============================================
  // Functions to switch between different views
  // Interview: "I use state to control which view is displayed"
  
  const handleSelectDay = (dayNumber) => {
    setSelectedDay(dayNumber);
    setCurrentView('day');
  };

  const handleBackToRoadmap = () => {
    setSelectedDay(null);
    setCurrentView('roadmap');
  };

  const handleViewSlideshow = () => {
    setCurrentView('slideshow');
  };

  // ============================================
  // STEP 11: KEYBOARD SHORTCUTS
  // ============================================
  // useEffect: Add event listener for keyboard
  // Interview: "I add event listeners in useEffect and clean up in return"
  
  useEffect(() => {
    // Function to handle keydown events
    function handleKeyDown(e) {
      // e: Event object
      // e.key: The key that was pressed
      // e.target: The element that received the event
      
      // Check if user is typing in an input field (input, textarea, or contentEditable)
      // If so, don't intercept keyboard shortcuts - let them type normally
      const isTyping = e.target.tagName === 'INPUT' || 
                       e.target.tagName === 'TEXTAREA' || 
                       e.target.isContentEditable;
      
      // If user is typing, skip keyboard shortcuts
      if (isTyping) {
        return; // Let the input handle the key normally
      }
      
      // Left arrow - go to previous slide
      if (e.key === 'ArrowLeft') {
        changeSlide(-1); // Call navigation function
      }
      // Right arrow - go to next slide
      else if (e.key === 'ArrowRight') {
        changeSlide(1);
      }
      // Space bar - mark complete (only when NOT typing in input)
      else if (e.key === ' ') {
        e.preventDefault(); // Prevent page scroll
        markComplete(currentSlide); // Mark current slide
      }
    }

    // Add event listener to document
    // 'keydown': Event type
    // handleKeyDown: Function to call when event fires
    document.addEventListener('keydown', handleKeyDown);
    // Interview: "I add listener to document to catch all keyboard events"

    // Cleanup function: Runs when component unmounts or dependencies change
    // Interview: "Cleanup prevents memory leaks - remove listeners when done"
    
    return () => {
      // Remove event listener
      document.removeEventListener('keydown', handleKeyDown);
      // Must use same function reference (handleKeyDown)
    };
  }, [currentSlide, slidesData.length, changeSlide, markComplete]); // Re-run if currentSlide changes
  // Interview: "Dependencies ensure handler has latest values"

  // ============================================
  // STEP 12: CONDITIONAL RENDERING - LOADING
  // ============================================
  // If loading, show spinner instead of content
  // Interview: "Early return pattern - simplifies component logic"
  // Note: Only show loading for slideshow, not roadmap/day views
  
  if (loading && currentView === 'slideshow') {
    // Return JSX for loading state
    return (
      <div className="app-loading">
        {/* JSX comment syntax */}
        <div className="loading-spinner"></div>
        {/* Spinner is styled with CSS animation */}
        <p>Loading slides...</p>
      </div>
    );
    // This JSX is returned immediately, rest of function doesn't run
  }

  // ============================================
  // STEP 13: CONDITIONAL RENDERING - ERROR
  // ============================================
  // If error, show error message
  // Interview: "Error boundaries are better for production, but this works for demo"
  // Note: Only show error for slideshow, not roadmap/day views
  
  if (error && currentView === 'slideshow') {
    return (
      <div className="app-error">
        <h1>⚠️ Error</h1>
        {/* Display error message */}
        <p>{error}</p>
        {/* Inline style object */}
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Make sure the backend server is running:<br />
          {/* <br />: Line break */}
          <code>cd server && npm start</code>
          {/* <code>: Monospace font for code */}
        </p>
      </div>
    );
  }

  // ============================================
  // STEP 14: CONDITIONAL RENDERING - VIEWS
  // ============================================
  // Render different views based on currentView state
  // Interview: "Conditional rendering allows switching between different UI states"
  
  // Render Roadmap View
  if (currentView === 'roadmap') {
    return (
      <div className="app">
        <div className="view-switcher">
          <button onClick={handleViewSlideshow} className="view-button">
            📚 View Interview Questions
          </button>
        </div>
        <RoadmapView onSelectDay={handleSelectDay} />
      </div>
    );
  }

  // Render Day View
  if (currentView === 'day') {
    return (
      <div className="app">
        <div className="view-switcher">
          <button onClick={handleBackToRoadmap} className="view-button">
            📋 Back to Roadmap
          </button>
          <button onClick={handleViewSlideshow} className="view-button">
            📚 View Interview Questions
          </button>
        </div>
        <DayView dayNumber={selectedDay} onBack={handleBackToRoadmap} />
      </div>
    );
  }

  // ============================================
  // STEP 15: RENDER SLIDESHOW VIEW
  // ============================================
  // Return JSX (JavaScript XML)
  // Interview: "JSX is syntactic sugar for React.createElement()"
  
  // Render Slideshow View (original)
  return (
    // <div>: HTML div element
    // className: React's prop for CSS class (not 'class' - that's reserved)
    <div className="app">
      <div className="view-switcher">
        <button onClick={() => setCurrentView('roadmap')} className="view-button">
          📋 Training Roadmap
        </button>
      </div>
      <div className="app-container">
        {/* Sidebar Component */}
        {/* Props: Data passed from parent to child */}
        {/* Interview: "Props flow down, events flow up (unidirectional data flow)" */}
        
        <Sidebar
          gameState={gameState} // Pass current game state
          totalSlides={slidesData.length} // Pass total count
          onUnlockAchievement={unlockAchievement} // Pass function
          // Interview: "I pass functions as props for child-to-parent communication"
        />
        
        {/* Slide Container Component */}
        <SlideContainer
          slides={slidesData} // All slides
          currentSlide={currentSlide} // Current index
          gameState={gameState} // Progress state
          onMarkComplete={markComplete} // Callback function
        />
      </div>
      
      {/* Navigation Component */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slidesData.length}
        onNavigate={changeSlide} // Pass navigation function
      />
      
      {/* Keyboard Hint Component */}
      <KeyboardHint />
      {/* No props needed - static component */}
      
      {/* Conditional Rendering: Show popup if showPopup is true */}
      {/* &&: Logical AND - if left is true, render right */}
      {/* Interview: "&& is common pattern for conditional rendering" */}
      
      {showPopup && (
        <PointsPopup 
          points={popupPoints} 
          onClose={() => setShowPopup(false)} // Inline arrow function
          // () => {}: Arrow function that calls setShowPopup
        />
      )}
    </div>
  );
}

// ============================================
// STEP 14: EXPORT COMPONENT
// ============================================
// export default: Makes component available for import
// Interview: "default export allows import without curly braces"

export default App;

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "I use functional components with hooks - modern React approach"
// 2. "useState manages component state - each state variable is independent"
// 3. "useEffect handles side effects - API calls, subscriptions, DOM manipulation"
// 4. "I use async/await for API calls - cleaner than promise chains"
// 5. "I validate state updates before applying them"
// 6. "I use functional setState to ensure I have latest state"
// 7. "I clean up event listeners in useEffect return to prevent memory leaks"
// 8. "I use conditional rendering for loading and error states"
// 9. "I pass functions as props for child-to-parent communication"
// 10. "I use localStorage for persistence - in production, I'd use a backend API"
