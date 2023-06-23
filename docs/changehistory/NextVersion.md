---
publish: false
---

# NextVersion

Table of contents:

- [NextVersion](#nextversion)
  - [@itwin/core-react](#itwincore-react)
    - [Changed base `Dialog` component for `MessageBox`](#changed-base-dialog-component-for-messagebox)
    - [IconWebComponent](#iconwebcomponent)
  - [@itwin/components-react](#itwincomponents-react)

## @itwin/core-react

### Changed base `Dialog` component for `MessageBox`

Made `MessageBox` appearance consistent with @itwin/itwinui-react `Dialog` component without introducing breaking changes. This change is a stepping stone for standardizing iTwinUI `Dialog` component.

### `IconWebComponent`

Loaded `svg` from a URL is now cached and will be reused between render in different places, skipping the fetch/parsing it was doing each time before.

## @itwin/components-react

- Improved property layout in `VirtualizedPropertyGrid` to make sure action buttons does not overflow on small screens.
- Improved context menu support in `ControlledTree` by exposing `onContextMenu` callback through `TreeNodeRendererProps`.
