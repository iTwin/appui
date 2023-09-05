# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Fixes](#fixes)

## @itwin/components-react

### Additions

- `usePropertyFilterBuilder`: Added ability to build filter without showing errors.

### Fixes

- `ControlledTree`: Fixed range selection over nodes that are not loaded causing browser to hang.
- Fixed `TreeNodeLoader` adding loaded nodes to model when `loadNode` observable is unsubscribed before nodes request is completed.
- Removed `require` call from `TypeConverterManager` (No `require` calls remaining in any of the packages.)
