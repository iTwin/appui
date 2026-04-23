---
"@itwin/components-react": patch
---

Changed `MergedPropertyValueRenderer` to render `--` instead of `*** varies ***`. If a merged property has a display value starting with `--` (e.g. `-- unit`), that value will be used instead of the default `--`. Text editor now also displays `--` for merged properties instead of showing an empty value.
