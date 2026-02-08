/* ============================================
   SLIDE CONTAINER COMPONENT
   ============================================
   
   INTERVIEW PREP: This component demonstrates:
   - Props (receiving data from parent)
   - Conditional rendering
   - String manipulation (markdown parsing)
   - dangerouslySetInnerHTML (rendering HTML)
   - Event handlers
   - Array access
   
   HOW TO BUILD IN INTERVIEW:
   1. Create function component
   2. Accept props (slides, currentSlide, gameState, onMarkComplete)
   3. Get current slide from array
   4. Create markdown parser function
   5. Render slide content
   6. Add mark complete button
*/

// ============================================
// STEP 1: IMPORT REACT
// ============================================
// React: Required for JSX
// Interview: "Even though we don't use React directly, JSX needs it"

import React from 'react';
// React: The React library

// Import CSS for styling
import './SlideContainer.css';
// './SlideContainer.css': Styles specific to this component

// ============================================
// STEP 2: CREATE COMPONENT FUNCTION
// ============================================
// Function component: Receives props as parameters
// Destructuring: Extract specific props from props object
// Interview: "Destructuring makes code cleaner than accessing props.slides"

function SlideContainer({ slides, currentSlide, gameState, onMarkComplete }) {
  // slides: Array of all slide objects
  // currentSlide: Number - index of currently displayed slide
  // gameState: Object with progress information
  // onMarkComplete: Function - callback to mark slide complete (from parent)
  // Interview: "I receive these props from parent App component"

  // ============================================
  // STEP 3: GET CURRENT SLIDE
  // ============================================
  // Access slide from array using index
  // slides[currentSlide]: Array access using bracket notation
  // Interview: "I use array index to get current slide - O(1) operation"
  
  const slide = slides[currentSlide];
  // slide: Object with id, category, title, content (or undefined if index out of bounds)
  
  // ============================================
  // STEP 4: HANDLE MISSING SLIDE
  // ============================================
  // Early return pattern: Handle edge case before main logic
  // Interview: "Early return simplifies component logic"
  
  // If no slide (array empty or index out of bounds)
  if (!slide) {
    // !slide: If slide is undefined or null
    // Return JSX for error state
    return (
      <div className="slide-container">
        <div className="slide">
          <h1>No slides available</h1>
          {/* Display message to user */}
        </div>
      </div>
    );
    // Return ends - rest of function doesn't execute
  }

  // ============================================
  // STEP 5: CREATE MARKDOWN PARSER FUNCTION
  // ============================================
  // Function to convert markdown text to HTML
  // Interview: "I parse markdown because it's easier to write than HTML"
  
  function parseContent(content) {
    // content: String - markdown text from slide object
    
    // Handle empty content
    if (!content) return '';
    // If content is empty/null/undefined, return empty string
    // Early return pattern
    
    // Start with original content
    let html = content;
    // html: Will be modified to contain HTML
    
    // ============================================
    // STEP 5a: ESCAPE HTML TO PREVENT XSS
    // ============================================
    // XSS: Cross-Site Scripting attack
    // Replace special characters with HTML entities
    // Interview: "I escape HTML to prevent XSS attacks - security best practice"
    
    // Replace & with &amp;
    html = html.replace(/&/g, '&amp;');
    // replace(): String method - replace all occurrences
    // /&/g: Regex - & is literal, g flag means global (all occurrences)
    // '&amp;': HTML entity for ampersand
    
    // Replace < with &lt;
    html = html.replace(/</g, '&lt;');
    // &lt;: HTML entity for less-than sign
    
    // Replace > with &gt;
    html = html.replace(/>/g, '&gt;');
    // &gt;: HTML entity for greater-than sign
    // Interview: "Escaping prevents malicious scripts from executing"
    
    // ============================================
    // STEP 5b: PARSE CODE BLOCKS
    // ============================================
    // Code blocks: ```javascript ... ``` or ``` ... ```
    // Interview: "I use regex to find and replace code blocks"
    
    // Match JavaScript code blocks
    html = html.replace(/```javascript\n([\s\S]*?)```/g, '<div class="code-block">$1</div>');
    // /```javascript\n([\s\S]*?)```/g: Regex pattern
    // ```javascript\n: Literal "```javascript" followed by newline
    // ([\s\S]*?): Capture group - any character (including newlines), non-greedy
    // ```: Closing backticks
    // g: Global flag (all occurrences)
    // $1: Reference to first capture group (the code content)
    // <div class="code-block">: HTML wrapper for code
    
    // Match generic code blocks (no language specified)
    html = html.replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>');
    // Same pattern but without "javascript" requirement
    
    // ============================================
    // STEP 5c: PARSE INLINE CODE
    // ============================================
    // Inline code: `code` (single backticks)
    // Interview: "I parse inline code separately from code blocks"
    
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // /`([^`]+)`/g: Regex pattern
    // `: Opening backtick
    // ([^`]+): Capture group - one or more characters that are NOT backtick
    // `: Closing backtick
    // <code>: HTML tag for inline code
    // $1: The code content
    
    // ============================================
    // STEP 5d: PARSE BOLD TEXT
    // ============================================
    // Bold: **text** (double asterisks)
    
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // /\*\*([^*]+)\*\*/g: Regex pattern
    // \*\*: Escaped asterisks (literal **)
    // ([^*]+): Capture group - one or more characters that are NOT asterisk
    // \*\*: Closing escaped asterisks
    // <strong>: HTML tag for bold text
    // $1: The bold text content
    
    // ============================================
    // STEP 5e: PARSE HEADERS
    // ============================================
    // Headers: ### Header (three hashes)
    
    html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    // /^### (.*)$/gm: Regex pattern
    // ^: Start of line
    // ### : Literal "### " (three hashes and space)
    // (.*): Capture group - any characters (the header text)
    // $: End of line
    // g: Global flag
    // m: Multiline flag (^ and $ match line boundaries)
    // <h3>: HTML tag for level 3 header
    
    html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    // Level 2 headers (two hashes)
    
    html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    // Level 4 headers (four hashes)
    
    // ============================================
    // STEP 5f: PARSE LISTS
    // ============================================
    // Lists: - item (dash and space)
    
    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    // /^- (.*)$/gm: Regex pattern
    // ^: Start of line
    // - : Literal dash and space
    // (.*): Capture group - list item text
    // $: End of line
    // <li>: HTML tag for list item
    
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    // /(<li>.*<\/li>\n?)+/g: Regex pattern
    // (<li>.*<\/li>\n?): Match one list item (with optional newline)
    // +: One or more occurrences
    // $&: Reference to entire match (all list items)
    // <ul>: HTML tag for unordered list (wraps all items)
    
    // ============================================
    // STEP 5g: PARSE PARAGRAPHS
    // ============================================
    // Paragraphs: Double newline separates paragraphs
    
    html = html.replace(/\n\n/g, '</p><p>');
    // /\n\n/g: Match double newline
    // </p><p>: Close one paragraph, open another
    
    html = '<p>' + html + '</p>';
    // Wrap entire content in paragraph tags
    // First <p> opens first paragraph
    // Last </p> closes last paragraph
    
    html = html.replace(/<p><\/p>/g, '');
    // Remove empty paragraphs (may occur from processing)
    // /<p><\/p>/g: Match empty paragraph tags
    
    // Return parsed HTML string
    return html;
    // html: String containing HTML markup
  }
  // Function ends - parseContent is now defined

  // ============================================
  // STEP 6: CHECK IF SLIDE IS COMPLETED
  // ============================================
  // Determine if current slide has been marked complete
  // Interview: "I check this to show different button state"
  
  // gameState.completedSlides: Set of completed slide indices
  // Set.has(): Check if value exists in Set (O(1) operation)
  // currentSlide: Index of current slide
  // Interview: "Set.has() is faster than Array.includes()"
  
  const isCompleted = gameState.completedSlides.has(currentSlide);
  // isCompleted: Boolean - true if slide is completed

  // ============================================
  // STEP 7: RENDER COMPONENT
  // ============================================
  // Return JSX (JavaScript XML)
  // Interview: "JSX is syntactic sugar for React.createElement()"
  
  return (
    // <div>: Container element
    <div className="slide-container">
      {/* Slide Card */}
      <div className="slide active">
        {/* active: CSS class for styling */}
        
        {/* Slide Header Section */}
        <div className="slide-header">
          <div>
            {/* Category Badge */}
            <div className="slide-category">{slide.category}</div>
            {/* slide.category: Category name from slide object */}
            {/* Example: "React – Basics" */}
            
            {/* Slide Number Badge */}
            <div className="slide-number">
              {/* Template literal: `${}` for string interpolation */}
              Slide {currentSlide + 1} of {slides.length}
              {/* currentSlide + 1: Convert 0-based index to 1-based (user-friendly) */}
              {/* slides.length: Total number of slides */}
              {/* Example: "Slide 5 of 69" */}
            </div>
          </div>
        </div>

        {/* Slide Title */}
        <h1 className="slide-title">{slide.title}</h1>
        {/* <h1>: Main heading */}
        {/* slide.title: Question title from slide object */}
        {/* Example: "What is the difference between props and state?" */}

        {/* Slide Content */}
        {/* dangerouslySetInnerHTML: Render HTML string as HTML (not as text) */}
        {/* Interview: "I use dangerouslySetInnerHTML because I trust the content" */}
        {/* Warning: Only use with trusted content (XSS risk) */}
        
        <div 
          className="slide-content"
          dangerouslySetInnerHTML={{ __html: parseContent(slide.content) }}
          // dangerouslySetInnerHTML: React prop for rendering HTML
          // __html: Property name (must be exactly "__html")
          // parseContent(slide.content): Call parser function with slide content
          // Returns HTML string which is rendered as HTML
        />
        {/* slide.content: Markdown text from slide object */}
        {/* parseContent(): Converts markdown to HTML */}
        {/* Result: HTML is rendered in the div */}

        {/* Mark Complete Button */}
        <button
          // className: CSS classes (space-separated)
          // Template literal: `${}` for dynamic class name
          // If isCompleted, add 'completed' class
          className={`mark-complete ${isCompleted ? 'completed' : ''}`}
          // mark-complete: Base class
          // completed: Additional class if slide is completed
          // Ternary: condition ? valueIfTrue : valueIfFalse
          
          // onClick: Event handler - function runs when button clicked
          // Arrow function: () => {} creates function
          // onMarkComplete(currentSlide): Call parent's function with current slide index
          // Interview: "I pass currentSlide to identify which slide to mark"
          
          onClick={() => onMarkComplete(currentSlide)}
          // When clicked, calls onMarkComplete(currentSlide)
          // Which calls markComplete(currentSlide) in App.js
        >
          {/* Button text - conditional based on completion state */}
          {/* Ternary operator: Show different text if completed */}
          {isCompleted ? '✓ Completed' : 'Mark as Complete (+10 points)'}
          {/* If isCompleted is true: Show "✓ Completed" */}
          {/* If isCompleted is false: Show "Mark as Complete (+10 points)" */}
          {/* ✓: Checkmark character (Unicode) */}
        </button>
      </div>
    </div>
    // Return ends - entire component JSX
  );
}

// ============================================
// STEP 8: EXPORT COMPONENT
// ============================================
// export default: Make component available for import
// Interview: "default export allows import without curly braces"

export default SlideContainer;

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "I parse markdown to HTML for easier content management"
// 2. "I use dangerouslySetInnerHTML carefully - only with trusted content"
// 3. "I escape HTML to prevent XSS attacks"
// 4. "I use regex for pattern matching in markdown parsing"
// 5. "I use early return pattern to handle edge cases"
// 6. "I use Set.has() for O(1) completion checking"
// 7. "I use conditional rendering for different button states"
// 8. "I convert 0-based index to 1-based for user display"
