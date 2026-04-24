import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';

export default function CourseListScreen({ navigation }) {
  const { courses } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cursos Disponíveis</Text>
      {courses.map(course => (
        <TouchableOpacity
          key={course.id}
          style={styles.card}
          onPress={() => navigation.navigate('Trail', { courseId: course.id })}
        >
          <Text style={[styles.icon, { color: course.color }]}>{course.icon}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{course.name}</Text>
            <Text style={styles.desc}>{course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: colors.text },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: { fontSize: 48, marginRight: 20 },
  info: { flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold' },
  desc: { fontSize: 15, color: '#666' },
});