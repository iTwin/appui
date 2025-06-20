---
"@itwin/appui-react": minor
---

Update tool settings layout initialization. When `toolSettings.defaultLocation` is set on `StandardLayout` component the tool settings will be initialized as a regular widget. For example to initialize the layout with floating tool settings:

```tsx
const frontstage: Frontstage = {
  id: "MyFrontstage",
  toolSettings: {
    id: "toolSettings",
    defaultState: WidgetState.Floating,
  },
  layout: (
    <StandardLayout
      toolSettings={{
        defaultLocation: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.Start,
        },
      }}
    />
  ),
};
```
