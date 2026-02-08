/* ============================================
   REACT APP ENTRY POINT
   ============================================
   
   INTERVIEW PREP: This file demonstrates:
   - ReactDOM for rendering
   - React.StrictMode
   - Entry point pattern
   
   HOW TO BUILD IN INTERVIEW:
   1. Import React and ReactDOM
   2. Import App component
   3. Get root element from HTML
   4. Create root with createRoot
   5. Render App component
*/

// ============================================
// STEP 1: IMPORT REACT
// ============================================
// React: Core React library
// Interview: "React provides the component system and JSX"

import React from 'react';
// React: The main React library

// ============================================
// STEP 2: IMPORT REACTDOM
// ============================================
// ReactDOM: Library for rendering React to DOM
// React 18 uses ReactDOM from 'react-dom/client'
// Interview: "ReactDOM is separate from React - separation of concerns"

import ReactDOM from 'react-dom/client';
// ReactDOM: Handles rendering React components to browser DOM
// '/client': React 18's new client API

// ============================================
// STEP 3: IMPORT STYLES
// ============================================
// CSS file for global styles
// Interview: "I import CSS here so it applies to entire app"

import './index.css';
// './index.css': Global styles (fonts, body, etc.)

// ============================================
// STEP 4: IMPORT APP COMPONENT
// ============================================
// App: The main component we built
// Interview: "App is the root component - all other components are children"

import App from './App';
// './App': Relative import (same directory)
// No file extension needed - webpack resolves it

// ============================================
// STEP 5: GET ROOT ELEMENT
// ============================================
// document: Browser's document object (the HTML page)
// getElementById(): DOM method to find element by ID
// 'root': The div in public/index.html where React renders
// Interview: "I get the root element from the HTML file"

const root = ReactDOM.createRoot(document.getElementById('root'));
// document.getElementById('root'): Find <div id="root"> in HTML
// ReactDOM.createRoot(): Create React 18 root (new API)
// root: Object with render() method
// Interview: "createRoot is React 18's new API - replaces ReactDOM.render()"

// ============================================
// STEP 6: RENDER APP COMPONENT
// ============================================
// root.render(): Render React component into DOM
// Interview: "render() replaces the root element's content with React app"

root.render(
  // React.StrictMode: Development tool that checks for problems
  // Interview: "StrictMode helps find bugs - only runs in development"
  
  <React.StrictMode>
    {/* StrictMode: Wraps app to enable additional checks */}
    {/* It doesn't render anything visible - just enables checks */}
    
    {/* App: Our main component */}
    <App />
    {/* This is JSX - React will convert to React.createElement(App) */}
  </React.StrictMode>
);

// ============================================
// WHAT HAPPENS WHEN THIS RUNS:
// ============================================
// 1. Browser loads index.html
// 2. Browser executes this JavaScript file
// 3. React finds <div id="root"> in HTML
// 4. React renders <App /> component into that div
// 5. App component renders its children (Sidebar, SlideContainer, etc.)
// 6. React updates DOM with all components
// 7. User sees the application

// ============================================
// INTERVIEW TALKING POINTS:
// ============================================
// 1. "This is the entry point - where React app starts"
// 2. "ReactDOM.createRoot() is React 18's new API"
// 3. "StrictMode helps catch bugs in development"
// 4. "I render App component which is the root of my component tree"
// 5. "React handles all DOM updates - I just describe UI with components"
