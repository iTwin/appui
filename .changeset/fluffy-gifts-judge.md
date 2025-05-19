---
"@itwin/components-react": minor
---

Updated the `editors` prop of `EditorsRegistryProvider` component. You can now either supply a list of editors or provide a function that customizes the current list of editors, allowing full control over the final set of editors.

```tsx
// New editors are higher priority than existing ones.
<EditorsRegistryProvider editors={(editors) => [...newEditors, ...editors]} />

// New editors are lower priority than existing ones.
<EditorsRegistryProvider editors={(editors) => [...editors, ...newEditors]} />

// Filter the editors.
<EditorsRegistryProvider
  editors={(editors) =>
    editors.filter((e) =>
      e.applies(
        {
          type: "bool",
        },
        undefined
      )
    )
  }
/>
```
