import { Redirect, Stack } from 'expo-router';

import { AppLoading } from '@/providers/AppProviders';
import { useAuth } from '@/providers/AuthProvider';

export default function ProtectedLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }}><Stack.Screen name="(tabs)" /></Stack>;
}
