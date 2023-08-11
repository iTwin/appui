# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)
- [@itwin/core-react](#itwincore-react)
  - [Additions](#additions-2)
  - [Fixes](#fixes)

## @itwin/appui-react

### Additions

- Added `BlankConnection` event handling to `SyncUiEventDispatcher` to consistently match other `IModelConnection` types.
- `Toolbar` component now have `enableOverflow` and `overflowExpandsTo` props which effectively replicates the behavior of `ToolbarWithOverflow` if enabled.

### Fixes

- Fixed store initialization when iModelConnection is set.
- Fixed store reset when iModelConnection is cleared.
- Fixed `clearHideIsolateEmphasizeElements` and `hideElements` button display when view changes happen outside AppUI's API.
- Fixed `openCursorMenu` function so that it opens cursor menu in Strict Mode in React 18.
- Fixed `Toolbar` and `ToolbarWithOverflow` to correctly handle `ConditionalStringValue`, `ConditionalBooleanValue` and `ConditionalIconValue` tool item properties.

### Deprecations

- `ToolbarWithOverflow` is now deprecated in favor of the `Toolbar` with `enableOverflow` prop set to `true`.
- `useUiItemsProviderToolbarItems` is now deprecated in favor of the fixed `Toolbar` [^1].
- `useDefaultToolbarItems` is now deprecated in favor of the fixed `Toolbar` [^1].

[^1]: `useUiItemsProviderToolbarItems` and `useDefaultToolbarItems` hooks were using **@internal** `ToolbarItemsManager` class as an argument to facilitate the `Conditional*Value` refresh logic. Since the `Toolbar` component now correctly handles the conditionals, the deprecated hooks should no longer be needed in any case.

## @itwin/components-react

### Additions

- Promoted `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to **@beta**.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.

## @itwin/core-react

### Additions

- `ConditionalIconItem.isConditionalIconItem` is now a `ConditionalIconItem` _type predicate_, on top of returning a boolean.

### Fixes

- Center and decrease size of arrow in `SubContextMenu`.
- Added `PropertyFilterBuilderRenderer`, `PropertyFilterBuilderRendererProps`, `defaultPropertyFilterBuilderRuleValidator`, `UsePropertyFilterBuilderProps`, `UsePropertyFilterBuilderResult`, `usePropertyFilterBuilder`, marked as **@beta**.
- Promoted `isPropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRule`, `PropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRuleGroupItem`, `PropertyFilterBuilderState` to **@beta**.
- `PropertyFilterBuilder`: Fixed bug where the user couldn't change rule group operator.
- `PropertyFilterBuilder`: Keep the rule value the same when the operator changes between `Less`, `LessOrEqual`, `Greater`, `GreaterOrEqual` and `IsEqual`, `IsNotEqual`, otherwise clear it.
