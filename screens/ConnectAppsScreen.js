import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConnectAppsScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [connectedApp, setConnectedApp] = useState(null);

  const handleConnectStrava = async () => {
    setLoading(true);
    setConnectedApp('Strava');
    
    // Simulation de la connexion OAuth Strava (10 secondes)
    setTimeout(() => {
      setLoading(false);
      // Ici, on pourrait afficher un message de succès avec les km importés
      // "Tu as couru 847 km en 2024 !"
      navigation.navigate('Location');
    }, 10000);
  };

  const handleConnectAppleHealth = () => {
    setLoading(true);
    setConnectedApp('Apple Health');
    
    // Simulation de la connexion Apple Health
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Location');
    }, 10000);
  };

  const handleConnectGoogleFit = () => {
    setLoading(true);
    setConnectedApp('Google Fit');
    
    // Simulation de la connexion Google Fit
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Location');
    }, 10000);
  };

  const handleSkip = () => {
    navigation.navigate('Location');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📊 Connecte tes apps</Text>
        <Text style={styles.subtitle}>
          Import automatique{'\n'}de ton historique
        </Text>

        <View style={styles.appsContainer}>
          <TouchableOpacity
            style={[
              styles.appButton,
              connectedApp === 'Strava' && styles.appButtonConnected,
            ]}
            onPress={handleConnectStrava}
            disabled={loading}
          >
            <Text style={styles.appEmoji}>🟢</Text>
            <Text style={styles.appName}>Strava</Text>
            {loading && connectedApp === 'Strava' && (
              <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.appButton,
              connectedApp === 'Apple Health' && styles.appButtonConnected,
            ]}
            onPress={handleConnectAppleHealth}
            disabled={loading}
          >
            <Text style={styles.appEmoji}>⌚</Text>
            <Text style={styles.appName}>Apple Health</Text>
            {loading && connectedApp === 'Apple Health' && (
              <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.appButton,
              connectedApp === 'Google Fit' && styles.appButtonConnected,
            ]}
            onPress={handleConnectGoogleFit}
            disabled={loading}
          >
            <Text style={styles.appEmoji}>📱</Text>
            <Text style={styles.appName}>Google Fit</Text>
            {loading && connectedApp === 'Google Fit' && (
              <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
            )}
          </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
  },
  appsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  appButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  appButtonConnected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  appEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  loader: {
    marginLeft: 10,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  skipText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
  },
  skipSubtext: {
    fontSize: 14,
    color: '#999999',
  },
});

