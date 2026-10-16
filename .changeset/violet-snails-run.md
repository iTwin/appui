---
"@itwin/appui-react": minor
---

Added the `useStrataKit` preview feature that enables the use of [StrataKit](https://github.com/iTwin/stratakit) in AppUI. Applications using this preview feature must [set up StrataKit](https://stratakit.bentley.com/docs/getting-started/develop/) and turn on the [StrataKit theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge). To activate the preview feature in your application, use the `enable` function from the `@itwin/appui-react/useStrataKit` subpath export.

```tsx
import { enable } from "@itwin/appui-react/useStrataKit";

const useStrataKit = React.useMemo(() => enable(), []);

<PreviewFeaturesProvider
  features={{
    useStrataKit,
  }}
>
  <App />
</PreviewFeaturesProvider>;
```
