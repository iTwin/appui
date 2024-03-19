# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations-1)
- [@itwin/core-react](#itwincore-react)
  - [Additions](#additions-1)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-2)
  - [Additions](#additions-2)
  - [Changes](#changes-1)

## @itwin/appui-react

### Deprecations

- `FrameworkUiAdmin.cursorPosition` in favor of `UiFramework.getCursorPosition`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.isFocusOnHome` in favor of `UiFramework.keyboardShortcuts.isFocusOnHome`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.setFocusToHome` in favor of `UiFramework.keyboardShortcuts.setFocusToHome`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showContextMenu` in favor of `UiFramework.openContextMenu`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.getKeyins` with no 1:1 replacement. Please use `@itwin/core-frontend#IModelApp.tools.getToolList` and filter the list yourself. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.localizedKeyinPreference` without a replacement. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showKeyinPalette` in favor of `UiFramework.showKeyinPalette`. Please note the use of feature flags to control the ability to display the KeyinPalette will be deprecated. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.hideKeyinPalette` in favor of `UiFramework.hideKeyinPalette`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showToolbar` in favor of `UiFramework.showToolbar`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.hideToolbar` in favor of `UiFramework.hideToolbar`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showMenuButton` in favor of `UiFramework.showMenuButton`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.hideMenuButton` in favor of `UiFramework.hideMenuButton`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showCalculator` in favor of `UiFramework.showCalculator`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.hideCalculator` in favor of `UiFramework.hideCalculator`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showAngleEditor` in favor of `UiFramework.showAngleEditor`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showLengthEditor` in favor of `UiFramework.showDimensionEditor("length")`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showHeightEditor` in favor of `UiFramework.showDimensionEditor("height")`. [#729](https://github.com/iTwin/appui/pull/729)
- `FrameworkUiAdmin.showHTMLElement` in favor of `UiFramework.showComponent`. Note, as appui is a React-focused library, the new `UiFramework.showComponent` function takes a React Element instead of an HTMLElement.`
- `FrameworkUiAdmin.hideHTMLElement` in favor of `UiFramework.hideComponent`. [#729](https://github.com/iTwin/appui/pull/729)

- `CursorMenuData` is favor of `CursorMenuPayload`. [#729](https://github.com/iTwin/appui/pull/729)
- `RelativePosition` in favor of `Placement`. [#729](https://github.com/iTwin/appui/pull/729)
- `HTMLElementPopup` please use `UiFramework.showComponentPopup` instead. [#729](https://github.com/iTwin/appui/pull/729)
- `HTMLElementPopupProps` please use `ComponentPopupProps` instead. [#729](https://github.com/iTwin/appui/pull/729)

- `MenuItemProps` in favor of `CursorMenuItemProps`. [#729](https://github.com/iTwin/appui/pull/729)

### Additions

- `UiFramework` methods detailed above which replace FrameworkUiAdmin methods. [#729](https://github.com/iTwin/appui/pull/729)
- `Placement` has been introduced to replace `RelativePosition`. [#729](https://github.com/iTwin/appui/pull/729)
- `newToolbars` preview feature. When enabled, `Toolbar` component is replaced with a new iTwinUI based toolbar with improved visuals and accessibility.

### Changes

- Update `WidgetDef.show()` to bring the popout widget window to the front (this behavior is not guaranteed and depends on browser and user settings). [#667](https://github.com/iTwin/appui/pull/667)
- Removed arrow from status bar popup. [#750](https://github.com/iTwin/appui/pull/750)
- Render AccuDraw Distance field above Angle field when in Polar mode. [#753](https://github.com/iTwin/appui/pull/753)

### Fixes

- Fix the issue when right-click + left-click starts a widget drag interaction. [#730](https://github.com/iTwin/appui/pull/730)
- Fix polar mode AccuDraw input focus by correctly focusing the distance field. [#753](https://github.com/iTwin/appui/pull/753)

## @itwin/components-react

### Deprecations

- `DatePicker`, `DatePickerPopupButton`, `IntlFormatter` are deprecated in favor of [iTwinUI date picker](https://itwinui.bentley.com/docs/datepicker). [#755](https://github.com/iTwin/appui/pull/755)

## @itwin/core-react

### Additions

- `BadgeType` has been moved from `@itwin/appui-abstract`. [#729](https://github.com/iTwin/appui/pull/729)

## @itwin/imodel-components-react

### Deprecations

- `TimelineComponentProps.componentId` was used only when listening for events on `UiAdmin.onGenericUiEvent.addListener`. As `UiAdmin` will be deprecated, please use the `TimelineComponentProps.isPlaying` prop to control the timeline play state. [#729](https://github.com/iTwin/appui/pull/729)
- `AlphaSlider`, `ColorPickerButton`, `ColorPickerDialog`, `ColorPickerPopup`, `ColorSwatch`, `HueSlider`, `SaturationPicker` are deprecated in favor of [iTwinUI color picker](https://itwinui.bentley.com/docs/colorpicker). [#755](https://github.com/iTwin/appui/pull/755)

### Additions

- `TimelineComponentProps.isPlaying` to control the timeline play state. [#729](https://github.com/iTwin/appui/pull/729)

### Changes

- Updated visual styling of `SolarTimeline` and `TimelineComponent` components. [#733](https://github.com/iTwin/appui/pull/733)
