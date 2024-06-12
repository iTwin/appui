# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Deprecations

- All Redux associated APIs are deprecated. The necessity for a Redux store will be eliminated in the upcoming releases. Instead, new applications should use their preferred state management library instead. For existing applications it is recommended to continue wrapping the application with Redux `Provider` and `FrameworkState` to maintain the compatibility with the existing redux specific APIs and components, until component libraries migrate away from the deprecated APIs. [#853](https://github.com/iTwin/appui/pull/853)
  - `Action`, `ActionCreatorsObject`, `ActionsUnion`, `ActionTypes`, `ActionWithPayload`, `CombinedReducerState`, `combineReducers`, `CombineReducersFunction`, `createAction`, `DeepReadonly`, `DeepReadonlyArray`, `DeepReadonlyObject`, `FunctionType`, `NameToReducerMap`, `Reducer`, `ReducerActions`, `ReducerMapActions`, `ReducerRegistry`, `ReducerRegistryInstance`, `StateType`, `StateManager` APIs that are specific to Redux. Use APIs from redux ecosystem i.e. `@reduxjs/toolkit` or your preferred state management library instead.
  - `ConfigurableUiActionId`, `ConfigurableUiActions`, `ConfigurableUiActionsUnion`, `ConfigurableUiReducer`, `ConfigurableUiState`, `SessionState`, `SessionStateActionId`, `SessionStateActions`, `SessionStateActionsProps`, `SessionStateActionsUnion`, `sessionStateMapDispatchToProps`, `SessionStateReducer`, `FrameworkReducer`, `FrameworkState`, `connectIModelConnection`, `connectIModelConnectionAndViewState`, `PresentationSelectionScope` APIs that are related to AppUI framework store. Use replacements suggested for `SessionState` and `ConfigurableUiState` properties instead.
  - `AppUiSettings`, `InitialAppUiSettings` APIs. Use `UiStateStorage` to persist UI settings instead.
  - `UiSettingsPage` component. Use iTwinUI components to build a settings page.
  - `IModelConnectedViewport` component. Use `ViewportComponent` instead.
  - `IModelConnectedViewSelector` component. Use `ViewSelector` instead.
  - `SelectionInfoField` component. Use `SelectionCountField` instead.
  - Static methods and properties of `UiFramework` related to redux store.
  - Deprecated `StandardMessageBox` in favor of [iTwinUI Dialog](https://itwinui.bentley.com/docs/dialog). [#866](https://github.com/iTwin/appui/pull/866)
  - Deprecated `provideToolbarItems`, `provideStatusBarItems`, `provideWidgets` and `provideBackstageItems` methods of `UiItemsProvider`. Use `getToolbarItems`, `getStatusBarItems`, `getWidgets` and `getBackstageItems` methods of `UiItemsProvider` instead. [#874](https://github.com/iTwin/appui/pull/874)

### Additions

- Added additional APIs to support Redux store deprecation in backwards compatible way. [#853](https://github.com/iTwin/appui/pull/853)
  - `animateToolSettings`, `collapsePanels`, `toolAsToolSettingsLabel`, `toolbarOpacity`, `viewOverlay`, `widgetIcon`, `widgetOpacity` props to `ConfigurableUiContent` component.
  - `activeScope`, `selectionScopes`, `onChange` props to `SelectionScopeField` component.
  - `snapMode`, `onChange` props to `SnapModeField` component.
  - `theme` prop to `ThemeManager` component.
  - `getNumItemsSelected`, `setNumItemsSelected` static methods to `UiFramework` to facilitate selection count in conditional values.
- `controlWidgetVisibility` preview feature. When enabled, additional UI elements are rendered to allow the end user of the layout to control widget visibility. [#856](https://github.com/iTwin/appui/pull/856)

  Currently applications might use `WidgetState` to control widget visibility programmatically and expect the widgets to stay hidden until a certain condition is met. Since this preview feature adds UI elements to control widget visibility, it might conflict with the application's logic. To avoid this, the application should use `UiItemsManager.register()` and `UiItemsManager.unregister()` to strictly manage what widgets are available to the end-user.

  Additionally an array of widget ids can be specified to only expose visibility controls for specific widgets. This allows applications to experiment with other use-cases, like keeping at least one widget visible at all times.

### Changes

- Bumped `getToolbarItems`, `getStatusBarItems`, `getWidgets` and `getBackstageItems` methods of `UiItemsProvider`, `layouts` property of `CommonToolbarItem` and `Widget`, `StandardLayoutToolbarItem`, `StandardLayoutWidget`, `ToolbarItemLayouts`, `WidgetLayouts` to `@public`. [#874](https://github.com/iTwin/appui/pull/874)

## @itwin/core-react

### Deprecations

- Deprecated `HorizontalAlignment`, `VerticalAlignment`, `CheckBoxInfo`, `SortDirection`, `withIsPressed`, `withOnOutsideClick`, `withTimeout`, `MessageRenderer`, `MessageType`, `ReactMessage`, `FilteredText`, `IconHelper`, `ClassNameProps`, `CommonProps`, `CommonDivProps`, `NoChildrenProps`, `OmitChildrenProp`, `ScrollPositionMaintainer`, `ExecuteHandler`, `Timer`, `getCssVariable`, `getCssVariableAsNumber`, `useInterval`, `OutsideClickEvent`, `useOnOutsideClick`, `ElementResizeObserver`. These components and functions are intended for internal AppUI usage or are not used by AppUI at all. [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `SvgPath` and `WebFontIcon`. Please use `@itwin/itwinui-icons-react` package (or svg element directly in the case of `SvgPath`) instead. [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `MessageBox` and `MessageContainer` in favor of [iTwinUI Dialog](https://itwinui.bentley.com/docs/dialog). [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `Popup` in favor of [iTwinUI Popover](https://itwinui.bentley.com/docs/popover). [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `TreeBranch`, `ExpansionToggle`, `TreeNode`, `NodeCheckBoxProps`, `TreeNodePlaceholder`, `Tree` in favor of [iTwinUI Tree](https://itwinui.bentley.com/docs/tree). [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `useOptionalDisposable`. Use `useState` + `useEffect` for creating and disposing disposable resources. [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `useEffectSkipFirst`. Use `useEffect` instead. [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `ResizableContainerObserver`. Please use third party packages. [#866](https://github.com/iTwin/appui/pull/866)
- Deprecated `Omit`. Use TypeScript `Omit`. [#866](https://github.com/iTwin/appui/pull/866)
