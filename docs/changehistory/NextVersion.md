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
- Fixed `openCursorMenu` function so that it opens cursor menu in Strict Mode in React 18.

## @itwin/components-react

### Additions

- Promoted `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to **@beta**.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.
- Added `PropertyFilterBuilderRenderer`, `PropertyFilterBuilderRendererProps`, `defaultPropertyFilterBuilderRuleValidator`, `UsePropertyFilterBuilderProps`, `UsePropertyFilterBuilderResult`, `usePropertyFilterBuilder`, marked as **@beta**.
- Promoted `isPropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRule`, `PropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRuleGroupItem`, `PropertyFilterBuilderState` to **@beta**.
