---
"@itwin/components-react": minor
---

Added constraint enforcement for new editor system:

- Added `NumericValueMetadata` interface with `minimumValue`/`maximumValue` constraints.
- Extended `EditorProps.onChange` to accept an optional `prepareForCommit` callback, allowing editors to defer constraint enforcement (clamping, truncation) until commit time.
- Updated `useCommittableValue` to invoke `prepareForCommit` before committing, so committed values are aware of constraints.
