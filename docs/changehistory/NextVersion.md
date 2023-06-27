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

### Fixed `ConditionalIconItem` functionality

Apps can now use React icons directly for conditional display using the `ConditionalIconItem`. While this class was available in 4.0, there were implementation errors that prevented its use.

## @itwin/components-react

- Improved property layout in `VirtualizedPropertyGrid` to make sure action buttons does not overflow on small screens.
- Improved context menu support in `ControlledTree` by exposing `onContextMenu` callback through `TreeNodeRendererProps`.
- In the `PropertyFilterBuilder`, the focus is now set on the property selector when the user clicks on the "+ Rule" and "+ Rule Group" buttons.
- Promoted `TreeNodeContent` and `TreeNodeIcon` to `public`.
