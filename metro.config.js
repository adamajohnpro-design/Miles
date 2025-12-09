const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimiser le watch pour éviter EMFILE
config.watchFolders = [__dirname];
config.resolver.blockList = [
  // Exclure les dossiers inutiles du watch
  /.*\/node_modules\/.*\/node_modules\/.*/,
];

// Réduire la charge du watcher
config.watcher = {
  ...config.watcher,
  healthCheck: {
    enabled: true,
  },
};

module.exports = config;

