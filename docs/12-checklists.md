# Checklists

## Purpose

Document checklist models, answer states, and validation rules introduced in Phase 4.

## What was implemented

- `Checklist` model with inspection type and mandatory items.
- `InspectionItem` model with stable item IDs and questions.
- `InspectionResult` model.
- `InspectionItemStatus` values:
  - `PASS`
  - `FAIL`
  - `NOT_APPLICABLE`
- `Violation` model for failed-item details.
- Optional failure comment.
- Optional failure severity:
  - `LOW`
  - `MEDIUM`
  - `HIGH`
  - `CRITICAL`
- Photo URI placeholder field for future camera integration.
- Mandatory-item completion gate before notes/review.

## Files created/modified

- `src/types/inspection.ts`
- `src/app/inspection-checklist.tsx`
- `src/providers/InspectionDraftProvider.tsx`
- `docs/12-checklists.md`

## Architecture/design decisions

Checklist answers are stored separately from checklist definitions so templates can evolve independently from submitted results. Each result references an item ID. A failed result can carry a violation object without requiring every checklist response to contain failure metadata.

## How the feature works

`getChecklist()` creates the checklist for the selected inspection type. The screen renders one answer group per item. The Continue button is disabled until every mandatory item has a result. Failed items show optional details while PASS and NOT APPLICABLE remain lightweight responses.

## Configuration required

No additional configuration is required.

## How to test it

Run the app on Android and test all five inspection types. For every type, verify that:

- All checklist items are mandatory.
- PASS is accepted.
- FAIL is accepted.
- NOT APPLICABLE is accepted.
- Incomplete checklists cannot proceed.
- Failed items show optional comment, severity, and photo-placeholder controls.

## Known limitations

Checklist templates are currently mock data and use the same demonstration questions for each type. Photo attachment is not functional.

## Next steps

Replace mock templates with versioned backend checklist definitions and add checklist-specific questions and compliance rules.
