# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes)

## @itwin/appui-react

### Deprecations

- Deprecated `SignInProps` instead use `React.ComponentProps<typeof SignIn>`. #PR
- Deprecated `AccuDrawDialogProps` instead use `React.ComponentProps<typeof AccuDrawDialog>`. #PR
- Deprecated `AccuDrawFieldContainerProps` instead use `React.ComponentProps<typeof AccuDrawFieldContainer>`. #PR
- Deprecated `AccuDrawInputFieldProps` instead use `React.ComponentProps<typeof AccuDrawInputField>`. #PR
- Deprecated `BackstageComposerProps` instead use `React.ComponentProps<typeof BackstageComposer>`. #PR
- Deprecated `ConfigurableUiContentProps` instead use `React.ComponentProps<typeof ConfigurableUiContent>`. #PR
- Deprecated `SplitPaneProps` instead use `React.ComponentProps<typeof SplitPane>`. #PR
- Deprecated `StatusBarComposerProps` instead use `React.ComponentProps<typeof StatusBarComposer>`. #PR
- Deprecated `ToolbarComposerProps` instead use `React.ComponentProps<typeof ToolbarComposer>`. #PR
- Deprecated `UiSettingsProviderProps` instead use `React.ComponentProps<typeof UiStateStorageHandler>`. #PR
- Deprecated `BasicNavigationWidgetProps` instead use `React.ComponentProps<typeof BasicNavigationWidget>`. #PR
- Deprecated `BasicToolWidgetProps` instead use `React.ComponentProps<typeof BasicToolWidget>`. #PR
- Deprecated `ContentToolWidgetComposerProps` instead use `React.ComponentProps<typeof ContentToolWidgetComposer>`. #PR
- Deprecated `NavigationAidHostProps` instead use `React.ComponentProps<typeof NavigationAidHost>`. #PR
- Deprecated `NavigationWidgetComposerProps` instead use `React.ComponentProps<typeof NavigationWidgetComposer>`. #PR
- Deprecated `ToolWidgetComposerProps` instead use `React.ComponentProps<typeof ToolWidgetComposer>`. #PR
- Deprecated `ViewToolWidgetComposerProps` instead use `React.ComponentProps<typeof ViewToolWidgetComposer>`. #PR
- Deprecated `HighlightedTextProps` instead use `React.ComponentProps<typeof HighlightedText>`. #PR
- Deprecated `EditorContainerProps` instead use `React.ComponentProps<typeof EditorContainer>`. #PR
- Deprecated `PopupOkCancelButtonsProps` instead use `React.ComponentProps<typeof PopupOkCancelButtons>`. #PR
- Deprecated `FavoritePropertyListProps` instead use `React.ComponentProps<typeof FavoritePropertyList>`. #PR
- Deprecated `ParsedInputProps` instead use `React.ComponentProps<typeof ParsedInput>`. #PR
- Deprecated `LinksRendererProps` instead use `React.ComponentProps<typeof LinksRenderer>`. #PR
- Deprecated `VirtualizedPropertyGridWithDataProviderProps` instead use `React.ComponentProps<typeof VirtualizedPropertyGridWithDataProvider>`. #PR
- Deprecated `ControlledSelectableContentProps` instead use `React.ComponentProps<typeof ControlledSelectableContent>`. #PR
- Deprecated `SelectableContentProps` instead use `React.ComponentProps<typeof SelectableContent>`. #PR
- Deprecated `TreeNodeContentProps` instead use `React.ComponentProps<typeof TreeNodeContent>`. #PR
- Deprecated `TreeNodeIconProps` instead use `React.ComponentProps<typeof TreeNodeIcon>`. #PR
- Deprecated `FormatPanelProps` instead use `React.ComponentProps<typeof FormatPanel>`. #PR
- Deprecated `FormatPrecisionProps` instead use `React.ComponentProps<typeof FormatPrecision>`. #PR
- Deprecated `FormatSampleProps` instead use `React.ComponentProps<typeof FormatSample>`. #PR
- Deprecated `FormatTypeOptionProps` instead use `React.ComponentProps<typeof FormatTypeOption>`. #PR
- Deprecated `FormatUnitLabelProps` instead use `React.ComponentProps<typeof FormatUnitLabel>`. #PR
- Deprecated `FormatUnitsProps` instead use `React.ComponentProps<typeof FormatUnits>`. #PR
- Deprecated `MiscFormatOptionsProps` instead use `React.ComponentProps<typeof MiscFormatOptions>`. #PR
- Deprecated `QuantityFormatPanelProps` instead use `React.ComponentProps<typeof QuantityFormatPanel>`. #PR

### Changes

- Allow to set the available snap modes in `SnapModeField` component. [#974](https://github.com/iTwin/appui/pull/974)
