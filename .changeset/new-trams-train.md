---
"@itwin/appui-react": minor
---

Updated the tool settings data provider to invoke `IModelApp.toolAdmin.simulateMotionEvent` after applying the tool setting property change. This causes the update to the dynamic graphics of the active tool without requiring an explicit motion event. `simulateMotionEvent` is only available from `v5.0` of `@itwin/core-frontend`.
