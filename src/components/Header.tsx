import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { APP_NAME } from '../config/env';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header: React.FC = () => {
  const { colors, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Helper for web-specific styling for fixed header and backdrop-filter
  const headerStyle = Platform.select({
    web: {
      width: '100%' as any,
      top: 0,
      left: 0,
      zIndex: 50,
    },
    default: {},
  });

  const glassPanelStyle = Platform.select({
    web: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.37)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.37,
      shadowRadius: 32,
    },
    default: {
      backgroundColor: colors.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
  });

  const styles = StyleSheet.create({
    headerContainer: {
      ...headerStyle,
      paddingTop: insets.top,
      backgroundColor: Platform.OS === 'web' ? 'transparent' : colors.surface,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Platform.OS === 'web' ? 24 : 16, // px-6 md:px-16
      paddingVertical: Platform.OS === 'web' ? 16 : 10, // py-4
      maxWidth: 1024, // max-w-7xl
      alignSelf: 'center',
      width: '100%',
    },
    appNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8, // gap-2
    },
    appNameText: {
      fontSize: Platform.OS === 'web' ? 48 : 32, // display-lg-mobile md:text-display-lg
      fontWeight: '700', // font-display-lg
      color: colors.primary, // Fallback, actual gradient handled by web CSS or native LinearGradient
    },
    profileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
      padding: 8, // p-2
      borderRadius: 12, // rounded-xl
      ...glassPanelStyle,
    },
    profileInfo: {
      textAlign: 'right',
      display: Platform.OS === 'web' ? 'flex' : 'none', // hidden sm:block
    },
    profileName: {
      fontSize: 14, // text-sm
      color: colors.text, // Corrected from colors.onSurface
      lineHeight: 18, // leading-tight
      fontWeight: '600', // font-headline-md
    },
    profileEmail: {
      fontSize: 10, // text-[10px]
      color: colors.textSecondary, // Corrected from colors.onSurfaceVariant
      fontWeight: '600', // font-label-sm
    },
    profileImageContainer: {
      width: 40, // w-10
      height: 40, // h-10
      borderRadius: 20, // rounded-full
      overflow: 'hidden', // Corrected from 'scroll'
      borderWidth: 1,
      borderColor: colors.primary + '30', // border-primary/30
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dropdownIcon: {
      color: colors.textSecondary, // Corrected from colors.onSurfaceVariant
    },
    dropdown: {
      position: 'absolute',
      right: 0,
      marginTop: 12, // mt-3
      width: 224, // w-56
      borderRadius: 16, // rounded-2xl
      padding: 8, // p-2
      ...glassPanelStyle,
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
      paddingHorizontal: 16, // px-4
      paddingVertical: 12, // py-3
      borderRadius: 8, // rounded-lg
    },
    dropdownItemText: {
      fontSize: 14, // text-sm
      color: colors.text, // Corrected from colors.onSurface
      fontWeight: '400', // font-body-md
    },
    dropdownItemIcon: {
      color: colors.primary,
    },
    logoutItemText: {
      color: colors.error,
    },
    separator: {
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant, // Corrected from colors.white + '0C'
      marginVertical: 8, // my-2
    }
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.appNameContainer}>
          <Text style={styles.appNameText}>{APP_NAME}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.profileButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Aziz</Text>
              <Text style={styles.profileEmail}>aziz@azizlab.my.id</Text>
            </View>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO9Y5o-iXTMc4mFHzQkPCEQHxswgm7ftTZqGdOhb37svCXgNk6AysALZM8GZUPAELLpMDPx52dVlgA_ddq7_6YaEannDULXV_JwWUwQ02wYijRmYT_t5FxthvcprIMjJsZBmLNQBY6HmDdrz207lED1BIYp4jJvS6kyA1U7ffyneYJE07k0GKHtlKiWZEcqQCWmVAQUDt4cVf456BoL9DOv059pdOFIbV6X6SjryhLQWUVVchMGzrCdMK3Ve0WRW_IW_h82TQUjxTC' }}
                style={styles.profileImage as any}
              />
            </View>
            <MaterialIcons name="expand-more" size={24} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <MaterialIcons name="person" size={20} style={styles.dropdownItemIcon} />
                <Text style={styles.dropdownItemText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <MaterialIcons name="settings" size={20} style={styles.dropdownItemIcon} />
                <Text style={styles.dropdownItemText}>Settings</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={[styles.dropdownItem, { backgroundColor: colors.error + '20' }]}>
                <MaterialIcons name="logout" size={20} color={colors.error} />
                <Text style={[styles.dropdownItemText, styles.logoutItemText]}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
