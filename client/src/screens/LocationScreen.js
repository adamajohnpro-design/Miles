import React, { useState } from 'react';
import './LocationScreen.css';

function LocationScreen() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleUseMyLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulation d'un délai pour l'UX
          setTimeout(() => {
            setLoading(false);
            alert(
              `Localisation enregistrée!\nLatitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`
            );
            // Ici, on pourrait naviguer vers l'écran principal
          }, 2000);
        },
        (error) => {
          setLoading(false);
          alert('Erreur: Impossible d\'obtenir votre localisation. Veuillez autoriser l\'accès à la géolocalisation.');
        }
      );
    } else {
      setLoading(false);
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  const handleSearchCity = () => {
    setShowSearch(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      alert(`Ville sélectionnée: ${searchText}`);
      // Ici, on pourrait faire une recherche de ville et naviguer
      // navigation.navigate('Home');
    }
  };

  return (
    <div className="location-container">
      <div className="location-content">
        <h1 className="location-title">📍 D'où pars-tu ?</h1>

        {!showSearch ? (
          <>
            <button
              className="location-button"
              onClick={handleUseMyLocation}
              disabled={loading}
            >
              {loading ? (
                <span>⏳ Chargement...</span>
              ) : (
                <>
                  <span className="button-text">Utiliser ma position</span>
                  <span className="button-subtext">(GPS automatique)</span>
                </>
              )}
            </button>

            <div className="separator">
              <div className="separator-line"></div>
              <span className="separator-text">OU</span>
              <div className="separator-line"></div>
            </div>

            <button
              className="location-button location-button-secondary"
              onClick={handleSearchCity}
            >
              <span className="button-text-secondary">Chercher une ville</span>
            </button>
          </>
        ) : (
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Reims 🔍"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-button">
                Rechercher
              </button>
            </form>
            <button
              className="back-button"
              onClick={() => setShowSearch(false)}
            >
              ← Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationScreen;

