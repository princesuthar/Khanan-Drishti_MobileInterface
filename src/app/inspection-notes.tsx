import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { HelperText, Text } from 'react-native-paper';
import { Button, Input, Screen } from '@/components/ui';
import { useInspectionDraft } from '@/providers/InspectionDraftProvider';

export default function InspectionNotesRoute() {
  const router = useRouter();
  const { draft, setNotes } = useInspectionDraft();
  const { control, handleSubmit } = useForm({ defaultValues: { notes: draft.notes } });
  return <Screen><Text variant="headlineMedium">Add notes</Text><Text variant="bodyMedium">Add context for the inspection record.</Text><Controller control={control} name="notes" render={({ field: { onChange, value } }) => <Input label="Notes (optional)" multiline numberOfLines={6} value={value} onChangeText={onChange} />} /><HelperText type="info">You can review everything before submitting.</HelperText><Button onPress={handleSubmit(({ notes }) => { setNotes(notes); router.push('../inspection-review'); })}>Review inspection</Button></Screen>;
}
