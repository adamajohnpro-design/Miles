import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  // Données de progression
  const startCity = 'Reims';
  const destination = 'Paris';
  const totalDistance = 142;
  const currentDistance = 93;
  const progress = Math.round((currentDistance / totalDistance) * 100);
  const remaining = totalDistance - currentDistance;
  const currentPosition = 'Château-Thierry';
  const nextStep = 'Meaux';
  const nextStepDistance = 12;

  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation de la barre de progression
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    // Animation de pulsation pour le bouton FAB
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradients.primary}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>MILES</Text>
        <Text style={styles.headerSubtitle}>
          {startCity} → {destination}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Carte de progression principale */}
        <View style={styles.mainCardWrapper}>
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']}
            style={styles.mainCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercentage}>{progress}%</Text>
                <Text style={styles.progressLabel}>Complété</Text>
              </View>
            </View>

            <View style={styles.distanceInfo}>
              <View style={styles.distanceItem}>
                <Text style={styles.distanceValue}>{currentDistance}</Text>
                <Text style={styles.distanceLabel}>km parcourus</Text>
              </View>
              <View style={styles.distanceSeparator} />
              <View style={styles.distanceItem}>
                <Text style={styles.distanceValue}>{remaining}</Text>
                <Text style={styles.distanceLabel}>km restants</Text>
              </View>
            </View>

            {/* Barre de progression */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    { width: animatedWidth },
                  ]}
                >
                  <LinearGradient
                    colors={COLORS.gradients.success}
                    style={styles.progressBarGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </Animated.View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Position actuelle */}
        <View style={styles.sectionCard}>
          <LinearGradient
            colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardIcon}>📍</Text>
            <Text style={styles.cardTitle}>Position actuelle</Text>
            <Text style={styles.cardValue}>{currentPosition}</Text>
          </LinearGradient>
        </View>

        {/* Prochaine étape */}
        <View style={styles.sectionCard}>
          <LinearGradient
            colors={['rgba(250, 112, 154, 0.1)', 'rgba(254, 225, 64, 0.1)']}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={styles.cardTitle}>Prochaine étape</Text>
            <Text style={styles.cardValue}>{nextStep}</Text>
            <Text style={styles.cardSubtext}>
              Plus que {nextStepDistance} km !
            </Text>
          </LinearGradient>
        </View>

        {/* Stats rapides */}
        <View style={styles.statsGrid}>
          <View style={styles.statCardWrapper}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.statEmoji}>🏃</Text>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCardWrapper}>
            <LinearGradient
              colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.statEmoji}>⚡</Text>
              <Text style={styles.statValue}>5.2</Text>
              <Text style={styles.statLabel}>km/course</Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Bouton FAB pour ajouter une course */}
      <Animated.View
        style={[
          styles.fabContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddRun')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={COLORS.gradients.secondary}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text.white,
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  mainCardWrapper: {
    marginBottom: SPACING.lg,
  },
  mainCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    ...SHADOWS.large,
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 8,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.primary,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  distanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  distanceItem: {
    alignItems: 'center',
  },
  distanceValue: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  distanceLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  distanceSeparator: {
    width: 1,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
  },
  progressBarContainer: {
    marginTop: SPACING.md,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressBarGradient: {
    flex: 1,
  },
  sectionCard: {
    marginBottom: SPACING.md,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...SHADOWS.small,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  cardValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  cardSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.light,
    marginTop: SPACING.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  statCardWrapper: {
    flex: 1,
  },
  statCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...SHADOWS.small,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  fabContainer: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    ...SHADOWS.glow,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 32,
    color: COLORS.text.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
