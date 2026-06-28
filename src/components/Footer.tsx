import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COPYRIGHT_TEXT, COPYRIGHT_URL } from '../config/env';

const Footer: React.FC = () => {
  const { colors } = useTheme();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    footer: {
      width: '100%',
      marginTop: 'auto',
      paddingTop: 32,
      paddingBottom: 32,
      borderTopWidth: 1,
      borderTopColor: colors.outlineVariant,
    },
    footerContent: {
      flexDirection: Platform.OS === 'web' ? 'row' : 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Platform.OS === 'web' ? 64 : 24,
      maxWidth: 1280,
      width: '100%',
      alignSelf: 'center',
    },
    copyrightText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    linkContainer: {
      flexDirection: 'row',
      gap: 24,
      marginTop: Platform.OS === 'web' ? 0 : 16,
    },
    linkText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    }
  });

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <TouchableOpacity onPress={() => handleLinkPress(COPYRIGHT_URL)}>
          <Text style={styles.copyrightText}>{COPYRIGHT_TEXT}</Text>
        </TouchableOpacity>
        
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => handleLinkPress('#')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('#')}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('#')}>
            <Text style={styles.linkText}>Security</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Footer;