---
"@itwin/appui-react": minor
---

Added `isActiveCondition` property to `CommonToolbarItem` interface, which allows to dynamically update the active state of a toolbar item using a conditional value.

```tsx
let isActive = false;
const eventId = "my-action-active-changed";
function toggleActive() {
  isActive = !isActive;
  SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
}

ToolbarItemUtilities.createActionItem({
  id: "my-action",
  execute: toggleActive,
  isActiveCondition: new ConditionalBooleanValue(() => isActive, [eventId]),
});
```
