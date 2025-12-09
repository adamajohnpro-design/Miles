import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  // Ville de départ (à récupérer depuis le contexte ou les props)
  const startCity = 'Reims';

  const handleSelectDestination = (destination) => {
    Alert.alert(
      'Destination sélectionnée',
      `${destination.name} ${destination.country}\n${destination.distance} km | ${destination.estimatedTime}`,
      [
        {
          text: 'Confirmer',
          onPress: () => {
            // Navigation vers l'écran principal
            // navigation.navigate('Home');
            console.log('Destination choisie:', destination);
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
      // Simulation d'une recherche de destination
      // Ici, on pourrait faire un appel API pour obtenir la distance réelle
      const mockDistance = 9847; // Exemple: Tokyo
      const mockTime = '~4-5 ans à ton rythme actuel';
      
      setCustomDestination({
        name: searchText.trim(),
        country: '🇯🇵', // À déterminer dynamiquement
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
              // Navigation vers l'écran principal
              // navigation.navigate('Home');
              console.log('Destination custom choisie:', customDestination);
            },
          },
        ]
      );
    }
  };

  const renderSuggestions = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🗺️</Text>
          <Text style={styles.title}>Où veux-tu aller ?</Text>

          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              📍 Tu es à : {startCity}
            </Text>
          </View>

          <Text style={styles.suggestionsTitle}>🎯 SUGGESTIONS :</Text>

          <View style={styles.destinationsContainer}>
            {SUGGESTED_DESTINATIONS.map((destination) => (
              <View key={destination.id} style={styles.destinationCard}>
                <View style={styles.destinationHeader}>
                  <Text style={styles.destinationName}>
                    {destination.name} {destination.country}
                  </Text>
                </View>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationDistance}>
                    {destination.distance.toLocaleString()} km | {destination.estimatedTime}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.chooseButton}
                  onPress={() => handleSelectDestination(destination)}
                >
                  <Text style={styles.chooseButtonText}>Choisir</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleCustomSearch}
          >
            <Text style={styles.searchButtonText}>🔍 Autre destination</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderSearch = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>🔍 Chercher</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Tokyo 🇯🇵"
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
            autoFocus
          />

          {customDestination ? (
            <View style={styles.customDestinationCard}>
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
                style={styles.confirmButton}
                onPress={handleConfirmCustom}
              >
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.searchSubmitButton}
              onPress={handleSearchSubmit}
            >
              <Text style={styles.searchSubmitButtonText}>Rechercher</Text>
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
    </View>
  );

  return showSearch ? renderSearch() : renderSuggestions();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  locationInfo: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  locationText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  destinationsContainer: {
    marginBottom: 30,
  },
  destinationCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  destinationHeader: {
    marginBottom: 10,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  destinationInfo: {
    marginBottom: 15,
  },
  destinationDistance: {
    fontSize: 16,
    color: '#666666',
  },
  chooseButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  chooseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#F5F5F5',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: 18,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  customDestinationCard: {
    backgroundColor: '#F5F5F5',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },
  customRoute: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  customDistance: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  customTime: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  searchSubmitButton: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666666',
  },
});

