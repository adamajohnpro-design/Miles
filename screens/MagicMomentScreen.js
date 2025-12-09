import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function MagicMomentScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const loadingFadeAnim = useRef(new Animated.Value(1)).current;
  const loadingSlideAnim = useRef(new Animated.Value(0)).current;
  const resultFadeAnim = useRef(new Animated.Value(0)).current;
  const resultSlideAnim = useRef(new Animated.Value(50)).current;
  const resultScaleAnim = useRef(new Animated.Value(0.9)).current;

  const line1Anim = useRef(new Animated.Value(0)).current;
  const line2Anim = useRef(new Animated.Value(0)).current;
  const line3Anim = useRef(new Animated.Value(0)).current;
  const dot1Scale = useRef(new Animated.Value(0)).current;
  const dot2Scale = useRef(new Animated.Value(0)).current;
  const dot3Scale = useRef(new Animated.Value(0)).current;
  const dot4Scale = useRef(new Animated.Value(0)).current;

  const wowScaleAnim = useRef(new Animated.Value(0)).current;
  const wowRotateAnim = useRef(new Animated.Value(0)).current;

  const totalKm = 847;
  const startDate = 'janvier 2024';
  const destination = 'BARCELONE';
  const destinationEmoji = '🇪🇸';
  const route = 'Reims → Paris → Lyon → Barcelone';

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
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
          setTimeout(() => {
            Animated.spring(dot1Scale, {
              toValue: 1,
              friction: 6,
              tension: 40,
              useNativeDriver: true,
            }).start();

            Animated.timing(line1Anim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }).start(() => {
              Animated.spring(dot2Scale, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
              }).start();

              Animated.timing(line2Anim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }).start(() => {
                Animated.spring(dot3Scale, {
                  toValue: 1,
                  friction: 6,
                  tension: 40,
                  useNativeDriver: true,
                }).start();

                Animated.timing(line3Anim, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }).start(() => {
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
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigation.navigate('Destination');
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.energy}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>

            <View style={styles.statsCardWrapper}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.statsCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.statsText}>
                  📊 {totalKm.toLocaleString()} km détectés
                </Text>
                <Text style={styles.statsText}>
                  🗓️ Depuis {startDate}
                </Text>
              </LinearGradient>
            </View>

            <Text style={styles.hintText}>
              🗺️ Si tu avais couru{'\n'}en ligne droite...
            </Text>
          </View>
        </Animated.View>
      )}

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

            <View style={styles.mapCardWrapper}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.mapCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.mapText}>{route}</Text>
                <View style={styles.mapLine}>
                  <Animated.View
                    style={[
                      styles.mapDot,
                      {
                        transform: [{ scale: dot1Scale }],
                      },
                    ]}
                  />

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

                  <Animated.View
                    style={[
                      styles.mapDot,
                      {
                        transform: [{ scale: dot2Scale }],
                      },
                    ]}
                  />

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

                  <Animated.View
                    style={[
                      styles.mapDot,
                      {
                        transform: [{ scale: dot3Scale }],
                      },
                    ]}
                  />

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

                  <Animated.View
                    style={[
                      styles.mapDot,
                      {
                        transform: [{ scale: dot4Scale }],
                      },
                    ]}
                  />
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.encouragementText}>
              💪 Continue comme ça !
            </Text>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleContinue}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.25)']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Voir mon profil</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
    padding: SPACING.lg,
  },
  resultWrapper: {
    flex: 1,
    padding: SPACING.lg,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.xxl,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  loaderContainer: {
    marginBottom: SPACING.xxl,
  },
  statsCardWrapper: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  statsCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  statsText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  hintText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wowEmoji: {
    fontSize: 70,
    marginBottom: SPACING.md,
  },
  wowTitle: {
    fontSize: TYPOGRAPHY.sizes.xxxl + 8,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text.white,
    marginBottom: SPACING.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  messageContainer: {
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.white,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  mapCardWrapper: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  mapCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  mapText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  mapLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
    height: 40,
  },
  mapDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.text.white,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...SHADOWS.small,
  },
  mapLineSegment: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.text.white,
    marginHorizontal: SPACING.xs,
    transformOrigin: 'left',
  },
  encouragementText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.white,
    marginBottom: SPACING.xxl,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    letterSpacing: 1,
  },
});

