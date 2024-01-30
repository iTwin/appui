# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/components-react](#itwincomponents-react)
  - [Improvements](#improvements)
  - [Changes](#changes)
- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Additions](#additions)

## @itwin/components-react

## Changes

- Updated UI for the `FilterBuilder` component.
- Deprecated support for nested rule groups.

### Improvements

- Show loading spinner in subsequent loads if delay threshold is reached `VirtualizedPropertyGrid.`

## @itwin/appui-react

### Changes

- The package no longer depends on `@itwin/appui-layout-react` and have been removed from `peerDependencies`. Since the `4.0.0` release, this package only contained _internal_ components and the content of the package have been moved to `@itwin/appui-react` to reduce application maintenance of maintaining the locksteps packages.

  `@itwin/appui-layout-react` will no longer be published as a separate package.

### Additions

- `useWidget` hook to convey widget state and location.
