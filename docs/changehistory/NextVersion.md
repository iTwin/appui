# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations-1)
  - [Changes](#changes-1)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

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

- The dropdown menu of `widgetActionDropdown` preview feature will close once one of the menu items is activated. [#856](https://github.com/iTwin/appui/pull/856)
- The labels for the buttons in the widget title bar will be rendered as tooltips, rather than using the `title` attribute. [#856](https://github.com/iTwin/appui/pull/856)

## @itwin/components-react

### Deprecations

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer` in favor of default `PrimitivePropertyValueRenderer`. [#832](https://github.com/iTwin/appui/pull/832)
- Deprecated `RadialMenu` and `RadialButton` components that were designed for a retired design pattern in favor of `ContextMenu` or [iTwinUI dropdown menu](https://itwinui.bentley.com/docs/dropdownmenu). [#850](https://github.com/iTwin/appui/pull/850)

### Changes

- Updated `VirtualizedPropertyGrid` component. [#849](https://github.com/iTwin/appui/pull/849)
  - Enable user selection for property records
  - Display browser context menu on property records if `onPropertyContextMenu` and `isPropertySelectionOnRightClickEnabled` props are not set
  - Increased area of an element separator to avoid column overlap

## @itwin/core-react

### Fixes

- Fixed SVG icon alignment in `ContextMenuItem` component. [#840](https://github.com/iTwin/appui/pull/840)
- Fixed `ContextSubMenu` to correctly render provided SVG icon. [#840](https://github.com/iTwin/appui/pull/840)
