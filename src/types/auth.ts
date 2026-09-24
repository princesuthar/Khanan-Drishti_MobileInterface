export type UserRole = 'inspector' | 'worker';

export type AuthUser = {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};
