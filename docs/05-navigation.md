# Navigation

## Purpose

Document the Phase 1 navigation foundation for the mobile field application.

## What was implemented

- Expo Router remains the file-based navigation system.
- The root layout wraps the application with error handling, Paper theming, and Expo Router navigation theming.
- A native Android-friendly bottom tab navigator exposes:
  - Home
  - Foundation
- The Foundation route is intentionally informational and does not implement a business workflow.

## Files created/modified

- `src/app/_layout.tsx`
- `src/app/index.tsx`
- `src/app/explore.tsx`
- `src/components/app-tabs.tsx`
- `src/providers/AppProviders.tsx`
- `src/components/feedback/AppErrorBoundary.tsx`

## Architecture/design decisions

Routes live in `src/app` so Expo Router can discover them. Shared UI and application providers stay outside the route directory. The existing native tabs are retained for Android-first behavior and can later be replaced or extended as feature routes are introduced.

## How the feature works

`src/app/_layout.tsx` is the root route layout. It supplies the application error boundary, React Native Paper provider, navigation theme, and tab navigator. `src/components/app-tabs.tsx` maps the `index` and `explore` route files to the Home and Foundation tabs.

## Configuration required

No navigation-specific configuration is required. Expo Router is configured through the `expo-router/entry` package entry and the `expo-router` plugin.

## How to test it

```powershell
cd D:\Coding\Github\Khanan-Drishti
npx tsc --noEmit
npm run lint
npx expo export --platform android
npx expo start
```

On Android, confirm that Home opens by default and that tapping Foundation changes to the foundation screen.

## Known limitations

- The two routes are foundation routes only.
- Authentication guards and role-based route access do not exist yet.
- Deep links and notification navigation are not configured yet.

## Next steps

Add feature routes only when their corresponding phase begins, and introduce protected navigation after authentication is implemented.
