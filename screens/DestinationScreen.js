import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

const SUGGESTED_DESTINATIONS = [
  {
    id: 'paris',
    name: 'Paris',
    country: '🇫🇷',
    distance: 142,
    estimatedTime: '~3 mois',
  },
  {
    id: 'lyon',
    name: 'Lyon',
    country: '🇫🇷',
    distance: 465,
    estimatedTime: '~9 mois',
  },
  {
    id: 'barcelona',
    name: 'Barcelone',
    country: '🇪🇸',
    distance: 1040,
    estimatedTime: '~18 mois',
  },
];

export default function DestinationScreen() {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [customDestination, setCustomDestination] = useState(null);

  const startCity = 'Reims';

  const handleSelectDestination = (destination) => {
    Alert.alert(
      'Destination sélectionnée',
      `${destination.name} ${destination.country}\n${destination.distance} km | ${destination.estimatedTime}`,
      [
        {
          text: 'Confirmer',
          onPress: () => {
            navigation.navigate('Confirmation');
          },
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ]
    );
  };

  const handleCustomSearch = () => {
    setShowSearch(true);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      const mockDistance = 9847;
      const mockTime = '~4-5 ans';

      setCustomDestination({
        name: searchText.trim(),
        country: '🌍',
        distance: mockDistance,
        estimatedTime: mockTime,
      });
    }
  };

  const handleConfirmCustom = () => {
    if (customDestination) {
      Alert.alert(
        'Destination confirmée',
        `${startCity} → ${customDestination.name} ${customDestination.country}\n${customDestination.distance} km | ${customDestination.estimatedTime}`,
        [
          {
            text: 'Confirmer',
            onPress: () => {
              navigation.navigate('Confirmation');
            },
          },
        ]
      );
    }
  };

  const renderSuggestions = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🗺️</Text>
        <Text style={styles.title}>Où veux-tu aller ?</Text>

        <View style={styles.locationInfoWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
            style={styles.locationInfo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.locationText}>
              📍 Tu es à : {startCity}
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.suggestionsTitle}>🎯 SUGGESTIONS</Text>

        <View style={styles.destinationsContainer}>
          {SUGGESTED_DESTINATIONS.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              style={styles.destinationCardWrapper}
              onPress={() => handleSelectDestination(destination)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.destinationCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.destinationHeader}>
                  <Text style={styles.destinationName}>
                    {destination.name} {destination.country}
                  </Text>
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceBadgeText}>
                      {destination.distance} km
                    </Text>
                  </View>
                </View>
                <Text style={styles.destinationTime}>
                  ⏱️ {destination.estimatedTime}
                </Text>
                <View style={styles.chooseButtonWrapper}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
                    style={styles.chooseButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.chooseButtonText}>Choisir →</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.searchButtonWrapper}
          onPress={handleCustomSearch}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.searchButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.searchButtonText}>🔍 Autre destination</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderSearch = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>🔍 Chercher</Text>

        <View style={styles.searchInputWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
            style={styles.searchInputGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Tokyo 🇯🇵"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              autoFocus
            />
          </LinearGradient>
        </View>

        {customDestination ? (
          <View style={styles.customDestinationWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
              style={styles.customDestinationCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.customRoute}>
                {startCity} → {customDestination.name} {customDestination.country}
              </Text>
              <Text style={styles.customDistance}>
                📏 {customDestination.distance.toLocaleString()} km
              </Text>
              <Text style={styles.customTime}>
                ⏱️ {customDestination.estimatedTime}
              </Text>
              <TouchableOpacity
                style={styles.confirmButtonWrapper}
                onPress={handleConfirmCustom}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.25)']}
                  style={styles.confirmButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.confirmButtonText}>Confirmer</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchSubmitWrapper}
            onPress={handleSearchSubmit}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
              style={styles.searchSubmitButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.searchSubmitButtonText}>Rechercher</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setShowSearch(false);
            setSearchText('');
            setCustomDestination(null);
          }}
        >
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <LinearGradient
      colors={COLORS.gradients.secondary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {showSearch ? renderSearch() : renderSuggestions()}
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
    paddingVertical: SPACING.xl,
  },
  emoji: {
    fontSize: 60,
    marginBottom: SPACING.md,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  locationInfoWrapper: {
    marginBottom: SPACING.xl,
  },
  locationInfo: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  locationText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.white,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  suggestionsTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.lg,
  },
  destinationsContainer: {
    marginBottom: SPACING.xl,
  },
  destinationCardWrapper: {
    marginBottom: SPACING.md,
  },
  destinationCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  destinationName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  distanceBadgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
  },
  destinationTime: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: SPACING.md,
  },
  chooseButtonWrapper: {
    marginTop: SPACING.sm,
  },
  chooseButton: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  chooseButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  searchButtonWrapper: {
    marginTop: SPACING.md,
  },
  searchButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.white,
  },
  searchInputWrapper: {
    marginBottom: SPACING.xl,
  },
  searchInputGradient: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchInput: {
    padding: SPACING.lg,
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.white,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  customDestinationWrapper: {
    marginBottom: SPACING.lg,
  },
  customDestinationCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  customRoute: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  customDistance: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  customTime: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  confirmButtonWrapper: {
    marginTop: SPACING.sm,
  },
  confirmButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  confirmButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  searchSubmitWrapper: {
    marginBottom: SPACING.lg,
  },
  searchSubmitButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchSubmitButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  backButton: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});
