# Architecture

## Purpose

Describe the scalable mobile architecture established for Khanan Drishti.

## What was implemented

The initial Expo Router application uses a feature-based source layout with dedicated locations for API clients, services, storage, validation, types, theme, and features.

## Files created/modified

- `src/app/` - Expo Router routes.
- `src/api/`
- `src/features/`
- `src/services/`
- `src/storage/`
- `src/types/`
- `src/validation/`
- `src/theme/`
- `src/app/_layout.tsx`

## Architecture/design decisions

- Route components remain in `src/app`.
- Business capabilities belong in `src/features`.
- External communication belongs in `src/api` and `src/services`.
- Persistence belongs in `src/storage`.
- Shared domain models belong in `src/types`.
- Input schemas belong in `src/validation`.
- React Native Paper is provided once at the application root.
- Expo Router typed routes remain enabled.

## How the feature works

Expo Router discovers route files in `src/app`. The root layout supplies navigation and UI providers. Future feature screens can be added without moving the application entry point.

## Configuration required

The `@/*` TypeScript alias maps to `src/*` in `tsconfig.json`.

## How to test it

```powershell
npx tsc --noEmit
npm run lint
```

## Known limitations

The architecture directories are intentionally empty until their associated features are implemented. No service contract or state-management library has been added prematurely.

## Next steps

Add the first feature using the existing boundaries and document any new cross-feature dependencies.
