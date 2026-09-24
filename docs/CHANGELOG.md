# Changelog

## Phase 2 - 2026-09-24

### Features completed

- Added login with email/username and password fields.
- Added React Hook Form and Zod validation.
- Added mock Inspector and Worker authentication.
- Added Secure Store session persistence and logout.
- Added protected routes and persistent-login restoration.
- Added role-aware navigation labels.

### Files changed

- `package.json`
- `package-lock.json`
- `src/app/_layout.tsx`
- `src/app/login.tsx`
- `src/app/(app)/`
- `src/components/ui/`
- `src/components/feedback/AppErrorBoundary.tsx`
- `src/providers/AppProviders.tsx`
- `src/providers/AuthProvider.tsx`
- `src/services/mockAuth.ts`
- `src/storage/secureSession.ts`
- `src/types/auth.ts`
- `src/validation/auth.ts`
- `docs/06-authentication.md`
- `docs/CHANGELOG.md`

### Tests performed

- `npx tsc --noEmit` passed.
- `npm run lint` passed.
- `npx expo export --platform android` passed.
- Android test scenarios for valid login, invalid login, empty fields, logout, protected routes, session persistence, and both roles are documented in `docs/06-authentication.md`.

### Known issues

- `npm install` reports moderate dependency audit findings from the generated dependency tree.
- Camera, GPS, checklists, and backend integration are intentionally not implemented.
- Authentication currently uses mock credentials until the backend is connected.
- Web development uses an Async Storage session fallback because Expo Secure Store is native-only.

## Phase 3 - 2026-09-24

### Features completed

- Added the authenticated field dashboard with user, role, site, shift, metrics, alerts, and sync status.
- Added reusable metric, quick-action, sync-status, and placeholder components.
- Added role-specific mock dashboard data for Inspector and Worker accounts.
- Added working protected navigation for Start Inspection, Report Hazard, and Inspection History actions.
- Added a local Sync Data demonstration state transition.

### Files changed

- `src/types/dashboard.ts`
- `src/components/dashboard/`
- `src/app/(app)/(tabs)/index.tsx`
- `src/app/(app)/_layout.tsx`
- `src/app/start-inspection.tsx`
- `src/app/report-hazard.tsx`
- `src/app/inspection-history.tsx`
- `src/components/dashboard/ProtectedActionRoute.tsx`
- `docs/07-dashboard.md`
- `docs/CHANGELOG.md`

### Tests performed

- TypeScript validation passed.
- Lint validation passed.
- Android bundle validation passed.
- Dashboard and quick-action navigation scenarios are documented in `docs/07-dashboard.md`.

### Known issues

- Dashboard values and alerts are mock data.
- Quick action destinations are placeholders until their feature phases begin.

## Post-Phase 2 Fix - 2026-09-24

### Fixed

- Prevented the web runtime from calling the unavailable native Expo Secure Store API.
- Added Expo-compatible vector icon support for React Native Paper badges.

## Phase 1 - 2026-09-24

### Features completed

- Added the coal-mine safety theme and reusable UI foundation.
- Added Expo Router navigation, loading/error boundaries, environment structure, and feature-based folders.

### Documentation

- See `docs/04-project-setup.md` and `docs/05-navigation.md`.
