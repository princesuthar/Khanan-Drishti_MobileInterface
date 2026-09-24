import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Button, Card, Screen } from '@/components/ui';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/providers/AuthProvider';
import { useInspectionDraft } from '@/providers/InspectionDraftProvider';
import { getChecklist } from '@/types/inspection';
import { saveInspection } from '@/storage/inspections';

export default function InspectionReviewRoute() {
  const router = useRouter();
  const { user } = useAuth();
  const { draft, reset } = useInspectionDraft();
  const [submitting, setSubmitting] = useState(false);
  const checklist = getChecklist(draft.type);
  const failed = draft.results.filter((result) => result.status === 'FAIL').length;
  const submit = async () => {
    setSubmitting(true);
    await saveInspection({ id: `inspection-${Date.now()}`, inspectorId: user!.id, inspectorRole: user!.role, siteId: draft.siteId, siteName: draft.siteName, type: draft.type, notes: draft.notes, checklistId: checklist.id, results: draft.results, submittedAt: new Date().toISOString(), status: 'SUBMITTED' });
    reset();
    router.replace('../inspection-submitted');
  };
  return <Screen><Text variant="headlineMedium">Review inspection</Text><Card contentStyle={styles.card}><Text variant="titleMedium">{checklist.title}</Text><Text>Site: {draft.siteName}</Text><Text>Checklist responses: {draft.results.length}/{checklist.items.length}</Text><Text>Failed items: {failed}</Text><Text>Notes: {draft.notes || 'None added'}</Text></Card><Button loading={submitting} disabled={submitting} onPress={submit}>Submit inspection</Button></Screen>;
}
const styles = StyleSheet.create({ card: { padding: 20, gap: 14 }, secondary: { color: Colors.light.textSecondary } });
