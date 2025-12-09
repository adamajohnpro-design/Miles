import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  const startCity = 'Reims';
  const destination = 'Paris';
  const distance = 142;
  const arrivalDate = '15 mars 2025';
  const weeksRemaining = 12;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.success}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.title}>TON OBJECTIF</Text>

        <View style={styles.routeCardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
            style={styles.routeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.routeText}>
              📍 {startCity} → {destination}
            </Text>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>📏 {distance} km</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.timingCardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
            style={styles.timingCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.timingLabel}>À ton rythme actuel :</Text>
            <Text style={styles.arrivalLabel}>⏰ Arrivée prévue</Text>
            <Text style={styles.arrivalDate}>{arrivalDate}</Text>
            <Text style={styles.weeksText}>(dans {weeksRemaining} semaines)</Text>
          </LinearGradient>
        </View>

        <View style={styles.tipCardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.tipCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.tipText}>
              💡 Cours 2-3x/semaine{'\n'}pour y arriver !
            </Text>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.startButtonWrapper}
          onPress={handleStart}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.25)']}
            style={styles.startButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.startButtonText}>C'est parti ! 🚀</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },
  emoji: {
    fontSize: 70,
    marginBottom: SPACING.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text.white,
    marginBottom: SPACING.xxl,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  routeCardWrapper: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  routeCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  routeText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.md,
  },
  distanceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  distanceText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
  },
  timingCardWrapper: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  timingCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  timingLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: SPACING.md,
  },
  arrivalLabel: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.white,
    marginBottom: SPACING.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  arrivalDate: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text.white,
    marginBottom: SPACING.xs,
  },
  weeksText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tipCardWrapper: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  tipCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  startButtonWrapper: {
    width: '100%',
    marginTop: SPACING.lg,
  },
  startButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.large,
  },
  startButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    letterSpacing: 1,
  },
});
