# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

## @itwin/components-react

### Deprecations

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer` in favor of default `PrimitivePropertyValueRenderer`. [#832](https://github.com/iTwin/appui/pull/832)
- Deprecated `RadialMenu` and `RadialButton` components that were designed for a retired design pattern in favor of `ContextMenu` or [iTwinUI dropdown menu](https://itwinui.bentley.com/docs/dropdownmenu). [#850](https://github.com/iTwin/appui/pull/850)

## @itwin/core-react

### Fixes

- Fixed SVG icon alignment in `ContextMenuItem` component. [#840](https://github.com/iTwin/appui/pull/840)
- Fixed `ContextSubMenu` to correctly render provided SVG icon. [#840](https://github.com/iTwin/appui/pull/840)
