# NextVersion

Table of contents:

- [NextVersion](#nextversion)
  - [@itwin/appui-layout-react](#itwinappui-layout-react)
  - [@itwin/appui-abstract](#itwinappui-abstract)

## @itwin/appui-layout-react

All APIs are marked as internal. `@itwin/appui-layout-react` package is considered as internal implementation detail of the `@itwin/appui-react` package and should not be used directly.

| API from *@itwin/appui-layout-react* | Replacement in *@itwin/appui-react*  | CodeMod |
| ------------------------------------ | ------------------------------------ | ------- |
| `Dialog`                             | `StatusBarDialog`                    |         |
| `DialogProps`                        | `StatusBarDialogProps`               |         |
| `FooterIndicator`                    | `StatusBarIndicator`                 |         |
| `FooterIndicatorProps`               | `StatusBarIndicatorProps`            |         |
| `FooterPopup`                        | `popup` prop of `StatusBarIndicator` | No      |
| `FooterPopupProps`                   | Removed                              | No      |
| `FooterPopupContentType`             | Removed                              | No      |
| `FooterPopupDefaultProps`            | Removed                              | No      |
| `FooterSeparator`                    | `StatusBarSeparator`                 |         |
| `FooterSeparatorProps`               | Removed                              | No      |
| `SafeAreaInsets`                     | `SafeAreaInsets`                     |         |
| `TitleBar`                           | `StatusBarDialog.TitleBar`           |         |
| `TitleBarProps`                      | `StatusBarDialogTitleBarProps`       |         |

## @itwin/appui-abstract

AppUI related definitions from `@itwin/appui-abstract` are moved into `@itwin/appui-react`.

| API from *@itwin/appui-abstract*          | Replacement in *@itwin/appui-react*     | CodeMod |
| ----------------------------------------- | --------------------------------------- | ------- |
| `BackstageItem`                           | `BackstageItem`                         |         |
| `BackstageItemType`                       | Removed                                 | No      |
| `isActionItem`                            | `isBackstageActionItem`                 |         |
| `isStageLauncher`                         | `isBackstageStageLauncher`              |         |
| `BackstageItemUtilities`                  | `BackstageItemUtilities`                |         |
| `ProvidedItem`                            | `ProviderItem`.                         |         |
| `StatusBarSection`                        | `StatusBarSection`                      |         |
| `StatusBarLabelSide`                      | `StatusBarLabelSide`                    |         |
| `StatusBarItemId`                         | Removed                                 | No      |
| `AbstractStatusBarItem`                   | `CommonStatusBarItem`                   |         |
| `AbstractStatusBarActionItem`             | `StatusBarActionItem`                   |         |
| `AbstractStatusBarLabelItem`              | `StatusBarLabelItem`                    |         |
| `AbstractStatusBarCustomItem`             | `StatusBarCustomItem`                   |         |
| `CommonStatusBarItem`                     | `StatusBarItem`                         |         |
| `isAbstractStatusBarActionItem`           | `isStatusBarActionItem`                 |         |
| `isAbstractStatusBarLabelItem`            | `isStatusBarLabelItem`                  |         |
| `isAbstractStatusBarCustomItem`           | `isStatusBarCustomItem`                 |         |
| `AbstractStatusBarItemUtilities`          | `StatusBarItemUtilities`                |         |
| `AbstractWidgetProps`                     | `Widget`                                |         |
| `WidgetState`                             | `WidgetState`                           |         |
| `StagePanelLocation`                      | `StagePanelLocation`                    |         |
| `StagePanelSection`                       | `StagePanelSection`                     |         |
| `ToolbarUsage`                            | `ToolbarUsage`                          |         |
| `ToolbarOrientation`                      | `ToolbarOrientation`                    |         |
| `ToolbarItem`                             | `CommonToolbarItem`                     |         |
| `ActionButton`                            | `ToolbarActionItem`                     |         |
| `GroupButton`                             | `ToolbarGroupItem`                      |         |
| `CustomButtonDefinition`                  | `ToolbarCustomItem`                     |         |
| `CommonToolbarItem`                       | `ToolbarItem`                           |         |
| `ToolbarItemId`                           | Removed                                 | No      |
| `ToolbarItemUtilities`                    | `ToolbarItemUtilities`                  |         |
| `ToolbarItemUtilities.createActionButton` | `ToolbarItemUtilities.createActionItem` |         |
| `ToolbarItemUtilities.createGroupButton`  | `ToolbarItemUtilities.createGroupItem`  |         |
| `ToolbarItemUtilities.isActionButton`     | `isToolbarActionItem`                   |         |
| `ToolbarItemUtilities.isGroupButton`      | `isToolbarGroupItem`                    |         |
| `ToolbarItemUtilities.isCustomDefinition` | `isToolbarCustomItem`                   |         |
| `UiItemsProvider`                         | `UiItemsProvider`                       |         |
| `BaseUiItemsProvider`                     | `BaseUiItemsProvider`                   |         |
| `UiItemProviderRegisteredEventArgs`       | `UiItemsProviderRegisteredEventArgs`    |         |
| `AllowedUiItemProviderOverrides`          | `AllowedUiItemsProviderOverrides`       |         |
| `UiItemProviderOverrides`                 | `UiItemsProviderOverrides`              |         |
| `UiItemsManager`                          | `UiItemsManager`                        |         |
| `StageUsage`                              | `StageUsage`                            |         |
