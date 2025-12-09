const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du client React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Miles API is running' });
});

// Route pour servir l'application React (toutes les autres routes)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Miles server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://192.168.1.89:${PORT}`);
  console.log(`\n📱 Pour tester sur mobile:`);
  console.log(`   1. Connectez votre mobile au même WiFi`);
  console.log(`   2. Ouvrez le client React sur: http://192.168.1.89:3001`);
});

