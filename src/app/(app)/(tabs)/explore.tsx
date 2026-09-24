import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Badge, Card, Screen } from '@/components/ui';

export default function FoundationScreen() {
  return (
    <Screen>
      <Text variant="headlineMedium">App foundation</Text>
      <Card contentStyle={styles.cardContent}>
        <Text variant="titleMedium">Navigation is ready</Text>
        <Text variant="bodyMedium" style={styles.body}>
          This area is reserved for future field features. No operational workflow is enabled yet.
        </Text>
        <Badge icon="map-marker-outline">Future feature area</Badge>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardContent: { padding: 16 },
  body: { marginVertical: 16 },
});
