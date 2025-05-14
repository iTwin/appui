---
"@itwin/appui-react": minor
---

Added `toolSettingsLockButton` preview feature, which when enabled will render an icon button instead of a checkbox as the default tool settings lock editor.

```tsx
<PreviewFeaturesProvider
  features={{
    toolSettingsLockButton: true,
  }}
>
  <App />
</PreviewFeaturesProvider>
```

Custom label can be specified via the `displayLabel` of the lock `PropertyDescription`.

```ts
const property =
  PropertyDescriptionHelper.buildLockPropertyDescription("useLength");
property.displayLabel = "Toggle length lock";
// Displays an icon button with the label "Toggle length lock".
```

Custom lock editor components can displayed by customizing the lock `PropertyDescription`, even if `toolSettingsLockButton` is enabled.

```ts
const property =
  PropertyDescriptionHelper.buildLockPropertyDescription("useRadius");
property.editor = {
  name: StandardEditorNames.Toggle,
};
// Displays a switch component.
```
