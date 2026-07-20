---
"@itwin/imodel-components-react": patch
---

Quantity editor now strips the `TrailZeroes` and `KeepDecimalPoint` format traits while editing, so the editable value is no longer padded with trailing zeros or a dangling decimal point.
