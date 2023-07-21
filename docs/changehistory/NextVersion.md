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
-

## @itwin/components-react

### Additions

- Promoted `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to **@beta**.
- Added rendered specific interface `PropertyFilterBuilderRuleValueRendererProps` marked as **@beta**.
