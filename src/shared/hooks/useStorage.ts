import { useState } from "react";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const useStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getString(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log("Error reading MMKV storage", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.set(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log("Error setting MMKV storage", error);
    }
  };

  const removeValue = () => {
    try {
      storage.delete(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.log("Error removing MMKV storage", error);
    }
  };

  return { storedValue, setValue, removeValue } as const;
};

export default useStorage;
