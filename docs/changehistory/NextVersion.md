# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Improvements](#improvements)
  - [Changes](#changes)
  - [FilterBuilder changes](#filterbuilder-changes)
- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)

## @itwin/components-react

## Changes

- Updated UI for the `FilterBuilder` component.
- Deprecated support for nested rule groups.

### Improvements

- Show loading spinner in subsequent loads if delay threshold is reached `VirtualizedPropertyGrid.`

### FilterBuilder changes

Added support for `Between` and `Not between` operators in `PropertyFilterBuilder`. This required to make some breaking changes to `@beta` APIs of `PropertyFilterBuilder`. These changes include internal components of `PropertyFilterBuilder` (`PropertyFilterBuilderRuleOperator`, `PropertyFilterBuilderRuleValue` and `PropertyFilterBuilderActions`) that are exposed to allow customizing `PropertyFilterBuilder` component. If `PropertyFilterBuilder` is used without any customizations these changes should not break anything.

- Updated `PropertyFilterRule.operator` property type to support setting it using `PropertyFilterRuleOperator` enum or string value.
- Changed `PropertyFilterBuilderRuleValue` component props to `PropertyFilterBuilderRuleValueRendererProps` in order to have access to rule operator when rendering value input.
- Changed `PropertyFilterBuilderRule.operator` type from `PropertyFilterRuleOperator` to `PropertyFilterBuilderRuleOperator`.
- Renamed `getPropertyFilterOperators` to `getPropertyFilterBuilderOperators`.
- Renamed `getPropertyOperatorLabel` to `getPropertyFilterBuilderOperatorLabel`.
- Renamed `PropertyFilterBuilderRuleOperator` component to `PropertyFilterBuilderRuleOperatorRenderer` and `PropertyFilterBuilderRuleOperatorProps` to `PropertyFilterBuilderRuleOperatorRendererProps`.
- Added `PropertyFilterBuilderRuleOperator` type that has `between` and `not-between` value in addition to `PropertyFilterRuleOperator` values.
- Added `isUnaryPropertyFilterBuilderOperator` for checking if `PropertyFilterBuilderRuleOperator` is unary.
- Added `PropertyFilterBuilderRuleRangeValue`. It is used to specify value for `Between` and `Not between` operator in `PropertyFilterBuilder`.

## @itwin/appui-react

### Additions

- `useWidget` hook to convey widget state and location.
- `activateDroppedTab` preview feature to activate a dragged widget tab whenever it is dropped in the receiving container. #601
