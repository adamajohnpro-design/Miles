#!/bin/bash

# Script pour libérer les ports 3000 et 3001

echo "🔍 Recherche des processus utilisant les ports 3000 et 3001..."

PORT3000=$(lsof -ti:3000)
PORT3001=$(lsof -ti:3001)

if [ ! -z "$PORT3000" ]; then
  echo "🛑 Arrêt des processus sur le port 3000: $PORT3000"
  kill -9 $PORT3000
  echo "✅ Port 3000 libéré"
else
  echo "✅ Port 3000 déjà libre"
fi

if [ ! -z "$PORT3001" ]; then
  echo "🛑 Arrêt des processus sur le port 3001: $PORT3001"
  kill -9 $PORT3001
  echo "✅ Port 3001 libéré"
else
  echo "✅ Port 3001 déjà libre"
fi

echo "✨ Terminé!"

