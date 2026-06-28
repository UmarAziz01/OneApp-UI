import Constants from 'expo-constants';

// Expo managed workflow reads EXPO_PUBLIC_* from .env automatically
// For bare workflow / development builds, expo-constants may be needed
const getEnvVar = (key: string, defaultValue: string): string => {
  // In Expo managed workflow, process.env is available
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Fallback to expo-constants extra if configured
  if (Constants?.expoConfig?.extra?.[key]) {
    return Constants.expoConfig.extra[key];
  }
  return defaultValue;
};

export const APP_NAME = getEnvVar('EXPO_PUBLIC_APP_NAME', 'App');