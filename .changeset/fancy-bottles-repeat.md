---
"@itwin/appui-react": minor
---

Changed keyboard shortcut processing of `FrameworkToolAdmin` to ignore events triggered by editable elements like input, textarea and select. Previously it was ignoring all events, unless `document.body` was the active element.
