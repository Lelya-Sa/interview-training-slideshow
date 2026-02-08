/* ============================================
   POINTS POPUP COMPONENT
   ============================================
   
   Shows a temporary notification when points are earned.
*/

import React, { useEffect, useState } from 'react';
import './PointsPopup.css';

function PointsPopup({ points, onClose }) {
  const [visible, setVisible] = useState(true);

  // Auto-hide after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="points-popup">
      +{points} points! 🎉
    </div>
  );
}

export default PointsPopup;
