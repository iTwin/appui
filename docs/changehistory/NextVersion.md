# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes)
  - [Improvements](#improvements)
  - [Additions](#additions)

## @itwin/appui-react

### Fixes

- Localize popout error message text.

### Changes

- Promoted `FrameworkToolAdmin` to _beta_. #618
- Correctly handle `WidgetState.Unloaded` and keep widget content unmounted when widget is unloaded. #617

## @itwin/components-react

### Fixes

- Fixed data filterers to work with uppercase letters after using the constructor.

### Improvements

- Reset to default operator when property of a rule item is changed in `FilterBuilderState`.

### Additions

- Add `removeAllItems` function which will clear all items in the filter state.
