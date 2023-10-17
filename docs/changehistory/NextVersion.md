# NextVersion <!-- omit from toc -->
<<<<<<< HEAD
=======

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)

## @itwin/appui-react

### Changes

- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.

### Fixes

- Unmount `ChildWindowManager` whenever child window is closed.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- Fix error when `HTMLElement` used in `NotifyMessageDetails` messages.
>>>>>>> 66a19f573 (Unmount InternalChildWindowManager whenever Window is closed (#517))
