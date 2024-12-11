# NextVersion <!-- omit from toc -->

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)

## @itwin/appui-react

### Changes

- Specified additional version ranges in redux related peer dependencies. `redux` version is updated from `^4.1.0` to `^4.1.0 || ^5.0.0` and `react-redux` version is updated from `^7.2.2` to `^7.2.2 || ^8.0.0 || ^9.0.0`. This enables consumers to utilize latest redux capabilities. See [redux release v5.0.0](https://github.com/reduxjs/redux/releases/tag/v5.0.0) for migration tips. [#1151](https://github.com/iTwin/appui/pull/1151)

## @itwin/components-react

### Additions

- Added a callback to `VirtualizedPropertyGrid` which determines which editors should always be visible. [#1090](https://github.com/iTwin/appui/pull/1090)
