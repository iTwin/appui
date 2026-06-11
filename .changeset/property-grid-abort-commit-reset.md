---
"@itwin/components-react": patch
---

`VirtualizedPropertyGrid` now resets the active editor back to its initial value when a commit is aborted by the consumer (`onPropertyUpdated` returns `false`). Cancelling an edit now also resets editor.
