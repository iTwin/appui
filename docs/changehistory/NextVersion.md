# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Changes](#changes)
  - [Improvements](#improvements)
  - [Additions](#additions)
  - [Deprecations](#deprecations)
- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations)

## @itwin/components-react

## Changes

- Updated UI for the `FilterBuilder` component.
- Deprecated support for nested rule groups.

### Improvements

- Show loading spinner in subsequent loads if delay threshold is reached `VirtualizedPropertyGrid.`

### Additions

- Added `useControlledTreeEventsHandler` to replace now deprecated `useTreeEventsHandler`. [#676](https://github.com/iTwin/appui/pull/676)

### Deprecations

- Deprecated `useTreeEventsHandler` hook because it does not work correctly in React 18 Strict mode. `useControlledTreeEventsHandler` should be used instead. [#676](https://github.com/iTwin/appui/pull/676)

## @itwin/appui-react

### Additions

- `useWidget` hook to convey widget state and location.
- `activateDroppedTab` preview feature to activate a dragged widget tab whenever it is dropped in the receiving container. #601

## @itwin/core-react

### Deprecations

- Deprecated `useDisposable` hook because it does not work correctly in React 18 Strict mode. `useOptionalDisposable` or `useState` + `useEffect` should be used instead to manage disposable resources. [#676](https://github.com/iTwin/appui/pull/676)
