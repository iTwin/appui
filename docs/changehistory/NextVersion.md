# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)

## @itwin/appui-react

### Changes

- Update `WidgetDef.show()` to bring the popout widget window to the front (this behavior is not guaranteed and depends on browser and user settings). [#667](https://github.com/iTwin/appui/pull/667)
- Removed arrow from status bar popup. [#750](https://github.com/iTwin/appui/pull/750)
- Render AccuDraw Distance field above Angle field when in Polar mode. [#753](https://github.com/iTwin/appui/pull/753)

### Fixes

- Fix the issue when right-click + left-click starts a widget drag interaction. [#730](https://github.com/iTwin/appui/pull/730)
- Fix polar mode AccuDraw input focus by correctly focusing the distance field. [#753](https://github.com/iTwin/appui/pull/753)
