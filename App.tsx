import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { APP_NAME } from './src/config/env';
import AuthNavigator from './src/navigation/AuthNavigator';

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      ResetPassword: 'forgot-password',
    },
  },
};

const AppContent = () => {
  const { colors, mode } = useTheme();

  // Set document title on web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = APP_NAME;
    }
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar style={colors.statusBar as StatusBarStyle} />
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
