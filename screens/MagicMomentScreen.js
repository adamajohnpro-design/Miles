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
  
  // Animations pour le tracé du trajet
  const line1Anim = new Animated.Value(0);
  const line2Anim = new Animated.Value(0);
  const line3Anim = new Animated.Value(0);
  const dot1Scale = new Animated.Value(0);
  const dot2Scale = new Animated.Value(0);
  const dot3Scale = new Animated.Value(0);
  const dot4Scale = new Animated.Value(0);

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
      ]).start(() => {
        // Animation séquentielle du tracé du trajet
        // Point 1 (Reims)
        Animated.spring(dot1Scale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }).start();
        
        // Ligne 1 (Reims → Paris)
        Animated.timing(line1Anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          // Point 2 (Paris)
          Animated.spring(dot2Scale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }).start();
          
          // Ligne 2 (Paris → Lyon)
          Animated.timing(line2Anim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start(() => {
            // Point 3 (Lyon)
            Animated.spring(dot3Scale, {
              toValue: 1,
              friction: 6,
              tension: 40,
              useNativeDriver: true,
            }).start();
            
            // Ligne 3 (Lyon → Barcelone)
            Animated.timing(line3Anim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }).start(() => {
              // Point 4 (Barcelone)
              Animated.spring(dot4Scale, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
              }).start();
            });
          });
        });
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // Si l'utilisateur a déjà choisi une destination, aller à Confirmation
    // Sinon, aller à Destination
    navigation.navigate('Destination');
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
            {/* Reims */}
            <Animated.View
              style={[
                styles.mapDot,
                {
                  transform: [{ scale: dot1Scale }],
                },
              ]}
            />
            
            {/* Ligne Reims → Paris */}
            <Animated.View
              style={[
                styles.mapLineSegment,
                {
                  transform: [
                    {
                      scaleX: line1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            
            {/* Paris */}
            <Animated.View
              style={[
                styles.mapDot,
                {
                  transform: [{ scale: dot2Scale }],
                },
              ]}
            />
            
            {/* Ligne Paris → Lyon */}
            <Animated.View
              style={[
                styles.mapLineSegment,
                {
                  transform: [
                    {
                      scaleX: line2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            
            {/* Lyon */}
            <Animated.View
              style={[
                styles.mapDot,
                {
                  transform: [{ scale: dot3Scale }],
                },
              ]}
            />
            
            {/* Ligne Lyon → Barcelone */}
            <Animated.View
              style={[
                styles.mapLineSegment,
                {
                  transform: [
                    {
                      scaleX: line3Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            
            {/* Barcelone */}
            <Animated.View
              style={[
                styles.mapDot,
                {
                  transform: [{ scale: dot4Scale }],
                },
              ]}
            />
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
    height: 40,
  },
  mapDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  mapLineSegment: {
    flex: 1,
    height: 3,
    backgroundColor: '#000000',
    marginHorizontal: 5,
    transformOrigin: 'left',
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

