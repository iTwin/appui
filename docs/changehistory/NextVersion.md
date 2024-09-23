# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)

## @itwin/appui-react

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily.
