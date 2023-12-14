# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Changes](#changes-1)
  - [Fixes](#fixes-1)

## @itwin/appui-react

## @itwin/appui-react

### Changes

- Promoted `FrameworkToolAdmin` to _beta_. [#618](https://github.com/iTwin/appui/pull/618)
- Correctly handle `WidgetState.Unloaded` and keep widget content unmounted when widget is unloaded. [#617](https://github.com/iTwin/appui/pull/617)

### Fixes

- Localize popout error message text. [#628](https://github.com/iTwin/appui/pull/628)
- Fixed popout widgets getting incrementally smaller or larger each time popped out. [#622](https://github.com/iTwin/appui/pull/622)
- Fixed "RestoreAllFrontstagesTool" missing "pinned" state. [#633](https://github.com/iTwin/appui/pull/633)

### Fixes

- Localize popout error message text.
- Correctly dock a closed popout widget to the panel section from which the widget was popped out. #621

## @itwin/components-react

### Additions

- Add `removeAllItems` function which will clear all items in the filter state. [#629](https://github.com/iTwin/appui/pull/629)

### Changes

- Reset to default operator when property of a rule item is changed in `FilterBuilderState`. [#619](https://github.com/iTwin/appui/pull/619)

### Fixes

- Fixed data filterers to work with uppercase letters after using the constructor. [#620](https://github.com/iTwin/appui/pull/620)
