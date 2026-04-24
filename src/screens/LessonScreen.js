import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';

export default function LessonScreen({ route, navigation }) {
  const { courseId, lessonId } = route.params;
  const { courses, completeLesson, getCourseProgress } = useAuth();

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
  const progress = getCourseProgress(courseId);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  if (!lesson || !lesson.exercises.length) {
    return <Text style={styles.container}>Lição sem exercícios ainda.</Text>;
  }

  const exercise = lesson.exercises[currentExerciseIndex];

  const isAnswerCorrect = (exerciseData, answerIndex) => {
    return answerIndex === exerciseData.correct;
  };

  const handleAnswer = async (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = isAnswerCorrect(exercise, answerIndex);

    if (isCorrect) {
      setCorrectAnswers((value) => value + 1);
    }
  };

  const nextExercise = async () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const total = lesson.exercises.length;
      const score = Math.round((correctAnswers / total) * 100);

      if (score < 70) {
        Alert.alert(
          'Tente novamente',
          `Você fez ${score}% de acerto. O mínimo para concluir é 70%.`,
          [{ text: 'Refazer lição', onPress: () => navigation.replace('Lesson', { courseId, lessonId }) }]
        );
        return;
      }

      const xpGained = 25 + score;

      try {
        await completeLesson(courseId, lessonId, score, xpGained);
        Alert.alert(
          'Lição concluída!',
          `Acerto: ${score}% | XP ganho: ${xpGained}`,
          [{ text: 'Voltar para trilha', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.explanation}>{lesson.explanation}</Text>

      <View style={styles.exerciseCard}>
        <Text style={styles.question}>{exercise.question}</Text>

        {exercise.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === index && styles.selectedOption,
            ]}
            onPress={() => handleAnswer(index)}
            disabled={showFeedback}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}

        {showFeedback && (
          <View style={styles.feedback}>
            <Text style={{ color: isAnswerCorrect(exercise, selectedAnswer) ? colors.primary : 'red', fontWeight: 'bold' }}>
              {isAnswerCorrect(exercise, selectedAnswer) ? 'Correto!' : 'Errado!'}
            </Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextExercise}>
              <Text style={styles.nextButtonText}>
                {currentExerciseIndex < lesson.exercises.length - 1 ? 'Próximo exercício' : 'Finalizar lição'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.progressText}>
        Exercício {currentExerciseIndex + 1} de {lesson.exercises.length}
      </Text>
      <Text style={styles.progressText}>Acertos atuais: {correctAnswers}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  lessonTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  explanation: { fontSize: 16, color: '#444', marginBottom: 30, lineHeight: 24 },
  exerciseCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  question: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  option: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 10 },
  selectedOption: { backgroundColor: colors.primary, color: '#fff' },
  feedback: { marginTop: 20, alignItems: 'center' },
  nextButton: { marginTop: 15, backgroundColor: colors.primary, padding: 15, borderRadius: 12, width: '100%', alignItems: 'center' },
  nextButtonText: { color: '#fff', fontWeight: 'bold' },
  progressText: { textAlign: 'center', color: '#666', marginTop: 10 },
});