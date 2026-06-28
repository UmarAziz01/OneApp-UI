import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Animated,
  Alert,
  TextInput, // Tambahkan import TextInput untuk tipe data Ref
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

// 1. Definisikan interface untuk Props komponen
interface LoginScreenProps {
  navigation: any; // Anda bisa mengganti dengan tipe rute StackNavigationProp jika dibutuhkan
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { colors, isDark } = useTheme();
  const { isMobile, isTablet, isDesktop, cardPadding, horizontalPadding, fontSize } = useResponsive();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // 2. Berikan tipe generik <TextInput> agar fungsi .focus() dikenali oleh TypeScript
  const passwordRef = useRef<TextInput>(null);
  const hasAnimated = useRef(false);

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
  }, [fadeAnim, slideAnim]);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Login successful!');
    }, 1500);
  };

  const ssoSize = isMobile ? 48 : isTablet ? 56 : 64;
  const ssoIconSize = isMobile ? 22 : isTablet ? 26 : 30;

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
                {/* Header with gradient text */}
                <View style={styles.headerSection}>
                  <Text
                    style={[
                      styles.brandText,
                      { color: colors.text, fontSize: fontSize.brand },
                    ]}
                  >
                    <Text style={{ color: colors.primary }}>{APP_NAME}</Text>
                  </Text>
                  <Text style={[styles.subtitleText, { color: colors.textSecondary, fontSize: fontSize.subtitle }]}>
                    Selamat datang kembali. Silakan masuk ke akun Anda.
                  </Text>
                </View>

                {/* Login Form */}
                <View style={styles.formSection}>
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Email atau Nama Pengguna
                    </Text>
                    <GlassInput
                      icon="person-outline"
                      placeholder="user@azizlab.my.id"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  </View>

                  <View style={[styles.inputSpacing, { height: isMobile ? 20 : 24 }]} />

                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                      Kata Sandi
                    </Text>
                    <GlassInput
                      icon="lock-closed-outline"
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                      inputRef={passwordRef}
                    />
                  </View>

                  {/* Remember Me & Forgot Password */}
                  <View style={styles.rememberRow}>
                    <TouchableOpacity
                      onPress={() => setRememberMe(!rememberMe)}
                      style={styles.rememberTouchable}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          {
                            borderColor: colors.glassBorder,
                            backgroundColor: rememberMe ? colors.primary : 'transparent',
                          },
                        ]}
                      >
                        {rememberMe && (
                          <Ionicons name="checkmark" size={12} color={colors.onPrimary} />
                        )}
                      </View>
                      <Text style={[styles.rememberText, { color: colors.textSecondary, fontSize: fontSize.body }]}>
                        Ingat Saya
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                      <Text style={[styles.forgotText, { color: colors.primary, fontSize: fontSize.body }]}>
                        Lupa Kata Sandi?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.buttonSpacing, { height: isMobile ? 24 : 28 }]} />
                  
                  <GlassButton
                    title="Masuk"
                    onPress={handleLogin}
                    loading={loading}
                    variant="primary"
                  />
                </View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={[styles.dividerLine, { borderColor: colors.glassBorder }]} />
                  <Text style={[styles.dividerText, { color: colors.textSecondary, fontSize: fontSize.small }]}>
                    atau lanjutkan dengan
                  </Text>
                  <View style={[styles.dividerLine, { borderColor: colors.glassBorder }]} />
                </View>

                {/* SSO Buttons */}
                <View style={[styles.ssoContainer, { gap: isMobile ? 10 : isTablet ? 14 : 18 }]}>
                  {(() => {
                    const ssoProviders = [
                      { 
                        label: 'Google',
                        src: isDark
                          ? 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/google-light.webp'
                          : 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/google-dark.webp',
                      },
                      { 
                        label: 'Github',
                        src: isDark
                          ? 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/github-light.webp'
                          : 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/github-dark.webp',
                      },                      
                      { 
                        label: 'Keycloak',
                        src: isDark
                          ? 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/keycloak-light.webp'
                          : 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/keycloak-dark.webp',
                      },
                      { 
                        label: 'Authentik',
                        src: isDark
                          ? 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/authentik-light.webp'
                          : 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/authentik-dark.webp',
                      },
                    ];
                    return ssoProviders.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.ssoButton,
                          {
                            backgroundColor: colors.glassBackground,
                            borderColor: colors.glassBorder,
                            width: ssoSize,
                            height: ssoSize,
                            borderRadius: ssoSize / 3,
                          },
                        ]}
                        activeOpacity={0.7}
                      >
                        <Image
                          source={{ uri: item.src }}
                          style={[styles.ssoIcon, { width: ssoIconSize, height: ssoIconSize }]}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ));
                  })()}
                </View>
              </GlassCard>
            </View>

            {/* Footer Link */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.footer }]}>
                Belum memiliki akun?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.footerLink, { color: colors.primary, fontSize: fontSize.footer }]}>
                  Daftar di sini
                </Text>
              </TouchableOpacity>
            </View>

            {/* Disclaimer */}
            <View style={styles.disclaimer}>
              <Text style={[styles.disclaimerText, { color: colors.textSecondary, fontSize: fontSize.small }]}>
                Dengan masuk, Anda menyetujui{' '}
                <Text style={[styles.disclaimerLink, { color: colors.primary }]}>
                  Ketentuan Layanan
                </Text>{' '}
                dan{' '}
                <Text style={[styles.disclaimerLink, { color: colors.primary }]}>
                  Kebijakan Privasi
                </Text>{' '}
                kami.
              </Text>
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
  brandText: {
    fontWeight: '800',
    letterSpacing: -0.5,
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
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rememberTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberText: {
    fontWeight: '600',
  },
  forgotText: {
    fontWeight: '600',
  },
  buttonSpacing: {},
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  dividerLine: {
    flex: 1,
    borderTopWidth: 1,
  },
  dividerText: {
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
  },
  ssoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  ssoButton: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ssoIcon: {},
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
  disclaimer: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  disclaimerText: {
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.7,
  },
  disclaimerLink: {
    fontWeight: '600',
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
});

export default LoginScreen;