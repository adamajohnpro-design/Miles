import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleUseMyLocation = async () => {
    setLoading(true);
    
    try {
      // Demander la permission de localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'La permission de localisation est nécessaire pour utiliser votre position actuelle.'
        );
        setLoading(false);
        return;
      }

      // Obtenir la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      
      // Simulation d'un délai pour l'UX
      setTimeout(() => {
        setLoading(false);
        // Ici, on pourrait sauvegarder la localisation et naviguer vers l'écran principal
        Alert.alert(
          'Localisation enregistrée',
          `Position: ${location.coords.latitude}, ${location.coords.longitude}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigation vers l'écran principal (à créer)
                // navigation.navigate('Home');
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
      // Ici, on pourrait faire une recherche de ville et naviguer
      Alert.alert(
        'Ville sélectionnée',
        `Recherche pour: ${searchText}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigation vers l'écran principal
              // navigation.navigate('Home');
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📍 D'où pars-tu ?</Text>

        {!showSearch ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUseMyLocation}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Utiliser ma position</Text>
              )}
              <Text style={styles.buttonSubtext}>(GPS automatique)</Text>
            </TouchableOpacity>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OU</Text>
              <View style={styles.separatorLine} />
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={handleSearchCity}
            >
              <Text style={styles.buttonTextSecondary}>Chercher une ville</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Reims 🔍"
              placeholderTextColor="#999999"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              autoFocus
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchSubmit}
            >
              <Text style={styles.searchButtonText}>Rechercher</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonSecondary: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  buttonTextSecondary: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 5,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 15,
    color: '#999999',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    width: '100%',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: 18,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  searchButton: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
  },
});

