import React, { useState } from 'react';
import './ConnectAppsScreen.css';

function ConnectAppsScreen({ onNext, onSkip }) {
  const [loading, setLoading] = useState(false);
  const [connectedApp, setConnectedApp] = useState(null);

  const handleConnect = async (appName) => {
    setLoading(true);
    setConnectedApp(appName);
    
    // Simulation de la connexion OAuth (10 secondes)
    setTimeout(() => {
      setLoading(false);
      // Ici, on pourrait afficher un message de succès avec les km importés
      // "Tu as couru 847 km en 2024 !"
      onNext();
    }, 10000);
  };

  const getAppEmoji = (appName) => {
    const emojis = {
      'Strava': '🟢',
      'Apple Health': '⌚',
      'Google Fit': '📱'
    };
    return emojis[appName] || '📊';
  };

  return (
    <div className="connect-container">
      <div className="connect-content">
        <h1 className="connect-title">📊 Connecte tes apps</h1>
        <p className="connect-subtitle">
          Import automatique<br />
          de ton historique
        </p>

        <div className="apps-container">
          <button
            className={`app-button ${connectedApp === 'Strava' ? 'connected' : ''}`}
            onClick={() => handleConnect('Strava')}
            disabled={loading}
          >
            <span className="app-emoji">{getAppEmoji('Strava')}</span>
            <span className="app-name">Strava</span>
            {loading && connectedApp === 'Strava' && (
              <span className="loader">⏳</span>
            )}
          </button>

          <button
            className={`app-button ${connectedApp === 'Apple Health' ? 'connected' : ''}`}
            onClick={() => handleConnect('Apple Health')}
            disabled={loading}
          >
            <span className="app-emoji">{getAppEmoji('Apple Health')}</span>
            <span className="app-name">Apple Health</span>
            {loading && connectedApp === 'Apple Health' && (
              <span className="loader">⏳</span>
            )}
          </button>

          <button
            className={`app-button ${connectedApp === 'Google Fit' ? 'connected' : ''}`}
            onClick={() => handleConnect('Google Fit')}
            disabled={loading}
          >
            <span className="app-emoji">{getAppEmoji('Google Fit')}</span>
            <span className="app-name">Google Fit</span>
            {loading && connectedApp === 'Google Fit' && (
              <span className="loader">⏳</span>
            )}
          </button>
        </div>

        <button
          className="skip-button"
          onClick={onSkip}
          disabled={loading}
        >
          <span className="skip-text">⏭️ Passer</span>
          <span className="skip-subtext">(tracker manuellement)</span>
        </button>
      </div>
    </div>
  );
}

export default ConnectAppsScreen;

