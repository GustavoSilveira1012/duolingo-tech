import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  async get(key) { 
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  async set(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
};