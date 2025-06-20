---
"@itwin/appui-react": minor
---

Refactored the `useActiveIModelConnection` hook to use the `UiFramework.onIModelConnectionChanged` event instead of relying on the sync UI events. This removes the requirement for the redux store to be configured when using the hook.
