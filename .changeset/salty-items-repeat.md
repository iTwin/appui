---
"@itwin/appui-react": minor
---

Added `widgetTabActions` preview feature, which when enabled displays widget tab actions for individual tabs instead of the default behavior where only active tab actions are exposed. Note that this feature replaces the overflow dropdown menu with a scrollable container to display all tab actions. Close button will be shown in widget tab when `controlWidgetVisibility` preview feature is enabled.

```tsx
<PreviewFeaturesProvider
  features={{
    widgetTabActions: true,
  }}
>
  <App />
</PreviewFeaturesProvider>
```
