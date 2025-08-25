---
"@itwin/imodel-components-react": minor
---

Updated `QuantityEditor` to support `IModelApp.formatsProvider` and react to format settings changes.
`IModelApp.formatsProvider` is available with `@itwin/core-frontend` v5. If v4 is used it fallbacks to using `IModelApp.quantityFormatter`.
