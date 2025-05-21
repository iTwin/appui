---
"@itwin/appui-react": minor
---

Add `visible`, `onVisibleChange`, `pinned` and `onPinnedChange` props to `ToolAssistanceField` component. These props can be used to manually control the visibility and pinned state of the field.

```tsx
function CustomField(props) {
  // Field is open by default
  const [visible, setVisible] = React.useState(true);
  return (
    <ToolAssistanceField
      {...props}
      visible={visible}
      // Update the state so the field can be opened/closed
      onVisibleChange={setVisible}
      // Field is always pinned
      pinned={true}
    />
  );
}
```
