---
"@itwin/components-react": patch
---

Fixed `useCommittableValue` committing the same value twice when an editor commits the value itself and then loses focus, i.e. after picking a date in `Date` editor and clicking on another editor.
