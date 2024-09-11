# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations-1)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-2)

## @itwin/appui-react

### Deprecations

- Deprecated `AccuDrawDialogProps`, `AccuDrawFieldContainerProps`, `AccuDrawInputFieldProps`, `BackstageComposerProps`, `ConfigurableUiContentProps`, `SplitPaneProps`, `StatusBarComposerProps`, `ExtensibleToolbarProps`, `UiSettingsProviderProps`, `BasicNavigationWidgetProps`, `BasicToolWidgetProps`, `ContentToolWidgetComposerProps`, `NavigationAidHostProps`, `NavigationWidgetComposerProps`, `ToolWidgetComposerProps`, `ViewToolWidgetComposerProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)

## @itwin/components-react

### Deprecations

- Deprecated `HighlightedTextProps`, `EditorContainerProps`, `OkCancelProps`, `FavoritePropertyListProps`, `ParsedInputProps`, `LinksRendererProps`, `VirtualizedPropertyGridWithDataProviderProps`, `ControlledSelectableContentProps`, `SelectableContentProps`, `TreeNodeContentProps`, `TreeNodeIconProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)

## @itwin/imodel-components-react

### Deprecations

- Deprecated `FormatPanelProps`, `FormatPrecisionProps`, `FormatSampleProps`, `FormatTypeOptionProps`, `FormatUnitLabelProps`, `FormatUnitsProps`, `MiscFormatOptionsProps`, `QuantityFormatPanelProps` in favor of `React.ComponentProps<typeof ...>`. [#991](https://github.com/iTwin/appui/pull/991)
