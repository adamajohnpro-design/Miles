import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RunAddedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { distance } = route.params || { distance: 5.2 };

  // Calcul de la nouvelle progression (exemple)
  const totalDistance = 142;
  const previousDistance = 93;
  const newDistance = previousDistance + distance;
  const newProgress = Math.round((newDistance / totalDistance) * 100);
  const remaining = totalDistance - newDistance;

  const handleViewProgress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Course ajoutée !</Text>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            +{distance.toFixed(1)} km vers Paris
          </Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Nouvelle progression :</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${newProgress}%` }]} />
            <View style={styles.progressBarEmpty} />
          </View>
          <Text style={styles.progressText}>{newProgress}%</Text>
        </View>

        <View style={styles.remainingContainer}>
          <Text style={styles.remainingText}>
            💪 Plus que {remaining} km !
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleViewProgress}>
          <Text style={styles.buttonText}>Voir ma progression</Text>
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
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 40,
  },
  messageText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  progressSection: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  progressLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  progressBarEmpty: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  remainingContainer: {
    marginBottom: 40,
  },
  remainingText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

