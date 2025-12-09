import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1); // 1 = âge, 2 = objectif, 3 = niveau
  const [age, setAge] = useState(30);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

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
      // Navigation vers l'écran de destination
      navigation.navigate('Destination');
      console.log('Profil complété:', { age, goal: selectedGoal, level: selectedLevel });
    }
  };

  const renderAgeStep = () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎂</Text>
        <Text style={styles.title}>Quel âge as-tu ?</Text>
        
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={15}
            maximumValue={75}
            value={age}
            onValueChange={setAge}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#000000"
            step={1}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>15</Text>
            <Text style={styles.ageValue}>{Math.round(age)} ans</Text>
            <Text style={styles.sliderLabel}>75</Text>
          </View>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            💡 Pour adapter{'\n'}nos recommandations
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGoalStep = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.title}>Ton objectif ?</Text>

          <View style={styles.goalsContainer}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalButton,
                  selectedGoal === goal.id && styles.goalButtonSelected,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <Text
                  style={[
                    styles.goalText,
                    selectedGoal === goal.id && styles.goalTextSelected,
                  ]}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              !selectedGoal && styles.buttonDisabled,
            ]}
            onPress={handleNext}
            disabled={!selectedGoal}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderLevelStep = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>📊</Text>
          <Text style={styles.title}>Ton niveau ?</Text>

          <View style={styles.goalsContainer}>
            <TouchableOpacity
              style={[
                styles.goalButton,
                selectedLevel === 'beginner' && styles.goalButtonSelected,
              ]}
              onPress={() => setSelectedLevel('beginner')}
            >
              <Text style={styles.goalEmoji}>🟢</Text>
              <View style={styles.levelInfo}>
                <Text
                  style={[
                    styles.goalText,
                    selectedLevel === 'beginner' && styles.goalTextSelected,
                  ]}
                >
                  Débutant
                </Text>
                <Text
                  style={[
                    styles.levelSubtext,
                    selectedLevel === 'beginner' && styles.levelSubtextSelected,
                  ]}
                >
                  (0-10 km/semaine)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalButton,
                selectedLevel === 'intermediate' && styles.goalButtonSelected,
              ]}
              onPress={() => setSelectedLevel('intermediate')}
            >
              <Text style={styles.goalEmoji}>🟡</Text>
              <View style={styles.levelInfo}>
                <Text
                  style={[
                    styles.goalText,
                    selectedLevel === 'intermediate' && styles.goalTextSelected,
                  ]}
                >
                  Intermédiaire
                </Text>
                <Text
                  style={[
                    styles.levelSubtext,
                    selectedLevel === 'intermediate' && styles.levelSubtextSelected,
                  ]}
                >
                  (10-30 km/semaine)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalButton,
                selectedLevel === 'advanced' && styles.goalButtonSelected,
              ]}
              onPress={() => setSelectedLevel('advanced')}
            >
              <Text style={styles.goalEmoji}>🔴</Text>
              <View style={styles.levelInfo}>
                <Text
                  style={[
                    styles.goalText,
                    selectedLevel === 'advanced' && styles.goalTextSelected,
                  ]}
                >
                  Avancé
                </Text>
                <Text
                  style={[
                    styles.levelSubtext,
                    selectedLevel === 'advanced' && styles.levelSubtextSelected,
                  ]}
                >
                  (30+ km/semaine)
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  if (step === 1) return renderAgeStep();
  if (step === 2) return renderGoalStep();
  return renderLevelStep();
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#666666',
  },
  ageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  tipContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  tipText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  goalsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  goalButtonSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  goalEmoji: {
    fontSize: 28,
    marginRight: 15,
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  goalTextSelected: {
    color: '#FFFFFF',
  },
  levelInfo: {
    flex: 1,
  },
  levelSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  levelSubtextSelected: {
    color: '#CCCCCC',
  },
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

