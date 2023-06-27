---
publish: false
---

# NextVersion

Table of contents:

- [NextVersion](#nextversion)
  - [@itwin/appui-react](#itwinappui-react)
    - [Popout widgets](#popout-widgets)
    - [Badge icons](#badge-icons)
    - [`ThemeManager`](#thememanager)
  - [@itwin/core-react](#itwincore-react)
    - [Changed base `Dialog` component for `MessageBox`](#changed-base-dialog-component-for-messagebox)
    - [`IconWebComponent`](#iconwebcomponent)
    - [Fixed `ConditionalIconItem` functionality](#fixed-conditionaliconitem-functionality)
  - [@itwin/components-react](#itwincomponents-react)

## @itwin/appui-react

### Popout widgets

- Resolved an issue that prevented opening popouts from within an iFrame. Please note that sandboxed iFrames still require the allow-popups attribute.
- Eliminated the logic responsible for storing the popped-out widget's location on the screen. Now, when the user closes the widget, it will reappear in the same position it was last closed.

### Badge icons

An issue with the conversion of toolbar item definitions has been fixed. This fix addresses the problem where badge icons were not rendering correctly.

### `ThemeManager`

The `ThemeManager` component has been fixed to ensure the proper initialization of opacity values during component mount.

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
- Enhanced `PropertyFilterBuilder` to allow filtering when there are empty filter rules.
- Updated delete button logic of `PropertyFilterBuilder` to clear rule instead of removing it when there is only one rule left in the rule group.
- The `PropertyFilterBuilder` now sets the `contains` operator as the default for string and text properties.
