# NextVersion

Table of contents:

- [Migration strategy](#migration-strategy)
- [iTwinUI 2.0](#itwinui-20)
- [@itwin/appui-layout-react](#itwinappui-layout-react)
- [@itwin/appui-abstract](#itwinappui-abstract)
- [@itwin/appui-react](#itwinappui-react)
  - [Static manager classes](#static-manager-classes)
- [@itwin/core-react](#itwincore-react)
- [@itwin/components-react](#itwincomponents-react)
- [@bentley/icons-generic-webfont](#bentleyicons-generic-webfont)

## Migration strategy

[@itwin/appui-codemod](../tools/codemod/README.md) tool exists to facilitate the migration.
For regular use cases it should be enough to run the tool with full 4.0.0 transformations:

`npx @itwin/appui-codemod v4.0.0/full ./my-app/`

After running the tool review the changes and make required adjustments.
Consult the documentation below for guidance on handling API changes.

## iTwinUI 2.0

With the 4.0 release, AppUI has updated its [@itwin/itwinui-react](https://www.npmjs.com/package/@itwin/itwinui-react) dependency to the 2.0 version.
Since AppUI uses iTwinUI to style elements that can contain application-specific content, consumers of AppUI 4.0 must upgrade to iTwinUI 2.0 or later.

## @itwin/appui-layout-react

All APIs are marked as internal. `@itwin/appui-layout-react` package is considered as internal implementation detail of the `@itwin/appui-react` package and should not be used directly.

| API from *@itwin/appui-layout-react* | Replacement in *@itwin/appui-react*                       |
| ------------------------------------ | --------------------------------------------------------- |
| `Dialog`                             | `StatusBarDialog`                                         |
| `DialogProps`                        | `StatusBarDialogProps`                                    |
| `FooterIndicator`                    | `StatusBarIndicator` or `StatusBar.Field`                 |
| `FooterIndicatorProps`               | `StatusBarIndicatorProps`                                 |
| `FooterPopup`                        | `popup` prop of `StatusBarIndicator` or `StatusBar.Popup` |
| `FooterPopupProps`                   | Removed                                                   |
| `FooterPopupContentType`             | Removed                                                   |
| `FooterPopupDefaultProps`            | Removed                                                   |
| `FooterSeparator`                    | `StatusBarSeparator`                                      |
| `FooterSeparatorProps`               | Removed                                                   |
| `SafeAreaInsets`                     | `SafeAreaInsets`                                          |
| `TitleBar`                           | `StatusBarDialog.TitleBar`                                |
| `TitleBarProps`                      | `StatusBarDialogTitleBarProps`                            |

## @itwin/appui-abstract

AppUI related definitions from `@itwin/appui-abstract` are moved into `@itwin/appui-react`.

| API from *@itwin/appui-abstract*          | Replacement in *@itwin/appui-react*     |
| ----------------------------------------- | --------------------------------------- |
| `BackstageItem`                           | `BackstageItem`                         |
| `BackstageItemType`                       | Removed                                 |
| `isActionItem`                            | `isBackstageActionItem`                 |
| `isStageLauncher`                         | `isBackstageStageLauncher`              |
| `BackstageItemUtilities`                  | `BackstageItemUtilities`                |
| `ProvidedItem`                            | `ProviderItem`.                         |
| `StatusBarSection`                        | `StatusBarSection`                      |
| `StatusBarLabelSide`                      | `StatusBarLabelSide`                    |
| `StatusBarItemId`                         | `StatusBarItem["id"]`                   |
| `AbstractStatusBarItem`                   | `CommonStatusBarItem`                   |
| `AbstractStatusBarActionItem`             | `StatusBarActionItem`                   |
| `AbstractStatusBarLabelItem`              | `StatusBarLabelItem`                    |
| `AbstractStatusBarCustomItem`             | `StatusBarCustomItem`                   |
| `CommonStatusBarItem`                     | `StatusBarItem`                         |
| `isAbstractStatusBarActionItem`           | `isStatusBarActionItem`                 |
| `isAbstractStatusBarLabelItem`            | `isStatusBarLabelItem`                  |
| `isAbstractStatusBarCustomItem`           | `isStatusBarCustomItem`                 |
| `AbstractStatusBarItemUtilities`          | `StatusBarItemUtilities`                |
| `AbstractWidgetProps`                     | `Widget`                                |
| `WidgetState`                             | `WidgetState`                           |
| `StagePanelLocation`                      | `StagePanelLocation`                    |
| `StagePanelSection`                       | `StagePanelSection`                     |
| `ToolbarUsage`                            | `ToolbarUsage`                          |
| `ToolbarOrientation`                      | `ToolbarOrientation`                    |
| `ToolbarItem`                             | `CommonToolbarItem`                     |
| `ActionButton`                            | `ToolbarActionItem`                     |
| `GroupButton`                             | `ToolbarGroupItem`                      |
| `CustomButtonDefinition`                  | `ToolbarCustomItem`                     |
| `CommonToolbarItem`                       | `ToolbarItem`                           |
| `ToolbarItemId`                           | `ToolbarItem["id"]`                     |
| `ToolbarItemUtilities`                    | `ToolbarItemUtilities`                  |
| `ToolbarItemUtilities.createActionButton` | `ToolbarItemUtilities.createActionItem` |
| `ToolbarItemUtilities.createGroupButton`  | `ToolbarItemUtilities.createGroupItem`  |
| `ToolbarItemUtilities.isActionButton`     | `isToolbarActionItem`                   |
| `ToolbarItemUtilities.isGroupButton`      | `isToolbarGroupItem`                    |
| `ToolbarItemUtilities.isCustomDefinition` | `isToolbarCustomItem`                   |
| `UiItemsProvider`                         | `UiItemsProvider`                       |
| `BaseUiItemsProvider`                     | `BaseUiItemsProvider`                   |
| `UiItemProviderRegisteredEventArgs`       | `UiItemsProviderRegisteredEventArgs`    |
| `AllowedUiItemProviderOverrides`          | `AllowedUiItemsProviderOverrides`       |
| `UiItemProviderOverrides`                 | `UiItemsProviderOverrides`              |
| `UiItemsManager`                          | `UiItemsManager`                        |
| `StageUsage`                              | `StageUsage`                            |

## @itwin/appui-react

A number of previously deprecated **UI1.0** related APIs and components are removed:

| API                       |
| ------------------------- |
| `FrameworkVersion`        |
| `FrameworkVersionContext` |
| `FrameworkVersionId`      |
| `FrameworkVersionProps`   |
| `ListPickerBase`          |
| `useFrameworkVersion`     |
| `NineZoneChangeHandler`   |
| `StagePanelChangeHandler` |
| `WidgetStateFunc`         |
| `ZoneDefProvider`         |
| `Zone`                    |
| `ZoneDef`                 |

Previously deprecated pseudo components used by the `FrontstageProvider` are removed as well in favor of their corresponding configuration interfaces:

| Component    | Replacement        |
| ------------ | ------------------ |
| `Frontstage` | `FrontstageConfig` |
| `Widget`     | `WidgetConfig`     |
| `StagePanel` | `StagePanelConfig` |

Other previously deprecated removals and their replacements (if available):

| API                                  | Replacement                                |
| ------------------------------------ | ------------------------------------------ |
| `ActionItemButton`                   | `ToolbarActionItem`                        |
| `ActivityMessagePopup`               | Activity messages are set-up automatically |
| `Backstage`                          | `BackstageComposer`                        |
| `BackstageEvent`                     | `UiFramework.backstage.onToggled`          |
| `GroupButton`                        | `ToolbarGroupItem`                         |
| `Indicator`                          | `StatusBarIndicator`                       |
| `ToolButton`                         | `ToolbarItem`                              |
| `withSafeArea`                       | `SafeAreaContext`                          |
| `ClearEmphasisStatusField`           |                                            |
| `ConditionalField`                   |                                            |
| `ConditionalFieldProps`              |                                            |
| `FooterModeField`                    |                                            |
| `FooterModeFieldProps`               |                                            |
| `MessageCenterFieldProps`            | `CommonProps` from *@itwin/core-react*     |
| `PromptField`                        |                                            |
| `StatusBarWidgetControlArgs`         |                                            |
| `StatusFieldProps`                   |                                            |
| `withMessageCenterFieldProps`        |                                            |
| `withStatusFieldProps`               |                                            |
| `Category`                           |                                            |
| `CategoryTree`                       |                                            |
| `CategoryTreeProps`                  |                                            |
| `CategoryVisibilityHandler`          |                                            |
| `CategoryVisibilityHandlerParams`    |                                            |
| `ClassGroupingOption`                |                                            |
| `createVisibilityTreeNodeRenderer`   |                                            |
| `getCategories`                      |                                            |
| `IVisibilityHandler`                 |                                            |
| `ModelsTree`                         |                                            |
| `ModelsTreeNodeType`                 |                                            |
| `ModelsTreeProps`                    |                                            |
| `ModelsTreeSelectionPredicate`       |                                            |
| `ModelsVisibilityHandler`            |                                            |
| `ModelsVisibilityHandlerProps`       |                                            |
| `SpatialContainmentTree`             |                                            |
| `SpatialContainmentTreeProps`        |                                            |
| `toggleAllCategories`                |                                            |
| `useVisibilityTreeFiltering`         |                                            |
| `useVisibilityTreeRenderer`          |                                            |
| `VisibilityChangeListener`           |                                            |
| `VisibilityStatus`                   |                                            |
| `VisibilityTreeEventHandler`         |                                            |
| `VisibilityTreeEventHandlerParams`   |                                            |
| `VisibilityTreeFilterInfo`           |                                            |
| `visibilityTreeNodeCheckboxRenderer` |                                            |
| `VisibilityTreeNoFilteredData`       |                                            |
| `VisibilityTreeNoFilteredDataProps`  |                                            |
| `VisibilityTreeSelectionPredicate`   |                                            |
| `UseFloatingViewportArgs`            | `FloatingViewportContentProps`             |

`CommonWidgetProps` and `WidgetProps` types are replaced by `Widget` interface:

- `allowedPanelTargets` renamed to `allowedPanels`. Array type changed from union of strings to `StagePanelLocation`
- `isFloatingStateSupported` renamed to `canFloat`. Type changed to union of `boolean` or `CanFloatWidgetOptions`:
  - `isFloatingStateWindowResizable` can be configured via `canFloat.isResizable`
  - `floatingContainerId` can be configured via `canFloat.containerId`
  - `defaultFloatingPosition` can be configured via `canFloat.defaultPosition`
  - `defaultFloatingSize` can be configured via `canFloat.defaultSize`
  - `hideWithUiWhenFloating` can be configured via `canFloat.hideWithUi`
- Removed `onWidgetStateChanged`, `saveTransientState`, `restoreTransientState`
- Removed `internalData`, `applicationData`
- `getWidgetContent()` replaced by `content`
- `icon` type changed to `IconSpec`
- `id` is now required
- `badgeType` renamed to `badge`

`WidgetConfig`:

- Removed `control`, `classId` in favor of `content`

`StatusBarItem`:

- `badgeType` renamed to `badge`
- `icon` type changed to `IconSpec`

`StatusBarCustomItem`:

- `reactNode` renamed to `content`

`ToolbarItem`:

- Removed `applicationData`, `internalData`, `isPressed`
- `icon` type changed to `IconSpec`
- `badgeType` renamed to `badge`

`ToolbarActionItem`, `ToolbarGroupItem`:

- `parentToolGroupId` renamed to `parentGroupItemId`.

`ToolbarGroupItem`:

- `items` type narrowed down to accept only `ToolbarActionItem` and `ToolbarGroupItem`.

`BackstageItem`:

- Removed `applicationData`, `internalData`
- `badgeType` renamed to `badge`
- `icon` type changed to `IconSpec`

`UiItemsProvider`:

- Properties marked as readonly
- `provideToolbarButtonItems` renamed to `provideToolbarItems`

UI item provider types no longer extend from `ProviderItem`.

### Static manager classes

In an effort to reduce usage complexity and discoverability of this package, many `*Manager` classes are now exposed through the `UiFramework` entry point. The direct classes access is being deprecated.

Each `initialize` method have been made internal and were always called automatically internally, call to these method can be safely removed from external code.

Below is a list of the changes from this move, some of these new access point may be reworked to further reduce the complexity, so they are marked `@beta`. Already `@deprecated` method were not moved to the new interfaces.

| Original access                                     | New access                                          |
| --------------------------------------------------- | --------------------------------------------------- |
| ConfigurableUiManager.addFrontstageProvider         | UiFramework.frontstages.addFrontstageProvider       |
| ConfigurableUiManager.loadKeyboardShortcuts         | UiFramework.keyboardShortcuts.loadKeyboardShortcuts |
| ConfigurableUiManager.registerControl               | UiFramework.controls.register                       |
| ConfigurableUiManager.isControlRegistered           | UiFramework.controls.isRegistered                   |
| ConfigurableUiManager.createControl                 | UiFramework.controls.create                         |
| ConfigurableUiManager.unregisterControl             | UiFramework.controls.unregister                     |
| ConfigurableUiManager.initialize                    |
| ConfigurableUiManager.loadTasks                     |
| ConfigurableUiManager.loadWorkflow                  |
| ConfigurableUiManager.loadWorkflows                 |
| ConfigurableUiManager.initialize                    |
| ConfigurableUiManager                               | UiFramework.controls                                |
| KeyboardShortcutManager.initialize                  |
| KeyboardShortcutManager                             | UiFramework.keyboardShortcuts                       |
| FrontstageManager.initialize                        |
| FrontstageManager.setActiveLayout                   | UiFramework.content.layouts.setActive               |
| FrontstageManager.setActiveContentGroup             | UiFramework.content.layouts.setActiveContentGroup   |
| FrontstageManager                                   | UiFramework.frontstages                             |
| ToolSettingsManager.initialize                      |
| ToolSettingsManager                                 | UiFramework.toolSettings                            |
| ContentLayoutManager.getLayoutKey                   | UiFramework.content.layouts.getKey                  |
| ContentLayoutManager.getLayoutForGroup              | UiFramework.content.layouts.getForGroup             |
| ContentLayoutManager.findLayout                     | UiFramework.content.layouts.find                    |
| ContentLayoutManager.addLayout                      | UiFramework.content.layouts.add                     |
| ContentLayoutManager.setActiveLayout                | UiFramework.content.layouts.setActive               |
| ContentLayoutManager.refreshActiveLayout            | UiFramework.content.layouts.refreshActive           |
| ContentLayoutManager                                | UiFramework.content.layouts                         |
| ContentDialogManager.initialize                     |
| ContentDialogManager.openDialog                     | UiFramework.content.dialogs.open                    |
| ContentDialogManager.closeDialog                    | UiFramework.content.dialogs.close                   |
| ContentDialogManager.activeDialog                   | UiFramework.content.dialogs.active                  |
| ContentDialogManager.dialogCount                    | UiFramework.content.dialogs.count                   |
| ContentDialogManager.getDialogZIndex                | UiFramework.content.dialogs.getZIndex               |
| ContentDialogManager.getDialogInfo                  | UiFramework.content.dialogs.getInfo                 |
| ContentDialogManager                                | UiFramework.content.dialogs                         |
| ContentViewManager                                  | UiFramework.content                                 |
| ModalDialogManager.openDialog                       | UiFramework.dialogs.modal.open                      |
| ModalDialogManager.closeDialog                      | UiFramework.dialogs.modal.close                     |
| ModalDialogManager.activeDialog                     | UiFramework.dialogs.modal.active                    |
| ModalDialogManager.dialogCount                      | UiFramework.dialogs.modal.count                     |
| ModalDialogManager                                  | UiFramework.dialogs.modal                           |
| ModelessDialogManager.initialize                    |
| ModelessDialogManager.openDialog                    | UiFramework.dialogs.modeless.open                   |
| ModelessDialogManager.closeDialog                   | UiFramework.dialogs.modeless.close                  |
| ModelessDialogManager.activeDialog                  | UiFramework.dialogs.modeless.active                 |
| ModelessDialogManager.dialogCount                   | UiFramework.dialogs.modeless.count                  |
| ModelessDialogManager.getDialogZIndex               | UiFramework.dialogs.modeless.getZIndex              |
| ModelessDialogManager.getDialogInfo                 | UiFramework.dialogs.modeless.getInfo                |
| ModelessDialogManager                               | UiFramework.dialogs.modeless                        |
| UiShowHideManager                                   | UiFramework.visibility                              |
| UiFramework.childWindowManager.openChildWindow      | UiFramework.childWindows.open                       |
| UiFramework.childWindowManager.findChildWindowId    | UiFramework.childWindows.findId                     |
| UiFramework.childWindowManager.closeAllChildWindows | UiFramework.childWindows.closeAll                   |
| UiFramework.childWindowManager.closeChildWindow     | UiFramework.childWindows.close                      |
| UiFramework.backstageManager                        | UiFramework.backstage                               |

## @itwin/core-react

| Removed API              |
| ------------------------ |
| FeaturedTile             |
| Field                    |
| FieldDef                 |
| FieldDefinitions         |
| FieldEditor              |
| FieldProps               |
| FieldValues              |
| Form                     |
| FormContext              |
| FormContextState         |
| FormProps                |
| Headline                 |
| HorizontalTabs           |
| Input                    |
| InputProps               |
| LabeledInput             |
| LabeledInputProps        |
| LabeledSelect            |
| LabeledSelect            |
| LabeledTextarea          |
| LabeledTextareaProps     |
| LabeledThemedSelect      |
| LabeledThemedSelectProps |
| LabeledToggle            |
| LabeledToggleProps       |
| LeadingText              |
| LeadingText2             |
| MessageSeverity          |
| MinimalFeaturedTile      |
| MinimalTile              |
| OptionsType              |
| OptionType               |
| PointProps               |
| ProgressBar              |
| ProgressBarProps         |
| ProgressSpinner          |
| ProgressSpinnerProps     |
| Radio                    |
| RadioProps               |
| Select                   |
| SelectOption             |
| SelectProps              |
| Slider                   |
| SliderProps              |
| SmallText                |
| Spinner                  |
| SpinnerProps             |
| SpinnerSize              |
| Subheading               |
| Subheading2              |
| Textarea                 |
| TextareaProps            |
| ThemedSelect             |
| ThemedSelectProps        |
| Tile                     |
| TileProps                |
| Title                    |
| Title2                   |
| Toggle                   |
| ToggleButtonType         |
| ToggleProps              |
| Tooltip                  |
| TooltipPlacement         |
| TooltipProps             |
| SvgSprite                |
| SvgSpriteProps           |
| Button                   |
| ButtonProps              |
| ButtonSize               |
| ButtonType               |
| Checkbox                 |
| CheckboxProps            |
| DialogButtonDef          |
| DialogButtonStyle        |
| DialogButtonType         |
| ExpandableBlock          |
| ExpandableBlockProps     |
| SplitButton              |
| SplitButtonProps         |
| UiEvent                  |

## @itwin/components-react

Removed `Table`, `Breadcrumb` and other previously deprecated APIs and components:

| Removed API                             |
| --------------------------------------- |
| BeDragDropContext                       |
| Breadcrumb                              |
| BreadcrumbDetails                       |
| BreadcrumbDetailsProps                  |
| BreadcrumbMode                          |
| BreadcrumbNode                          |
| BreadcrumbNodeProps                     |
| BreadcrumbPath                          |
| BreadcrumbProps                         |
| BreadcrumbTreeUtils                     |
| BreadcrumbUpdateEvent                   |
| BreadcrumbUpdateEventArgs               |
| CellItem                                |
| CellProps                               |
| ColumnDescription                       |
| ColumnFilterDescriptor                  |
| CompositeFilterDescriptor               |
| CompositeFilterDescriptorCollection     |
| DistinctValueCollection                 |
| DistinctValuesFilterDescriptor          |
| FieldFilterDescriptor                   |
| FilterableColumn                        |
| FilterableTable                         |
| FilterCompositionLogicalOperator        |
| FilterDescriptor                        |
| FilterDescriptorCollection              |
| FilterDescriptorCollectionBase          |
| FilterOperator                          |
| FilterRenderer                          |
| MutableTableDataProvider                |
| OperatorValueFilterDescriptor           |
| OperatorValueFilterDescriptorCollection |
| ReactDataGridColumn                     |
| RowItem                                 |
| RowProps                                |
| ShowHideDialog                          |
| ShowHideDialogProps                     |
| ShowHideID                              |
| ShowHideItem                            |
| ShowHideMenu                            |
| ShowHideMenuProps                       |
| SimpleTableDataProvider                 |
| Table                                   |
| TableCell                               |
| TableCellContent                        |
| TableCellContentProps                   |
| TableCellContextMenuArgs                |
| TableCellEditorState                    |
| TableCellProps                          |
| TableCellUpdatedArgs                    |
| TableDataChangesListener                |
| TableDataProvider                       |
| TableDistinctValue                      |
| TableIconCellContent                    |
| TableIconCellContentProps               |
| TableProps                              |
| TableSelectionTarget                    |
| IconPickerButton                        |
| IconPickerProps                         |
| MutableTreeDataProvider                 |
| PropertyGridCategory                    |
| ThemedEnumEditor                        |
| ThemedEnumEditorProps                   |
| ThemedEnumPropertyEditor                |
| TreeDataChangesListener                 |

| Deprecated API       |
| -------------------- |
| TableDataChangeEvent |

## @bentley/icons-generic-webfont

With the 4.0 release, AppUI has removed its dependency on the icons-generic-webfont package in favor of React or SVG icons. Webfont icons and their identifying names are still supported by the AppUI platform, but applications or packages that use a webfont for icons will have to include the webfont package in their direct dependencies.
