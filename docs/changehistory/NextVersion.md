# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Fixes

- Fix `zustand` deprecation warning by replacing `useStore` with `useStoreWithEqualityFn`.
- Can now pass a blank array into `allowedPanelTargets` that will prevent widget from being able to to dock to any target.
