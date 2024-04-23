# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-1)
  - [Changes](#changes-1)

## @itwin/appui-react

### Deprecations

- `UiFramework.isMobile()` method in favor of `ProcessDetector.isMobileBrowser()` from `@itwin/core-bentley`.

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

### Changes

- Bump `useCrossOriginPopup` to `@public`. [#802](https://github.com/iTwin/appui/pull/802)
