# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

## @itwin/components-react

### Deprecations

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer` in favor of default `PrimitivePropertyValueRenderer`. [#832](https://github.com/iTwin/appui/pull/832)

### Changes

- Updated `VirtualizedPropertyGrid` component [#849](https://github.com/iTwin/appui/pull/849):
  - Enable user selection for property records
  - Display browser context menu on property records if `onPropertyContextMenu` and `isPropertySelectionOnRightClickEnabled` props are not set
  - Increased area of an element selector to avoid column overlap

## @itwin/core-react

### Fixes

- Fixed SVG icon alignment in `ContextMenuItem` component. [#840](https://github.com/iTwin/appui/pull/840)
- Fixed `ContextSubMenu` to correctly render provided SVG icon. [#840](https://github.com/iTwin/appui/pull/840)
