# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-1)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes-2)

## @itwin/appui-react

### Changes

- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.

### Fixes

- Unmount `ChildWindowManager` whenever child window is closed.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- Fix error when `HTMLElement` used in `NotifyMessageDetails` messages.
- Fixed an issue where setting a `defaultState` to `Floating` would have no effect without a `canFloat` property of a `Widget`.
- Correctly set the default value of `CanFloatWidgetOptions.isResizable` to `true`. Every floating widget is resizable unless disabled explicitly.

## @itwin/components-react

### Fixes

- Fixed `useAsyncValue` hook to work in React 18 strict mode.

## @itwin/core-react

### Fixes

- Fixed `useDisposable` hook to work in React 18 strict mode.
