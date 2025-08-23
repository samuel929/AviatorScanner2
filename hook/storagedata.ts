import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T = string>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item != null ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error loading "${key}" from AsyncStorage`, error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [initialValue, key]);

  // Save value
  const setValue = useCallback(
    async (value: T) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        console.error(`Error saving "${key}" to AsyncStorage`, error);
      }
    },
    [key],
  );

  // Remove value
  const removeValue = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error(`Error removing "${key}" from AsyncStorage`, error);
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue, loading };
}
