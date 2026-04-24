import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import Icon from '@expo/vector-icons/Feather';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => {
        logout();
        navigation.replace('Login');
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statBig}>{user.level}</Text>
          <Text style={styles.statLabel}>Nível</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statBig}>{user.xp}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statBig}>{user.streak} 🔥</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CourseList')}>
        <Icon name="book" size={22} color="#666" />
        <Text style={styles.menuText}>Meus cursos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

      <Text style={styles.version}>TechDuolingo v1.0 - MVP Faculdade</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 26, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666' },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statBig: { fontSize: 32, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuText: { marginLeft: 15, fontSize: 17 },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  version: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 12 },
});