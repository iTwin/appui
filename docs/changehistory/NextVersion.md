---
publish: false
---

# NextVersion

Table of contents:

- [NextVersion](#nextversion)
  - [iTwin.js version range](#itwinjs-version-range)
  - [@itwin/appui-react](#itwinappui-react)
    - [Widget error handling](#widget-error-handling)
    - [Added `SelectionCountField` component](#added-selectioncountfield-component)
    - [`ViewSelector` changes](#viewselector-changes)
    - [Fixes](#fixes)
  - [@itwin/core-react](#itwincore-react)
    - [Changed base `Dialog` component for `MessageBox`](#changed-base-dialog-component-for-messagebox)
    - [Fixes](#fixes-1)
  - [@itwin/components-react](#itwincomponents-react)

## iTwin.js version range

The supported range of iTwin.js versions has been revised from the vague `>=3.7.0` to the more precise `^3.7.0 || ^4.0.0`.

## @itwin/appui-react

### Widget error handling

Added an `ErrorBoundary` component to display a fallback UI if an error occurs while rendering widget content. This improvement enhances error handling and prevents the entire application from crashing.

### Added `SelectionCountField` component

Added `SelectionCountField` component to increase the configurability of an existing redux-connected `SelectionInfoField` component.

### `ViewSelector` changes

- Implemented fuzzy search for `ViewSelector`
- Added auto-expand functionality for `ViewSelector` search results
- Fixed `ViewSelector` current view highlight bug

### Fixes

- Fixed `CubeNavigationAid` rotation logic to allow rotation to rotated faces
- Fixed `CubeNavigationAid` arrow tooltips
- Fixed stage panel transitions
- Fixed styling consistency of pop-out windows

## @itwin/core-react

### Changed base `Dialog` component for `MessageBox`

Made `MessageBox` appearance consistent with @itwin/itwinui-react `Dialog` component without introducing breaking changes. This change is a stepping stone for standardizing iTwinUI `Dialog` component.

### Fixes

- Fixed gaps between tree nodes in `TreeNodeItem` component

## @itwin/components-react

- Fixed `SimplePropertyDataProvider` to correctly update when used in `VirtualizedPropertyGridWithDataProvider`
- Fixed `MultilineTextPropertyValueRenderer` to correctly display ***See less*** and ***See more*** buttons
- Fixed tree flickering without keeping the horizontal scrollbar
