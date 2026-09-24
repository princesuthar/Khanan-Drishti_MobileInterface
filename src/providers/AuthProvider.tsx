import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { clearStoredSession, readStoredSession, saveStoredSession } from '@/storage/secureSession';
import { loginWithMockCredentials } from '@/services/mockAuth';
import type { AuthSession, AuthUser } from '@/types/auth';
import type { LoginFormValues } from '@/validation/auth';

type AuthContextValue = {
  isLoading: boolean;
  session: AuthSession | null;
  user: AuthUser | null;
  login: (values: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    readStoredSession()
      .then(setSession)
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (values: LoginFormValues) => {
    const nextSession = await loginWithMockCredentials(values);
    await saveStoredSession(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(async () => {
    await clearStoredSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      session,
      user: session?.user ?? null,
      login,
      logout,
    }),
    [isLoading, login, logout, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
