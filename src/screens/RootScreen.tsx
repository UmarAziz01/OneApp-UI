import React from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import Header from '../components/Header';
import MainBody from '../components/MainBody';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground'; // Assuming AnimatedBackground is for the background effect

const RootScreen: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    safeAreaProvider: {
      flex: 1,
      backgroundColor: colors.background, // Ensure background color is applied
    },
    safeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
      // No explicit background color here, as it's handled by SafeAreaProvider and AnimatedBackground
    },
    // AnimatedBackground will be rendered separately and will cover the whole screen
  });

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
        <Header />
        {/* Main content scrollable area */}
        <ScrollView contentContainerStyle={styles.container}>
          <MainBody />
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootScreen;