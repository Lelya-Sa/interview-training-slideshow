/* ============================================
   SIDEBAR COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Props (receiving data from parent)
   - useEffect hook for side effects
   - Conditional logic
   - Array methods (map, forEach)
   - Set operations
   - Progress calculations
   
   HOW TO BUILD IN INTERVIEW:
   1. Create function component
   2. Accept props (gameState, totalSlides, onUnlockAchievement)
   3. Calculate progress percentage
   4. Define achievements array
   5. Check achievements in useEffect
   6. Render stats and achievements
*/

// ============================================
// STEP 1: IMPORT REACT AND HOOKS
// ============================================
// React: Required for JSX
// useEffect: Hook for side effects (checking achievements)
// Interview: "I use useEffect to check achievements whenever gameState changes"

import React, { useEffect, useMemo } from 'react';
// React: The React library
// useEffect: Hook that runs side effects

// Import CSS for styling
import './Sidebar.css';
// './Sidebar.css': Styles specific to this component

// ============================================
// STEP 2: CREATE COMPONENT FUNCTION
// ============================================
// Function component: Receives props as parameters
// Destructuring: Extract specific props from props object
// Interview: "Destructuring makes code cleaner than accessing props.gameState"

function Sidebar({ gameState, totalSlides, onUnlockAchievement }) {
  // gameState: Object with points, completedSlides, achievements
  // totalSlides: Number - total number of slides
  // onUnlockAchievement: Function - callback to unlock achievement (from parent)
  // Interview: "I receive these props from parent App component"

  // ============================================
  // STEP 3: CALCULATE PROGRESS PERCENTAGE
  // ============================================
  // Calculate how much of the course is completed
  // Interview: "I calculate this value to avoid repeating logic in JSX"
  
  // Ternary operator: condition ? valueIfTrue : valueIfFalse
  // totalSlides > 0: Check to avoid division by zero
  // gameState.completedSlides.size: Number of completed slides (Set property)
  // / totalSlides: Divide by total to get fraction
  // * 100: Convert fraction to percentage
  // Interview: "I use ternary to handle edge case (no slides loaded yet)"
  
  const progress = totalSlides > 0 
    ? (gameState.completedSlides.size / totalSlides) * 100 
    : 0;
  // progress: Number between 0 and 100 (percentage)
  // If totalSlides is 0, progress is 0 (prevents division by zero)

  // ============================================
  // STEP 4: DEFINE ACHIEVEMENTS
  // ============================================
  // Array of achievement objects
  // Each achievement has: id, name, description, condition function, points
  // Interview: "I define achievements as data - easy to add/remove"
  
  const achievements = useMemo(() => [
    // Achievement 1: First slide completed
    { 
      id: 'first', // Unique identifier
      name: 'First Steps', // Display name
      desc: 'Complete your first slide', // Description
      condition: () => gameState.completedSlides.size >= 1, // Function that returns true if condition met
      // Arrow function: () => expression
      // gameState.completedSlides.size: Number of completed slides
      // >= 1: At least one slide completed
      points: 50 // Bonus points awarded
    },
    
    // Achievement 2: 5 slides completed
    { 
      id: 'learner', 
      name: 'Quick Learner', 
      desc: 'Complete 5 slides', 
      condition: () => gameState.completedSlides.size >= 5, // At least 5 completed
      points: 100 
    },
    
    // Achievement 3: 10 slides completed
    { 
      id: 'dedicated', 
      name: 'Dedicated Student', 
      desc: 'Complete 10 slides', 
      condition: () => gameState.completedSlides.size >= 10, // At least 10 completed
      points: 200 
    },
    
    // Achievement 4: 100 points earned
    { 
      id: 'points100', 
      name: 'Point Collector', 
      desc: 'Earn 100 points', 
      condition: () => gameState.points >= 100, // At least 100 points
      points: 50 
    },
    
    // Achievement 5: 500 points earned
    { 
      id: 'points500', 
      name: 'Point Master', 
      desc: 'Earn 500 points', 
      condition: () => gameState.points >= 500, // At least 500 points
      points: 100 
    }
  ], [gameState.completedSlides.size, gameState.points]);
  // achievements: Array of 5 achievement objects

  // ============================================
  // STEP 5: CHECK ACHIEVEMENTS IN useEffect
  // ============================================
  // useEffect: Runs side effect (checking achievements)
  // Runs whenever gameState changes
  // Interview: "I check achievements in useEffect to avoid checking on every render"
  
  useEffect(() => {
    // Loop through all achievements
    // forEach: Execute function for each achievement
    // achievement => {}: Arrow function - receives each achievement
    // Interview: "forEach is for side effects, map is for transformations"
    
    achievements.forEach(achievement => {
      // Check if achievement is already unlocked
      // gameState.achievements: Set of unlocked achievement IDs
      // Set.has(): Check if value exists in Set (O(1) operation)
      // Interview: "Set.has() is faster than Array.includes() for large sets"
      
      const unlocked = gameState.achievements.has(achievement.id);
      // unlocked: Boolean - true if achievement already unlocked
      
      // Check if achievement condition is met
      // achievement.condition(): Call the condition function
      // Returns true if condition is met
      const canUnlock = achievement.condition() && !unlocked;
      // canUnlock: Boolean - true if condition met AND not already unlocked
      // &&: Logical AND - both must be true
      // !unlocked: Invert boolean (if unlocked is false, !unlocked is true)
      
      // If achievement can be unlocked, unlock it
      if (canUnlock) {
        // Call parent's function to unlock achievement
        // onUnlockAchievement: Function passed from App component
        // achievement.id: Which achievement to unlock
        // achievement.points: Bonus points to award
        // Interview: "I call parent's function to update parent's state"
        
        onUnlockAchievement(achievement.id, achievement.points);
        // This calls unlockAchievement() in App.js
        // Which updates gameState and awards points
      }
    });
    // Loop ends - checked all achievements
  }, [gameState, onUnlockAchievement, achievements]); 
  // Dependency array: Run effect when gameState or onUnlockAchievement changes
  // gameState: Changes when user completes slides or earns points
  // onUnlockAchievement: Function reference (shouldn't change, but included for completeness)
  // achievements: Array of achievement definitions (constant, but included for ESLint)
  // Interview: "Dependency array ensures effect runs when dependencies change"

  // ============================================
  // STEP 6: RENDER COMPONENT
  // ============================================
  // Return JSX (JavaScript XML)
  // Interview: "JSX is syntactic sugar for React.createElement()"
  
  return (
    // <div>: Container element
    // className: React prop for CSS class
    <div className="sidebar">
      {/* Progress Stats Section */}
      {/* JSX comment syntax */}
      
      <div className="stats">
        {/* <h3>: Heading element */}
        <h3>📊 Your Progress</h3>
        {/* 📊: Emoji (Unicode character) */}
        
        {/* Points Display */}
        <div className="stat-item">
          {/* <span>: Inline container */}
          <span>Points:</span>
          {/* Text content */}
          
          {/* Display points value */}
          {/* {gameState.points}: JavaScript expression in JSX */}
          {/* Interview: "Curly braces {} allow JavaScript expressions in JSX" */}
          
          <span className="stat-value">{gameState.points}</span>
          {/* className="stat-value": CSS class for styling */}
          {/* gameState.points: Current points value */}
        </div>
        
        {/* Completed Slides Display */}
        <div className="stat-item">
          <span>Completed:</span>
          {/* Display number of completed slides */}
          {/* gameState.completedSlides.size: Set property (number of elements) */}
          <span className="stat-value">{gameState.completedSlides.size}</span>
        </div>
        
        {/* Total Slides Display */}
        <div className="stat-item">
          <span>Total:</span>
          {/* Display total number of slides */}
          <span className="stat-value">{totalSlides}</span>
          {/* totalSlides: Prop from parent */}
        </div>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          {/* Inner div that shows progress */}
          {/* style: Inline style object */}
          {/* {{ width: `${progress}%` }}: Object with width property */}
          {/* Template literal: `${progress}%` converts number to string with % */}
          {/* Interview: "I use inline style for dynamic width - CSS variable would also work" */}
          
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
            // width: CSS property, value is percentage string
            // progress: Number (0-100), converted to string with %
          >
            {/* Display percentage text inside bar */}
            {/* Math.round(): Round to nearest integer */}
            {/* progress: Percentage (may be decimal) */}
            {Math.round(progress)}%
            {/* Example: If progress is 45.7, displays "46%" */}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements">
        <h3>🏆 Achievements</h3>
        {/* 🏆: Trophy emoji */}
        
        {/* Achievements List */}
        <div className="achievements-list">
          {/* Map over achievements array */}
          {/* map(): Transform array into array of JSX elements */}
          {/* achievement => {}: Arrow function - receives each achievement */}
          {/* Interview: "map() is for transforming data into JSX" */}
          
          {achievements.map(achievement => {
            // Check if achievement is unlocked
            const unlocked = gameState.achievements.has(achievement.id);
            // unlocked: Boolean
            
            // Check if achievement can be unlocked (condition met but not unlocked yet)
            const canUnlock = achievement.condition() && !unlocked;
            // canUnlock: Boolean
            
            // Return JSX for this achievement
            return (
              // <div>: Container for each achievement
              // key: Required prop for list items (React needs it for reconciliation)
              // achievement.id: Unique identifier
              // Interview: "key prop helps React efficiently update list items"
              
              <div 
                key={achievement.id}
                // className: CSS classes (space-separated)
                // Template literal: `${}` for dynamic class name
                // If unlocked or canUnlock, add 'unlocked' class
                className={`achievement ${unlocked || canUnlock ? 'unlocked' : ''}`}
                // unlocked || canUnlock: Logical OR - if either is true, add 'unlocked' class
                // Ternary: condition ? valueIfTrue : valueIfFalse
                // If true: 'achievement unlocked', if false: 'achievement'
              >
                {/* Achievement Icon */}
                <span className="achievement-icon">
                  {/* Conditional rendering: Show different icon based on state */}
                  {/* Ternary operator: condition ? valueIfTrue : valueIfFalse */}
                  {/* If unlocked or canUnlock, show trophy, else show lock */}
                  {unlocked || canUnlock ? '🏆' : '🔒'}
                  {/* 🏆: Trophy emoji (unlocked) */}
                  {/* 🔒: Lock emoji (locked) */}
                </span>
                
                {/* Achievement Details */}
                <div>
                  {/* <strong>: Bold text */}
                  <strong>{achievement.name}</strong>
                  {/* achievement.name: Display name from achievements array */}
                  
                  {/* <br />: Line break */}
                  <br />
                  
                  {/* <small>: Smaller text */}
                  <small>{achievement.desc}</small>
                  {/* achievement.desc: Description from achievements array */}
                </div>
              </div>
            );
            // Return ends - JSX for this achievement
          })}
          {/* map() ends - created array of achievement JSX elements */}
        </div>
      </div>
    </div>
    // Return ends - entire component JSX
  );
}

// ============================================
// STEP 7: EXPORT COMPONENT
// ============================================
// export default: Make component available for import
// Interview: "default export allows import without curly braces"

export default Sidebar;

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "This is a presentational component - it displays data, logic is minimal"
// 2. "I use useEffect to check achievements whenever gameState changes"
// 3. "I use Set for O(1) lookups instead of Array.includes() which is O(n)"
// 4. "I calculate progress once and reuse the value"
// 5. "I use map() to transform achievements array into JSX elements"
// 6. "I use conditional rendering to show different states (locked/unlocked)"
// 7. "I pass achievement data as array - easy to add/remove achievements"
