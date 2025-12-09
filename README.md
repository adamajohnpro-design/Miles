# 🗺️ Miles

Miles transforme tes kilomètres de course en voyage virtuel.

## 🎯 Concept

Tu cours dans ta ville → Tes km s'ajoutent à un trajet virtuel vers une destination de ton choix.

## 🚀 Installation

```bash
npm install
```

## 📱 Démarrage

```bash
npm start
```

Puis appuyez sur `i` pour iOS ou `a` pour Android.

## 📋 Structure

- `screens/` - Écrans de l'application
  - `WelcomeScreen.js` - Écran d'accueil/Splash
  - `ConnectAppsScreen.js` - Connexion aux apps de fitness
  - `LocationScreen.js` - Sélection de la localisation de départ
- `App.js` - Point d'entrée de l'application

## 🔄 Flux d'Onboarding

1. **Welcome/Splash** - Écran d'accueil avec logo MILES
2. **Connect Apps** - Connexion optionnelle à Strava, Apple Health, Google Fit
3. **Location** - Sélection de la localisation de départ (GPS ou recherche)

