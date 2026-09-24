import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Button, Card, Screen } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';
import { useInspectionDraft } from '@/providers/InspectionDraftProvider';
import { inspectionTypeLabels, type InspectionType } from '@/types/inspection';

const types = Object.keys(inspectionTypeLabels) as InspectionType[];
export default function SelectInspectionTypeRoute() {
  const router = useRouter();
  const { draft, setType } = useInspectionDraft();
  return <Screen>
    <Text variant="headlineMedium">Select inspection type</Text>
    <Text variant="bodyMedium" style={styles.secondary}>The checklist will match this inspection type.</Text>
    <Card><RadioButton.Group onValueChange={(value) => setType(value as InspectionType)} value={draft.type}>
      {types.map((type) => <RadioButton.Item key={type} label={inspectionTypeLabels[type]} value={type} />)}
    </RadioButton.Group></Card>
    <View style={styles.summary}><Text variant="bodyMedium">Site: {draft.siteName}</Text></View>
    <Button onPress={() => router.push('../inspection-checklist')}>Continue to checklist</Button>
  </Screen>;
}
const styles = StyleSheet.create({ secondary: { color: Colors.light.textSecondary }, summary: { padding: Spacing.two } });
