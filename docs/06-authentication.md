# Authentication

## Purpose

Document the Phase 2 authentication foundation for inspectors and field workers.

## What was implemented

- Login screen with email/username and password fields.
- React Hook Form controlled inputs.
- Zod validation through `@hookform/resolvers`.
- Mock authentication service with Inspector and Worker accounts.
- Secure session persistence using Expo Secure Store on Android/iOS, with an Async Storage fallback for web development because Expo Secure Store's native API is unavailable in browsers.
- Persistent login restoration on app startup.
- Logout with secure session removal.
- Protected route group that redirects unauthenticated users to login.
- Role-aware navigation label:
  - Inspector: `Compliance`
  - Worker: `My workspace`
- Authenticated Home screen displays the signed-in user and role.

## Files created/modified

- `src/app/login.tsx`
- `src/app/_layout.tsx`
- `src/app/(app)/_layout.tsx`
- `src/app/(app)/(tabs)/_layout.tsx`
- `src/app/(app)/(tabs)/index.tsx`
- `src/app/(app)/(tabs)/explore.tsx`
- `src/providers/AuthProvider.tsx`
- `src/services/mockAuth.ts`
- `src/storage/secureSession.ts`
- `src/types/auth.ts`
- `src/validation/auth.ts`
- `src/components/app-tabs.tsx`
- `package.json`
- `package-lock.json`

## Architecture/design decisions

- Authentication state is provided above the router through `AuthProvider`.
- Secure Store is used for the session object rather than Async Storage because the session token is sensitive.
- The mock service has the same async shape expected from a future backend service.
- Route protection is implemented at the `(app)` layout boundary.
- The mock account password is never stored in the session and is never logged.
- Backend authentication can replace `loginWithMockCredentials` without changing the login screen or route guard contracts.

## How the feature works

Unauthenticated users reach `/login`. On valid credentials, the mock service returns a user and token. The provider persists the session in Secure Store and updates in-memory state. The protected app route then becomes available.

On startup, `AuthProvider` restores the session before rendering the protected app. If no session exists, `(app)/_layout.tsx` redirects to `/login`. Logging out removes the Secure Store entry and returns the user to the login route through the protected-route redirect.

## Mock accounts

| Role | Username | Password |
|---|---|---|
| Inspector | `inspector@example.com` | `inspector123` |
| Worker | `worker@example.com` | `worker123` |

The account IDs are also accepted as usernames for service-level testing.

## Configuration required

No backend configuration is required. Expo Secure Store is already configured in `app.json`. Web development uses Async Storage only as a platform compatibility fallback and must not be treated as production credential storage.

## How to test it

```powershell
cd D:\Coding\Github\Khanan-Drishti
npx tsc --noEmit
npm run lint
npx expo export --platform android
npx expo start
```

On Android:

1. Open the app and confirm the login screen appears.
2. Submit empty fields and confirm validation messages appear.
3. Submit an incorrect username or password and confirm the invalid-credentials message appears.
4. Sign in with either demo account.
5. Confirm the Home screen displays the correct role.
6. Confirm the secondary tab label changes for Inspector and Worker.
7. Reload the app and confirm the session persists.
8. Tap `Sign out` and confirm the login screen returns.
9. Reload after logout and confirm the protected app is not accessible.

## Known limitations

- Credentials and users are mock-only.
- There is no registration, password reset, token refresh, server revocation, or account lockout.
- The role-aware labels are navigation foundations; role-specific business screens are not implemented.
- Secure Store behavior depends on the platform keychain/keystore and can be cleared when app data is cleared.

## Next steps

Replace the mock service with the backend authentication API when its contract is available, while preserving the provider and route guard interfaces.
