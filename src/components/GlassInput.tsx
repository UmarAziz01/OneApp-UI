import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

// Tambahkan interface untuk mendefinisikan tipe props
interface GlassInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  inputRef?: React.RefObject<TextInput| null>;
  blurred?: boolean;
}

const GlassInput = ({
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType,
  onSubmitEditing,
  inputRef,
  blurred = false,
  ...props
}: GlassInputProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const internalRef = useRef<TextInput>(null);
  const ref = inputRef || internalRef;

  const isPassword = secureTextEntry;

  React.useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, focusAnim]);

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.inputBorder, colors.inputFocusBorder],
  });

  const tint = 'dark';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor,
          backgroundColor: 'transparent',
          borderRadius: 12,
          borderWidth: 1,
        },
        Platform.OS === 'web' && {
          boxShadow: isFocused
            ? `0 0 0 4px rgba(192, 193, 255, 0.1)`
            : 'none',
        } as any, // Tambahkan 'as any' untuk bypass validasi style web
      ]}
    >
      <BlurView
        intensity={isFocused ? 8 : 5}
        tint={tint}
        // BlurView di Expo 50+ mungkin tidak lagi menerima borderRadius secara langsung sebagai prop. 
        // Jika error, hapus baris di bawah dan pindahkan ke style prop.
        style={[StyleSheet.absoluteFill, { borderRadius: 12 }] as any}
      />
      <View style={styles.inner}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            { color: colors.text },
            icon && styles.inputWithIcon,
            Platform.OS === 'web' && { outlineStyle: 'none' } as any, // Bypass TS error untuk properti web
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  inputWithIcon: {
    marginLeft: 0,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default GlassInput;