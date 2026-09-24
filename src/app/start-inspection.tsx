import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Button, Card, Screen } from '@/components/ui';
import { Colors } from '@/constants/theme';
import { useInspectionDraft } from '@/providers/InspectionDraftProvider';
import { mockSites } from '@/types/inspection';

export default function StartInspectionRoute() {
  const router = useRouter();
  const { draft, setSite } = useInspectionDraft();
  return <Screen>
    <Text variant="headlineMedium">Select mine / site</Text>
    <Text variant="bodyMedium" style={styles.secondary}>Choose where this inspection is being completed.</Text>
    <Card>
      <RadioButton.Group onValueChange={(value) => {
        const site = mockSites.find((item) => item.id === value);
        if (site) setSite(site.id, site.name);
      }} value={draft.siteId}>
        {mockSites.map((site) => <RadioButton.Item key={site.id} label={site.name} value={site.id} />)}
      </RadioButton.Group>
    </Card>
    <Button disabled={!draft.siteId} onPress={() => router.push('../select-inspection-type')}>Continue</Button>
  </Screen>;
}
const styles = StyleSheet.create({ secondary: { color: Colors.light.textSecondary } });
