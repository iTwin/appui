# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Changes](#changes-1)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Deprecations

- Deprecated `StatusBar` component in favor of `StatusBarComposer`. [#848](https://github.com/iTwin/appui/pull/848)
- Deprecated `StatusBar` namespace. Please use the components directly. [#848](https://github.com/iTwin/appui/pull/848)
  - Deprecated `StatusBar.Popup` and `StatusBarPopup` in favor of `StatusBarPopover`.
  - Deprecated `StatusBar.Field` and `StatusBarField` in favor of [iTwinUI Button](https://itwinui.bentley.com/docs/button).
- Deprecated `StatusBarIndicator` in favor of [iTwinUI Button](https://itwinui.bentley.com/docs/button) (or other components) and AppUI `StatusBarPopover`. [#848](https://github.com/iTwin/appui/pull/848)
- Deprecated `StatusBarLabelIndicator` in favor of [iTwinUI Label](https://itwinui.bentley.com/docs/typography#label) and AppUI `Icon`. [#848](https://github.com/iTwin/appui/pull/848)

### Additions

- `controlWidgetVisibility` preview feature. When enabled, additional UI elements are rendered to allow the end user of the layout to control widget visibility. [#856](https://github.com/iTwin/appui/pull/856)

  Currently applications might use `WidgetState` to control widget visibility programmatically and expect the widgets to stay hidden until a certain condition is met. Since this preview feature adds UI elements to control widget visibility, it might conflict with the application's logic. To avoid this, the application should use `UiItemsManager.register()` and `UiItemsManager.unregister()` to strictly manage what widgets are available to the end-user.

  Additionally an array of widget ids can be specified to only expose visibility controls for specific widgets. This allows applications to experiment with other use-cases, like keeping at least one widget visible at all times.
  
- Added `StatusBarPopover` to replace `StatusBar.Popup`. The component uses [iTwinUI Popover](https://itwinui.bentley.com/docs/popover) with some consistent styling for all `StatusBar` fields. `StatusBarPopover` should wrap the element that triggers it (e.g. a button). [#848](https://github.com/iTwin/appui/pull/848)
- Added `StatusBarPopover.ExpandIndicator` which adds an indicator to show that a button has expandable content. `StatusBarPopover.ExpandIndicator` is supposed to be used in `StatusBarPopover` trigger buttons. [#848](https://github.com/iTwin/appui/pull/848)

  Usage example:

  ```tsx
  // With iTwinUI Button
  <StatusBarPopover>
    <Button styleType="borderless">
      {label}
      <StatusBarPopover.ExpandIndicator />
    </Button>
  </StatusBarPopover>

  // With iTwinUI IconButton
  <StatusBarPopover>
    <IconButton styleType="borderless">
      <SvgLightbulbHollow />
      <StatusBarPopover.ExpandIndicator />
    </IconButton>
  </StatusBarPopover>
  ```

### Changes

- The dropdown menu of `widgetActionDropdown` preview feature will close once one of the menu items is activated. [#856](https://github.com/iTwin/appui/pull/856)
- The labels for the buttons in the widget title bar will be rendered as tooltips, rather than using the `title` attribute. [#856](https://github.com/iTwin/appui/pull/856)
- Started using iTwinUI components for `StatusBar` field components. That includes both the button and the popup. [#848](https://github.com/iTwin/appui/pull/848)

## @itwin/components-react

### Deprecations

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer` in favor of default `PrimitivePropertyValueRenderer`. [#832](https://github.com/iTwin/appui/pull/832)
- Deprecated `RadialMenu` and `RadialButton` components that were designed for a retired design pattern in favor of `ContextMenu` or [iTwinUI dropdown menu](https://itwinui.bentley.com/docs/dropdownmenu). [#850](https://github.com/iTwin/appui/pull/850)

### Changes

- Updated `VirtualizedPropertyGrid` component [#849](https://github.com/iTwin/appui/pull/849):
  - Enable user selection for property records
  - Display browser context menu on property records if `onPropertyContextMenu` and `isPropertySelectionOnRightClickEnabled` props are not set
  - Increased area of an element separator to avoid column overlap

## @itwin/core-react

### Fixes

- Fixed SVG icon alignment in `ContextMenuItem` component. [#840](https://github.com/iTwin/appui/pull/840)
- Fixed `ContextSubMenu` to correctly render provided SVG icon. [#840](https://github.com/iTwin/appui/pull/840)
