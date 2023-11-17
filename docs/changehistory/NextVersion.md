# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Fixes](#fixes-1)
- [@itwin/components-react](#itwincomponents-react)
  - [Fixes](#fixes-2)
- [@itwin/core-react](#itwincore-react)
  - [Fixes](#fixes-3)

## @itwin/appui-react

### Additions

#### UiItemsProvider improvements

- `UiItemsProvider` is enhanced by additional properties `getToolbarItems`, `getStatusBarItems`, `getBackstageItems`, `getWidgets` with an intention to replace existing `provideToolbarItems`, `provideStatusBarItems`, `provideBackstageItems`, `provideWidgets` to facilitate overriding scenarios.
  Additionally `layout` property is added to `ToolbarItem` and `Widget` types to define additional layout-specific properties of an item.
  Location arguments of `UiItemsProvider.provide*` methods are moved to `layout.standard`. #504

  Usage example:

  ```ts
  // Before
  const provider: UiItemsProvider = {
    id: "provider1",
    provideWidgets: (stageId, _stageUsage, location, section) => {
      if (
        stageId === "stage1" &&
        location === StagePanelLocation.Bottom &&
        section === StagePanelSection.End
      ) {
        return [{ id: "w1" }];
      }
      return [];
    },
  };
  UiItemsManager.register(provider);

  // After
  const provider: UiItemsProvider = {
    id: "provider1",
    getWidgets: () => {
      return [
        {
          id: "w1",
          layouts: {
            standard: {
              location: StagePanelLocation.Bottom,
              section: StagePanelSection.End,
            },
          },
        },
      ];
    },
  };
  UiItemsManager.register(provider, { stageIds: ["stage1"] });
  ```

#### Preview features

- Introduce preview features.

  `UiFramework.setPreviewFeatures()` method allows to enable preview features for the application. The interface is built so the application can enable preview features and will not break when new preview features are added or removed in the future.

  Preview features should not have any other API than the `UiFramework.setPreviewFeatures()` method, which can potentially allow for settings if needed. Once the feature is validated by the community, it will be promoted to a stable feature with a proper API.

  Only a warning will be displayed in the console when an unknown preview feature is enabled, in development mode. In production mode, unknown preview features will be ignored.

  Usage example:

  ```ts
  UiFramework.setPreviewFeatures({
    contentAlwaysMaxSize: true,
  });
  ```

  Note that every wanted preview features need to be set at the same time, as the method will override the existing preview features.

- `contentAlwaysMaxSize` feature preview. When enabled, the content no longer gets resized by panels or docking the tool settings. This allows for a more consistent experience when the content is always the same size, regardless of the panels or tool settings being open, closed or floating.

- `enableMaximizedFloatingWidget` feature preview. When enabled, floating widgets can be maximized to fill the entire screen. In this mode the widgets can still be popped out, or restored to their original size.

### Changes

- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.
- Popout widgets will now popout to `preferredFloatingWidgetSize`. Will popout to container size if `preferredFloatingWidgetSize` is not set.

### Fixes

- Unmount `ChildWindowManager` whenever child window is closed.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- Fixed error when `HTMLElement` used in `NotifyMessageDetails` messages.
- Removed unneeded `changeView` call in `FloatingViewportComponent`.
- Fixed reference error in case `applicationData` is not provided for `IModelViewportControl`.
- Hidden widget will now float to `defaultSize` and `defaultPosition` of `canFloat` property when set to floating.
- Fixed an issue with tool settings not being refreshed from tool when floating/docking tool settings.
- Fixed an issue where frontstage state would be lost when it is closed too soon after a change.

## @itwin/imodel-components-react

### Fixes

- Remove unneeded `changeView` call when mounting `ViewportComponent`.

## @itwin/components-react

### Fixes

- Fixed `useAsyncValue` hook to work in React 18 strict mode.

## @itwin/core-react

### Changes

- `IconSpec` now accepts the path to an `.svg` file as valid string input. `IconSpecUtilities` methods from `@itwin/appui-abstract` should no longer be used and will be deprecated in an upcoming release.

### Fixes

- Fixed `useDisposable` hook to work in React 18 strict mode.
