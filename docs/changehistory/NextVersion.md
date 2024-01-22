# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Improvements](#improvements)
  - [Additions](#additions)
  - [Deprecations](#deprecations)
- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations)

## @itwin/components-react

### Improvements

- Show loading spinner in subsequent loads if delay threshold is reached `VirtualizedPropertyGrid.`

### Additions

- Added `useControlledTreeEventsHandler` to replace now deprecated `useTreeEventsHandler`.

### Deprecations

- Deprecated `useTreeEventsHandler` hook because it does not work correctly in React 18 Strict mode. `useControlledTreeEventsHandler` should be used instead.

## @itwin/appui-react

### Additions

- `useWidget` hook to convey widget state and location.

## @itwin/core-react

### Deprecations

- Deprecated `useDisposable` hook because it does not work correctly in React 18 Strict mode. `useOptionalDisposable` or `useState` + `useEffect` should be used instead to manage disposable resources.
