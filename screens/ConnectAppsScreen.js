import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function ConnectAppsScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [connectedApp, setConnectedApp] = useState(null);

  const scaleAnims = {
    strava: useRef(new Animated.Value(1)).current,
    apple: useRef(new Animated.Value(1)).current,
    google: useRef(new Animated.Value(1)).current,
  };

  const handleConnectStrava = async () => {
    setLoading(true);
    setConnectedApp('Strava');

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MagicMoment');
    }, 10000);
  };

  const handleConnectAppleHealth = () => {
    setLoading(true);
    setConnectedApp('Apple Health');

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MagicMoment');
    }, 10000);
  };

  const handleConnectGoogleFit = () => {
    setLoading(true);
    setConnectedApp('Google Fit');

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MagicMoment');
    }, 10000);
  };

  const handleSkip = () => {
    navigation.navigate('Location');
  };

  const animateButton = (key, toValue) => {
    Animated.spring(scaleAnims[key], {
      toValue,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.ocean}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>📊</Text>
          <Text style={styles.title}>Connecte tes apps</Text>
          <Text style={styles.subtitle}>
            Import automatique{'\n'}de ton historique
          </Text>

          <View style={styles.appsContainer}>
            {/* Strava */}
            <Animated.View style={{ transform: [{ scale: scaleAnims.strava }] }}>
              <TouchableOpacity
                style={styles.appButtonWrapper}
                onPress={handleConnectStrava}
                onPressIn={() => animateButton('strava', 0.95)}
                onPressOut={() => animateButton('strava', 1)}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={connectedApp === 'Strava'
                    ? ['#fc5c65', '#fd9644']
                    : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.appButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.appIconContainer}>
                    <Text style={styles.appEmoji}>🏃</Text>
                  </View>
                  <Text style={styles.appName}>Strava</Text>
                  {loading && connectedApp === 'Strava' && (
                    <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
                  )}
                  {!loading && connectedApp !== 'Strava' && (
                    <Text style={styles.connectText}>Connecter</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Apple Health */}
            <Animated.View style={{ transform: [{ scale: scaleAnims.apple }] }}>
              <TouchableOpacity
                style={styles.appButtonWrapper}
                onPress={handleConnectAppleHealth}
                onPressIn={() => animateButton('apple', 0.95)}
                onPressOut={() => animateButton('apple', 1)}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={connectedApp === 'Apple Health'
                    ? ['#fa709a', '#fee140']
                    : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.appButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.appIconContainer}>
                    <Text style={styles.appEmoji}>⌚</Text>
                  </View>
                  <Text style={styles.appName}>Apple Health</Text>
                  {loading && connectedApp === 'Apple Health' && (
                    <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
                  )}
                  {!loading && connectedApp !== 'Apple Health' && (
                    <Text style={styles.connectText}>Connecter</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Google Fit */}
            <Animated.View style={{ transform: [{ scale: scaleAnims.google }] }}>
              <TouchableOpacity
                style={styles.appButtonWrapper}
                onPress={handleConnectGoogleFit}
                onPressIn={() => animateButton('google', 0.95)}
                onPressOut={() => animateButton('google', 1)}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={connectedApp === 'Google Fit'
                    ? ['#4facfe', '#00f2fe']
                    : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.appButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.appIconContainer}>
                    <Text style={styles.appEmoji}>📱</Text>
                  </View>
                  <Text style={styles.appName}>Google Fit</Text>
                  {loading && connectedApp === 'Google Fit' && (
                    <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
                  )}
                  {!loading && connectedApp !== 'Google Fit' && (
                    <Text style={styles.connectText}>Connecter</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            disabled={loading}
          >
            <Text style={styles.skipText}>⏭️ Passer</Text>
            <Text style={styles.skipSubtext}>(tracker manuellement)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.md,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    lineHeight: 24,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  appsContainer: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  appButtonWrapper: {
    marginBottom: SPACING.md,
  },
  appButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  appIconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  appEmoji: {
    fontSize: 28,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.white,
    flex: 1,
  },
  connectText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  loader: {
    marginLeft: SPACING.sm,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    padding: SPACING.md,
  },
  skipText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  skipSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

