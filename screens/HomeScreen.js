import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Données de progression (à récupérer depuis le contexte/state)
  const startCity = 'Reims';
  const destination = 'Paris';
  const totalDistance = 142;
  const currentDistance = 93;
  const progress = Math.round((currentDistance / totalDistance) * 100);
  const remaining = totalDistance - currentDistance;
  const currentPosition = 'Château-Thierry';
  const nextStep = 'Meaux';
  const nextStepDistance = 12;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MILES</Text>
      </View>

      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>
          🎯 {startCity} → {destination}
        </Text>
      </View>

      {/* Carte interactive simplifiée */}
      <View style={styles.mapContainer}>
        <View style={styles.mapContent}>
          <View style={styles.mapLineContainer}>
            <View style={styles.mapStartDot}>
              <Text style={styles.mapCityLabel}>{startCity}</Text>
            </View>
            <View style={[styles.mapProgressLine, { width: `${progress}%` }]} />
            <View style={styles.mapProgressLabel}>
              <Text style={styles.mapProgressText}>{progress}%</Text>
            </View>
            <View style={styles.mapEndDot}>
              <Text style={styles.mapCityLabel}>{destination}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Progression */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progression</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <View style={styles.progressBarEmpty} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>📊</Text>
          <Text style={styles.statText}>
            {currentDistance} km / {totalDistance} km
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>📍</Text>
          <Text style={styles.statText}>Position : {currentPosition}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>⏰</Text>
          <Text style={styles.statText}>Encore {remaining} km !</Text>
        </View>
      </View>

      {/* Prochaine étape */}
      <View style={styles.nextStepContainer}>
        <Text style={styles.nextStepTitle}>💪 PROCHAINE ÉTAPE</Text>
        <Text style={styles.nextStepText}>
          {nextStep} ({nextStepDistance} km)
        </Text>
      </View>

      {/* Bouton ajouter course */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRun')}
      >
        <Text style={styles.addButtonText}>+ Ajouter une course</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
  routeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  routeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  mapContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    minHeight: 150,
  },
  mapContent: {
    flex: 1,
  },
  mapLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: 80,
  },
  mapStartDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  mapEndDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  mapProgressLine: {
    position: 'absolute',
    left: 8,
    height: 4,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  mapProgressLabel: {
    position: 'absolute',
    left: '50%',
    top: -10,
    transform: [{ translateX: -20 }],
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mapProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  mapCityLabel: {
    fontSize: 10,
    color: '#666666',
    marginTop: 5,
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  progressBarEmpty: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statsContainer: {
    marginBottom: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  statText: {
    fontSize: 16,
    color: '#000000',
  },
  nextStepContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  nextStepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  nextStepText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

