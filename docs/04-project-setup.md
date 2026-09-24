# Project Setup

## Purpose

Explain how to install and run the mobile application locally.

## What was implemented

Phase 1 has a working Expo SDK 57 TypeScript project with Expo Router, a safety-focused theme, reusable UI primitives, and foundational loading/error boundaries. The planned foundational packages are installed:

- React Native Paper
- React Hook Form
- Zod
- Axios
- Expo Camera
- Expo Location
- Expo Secure Store
- Async Storage

## Files created/modified

- `package.json`
- `package-lock.json`
- `app.json`
- `app.config.ts`
- `.env.example`
- `tsconfig.json`
- Expo Router application files
- `src/config/env.ts`
- `src/constants/theme.ts`
- `src/components/ui/`
- `src/components/feedback/AppErrorBoundary.tsx`
- `src/providers/AppProviders.tsx`

## Architecture/design decisions

Expo-managed installation is used so native package versions remain compatible with the selected Expo SDK. Runtime configuration is read from Expo config and can be provided through `EXPO_PUBLIC_API_URL` and `APP_ENV`.

## How the feature works

Install dependencies, start Expo, and open the project on Android.

```powershell
cd D:\Coding\Github\Khanan-Drishti
npm install
npx expo start
```

For an Android emulator or connected Android device:

```powershell
npm run android
```

For local environment values, copy `.env.example` to `.env.local` and update the values before starting Expo:

```powershell
Copy-Item .env.example .env.local
```

## Configuration required

- Node.js with npm.
- Expo Go on the physical Android device, or an Android emulator.
- USB debugging enabled when using a physical device through local tooling.

## How to test it

Run:

```powershell
npm run lint
npx tsc --noEmit
npx expo start
```

The initial screen should show the Khanan Drishti foundation message. The bottom navigation should expose Home and Foundation routes.

## Known limitations

The application is not yet configured for a production EAS build, signing, backend environment variables, or release deployment. The configured API URL is only a structure; no API calls exist yet.

## Next steps

Add validated environment variables and API-specific configuration when the first API-backed feature requires it.
