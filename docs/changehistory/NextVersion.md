# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-1)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-2)
  - [Changes](#changes-1)

## @itwin/appui-react

### Deprecations

- Deprecated all UI event classes (e.g. `ContentControlActivatedEvent`). These are only emitter classes that should not be exported. It is possible to use `BeUiEvent<EventArgs>` (`EventArgs` can be any of the exported event args interfaces e.g. `ContentControlActivatedEventArgs`) instead.

### Changes

- Bump `FloatingViewportContentWrapper` to `@public`. [#801](https://github.com/iTwin/appui/pull/801)

## @itwin/imodel-components-react

### Deprecations

- Deprecated all UI event classes (e.g. `StandardRotationChangeEvent`). These are only emitter classes that should not be exported. It is possible to use `BeUiEvent<EventArgs>` (`EventArgs` can be any of the exported event args interfaces e.g. `StandardRotationChangeEventArgs`) instead.

## @itwin/core-react

### Deprecations

- `Centered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex), i.e. `<Flex justifyContent="center" />`. [#795](https://github.com/iTwin/appui/pull/795)
- `Div` component in favor of HTMLDivElement i.e. `<div />`. [#795](https://github.com/iTwin/appui/pull/795)
- `DivWithOutsideClick` component in favor of [iTwinUI popover `closeOnOutsideClick`](https://itwinui.bentley.com/docs/popover). [#795](https://github.com/iTwin/appui/pull/795)
- `FillCentered` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `FlexWrapContainer` component in favor of [iTwinUI Flex](https://itwinui.bentley.com/docs/flex). [#795](https://github.com/iTwin/appui/pull/795)
- `Gap` component in favor of [iTwinUI size variables](https://itwinui.bentley.com/docs/variables#size). [#795](https://github.com/iTwin/appui/pull/795)
- `ScrollView` component in favor of [overflow property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). [#795](https://github.com/iTwin/appui/pull/795)
- Deprecated all UI event classes (e.g. `SettingsProvidersChangedEvent`). These are only emitter classes that should not be exported. It is possible to use `BeUiEvent<EventArgs>` (`EventArgs` can be any of the exported event args interfaces e.g. `SettingsProvidersChangedEventArgs`) instead.

### Changes

- Bump `useCrossOriginPopup` to `@public`. [#802](https://github.com/iTwin/appui/pull/802)
