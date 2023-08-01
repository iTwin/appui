# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)

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
- Promoted `isPropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderActions`, `PropertyFilterBuilderProps`, `PropertyFilterBuilderRenderer`, `PropertyFilterBuilderRendererProps`, `PropertyFilterBuilderRule`
  `PropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRuleGroupItem`, `PropertyFilterBuilderState`, `usePropertyFilterBuilder`, `UsePropertyFilterBuilderProps` to **@beta** and added `errorMessage` to
  `PropertyFilterBuilderRule`.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.
