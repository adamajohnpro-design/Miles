import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function LocationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const buttonScale1 = useRef(new Animated.Value(1)).current;
  const buttonScale2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation de pulsation continue pour le bouton GPS
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
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

  const handleUseMyLocation = async () => {
    setLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'La permission de localisation est nécessaire pour utiliser votre position actuelle.'
        );
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Localisation enregistrée',
          `Position: ${location.coords.latitude}, ${location.coords.longitude}`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Profile');
              },
            },
          ]
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', 'Impossible d\'obtenir votre localisation.');
    }
  };

  const handleSearchCity = () => {
    setShowSearch(true);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      Alert.alert(
        'Ville sélectionnée',
        `Recherche pour: ${searchText}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Profile');
            },
          },
        ]
      );
    }
  };

  const animateButton = (anim, toValue) => {
    Animated.spring(anim, {
      toValue,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.success}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.emoji}>📍</Text>
        <Text style={styles.title}>D'où pars-tu ?</Text>

        {!showSearch ? (
          <>
            <Animated.View style={{ transform: [{ scale: buttonScale1 }], width: '100%' }}>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleUseMyLocation}
                onPressIn={() => animateButton(buttonScale1, 0.95)}
                onPressOut={() => animateButton(buttonScale1, 1)}
                disabled={loading}
                activeOpacity={0.9}
              >
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.15)']}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Text style={styles.buttonIcon}>🎯</Text>
                        <View style={styles.buttonTextContainer}>
                          <Text style={styles.buttonText}>Utiliser ma position</Text>
                          <Text style={styles.buttonSubtext}>(GPS automatique)</Text>
                        </View>
                      </>
                    )}
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OU</Text>
              <View style={styles.separatorLine} />
            </View>

            <Animated.View style={{ transform: [{ scale: buttonScale2 }], width: '100%' }}>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleSearchCity}
                onPressIn={() => animateButton(buttonScale2, 0.95)}
                onPressOut={() => animateButton(buttonScale2, 1)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  style={[styles.button, styles.buttonSecondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.buttonIcon}>🔍</Text>
                  <Text style={styles.buttonTextSecondary}>Chercher une ville</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.searchInputGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TextInput
                  style={styles.searchInput}
                  placeholder="Reims 🔍"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={searchText}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearchSubmit}
                  autoFocus
                />
              </LinearGradient>
            </View>

            <TouchableOpacity
              style={styles.searchButtonWrapper}
              onPress={handleSearchSubmit}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.searchButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.searchButtonText}>Rechercher</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowSearch(false)}
            >
              <Text style={styles.backButtonText}>← Retour</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: SPACING.xxl,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonWrapper: {
    marginBottom: SPACING.lg,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  buttonSecondary: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonIcon: {
    fontSize: 28,
    marginRight: SPACING.md,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: TYPOGRAPHY.sizes.sm,
    marginTop: SPACING.xs,
  },
  buttonTextSecondary: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  separatorText: {
    marginHorizontal: SPACING.md,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  searchContainer: {
    width: '100%',
  },
  searchInputWrapper: {
    marginBottom: SPACING.lg,
  },
  searchInputGradient: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  searchInput: {
    padding: SPACING.lg,
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.white,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  searchButtonWrapper: {
    marginBottom: SPACING.md,
  },
  searchButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  searchButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  backButton: {
    alignItems: 'center',
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});
