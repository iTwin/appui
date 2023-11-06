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

### Changes

- `AppNotificationManager` no longer requires `StatusBar` to be rendered in the active frontstage to show messages.

### Fixes

- Unmount `ChildWindowManager` whenever child window is closed.
- Whenever widget is popped out and `window.open` fails, widget no longer disappears.
- Fixed error when `HTMLElement` used in `NotifyMessageDetails` messages.
- Removed unneeded `changeView` call in `FloatingViewportComponent`.
- Fixed reference error in case `applicationData` is not provided for `IModelViewportControl`.

## @itwin/imodel-components-react

### Fixes

- Remove unneeded `changeView` call when mounting `ViewportComponent`.

## @itwin/components-react

### Fixes

- Fixed `useAsyncValue` hook to work in React 18 strict mode.

## @itwin/core-react

### Fixes

- Fixed `useDisposable` hook to work in React 18 strict mode.
