import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Animated,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useResponsive } from '../utils/responsive';
import { APP_NAME } from '../config/env';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedBackground from '../components/AnimatedBackground';

interface RegisterScreenProps {
  navigation: any; 
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { colors } = useTheme();
  const { isMobile, isTablet, isDesktop, cardPadding, horizontalPadding, fontSize } = useResponsive();

  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const hasAnimated = useRef(false);

  const nimRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (hasAnimated.current) {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      return;
    }
    hasAnimated.current = true;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRegister = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!nim.trim()) {
      Alert.alert('Error', 'Please enter your NIM');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Account created successfully!');
    }, 1500);
  };

  return (
    <AnimatedBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: horizontalPadding },
            isDesktop && styles.desktopScroll,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: '100%',
              maxWidth: 480,
              alignSelf: 'center',
            }}
          >
            {/* Glassmorphism Card */}
            <View style={styles.cardWrapper}>
              <GlassCard borderRadius={16} padding={cardPadding}>
                {/* Header */}
                <View style={styles.headerSection}>
                  <Text style={[styles.titleText, { color: colors.text, fontSize: fontSize.title }]}>
                    Buat Akun
                  </Text>
                  <Text style={[styles.subtitleText, { color: colors.textSecondary, fontSize: fontSize.subtitle }]}>
                    Bergabunglah dengan ekosistem {APP_NAME}.
                  </Text>
                </View>

                {/* Registration Form */}
                <View style={styles.formSection}>
                  {/* Nama Lengkap */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Nama Lengkap
                    </Text>
                    <GlassInput
                      icon="person-outline"
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                      returnKeyType="next"
                      onSubmitEditing={() => nimRef.current?.focus()}
                    />
                  </View>

                  <View style={[styles.inputSpacing, { height: isMobile ? 20 : 24 }]} />

                  {/* NIM */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      NIM
                    </Text>
                    <GlassInput
                      icon="id-card-outline"
                      placeholder="Masukkan NIM (Nomor Induk Mahasiswa)"
                      value={nim}
                      onChangeText={setNim}
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                      inputRef={nimRef}
                    />
                  </View>

                  <View style={[styles.inputSpacing, { height: isMobile ? 20 : 24 }]} />

                  {/* Email */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Email
                    </Text>
                    <GlassInput
                      icon="mail-outline"
                      placeholder="Masukkan email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      inputRef={emailRef}
                    />
                  </View>

                  <View style={[styles.inputSpacing, { height: isMobile ? 20 : 24 }]} />

                  {/* Password */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Password
                    </Text>
                    <GlassInput
                      icon="lock-closed-outline"
                      placeholder="Buat password yang kuat"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      returnKeyType="next"
                      onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                      inputRef={passwordRef}
                    />
                  </View>

                  <View style={[styles.inputSpacing, { height: isMobile ? 20 : 24 }]} />

                  {/* Confirm Password */}
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Konfirmasi Password
                    </Text>
                    <GlassInput
                      icon="lock-closed-outline"
                      placeholder="Ulangi password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                      returnKeyType="done"
                      onSubmitEditing={handleRegister}
                      inputRef={confirmPasswordRef}
                    />
                  </View>

                  <View style={[styles.buttonSpacing, { height: isMobile ? 24 : 28 }]} />

                  <GlassButton
                    title="Daftar Sekarang"
                    onPress={handleRegister}
                    loading={loading}
                    variant="primary"
                  />
                </View>
              </GlassCard>
            </View>

            {/* Footer Link */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.footer }]}>
                Sudah memiliki akun?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.footerLink, { color: colors.primary, fontSize: fontSize.footer }]}>
                  Masuk di sini
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>

        <View style={[styles.themeToggleContainer, isDesktop && { bottom: 32, right: 32 }]}>
          <ThemeToggle />
        </View>
      </KeyboardAvoidingView>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  desktopScroll: {
    paddingTop: 80,
    paddingBottom: 60,
  },
  cardWrapper: {
    width: '100%',
    position: 'relative',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  titleText: {
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitleText: {
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
  formSection: {
    width: '100%',
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  inputSpacing: {},
  buttonSpacing: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontWeight: '400',
  },
  footerLink: {
    fontWeight: '700',
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
});

export default RegisterScreen;