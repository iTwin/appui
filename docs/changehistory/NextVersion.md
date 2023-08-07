# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Additions

- Added `BlankConnection` event handling to `SyncUiEventDispatcher` to consistently match other `IModelConnection` types.

### Fixes

- Fixed store initialization when iModelConnection is set.
- Fixed store reset when iModelConnection is cleared.
- Fixed `clearHideIsolateEmphasizeElements` and `hideElements` button display when view changes happen outside AppUI's API.

## @itwin/components-react

### Additions

- Promoted `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to **@beta**.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.

## @itwin/core-react

### Fixes

- Center and decrease size of arrow in `SubContextMenu`.
- Added `PropertyFilterBuilderRenderer`, `PropertyFilterBuilderRendererProps`, `defaultPropertyFilterBuilderRuleValidator`, `UsePropertyFilterBuilderProps`, `UsePropertyFilterBuilderResult`, `usePropertyFilterBuilder`, marked as **@beta**.
- Promoted `isPropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRule`, `PropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRuleGroupItem`, `PropertyFilterBuilderState` to **@beta**.
