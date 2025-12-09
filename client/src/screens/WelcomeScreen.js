import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onNext }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Animation d'apparition après 100ms
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <div className={`welcome-container ${fadeIn ? 'fade-in' : ''}`}>
      <div className="welcome-content">
        <div className="welcome-emoji">🗺️</div>
        <h1 className="welcome-title">MILES</h1>
        <p className="welcome-subtitle">
          Cours dans ta ville,<br />
          voyage dans le monde
        </p>
        <button className="welcome-button" onClick={onNext}>
          Commencer
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;

