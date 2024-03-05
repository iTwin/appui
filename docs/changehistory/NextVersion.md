# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Changes

- Update `WidgetDef.show()` to bring the popout widget window to the front (this behavior is not guaranteed and depends on browser and user settings). [#667](https://github.com/iTwin/appui/pull/667)
- Removed arrow from status bar popup. [#750](https://github.com/iTwin/appui/pull/750)
- Render AccuDraw Distance field above Angle field when in Polar mode. [#753](https://github.com/iTwin/appui/pull/753)

### Fixes

- Fix the issue when right-click + left-click starts a widget drag interaction. [#730](https://github.com/iTwin/appui/pull/730)
- Fix polar mode AccuDraw input focus by correctly focusing the distance field. [#753](https://github.com/iTwin/appui/pull/753)

## @itwin/components-react

### Deprecations

- `DatePicker`, `DatePickerPopupButton` are deprecated in favor of [iTwinUI date picker](https://itwinui.bentley.com/docs/datepicker). [#755](https://github.com/iTwin/appui/pull/755)

## @itwin/imodel-components-react

### Deprecations

- `AlphaSlider`, `ColorPickerButton`, `ColorPickerDialog`, `ColorPickerPopup`, `ColorSwatch`, `HueSlider`, `SaturationPicker` are deprecated in favor of [iTwinUI color picker](https://itwinui.bentley.com/docs/colorpicker). [#755](https://github.com/iTwin/appui/pull/755)
