---
"@itwin/appui-react": minor
---

Added `ToolbarAdvancedUsage` non-exhaustive string literal union type used in `advancedUsage` property of `StandardLayoutToolbarItem` interface.
This property takes precedence over enum based `usage` property and allows specifying advanced toolbar item usage scenarios.
When set to `"view-settings"` it positions the toolbar item at the bottom-right of the content area in the default standard layout configuration.

```tsx
ToolbarItemUtilities.createActionItem({
  id: "action",
  layouts: {
    standard: {
      usage: ToolbarUsage.ViewNavigation,
      advancedUsage: "view-settings",
      orientation: ToolbarOrientation.Horizontal,
    },
  },
});
```
