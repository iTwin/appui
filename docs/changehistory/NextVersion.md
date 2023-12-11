# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes)
  - [Improvements](#improvements)
  - [Additions](#additions)

## @itwin/appui-react

### Changes

- Promoted `FrameworkToolAdmin` to _beta_. #618
- Correctly handle `WidgetState.Unloaded` and keep widget content unmounted when widget is unloaded. #617

### Fixes

- Fixed popout widgets getting incrementally smaller or larger each time popped out. [#563](https://github.com/iTwin/appui/issues/563)

## @itwin/components-react

### Fixes

- Fixed data filterers to work with uppercase letters after using the constructor.

### Improvements

- Reset to default operator when property of a rule item is changed in `FilterBuilderState`.

### Additions

- Add `removeAllItems` function which will clear all items in the filter state.
