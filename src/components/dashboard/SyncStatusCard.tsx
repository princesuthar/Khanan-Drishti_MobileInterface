import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { Badge, Card } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

type SyncStatusCardProps = {
  status: 'synced' | 'syncing';
  lastSyncedAt: string;
};

export function SyncStatusCard({ status, lastSyncedAt }: SyncStatusCardProps) {
  const isSyncing = status === 'syncing';
  return (
    <Card mode="outlined" style={styles.card}>
      <View style={styles.row}>
        <Icon
          source={isSyncing ? 'sync' : 'cloud-check-outline'}
          size={24}
          color={isSyncing ? Colors.light.warning : Colors.light.primary}
        />
        <View style={styles.copy}>
          <Text variant="titleSmall">Data sync</Text>
          <Text variant="bodySmall" style={styles.secondary}>
            {isSyncing ? 'Uploading pending field updates...' : `Last synced ${lastSyncedAt}`}
          </Text>
        </View>
        <Badge icon={isSyncing ? 'clock-outline' : 'check-circle-outline'}>
          {isSyncing ? 'Syncing' : 'Online'}
        </Badge>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderColor: Colors.light.border },
  row: { flexDirection: 'row', alignItems: 'center', padding: Spacing.three, gap: Spacing.two },
  copy: { flex: 1, gap: Spacing.one },
  secondary: { color: Colors.light.textSecondary },
});
