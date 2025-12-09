import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MagicMomentScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  // Données simulées (à remplacer par les vraies données)
  const totalKm = 847;
  const startDate = 'janvier 2024';
  const destination = 'BARCELONE';
  const destinationEmoji = '🇪🇸';
  const route = 'Reims → Paris → Lyon → Barcelone';

  useEffect(() => {
    // Animation de chargement pendant 3 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      
      // Animation d'apparition du résultat
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigation.navigate('Confirmation');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingTitle}>✨ ANALYSE EN COURS...</Text>
          
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              📊 {totalKm.toLocaleString()} km détectés
            </Text>
            <Text style={styles.statsText}>
              🗓️ Depuis {startDate}
            </Text>
          </View>

          <Text style={styles.hintText}>
            🗺️ Si tu avais couru{'\n'}en ligne droite...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.resultContent}>
        <Text style={styles.wowEmoji}>🎉</Text>
        <Text style={styles.wowTitle}>WOW !</Text>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Tu serais déjà arrivé{'\n'}
            à {destination} ! {destinationEmoji}
          </Text>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>{route}</Text>
          <View style={styles.mapLine}>
            <View style={styles.mapDot} />
            <View style={styles.mapLineSegment} />
            <View style={styles.mapDot} />
            <View style={styles.mapLineSegment} />
            <View style={styles.mapDot} />
            <View style={styles.mapLineSegment} />
            <View style={styles.mapDot} />
          </View>
        </View>

        <Text style={styles.encouragementText}>
          💪 Continue comme ça !
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Voir mon profil</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 50,
    textAlign: 'center',
  },
  loaderContainer: {
    marginBottom: 50,
  },
  statsContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wowEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  wowTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  messageContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
  },
  mapContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  mapText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },
  mapLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mapDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  mapLineSegment: {
    flex: 1,
    height: 2,
    backgroundColor: '#000000',
    marginHorizontal: 5,
  },
  encouragementText: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 40,
    fontWeight: '600',
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

