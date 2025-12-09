const qrcode = require('qrcode-terminal');
const os = require('os');

// Obtenir l'adresse IP locale
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorer les adresses internes et non-IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const IP = getLocalIP();
const PORT = 3001;
const URL = `http://${IP}:${PORT}`;

console.log('\n📱 QR Code pour accéder à Miles sur mobile:\n');
console.log(`📍 URL: ${URL}\n`);
qrcode.generate(URL, { small: true });
console.log(`\n✨ Scannez ce QR code avec votre téléphone pour ouvrir l'application!\n`);
console.log(`💡 Assurez-vous que:`);
console.log(`   - Votre mobile est sur le même WiFi`);
console.log(`   - Le serveur tourne (npm start)`);
console.log(`   - Le client React tourne (npm run client)\n`);

