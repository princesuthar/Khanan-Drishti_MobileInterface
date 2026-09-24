import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import type { DashboardMetric } from '@/types/dashboard';
import { Colors, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui';

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const color =
    metric.tone === 'primary'
      ? Colors.light.primary
      : metric.tone === 'warning'
        ? Colors.light.warning
        : metric.tone === 'danger'
          ? Colors.light.danger
          : Colors.light.textSecondary;

  return (
    <Card mode="outlined" style={styles.card}>
      <View style={styles.content}>
        <Icon source={metric.icon} size={22} color={color} />
        <Text variant="headlineSmall" style={[styles.value, { color }]}>
          {metric.value}
        </Text>
        <Text variant="bodySmall" style={styles.label}>
          {metric.label}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 150, borderColor: Colors.light.border },
  content: { padding: Spacing.three, gap: Spacing.two },
  value: { fontWeight: '700' },
  label: { color: Colors.light.textSecondary, minHeight: 34 },
});
