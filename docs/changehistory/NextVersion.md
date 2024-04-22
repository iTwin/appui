# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes-1)

## @itwin/appui-react

### Changes

- Bump `FloatingViewportContentWrapper` to `@public`. [#801](https://github.com/iTwin/appui/pull/801)

## @itwin/core-react

### Deprecations

- `Centered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex), i.e. `<Flex justifyContent="center" />`. [#795](https://github.com/iTwin/appui/pull/795)
- `Div` component in favor of HTMLDivElement i.e. `<div />`. [#795](https://github.com/iTwin/appui/pull/795)
- `DivWithOutsideClick` component in favor of [iTwinUI popover `closeOnOutsideClick`](https://itwinui.bentley.com/docs/popover). [#795](https://github.com/iTwin/appui/pull/795)
- `FillCentered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `FlexWrapContainer` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `Gap` component in favor of [iTwinUI size variables](https://itwinui.bentley.com/docs/variables#size). [#795](https://github.com/iTwin/appui/pull/795)
- `ScrollView` component in favor of [overflow property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). [#795](https://github.com/iTwin/appui/pull/795)
- `BlockText`, `DisabledText` components in favor of [iTwinUI Text](https://itwinui.bentley.com/docs/typography#text).
- `CheckListBox`, `CheckListBoxItem`, `CheckListBoxSeparator` components in favor of [iTwinUI list](https://itwinui.bentley.com/docs/list).
- `Dialog`, `GlobalDialog` components and `DialogAlignment` enum in favor of [iTwinUI Dialog](https://itwinui.bentley.com/docs/dialog).
- `ElementSeparator` without a direct replacement as components that need to be user-resized support this out of the box.
- `ExpandableList` component in favor of [iTwinUI expandable block](https://itwinui.bentley.com/docs/expandableblock).
- `IconInput` component in favor of [iTwinUI input decorations](https://itwinui.bentley.com/docs/inputwithdecorations).
- `ImageCheckBox` component in favor of [iTwinUI checkbox](https://itwinui.bentley.com/docs/checkbox).
- `InputLabel` component and `InputStatus` enum in favor of [iTwinUI input](https://itwinui.bentley.com/docs/input).
- `Listbox`, `ListboxItem` components, `ListboxContext` and `ListboxValue` type in favor of [iTwinUI list](https://itwinui.bentley.com/docs/list).
- `LoadingBar`, `LoadingPrompt`, `LoadingStatus` components in favor of [iTwinUI progress indicator](https://itwinui.bentley.com/docs/progressindicator).
- `LoadingSpinner` component in favor of [iTwinUI radial progress indicator](https://itwinui.bentley.com/docs/progressindicator#progress-radial).
- `SearchBox` component in favor of [iTwinUI SearchBox](https://itwinui.bentley.com/docs/searchbox).
- `Tabs`, `VerticalTabs` components in favor of [iTwinUI Tabs](https://itwinui.bentley.com/docs/tabs).
- `BlockText`, `DisabledText` components in favor of [iTwinUI Text](https://itwinui.bentley.com/docs/typography#text).

### Changes

- Bump `useCrossOriginPopup` to `@public`. [#802](https://github.com/iTwin/appui/pull/802)
