import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './screens/WelcomeScreen';
import ConnectAppsScreen from './screens/ConnectAppsScreen';
import LocationScreen from './screens/LocationScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="App">
      {currentScreen === 'welcome' && <WelcomeScreen onNext={() => navigateTo('connect')} />}
      {currentScreen === 'connect' && <ConnectAppsScreen onNext={() => navigateTo('location')} onSkip={() => navigateTo('location')} />}
      {currentScreen === 'location' && <LocationScreen />}
    </div>
  );
}

export default App;
