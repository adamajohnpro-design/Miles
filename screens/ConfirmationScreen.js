import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  // Données de l'objectif (à récupérer depuis le contexte ou les props)
  const startCity = 'Reims';
  const destination = 'Paris';
  const distance = 142;
  const arrivalDate = '15 mars 2025';
  const weeksRemaining = 12;

  const handleStart = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎯 TON OBJECTIF</Text>

        <View style={styles.routeContainer}>
          <Text style={styles.routeText}>
            📍 {startCity} → {destination}
          </Text>
          <Text style={styles.distanceText}>📏 {distance} km</Text>
        </View>

        <View style={styles.timingContainer}>
          <Text style={styles.timingLabel}>À ton rythme actuel :</Text>
          <Text style={styles.arrivalLabel}>⏰ Arrivée prévue :</Text>
          <Text style={styles.arrivalDate}>{arrivalDate}</Text>
          <Text style={styles.weeksText}>(dans {weeksRemaining} semaines)</Text>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            💡 Cours 2-3x/semaine{'\n'}pour y arriver !
          </Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>C'est parti ! 🚀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
    textAlign: 'center',
  },
  routeContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 25,
    borderRadius: 15,
    marginBottom: 40,
    alignItems: 'center',
  },
  routeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  distanceText: {
    fontSize: 20,
    color: '#666666',
  },
  timingContainer: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  timingLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 15,
  },
  arrivalLabel: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '600',
  },
  arrivalDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  weeksText: {
    fontSize: 16,
    color: '#666666',
  },
  tipContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  tipText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 26,
  },
  startButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

