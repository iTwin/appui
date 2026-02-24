---
"@itwin/appui-react": minor
---

Added `getPanels` property to `UiItemsProvider` interface which allows panel items to be defined. Once defined the `panels` getter of `FrontstageDef` class can be used to control the visibility and behavior of provided panels.

```tsx
UiItemsManager.register({
  id: "my-provider",
  getPanels: () => [
    {
      id: "panel1",
      type: "dynamic",
      placement: "left",
      label: "Panel 1",
      content: <>Panel 1 content</>,
    },
  ],
});

const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
frontstageDef?.panels.open({ id: "panel1" });
```
