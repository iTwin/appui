# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions-1)
  - [Changes](#changes)

## @itwin/appui-react

### Additions

- `activateDroppedTab` preview feature to activate a dragged widget tab whenever it is dropped in the receiving container. #601
- `useWidget` hook to convey widget state and location. #655

## @itwin/components-react

### Deprecations

- `usePropertyGridModelSource` hook in favor of `useTrackedPropertyGridModelSource`. #660
- `ruleGroupDepthLimit` property of `PropertyFilterBuilderRendererProps`. Nested rule groups are no longer supported. #686

### Additions

- `useTrackedPropertyGridModelSource` hook to create a `PropertyGridModelSource` and track changes in the data provider while also providing information on the data update progress. #660
- `PropertyFilterBuilderLogicalOperator` component and `PropertyFilterBuilderLogicalOperatorProps` to render the logical operator inside of the filter builder. #686
- `PropertyFilterBuilderToolbar` component to display the action buttons in the filter builder. #686
- `isGroupOperatorDisabled` property of `PropertyFilterBuilderRendererProps` to control whether the group operator is toggle-able. #686

### Changes

- Show loading spinner in subsequent loads if delay threshold is reached in `VirtualizedPropertyGrid.`. #660
- Updated UI of the `FilterBuilder` component. #686
