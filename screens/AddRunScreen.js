import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddRunScreen() {
  const navigation = useNavigation();
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleValidate = () => {
    if (!distance || parseFloat(distance) <= 0) {
      alert('Veuillez entrer une distance valide');
      return;
    }

    // Navigation vers l'écran de confirmation
    navigation.navigate('RunAdded', {
      distance: parseFloat(distance),
      date: date,
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>➕ Ajouter une course</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>📏 Distance</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#999999"
            value={distance}
            onChangeText={setDistance}
            keyboardType="decimal-pad"
          />
          <Text style={styles.unit}>km</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>📅 Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
            <Text style={styles.dateButtonArrow}>▼</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>⏱️ Durée (optionnel)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#999999"
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
          />
          <Text style={styles.unit}>min</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
        <Text style={styles.validateButtonText}>Valider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 18,
    fontSize: 18,
    color: '#000000',
  },
  unit: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    marginLeft: 5,
  },
  dateButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  dateButtonArrow: {
    fontSize: 14,
    color: '#666666',
  },
  validateButton: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  validateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

