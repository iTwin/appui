# NextVersion <!-- omit from toc -->

## @itwin/appui-react

### Additions

- Added `useSavedState` property to `Widget` interface. By default widgets with `defaultState=Hidden` are always hidden when the layout is restored (i.e. page is reloaded). When `useSavedState` is set to `true` it will override the default behavior and force the widget to use its saved layout state instead. This is useful for widgets that are hidden by default but should be shown when the layout is restored. [#1210](https://github.com/iTwin/appui/pull/1210)
