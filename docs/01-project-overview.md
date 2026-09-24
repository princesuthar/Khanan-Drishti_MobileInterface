# Project Overview

## Purpose

Khanan Drishti is an Android-first mobile field application for coal-mine inspectors and field workers. It will support inspections, compliance monitoring, hazard reporting, geolocation, offline work, and eventual AI-assisted risk classification.

## What was implemented

Phase 0 establishes the Expo React Native application foundation. The app currently renders a branded foundation screen and does not claim to implement authentication or field workflows.

## Files created/modified

- `package.json` and `package-lock.json` - application metadata and dependencies.
- `app.json` - Expo configuration.
- `src/app/_layout.tsx` - root navigation and React Native Paper provider.
- `src/app/index.tsx` - initial foundation screen.
- `src/api`, `src/features`, `src/services`, `src/storage`, `src/types`, `src/validation`, and `src/theme` - feature-based architecture directories.
- `docs/` - project documentation.

## Architecture/design decisions

- Expo and Expo Router are used to support Android-first development and file-based navigation.
- TypeScript strict mode remains enabled.
- Features will be organized under `src/features`, with shared API, storage, validation, services, types, and theme layers.
- React Native Paper is configured at the root so future screens can use a consistent component system.
- Device capabilities are installed now but will be integrated only in their respective phases.

## How the feature works

The Expo Router entry point loads `src/app/_layout.tsx`, which provides the Paper and Expo Router themes. The index route renders the current foundation screen.

## Configuration required

- Node.js and npm.
- Expo-compatible Android emulator or a physical Android device with Expo Go.
- Android development tooling is only required for local native builds; it is not required for Expo Go development.

## How to test it

```powershell
cd D:\Coding\Github\Khanan-Drishti
npm run lint
npx tsc --noEmit
npx expo start
```

Open the project on an Android emulator or scan the QR code using Expo Go.

## Known limitations

- No authentication or role management exists yet.
- No backend API is connected.
- No inspection, incident, camera, location, offline sync, notification, or AI workflow exists yet.
- The generated Expo template may report dependency audit warnings that are not introduced by application code.

## Next steps

Phase 1 should implement authentication foundations, including role-aware local session state and secure token storage, after the phase is explicitly started.
