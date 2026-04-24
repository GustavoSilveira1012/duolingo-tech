import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import Icon from '@expo/vector-icons/Feather';

export default function TrailScreen({ route, navigation }) {
  const { courseId } = route.params;
  const { courses, getCourseProgress, startCourse } = useAuth();

  const course = courses.find(c => c.id === courseId);
  const progress = getCourseProgress(courseId);

  useEffect(() => {
    startCourse(courseId);
  }, [courseId]);

  if (!course) return <Text>Curso não encontrado</Text>;

  const allLessons = course.modules.flatMap((module) => module.lessons.map((lesson) => ({
    moduleId: module.id,
    lesson,
  })));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.subtitle}>{course.description}</Text>

      {course.modules.map((module, moduleIndex) => (
        <View key={module.id} style={styles.module}>
          <Text style={styles.moduleTitle}>
            Módulo {module.order}: {module.title}
          </Text>

          {module.lessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const globalIndex = allLessons.findIndex((item) => item.lesson.id === lesson.id);
            const prevLesson = globalIndex > 0 ? allLessons[globalIndex - 1].lesson : null;
            const isLocked = prevLesson ? !progress.completedLessons.includes(prevLesson.id) : false;

            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  isCompleted && styles.completed,
                  isLocked && styles.locked,
                ]}
                onPress={() => {
                  if (!isLocked) {
                    navigation.navigate('Lesson', { courseId, lessonId: lesson.id, moduleId: module.id });
                  }
                }}
                disabled={isLocked}
              >
                <Text style={styles.lessonNumber}>{globalIndex + 1}</Text>
                <Text style={[styles.lessonTitle, isCompleted && { textDecorationLine: 'line-through' }]}>
                  {lesson.title}
                </Text>
                {isCompleted && <Icon name="check-circle" size={20} color={colors.primary} />}
                {isLocked && <Icon name="lock" size={20} color="#999" />}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  module: { marginBottom: 30 },
  moduleTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: colors.primary },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  completed: { backgroundColor: '#E8F5E9' },
  locked: { opacity: 0.6 },
  lessonNumber: { fontSize: 18, fontWeight: 'bold', marginRight: 15, color: colors.primary },
  lessonTitle: { flex: 1, fontSize: 16 },
});