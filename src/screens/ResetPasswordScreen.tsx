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

interface ResetPasswordScreenProps {
  navigation: any; 
}

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const { colors } = useTheme();
  const { isMobile, isTablet, isDesktop, cardPadding, horizontalPadding, fontSize } = useResponsive();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
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
  }, []);

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
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
                {sent ? (
                  // Success State
                  <View style={styles.successSection}>
                    <View style={[styles.successIconContainer, { backgroundColor: colors.glassBackground }]}>
                      <Ionicons
                        name="checkmark-circle"
                        size={56}
                        color={colors.success}
                      />
                    </View>
                    <Text style={[styles.successTitle, { color: colors.text, fontSize: fontSize.title }]}>
                      Email Terkirim!
                    </Text>
                    <Text style={[styles.successText, { color: colors.textSecondary, fontSize: fontSize.body }]}>
                      Kami telah mengirimkan instruksi reset kata sandi ke{' '}
                      <Text style={{ fontWeight: '700', color: colors.text }}>
                        {email}
                      </Text>
                    </Text>
                    <View style={[styles.buttonSpacing, { height: isMobile ? 24 : 28 }]} />
                    <GlassButton
                      title="Kembali ke Masuk"
                      onPress={() => navigation.navigate('Login')}
                      variant="primary"
                    />
                  </View>
                ) : (
                  <>
                    {/* Header */}
                    <View style={styles.headerSection}>
                      <Text style={[styles.titleText, { color: colors.text, fontSize: fontSize.title }]}>
                        Reset Kata Sandi
                      </Text>
                      <Text style={[styles.subtitleText, { color: colors.textSecondary, fontSize: fontSize.subtitle }]}>
                        Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset kata sandi Anda.
                      </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formSection}>
                      <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.label }]}>
                          Alamat Email
                        </Text>
                        <GlassInput
                          icon="mail-outline"
                          placeholder="user@azizlab.my.id"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          returnKeyType="done"
                          onSubmitEditing={handleReset}
                        />
                      </View>
                      <View style={[styles.buttonSpacing, { height: isMobile ? 24 : 28 }]} />
                      <GlassButton
                        title="Kirim Instruksi"
                        onPress={handleReset}
                        loading={loading}
                        variant="primary"
                      />
                    </View>
                  </>
                )}
              </GlassCard>
            </View>

            {/* Back to Login Link */}
            {!sent && (
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  style={styles.backButton}
                >
                  <Ionicons
                    name="arrow-back"
                    size={18}
                    color={colors.textSecondary}
                  />
                  <Text style={[styles.backText, { color: colors.textSecondary, fontSize: fontSize.footer }]}>
                    Kembali ke Masuk
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
  buttonSpacing: {},
  successSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  successIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  successTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  successText: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontWeight: '400',
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
});

export default ResetPasswordScreen;