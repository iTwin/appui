# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
  - [Changes](#changes-1)
- [@itwin/core-react](#itwincore-react)
  - [Changes](#changes-2)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Changes](#changes-3)

## @itwin/appui-react

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily. [#1042](https://github.com/iTwin/appui/pull/1042)
- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)
- Popout widgets are now displayed in flow layout to match the layout of floating, stage panel and popout widgets when `reparentPopoutWidgets` is enabled. [#1049](https://github.com/iTwin/appui/pull/1049)

## @itwin/components-react

### Additions

- Added `IMergingPropertyDataProvider` interface which combines any number of `IPropertyDataProvider` instances and added `createMergedPropertyDataProvider` factory function that creates `IMergingPropertyDataProvider` instance. [#1040](https://github.com/iTwin/appui/pull/1040)

### Changes

- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)

## @itwin/core-react

### Changes

- Removed the `resize-observer-polyfill` dependency because `ResizeObserver` is well supported by modern browsers, eliminating the need for a polyfill. [#1045](https://github.com/iTwin/appui/pull/1045)
- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)

## @itwin/imodel-components-react

### Changes

- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)

[^1]: This change might break consumers that rely on importing `@internal` APIs directly from unsupported submodules i.e. `@itwin/appui-react/lib/esm/appui-react`. Currently supported export paths: main entry point (i.e. `@itwin/appui-react`), `package.json` subpath (i.e. `@itwin/appui-react/package.json`). Additional export paths are available until next major version to facilitate the **AppUI 5.0** adoption: ESM submodule (i.e. `@itwin/appui-react/esm`), CJS submodule (i.e. `@itwin/appui-react/cjs`), all SCSS files are exported by using `sass` custom condition (i.e. `@itwin/core-react/lib/cjs/core-react/typography`).
