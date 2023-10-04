# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes-1)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-2)

## @itwin/appui-react

### Fixes

- Fix `zustand` deprecation warning by replacing `useStore` with `useStoreWithEqualityFn`.
- Can now pass a blank array into `allowedPanelTargets` that will prevent widget from being able to to dock to any target.
- Disable `user-select` of a widget tab bar and resize handle to avoid content selection when dragging a widget.
- Fix an issue with closing tool settings dropdown when main UI hides.
- Fix message center messages overflow behavior breaking layout.
- Fix message center messages icon colors based on message severity.
- Correctly configure `resizable` flag of a floating widget after docking and undocking.

## @itwin/core-react

### Fixes

- Fix `MessageContainer` icon colors based on severity.

## @itwin/components-react

### Fixes

- Fix `useTreeModel` missing tree model changes that happen after render until `useTreeModel` subscribes to `TreeModelSource.onModelChanged` event.
