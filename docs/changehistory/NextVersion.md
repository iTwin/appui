# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes-1)

## @itwin/appui-react

### Fixes

- Fix `zustand` deprecation warning by replacing `useStore` with `useStoreWithEqualityFn`.
- Can now pass a blank array into `allowedPanelTargets` that will prevent widget from being able to to dock to any target.
- Disable `user-select` of a widget tab bar and resize handle to avoid content selection when dragging a widget.
- Fix an issue with closing tool settings dropdown when main UI hides.
- Fix message center messages overflow behavior breaking layout.
- Fix message center messages icon colors based on message severity.
- Correctly configure `resizable` flag of a floating widget after docking and undocking.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.

## @itwin/core-react

### Fixes

- Fix `MessageContainer` icon colors based on severity.
