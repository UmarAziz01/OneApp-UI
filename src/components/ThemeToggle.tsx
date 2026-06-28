import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

// 1. Definisikan tipe untuk Props
interface ThemeToggleProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const ThemeToggle = ({ size = 44, style }: ThemeToggleProps) => {
  const { isDark, toggleTheme } = useTheme();
  const animValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(animValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  }, [isDark, animValue]);

  const rotate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <BlurView
        intensity={30}
        tint="light"
        style={[
          styles.blur,
          { borderRadius: size / 2 },
        ]}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={size * 0.5}
            color={isDark ? '#FFD700' : '#FF8C00'}
          />
        </Animated.View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;