---
"@itwin/appui-react": minor
---

Added `useStrataKit` preview feature to enable usage of [StrataKit](https://www.npmjs.com/package/@stratakit/foundations) components in AppUI. Applications using this preview feature must add `@stratakit/foundations` as a dependency (specified as an optional peer dependency in AppUI) and enable [StrataKit theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge). Version range of `@stratakit/foundations` might be updated in the future minor version releases to stay in sync with the StrataKit releases.

```tsx
// Enable StrataKit components where available
<PreviewFeaturesProvider
  features={{
    useStrataKit: true,
  }}
>
  <App />
</PreviewFeaturesProvider>

// Enable StrataKit components for specific areas of the UI
<PreviewFeaturesProvider
  features={{
    useStrataKit: {
      toolbars: true,
    }
  }}
>
  <App />
</PreviewFeaturesProvider>
```
