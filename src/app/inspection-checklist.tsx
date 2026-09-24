import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Badge, Button, Card, Input, Screen } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';
import { useInspectionDraft } from '@/providers/InspectionDraftProvider';
import { getChecklist, type InspectionItemStatus, type InspectionResult, type ViolationDetails, type ViolationSeverity } from '@/types/inspection';

const statuses: InspectionItemStatus[] = ['PASS', 'FAIL', 'NOT_APPLICABLE'];
export default function InspectionChecklistRoute() {
  const router = useRouter();
  const { draft, setResult } = useInspectionDraft();
  const checklist = getChecklist(draft.type);
  const complete = checklist.items.every((item) => draft.results.some((result) => result.itemId === item.id));
  return <Screen>
    <Text variant="headlineMedium">Digital checklist</Text>
    <Badge>{checklist.title}</Badge>
    {checklist.items.map((item, index) => {
      const result = draft.results.find((candidate) => candidate.itemId === item.id);
      return <Card key={item.id} mode="outlined" contentStyle={styles.card}>
        <Text variant="titleSmall">{index + 1}. {item.question}</Text>
        <RadioButton.Group onValueChange={(value) => setResult({ itemId: item.id, status: value as InspectionItemStatus })} value={result?.status ?? ''}>
          {statuses.map((status) => <RadioButton.Item key={status} label={status.replace('_', ' ')} value={status} />)}
        </RadioButton.Group>
        {result?.status === 'FAIL' && <ViolationControls itemId={item.id} result={result} onChange={setResult} />}
      </Card>;
    })}
    {!complete && <Text variant="bodySmall" style={styles.error}>Complete every mandatory checklist item before continuing.</Text>}
    <Button disabled={!complete} onPress={() => router.push('../inspection-notes')}>Continue to notes</Button>
  </Screen>;
}
function ViolationControls({
  itemId,
  result,
  onChange,
}: {
  itemId: string;
  result: InspectionResult;
  onChange: (value: InspectionResult) => void;
}) {
  const severity = result.violation?.severity;
  const violation: ViolationDetails = result.violation ?? { };
  const update = (next: ViolationDetails) => onChange({ itemId, status: 'FAIL', violation: { itemId, ...violation, ...next } });
  return (
    <View style={styles.violation}>
      <Text variant="labelMedium">Failure details (optional)</Text>
      <Input
        label="Comment"
        value={violation.comment ?? ''}
        onChangeText={(comment) => update({ comment })}
      />
      <Text variant="labelMedium">Severity</Text>
      <RadioButton.Group
        value={severity ?? 'MEDIUM'}
        onValueChange={(value) => update({ severity: value as ViolationSeverity })}>
        {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as ViolationSeverity[]).map((level) => (
          <RadioButton.Item key={level} label={level} value={level} />
        ))}
      </RadioButton.Group>
      <Text variant="bodySmall" style={styles.photo}>Photo attachment placeholder</Text>
    </View>
  );
}
const styles = StyleSheet.create({ card: { padding: Spacing.three }, violation: { gap: Spacing.two, padding: Spacing.two, backgroundColor: Colors.light.backgroundSelected }, severity: { color: Colors.light.primary }, photo: { color: Colors.light.textSecondary }, error: { color: Colors.light.danger } });
