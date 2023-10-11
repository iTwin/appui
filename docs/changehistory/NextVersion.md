# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Fixes

- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.
- Fix error when `HTMLElement` used in `NotifyMessageDetails` messages.
