import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/colors';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(30);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation à chaque changement d'étape
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const goals = [
    { id: 'weight', emoji: '⚖️', label: 'Perdre du poids' },
    { id: 'fitness', emoji: '🏃', label: 'Rester en forme' },
    { id: 'passion', emoji: '❤️', label: 'Passion running' },
    { id: 'explore', emoji: '🗺️', label: 'Explorer' },
    { id: 'social', emoji: '👥', label: 'Social/Amis' },
  ];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      navigation.navigate('Destination');
    }
  };

  const getGradientColors = () => {
    if (step === 1) return COLORS.gradients.energy;
    if (step === 2) return COLORS.gradients.sunset;
    return COLORS.gradients.nature;
  };

  const renderProgressDots = () => (
    <View style={styles.progressDots}>
      {[1, 2, 3].map((dot) => (
        <View
          key={dot}
          style={[
            styles.progressDot,
            dot === step && styles.progressDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderAgeStep = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.emoji}>🎂</Text>
      <Text style={styles.title}>Quel âge as-tu ?</Text>

      <View style={styles.sliderContainer}>
        <View style={styles.ageDisplay}>
          <Text style={styles.ageValue}>{Math.round(age)}</Text>
          <Text style={styles.ageLabel}>ans</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={15}
          maximumValue={75}
          value={age}
          onValueChange={setAge}
          minimumTrackTintColor="rgba(255, 255, 255, 0.8)"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="#FFFFFF"
          step={1}
        />

        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>15</Text>
          <Text style={styles.sliderLabel}>75</Text>
        </View>
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          💡 Pour adapter nos recommandations
        </Text>
      </View>
    </Animated.View>
  );

  const renderGoalStep = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.emoji}>🎯</Text>
      <Text style={styles.title}>Ton objectif ?</Text>

      <View style={styles.goalsContainer}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={styles.goalButtonWrapper}
            onPress={() => setSelectedGoal(goal.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedGoal === goal.id
                  ? ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.2)']
                  : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']
              }
              style={[
                styles.goalButton,
                selectedGoal === goal.id && styles.goalButtonSelected,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.goalEmoji}>{goal.emoji}</Text>
              <Text style={styles.goalText}>{goal.label}</Text>
              {selectedGoal === goal.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  const renderLevelStep = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.emoji}>📊</Text>
      <Text style={styles.title}>Ton niveau ?</Text>

      <View style={styles.goalsContainer}>
        {[
          { id: 'beginner', emoji: '🟢', label: 'Débutant', subtext: '0-10 km/semaine' },
          { id: 'intermediate', emoji: '🟡', label: 'Intermédiaire', subtext: '10-30 km/semaine' },
          { id: 'advanced', emoji: '🔴', label: 'Avancé', subtext: '30+ km/semaine' },
        ].map((level) => (
          <TouchableOpacity
            key={level.id}
            style={styles.goalButtonWrapper}
            onPress={() => setSelectedLevel(level.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedLevel === level.id
                  ? ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.2)']
                  : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']
              }
              style={[
                styles.goalButton,
                selectedLevel === level.id && styles.goalButtonSelected,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.goalEmoji}>{level.emoji}</Text>
              <View style={styles.levelInfo}>
                <Text style={styles.goalText}>{level.label}</Text>
                <Text style={styles.levelSubtext}>{level.subtext}</Text>
              </View>
              {selectedLevel === level.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderProgressDots()}

        <View style={styles.content}>
          {step === 1 && renderAgeStep()}
          {step === 2 && renderGoalStep()}
          {step === 3 && renderLevelStep()}

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleNext}
            disabled={step === 2 && !selectedGoal}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={
                step === 2 && !selectedGoal
                  ? ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']
                  : ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.2)']
              }
              style={[
                styles.button,
                step === 2 && !selectedGoal && styles.buttonDisabled,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Suivant</Text>
            </LinearGradient>
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
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: SPACING.xs,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
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
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.white,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  ageDisplay: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ageValue: {
    fontSize: TYPOGRAPHY.sizes.xxxl + 16,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ageLabel: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: SPACING.xs,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  sliderLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tipContainer: {
    alignItems: 'center',
  },
  tipText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  goalsContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  goalButtonWrapper: {
    marginBottom: SPACING.md,
  },
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.medium,
  },
  goalButtonSelected: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
  },
  goalEmoji: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  goalText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.white,
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: COLORS.text.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  levelInfo: {
    flex: 1,
  },
  levelSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: SPACING.xs,
  },
  buttonWrapper: {
    marginTop: SPACING.lg,
  },
  button: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.text.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    letterSpacing: 1,
  },
});
