import type { AuthSession, AuthUser } from '@/types/auth';
import type { LoginFormValues } from '@/validation/auth';

type MockAccount = AuthUser & { password: string };

const accounts: MockAccount[] = [
  {
    id: 'mock-inspector-001',
    username: 'inspector@example.com',
    displayName: 'Aarav Inspector',
    role: 'inspector',
    password: 'inspector123',
  },
  {
    id: 'mock-worker-001',
    username: 'worker@example.com',
    displayName: 'Bharat Worker',
    role: 'worker',
    password: 'worker123',
  },
];

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid username or password.');
    this.name = 'InvalidCredentialsError';
  }
}

export async function loginWithMockCredentials(
  values: LoginFormValues,
): Promise<AuthSession> {
  const username = values.username.trim().toLowerCase();
  const account = accounts.find(
    (candidate) => candidate.username === username || candidate.id === username,
  );

  if (!account || account.password !== values.password) {
    throw new InvalidCredentialsError();
  }

  const { password: _password, ...user } = account;
  return {
    token: `mock-session-${user.id}-${Date.now()}`,
    user,
  };
}
