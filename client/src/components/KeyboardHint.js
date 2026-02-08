/* ============================================
   KEYBOARD HINT COMPONENT
   ============================================
   
   Shows keyboard shortcuts to the user.
*/

import React from 'react';
import './KeyboardHint.css';

function KeyboardHint() {
  return (
    <div className="keyboard-hint">
      Press ← → arrow keys to navigate | Space to mark complete
    </div>
  );
}

export default KeyboardHint;
