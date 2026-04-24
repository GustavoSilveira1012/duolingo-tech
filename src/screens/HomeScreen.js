import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import Icon from '@expo/vector-icons/Feather';

export default function HomeScreen({ navigation }) {
  const { user, courses, getDashboardStats } = useAuth();

  if (!user) return null;

  const stats = getDashboardStats();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá, {user.name} 👋</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Streak + XP */}
      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.streak} 🔥</Text>
          <Text style={styles.statLabel}>Dias de streak</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.xp}</Text>
          <Text style={styles.statLabel}>XP total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>Nível {user.level}</Text>
          <Text style={styles.statLabel}>Progresso</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Escolha seu curso</Text>

      {/* Cards dos cursos */}
      {courses.map(course => (
        <TouchableOpacity
          key={course.id}
          style={[styles.courseCard, { borderLeftColor: course.color }]}
          onPress={() => navigation.navigate('Trail', { courseId: course.id })}
        >
          <Text style={styles.courseIcon}>{course.icon}</Text>
          <View>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDesc}>{course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardTitle}>Painel rapido</Text>
        <Text style={styles.dashboardItem}>Licoes concluidas: {stats.totalCompleted}</Text>
        <Text style={styles.dashboardItem}>Media de acerto: {stats.avgScore}%</Text>
        <Text style={styles.dashboardItem}>Tentativas registradas: {stats.totalAttempts}</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('CourseList')}>
          <Text style={styles.secondaryButtonText}>Ver trilhas completas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 28, fontWeight: 'bold', color: colors.text },
  statsCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 30, justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 14, color: '#666' },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: colors.text },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseIcon: { fontSize: 40, marginRight: 15 },
  courseName: { fontSize: 18, fontWeight: 'bold' },
  courseDesc: { fontSize: 14, color: '#666' },
  dashboardCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 14, marginBottom: 24 },
  dashboardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
  dashboardItem: { fontSize: 15, color: '#4E5D6C', marginBottom: 4 },
  secondaryButton: { marginTop: 10, backgroundColor: '#E9EEF2', borderRadius: 10, padding: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#2F3D4A', fontWeight: '600' },
});