import { Redirect } from 'expo-router';

import { ActionPlaceholder } from './ActionPlaceholder';
import { AppLoading } from '@/providers/AppProviders';
import { useAuth } from '@/providers/AuthProvider';

export function ProtectedActionRoute({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { isLoading, session } = useAuth();
  if (isLoading) {
    return <AppLoading />;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }
  return <ActionPlaceholder title={title} description={description} />;
}
