import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import type { AuthSession } from '@/types/auth';

const SESSION_KEY = 'khanan-drishti.auth-session';

function readValue() {
  return Platform.OS === 'web'
    ? AsyncStorage.getItem(SESSION_KEY)
    : SecureStore.getItemAsync(SESSION_KEY);
}

function writeValue(value: string) {
  return Platform.OS === 'web'
    ? AsyncStorage.setItem(SESSION_KEY, value)
    : SecureStore.setItemAsync(SESSION_KEY, value);
}

function deleteValue() {
  return Platform.OS === 'web'
    ? AsyncStorage.removeItem(SESSION_KEY)
    : SecureStore.deleteItemAsync(SESSION_KEY);
}

export async function readStoredSession(): Promise<AuthSession | null> {
  const value = await readValue();
  if (!value) {
    return null;
  }

  try {
    const session = JSON.parse(value) as AuthSession;
    if (!session.token || !session.user?.id || !session.user.role) {
      return null;
    }
    return session;
  } catch {
    await clearStoredSession();
    return null;
  }
}

export function saveStoredSession(session: AuthSession) {
  return writeValue(JSON.stringify(session));
}

export function clearStoredSession() {
  return deleteValue();
}
