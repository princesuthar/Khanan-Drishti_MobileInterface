# Dashboard

## Purpose

Document the Phase 3 field dashboard for the Khanan Drishti mobile application.

## What was implemented

- Authenticated user greeting and display name.
- Inspector or Worker role badge.
- Assigned mine/site card with shift information.
- Today's inspections metric.
- Pending inspections metric.
- Open incidents metric.
- High-risk alerts card with mock alerts.
- Online/sync status card.
- Four quick actions:
  - Start Inspection
  - Report Hazard
  - Inspection History
  - Sync Data
- Reusable dashboard components for metrics, actions, and sync status.
- Mock dashboard data that varies by role.
- Working navigation from quick actions to protected placeholder screens.

## Files created/modified

- `src/types/dashboard.ts`
- `src/components/dashboard/MetricCard.tsx`
- `src/components/dashboard/QuickActionCard.tsx`
- `src/components/dashboard/SyncStatusCard.tsx`
- `src/components/dashboard/ActionPlaceholder.tsx`
- `src/components/dashboard/index.ts`
- `src/app/(app)/(tabs)/index.tsx`
- `src/app/(app)/_layout.tsx`
- `src/app/start-inspection.tsx`
- `src/app/report-hazard.tsx`
- `src/app/inspection-history.tsx`
- `src/components/dashboard/ProtectedActionRoute.tsx`
- `docs/07-dashboard.md`

## Architecture/design decisions

- Dashboard data is isolated in `src/types/dashboard.ts` so a future API service can replace the mock data without changing the screen contract.
- Metrics, quick actions, and sync status are reusable components rather than dashboard-local markup.
- Quick actions navigate to protected routes guarded by `ProtectedActionRoute` even though the underlying workflows are intentionally deferred.
- Sync Data demonstrates a real local UI state transition from `Syncing` to `Online` without pretending that backend synchronization exists.
- Role-specific assigned sites and inspection counts are mock values for demonstration.

## How the feature works

The authenticated home route reads the logged-in user from `AuthProvider`, derives mock dashboard data from the role, and renders the field dashboard. The Sync Data action changes its local status briefly. The other actions navigate to protected placeholder screens and can later be replaced with the relevant feature implementations.

## Configuration required

No backend configuration is required. All data is local mock data.

## How to test it

```powershell
cd D:\Coding\Github\Khanan-Drishti
npx tsc --noEmit
npm run lint
npx expo export --platform android
npx expo start
```

After signing in:

1. Confirm the user name and role are shown.
2. Confirm the assigned mine/site and shift are shown.
3. Confirm all three inspection/incident metrics are visible.
4. Confirm high-risk alerts are visible.
5. Tap `Sync Data` and observe `Syncing`, followed by `Online`.
6. Tap each of the three navigation quick actions.
7. Confirm each opens its protected placeholder route.
8. Tap `Back to dashboard`.
9. Sign out and confirm the protected dashboard redirects to login.
10. Repeat with both Inspector and Worker accounts.

## Known limitations

- Dashboard values are mock data.
- Sync Data does not connect to a backend or persist a sync queue.
- Quick action destinations are placeholders.
- No camera, GPS, checklist, inspection, hazard, or history functionality is implemented yet.

## Next steps

Implement the field inspection workflow and replace the Start Inspection placeholder while keeping the dashboard action contract stable.
