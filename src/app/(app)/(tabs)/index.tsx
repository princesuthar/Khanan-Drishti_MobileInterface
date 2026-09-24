import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MetricCard, QuickActionCard, SyncStatusCard } from '@/components/dashboard';
import { Badge, Card, Screen } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/providers/AuthProvider';
import { getMockDashboardData } from '@/types/dashboard';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const data = useMemo(() => getMockDashboardData(user?.role ?? 'worker'), [user?.role]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  const syncData = () => {
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 900);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text variant="bodyMedium" style={styles.greeting}>
            Good morning, {user?.displayName}
          </Text>
          <Text variant="headlineMedium" style={styles.title}>
            Field dashboard
          </Text>
        </View>
        <Badge icon="shield-check">{user?.role === 'inspector' ? 'Inspector' : 'Worker'}</Badge>
      </View>

      <Card mode="contained" style={styles.siteCard}>
        <Text variant="labelLarge" style={styles.siteLabel}>
          ASSIGNED MINE / SITE
        </Text>
        <Text variant="titleLarge" style={styles.siteName}>
          {data.assignedSite}
        </Text>
        <Text variant="bodyMedium" style={styles.secondary}>
          {data.shift}
        </Text>
      </Card>

      <View style={styles.sectionHeader}>
        <Text variant="titleMedium">Today at a glance</Text>
        <Text variant="bodySmall" style={styles.secondary}>
          24 Sep 2026
        </Text>
      </View>
      <View style={styles.metrics}>
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </View>

      <SyncStatusCard status={syncStatus} lastSyncedAt={data.lastSyncedAt} />

      <Card mode="outlined" style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Text variant="titleMedium">High-risk alerts</Text>
          <Badge icon="alert">2 active</Badge>
        </View>
        {data.highRiskAlerts.map((alert) => (
          <View key={alert} style={styles.alertRow}>
            <View style={styles.alertDot} />
            <Text variant="bodyMedium" style={styles.alertText}>
              {alert}
            </Text>
          </View>
        ))}
      </Card>

      <Text variant="titleMedium">Quick actions</Text>
      <View style={styles.actions}>
        <QuickActionCard
          icon="clipboard-plus-outline"
          label="Start Inspection"
          onPress={() => router.push('../../start-inspection')}
        />
        <QuickActionCard
          icon="alert-plus-outline"
          label="Report Hazard"
          onPress={() => router.push('../../report-hazard')}
        />
        <QuickActionCard
          icon="history"
          label="Inspection History"
          onPress={() => router.push('../../inspection-history')}
        />
        <QuickActionCard icon="sync" label="Sync Data" onPress={syncData} />
      </View>

      <Text variant="labelLarge" onPress={logout} style={styles.logout}>
        Sign out
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerCopy: { flex: 1, gap: Spacing.one },
  greeting: { color: Colors.light.textSecondary },
  title: { color: Colors.light.text, fontWeight: '700' },
  siteCard: { padding: Spacing.four, backgroundColor: Colors.light.backgroundSelected },
  siteLabel: { color: Colors.light.primary, letterSpacing: 1 },
  siteName: { color: Colors.light.text, marginTop: Spacing.two },
  secondary: { color: Colors.light.textSecondary },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  alertCard: { borderColor: '#E7C778' },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.three, paddingBottom: Spacing.two },
  alertRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.three, paddingVertical: Spacing.two, gap: Spacing.two },
  alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.light.danger },
  alertText: { flex: 1 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: Spacing.two },
  logout: { color: Colors.light.danger, alignSelf: 'center', marginVertical: Spacing.two },
});
