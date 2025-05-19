---
"@itwin/appui-react": minor
---

Updated tool settings to display the lock button as an input decoration when the `toolSettingsLockButton` preview feature is enabled.

A separate control will still be displayed as a sibling if the lock cannot be displayed by the editor. Common cases include:

- Non-input editors (i.e. locking a toggle property)
- Custom editors (i.e. custom editor implementations that do not display the lock decoration)

Note that a separate lock control can only be displayed for the first dialog item in a row. Consider this scenario:

```tsx
const useX = new DialogProperty();
const x = new DialogProperty();

const useY = new DialogProperty();
const y = new DialogProperty();

// Tool is supplying these tool setting properties.
const dialogItems = [
  x.toDialogItem(
    {
      columnIndex: 0,
      rowPriority: 1,
    },
    useX.toDialogItem({ columnIndex: 0, rowPriority: 1 })
  ),
  y.toDialogItem(
    {
      columnIndex: 0,
      rowPriority: 1,
    },
    useY.toDialogItem({ columnIndex: 0, rowPriority: 1 })
  ),
];

// The old behavior would display the lock as a separate control for the first dialog item of the row, which is `x`.
// The new behavior will display the lock as an input decoration for both `x` and `y`. A separate lock control might be displayed for `x` only.
```

Added `LockButtonInputDecoration` component to allow consumers to display the lock button as an input decoration in custom editors. For now this component is only compatible with the [iTwinUI Input](https://itwinui.bentley.com/docs/inputwithdecorations), but additional APIs can be exposed in the future. Usage example:

```tsx
function MyCustomEditor(props) {
  // ...
  return (
    <InputWithDecorations>
      {/* ... */}
      <LockButtonInputDecoration />
    </InputWithDecorations>
  );
}
```
