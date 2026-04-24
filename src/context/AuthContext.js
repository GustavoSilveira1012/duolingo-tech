import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '../utils/storage';
import { courses } from '../data/mockData';

const AuthContext = createContext();
const MIN_SCORE_TO_COMPLETE = 70;

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

function getDefaultCourseProgress() {
  return {
    currentModule: 0,
    currentLesson: 0,
    completedLessons: [],
    lessonHistory: [],
    xp: 0,
    startedAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});

  // Carregar dados do usuário ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const session = await Storage.get('session');
      const savedUser = await Storage.get('user');
      const savedProgress = await Storage.get('progress') || {};

      if (session?.isLoggedIn && savedUser) {
        setUser(savedUser);
        setProgress(savedProgress);
      }
    };
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    const sanitizedEmail = normalizeEmail(email);
    const existingUser = await Storage.get('user');
    if (existingUser && normalizeEmail(existingUser.email) === sanitizedEmail) {
      throw new Error('Email já cadastrado!');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: sanitizedEmail,
      password, // Em produção use hash!
      xp: 0,
      level: 1,
      streak: 0,
      lastStudyDate: null,
      photo: null,
    };

    await Storage.set('user', newUser);
    await Storage.set('session', { isLoggedIn: true });
    setUser(newUser);
    setProgress({});
    await Storage.set('progress', {});
    return newUser;
  };

  const login = async (email, password) => {
    const sanitizedEmail = normalizeEmail(email);
    const savedUser = await Storage.get('user');
    if (!savedUser || normalizeEmail(savedUser.email) !== sanitizedEmail || savedUser.password !== password) {
      throw new Error('Email ou senha incorretos');
    }
    await Storage.set('session', { isLoggedIn: true });
    setUser(savedUser);
    const savedProgress = await Storage.get('progress') || {};
    setProgress(savedProgress);
    return savedUser;
  };

  const logout = async () => {
    setUser(null);
    setProgress({});
    await Storage.set('session', { isLoggedIn: false });
  };

  const updateUser = async (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    await Storage.set('user', updatedUser);
  };

  // ====================== PROGRESSO ======================
  const getCourseProgress = (courseId) => {
    return progress[courseId] || getDefaultCourseProgress();
  };

  const startCourse = async (courseId) => {
    if (progress[courseId]) return progress[courseId];
    const next = getDefaultCourseProgress();
    await saveProgress(courseId, next);
    return next;
  };

  const saveProgress = async (courseId, newProgress) => {
    const updatedProgress = { ...progress, [courseId]: newProgress };
    setProgress(updatedProgress);
    await Storage.set('progress', updatedProgress);
  };

  const completeLesson = async (courseId, lessonId, score, xpGained) => {
    if (score < MIN_SCORE_TO_COMPLETE) {
      throw new Error(`Pontuação mínima para concluir é ${MIN_SCORE_TO_COMPLETE}%`);
    }

    let courseProg = getCourseProgress(courseId);

    // Atualiza XP do usuário
    const newUser = { ...user, xp: user.xp + xpGained };
    // Subir de nível a cada 200 XP
    const newLevel = Math.floor(newUser.xp / 200) + 1;
    newUser.level = newLevel;

    // Atualiza streak
    const today = new Date().toISOString().split('T')[0];
    if (user.lastStudyDate !== today) {
      newUser.streak = (user.streak || 0) + 1;
      newUser.lastStudyDate = today;
    }

    await updateUser(newUser);

    // Marca lição como concluída
    if (!courseProg.completedLessons.includes(lessonId)) {
      courseProg.completedLessons.push(lessonId);
    }

    // Atualiza progresso da trilha
    courseProg.xp += xpGained;
    courseProg.currentLesson = lessonId;
    courseProg.lessonHistory = [
      ...(courseProg.lessonHistory || []),
      { lessonId, score, xpGained, completedAt: new Date().toISOString() }
    ];

    await saveProgress(courseId, courseProg);
  };

  const getDashboardStats = () => {
    const progressList = Object.values(progress);
    const totalCompleted = progressList.reduce((acc, item) => acc + (item.completedLessons?.length || 0), 0);
    const totalXp = progressList.reduce((acc, item) => acc + (item.xp || 0), 0);
    const totalAttempts = progressList.reduce((acc, item) => acc + (item.lessonHistory?.length || 0), 0);
    const avgScore = totalAttempts === 0
      ? 0
      : Math.round(
        progressList
          .flatMap((item) => item.lessonHistory || [])
          .reduce((acc, h) => acc + h.score, 0) / totalAttempts
      );

    return {
      totalCompleted,
      totalXp,
      totalAttempts,
      avgScore,
    };
  };

  return (
    <AuthContext.Provider value={{
      user,
      progress,
      register,
      login,
      logout,
      updateUser,
      startCourse,
      getCourseProgress,
      completeLesson,
      getDashboardStats,
      courses // dados mockados
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);