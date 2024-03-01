# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Removals](#removals)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Removals

- Description. #PR

### Deprecations

- `FrameworkUiAdmin` has been deprecated in preparation for upcoming @itwin/appui-abstract#UiAdmin deprecation. Continue to set `FrameworkUiAdmin` as `IModelAppOption.uiAdmin` until `UiAdmin` is deprecated, but do not call any methods on it directly, using the below replacements instead. #729
- `FrameworkUiAdmin.cursorPosition` in favor of `UiFramework.getCursorPosition`. #729
- `FrameworkUiAdmin.isFocusOnHome` in favor of `UiFramework.keyboardShortcuts.isFocusOnHome`. #729
- `FrameworkUiAdmin.setFocusToHome` in favor of `UiFramework.keyboardShortcuts.setFocusToHome`. #729
- `FrameworkUiAdmin.showContextMenu` in favor of `UiFramework.openContextMenu`. #729
- `FrameworkUiAdmin.getKeyins` with no 1:1 replacement. Please use `@itwin/core-frontend#IModelApp.tools.getToolList` and filter the list yourself. #729
- `FrameworkUiAdmin.localizedKeyinPreference` without a replacement. #729
- `FrameworkUiAdmin.showKeyinPalette` in favor of `UiFramework.showKeyinPalette`. Please note the use of feature flags to control the ability to display the KeyinPalette will be deprecated. #729
- `FrameworkUiAdmin.hideKeyinPalette` in favor of `UiFramework.hideKeyinPalette`. #729
- `FrameworkUiAdmin.showToolbar` in favor of `UiFramework.showToolbar`. #729
- `FrameworkUiAdmin.hideToolbar` in favor of `UiFramework.hideToolbar`. #729
- `FrameworkUiAdmin.showMenuButton` in favor of `UiFramework.showMenuButton`. #729
- `FrameworkUiAdmin.hideMenuButton` in favor of `UiFramework.hideMenuButton`. #729
- `FrameworkUiAdmin.showCalculator` in favor of `UiFramework.showCalculator`. #729
- `FrameworkUiAdmin.hideCalculator` in favor of `UiFramework.hideCalculator`. #729
- `FrameworkUiAdmin.showAngleEditor` in favor of `UiFramework.showAngleEditor`. #729
- `FrameworkUiAdmin.showLengthEditor` in favor of `UiFramework.showDimensionEditor("length")`. #729
- `FrameworkUiAdmin.showHeightEditor` in favor of `UiFramework.showDimensionEditor("height")`. #729
- `FrameworkUiAdmin.showInputEditor` in favor of `UiFramework.showInputEditor`. #729
- `FrameworkUiAdmin.hideInputEditor` in favor of `UiFramework.hideInputEditor`. #729
- `FrameworkUiAdmin.showHTMLElement` in favor of `UiFramework.showComponent`. Note, as appui is a React-focused library, the new `UiFramework.showComponent` function takes a React Element instead of an HTMLElement.`
- `FrameworkUiAdmin.hideHTMLElement` in favor of `UiFramework.hideComponent`. #729
- `FrameworkUiAdmin.showCard` in favor of `UiFramework.showCard`. As with the above, HTMLElements have been replaced with React Elements. #729
- `FrameworkUiAdmin.showReactCard` in favor of `UiFramework.showCard`. #729
- `FrameworkUiAdmin.hideCard` in favor of `UiFramework.hideCard`. #729
- `FrameworkUiAdmin.openToolSettingsPopup` in favor of `UiFramework.openToolSettingsPopup`. #729
- `FrameworkUiAdmin.openDialog` in favor of `UiFramework.openDialog`. #729
- `FrameworkUiAdmin.closeDialog` in favor of `UiFramework.closeDialog`. #729

- `CursorMenuData` is favor of `CursorMenuPayload`. #729
- `RelativePosition` in favor of `Placement`. #729
- `HTMLElementPopup` please use `UiFramework.showComponentPopup` instead. #729
- `HTMLElementPopupProps` please use `ComponentPopupProps` instead. #729

- `MenuItemProps` in favor of `CursorMenuItemProps`. #729

### Additions

- `UiFramework` methods detailed above which replace FrameworkUiAdmin methods. #729
- `Placement` has been introduced to replace `RelativePosition`. #729
- `ConditionalBooleanValue` has been moved over from `appui-abstract`#729
- `ConditionalStringValue` has been moved over from `appui-abstract`. #729

### Changes

- Description. #PR

### Fixes

- Fix the issue when right-click + left-click starts a widget drag interaction. #730

## @itwin/imodel-components-react

### Deprecations

- `TimelineComponentProps.componentId` was used only when listening for events on `UiAdmin.onGenericUiEvent.addListener`. As `UiAdmin` will be deprecated, please use the `TimelineComponentProps.isPlaying` prop to control the timeline play state.

### Additions

- # `TimelineComponentProps.isPlaying` to control the timeline play state. #729

> > > > > > > master
