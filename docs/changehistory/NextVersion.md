# NextVersion <!-- omit from toc -->
<<<<<<< HEAD
=======

Table of contents:

- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations)
- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations-1)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations-2)
  - [Additions](#additions-1)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-3)

## @itwin/core-react

### Deprecations

- All `SCSS` and `CSS` variables are deprecated in all of AppUI packages. Applications should use [iTwinUI variables](https://itwinui.bentley.com/docs/variables) instead. In the table below you can find the replacements for commonly used variables:

| Variable                                    | Replacement                                                     |
| ------------------------------------------- | --------------------------------------------------------------- |
| `--buic-accessory-hollow`                   | `--iui-color-white`                                             |
| `--buic-accessory-primary`                  | `--iui-color-background-accent-hover` or `rgb(000, 139, 225)`   |
| `--buic-accessory-success`                  | `--iui-color-background-positive-hover` or `rgb(083, 162, 026)` |
| `--buic-accessory-alert`                    | `--iui-color-background-negative-hover` or `rgb(211, 010, 010)` |
| `--buic-accessory-warning`                  | `--iui-color-background-warning-hover` or `rgb(241, 139, 018)`  |
| `--buic-accessory-primary-tint`             | `--iui-color-border-informational` or `rgb(165, 215, 245)`      |
| `--buic-accessory-success-tint`             | `--iui-color-border-positive` or `rgb(195, 225, 175)`           |
| `--buic-accessory-alert-tint`               | `--iui-color-border-negative` or `rgb(239, 169, 169)`           |
| `--buic-accessory-warning-tint`             | `--iui-color-border-warning` or `rgb(249, 215, 171)`            |
| `--buic-background-1`                       | `--iui-color-background`                                        |
| `--buic-background-2`                       | `--iui-color-background-hover`                                  |
| `--buic-background-3`                       | `--iui-color-background-backdrop`                               |
| `--buic-background-4`                       | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-5`                       | `--iui-color-background-disabled`                               |
| `--buic-background-editable`                | `--iui-color-background`                                        |
| `--buic-background-primary`                 | `--iui-color-background-accent`                                 |
| `--buic-background-tooltip`                 | `hsl(var(--iui-color-background-hsl) / 0.9)`                    |
| `--buic-background-scrollbar`               | `hsl(var(--iui-color-foreground-hsl) / var(--iui-opacity-4))`   |
| `--buic-background-scrollbar-hover`         | `hsl(var(--iui-color-foreground-hsl) / var(--iui-opacity-3))`   |
| `--buic-foreground-body-rgb`                | `--iui-color-foreground-hsl`                                    |
| `--buic-foreground-body`                    | `--iui-color-text`                                              |
| `--buic-foreground-body-reverse-rgb`        | `--iui-color-foreground-hsl`                                    |
| `--buic-foreground-body-reverse`            | `hsl(var(--iui-color-background-hsl) / var(--iui-opacity-2))`   |
| `--buic-foreground-muted`                   | `--iui-color-text-muted`                                        |
| `--buic-foreground-disabled`                | `--iui-color-text-disabled`                                     |
| `--buic-foreground-activehover`             | `--iui-color-text`                                              |
| `--buic-inputs-border`                      | `hsl(var(--iui-color-foreground-hsl) / var(--iui-opacity-4))`   |
| `--buic-inputs-boxshadow`                   | `--iui-focus-box-shadow`                                        |
| `--buic-popup-boxshadow`                    | `--buic-inputs-boxshadow`                                       |
| `--buic-foreground-primary`                 | `--iui-color-icon-accent`                                       |
| `--buic-foreground-primary-tone`            | `--iui-color-text-accent-hover`                                 |
| `--buic-foreground-focus`                   | `--iui-color-text-accent-hover`                                 |
| `--buic-foreground-focus-border`            | `--buic-inputs-border`                                          |
| `--buic-focus-boxshadow`                    | `hsl(var(--iui-color-accent-hsl) / var(--iui-opacity-4))`       |
| `--buic-focus-boxshadow-gradient1`          | `hsl(var(--buic-foreground-primary-tone-rgb) / 0)`              |
| `--buic-focus-boxshadow-gradient2`          | `hsl(var(--buic-foreground-primary-rgb) / 0.65)`                |
| `--buic-foreground-accessory`               | `--iui-color-white`                                             |
| `--buic-foreground-success`                 | `--iui-color-text-positive`                                     |
| `--buic-foreground-positive`                | `--iui-color-text-positive`                                     |
| `--buic-foreground-positive-rgb`            | `--iui-color-positive-hsl`                                      |
| `--buic-foreground-alert`                   | `--iui-color-text-negative`                                     |
| `--buic-foreground-negative`                | `--iui-color-text-negative`                                     |
| `--buic-foreground-negative-rgb`            | `--iui-color-negative-hsl`                                      |
| `--buic-foreground-warning`                 | `--iui-color-text-warning`                                      |
| `--buic-foreground-warning-rgb`             | `--iui-color-warning-hsl`                                       |
| `--buic-background-focus-overlay`           | `hsl(var(--iui-opacity-6))`                                     |
| `--buic-background-hover-overlay`           | `hsl(var(--iui-color-accent-hsl) / var(--iui-opacity-5))`       |
| `--buic-background-active-overlay`          | `hsl(var(--iui-color-accent-hsl) / var(--iui-opacity-5))`       |
| `--buic-background-pressed-overlay`         | `hsl(var(--iui-color-accent-hsl) / 0.3)`                        |
| `--buic-background-card`                    | `hsl(var(--iui-color-background-hsl) / 0.9)`                    |
| `--buic-background-striped_row`             | `hsl(var(--iui-color-foreground-hsl) / 0.03)`                   |
| `--buic-background-titlebar`                | `--iui-color-background-disabled`                               |
| `--buic-background-dialog-stroke`           | `--iui-color-background-disabled`                               |
| `--buic-background-widget-stroke`           | `--iui-color-background-disabled`                               |
| `--buic-background-control-stroke`          | `--iui-color-background-disabled`                               |
| `--buic-background-panel-stroke`            | `--iui-color-background-disabled`                               |
| `--buic-background-toolbutton-stroke`       | `--iui-color-background-disabled`                               |
| `--buic-background-titlebar-outoffocus`     | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-divider`                 | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-widget-element-stroke`   | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-statusbar`               | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-table-header`            | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-control-stroke-disabled` | `--iui-color-background-backdrop-hover`                         |
| `--buic-background-tab-inactive`            | `--iui-color-background-backdrop`                               |
| `--buic-background-toolbutton-inactive`     | `--iui-color-background-backdrop`                               |
| `--buic-background-context-menu`            | `--iui-color-background-backdrop`                               |
| `--buic-background-widget-panel`            | `--iui-color-background-backdrop`                               |
| `--buic-background-placeholder`             | `--iui-color-background-backdrop`                               |
| `--buic-background-control-disabled`        | `--iui-color-background-backdrop`                               |
| `--buic-background-tab-active`              | `--iui-color-background-hover`                                  |
| `--buic-background-dialog`                  | `--iui-color-background-hover`                                  |
| `--buic-background-widget`                  | `--iui-color-background-hover`                                  |
| `--buic-background-window`                  | `--iui-color-background-hover`                                  |
| `--buic-background-toolbar`                 | `--iui-color-background-hover`                                  |
| `--buic-background-panel`                   | `--iui-color-background-hover`                                  |
| `--buic-background-control`                 | `--iui-color-background`                                        |
| `--buic-row-selection`                      | `--iui-color-background-accent-muted`                           |
| `--buic-row-hover`                          | `--iui-color-background-hover`                                  |
| `--buic-button-gradient1`                   | `rgba(var(--iui-color-foreground-body-invert-rgb), 0)`          |
| `--buic-button-gradient2`                   | `rgba(var(--iui-color-foreground-body-invert-rgb), 0.25)`       |

## @itwin/appui-react

### Deprecations

- Deprecated `BaseUiItemsProvider`, `StandardContentToolsProvider`, `StandardNavigationToolsProvider`, `StandardStatusbarItemsProvider` classes. Use `UiItemsProviderOverrides` to specify supported frontstages when registering the provider. [#1024](https://github.com/iTwin/appui/pull/1024)
- Deprecated `DefaultContentToolsAppData` interface that is a remnant of discontinued frontstage APIs. [#1024](https://github.com/iTwin/appui/pull/1024)
- Deprecated `StandardContentToolsUiItemsProvider.provideStatusBarItems`, `StandardContentToolsUiItemsProvider.provideToolbarItems`, `StandardNavigationToolsUiItemsProvider.provideToolbarItems`, `StandardStatusbarUiItemsProvider.provideStatusBarItems` methods. Use `get*` variants instead. [#1024](https://github.com/iTwin/appui/pull/1024)
- Deprecated `AccuDrawDialogProps`, `AccuDrawFieldContainerProps`, `AccuDrawInputFieldProps`, `BackstageComposerProps`, `ConfigurableUiContentProps`, `SplitPaneProps`, `StatusBarComposerProps`, `ExtensibleToolbarProps`, `UiSettingsProviderProps`, `BasicNavigationWidgetProps`, `BasicToolWidgetProps`, `ContentToolWidgetComposerProps`, `NavigationAidHostProps`, `NavigationWidgetComposerProps`, `ToolWidgetComposerProps`, `ViewToolWidgetComposerProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)
  Usage example:

  ```tsx
  import { AccuDrawDialog } from "@itwin/appui-react";

  type AccuDrawDialogProps = React.ComponentProps<typeof AccuDrawDialog>;
  ```

- Deprecated `floatingContentControls` getter of `FrontstageDef` class that used a deprecated `ContentControl` class. Use floating widgets instead. [#1030](https://github.com/iTwin/appui/pull/1030)

### Additions

- Added `ConditionalBooleanValue` and `ConditionalStringValue` class re-exports from `@itwin/appui-abstract` package. [#1031](https://github.com/iTwin/appui/pull/1031)

- Added `StandardContentLayouts`, `ContentLayoutProps`, `LayoutFragmentProps`, `LayoutHorizontalSplitProps`, `LayoutSplitPropsBase`, and `LayoutVerticalSplitProps` interfaces from `@itwin/appui-abstract` package. [#1033]

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)
- Bump `StandardContentToolsUiItemsProvider`, `StandardStatusbarUiItemsProvider` classes to `@public`. [#1024](https://github.com/iTwin/appui/pull/1024)
- Bump `content` property of `ContentProps` interface to `@public`. [#1030](https://github.com/iTwin/appui/pull/1030)
- Content layout will now track `ContentOverlay` components to determine if the active strip should be rendered for the active content. [#1030](https://github.com/iTwin/appui/pull/1030)

### Additions

- Added `UiFramework.onIModelConnectionChanged` event to get notified whenever the iModel targeted by `UiFramework.getIModelConnection()` changes. This is a replacement for listening to the deprecated `SessionStateActionId.SetIModelConnection`.

## @itwin/components-react

### Deprecations

- Deprecated `defaultPropertyFilterBuilderRuleValidator`. Newly added `useDefaultPropertyFilterBuilderRuleValidator` should be used instead. [#1000](https://github.com/iTwin/appui/pull/1000)
- Deprecated `HighlightedTextProps`, `EditorContainerProps`, `OkCancelProps`, `FavoritePropertyListProps`, `ParsedInputProps`, `LinksRendererProps`, `VirtualizedPropertyGridWithDataProviderProps`, `ControlledSelectableContentProps`, `SelectableContentProps`, `TreeNodeContentProps`, `TreeNodeIconProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)

  Usage example:

  ```tsx
  import { HighlightedText } from "@itwin/components-react";

  type HighlightedTextProps = React.ComponentProps<typeof HighlightedText>;
  ```

### Additions

- Added `useDefaultPropertyFilterBuilderRuleValidator` hook to get default validator for rules in `PropertyFilterBuilder` component. [#1000](https://github.com/iTwin/appui/pull/1000)

## @itwin/imodel-components-react

### Deprecations

- Deprecated `FormatPanelProps`, `FormatPrecisionProps`, `FormatSampleProps`, `FormatTypeOptionProps`, `FormatUnitLabelProps`, `FormatUnitsProps`, `MiscFormatOptionsProps`, `QuantityFormatPanelProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)

  Usage example:

  ```tsx
  import { FormatUnits } from "@itwin/imodel-components-react";

  type FormatUnitsProps = React.ComponentProps<typeof FormatUnits>;
  ```
>>>>>>> 79f71b01f (Move /content apis from appui-abstract into appui-react (#1033))
