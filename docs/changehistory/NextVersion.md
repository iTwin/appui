# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions-1)
  - [Changes](#changes-1)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Additions

- `activateDroppedTab` preview feature to activate a dragged widget tab whenever it is dropped in the receiving container. #601
- `useWidget` hook to convey widget state and location. #655

### Changes

- The package no longer depends on `@itwin/appui-layout-react` and have been removed from `peerDependencies`. Since the `4.0.0` release, this package only contained _internal_ components and the content of the package have been moved to `@itwin/appui-react` to reduce application maintenance of maintaining the locksteps packages. #697

  `@itwin/appui-layout-react` will no longer be published as a separate package.

## @itwin/components-react

### Deprecations

- `usePropertyGridModelSource` hook in favor of `useTrackedPropertyGridModelSource`. #660
- `useTreeEventsHandler` hook because it does not work correctly in React 18 Strict mode. `useControlledTreeEventsHandler` should be used instead. #676
- `ruleGroupDepthLimit` property of `PropertyFilterBuilderRendererProps`. Nested rule groups are no longer supported. #686

### Additions

- `useTrackedPropertyGridModelSource` hook to create a `PropertyGridModelSource` and track changes in the data provider while also providing information on the data update progress. #660
- `useControlledTreeEventsHandler` which should be used as a replacement to now deprecated `useTreeEventsHandler`. #676
- `clearSelection` argument in `HideIsolateEmphasizeActionHandler.processIsolateSelected()` to control whether the selection is cleared. #682
- Added `PropertyFilterBuilderLogicalOperator` component and `PropertyFilterBuilderLogicalOperatorProps` to render the logical operator inside of the filter builder. #686
- Added `PropertyFilterBuilderToolbar` component to display the action buttons in the filter builder. #686
- Added `isGroupOperatorDisabled` property of `PropertyFilterBuilderRendererProps` to control whether the group operator is toggle-able. #686
- Added support for `Between` and `Not between` operators in `PropertyFilterBuilder`. This required to make some breaking changes to `@beta` APIs of `PropertyFilterBuilder`. These changes include internal components of `PropertyFilterBuilder` (`PropertyFilterBuilderRuleValue` and `PropertyFilterBuilderActions`) that are exposed to allow customizing `PropertyFilterBuilder` component. If `PropertyFilterBuilder` is used without any customizations these changes should not break anything. [#702](https://github.com/iTwin/appui/pull/702)
  - Updated `PropertyFilterRule.operator` property type to support setting it using `PropertyFilterRuleOperator` enum or string value.
  - Updated `PropertyFilterRuleGroup.operator` property type to support setting it using `PropertyFilterRuleGroupOperator` enum or string value.
  - Changed `PropertyFilterBuilderRuleValue` component props to `PropertyFilterBuilderRuleValueRendererProps` in order to have access to rule operator when rendering value input.
  - Changed `PropertyFilterBuilderRule.operator` type from `PropertyFilterRuleOperator` to `PropertyFilterBuilderRuleOperator`.
  - Renamed `getPropertyFilterOperators` to `getPropertyFilterBuilderOperators`.
  - Renamed `getPropertyOperatorLabel` to `getPropertyFilterBuilderOperatorLabel`.
  - Renamed `PropertyFilterBuilderRuleOperatorProps` to `PropertyFilterBuilderRuleOperatorRendererProps`.
  - Added `PropertyFilterBuilderRuleOperator` type that has `between` and `not-between` value in addition to `PropertyFilterRuleOperator` values.
  - Added `isUnaryPropertyFilterBuilderOperator` for checking if `PropertyFilterBuilderRuleOperator` is unary.
  - Added `PropertyFilterBuilderRuleRangeValue`. It is used to specify value for `Between` and `Not between` operator in `PropertyFilterBuilder`.

### Changes

- Show loading spinner in subsequent loads if delay threshold is reached in `VirtualizedPropertyGrid.`. #660
- Updated UI of the `FilterBuilder` component. #686

## @itwin/core-react

### Deprecations

- `useDisposable` hook because it does not work correctly in React 18 Strict mode. `useOptionalDisposable` or `useState` + `useEffect` should be used instead to manage disposable resources. #676
