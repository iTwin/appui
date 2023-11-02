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

- Introduce preview features.

  `UiFramework.setPreviewFeatures()` method allows to enable preview features for the application. The interface is built so the application can enable preview features and will not break when new preview features are added or removed in the future.

  In order to be able to iterate quickly, note that preview features could be added or removed in minor or patch releases and should not be considered stable. They will likely not have any other API than the `UiFramework.setPreviewFeatures()` method, which can potentially allow for settings if needed. Once the feature is validated by the community, it will be promoted to a stable feature with a proper API.

  Only a warning will be displayed in the console when an unknown preview feature is enabled, in development mode. In production mode, unknown preview features will be ignored.

  Usage example:

  ```ts
  UiFramework.setPreviewFeatures({
    panelsAlwaysOverContent: true,
  });
  ```

- `panelsAlwaysOverContent` is the first preview features that is introduced. When enabled, panels will always be rendered over the content even when the panel is pinned. The content will no longer be resized to make room for the panel, making the content never move when the panel is pinned or unpinned, open or closed.

### Changes

- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.

### Fixes

- Unmount `ChildWindowManager` whenever child window is closed.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- Fix error when `HTMLElement` used in `NotifyMessageDetails` messages.
- Remove unneeded `changeView` call in `FloatingViewportComponent`.

## @itwin/imodel-components-react

### Fixes

- Remove unneeded `changeView` call when mounting `ViewportComponent`.

## @itwin/components-react

### Fixes

- Fixed `useAsyncValue` hook to work in React 18 strict mode.

## @itwin/core-react

### Fixes

- Fixed `useDisposable` hook to work in React 18 strict mode.
