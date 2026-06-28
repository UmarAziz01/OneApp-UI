import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import GlassCard from './GlassCard';
import { MaterialIcons } from '@expo/vector-icons';

interface AppItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const apps: AppItem[] = [
  { id: '1', title: 'Mail', description: 'Unified encrypted communication hub for professional teams and private messaging.', icon: 'mail' },
  { id: '2', title: 'Cloud', description: 'Secure distributed storage with biometric secondary authentication gates.', icon: 'cloud' },
  { id: '3', title: 'Analytics', description: 'Real-time usage metrics and security threat assessment visualization dashboard.', icon: 'analytics' },
  { id: '4', title: 'Vault', description: 'Military-grade password manager and secrets rotation system for DevOps.', icon: 'enhanced-encryption' },
  { id: '5', title: 'Shield', description: 'Global VPN and identity masking service for sensitive operational tasks.', icon: 'verified-user' },
  { id: '6', title: 'Nodes', description: 'Infrastructure health monitor and multi-region deployment orchestration.', icon: 'hub' },
];

const MainBody: React.FC = () => {
  const { colors } = useTheme();
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const styles = StyleSheet.create({
    container: {
      paddingTop: 32,
      paddingBottom: 24,
      paddingHorizontal: 16,
      maxWidth: 1024,
      alignSelf: 'center',
      width: '100%',
    },
    headerSection: {
      flexDirection: Platform.OS === 'web' ? 'row' : 'column',
      justifyContent: 'space-between',
      alignItems: Platform.OS === 'web' ? 'flex-end' : 'flex-start',
      marginBottom: 48,
      gap: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 18,
      color: colors.textSecondary,
      maxWidth: 500,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    card: {
      marginBottom: 16,
    },
    appItem: {
      padding: 24,
      flexDirection: viewMode === 'list' ? 'row' : 'column',
      alignItems: viewMode === 'list' ? 'center' : 'flex-start',
      gap: 16,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.primaryContainer + '20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.outlineVariant,
    },
    appTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: viewMode === 'grid' ? 16 : 0,
    },
    appDesc: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.title}>Applications</Text>
          <Text style={styles.description}>Welcome back, Aziz. Manage your secure authentication ecosystem.</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setShowDescriptions(!showDescriptions)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ color: colors.textSecondary }}>Show Descriptions</Text>
            <MaterialIcons name={showDescriptions ? 'toggle-on' : 'toggle-off'} size={32} color={colors.primary} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TouchableOpacity onPress={() => setViewMode('grid')} style={{ padding: 8, backgroundColor: viewMode === 'grid' ? colors.primary : colors.surfaceContainer }}>
              <MaterialIcons name="grid-view" size={24} color={viewMode === 'grid' ? colors.onPrimary : colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewMode('list')} style={{ padding: 8, backgroundColor: viewMode === 'list' ? colors.primary : colors.surfaceContainer }}>
              <MaterialIcons name="list" size={24} color={viewMode === 'list' ? colors.onPrimary : colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={apps}
        key={viewMode}
        numColumns={viewMode === 'grid' ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GlassCard style={[styles.card, { marginHorizontal: 8 }]}>
            <View style={styles.appItem}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={item.icon as any} size={32} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.appTitle}>{item.title}</Text>
                {showDescriptions && <Text style={styles.appDesc}>{item.description}</Text>}
              </View>
            </View>
          </GlassCard>
        )}
      />
    </View>
  );
};

export default MainBody;