# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Fixes](#fixes-1)

## @itwin/appui-react

### Fixes

- `ToolbarHelper`: Fixed `badgeType` override.

## @itwin/components-react

### Additions

- `usePropertyFilterBuilder`: Added ability to build filter without showing errors.

### Fixes

- `ControlledTree`: Fixed range selection over nodes that are not loaded causing browser to hang.
- Removed `require` call from `TypeConverterManager` (No `require` calls remaining in any of the packages.)
