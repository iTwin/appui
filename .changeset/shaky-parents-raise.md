---
"@itwin/imodel-components-react": patch
"@itwin/components-react": patch
---

New editor system now enforces numeric and string constraints. Numeric and quantity editors clamp rawValues to `minimumValue`/`maximumValue`. Text editors truncate to `maximumLength` and reject values shorter than `minimumLength`.
