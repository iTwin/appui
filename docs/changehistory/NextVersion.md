---
publish: false
---

# NextVersion

Table of contents:

- [@itwin/core-react](#itwincore-react)

## @itwin/core-react

### `IconWebComponent`

Loaded `svg` from a URL is now cached and will be reused between render in different places, skipping the fetch/parsing it was doing each time before.
