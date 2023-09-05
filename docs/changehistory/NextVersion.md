# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-1)
  - [Additions](#additions)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes-2)

## @itwin/appui-react

### Fixes

- `ToolbarHelper`: Fixed `badgeType` override.
- Can now pass a blank array into `allowedPanelTargets` that will prevent widget from being able to to dock to any target.

## @itwin/components-react

### Additions

- `usePropertyFilterBuilder`: Added ability to build filter without showing errors.

### Fixes

- `ControlledTree`: Fixed range selection over nodes that are not loaded causing browser to hang.
- Fixed `TreeNodeLoader` adding loaded nodes to model when `loadNode` observable is unsubscribed before nodes request is completed.
- Removed `require` call from `TypeConverterManager` (No `require` calls remaining in any of the packages.)
- `ControlledTree` spacing issue between nodes with and without expander is fixed.

## @itwin/core-react

### Fixes

- Added blank space to `Node` component without expander, so that it aligns with `Node` with expander
