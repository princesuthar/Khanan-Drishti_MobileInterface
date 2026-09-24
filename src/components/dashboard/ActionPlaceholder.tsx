import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Button, Card, Screen } from '@/components/ui';
import { Colors } from '@/constants/theme';

export function ActionPlaceholder({ title, description }: { title: string; description: string }) {
  const router = useRouter();
  return (
    <Screen>
      <Text variant="headlineMedium">{title}</Text>
      <Card contentStyle={styles.cardContent}>
        <Text variant="bodyLarge">{description}</Text>
        <Text variant="bodyMedium" style={styles.note}>
          This workflow is reserved for a later implementation phase. The dashboard navigation is
          working correctly.
        </Text>
        <Button mode="outlined" onPress={() => router.back()}>
          Back to dashboard
        </Button>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardContent: { padding: 20, gap: 18 },
  note: { color: Colors.light.textSecondary },
});
