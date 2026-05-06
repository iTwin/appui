---
"@itwin/components-react": minor
---

Added constraint enforcement for new editor system:

- Added `NumericValueMetadata` interface with `minimumValue`/`maximumValue` constraints.
- Updated `useCommittableValue` return type to use `Pick<EditorProps, ...>` for consistency.
