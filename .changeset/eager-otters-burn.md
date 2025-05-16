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

Displayed icon button can be customized via the `BaseDialogItem` interface.

```ts
const propertyDescription =
  PropertyDescriptionHelper.buildLockPropertyDescription("useLength");
propertyDescription.displayLabel = "Toggle length lock";

const property: BaseDialogItem = {
  value: {
    value: true,
  },
  property: propertyDescription,
  isDisabled: true,
};
// Displays an active, disabled icon button with a custom label.
```

Custom lock editor components can still be displayed by customizing the lock `PropertyDescription`, even if `toolSettingsLockButton` is enabled.

```ts
const property =
  PropertyDescriptionHelper.buildLockPropertyDescription("useRadius");
property.editor = {
  name: StandardEditorNames.Toggle,
};
// Displays a switch component.
```
