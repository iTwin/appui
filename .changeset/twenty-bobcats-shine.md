---
"@itwin/components-react": minor
---

Added ability to opt in to using new editors system in `FilterBuilder` component. [#1288](https://github.com/iTwin/appui/pull/1288)

```tsx
return (
  <FilterBuilder
    {...props}
    ruleValueRenderer={React.useCallback(
      (valueProps) => (
        <PropertyFilterBuilderRuleValue {...valueProps} editorSystem="new" />
      ),
      []
    )}
  />
);
```

Added ability to render status message in `EditorRenderer`.

```tsx
return <EditorRenderer {...props} statusMessage="Negative status message" />;
```

```tsx
return (
  <EditorRenderer
    {...props}
    statusMessage={
      <StatusMessage status="positive">Custom status message</StatusMessage>
    }
  />
);
```
