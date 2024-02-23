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

- `enableMaximizedPanelWidget` preview feature. When enabled, panel widgets can be maximized by the user to fill the root container of AppUI. This feature is similar to the existing `enableMaximizedFloatingWidget` but for panel widgets. [#736](https://github.com/iTwin/appui/pull/736)

### Changes

- Update styling of tool settings components. [#658](https://github.com/iTwin/appui/pull/658)
- Updated iTwinUI version to 3.x. While this change is non-breaking it is recommended for applications to [import iTwinUI styles manually](https://github.com/iTwin/iTwinUI/wiki/Styling#v3). Other AppUI consumers are expected to migrate to iTwinUI 3.x gradually. For more information see [iTwinUI 3.x migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v3-migration-guide). [#666](https://github.com/iTwin/appui/pull/666)

### Fixes

- Fixed null property access when `useTransientState` is used in a popout widget. [#740](https://github.com/iTwin/appui/pull/740)

## @itwin/components-react

### Fixes

- Fix a potential maximum update depth error caused by useResizeObserver. [#658](https://github.com/iTwin/appui/pull/658)
- `ControlledTree`: add ability to select multiple nodes using `CMD` key + mouse click. [#734](https://github.com/iTwin/appui/pull/734)
