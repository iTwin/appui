# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Fixes

- Fix `zustand` deprecation warning by replacing `useStore` with `useStoreWithEqualityFn`.
- Can now pass a blank array into `allowedPanelTargets` that will prevent widget from being able to to dock to any target.
- Disable `user-select` of a widget tab bar and resize handle to avoid content selection when dragging a widget.
- Fix an issue with closing tool settings dropdown when main UI hides.
