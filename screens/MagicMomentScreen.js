import React, { useState, useEffect, useRef } from 'react';
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
  
  // Animations pour la transition entre loading et result (utiliser useRef pour persister)
  const loadingFadeAnim = useRef(new Animated.Value(1)).current;
  const loadingSlideAnim = useRef(new Animated.Value(0)).current;
  const resultFadeAnim = useRef(new Animated.Value(0)).current;
  const resultSlideAnim = useRef(new Animated.Value(50)).current;
  const resultScaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Animations pour le tracé du trajet
  const line1Anim = useRef(new Animated.Value(0)).current;
  const line2Anim = useRef(new Animated.Value(0)).current;
  const line3Anim = useRef(new Animated.Value(0)).current;
  const dot1Scale = useRef(new Animated.Value(0)).current;
  const dot2Scale = useRef(new Animated.Value(0)).current;
  const dot3Scale = useRef(new Animated.Value(0)).current;
  const dot4Scale = useRef(new Animated.Value(0)).current;
  
  // Animation pour le "WOW" moment
  const wowScaleAnim = useRef(new Animated.Value(0)).current;
  const wowRotateAnim = useRef(new Animated.Value(0)).current;

  // Données simulées (à remplacer par les vraies données)
  const totalKm = 847;
  const startDate = 'janvier 2024';
  const destination = 'BARCELONE';
  const destinationEmoji = '🇪🇸';
  const route = 'Reims → Paris → Lyon → Barcelone';

  useEffect(() => {
    // Animation de chargement pendant 3-4 secondes
    const timer = setTimeout(() => {
      // Transition animée : disparition du loading + apparition du résultat
      Animated.parallel([
        // Disparition du loading (fade out + slide up)
        Animated.timing(loadingFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingSlideAnim, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
        // Apparition du résultat (fade in + slide up + scale)
        Animated.parallel([
          Animated.timing(resultFadeAnim, {
            toValue: 1,
            duration: 600,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.spring(resultSlideAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.spring(resultScaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            delay: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setIsLoading(false);
        setShowResult(true);
        
        // Animation du "WOW" moment (scale + rotation)
        Animated.parallel([
          Animated.spring(wowScaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 50,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(wowRotateAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(wowRotateAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          // Animation séquentielle du tracé du trajet (après le WOW)
          setTimeout(() => {
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
          }, 500);
        });
      });
    }, 3500); // 3.5 secondes de chargement

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // Si l'utilisateur a déjà choisi une destination, aller à Confirmation
    // Sinon, aller à Destination
    navigation.navigate('Destination');
  };

  return (
    <View style={styles.container}>
      {/* Écran de chargement */}
      {isLoading && (
        <Animated.View
          style={[
            styles.loadingWrapper,
            {
              opacity: loadingFadeAnim,
              transform: [{ translateY: loadingSlideAnim }],
            },
          ]}
        >
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
        </Animated.View>
      )}

      {/* Écran de résultat avec transition animée */}
      {showResult && (
        <Animated.View
          style={[
            styles.resultWrapper,
            {
              opacity: resultFadeAnim,
              transform: [
                { translateY: resultSlideAnim },
                { scale: resultScaleAnim },
              ],
            },
          ]}
        >
          <View style={styles.resultContent}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: wowScaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                  {
                    rotate: wowRotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-10deg', '10deg'],
                    }),
                  },
                ],
              }}
            >
              <Text style={styles.wowEmoji}>🎉</Text>
            </Animated.View>
            <Animated.Text
              style={[
                styles.wowTitle,
                {
                  transform: [
                    {
                      scale: wowScaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              WOW !
            </Animated.Text>

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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  resultWrapper: {
    flex: 1,
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

