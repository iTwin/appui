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
- Deprecated `AccuDrawCommandItems`. Use `KeyboardShortcutUtilities` or `ToolbarItemUtilities` instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `AnyItemDef`. Use type specific item definitions instead, i.e. `ToolbarItem`. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `areNoFeatureOverridesActive`, `featureOverridesActiveStateFunc`, `getFeatureOverrideSyncEventIds`, `getIsHiddenIfFeatureOverridesActive`, `getIsHiddenIfSelectionNotActive`, `getSelectionContextSyncEventIds`, `isNoSelectionActive`, `selectionContextStateFunc`. Use `ToolbarItems` or a custom conditional value instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `BackstageManager`. Use `UiFramework.backstage` instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `BaseItemState`. Define a custom state for your React components. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `ActionButtonItemDef`, `CustomItemDef`, `CustomItemProps`, `CommandHandler`, `CommandItemDef`, `CommandItemProps`, `GroupItemDef`, `GroupItemProps`, `ItemDefBase`, `ItemProps`, `ToolItemDef`, `ToolItemProps`. Use specific item types instead, i.e. `ToolbarActionItem`. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `CoreTools`, `SelectionContextToolDefinitions` classes. Use functions from `ToolbarItems` namespace instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `FrameworkBackstage.getBackstageToggleCommand()` method. Use `BackstageAppButton` component instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `FrameworkKeyboardShortcut.item` property. Use properties of `FrameworkKeyboardShortcut` object instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `ItemList`, `ItemMap` classes. Use `Array` or `Map` to store your objects. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `KeyboardShortcut` class. Use `KeyboardShortcutProps` or `FrameworkKeyboardShortcut` instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `KeyboardShortcutContainer` class. Use `FrameworkKeyboardShortcutContainer` instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `KeyboardShortcutMenu` component and `KeyboardShortcutMenuState` interface. This component is used internally via `UiFramework.keyboardShortcuts` APIs to display keyboard shortcuts in a context menu. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `MenuItem`, `MenuItemHelpers` classes. Use `@itwin/core-react#ContextMenuItem` and `@itwin/core-react#ContextSubMenu` components instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `NestedFrontstage` class. Use `NestedFrontstageAppButton` component instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `ToolbarHelper` class. Use functions from `ToolbarItemUtilities` namespace instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated `KeyboardShortcutProps.item`, `CursorMenuItemProps.item` properties. Use properties of the object instead. [#875](https://github.com/iTwin/appui/pull/875)
- Deprecated all APIs associated to `FrontstageProvider` class which added unnecessary bloat and layer of complication as it would always map to a single frontstage and forced API consumers to use inheritance. [#878](https://github.com/iTwin/appui/pull/878)
  - `addFrontstageProvider()` property of `FrameworkFrontstages` interface. Use `FrameworkFrontstages.addFrontstage()` instead.
  - `frontstageProvider` getter of `FrontstageDef` class. Use `FrontstageDef.id` to look up a frontstage.
  - `FrontstageProvider` class. Use `Frontstage` interface instead.
  - `StandardFrontstageProvider` class. Use `FrontstageUtilities.createStandardFrontstage()` function instead.
  - `FrontstageConfig` interface. Use `Frontstage` type instead.

### Additions

- Added additional APIs to support Redux store deprecation in backwards compatible way. [#853](https://github.com/iTwin/appui/pull/853)
  - `animateToolSettings`, `collapsePanels`, `toolAsToolSettingsLabel`, `toolbarOpacity`, `viewOverlay`, `widgetIcon`, `widgetOpacity` props to `ConfigurableUiContent` component.
  - `activeScope`, `selectionScopes`, `onChange` props to `SelectionScopeField` component.
  - `snapMode`, `onChange` props to `SnapModeField` component.
  - `theme` prop to `ThemeManager` component.
  - `getNumItemsSelected`, `setNumItemsSelected` static methods to `UiFramework` to facilitate selection count in conditional values.
- Added `KeyboardShortcutUtilities` namespace to provide utilities for creating keyboard shortcuts. [#875](https://github.com/iTwin/appui/pull/875)
- Added `NestedFrontstageAppButton` component which should be used to close a nested frontstage. [#875](https://github.com/iTwin/appui/pull/875)
- Added `ToolbarItems` namespace with functions to create commonly used toolbar items. [#875](https://github.com/iTwin/appui/pull/875)
- Added `ToolbarItemUtilities.createForTool()` function to create a toolbar item for a specified tool type.[#875](https://github.com/iTwin/appui/pull/875)
- Added `KeyboardShortcutProps.execute()`, `CursorMenuItemProps.execute()` properties to replace execute action of deprecated `item` properties. [#875](https://github.com/iTwin/appui/pull/875)
- Added additional APIs to support `FrontstageProvider` deprecation. [#878](https://github.com/iTwin/appui/pull/878)
  - Added `FrontstageUtilities` namespace to provide utilities for creating frontstages.
  - `addFrontstage()` property to `FrameworkFrontstages` interface.
  - `Frontstage` alias type to rename existing `FrontstageConfig`.
  - Expanded a union type of a static `FrontstageDef.create()` method to allow `Frontstage` type together with `FrontstageProvider`.

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
