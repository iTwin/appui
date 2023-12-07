# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Changes](#changes-1)
  - [Fixes](#fixes-1)

## @itwin/appui-react

### Changes

- Promoted `FrameworkToolAdmin` to _beta_. #618
- Correctly handle `WidgetState.Unloaded` and keep widget content unmounted when widget is unloaded. #617

### Fixes

- Correctly dock a closed popout widget to the panel section from which the widget was popped out. #621

## @itwin/components-react

### Changes

- Reset to default operator when property of a rule item is changed in `FilterBuilderState`.

### Fixes

- Fixed data filterers to work with uppercase letters after using the constructor.
