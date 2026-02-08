/* ============================================
   NAVIGATION COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Props (receiving data from parent)
   - Event handlers (onClick)
   - Conditional rendering (disabled attribute)
   - Simple presentational component
   
   HOW TO BUILD IN INTERVIEW:
   1. Create function component
   2. Accept props in parameters
   3. Calculate button states
   4. Return JSX with buttons
   5. Add onClick handlers
   6. Style with CSS
*/

// ============================================
// STEP 1: IMPORT REACT
// ============================================
// React: Required for JSX
// Interview: "Even though we don't use React directly, JSX needs it"

import React from 'react';
// React: The React library

// Import CSS for styling
import './Navigation.css';
// './': Relative path (same directory)
// Interview: "I use relative imports for local files"

// ============================================
// STEP 2: CREATE COMPONENT FUNCTION
// ============================================
// Function component: Receives props as function parameters
// Destructuring: Extract specific props from props object
// Interview: "Destructuring props makes code cleaner than props.currentSlide"

function Navigation({ currentSlide, totalSlides, onNavigate }) {
  // currentSlide: Number - index of currently displayed slide
  // totalSlides: Number - total number of slides
  // onNavigate: Function - callback to change slide (from parent)
  // Interview: "I receive props from parent App component"

  // ============================================
  // STEP 3: CALCULATE BUTTON STATES
  // ============================================
  // Determine if buttons should be enabled or disabled
  // Interview: "I calculate these values to avoid repeating logic in JSX"
  
  // Previous button: Disabled if on first slide (index 0)
  // currentSlide > 0: true if not on first slide
  // Interview: "I use descriptive variable names for clarity"
  
  const canGoPrev = currentSlide > 0;
  // canGoPrev: Boolean - true if can go to previous slide
  
  // Next button: Disabled if on last slide
  // currentSlide < totalSlides - 1: true if not on last slide
  // totalSlides - 1: Last valid index (arrays are 0-indexed)
  // Interview: "I subtract 1 because arrays are 0-indexed"
  
  const canGoNext = currentSlide < totalSlides - 1;
  // canGoNext: Boolean - true if can go to next slide

  // ============================================
  // STEP 4: RETURN JSX
  // ============================================
  // JSX: JavaScript XML - looks like HTML but is JavaScript
  // Interview: "JSX is syntactic sugar for React.createElement()"
  
  return (
    <div className="navigation">
      {/* Previous Button */}
      {/* className: CSS classes (space-separated) */}
      {/* "nav-btn prev": Two classes applied */}
      {/* onClick: Event handler - function runs when button clicked */}
      {/* () => {}: Arrow function (inline function) */}
      {/* onNavigate(-1): Call parent's function with -1 (go back) */}
      {/* Interview: "I pass -1 to indicate direction (negative = previous)" */}
      {/* disabled: HTML attribute - disables button if true */}
      {/* !canGoPrev: Invert boolean (if canGoPrev is false, disabled is true) */}
      
      <button
        className="nav-btn prev"
        onClick={() => onNavigate(-1)}
        disabled={!canGoPrev}
      >
        {/* Button text content */}
        ← Previous
        {/* ←: Unicode arrow character */}
      </button>
      
      {/* Next Button */}
      {/* className: "next" - Different class for styling */}
      {/* onClick: Call onNavigate with 1 (go forward) */}
      {/* disabled: Disable if can't go next */}
      
      <button
        className="nav-btn next"
        onClick={() => onNavigate(1)}
        disabled={!canGoNext}
      >
        Next →
        {/* →: Unicode arrow character */}
      </button>
    </div>
  );
  // Return statement ends - component returns this JSX
}

// ============================================
// STEP 5: EXPORT COMPONENT
// ============================================
// export default: Make component available for import
// Interview: "default export allows import without curly braces: import Navigation from './Navigation'"

export default Navigation;

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "This is a presentational component - it only displays UI, no logic"
// 2. "I use props to receive data and callbacks from parent"
// 3. "I calculate button states to avoid repeating logic"
// 4. "I use disabled attribute for better UX - user knows when buttons don't work"
// 5. "I pass direction (-1 or 1) to parent's function for flexibility"
// 6. "This component is reusable - could be used for any pagination"
