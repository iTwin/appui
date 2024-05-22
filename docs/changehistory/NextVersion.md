# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations-1)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Deprecations

- Deprecated `StatusBar` component in favor of `StatusBarComposer`. [#848](https://github.com/iTwin/appui/pull/848)
- Deprecated `StatusBar` namespace. Please use the components directly. [#848](https://github.com/iTwin/appui/pull/848)
  - Deprecated `StatusBar.Popup` and `StatusBarPopup` in favor of `StatusBarPopover`.
  - Deprecated `StatusBar.Field` and `StatusBarField` in favor of [iTwinUI Button](https://itwinui.bentley.com/docs/button).
- Deprecated `StatusBarIndicator` in favor of [iTwinUI Button](https://itwinui.bentley.com/docs/button) (or other components) and AppUI `StatusBarPopup`. [#848](https://github.com/iTwin/appui/pull/848)
- Deprecated `StatusBarLabelIndicator` in favor of [iTwinUI Label](https://itwinui.bentley.com/docs/typography#label) and AppUI `Icon`. [#848](https://github.com/iTwin/appui/pull/848)

### Additions

- Added `StatusBarPopover` to replace `StatusBar.Popup`. The component uses [iTwinUI Popover](https://itwinui.bentley.com/docs/popover) with some consistent styling for all `StatusBar` fields. `StatusBarPopover` should wrap the element that trigger it (e.g. a button). [#848](https://github.com/iTwin/appui/pull/848)

### Changes

- Started using iTwinUI components for `StatusBar` field components. That includes both the button and the popup. [#848](https://github.com/iTwin/appui/pull/848)

## @itwin/components-react

### Deprecations

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer` in favor of default `PrimitivePropertyValueRenderer`. [#832](https://github.com/iTwin/appui/pull/832)

## @itwin/core-react

### Fixes

- Fixed SVG icon alignment in `ContextMenuItem` component. [#840](https://github.com/iTwin/appui/pull/840)
- Fixed `ContextSubMenu` to correctly render provided SVG icon. [#840](https://github.com/iTwin/appui/pull/840)
