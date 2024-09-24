# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
- [@itwin/core-react](#itwincore-react)
  - [Changes](#changes-1)

## @itwin/appui-react

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily. [#1042](https://github.com/iTwin/appui/pull/1042)

## @itwin/components-react

### Additions

- Added `IMergingPropertyDataProvider` interface which combines any number of `IPropertyDataProvider` instances and added `createMergedPropertyDataProvider` factory function that creates `IMergingPropertyDataProvider` instance. [#1040](https://github.com/iTwin/appui/pull/1040)

## @itwin/core-react

### Changes

- Removed the `resize-observer-polyfill` dependency because `ResizeObserver` is well supported by modern browsers, eliminating the need for a polyfill. [#1045](https://github.com/iTwin/appui/pull/1045)
