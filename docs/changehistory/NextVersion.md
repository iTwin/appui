# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Deprecations](#deprecations)

## @itwin/appui-react

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)

### Additions

- Added `UiFramework.onIModelConnectionChanged` event to get notified whenever the iModel targeted by `UiFramework.getIModelConnection()` changes. This is a replacement for listening to the deprecated `SessionStateActionId.SetIModelConnection`.

## @itwin/components-react

### Additions

- Added `useDefaultPropertyFilterBuilderRuleValidator` hook to get default validator for rules in `PropertyFilterBuilder` component. [#1000](https://github.com/iTwin/appui/pull/1000)

### Deprecations

- Deprecated `defaultPropertyFilterBuilderRuleValidator`. Newly added `useDefaultPropertyFilterBuilderRuleValidator` should be used instead. [#1000](https://github.com/iTwin/appui/pull/1000)
