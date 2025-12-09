import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function AddRunScreen() {
  const navigation = useNavigation();
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleValidate = () => {
    if (!distance || parseFloat(distance) <= 0) {
      alert('Veuillez entrer une distance valide');
      return;
    }

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

  const quickDistances = [5, 10, 15, 21];

  return (
    <LinearGradient
      colors={['#F8F9FA', '#E9ECEF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.emoji}>➕</Text>
          <Text style={styles.title}>Ajouter une course</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Distance */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📏 Distance</Text>
            <View style={styles.inputWrapper}>
              <LinearGradient
                colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
                style={styles.inputGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={COLORS.text.light}
                  value={distance}
                  onChangeText={setDistance}
                  keyboardType="decimal-pad"
                />
                <Text style={styles.inputUnit}>km</Text>
              </LinearGradient>
            </View>

            {/* Suggestions rapides */}
            <View style={styles.quickButtons}>
              {quickDistances.map((dist) => (
                <TouchableOpacity
                  key={dist}
                  style={styles.quickButtonWrapper}
                  onPress={() => setDistance(dist.toString())}
                >
                  <LinearGradient
                    colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']}
                    style={styles.quickButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.quickButtonText}>{dist} km</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📅 Date</Text>
            <TouchableOpacity
              style={styles.dateButtonWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <LinearGradient
                colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
                style={styles.dateButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
                <Text style={styles.dateButtonArrow}>▼</Text>
              </LinearGradient>
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

          {/* Durée (optionnel) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>⏱️ Durée (optionnel)</Text>
            <View style={styles.inputWrapper}>
              <LinearGradient
                colors={['rgba(250, 112, 154, 0.1)', 'rgba(254, 225, 64, 0.1)']}
                style={styles.inputGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={COLORS.text.light}
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="number-pad"
                />
                <Text style={styles.inputUnit}>min</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.validateButtonWrapper}
          onPress={handleValidate}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={COLORS.gradients.primary}
            style={styles.validateButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.validateButtonText}>Valider ✓</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  emoji: {
    fontSize: 60,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  formContainer: {
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...SHADOWS.small,
  },
  input: {
    flex: 1,
    padding: SPACING.lg,
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  inputUnit: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    marginRight: SPACING.lg,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  quickButtonWrapper: {
    flex: 1,
  },
  quickButton: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  quickButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
  },
  dateButtonWrapper: {
    marginBottom: SPACING.sm,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...SHADOWS.small,
  },
  dateButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  dateButtonArrow: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  validateButtonWrapper: {
    marginTop: SPACING.lg,
  },
  validateButton: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  validateButtonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    letterSpacing: 1,
  },
});
