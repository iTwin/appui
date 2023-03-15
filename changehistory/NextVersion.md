# NextVersion

Table of contents:

- [NextVersion](#nextversion)
  - [@itwin/appui-layout-react](#itwinappui-layout-react)
  - [@itwin/appui-abstract](#itwinappui-abstract)
  - [@itwin/appui-react](#itwinappui-react)
  - [Webfont Dependency Removed](#@bentley/icons-generic-webfont)


## @itwin/appui-layout-react

All APIs are marked as internal. `@itwin/appui-layout-react` package is considered as internal implementation detail of the `@itwin/appui-react` package and should not be used directly.

| API from *@itwin/appui-layout-react* | Replacement in *@itwin/appui-react*  |
| ------------------------------------ | ------------------------------------ |
| `Dialog`                             | `StatusBarDialog`                    |
| `DialogProps`                        | `StatusBarDialogProps`               |
| `FooterIndicator`                    | `StatusBarIndicator`                 |
| `FooterIndicatorProps`               | `StatusBarIndicatorProps`            |
| `FooterPopup`                        | `popup` prop of `StatusBarIndicator` |
| `FooterPopupProps`                   | Removed                              |
| `FooterPopupContentType`             | Removed                              |
| `FooterPopupDefaultProps`            | Removed                              |
| `FooterSeparator`                    | `StatusBarSeparator`                 |
| `FooterSeparatorProps`               | Removed                              |
| `SafeAreaInsets`                     | `SafeAreaInsets`                     |
| `TitleBar`                           | `StatusBarDialog.TitleBar`           |
| `TitleBarProps`                      | `StatusBarDialogTitleBarProps`       |

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

## @bentley/icons-generic-webfont

With the 4.0 release, AppUi has removed its dependency on the icons-generic-webfont package in favor of React or SVG icons. Webfont icons and their identifying names are still supported by the AppUi platform, but applications or packages that use a webfont for icons will have to include the webfont package in their direct dependencies.
