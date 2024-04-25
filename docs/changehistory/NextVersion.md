# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-1)
  - [Changes](#changes-1)
  - [Fixes](#fixes-1)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-2)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-2)

## @itwin/appui-react

### Deprecations

- `UiFramework.isMobile()` method in favor of `ProcessDetector.isMobileBrowser` from `@itwin/core-bentley`. [#810](https://github.com/iTwin/appui/pull/810)
- Deprecated all UI event classes (e.g. `ContentControlActivatedEvent`). These are only emitter classes and applications should not use these classes to instantiate objects. Therefore they should not be exported. [#806](https://github.com/iTwin/appui/pull/806)
- Deprecated all event args interfaces (e.g. `ContentControlActivatedEventArgs`). Event args should be inferred from a listener. If explicit type is needed use a type helper. [#806](https://github.com/iTwin/appui/pull/806)

### Changes

- Bump `FloatingViewportContentWrapper` to `@public`. [#801](https://github.com/iTwin/appui/pull/801)

### Fixes

- Fix `FrameworkUiAdmin.showCard()` runtime error. [#803](https://github.com/iTwin/appui/pull/803)

## @itwin/core-react

### Deprecations

- `Centered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex), i.e. `<Flex justifyContent="center" />`. [#795](https://github.com/iTwin/appui/pull/795)
- `Div` component in favor of HTMLDivElement i.e. `<div />`. [#795](https://github.com/iTwin/appui/pull/795)
- `DivWithOutsideClick` component in favor of [iTwinUI popover `closeOnOutsideClick`](https://itwinui.bentley.com/docs/popover). [#795](https://github.com/iTwin/appui/pull/795)
- `FillCentered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `FlexWrapContainer` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `Gap` component in favor of [iTwinUI size variables](https://itwinui.bentley.com/docs/variables#size). [#795](https://github.com/iTwin/appui/pull/795)
- `ScrollView` component in favor of [overflow property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). [#795](https://github.com/iTwin/appui/pull/795)
- `BlockText`, `DisabledText` components in favor of [iTwinUI Text](https://itwinui.bentley.com/docs/typography#text). [#809](https://github.com/iTwin/appui/pull/809)
- `CheckListBox`, `CheckListBoxItem`, `CheckListBoxSeparator` components in favor of [iTwinUI list](https://itwinui.bentley.com/docs/list). [#809](https://github.com/iTwin/appui/pull/809)
- `Dialog`, `GlobalDialog` components and `DialogAlignment` enum in favor of [iTwinUI Dialog](https://itwinui.bentley.com/docs/dialog). [#809](https://github.com/iTwin/appui/pull/809)
- `ElementSeparator` without a direct replacement as components that need to be user-resized support this out of the box. [#809](https://github.com/iTwin/appui/pull/809)
- `ExpandableList` component in favor of [iTwinUI expandable block](https://itwinui.bentley.com/docs/expandableblock). [#809](https://github.com/iTwin/appui/pull/809)
- `IconInput` component in favor of [iTwinUI input decorations](https://itwinui.bentley.com/docs/inputwithdecorations). [#809](https://github.com/iTwin/appui/pull/809)
- `ImageCheckBox` component in favor of [iTwinUI checkbox](https://itwinui.bentley.com/docs/checkbox). [#809](https://github.com/iTwin/appui/pull/809)
- `InputLabel` component and `InputStatus` enum in favor of [iTwinUI input](https://itwinui.bentley.com/docs/input). [#809](https://github.com/iTwin/appui/pull/809)
- `Listbox`, `ListboxItem` components, `ListboxContext` and `ListboxValue` type in favor of [iTwinUI list](https://itwinui.bentley.com/docs/list). [#809](https://github.com/iTwin/appui/pull/809)
- `LoadingBar`, `LoadingPrompt`, `LoadingStatus` components in favor of [iTwinUI progress indicator](https://itwinui.bentley.com/docs/progressindicator). [#809](https://github.com/iTwin/appui/pull/809)
- `LoadingSpinner` component in favor of [iTwinUI radial progress indicator](https://itwinui.bentley.com/docs/progressindicator#progress-radial). [#809](https://github.com/iTwin/appui/pull/809)
- `SearchBox` component in favor of [iTwinUI SearchBox](https://itwinui.bentley.com/docs/searchbox). [#809](https://github.com/iTwin/appui/pull/809)
- `Tabs`, `VerticalTabs` components in favor of [iTwinUI Tabs](https://itwinui.bentley.com/docs/tabs). [#809](https://github.com/iTwin/appui/pull/809)
- `BlockText`, `DisabledText` components in favor of [iTwinUI Text](https://itwinui.bentley.com/docs/typography#text). [#809](https://github.com/iTwin/appui/pull/809)
- Deprecated all UI event classes (e.g. `SettingsProvidersChangedEvent`). These are only emitter classes and applications should not use these classes to instantiate objects. Therefore they should not be exported. [#806](https://github.com/iTwin/appui/pull/806)
- Deprecated all event args interfaces (e.g. `SettingsProvidersChangedEventArgs`). Event args should be inferred from a listener. If explicit type is needed use a type helper. [#806](https://github.com/iTwin/appui/pull/806)

### Changes

- Reuse iTwinUI components and update the visuals of `MessageCenterField` component. The component will now display a visual indicator when new messages are added. [#746](https://github.com/iTwin/appui/pull/746)
- Bump `useCrossOriginPopup` to `@public`. [#802](https://github.com/iTwin/appui/pull/802)

### Fixes

- Fix `PopoutWidget` getting increasingly bigger each time it is popped out. [#792](https://github.com/iTwin/appui/pull/792)
- Fix `Icon` to render correctly with nested conditional items. [#803](https://github.com/iTwin/appui/pull/803)

## @itwin/components-react

### Fixes

- Fix spacing between categories in `VirtualizedPropertyGrid`. [#812](https://github.com/iTwin/appui/pull/812)

## @itwin/imodel-components-react

### Deprecations

- Deprecated all UI event classes (e.g. `StandardRotationChangeEvent`). These are only emitter classes and applications should not use these classes to instantiate objects. Therefore they should not be exported. [#806](https://github.com/iTwin/appui/pull/806)
- Deprecated all event args interfaces (e.g. `StandardRotationChangeEventArgs`). Event args should be inferred from a listener. If explicit type is needed use a type helper. [#806](https://github.com/iTwin/appui/pull/806)
