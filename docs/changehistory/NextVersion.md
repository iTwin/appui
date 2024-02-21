# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-1)

## @itwin/appui-react

### Additions

- `enableMaximizedPanelWidget` preview feature. When enabled, panel widgets can be maximized by the user to fill the root container of AppUI. This feature is similar to the existing `enableMaximizedFloatingWidget` but for panel widgets. #736

### Changes

- Update styling of tool settings components. #658

### Fixes

- Fixed null property access when `useTransientState` is used in a popout widget.

## @itwin/components-react

### Fixes

- Fix a potential maximum update depth error caused by useResizeObserver. #658
- `ControlledTree`: add ability to select multiple nodes using `CMD` key + mouse click. [#734](https://github.com/iTwin/appui/pull/734)
