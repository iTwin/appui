# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)
- [@itwin/core-react](#itwincore-react)
  - [Additions](#additions-2)

## @itwin/appui-react

### Additions

- Added `BlankConnection` event handling to `SyncUiEventDispatcher` to consistently match other `IModelConnection` types.
- `Toolbar` component now have `enableOverflow` and `overflowExpandsTo` props which effectively replicates the behavior of `ToolbarWithOverflow` if enabled.

### Fixes

- Fixed store initialization when iModelConnection is set.
- Fixed store reset when iModelConnection is cleared.
- Fixed `clearHideIsolateEmphasizeElements` and `hideElements` button display when view changes happen outside AppUI's API.
- Fixed `Toolbar` and `ToolbarWithOverflow` to correctly handle `ConditionalStringValue`, `ConditionalBooleanValue` and `ConditionalIconValue` tool item properties.

### Deprecations

- `ToolbarWithOverflow` is now deprecated in favor of the `Toolbar` with `enableOverflow` prop set to `true`.
- `useUiItemsProviderToolbarItems` is now deprecated in favor of the fixed `Toolbar` [^1].
- `useDefaultToolbarItems` is now deprecated in favor of the fixed `Toolbar` [^1].

[^1]: These hooks were exposed as **@public** and have `ToolbarItemsManager` **@internal** class as an argument, which contained the `Conditional*Value` refreshing logic. The logic have been cleaned up and now use simpler React hooks to handle the same behavior. As such, the `ToolbarItemsManager` is no longer used internally and will not be maintained. As the `Toolbar` component correctly handle the Conditionals, it should no longer be needed in any case.

## @itwin/components-react

### Additions

- Promoted `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to **@beta**.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.

## @itwin/core-react

### Additions

- `ConditionalIconItem.isConditionalIconItem` is now a `ConditionalIconItem` _type predicate_, on top of returning a boolean.
