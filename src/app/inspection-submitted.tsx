import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';
import { Button, Card, Screen } from '@/components/ui';
export default function InspectionSubmittedRoute() {
  const router = useRouter();
  return <Screen><Card contentStyle={{ padding: 24, gap: 16 }}><Text variant="headlineSmall">Inspection submitted</Text><Text variant="bodyLarge">The inspection was saved locally and is ready for future synchronization.</Text><Button onPress={() => router.replace('/')}>Return to dashboard</Button></Card></Screen>;
}
