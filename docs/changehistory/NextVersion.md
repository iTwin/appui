# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Deprecations

- Deprecated `BaseUiItemsProvider`, `StandardContentToolsProvider`, `StandardNavigationToolsProvider`, `StandardStatusbarItemsProvider` classes. Use `UiItemsProviderOverrides` to specify supported frontstages when registering the provider.
- Deprecated `DefaultContentToolsAppData` interface that is a remnant of discontinued frontstage APIs.
- Deprecated `StandardContentToolsUiItemsProvider.provideStatusBarItems`, `StandardContentToolsUiItemsProvider.provideToolbarItems`, `StandardNavigationToolsUiItemsProvider.provideToolbarItems`, `StandardStatusbarUiItemsProvider.provideStatusBarItems` methods. Use `get*` variants instead.

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)
- Bump `StandardContentToolsUiItemsProvider`, `StandardStatusbarUiItemsProvider` classes to `@public`.

## @itwin/components-react

### Additions

- Added `useDefaultPropertyFilterBuilderRuleValidator` hook to get default validator for rules in `PropertyFilterBuilder` component. [#1000](https://github.com/iTwin/appui/pull/1000)

### Deprecations

- Deprecated `defaultPropertyFilterBuilderRuleValidator`. Newly added `useDefaultPropertyFilterBuilderRuleValidator` should be used instead. [#1000](https://github.com/iTwin/appui/pull/1000)
