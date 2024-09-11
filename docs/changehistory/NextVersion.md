# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Deprecations](#deprecations)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)

### Deprecations

- Deprecated `UiFramework.setIsUiVisible` and `UiFramework.getIsUiVisible`. [#1023](https://github.com/iTwin/appui/pull/1023)

## @itwin/components-react

### Additions

- Added `useDefaultPropertyFilterBuilderRuleValidator` hook to get default validator for rules in `PropertyFilterBuilder` component. [#1000](https://github.com/iTwin/appui/pull/1000)

### Deprecations

- Deprecated `defaultPropertyFilterBuilderRuleValidator`. Newly added `useDefaultPropertyFilterBuilderRuleValidator` should be used instead. [#1000](https://github.com/iTwin/appui/pull/1000)
