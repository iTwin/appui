# NextVersion <!-- omit from toc -->

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)

## @itwin/appui-react

### Additions

- Added `useSavedState` property to `Widget` interface. By default widgets with `defaultState=Hidden` are always hidden when the layout is restored (i.e. page is reloaded). When `useSavedState` is set to `true` it will override the default behavior and force the widget to use its saved layout state instead. This is useful for widgets that are hidden by default but should be shown when the layout is restored. [#1210](https://github.com/iTwin/appui/pull/1210)
- Added `promptAtContent` prop to `ToolAssistanceField` component. When set to `true` the prompt will be displayed only when the content area (i.e. viewport) is hovered. [#1211](https://github.com/iTwin/appui/pull/1211)

### Changes

- Updated `cursorPromptTimeout` prop of `ToolAssistanceField` component to handle `Number.POSITIVE_INFINITY`, which when enabled will display the cursor prompt indefinitely. [#1211](https://github.com/iTwin/appui/pull/1211)
- Updated `TabBar` to use ITwinUi Tab components. [#1190](https://github.com/iTwin/appui/pull/1190)
