# 🗺️ Miles

Miles transforme tes kilomètres de course en voyage virtuel.

## 🎯 Concept

Tu cours dans ta ville → Tes km s'ajoutent à un trajet virtuel vers une destination de ton choix.

## 🚀 Installation

```bash
# Installer les dépendances du serveur
npm install

# Installer les dépendances du client React
cd client
npm install
cd ..
```

## 📱 Démarrage

### 🚀 Expo Go (Mobile - Recommandé)

```bash
# Démarrer Expo
npm start

# Un QR code apparaîtra dans le terminal
# Scannez-le avec l'application Expo Go sur votre téléphone
```

**Options Expo :**
- `npm start` - Démarre Expo avec QR code (réseau local)
- `npm run qr` - Démarre Expo avec tunnel (accessible depuis n'importe où)
- `npm run ios` - Ouvrir sur simulateur iOS
- `npm run android` - Ouvrir sur émulateur Android
- `npm run start:web` - Ouvrir dans le navigateur web

### 🌐 Mode Web (React)

```bash
# Terminal 1 - Démarrer le serveur Express
npm run server

# Terminal 2 - Démarrer le client React
npm run client
```

L'application sera accessible sur `http://localhost:3000` (serveur) et `http://localhost:3001` (client React en dev).

### Mode production

```bash
# Build du client React
npm run build

# Démarrer le serveur (servira aussi le client buildé)
npm start
```

## 📋 Structure

- `server.js` - Serveur Express Node.js
- `client/` - Application React
  - `src/screens/` - Écrans de l'application
    - `WelcomeScreen.js` - Écran d'accueil/Splash
    - `ConnectAppsScreen.js` - Connexion aux apps de fitness
    - `LocationScreen.js` - Sélection de la localisation de départ
  - `src/App.js` - Point d'entrée de l'application React

## 🔄 Flux d'Onboarding

1. **Welcome/Splash** - Écran d'accueil avec logo MILES (animation fade-in 2s)
2. **Connect Apps** - Connexion optionnelle à Strava, Apple Health, Google Fit
3. **Location** - Sélection de la localisation de départ (GPS ou recherche ville)

## 🛠️ Technologies

- **Backend**: Node.js + Express
- **Frontend**: React
- **Port**: 3000 (serveur), 3001 (client dev)

